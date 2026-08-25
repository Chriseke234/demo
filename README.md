# Aurelia Grand — AI-Powered Luxury Hotel Experience

> A production-quality luxury hotel website with an intelligent digital concierge, WhatsApp handoff, lead capture, and admin analytics dashboard. Built as a sales demo for hospitality businesses.

![Aurelia Grand](https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=1200&auto=format&fit=crop)

---

## Overview

**Aurelia Grand** is a fictional 5-star contemporary hotel located in Dubai Marina, UAE. This project demonstrates:

- 🏨 **Premium editorial hotel website** with cinematic photography
- 🤖 **AI Concierge ("Aurelia")** — natural, context-aware, hotel-grounded conversations
- 📲 **WhatsApp continuity** — carry AI conversations to WhatsApp in one click
- 🧑‍💼 **Admin dashboard** — view conversations, manage leads, track bookings
- 📊 **Analytics** — AskMyData-ready event tracking architecture
- 💾 **Supabase backend** — PostgreSQL database with RLS, or local memory fallback

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Fonts | Playfair Display, Inter (via next/font) |
| Database | Supabase (PostgreSQL) |
| AI Provider | Gemini / OpenAI (modular) or Mock fallback |
| Deployment | Vercel-compatible |

---

## Local Setup

### 1. Clone & Install

```bash
git clone <repo-url>
cd Demo
npm install
```

### 2. Configure Environment

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server only) |
| `AI_API_KEY` | Optional | Gemini (`AIza...`) or OpenAI (`sk-...`) key. If absent, uses smart mock responses |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | WhatsApp number in international format, digits only (e.g. `971501234567`) |

### 3. Apply Database Schema

```bash
node scripts/migrate.js
```

This creates all tables and seeds demo data. If the management API is unavailable, the app automatically falls back to in-memory demo data — **the demo works out of the box even without Supabase**.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Application Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage (cinematic hero, suites, dining)
│   ├── rooms/                      # Suite listings + [slug] detail pages
│   ├── dining/                     # Dining venues
│   ├── spa/                        # Wellness & spa treatments
│   ├── experiences/                # Curated activities
│   ├── events/                     # Meetings & events + RFP form
│   ├── gallery/                    # Photo gallery
│   ├── contact/                    # Contact form + details
│   ├── book/                       # Multi-step demo booking wizard
│   ├── concierge/                  # Full-screen AI concierge page
│   ├── admin/                      # Protected admin dashboard
│   │   ├── page.tsx                # Overview + stats
│   │   ├── conversations/          # AI conversation inbox
│   │   ├── leads/                  # Lead management
│   │   ├── bookings/               # Booking records
│   │   └── analytics/              # Analytics + AskMyData readiness
│   └── api/
│       ├── concierge/route.ts      # AI chat endpoint (server-side)
│       ├── leads/route.ts          # Lead capture endpoint
│       ├── bookings/route.ts       # Booking submission endpoint
│       ├── analytics/route.ts      # Event tracking endpoint
│       └── admin/                  # Admin data endpoints
├── components/
│   ├── Header.tsx                  # Responsive sticky header
│   ├── Footer.tsx                  # Site footer
│   ├── WhatsAppButton.tsx          # WhatsApp CTA with contextual messages
│   └── concierge/
│       ├── ConciergeLauncher.tsx   # Floating launcher widget
│       └── ConciergePanel.tsx      # Full chat UI with questionnaire
├── data/
│   └── mockData.ts                 # Hotel data (rooms, dining, experiences, spa, FAQs)
└── lib/
    ├── ai.ts                       # AI provider abstraction (Gemini/OpenAI/Mock)
    ├── db.ts                       # Database layer (Supabase + memory fallback)
    └── supabase.ts                 # Supabase client initialisation
```

---

## AI Concierge Architecture

The `/api/concierge` endpoint handles all AI interactions server-side:

1. **Session lookup** — loads existing conversation from Supabase or memory
2. **History retrieval** — fetches last 8 messages for context
3. **Grounding** — injects structured hotel data (rooms, dining, spa, FAQs) into system prompt
4. **AI call** — sends to Gemini or OpenAI; falls back to smart mock if no key
5. **Context extraction** — AI returns structured JSON with guest name, dates, room interest, occasions
6. **Status update** — conversation status auto-advances (new → interested → booking_intent)
7. **Event logging** — structured analytics events stored for AskMyData readiness

### AI Provider Selection

The provider is chosen automatically based on the `AI_API_KEY` prefix:
- `AIza...` → Gemini 1.5 Flash
- `sk-...` → OpenAI GPT-4o-mini
- Empty / `your_ai_api_key_here` → Smart mock responses (works fully for demos)

---

## WhatsApp Integration

WhatsApp CTAs generate contextual pre-filled messages using the guest's conversation context:

```
Hi Aurelia Grand, I'm Christopher. I'm planning an anniversary trip for two 
from Sep 14–17. Aurelia recommended the Marina Suite and I'd like to 
continue discussing availability.
```

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to your number in international format (digits only, no `+`).

---

## Analytics Events (AskMyData-Ready)

All events stored in `analytics_events` with full metadata:

| Event | Trigger |
|---|---|
| `concierge_opened` | Guest opens the chat panel |
| `message_sent` | Each chat message |
| `room_recommended` | AI recommends a specific room |
| `lead_created` | Guest submits contact details |
| `booking_started` | Guest enters booking flow |
| `booking_completed` | Booking form submitted |
| `whatsapp_clicked` | Guest clicks any WhatsApp CTA |
| `human_handoff` | AI escalates to human staff |

---

## Demo Journey

The optimal sales demonstration path:

1. **Homepage** → Cinematic hero, explore hotel
2. **Rooms page** → Browse suites
3. **Open concierge** → "I'm visiting for our anniversary, what room would you recommend?"
4. **AI responds** → Recommends Marina Suite with context
5. **Guest provides dates** → AI updates context, shows WhatsApp CTA
6. **Lead capture** → Guest provides name + email
7. **WhatsApp handoff** → One-click with pre-filled contextual message
8. **Admin dashboard** → See lead in `/admin/leads` and conversation in `/admin/conversations`

---

## Deployment

This project is Vercel-compatible. Add all environment variables to your Vercel project settings and deploy:

```bash
vercel --prod
```

---

## Future Expansion

- **AskMyData integration** — query all analytics events with natural language
- **Real availability API** — connect to a PMS (Property Management System)
- **Real payment processing** — Stripe integration for live bookings
- **Multi-property support** — extend schema for hotel chains
- **Voice concierge** — add browser voice input to the AI panel
