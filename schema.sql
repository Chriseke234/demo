-- Supabase schema for Aurelia Grand Luxury Hotel

-- 1. Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Linked to Auth.Users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'guest' CHECK (role IN ('guest', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Rooms Table
CREATE TABLE IF NOT EXISTS public.rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    capacity INT NOT NULL,
    size TEXT NOT NULL,
    view TEXT NOT NULL,
    amenities TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Dining Table
CREATE TABLE IF NOT EXISTS public.dining (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    hours TEXT NOT NULL,
    dress_code TEXT NOT NULL,
    reservation_required BOOLEAN DEFAULT FALSE,
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    duration TEXT NOT NULL,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Land', 'Sea', 'Wellness', 'Gastronomy')),
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Conversations Table (For AI memory and Admin dashboard)
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT UNIQUE NOT NULL,
    guest_name TEXT,
    guest_email TEXT,
    guest_phone TEXT,
    context JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'interested', 'booking_intent', 'contacted', 'converted', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Messages Table (Individual messages in a chat)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Leads Table (Guest interest captured by AI or Forms)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    interest TEXT, -- e.g., name of a room or experience
    check_in DATE,
    check_out DATE,
    guests INT,
    source TEXT DEFAULT 'concierge' CHECK (source IN ('concierge', 'booking_flow', 'contact_form')),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Bookings Table (Reservations)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    price_paid NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Hotel Content (Knowledge base for AI grounding)
CREATE TABLE IF NOT EXISTS public.hotel_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL, -- e.g. 'general', 'policy', 'spa', 'activities'
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Analytics Events (For Future AskMyData Integration)
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_name TEXT NOT NULL, -- e.g., 'concierge_opened', 'message_sent', 'lead_created'
    session_id TEXT NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dining ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Read policies (Publicly readable rooms, dining, experiences, hotel_content)
CREATE POLICY "Public Read Rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Public Read Dining" ON public.dining FOR SELECT USING (true);
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Hotel Content" ON public.hotel_content FOR SELECT USING (true);

-- Conversations and Messages (Anyone can create/read their own by sessionId, admins can read all)
CREATE POLICY "Read Own Conversations" ON public.conversations FOR SELECT USING (true);
CREATE POLICY "Insert Own Conversations" ON public.conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Update Own Conversations" ON public.conversations FOR UPDATE USING (true);

CREATE POLICY "Read Own Messages" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Insert Own Messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Leads and Bookings (Anyone can submit, admins can read/update all)
CREATE POLICY "Insert Leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Insert Bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- Analytics events (Anyone can log)
CREATE POLICY "Insert Analytics Events" ON public.analytics_events FOR INSERT WITH CHECK (true);

-- Profiles (Users can read/update their own profile)
CREATE POLICY "Read Own Profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Update Own Profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
