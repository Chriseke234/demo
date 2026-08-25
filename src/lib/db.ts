import { supabase, isSupabaseConfigured } from './supabase';
import { mockRooms, mockDining, mockExperiences, Room, DiningVenue, Experience } from '../data/mockData';

// Mock Memory State for local demo mode (stored globally in Node environment)
const globalMockStore = (global as any).__AURELIA_MOCK_STORE__ || {
  conversations: [] as any[],
  messages: [] as any[],
  leads: [] as any[],
  bookings: [] as any[],
  analyticsEvents: [] as any[],
};

if (!(global as any).__AURELIA_MOCK_STORE__) {
  (global as any).__AURELIA_MOCK_STORE__ = globalMockStore;
  
  // Seed some initial data for visual appeal on the admin panel
  globalMockStore.conversations.push({
    id: "conv-1",
    session_id: "demo-session-1",
    guest_name: "Christopher",
    guest_email: "chris@example.com",
    guest_phone: "+971 50 123 4567",
    context: { 
      interest: "Marina Suite",
      check_in: "2026-09-14",
      check_out: "2026-09-17",
      guests: 2,
      occasion: "anniversary"
    },
    status: "booking_intent",
    created_at: new Date(Date.now() - 4 * 3600000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 3600000).toISOString()
  });

  globalMockStore.messages.push(
    { id: "m-1", conversation_id: "conv-1", role: "user", content: "I am visiting with my wife for our anniversary.", created_at: new Date(Date.now() - 4 * 3600000).toISOString() },
    { id: "m-2", conversation_id: "conv-1", role: "assistant", content: "Happy anniversary! I'd highly recommend our Marina Suite. It features a private terrace overlooking the Dubai Marina, which is stunning in the evening. Would you like me to check pricing?", created_at: new Date(Date.now() - 3.8 * 3600000).toISOString() },
    { id: "m-3", conversation_id: "conv-1", role: "user", content: "Yes please, check Sep 14-17 for 2 guests.", created_at: new Date(Date.now() - 2.5 * 3600000).toISOString() },
    { id: "m-4", conversation_id: "conv-1", role: "assistant", content: "The Marina Suite is available for Sep 14–17. The price is $750 per night. If you'd like to book, I can help capture your details or carry this conversation over to WhatsApp.", created_at: new Date(Date.now() - 2.4 * 3600000).toISOString() }
  );

  globalMockStore.leads.push({
    id: "lead-1",
    conversation_id: "conv-1",
    name: "Christopher",
    email: "chris@example.com",
    phone: "+971 50 123 4567",
    interest: "Marina Suite",
    check_in: "2026-09-14",
    check_out: "2026-09-17",
    guests: 2,
    source: "concierge",
    status: "new",
    created_at: new Date(Date.now() - 2 * 3600000).toISOString()
  });

  globalMockStore.bookings.push({
    id: "booking-1",
    guest_name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+1 202 555 0199",
    room_id: "room-executive",
    check_in: "2026-08-28",
    check_out: "2026-08-31",
    guests: 2,
    status: "confirmed",
    price_paid: 1350,
    created_at: new Date(Date.now() - 24 * 3600000).toISOString()
  });

  // Seed events
  globalMockStore.analyticsEvents.push(
    { id: "ev-1", event_name: "concierge_opened", session_id: "demo-session-1", metadata: {}, created_at: new Date(Date.now() - 5 * 3600000).toISOString() },
    { id: "ev-2", event_name: "message_sent", session_id: "demo-session-1", metadata: { text: "Anniversary stay" }, created_at: new Date(Date.now() - 4 * 3600000).toISOString() },
    { id: "ev-3", event_name: "room_recommended", session_id: "demo-session-1", metadata: { room: "Marina Suite" }, created_at: new Date(Date.now() - 3.8 * 3600000).toISOString() },
    { id: "ev-4", event_name: "whatsapp_clicked", session_id: "demo-session-1", metadata: { room: "Marina Suite" }, created_at: new Date(Date.now() - 2 * 3600000).toISOString() }
  );
}

// Helper to generate UUIDs locally
function generateUUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// -----------------------------------------------------------------
// Rooms Database Methods
// -----------------------------------------------------------------
export async function getRooms(): Promise<Room[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('rooms').select('*').order('price', { ascending: true });
    if (!error && data && data.length > 0) {
      // Map database camelCase columns
      return data.map((r: any) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        description: r.description,
        price: Number(r.price),
        capacity: r.capacity,
        size: r.size,
        view: r.view,
        amenities: r.amenities || [],
        images: r.images || [],
        featured: r.featured || false,
      }));
    }
  }
  return mockRooms;
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const rooms = await getRooms();
  return rooms.find(r => r.slug === slug) || null;
}

// -----------------------------------------------------------------
// Dining Database Methods
// -----------------------------------------------------------------
export async function getDining(): Promise<DiningVenue[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('dining').select('*');
    if (!error && data && data.length > 0) {
      return data.map((d: any) => ({
        id: d.id,
        name: d.name,
        slug: d.slug,
        description: d.description,
        cuisine: d.cuisine,
        hours: d.hours,
        dressCode: d.dress_code,
        reservationRequired: d.reservation_required,
        images: d.images || [],
      }));
    }
  }
  return mockDining;
}

// -----------------------------------------------------------------
// Experiences Database Methods
// -----------------------------------------------------------------
export async function getExperiences(): Promise<Experience[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('experiences').select('*');
    if (!error && data && data.length > 0) {
      return data.map((e: any) => ({
        id: e.id,
        name: e.name,
        slug: e.slug,
        description: e.description,
        duration: e.duration,
        price: Number(e.price),
        category: e.category,
        images: e.images || [],
      }));
    }
  }
  return mockExperiences;
}

// -----------------------------------------------------------------
// Conversations & Messages Database Methods
// -----------------------------------------------------------------
export async function getOrCreateConversation(
  sessionId: string,
  guestInfo?: { name?: string; email?: string; phone?: string; context?: any }
): Promise<any> {
  if (isSupabaseConfigured && supabase) {
    const { data: existing, error: findError } = await supabase
      .from('conversations')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (!findError && existing) {
      if (guestInfo) {
        const updateData: any = {};
        if (guestInfo.name) updateData.guest_name = guestInfo.name;
        if (guestInfo.email) updateData.guest_email = guestInfo.email;
        if (guestInfo.phone) updateData.guest_phone = guestInfo.phone;
        if (guestInfo.context) {
          updateData.context = { ...(existing.context || {}), ...guestInfo.context };
        }
        updateData.updated_at = new Date().toISOString();

        const { data: updated } = await supabase
          .from('conversations')
          .update(updateData)
          .eq('session_id', sessionId)
          .select()
          .single();
        return updated;
      }
      return existing;
    }

    // Create new
    const insertData = {
      session_id: sessionId,
      guest_name: guestInfo?.name || null,
      guest_email: guestInfo?.email || null,
      guest_phone: guestInfo?.phone || null,
      context: guestInfo?.context || {},
      status: 'new'
    };

    const { data: created, error: createError } = await supabase
      .from('conversations')
      .insert([insertData])
      .select()
      .single();

    if (!createError) return created;
  }

  // Fallback local memory
  let conv = globalMockStore.conversations.find((c: any) => c.session_id === sessionId);
  if (!conv) {
    conv = {
      id: "conv-" + generateUUID(),
      session_id: sessionId,
      guest_name: guestInfo?.name || null,
      guest_email: guestInfo?.email || null,
      guest_phone: guestInfo?.phone || null,
      context: guestInfo?.context || {},
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    globalMockStore.conversations.push(conv);
  } else if (guestInfo) {
    if (guestInfo.name) conv.guest_name = guestInfo.name;
    if (guestInfo.email) conv.guest_email = guestInfo.email;
    if (guestInfo.phone) conv.guest_phone = guestInfo.phone;
    if (guestInfo.context) conv.context = { ...(conv.context || {}), ...guestInfo.context };
    conv.updated_at = new Date().toISOString();
  }
  return conv;
}

export async function saveMessage(
  conversationId: string,
  role: 'user' | 'assistant' | 'system',
  content: string,
  metadata: any = {}
): Promise<any> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ conversation_id: conversationId, role, content, metadata }])
      .select()
      .single();
    if (!error && data) return data;
  }

  const msg = {
    id: "msg-" + generateUUID(),
    conversation_id: conversationId,
    role,
    content,
    metadata,
    created_at: new Date().toISOString()
  };
  globalMockStore.messages.push(msg);
  return msg;
}

export async function getMessages(conversationId: string): Promise<any[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    if (!error && data) return data;
  }
  return globalMockStore.messages
    .filter((m: any) => m.conversation_id === conversationId)
    .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}

// -----------------------------------------------------------------
// Leads Database Methods
// -----------------------------------------------------------------
export async function createLead(leadData: {
  conversation_id: string;
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  check_in?: string;
  check_out?: string;
  guests?: number;
  source?: string;
}): Promise<any> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        conversation_id: leadData.conversation_id,
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone || null,
        interest: leadData.interest || null,
        check_in: leadData.check_in || null,
        check_out: leadData.check_out || null,
        guests: leadData.guests || null,
        source: leadData.source || 'concierge',
        status: 'new'
      }])
      .select()
      .single();
    if (!error && data) return data;
  }

  const lead = {
    id: "lead-" + generateUUID(),
    ...leadData,
    status: 'new',
    created_at: new Date().toISOString()
  };
  globalMockStore.leads.push(lead);
  return lead;
}

export async function getLeads(): Promise<any[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (!error && data) return data;
  }
  return [...globalMockStore.leads].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function updateLeadStatus(id: string, status: 'new' | 'contacted' | 'converted' | 'lost'): Promise<any> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (!error && data) return data;
  }

  const lead = globalMockStore.leads.find((l: any) => l.id === id);
  if (lead) {
    lead.status = status;
  }
  return lead;
}

// -----------------------------------------------------------------
// Bookings Database Methods
// -----------------------------------------------------------------
export async function createBooking(bookingData: {
  guest_name: string;
  email: string;
  phone: string;
  room_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  price_paid?: number;
}): Promise<any> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        guest_name: bookingData.guest_name,
        email: bookingData.email,
        phone: bookingData.phone,
        room_id: bookingData.room_id,
        check_in: bookingData.check_in,
        check_out: bookingData.check_out,
        guests: bookingData.guests,
        status: 'confirmed',
        price_paid: bookingData.price_paid || null
      }])
      .select()
      .single();
    if (!error && data) return data;
  }

  const booking = {
    id: "booking-" + generateUUID(),
    ...bookingData,
    status: 'confirmed',
    created_at: new Date().toISOString()
  };
  globalMockStore.bookings.push(booking);
  return booking;
}

export async function getBookings(): Promise<any[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (!error && data) return data;
  }
  return [...globalMockStore.bookings].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// -----------------------------------------------------------------
// Conversations List for Admin Dashboard
// -----------------------------------------------------------------
export async function getConversations(): Promise<any[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('conversations').select('*').order('updated_at', { ascending: false });
    if (!error && data) return data;
  }
  return [...globalMockStore.conversations].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
}

export async function updateConversationStatus(
  sessionId: string, 
  status: 'new' | 'interested' | 'booking_intent' | 'contacted' | 'converted' | 'closed'
): Promise<any> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('conversations')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('session_id', sessionId)
      .select()
      .single();
    if (!error && data) return data;
  }

  const conv = globalMockStore.conversations.find((c: any) => c.session_id === sessionId);
  if (conv) {
    conv.status = status;
    conv.updated_at = new Date().toISOString();
  }
  return conv;
}

// -----------------------------------------------------------------
// Analytics Event Logging (AskMyData Integration Ready)
// -----------------------------------------------------------------
export async function logAnalyticsEvent(
  eventName: string,
  sessionId: string,
  metadata: any = {}
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from('analytics_events').insert([{
      event_name: eventName,
      session_id: sessionId,
      metadata
    }]);
    return;
  }

  globalMockStore.analyticsEvents.push({
    id: "evt-" + generateUUID(),
    event_name: eventName,
    session_id: sessionId,
    metadata,
    created_at: new Date().toISOString()
  });
}

// -----------------------------------------------------------------
// Get Aggregated Analytics for Admin Dashboard
// -----------------------------------------------------------------
export async function getAnalyticsSummary(): Promise<any> {
  const conversations = await getConversations();
  const leads = await getLeads();
  const bookings = await getBookings();
  
  // Aggregate events (local + db logic fallback)
  let events = [];
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('analytics_events').select('*');
    events = data || [];
  } else {
    events = globalMockStore.analyticsEvents;
  }

  const uniqueSessions = new Set(events.map((e: any) => e.session_id)).size;
  const whatsappClicks = events.filter((e: any) => e.event_name === 'whatsapp_clicked').length;
  const conciergeOpens = events.filter((e: any) => e.event_name === 'concierge_opened').length;
  const bookingStarts = events.filter((e: any) => e.event_name === 'booking_started').length;
  const bookingsCount = bookings.length;
  const qualifiedLeads = leads.filter((l: any) => l.status !== 'lost').length;
  const handoffs = conversations.filter((c: any) => c.status === 'contacted' || c.status === 'closed').length; // simple approximation

  // Room interests count
  const roomInterestCounts: Record<string, number> = {};
  leads.forEach((l: any) => {
    if (l.interest) {
      roomInterestCounts[l.interest] = (roomInterestCounts[l.interest] || 0) + 1;
    }
  });
  const roomInterests = Object.entries(roomInterestCounts).map(([name, count]) => ({ name, count }));

  // Conversation trend over past 7 days
  const dailyConversations: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const dateStr = new Date(Date.now() - i * 24 * 3600 * 1000).toISOString().split('T')[0];
    dailyConversations[dateStr] = 0;
  }
  conversations.forEach((c: any) => {
    const dateStr = c.created_at.split('T')[0];
    if (dailyConversations[dateStr] !== undefined) {
      dailyConversations[dateStr]++;
    }
  });
  const conversationTrend = Object.entries(dailyConversations).map(([date, count]) => ({ date, count }));

  // Lead Conversion rate: bookings / unique_sessions
  const conversionRate = uniqueSessions > 0 ? Math.round((bookingsCount / uniqueSessions) * 100) : 0;

  return {
    totalConversations: conversations.length,
    uniqueVisitors: Math.max(uniqueSessions, conversations.length),
    conciergeOpens,
    leadsCount: leads.length,
    qualifiedLeads,
    whatsappClicks,
    bookingsCount,
    humanHandoffs: handoffs,
    conversionRate,
    roomInterests,
    conversationTrend,
    recentLeads: leads.slice(0, 5)
  };
}
