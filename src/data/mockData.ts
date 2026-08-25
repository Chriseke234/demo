// Mock Data & Seed Data for Aurelia Grand Luxury Hotel

export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  capacity: number;
  size: string;
  view: string;
  amenities: string[];
  images: string[];
  featured: boolean;
}

export interface DiningVenue {
  id: string;
  name: string;
  slug: string;
  description: string;
  cuisine: string;
  hours: string;
  dressCode: string;
  reservationRequired: boolean;
  images: string[];
  signatureExperience?: string;
}

export interface Experience {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: string;
  price: number;
  category: 'Land' | 'Sea' | 'Wellness' | 'Gastronomy';
  images: string[];
}

export interface SpaTreatment {
  name: string;
  duration: string;
  price: number;
  description: string;
  category: 'Massage' | 'Facial' | 'Body' | 'Ritual';
}

export interface FAQ {
  question: string;
  answer: string;
  category: 'general' | 'booking' | 'spa' | 'dining' | 'policy';
}

// 1. Rooms
export const mockRooms: Room[] = [
  {
    id: "room-marina-suite",
    name: "Marina Suite",
    slug: "marina-suite",
    description: "Designed for unhurried mornings, the Marina Suite offers sweeping, panoramic floor-to-ceiling views of the Dubai Marina skyline. Unwind in a spacious living area, dine on your private terrace, or retreat to the lavish marble bath.",
    price: 750,
    capacity: 2,
    size: "85 sqm",
    view: "Dubai Marina Skyline",
    amenities: [
      "Private Panoramic Terrace",
      "Spa-Style Marble Bathroom",
      "24-Hour Dedicated Butler Service",
      "Nespresso Vertuo Espresso Machine",
      "Complimentary High-speed Wi-Fi",
      "Pillow Menu & Frette Luxury Linens",
      "Walk-in Wardrobe",
      "Bespoke Diptyque Bath Amenities"
    ],
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop", // Bedroom
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop", // Living area
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop"  // Luxury bathroom
    ],
    featured: true
  },
  {
    id: "room-executive",
    name: "Aurelia Executive Room",
    slug: "aurelia-executive-room",
    description: "A refined sanctuary tailored for the modern global traveler. Balancing sophisticated design and exceptional comfort, the room features an ergonomic executive work alcove, a king bed, and private city skyline views.",
    price: 450,
    capacity: 2,
    size: "50 sqm",
    view: "Dubai City Skyline",
    amenities: [
      "Ergonomic Workspace & Desk",
      "Rain Shower & Deep Soak Tub",
      "In-room Nespresso Espresso Station",
      "Complimentary High-speed Wi-Fi",
      "Smart Interactive LED TV",
      "Pillow Menu & Luxury Linens",
      "Fully Stocked Curated Mini Bar",
      "Plush Waffle Robes & Slippers"
    ],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop", // Elegant Room
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop"  // Alternate angle
    ],
    featured: true
  },
  {
    id: "room-family-residence",
    name: "Family Residence",
    slug: "family-residence",
    description: "Our expansive two-bedroom residence is designed to feel like a private home in Dubai Marina. Features separate bedrooms, a spacious central living room, a modern kitchenette, and children's customized amenities.",
    price: 1200,
    capacity: 4,
    size: "140 sqm",
    view: "Dubai Marina & City Sky",
    amenities: [
      "Two Separate King Bedrooms",
      "Expansive Central Living Room",
      "Modern Kitchenette with Induction Stoves",
      "Private Panoramic Balcony",
      "Two Full Marble Bathrooms",
      "Dedicated Children's Welcome Kits",
      "24-Hour Butler & In-room Dining",
      "Apple TV & Gaming System Setup"
    ],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop", // Large Suite
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop"  // Family living
    ],
    featured: false
  }
];

// 2. Dining
export const mockDining: DiningVenue[] = [
  {
    id: "dining-aurelia-mare",
    name: "Aurelia Mare",
    slug: "aurelia-mare",
    description: "Bringing the spirit of the Amalfi Coast to Dubai Marina. Enjoy freshly caught seafood, handmade pastas, and fine Italian wines on our romantic outdoor terrace overlooking the water.",
    cuisine: "Mediterranean Fine Dining",
    hours: "12:00 PM – 11:30 PM Daily",
    dressCode: "Elegant Dress Code (Collared shirts and smart shoes required)",
    reservationRequired: true,
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop" // Mediterranean Dining
    ],
    signatureExperience: "Amalfi Coastal Tasting Menu - a 7-course seafood journey curated by Chef Matteo."
  },
  {
    id: "dining-ember",
    name: "Ember",
    slug: "ember",
    description: "An intimate, fire-kissed dining room showcasing premium cuts of dry-aged Wagyu beef, fresh local oysters, and heritage vegetables grilled over artisanal charcoal.",
    cuisine: "Modern Steakhouse & Grill",
    hours: "6:00 PM – Midnight Daily",
    dressCode: "Smart Casual (Smart trousers and shirts, no athletic wear)",
    reservationRequired: true,
    images: [
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop" // Modern grill
    ],
    signatureExperience: "A5 Miyazaki Wagyu ribeye, smoked tableside with applewood embers."
  },
  {
    id: "dining-atrium",
    name: "The Atrium",
    slug: "the-atrium",
    description: "A bright, glass-domed sanctuary. The Atrium serves our signature breakfast buffet in the morning, artisanal pastries throughout the afternoon, and a highly acclaimed traditional English Afternoon Tea.",
    cuisine: "Artisanal Pastry, Light Plates & Afternoon Tea",
    hours: "7:00 AM – 6:00 PM Daily",
    dressCode: "Casual Elegant (Comfortable yet polished)",
    reservationRequired: false,
    images: [
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop" // Glass-domed cafe/lounge
    ],
    signatureExperience: "The Royal Afternoon Tea, featuring single-origin teas, homemade warm scones, and delicate savories."
  },
  {
    id: "dining-sky-lounge",
    name: "Sky Lounge",
    slug: "sky-lounge",
    description: "Perched on the 42nd floor, Sky Lounge offers creative cocktails, alcohol-free mocktails, small tapas plates, and an outdoor terrace with unmatched 360-degree views of the Dubai Marina skyline and Palm Jumeirah.",
    cuisine: "Tapas, Signature Cocktails & Skyline Views",
    hours: "5:00 PM – 2:00 AM Daily",
    dressCode: "Sophisticated / High Fashion",
    reservationRequired: true,
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop" // High end bar/lounge
    ],
    signatureExperience: "Sunset Mixology Flights - 3 custom pairings matched with gourmet tapas as the sun sets over the Arabian Gulf."
  }
];

// 3. Experiences
export const mockExperiences: Experience[] = [
  {
    id: "exp-sunset-cruise",
    name: "Marina Sunset Cruise",
    slug: "marina-sunset-cruise",
    description: "Step aboard our private luxury yacht for a 2-hour guided cruise along the Dubai Marina and Palm Jumeirah. Sip premium beverages and enjoy a curated selection of hors d'oeuvres as the skyline transitions to twilight.",
    duration: "2 Hours (Starts at 5:00 PM)",
    price: 250,
    category: "Sea",
    images: [
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop" // Private yacht
    ]
  },
  {
    id: "exp-private-tour",
    name: "Curated Historic & Modern Tour",
    slug: "curated-tour",
    description: "Discover the heritage of Dubai in a private chauffeured luxury sedan. Tour the historic Al Fahidi neighborhood, cross the Creek in a private abra, and enjoy fast-track entry to the Burj Khalifa's upper decks.",
    duration: "4 Hours",
    price: 180,
    category: "Land",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop" // Dubai Skyline
    ]
  },
  {
    id: "exp-desert",
    name: "Royal Desert Expedition",
    slug: "desert-expedition",
    description: "Venture into the pristine dunes in a private vintage Land Rover. Observe Arabian Oryx, enjoy a sunset falconry display, and savor a traditional five-course Emirati dinner in a secluded royal desert retreat.",
    duration: "6 Hours (Starts at 2:30 PM)",
    price: 320,
    category: "Land",
    images: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop" // Desert dunes
    ]
  },
  {
    id: "exp-couples",
    name: "Couples' Seaside Wellness Ritual",
    slug: "couples-wellness-ritual",
    description: "A private wellness retreat starting with a signature massage at the Aurelia Spa, followed by a personal outdoor sound bath session on our secluded beachfront cabana, ending with organic champagne and fruits.",
    duration: "3 Hours",
    price: 450,
    category: "Wellness",
    images: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop" // Wellness/Spa
    ]
  }
];

// 4. Spa Treatments
export const mockSpaTreatments: SpaTreatment[] = [
  {
    name: "Aurelia Signature Gold Massage",
    duration: "90 Minutes",
    price: 280,
    description: "A therapeutic full-body massage using 24k gold-infused massage oils. Designed to relieve deep muscle tension, stimulate circulation, and leave a subtle, luminous glow.",
    category: "Massage"
  },
  {
    name: "Deep Sea Hydration Facial",
    duration: "60 Minutes",
    price: 180,
    description: "A restorative facial harnessing marine algae extracts and concentrated hyaluronic acid. Leaves the skin intensely hydrated, plump, and glowing.",
    category: "Facial"
  },
  {
    name: "Hammam Botanical Ritual",
    duration: "75 Minutes",
    price: 220,
    description: "An authentic, deeply cleansing hammam ritual featuring black soap exfoliation, a calming eucalyptus steam session, and a nourishing clay wrap.",
    category: "Ritual"
  },
  {
    name: "Himalayan Salt Body Scrub",
    duration: "60 Minutes",
    price: 160,
    description: "Exfoliating mineral-rich salt crystals blended with rose and sandalwood essential oils to smooth the skin and calm the nervous system.",
    category: "Body"
  }
];

// 5. General Hotel FAQs (for AI Grounding Context)
export const mockFAQs: FAQ[] = [
  {
    question: "What time is check-in and check-out?",
    answer: "Check-in begins at 3:00 PM, and check-out is by 12:00 PM. Early check-in or late check-out can be requested, subject to availability, or arranged in advance by contacting our reservations desk.",
    category: "policy"
  },
  {
    question: "Do you offer airport transfers?",
    answer: "Yes, we offer private airport transfers to and from Dubai International Airport (DXB) and Al Maktoum Airport (DWC). Vehicles range from premium sedans ($120 each way) to luxury SUVs ($180 each way) and our private chauffeured Rolls-Royce ($450 each way).",
    category: "general"
  },
  {
    question: "Is breakfast included in the room rate?",
    answer: "Breakfast is included in all bookings for our Marina Suites and Family Residences. For Executive Rooms, a full buffet breakfast can be added at the time of booking or purchased for $45 per guest per day at The Atrium.",
    category: "booking"
  },
  {
    question: "What are the swimming pool and beach club hours?",
    answer: "Our infinity pool overlooking Dubai Marina is open daily from 6:00 AM to 10:00 PM. Our private resident beach area is open from sunrise to sunset.",
    category: "general"
  },
  {
    question: "Is there parking available on site?",
    answer: "Yes, complimentary secure valet parking is provided for all hotel guests and restaurant visitors at the main entrance.",
    category: "general"
  },
  {
    question: "What is your cancellation policy?",
    answer: "Standard bookings can be cancelled free of charge up to 48 hours prior to check-in. Promotional or suite bookings may have specific terms, which can be viewed in your booking summary.",
    category: "policy"
  }
];
