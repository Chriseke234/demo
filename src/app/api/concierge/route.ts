import { NextResponse } from 'next/server';
import { 
  getOrCreateConversation, 
  getMessages, 
  saveMessage, 
  updateConversationStatus, 
  logAnalyticsEvent 
} from '@/lib/db';
import { askAurelia } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const { message, sessionId } = await request.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required.' },
        { status: 400 }
      );
    }

    // 1. Load or create the conversation record
    const conv = await getOrCreateConversation(sessionId);

    // 2. Load the recent chat history
    const rawHistory = await getMessages(conv.id);
    const history = rawHistory.map(m => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content
    }));

    // 3. Call the AI Service
    const aiResult = await askAurelia(message, history, conv.context || {});

    // 4. Update the conversation context if the AI extracted new profile elements
    let updatedContext = { ...(conv.context || {}) };
    if (aiResult.extractedContext) {
      updatedContext = { ...updatedContext, ...aiResult.extractedContext };
    }

    // Determine if we need to capture guest information update
    const guestInfoUpdate: any = { context: updatedContext };
    if (aiResult.extractedContext?.guestName) {
      guestInfoUpdate.name = aiResult.extractedContext.guestName;
    }
    if (aiResult.extractedContext?.email) {
      guestInfoUpdate.email = aiResult.extractedContext.email;
    }
    if (aiResult.extractedContext?.phone) {
      guestInfoUpdate.phone = aiResult.extractedContext.phone;
    }

    // Update guest profile in DB
    await getOrCreateConversation(sessionId, guestInfoUpdate);

    // 5. Update Status based on triggers
    let targetStatus = conv.status;
    if (aiResult.humanHandoffTrigger) {
      targetStatus = 'contacted';
      await logAnalyticsEvent('human_handoff', sessionId, { message_trigger: message });
    } else if (aiResult.bookingIntent) {
      targetStatus = 'booking_intent';
      await logAnalyticsEvent('booking_intent_detected', sessionId, { message_trigger: message });
    } else if (aiResult.extractedContext && Object.keys(aiResult.extractedContext).length > 0) {
      targetStatus = 'interested';
    }

    if (targetStatus !== conv.status) {
      await updateConversationStatus(sessionId, targetStatus);
    }

    // 6. Persist User and AI Messages
    await saveMessage(conv.id, 'user', message);
    const savedAiMsg = await saveMessage(conv.id, 'assistant', aiResult.reply, {
      extractedContext: aiResult.extractedContext,
      bookingIntent: aiResult.bookingIntent,
      humanHandoffTrigger: aiResult.humanHandoffTrigger
    });

    // 7. Log Message Analytics
    await logAnalyticsEvent('message_sent', sessionId, {
      role: 'user',
      length: message.length
    });

    if (aiResult.extractedContext?.roomInterest) {
      await logAnalyticsEvent('room_recommended', sessionId, {
        room: aiResult.extractedContext.roomInterest
      });
    }

    // 8. Return response
    return NextResponse.json({
      reply: aiResult.reply,
      status: targetStatus,
      context: updatedContext,
      messageId: savedAiMsg.id
    });

  } catch (error: any) {
    console.error('API Concierge Error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred. Please try again or continue on WhatsApp.' },
      { status: 500 }
    );
  }
}
