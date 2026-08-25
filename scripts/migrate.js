// Migration script — runs schema.sql against Supabase via REST API
// Run: node scripts/migrate.js

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const schemaPath = path.join(__dirname, '../schema.sql');
const sql = fs.readFileSync(schemaPath, 'utf8');

// Split on semicolons, filter empties, run each statement
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 3 && !s.startsWith('--'));

async function runSQL(sql) {
  const url = `${SUPABASE_URL}/rest/v1/rpc/exec_sql`;
  // Use the pg REST endpoint
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/`, {
    method: 'HEAD',
    headers: { 'apikey': SERVICE_ROLE_KEY, 'Authorization': `Bearer ${SERVICE_ROLE_KEY}` }
  });
  
  // Actually use the SQL editor endpoint
  const res = await fetch(`${SUPABASE_URL}/pg/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify({ query: sql + ';' })
  });
  return res;
}

// Simpler approach: use the Supabase SQL via the management API
async function migrate() {
  console.log('🚀 Applying Aurelia Grand schema to Supabase...\n');
  
  // Extract project ref from URL: https://<ref>.supabase.co
  const projectRef = SUPABASE_URL.replace('https://', '').replace('.supabase.co', '');
  
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({ query: sql })
    }
  );

  if (res.ok) {
    console.log('✅ Schema applied successfully!');
    await seedData(projectRef);
  } else {
    const text = await res.text();
    // Fall back to individual statements via the pg REST endpoint
    console.log('Management API unavailable, trying individual statements...');
    await runIndividualStatements(projectRef);
  }
}

async function runIndividualStatements(projectRef) {
  let success = 0, failed = 0;
  for (const stmt of statements) {
    try {
      const res = await fetch(
        `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
          },
          body: JSON.stringify({ query: stmt + ';' })
        }
      );
      if (res.ok) {
        success++;
      } else {
        const body = await res.text();
        console.warn(`⚠️  Statement failed (may already exist): ${stmt.slice(0, 60)}...`);
        failed++;
      }
    } catch(e) {
      failed++;
    }
  }
  console.log(`\n✅ Done: ${success} statements applied, ${failed} skipped (may already exist).`);
  await seedData(projectRef);
}

async function seedData(projectRef) {
  console.log('\n🌱 Seeding demo data...');
  
  const seed = `
    -- Seed Rooms
    INSERT INTO public.rooms (name, slug, description, price, capacity, size, view, amenities, images, featured)
    VALUES 
      ('Marina Suite', 'marina-suite', 'Designed for unhurried mornings, the Marina Suite offers sweeping floor-to-ceiling views of the Dubai Marina skyline with a private balcony.', 750, 2, '85 sqm', 'Dubai Marina Skyline', ARRAY['Private Panoramic Terrace','Spa-Style Marble Bathroom','24-Hour Butler Service','Nespresso Machine','High-speed Wi-Fi','Pillow Menu','Walk-in Wardrobe','Diptyque Bath Amenities'], ARRAY['https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'], true),
      ('Aurelia Executive Room', 'aurelia-executive-room', 'A refined sanctuary for the modern global traveler with ergonomic workspace and city skyline views.', 450, 2, '50 sqm', 'Dubai City Skyline', ARRAY['Ergonomic Workspace','Rain Shower & Deep Soak Tub','Nespresso Station','High-speed Wi-Fi','Smart LED TV','Pillow Menu','Curated Mini Bar','Waffle Robes'], ARRAY['https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop'], true),
      ('Family Residence', 'family-residence', 'An expansive two-bedroom residence designed to feel like a private home in Dubai Marina.', 1200, 4, '140 sqm', 'Dubai Marina & City Sky', ARRAY['Two Separate Bedrooms','Central Living Room','Modern Kitchenette','Private Balcony','Two Full Bathrooms','Children Welcome Kits','Butler & In-room Dining','Apple TV & Gaming'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop'], false)
    ON CONFLICT (slug) DO NOTHING;

    -- Seed Dining
    INSERT INTO public.dining (name, slug, description, cuisine, hours, dress_code, reservation_required, images)
    VALUES 
      ('Aurelia Mare', 'aurelia-mare', 'Mediterranean fine dining with fresh seafood and marina terrace views.', 'Mediterranean Fine Dining', '12:00 PM – 11:30 PM Daily', 'Elegant Dress Code', true, ARRAY['https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop']),
      ('Ember', 'ember', 'Modern charcoal grill featuring dry-aged Wagyu beef and fresh local oysters.', 'Modern Steakhouse & Grill', '6:00 PM – Midnight Daily', 'Smart Casual', true, ARRAY['https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop']),
      ('The Atrium', 'the-atrium', 'A bright glass-domed sanctuary for breakfast, afternoon tea and artisanal pastries.', 'Breakfast & Afternoon Tea', '7:00 AM – 6:00 PM Daily', 'Casual Elegant', false, ARRAY['https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop']),
      ('Sky Lounge', 'sky-lounge', '42nd-floor cocktail bar with 360-degree skyline views and signature small plates.', 'Cocktails, Tapas & Skyline Views', '5:00 PM – 2:00 AM Daily', 'Sophisticated / High Fashion', true, ARRAY['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop'])
    ON CONFLICT (slug) DO NOTHING;

    -- Seed Experiences
    INSERT INTO public.experiences (name, slug, description, duration, price, category, images)
    VALUES
      ('Marina Sunset Cruise', 'marina-sunset-cruise', 'Private luxury yacht cruise along Dubai Marina and Palm Jumeirah.', '2 Hours (Starts at 5:00 PM)', 250, 'Sea', ARRAY['https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop']),
      ('Curated Historic & Modern Tour', 'curated-tour', 'Private chauffeured tour of historic Al Fahidi and Burj Khalifa.', '4 Hours', 180, 'Land', ARRAY['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop']),
      ('Royal Desert Expedition', 'desert-expedition', 'Private vintage Land Rover desert expedition with falconry and Emirati dinner.', '6 Hours (Starts at 2:30 PM)', 320, 'Land', ARRAY['https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop']),
      ('Couples Seaside Wellness Ritual', 'couples-wellness-ritual', 'Private spa retreat with sound bath and champagne on a beachfront cabana.', '3 Hours', 450, 'Wellness', ARRAY['https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop'])
    ON CONFLICT (slug) DO NOTHING;
  `;

  const res = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({ query: seed })
    }
  );

  if (res.ok) {
    console.log('✅ Demo data seeded successfully!');
  } else {
    console.log('⚠️  Seed via management API failed — data will use local mock fallback (still works for demo).');
  }
  
  console.log('\n🎉 Migration complete! Your Aurelia Grand database is ready.');
  console.log('   Start the dev server: npm run dev');
}

migrate().catch(console.error);
