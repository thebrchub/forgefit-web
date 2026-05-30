export const trainers = [
  {
    id: 1,
    name: "Marcus Vance",
    role: "Head of Strength & Conditioning",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?auto=format&fit=crop&q=80&w=600",
    specialization: "Olympic Lifting, Hypertrophy",
    certs: ["CSCS", "USAW Level 2"]
  },
  {
    id: 2,
    name: "Aria Thorne",
    role: "HIIT & Mobility Specialist",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
    specialization: "Functional Athleticism, Recovery",
    certs: ["NASM-PES", "FMS Level 1"]
  }
];

export const pricingPlans = {
  monthly: [
    { name: "Club", price: 49, features: ["Access to 1 Location", "Full Gym Floor", "Locker Room Access"] },
    { name: "Elite", price: 89, features: ["All Locations", "Unlimited Group Classes", "1 Complimentary PT Session/mo", "Recovery Zone Access"], popular: true },
    { name: "VIP Performance", price: 159, features: ["24/7 Access", "Dedicated Coach", "Custom Nutrition Blueprint", "Unlimited Cryotherapy"] }
  ],
  annual: [
    { name: "Club", price: 39, features: ["Access to 1 Location", "Full Gym Floor", "Locker Room Access"] },
    { name: "Elite", price: 69, features: ["All Locations", "Unlimited Group Classes", "1 Complimentary PT Session/mo", "Recovery Zone Access"], popular: true },
    { name: "VIP Performance", price: 129, features: ["24/7 Access", "Dedicated Coach", "Custom Nutrition Blueprint", "Unlimited Cryotherapy"] }
  ]
};

export const transformations = [
  { id: 1, name: "David K.", challenge: "Fat Loss & Muscle Gain", duration: "12 Weeks", before: "102 kg", after: "84 kg", imgBefore: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300", imgAfter: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300" }
];