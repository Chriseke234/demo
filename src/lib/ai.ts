import { 
  mockRooms, 
  mockDining, 
  mockExperiences, 
  mockSpaTreatments, 
  mockFAQs,
  Room, 
  DiningVenue, 
  Experience, 
  SpaTreatment, 
  FAQ 
} from '../data/mockData';

interface AIResponse {
  reply: string;
  extractedContext?: {
    guestName?: string;
    email?: string;
    phone?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    roomInterest?: string;
    occasion?: string;
  };
  bookingIntent: boolean;
  humanHandoffTrigger: boolean;
}

function buildSystemPrompt(hotelData: {
  rooms: Room[];
  dining: DiningVenue[];
  experiences: Experience[];
  spa: SpaTreatment[];
  faqs: FAQ[];
}, guestContext: any = {}) {
  const roomsStr = hotelData.rooms.map(r => 
    `- ${r.name} (Slug: ${r.slug}): Sleeps ${r.capacity}, View: ${r.view}, Size: ${r.size}, Starts at $${r.price}/night. Amenities: ${r.amenities.slice(0, 4).join(', ')}.`
  ).join('\n');

  const diningStr = hotelData.dining.map(d => 
    `- ${d.name}: ${d.cuisine}. Hours: ${d.hours}. Dress: ${d.dressCode}. Reservation required: ${d.reservationRequired ? 'Yes' : 'No'}.`
  ).join('\n');

  const expStr = hotelData.experiences.map(e => 
    `- ${e.name} (${e.category}): ${e.description.slice(0, 120)} Duration: ${e.duration}. Price: $${e.price}/person.`
  ).join('\n');

  const spaStr = hotelData.spa.map(s => 
    `- ${s.name} (${s.category}): Duration: ${s.duration}. Price: $${s.price}.`
  ).join('\n');

  const faqStr = hotelData.faqs.map(f => 
    `Q: ${f.question}\nA: ${f.answer}`
  ).join('\n\n');

  const contextStr = JSON.stringify(guestContext || {});

  return `You are Aurelia, the warm, sophisticated, and knowledgeable digital concierge of Aurelia Grand, an ultra-premium 5-star hotel in Dubai Marina, UAE.

IMPORTANT RULES:
- Respond naturally as a warm hospitality professional, never as a chatbot
- Keep replies concise: 1-3 short paragraphs maximum
- Ask at most one useful follow-up question
- Never use "As an AI..." or robotic corporate language
- Never invent prices, availability, policies, or bookings
- If asked something not in the hotel data, say: "I don't have that detail to hand, but our team can help via WhatsApp."

HOTEL DATA (only reference these facts):
---
ROOMS:
${roomsStr}

DINING:
${diningStr}

EXPERIENCES:
${expStr}

SPA TREATMENTS:
${spaStr}

FAQS & POLICIES:
${faqStr}
---

CURRENT GUEST CONTEXT:
${contextStr}

RESPONSE FORMAT - you MUST respond with valid JSON only:
{
  "reply": "Your conversational message. Use simple HTML like <strong>text</strong> or <br/> for line breaks when helpful. Never use emojis.",
  "extractedContext": {
    "guestName": "name if mentioned, or null",
    "email": "email if mentioned, or null",
    "phone": "phone if mentioned, or null",
    "checkIn": "YYYY-MM-DD if mentioned, or null",
    "checkOut": "YYYY-MM-DD if mentioned, or null",
    "guests": "number if mentioned, or null",
    "roomInterest": "room name if guest shows interest, or null",
    "occasion": "e.g. anniversary, birthday, business trip, or null"
  },
  "bookingIntent": false,
  "humanHandoffTrigger": false
}

Set bookingIntent=true if guest asks to book or provides travel dates with intent.
Set humanHandoffTrigger=true if guest has a complaint, asks to speak to staff, or needs cancellation/modification.`;
}

function generateMockResponse(userMessage: string, history: any[], guestContext: any): AIResponse {
  const msg = userMessage.toLowerCase();
  let reply = "";
  let extractedContext: any = {};
  let bookingIntent = false;
  let humanHandoffTrigger = false;

  if (msg.includes("anniversary") || msg.includes("romantic") || (msg.includes("couple") && !msg.includes("room"))) {
    reply = "Happy anniversary — that is a lovely reason to visit. For a romantic stay, I would suggest our <strong>Marina Suite</strong>. It has a private terrace with beautiful evening views over the marina, a spa-style marble bathroom, and 24-hour butler service to make everything feel effortless.<br/><br/>If you share your dates, I can give you a clearer picture of pricing.";
    extractedContext.occasion = "anniversary";
    extractedContext.roomInterest = "Marina Suite";
    extractedContext.guests = 2;
  } else if (msg.includes("3-day") || msg.includes("itinerary") || msg.includes("plan my stay") || msg.includes("three day") || msg.includes("three-day")) {
    reply = "I would be happy to suggest a three-day itinerary.<br/><br/><strong>Day 1</strong> — Settle in, then spend the afternoon at the Aurelia Spa. In the evening, join us at <strong>Aurelia Mare</strong> for Mediterranean fine dining with marina views.<br/><strong>Day 2</strong> — Our <strong>Marina Sunset Cruise</strong> departs at 5 PM and gives you two hours on the water with drinks and hors d'oeuvres. A wonderful evening follows at the Sky Lounge.<br/><strong>Day 3</strong> — The <strong>Royal Desert Expedition</strong> runs from 2:30 PM into the evening, finishing with a traditional Emirati dinner under the stars.<br/><br/>Would you like to adjust anything, or shall I note your dates?";
    bookingIntent = true;
  } else if (msg.includes("dining") || msg.includes("restaurant") || msg.includes("eat") || msg.includes("food") || msg.includes("dinner")) {
    reply = "We have four dining venues to suit different moods. <strong>Aurelia Mare</strong> is our Mediterranean terrace — wonderful for a special dinner with marina views. <strong>Ember</strong> is our modern charcoal grill, ideal for premium cuts and a more intimate atmosphere. <strong>The Atrium</strong> offers a beautiful breakfast and afternoon tea setting. And our <strong>Sky Lounge</strong> on the 42nd floor is perfect for evening cocktails and small plates.<br/><br/>Is there a particular evening or occasion I can help you plan for?";
  } else if (msg.includes("spa") || msg.includes("massage") || msg.includes("relax") || msg.includes("wellness") || msg.includes("treatment")) {
    reply = "The Aurelia Spa is a calm, unhurried space. Our most requested treatment is the <strong>Signature Gold Massage</strong> — a 90-minute full-body treatment using 24k gold-infused oils that is genuinely restorative.<br/><br/>We also have a hammam ritual, a deep-sea hydration facial, and a Himalayan salt body scrub. If you have been travelling and simply want to decompress, I would suggest starting with a 60-minute treatment and some quiet time by the pool afterward.";
    extractedContext.occasion = "wellness";
  } else if (msg.includes("whatsapp") || msg.includes("continue on") || msg.includes("send to phone")) {
    reply = "Of course. I can carry the details of our conversation straight across to WhatsApp so you do not have to start again. May I ask for your name so our team can address you properly?";
    bookingIntent = true;
  } else if (msg.includes("speak to") || msg.includes("human") || msg.includes("staff") || msg.includes("manager") || msg.includes("cancel") || msg.includes("refund") || msg.includes("complaint")) {
    reply = "Absolutely — this is something I would rather have our reservations team handle personally. I can connect you with them on WhatsApp right now. They are available around the clock and will be able to assist you directly.";
    humanHandoffTrigger = true;
  } else if (msg.includes("room") || msg.includes("suite") || msg.includes("stay") || msg.includes("accommodation")) {
    reply = "We have three beautifully designed accommodation categories. The <strong>Aurelia Executive Room</strong> is an elegant city-view room from $450 per night, ideal for business or solo travel. Our <strong>Marina Suite</strong> at $750 per night offers a private terrace and sweeping marina views — our most requested suite. And the <strong>Family Residence</strong> at $1,200 per night is a two-bedroom sanctuary with a full living room and private balcony.<br/><br/>Who will be travelling with you?";
  } else if (msg.includes("airport") || msg.includes("transfer") || msg.includes("taxi") || msg.includes("car")) {
    reply = "We offer private airport transfers from both Dubai International (DXB) and Al Maktoum Airport. Options range from a premium sedan at $120 each way, through to a luxury SUV at $180, or our private Rolls-Royce chauffeur service at $450 each way.<br/><br/>If you share your arrival details, I can arrange the transfer as part of your booking.";
  } else if (msg.includes("check-in") || msg.includes("checkin") || msg.includes("checkout") || msg.includes("check out") || msg.includes("check in")) {
    reply = "Check-in begins at <strong>3:00 PM</strong> and check-out is by <strong>12:00 PM</strong>. Early check-in and late check-out can usually be arranged subject to availability — I would recommend noting your preference at the time of booking so the team can prepare. Is there anything else I can help with?";
  } else if (msg.includes("pool") || msg.includes("beach") || msg.includes("swim")) {
    reply = "Our infinity pool overlooks the marina and is open daily from <strong>6:00 AM to 10:00 PM</strong>. We also have a private resident beach area, open from sunrise to sunset. Private shaded cabanas by the pool can be reserved for the day if you would like a more secluded setting.";
  } else if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("rate")) {
    reply = "Our nightly rates start from <strong>$450</strong> for the Aurelia Executive Room, <strong>$750</strong> for the Marina Suite, and <strong>$1,200</strong> for the Family Residence. These are indicative starting rates — the final rate will depend on your dates and any inclusions such as breakfast or experiences.<br/><br/>What dates are you considering?";
  } else if (msg.includes("hello") || msg.includes("hi ") || msg.includes("good ") || msg.includes("hey")) {
    reply = "Good to meet you. I am Aurelia, Aurelia Grand's digital concierge. Whether you are planning a first visit or have stayed with us before, I am here to help. What brings you to Dubai Marina?";
  } else if (msg.includes("family") || msg.includes("children") || msg.includes("kids")) {
    reply = "Our <strong>Family Residence</strong> is designed with families in mind — it features two separate king bedrooms, a central living room, a modern kitchenette, and a private balcony overlooking the marina. We also prepare bespoke children's welcome kits and can arrange a gaming system setup in the room.<br/><br/>How many are travelling with you, and what are your dates?";
    extractedContext.roomInterest = "Family Residence";
  } else {
    reply = "I am here to help make your stay at Aurelia Grand exceptional. Whether it is choosing the right suite, planning your evenings, arranging an airport transfer, or booking a spa treatment — just ask and I will take care of it.<br/><br/>What would you like to explore first?";
  }

  // Extract email if mentioned
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailMatch = userMessage.match(emailRegex);
  if (emailMatch) extractedContext.email = emailMatch[0];

  // Extract name patterns like "I'm [Name]" or "my name is [Name]"
  const nameMatch = userMessage.match(/(?:I'?m|my name is|I am)\s+([A-Z][a-z]+)/);
  if (nameMatch) extractedContext.guestName = nameMatch[1];

  // Extract guest count
  const guestMatch = userMessage.match(/(\d+)\s+(?:guests?|people|adults?|of us)/);
  if (guestMatch) extractedContext.guests = parseInt(guestMatch[1]);

  return { reply, extractedContext, bookingIntent, humanHandoffTrigger };
}

export async function askAurelia(
  userMessage: string,
  history: { role: 'user' | 'assistant' | 'system'; content: string }[],
  guestContext: any = {}
): Promise<AIResponse> {
  const apiKey = process.env.AI_API_KEY;

  if (!apiKey || apiKey === 'your_ai_api_key_here' || apiKey.startsWith('mock-')) {
    return generateMockResponse(userMessage, history, guestContext);
  }

  const hotelData = {
    rooms: mockRooms,
    dining: mockDining,
    experiences: mockExperiences,
    spa: mockSpaTreatments,
    faqs: mockFAQs
  };

  const systemInstruction = buildSystemPrompt(hotelData, guestContext);

  try {
    const isOpenAI = apiKey.startsWith('sk-');

    if (isOpenAI) {
      const messages = [
        { role: 'system', content: systemInstruction },
        ...history.slice(-8).map(h => ({ 
          role: h.role === 'assistant' ? 'assistant' : 'user', 
          content: h.content 
        })),
        { role: 'user', content: userMessage }
      ];

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          response_format: { type: 'json_object' },
          temperature: 0.3
        })
      });

      if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
      const data = await res.json();
      return JSON.parse(data.choices[0].message.content) as AIResponse;

    } else {
      // Gemini
      const contents = [
        ...history.slice(-8).map(h => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ];

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.3
          }
        })
      });

      if (!res.ok) throw new Error(`Gemini error: ${res.status}`);
      const data = await res.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) throw new Error('Empty Gemini response');
      return JSON.parse(content) as AIResponse;
    }
  } catch (error) {
    console.error('AI Service Error:', error);
    return generateMockResponse(userMessage, history, guestContext);
  }
}
