// Mock data for StellaWare. Replace with real backend calls when integrating.
// All data is intentionally typed so swapping in API calls is a 1:1 change.

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  price: number;
  game: string;
  image: string; // emoji or URL
  visible: boolean;
  badge?: string;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "stella-valorant",
    name: "Stella Valorant",
    tagline: "Sub-tick aim assistance",
    description:
      "Frame-perfect aim assistance, ESP, and recoil control engineered for Riot's Vanguard.",
    features: ["Smooth Aimbot", "Player & Weapon ESP", "Recoil Control", "Stream Proof", "HWID Spoofer"],
    price: 24.99,
    game: "Valorant",
    image: "🎯",
    visible: true,
    badge: "Most Popular",
  },
  {
    id: "stella-fortnite",
    name: "Stella Fortnite",
    tagline: "Build like a god",
    description:
      "Silent aim, edit assist, and full ESP suite tuned for competitive Fortnite.",
    features: ["Silent Aim", "Edit Assist", "Loot ESP", "Wallhack", "BattlEye Bypass"],
    price: 19.99,
    game: "Fortnite",
    image: "🏗️",
    visible: true,
  },
  {
    id: "stella-apex",
    name: "Stella Apex",
    tagline: "Champion every match",
    description:
      "Predictive aimbot with full legend, weapon and loot ESP for Apex Legends.",
    features: ["Predictive Aim", "Legend ESP", "Loot Filter", "No Recoil", "Radar Hack"],
    price: 22.99,
    game: "Apex Legends",
    image: "🔫",
    visible: true,
  },
  {
    id: "stella-warzone",
    name: "Stella Warzone",
    tagline: "Win Verdansk on repeat",
    description: "Full Warzone suite with Ricochet-safe injection and undetected ESP.",
    features: ["Bone Aimbot", "2D/3D ESP", "No Spread", "Ricochet Safe", "Auto Update"],
    price: 29.99,
    game: "Warzone",
    image: "🎖️",
    visible: true,
    badge: "New",
  },
  {
    id: "stella-rust",
    name: "Stella Rust",
    tagline: "Wipe the server",
    description: "Aim, ESP, and item-finder built for the brutal world of Rust.",
    features: ["Smooth Aim", "Player ESP", "Item ESP", "No Recoil", "EAC Bypass"],
    price: 21.99,
    game: "Rust",
    image: "🪓",
    visible: true,
  },
  {
    id: "stella-r6",
    name: "Stella Rainbow Six",
    tagline: "Drone-free wins",
    description: "Operator ESP, gadget tracking, and recoil control for Siege.",
    features: ["Operator ESP", "Gadget Tracker", "No Recoil", "Drone Highlight", "BattlEye Safe"],
    price: 23.99,
    game: "Rainbow Six",
    image: "🛡️",
    visible: false,
  },
];

export type License = {
  id: string;
  product: string;
  domain: string;
  key: string;
  status: "active" | "expired" | "paused";
  expires: string; // ISO date
  activatedAt: string;
};

export const MOCK_LICENSES: License[] = [
  {
    id: "L-9F31",
    product: "Stella Valorant",
    domain: "play.crew-alpha.gg",
    key: "STLA-VAL-9F31-7K2P-MX44",
    status: "active",
    expires: "2026-12-04",
    activatedAt: "2026-05-01",
  },
  {
    id: "L-A102",
    product: "Stella Fortnite",
    domain: "loadout.skyriders.io",
    key: "STLA-FOR-A102-44ZH-QQ09",
    status: "active",
    expires: "2026-09-22",
    activatedAt: "2026-03-15",
  },
  {
    id: "L-77BD",
    product: "Stella Warzone",
    domain: "verdansk.team-rage.net",
    key: "STLA-WAR-77BD-91KP-LL31",
    status: "paused",
    expires: "2026-08-10",
    activatedAt: "2026-02-10",
  },
  {
    id: "L-3320",
    product: "Stella Apex",
    domain: "apex.lobby-six.com",
    key: "STLA-APX-3320-XX99-PP10",
    status: "expired",
    expires: "2026-04-30",
    activatedAt: "2025-10-30",
  },
];

export type Review = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  rating: number;
  product: string;
  text: string;
};

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    name: "VexShadow",
    handle: "@vexshadow",
    avatar: "🦊",
    rating: 5,
    product: "Stella Valorant",
    text: "Hit Immortal in 2 weeks. Lobbies straight up rage quit. Cleanest aim feel I've used.",
  },
  {
    id: "r2",
    name: "NovaFrag",
    handle: "@novafrag",
    avatar: "🌙",
    rating: 5,
    product: "Stella Warzone",
    text: "Survived every Ricochet wave so far. Update window is wild fast — like under an hour.",
  },
  {
    id: "r3",
    name: "K1ngPixel",
    handle: "@k1ngpixel",
    avatar: "🐉",
    rating: 4,
    product: "Stella Fortnite",
    text: "Edit assist alone is worth the price. Silent aim is dialed perfectly for legit lobbies.",
  },
  {
    id: "r4",
    name: "ZeroChill",
    handle: "@zerochill",
    avatar: "❄️",
    rating: 5,
    product: "Stella Apex",
    text: "Predictive aim is unreal on Wingman. Support replies in minutes, not days.",
  },
  {
    id: "r5",
    name: "RinGG",
    handle: "@ringg",
    avatar: "🌸",
    rating: 5,
    product: "Stella Rust",
    text: "Item ESP changed how I wipe. Setup took less than 5 minutes.",
  },
  {
    id: "r6",
    name: "ByteHunter",
    handle: "@bytehunter",
    avatar: "👾",
    rating: 5,
    product: "Stella Valorant",
    text: "Stream proof actually works. Recorded clips look 100% legit.",
  },
];

export type Order = {
  id: string;
  customer: string;
  product: string;
  amount: number;
  crypto: "BTC" | "ETH" | "LTC" | "SOL" | "USDT";
  status: "paid" | "pending" | "failed";
  date: string;
};

export const MOCK_ORDERS: Order[] = [
  { id: "ORD-10421", customer: "vexshadow@proton.me", product: "Stella Valorant", amount: 24.99, crypto: "BTC", status: "paid", date: "2026-06-04" },
  { id: "ORD-10420", customer: "novafrag@tuta.io", product: "Stella Warzone", amount: 29.99, crypto: "ETH", status: "paid", date: "2026-06-04" },
  { id: "ORD-10419", customer: "k1ngpixel@gmail.com", product: "Stella Fortnite", amount: 19.99, crypto: "SOL", status: "pending", date: "2026-06-03" },
  { id: "ORD-10418", customer: "zerochill@proton.me", product: "Stella Apex", amount: 22.99, crypto: "USDT", status: "paid", date: "2026-06-03" },
  { id: "ORD-10417", customer: "ringg@tuta.io", product: "Stella Rust", amount: 21.99, crypto: "LTC", status: "failed", date: "2026-06-02" },
  { id: "ORD-10416", customer: "bytehunter@gmail.com", product: "Stella Valorant", amount: 24.99, crypto: "BTC", status: "paid", date: "2026-06-02" },
];

export type AdminUser = {
  id: string;
  email: string;
  joined: string;
  spend: number;
  licenses: number;
  status: "active" | "banned";
};

export const MOCK_USERS: AdminUser[] = [
  { id: "U-001", email: "vexshadow@proton.me", joined: "2025-11-04", spend: 174.93, licenses: 3, status: "active" },
  { id: "U-002", email: "novafrag@tuta.io", joined: "2026-01-12", spend: 89.97, licenses: 2, status: "active" },
  { id: "U-003", email: "k1ngpixel@gmail.com", joined: "2026-02-22", spend: 59.97, licenses: 2, status: "active" },
  { id: "U-004", email: "zerochill@proton.me", joined: "2026-03-01", spend: 22.99, licenses: 1, status: "active" },
  { id: "U-005", email: "ghoul@tempmail.io", joined: "2026-04-19", spend: 24.99, licenses: 1, status: "banned" },
];

export type FAQItem = { q: string; a: string };

export const FAQ: FAQItem[] = [
  { q: "Is StellaWare detected?", a: "Our detection rate is industry-leading. All products use private builds with HWID spoofing and ship updates within the hour of any anti-cheat patch." },
  { q: "How fast do I receive my license?", a: "Crypto payments confirm in 1–3 minutes on average. Your license key is delivered instantly to your email and dashboard on confirmation." },
  { q: "What payment methods do you accept?", a: "Bitcoin, Ethereum, Litecoin, Solana, and USDT (ERC-20 / TRC-20). No accounts, no KYC, no chargebacks." },
  { q: "Can I switch the PC I use my license on?", a: "Yes. Reset your HWID once every 7 days for free directly from the licensing dashboard." },
  { q: "Do you offer refunds?", a: "Yes — 24 hours, no questions asked, if your key has not been activated. Activated licenses are non-refundable per our ToS." },
  { q: "How do I get support?", a: "Join the Discord for 24/7 community + staff support, or open a ticket from the dashboard. Average reply time is under 8 minutes." },
];