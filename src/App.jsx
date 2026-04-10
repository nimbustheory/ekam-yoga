import { useState, useEffect, useCallback, createContext, useContext, useRef } from "react";
import {
  Home, Calendar, TrendingUp, Users, CreditCard, CalendarDays,
  Menu, X, Bell, Settings, Shield, ChevronRight, ChevronDown, Clock,
  PartyPopper, ArrowUpRight, ArrowDownRight, Award, DollarSign, LayoutDashboard,
  UserCheck, Megaphone, LogOut, Plus, Edit3, Send, Check, Search, Copy, Info,
  CircleCheck, UserPlus, Heart, Flame, Star, Sun, Moon, Wind, Sparkles,
  Mountain, Leaf, Music, Gift, Share2, MapPin, Zap
} from "lucide-react";
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// ═══════════════════════════════════════════════════════════════
//  STUDIO_CONFIG — Ekam Yoga, Bozeman MT
// ═══════════════════════════════════════════════════════════════
const STUDIO_CONFIG = {
  name: "EKAM",
  subtitle: "YOGA",
  tagline: "We are one.",
  logoMark: "EY",
  description: "Downtown Bozeman's home for movement, community, and transformation — 8x Best of Bozeman winner.",
  heroLine1: "FIND",
  heroLine2: "ONENESS",
  address: { street: "9 East Main Street, Suite F", city: "Bozeman", state: "MT", zip: "59715" },
  phone: "(406) 577-2331",
  email: "info@ekamyogamt.com",
  neighborhood: "Downtown Bozeman",
  website: "https://ekamyogamt.com",
  social: { instagram: "@ekamyogamt" },
  theme: {
    accent:     { h: 220, s: 45, l: 38 },
    accentAlt:  { h: 38,  s: 72, l: 52 },
    warning:    { h: 8,   s: 68, l: 48 },
    primary:    { h: 225, s: 20, l: 10 },
    surface:    { h: 42,  s: 18, l: 97 },
    surfaceDim: { h: 38,  s: 14, l: 93 },
  },
  features: {
    workshops: true, retreats: false, soundBaths: false, teacherTrainings: true,
    practiceTracking: true, communityFeed: true, guestPasses: true, milestones: true,
  },
  classCapacity: 28,
  specialtyCapacity: 18,
};

// ═══════════════════════════════════════════════════════════════
//  STUDIO IMAGES — Ekam Yoga CDN URLs
// ═══════════════════════════════════════════════════════════════
const gradientFallback = "linear-gradient(135deg, hsl(220,45%,38%) 0%, hsl(220,45%,22%) 100%)";
const STUDIO_IMAGES = {
  logo: "https://images.squarespace-cdn.com/content/v1/65e8d27df707f36c84103799/0fb3a311-358a-4b53-8436-058f09d74903/EY_8711_Logo_1e242b_750w.png?format=300w",
  home: "https://images.squarespace-cdn.com/content/v1/65e8d27df707f36c84103799/4d4b7c7e-92ca-464a-8649-b3f851fbd9dc/SpeedCreative-EkamFall2022-2748_2500w.jpg",
  hero: "https://images.squarespace-cdn.com/content/v1/65e8d27df707f36c84103799/4d4b7c7e-92ca-464a-8649-b3f851fbd9dc/SpeedCreative-EkamFall2022-2748_2500w.jpg",
  classesHeader: "https://images.squarespace-cdn.com/content/v1/65e8d27df707f36c84103799/4d21e9ca-37a4-4cab-bd7d-6ccd38a65601/ey_12397_2b_1_header_2400x1000.jpg",
  classesFooter: "https://images.squarespace-cdn.com/content/v1/65e8d27df707f36c84103799/8cac5582-1fbf-4ad3-b8d1-7889e01dbf85/EY_12397_4A_Classes_2_Footer_2400x1000_1.jpg",
  scheduleHeader: "https://images.squarespace-cdn.com/content/v1/65e8d27df707f36c84103799/4d21e9ca-37a4-4cab-bd7d-6ccd38a65601/ey_12397_2b_1_header_2400x1000.jpg",
  practiceHeader: "https://images.squarespace-cdn.com/content/v1/65e8d27df707f36c84103799/8cac5582-1fbf-4ad3-b8d1-7889e01dbf85/EY_12397_4A_Classes_2_Footer_2400x1000_1.jpg",
  communityHeader: "https://images.squarespace-cdn.com/content/v1/65e8d27df707f36c84103799/f7603226-fdc0-4d80-9b0f-f0cc35d2e185/ey_10627_4b_1_membership2_144.jpg",
  teachersHeader: gradientFallback,
  eventsHeader: "https://images.squarespace-cdn.com/content/v1/65e8d27df707f36c84103799/075f9362-c854-44eb-876d-bdb934f2ab98/ey_secondarypageheaders2_144.jpg",
  membershipHeader: "https://images.squarespace-cdn.com/content/v1/65e8d27df707f36c84103799/075f9362-c854-44eb-876d-bdb934f2ab98/ey_secondarypageheaders2_144.jpg",
  studioInterior: "https://images.squarespace-cdn.com/content/v1/65e8d27df707f36c84103799/f7603226-fdc0-4d80-9b0f-f0cc35d2e185/ey_10627_4b_1_membership2_144.jpg",
  teachers: {
    bailey: "",
    meesh: "",
    caitlin: "",
    page: "",
    marie: "",
    nicola: "",
    amanda: "",
    kathleen: "",
    kara: "",
    ashley: "",
    yetta: "",
    sawyer: "",
    stella: "",
  },
};

// ═══════════════════════════════════════════════════════════════
//  THEME SYSTEM
// ═══════════════════════════════════════════════════════════════
const hsl = (c, a) => a !== undefined ? `hsla(${c.h},${c.s}%,${c.l}%,${a})` : `hsl(${c.h},${c.s}%,${c.l}%)`;
const hslShift = (c, lShift) => `hsl(${c.h},${c.s}%,${Math.max(0, Math.min(100, c.l + lShift))}%)`;

const T = {
  accent: hsl(STUDIO_CONFIG.theme.accent),
  accentDark: hslShift(STUDIO_CONFIG.theme.accent, -10),
  accentLight: hslShift(STUDIO_CONFIG.theme.accent, 32),
  accentGhost: hsl(STUDIO_CONFIG.theme.accent, 0.07),
  accentBorder: hsl(STUDIO_CONFIG.theme.accent, 0.16),
  success: hsl(STUDIO_CONFIG.theme.accentAlt),
  successGhost: hsl(STUDIO_CONFIG.theme.accentAlt, 0.08),
  successBorder: hsl(STUDIO_CONFIG.theme.accentAlt, 0.18),
  warning: hsl(STUDIO_CONFIG.theme.warning),
  warningGhost: hsl(STUDIO_CONFIG.theme.warning, 0.07),
  warningBorder: hsl(STUDIO_CONFIG.theme.warning, 0.18),
  bg: hsl(STUDIO_CONFIG.theme.primary),
  bgCard: hsl(STUDIO_CONFIG.theme.surface),
  bgDim: hsl(STUDIO_CONFIG.theme.surfaceDim),
  text: "#1e1a14",
  textMuted: "#6e6558",
  textFaint: "#a09888",
  border: "#e4ded6",
  borderLight: "#f0ebe4",
};

// ═══════════════════════════════════════════════════════════════
//  DATE HELPERS
// ═══════════════════════════════════════════════════════════════
const today = new Date().toISOString().split("T")[0];
const offsetDate = (d) => { const dt = new Date(); dt.setDate(dt.getDate() + d); return dt.toISOString().split("T")[0]; };
const formatDateShort = (s) => { const d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); };
const formatDateLong = (s) => { const d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }); };
const fmtTime = (t) => { const [h, m] = t.split(":"); const hr = +h; return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`; };

// ═══════════════════════════════════════════════════════════════
//  MOCK DATA — Ekam Yoga
// ═══════════════════════════════════════════════════════════════
const TEACHERS = [
  { id: "t1", firstName: "Bailey", lastName: "Evans", role: "Owner & Founder", certs: ["E-RYT-500", "Neurofeedback Meditation"], specialties: ["Vinyasa", "Power Flow", "Teacher Training"], yearsTeaching: 10, bio: "Bailey founded Ekam Yoga with a vision for a studio where all bodies and backgrounds are welcome. Her teaching blends athletic rigor with deep compassion, creating classes that challenge you physically while grounding you mentally." },
  { id: "t2", firstName: "Meesh", lastName: "Metcalf", role: "Lead Teacher", certs: ["RYT-500", "Yin Specialist"], specialties: ["Yin", "Restorative", "Slow Flow"], yearsTeaching: 8, bio: "Meesh brings a gentle, intentional presence to the mat. Her classes are an invitation to slow down, drop in, and find the quiet power of stillness in a world that rarely stops moving." },
  { id: "t3", firstName: "Caitlin", lastName: "Kelly", role: "Teacher", certs: ["RYT-200", "Ashtanga Intensive"], specialties: ["Ashtanga", "Intermediate Vinyasa", "Rise"], yearsTeaching: 6, bio: "Caitlin's teaching is rooted in the Ashtanga tradition. She brings discipline, humor, and an unwavering belief that the practice meets you exactly where you are." },
  { id: "t4", firstName: "Page", lastName: "Webb", role: "Teacher", certs: ["RYT-200", "Adaptive Yoga"], specialties: ["All-Levels Vinyasa", "PowerHour", "Accessible Movement"], yearsTeaching: 5, bio: "Page believes yoga is for every body. Her classes are creative, inclusive, and grounded in the principle that modification is not a lesser practice — it is the practice." },
  { id: "t5", firstName: "Marie", lastName: "Petersen", role: "Teacher", certs: ["RYT-200", "Mobility Specialist"], specialties: ["Mobility Melt", "Restorative", "Yin"], yearsTeaching: 7, bio: "Marie's background in physical therapy informs her teaching. She uses breathwork, props, and hands-on adjustments to help students find optimal range of motion and deep restoration." },
  { id: "t6", firstName: "Nicola", lastName: "Stauder", role: "Teacher", certs: ["RYT-200"], specialties: ["Vinyasa", "We Flow Hard", "Rise"], yearsTeaching: 4, bio: "Nicola brings energy and a killer playlist. Her We Flow Hard classes are athletic, playful, and designed to help you find strength you didn't know you had." },
  { id: "t7", firstName: "Amanda", lastName: "Martin", role: "Teacher", certs: ["RYT-200"], specialties: ["All-Levels Vinyasa", "Slow Flow"], yearsTeaching: 3, bio: "Amanda's classes feel like coming home. She creates a warm, supportive space where students are encouraged to explore at their own pace." },
  { id: "t8", firstName: "Kathleen", lastName: "Lefstad", role: "Teacher", certs: ["RYT-200", "Prenatal Yoga"], specialties: ["Restorative", "Yin", "Queer Flow"], yearsTeaching: 5, bio: "Kathleen is passionate about creating affirming, accessible spaces. She leads Queer Flow in partnership with Queer Bozeman and teaches restorative classes that prioritize nervous system care." },
  { id: "t9", firstName: "Kara", lastName: "Looney", role: "Teacher", certs: ["RYT-200"], specialties: ["PowerHour", "Intermediate Vinyasa"], yearsTeaching: 4, bio: "Kara's midday PowerHour is the reset you didn't know you needed. She teaches with precision and warmth, balancing creative flows with focused holds." },
  { id: "t10", firstName: "Ashley", lastName: "Kincaid", role: "Teacher", certs: ["RYT-200"], specialties: ["All-Levels Vinyasa", "Rise"], yearsTeaching: 3, bio: "Ashley's early morning Rise classes are a powerful way to start the day. She believes in building an intentional relationship with your body and mind through consistent practice." },
  { id: "t11", firstName: "Yetta", lastName: "Stein", role: "Teacher", certs: ["RYT-200", "Sound Healing"], specialties: ["Restorative", "Slow Flow", "Meditation"], yearsTeaching: 9, bio: "Yetta's teaching is deeply meditative. She weaves breathwork and mindfulness into every class, creating experiences that feel as nourishing as they do transformative." },
  { id: "t12", firstName: "Sawyer", lastName: "Evans", role: "Teacher", certs: ["RYT-200"], specialties: ["We Flow Hard", "Vinyasa"], yearsTeaching: 2, bio: "Sawyer grew up around Ekam and brings a fresh, energetic perspective to the mat. His classes are musically driven and physically demanding, with an emphasis on breath." },
  { id: "t13", firstName: "Stella", lastName: "Evans", role: "Teacher", certs: ["RYT-200"], specialties: ["Vinyasa", "All-Levels"], yearsTeaching: 2, bio: "Stella's teaching style is approachable and encouraging. She creates a space where new students feel comfortable and experienced practitioners feel challenged." },
];

const TODAYS_FOCUS = {
  id: "focus-today", date: today, name: "Strength in Stillness", type: "POWERHOUR",
  style: "PowerHour", temp: "Heated", duration: 60,
  description: "A midday reset: creative flows build internal heat, followed by focused holds that demand patience and presence. Leave it all on the floor.",
  intention: "Tune out the real world. Drop into your practice.",
  teacherTip: "This class is your time-out from the day. Don't bring your to-do list to the mat — let it go at the door.",
  playlist: "Golden Hour — Kara's Spotify",
};

const PAST_PRACTICES = [
  { id: "p-y1", date: offsetDate(-1), name: "We Flow Hard", type: "WE FLOW HARD", style: "Athletic", temp: "Heated", duration: 60, description: "A powerful, athletic, leave-it-all-on-the-floor class with a quicker pace and bass-driven playlist. All levels welcome, but expect to be challenged.", intention: "Find power in the flow. Find play in the challenge.", teacherTip: "Advanced postures are offered, never required. Your practice, your pace." },
  { id: "p-y2", date: offsetDate(-2), name: "Deep Yin", type: "YIN", style: "Restorative", temp: "Gentle Heat", duration: 75, description: "Slow, passive practice with poses held for five minutes. Targets deep muscle tissues and fascia, giving the mind a chance to become still.", intention: "Surrender is not giving up — it's giving in to gravity.", teacherTip: "If you're muscling through a yin pose, you're doing too much. Let the props do the work." },
  { id: "p-y3", date: offsetDate(-3), name: "Rise & Breathe", type: "RISE", style: "Power", temp: "Heated", duration: 60, description: "Up and Asana! Build heat and feel the positive effects of a vigorous morning practice. Hands-on adjustments offered to help you explore your edges.", intention: "Beginning your day with intention is choosing to build a relationship with yourself." },
];

const UPCOMING_PRACTICE = { id: "p-tmrw", date: offsetDate(1), name: "Mobility Melt", type: "MOBILITY", style: "Therapeutic", temp: "Gentle Heat", duration: 60, description: "Breathwork, props, restorative practices, and hands-on adjustments to increase range of motion. Allow your body to rest and restore.", intention: "Softness is not weakness. Softness is strategy.", teacherTip: "Bring an extra layer — this class cools you down on purpose." };

const CLASSES_TODAY = [
  { id: "cl1", time: "06:30", type: "Rise (Heated)", coach: "Ashley Kincaid", capacity: 28, registered: 24, waitlist: 0 },
  { id: "cl2", time: "07:45", type: "All-Levels Vinyasa (Heated)", coach: "Page Webb", capacity: 28, registered: 28, waitlist: 2 },
  { id: "cl3", time: "09:30", type: "Intermediate Vinyasa (Heated)", coach: "Caitlin Kelly", capacity: 28, registered: 21, waitlist: 0 },
  { id: "cl4", time: "12:00", type: "PowerHour (Heated)", coach: "Kara Looney", capacity: 28, registered: 16, waitlist: 0 },
  { id: "cl5", time: "16:30", type: "We Flow Hard (Heated)", coach: "Nicola Stauder", capacity: 28, registered: 26, waitlist: 0 },
  { id: "cl6", time: "17:45", type: "All-Levels Vinyasa (Heated)", coach: "Bailey Evans", capacity: 28, registered: 28, waitlist: 5 },
  { id: "cl7", time: "19:30", type: "Yin", coach: "Meesh Metcalf", capacity: 22, registered: 17, waitlist: 0 },
];

const WEEKLY_SCHEDULE = [
  { day: "Monday", classes: [{ time: "06:30", type: "Rise (Heated)", coach: "Ashley" }, { time: "07:45", type: "All-Levels Vinyasa", coach: "Page" }, { time: "09:30", type: "Intermediate Vinyasa", coach: "Caitlin" }, { time: "12:00", type: "PowerHour", coach: "Kara" }, { time: "16:30", type: "We Flow Hard", coach: "Nicola" }, { time: "17:45", type: "All-Levels Vinyasa", coach: "Bailey" }, { time: "19:30", type: "Yin", coach: "Meesh" }] },
  { day: "Tuesday", classes: [{ time: "06:30", type: "Rise (Heated)", coach: "Sawyer" }, { time: "07:45", type: "All-Levels Vinyasa", coach: "Amanda" }, { time: "09:30", type: "We Flow Hard", coach: "Nicola" }, { time: "12:00", type: "Slow Flow", coach: "Yetta" }, { time: "16:30", type: "Intermediate Vinyasa", coach: "Caitlin" }, { time: "17:45", type: "All-Levels Vinyasa", coach: "Page" }] },
  { day: "Wednesday", classes: [{ time: "06:30", type: "Rise (Heated)", coach: "Ashley" }, { time: "07:45", type: "All-Levels Vinyasa", coach: "Bailey" }, { time: "09:30", type: "Ashtanga", coach: "Caitlin" }, { time: "12:00", type: "Mobility Melt", coach: "Marie" }, { time: "16:30", type: "PowerHour", coach: "Kara" }, { time: "17:45", type: "We Flow Hard", coach: "Sawyer" }, { time: "19:30", type: "Restorative", coach: "Meesh" }] },
  { day: "Thursday", classes: [{ time: "06:30", type: "Rise (Heated)", coach: "Sawyer" }, { time: "07:45", type: "All-Levels Vinyasa", coach: "Page" }, { time: "09:30", type: "Intermediate Vinyasa", coach: "Kara" }, { time: "12:00", type: "Slow Flow", coach: "Amanda" }, { time: "16:30", type: "All-Levels Vinyasa", coach: "Stella" }, { time: "17:45", type: "We Flow Hard", coach: "Nicola" }, { time: "19:30", type: "Yin", coach: "Kathleen" }] },
  { day: "Friday", classes: [{ time: "06:30", type: "Rise (Heated)", coach: "Ashley" }, { time: "07:45", type: "All-Levels Vinyasa", coach: "Bailey" }, { time: "09:30", type: "PowerHour", coach: "Kara" }, { time: "12:00", type: "Slow Flow", coach: "Yetta" }, { time: "16:30", type: "We Flow Hard", coach: "Nicola" }, { time: "19:00", type: "Queer Flow", coach: "Kathleen" }] },
  { day: "Saturday", classes: [{ time: "07:30", type: "Rise (Heated)", coach: "Sawyer" }, { time: "09:00", type: "All-Levels Vinyasa", coach: "Bailey" }, { time: "10:30", type: "We Flow Hard", coach: "Nicola" }, { time: "12:00", type: "Yin", coach: "Meesh" }] },
  { day: "Sunday", classes: [{ time: "08:30", type: "All-Levels Vinyasa", coach: "Amanda" }, { time: "10:00", type: "Restorative", coach: "Yetta" }, { time: "17:00", type: "Slow Flow", coach: "Marie" }] },
];

const COMMUNITY_FEED = [
  { id: "cf1", user: "Allie M.", milestone: "100 Classes", message: "From first-timer to century club. This studio changed everything for me. Thank you, Ekam family.", date: today, celebrations: 31 },
  { id: "cf2", user: "Trevor K.", milestone: "30-Day Streak", message: "30 days straight. We Flow Hard is my church. Nicola, you're a legend.", date: today, celebrations: 22 },
  { id: "cf3", user: "Hannah R.", milestone: "First Crow Pose!", message: "Held crow for 8 breaths in Caitlin's class! I screamed. Nobody judged.", date: offsetDate(-1), celebrations: 38 },
  { id: "cf4", user: "Marcus P.", milestone: "1 Year Member", message: "One year at Ekam. Moved to Bozeman not knowing anyone — this place became home.", date: offsetDate(-1), celebrations: 45 },
];

const MILESTONE_BADGES = {
  "First Class": { icon: Leaf, color: T.accent },
  "10 Classes": { icon: Wind, color: T.accent },
  "50 Classes": { icon: Mountain, color: T.accent },
  "100 Classes": { icon: Sun, color: T.success },
  "7-Day Streak": { icon: Flame, color: T.warning },
  "30-Day Streak": { icon: Sparkles, color: T.warning },
  "First Inversion": { icon: ArrowUpRight, color: "#7c3aed" },
  "Crow Pose": { icon: Star, color: "#2563eb" },
  "1 Year Member": { icon: Award, color: T.success },
  "Best of Bozeman": { icon: Mountain, color: T.success },
};

const EVENTS = [
  { id: "ev1", name: "Ashtanga Made Accessible Workshop", date: "2026-04-18", startTime: "13:00", type: "Workshop", description: "Join Caitlin for a deep dive into the Primary Series. Learn the foundations, transitions, and breath patterns that make Ashtanga accessible to all levels.", fee: 35, maxParticipants: 20, registered: 14, status: "Registration Open" },
  { id: "ev2", name: "200-Hour Teacher Training Info Session", date: "2026-05-02", startTime: "10:00", type: "Info Session", description: "Thinking about teacher training? Join Bailey for a free info session about Ekam's in-house 200-Hour YTT program launching Fall 2026.", fee: 0, maxParticipants: 30, registered: 18, status: "Free — RSVP" },
  { id: "ev3", name: "Queer Flow Community Celebration", date: "2026-06-07", startTime: "17:00", type: "Community Event", description: "A special Pride Month Queer Flow class followed by community gathering, refreshments, and celebration. In partnership with Queer Bozeman. All welcome.", fee: 10, maxParticipants: 35, registered: 22, status: "Registration Open" },
  { id: "ev4", name: "Mobility & Recovery Workshop", date: offsetDate(6), startTime: "14:00", type: "Workshop", description: "Marie leads a 2-hour workshop on mobility techniques, breathwork, and hands-on adjustment methods. Ideal for athletes, weekend warriors, and anyone with a body.", fee: 40, maxParticipants: 18, registered: 11, status: "Open" },
];

const MEMBERSHIP_TIERS = [
  { id: "m1", name: "Single Drop-In", type: "drop-in", price: 25, period: "per class", features: ["1 class credit", "No expiration", "No commitment", "Try any class"], popular: false },
  { id: "m2", name: "5-Class Card", type: "pack", price: 110, period: "5 classes", features: ["5 class credits", "No expiration", "No commitment", "Share with a friend"], popular: false },
  { id: "m3", name: "10-Class Card", type: "pack", price: 199, period: "10 classes", features: ["10 class credits", "No expiration", "Best per-class value", "Share with a friend"], popular: false },
  { id: "m4", name: "Unlimited Monthly", type: "unlimited", price: 135, period: "/month", annualPrice: 1399, features: ["Unlimited classes", "Members-only workshop pricing", "15% off partner studios", "2 guest passes per month", "Priority booking window"], popular: true },
  { id: "m5", name: "Trio Pass", type: "addon", price: 199, period: "15 classes", features: ["5 classes at Ekam Yoga", "5 classes at Zephyr Cycling", "5 classes at Pure Barre", "Valid for 2 months", "Cross-train with partners"], popular: false },
];

const ANNOUNCEMENTS = [
  { id: "a1", title: "8x Best of Bozeman!", message: "We're proud to be voted Best Yoga Studio in Bozeman for the eighth year running. Thank you — this is because of YOU.", type: "celebration", pinned: true },
  { id: "a2", title: "New: Trio Pass with Zephyr & Pure Barre", message: "Cross-train with our partner studios. 5 classes at each studio, 2-month expiration. Available at front desk.", type: "info", pinned: false },
];

const MEMBERS_DATA = [
  { id: "mem1", name: "Allie Morrison", email: "allie@email.com", membership: "Unlimited Monthly", status: "active", joined: "2023-03-10", checkIns: 312, lastVisit: today },
  { id: "mem2", name: "Trevor Kim", email: "trevor@email.com", membership: "Unlimited Monthly", status: "active", joined: "2022-08-01", checkIns: 445, lastVisit: offsetDate(-1) },
  { id: "mem3", name: "Hannah Rivera", email: "hannah@email.com", membership: "10-Class Card", status: "active", joined: "2025-10-15", checkIns: 34, lastVisit: offsetDate(-2) },
  { id: "mem4", name: "Marcus Price", email: "marcus@email.com", membership: "Unlimited Monthly", status: "active", joined: "2025-03-25", checkIns: 168, lastVisit: today },
  { id: "mem5", name: "Jade Okafor", email: "jade@email.com", membership: "Unlimited (Annual)", status: "active", joined: "2024-01-01", checkIns: 398, lastVisit: today },
  { id: "mem6", name: "Riley Chen", email: "riley@email.com", membership: "5-Class Card", status: "active", joined: "2026-02-01", checkIns: 4, lastVisit: offsetDate(-6) },
  { id: "mem7", name: "Sage Blackwood", email: "sage@email.com", membership: "Unlimited Monthly", status: "frozen", joined: "2024-06-01", checkIns: 112, lastVisit: offsetDate(-28) },
  { id: "mem8", name: "Dani Kowalski", email: "dani@email.com", membership: "Unlimited Monthly + Trio", status: "active", joined: "2023-11-01", checkIns: 267, lastVisit: offsetDate(-1) },
];

const ADMIN_METRICS = {
  activeMembers: 186, memberChange: 9,
  todayCheckIns: 68, weekCheckIns: 421,
  monthlyRevenue: 26750, revenueChange: 7.8,
  renewalRate: 89.2, workshopRevenue: 3200,
};

const ADMIN_CHARTS = {
  attendance: [
    { day: "Mon", total: 78, avg: 13 }, { day: "Tue", total: 66, avg: 11 },
    { day: "Wed", total: 72, avg: 12 }, { day: "Thu", total: 80, avg: 13 },
    { day: "Fri", total: 68, avg: 12 }, { day: "Sat", total: 84, avg: 21 },
    { day: "Sun", total: 38, avg: 13 },
  ],
  revenue: [
    { month: "Sep", revenue: 22400 }, { month: "Oct", revenue: 23500 },
    { month: "Nov", revenue: 24800 }, { month: "Dec", revenue: 23200 },
    { month: "Jan", revenue: 25600 }, { month: "Feb", revenue: 26100 },
    { month: "Mar", revenue: 26750 },
  ],
  classPopularity: [
    { name: "6:30 AM", pct: 86 }, { name: "7:45 AM", pct: 97 },
    { name: "9:30 AM", pct: 76 }, { name: "12:00 PM", pct: 58 },
    { name: "4:30 PM", pct: 90 }, { name: "5:45 PM", pct: 99 },
    { name: "7:30 PM", pct: 72 },
  ],
  membershipBreakdown: [
    { name: "Unlimited Monthly", value: 94, color: T.accent },
    { name: "Unlimited Annual", value: 38, color: T.success },
    { name: "Class Cards", value: 36, color: T.warning },
    { name: "Drop-In / Trio", value: 18, color: T.textMuted },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  APP CONTEXT
// ═══════════════════════════════════════════════════════════════
const AppContext = createContext(null);

// ═══════════════════════════════════════════════════════════════
//  SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════
function PageHero({ image, title, subtitle, height = 220 }) {
  return (
    <div style={{ position: "relative", height, overflow: "hidden", display: "flex", alignItems: "flex-end", padding: "20px 20px", marginBottom: "16px" }}>
      <img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} onError={e => { e.target.style.display = "none"; }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.15) 100%)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        {title && <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.1 }}>{title}</h1>}
        {subtitle && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: "4px 0 0" }}>{subtitle}</p>}
      </div>
    </div>
  );
}

function PageTitle({ title, subtitle }) {
  return (
    <div style={{ padding: "20px 0 16px" }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 500, margin: 0, color: T.text, letterSpacing: "-0.01em" }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0", lineHeight: 1.4 }}>{subtitle}</p>}
    </div>
  );
}

function SectionHeader({ title, linkText, linkPage }) {
  const { setPage } = useContext(AppContext);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, margin: 0, color: T.text }}>{title}</h2>
      {linkText && <button onClick={() => setPage(linkPage)} style={{ fontSize: 12, fontWeight: 600, color: T.accent, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>{linkText} <ChevronRight size={13} /></button>}
    </div>
  );
}

function QuickAction({ icon: Icon, label, page, color }) {
  const { setPage } = useContext(AppContext);
  return (
    <button onClick={() => setPage(page)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", borderRadius: 12, border: "none", cursor: "pointer", background: T.bgCard, boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
      <Icon size={22} color={color} />
      <span style={{ fontSize: 11, fontWeight: 600, color: T.textMuted }}>{label}</span>
    </button>
  );
}

function EmptyState({ icon: Icon, message, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 16px" }}>
      <Icon size={36} color={T.textFaint} style={{ margin: "0 auto 12px" }} />
      <p style={{ fontWeight: 600, color: T.textMuted, margin: "0 0 4px" }}>{message}</p>
      {sub && <p style={{ fontSize: 12, color: T.textFaint }}>{sub}</p>}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, multiline }) {
  const style = { width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.border}`, fontSize: 14, fontFamily: "inherit", color: T.text, background: T.bgDim, outline: "none", resize: multiline ? "vertical" : "none", boxSizing: "border-box" };
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>}
      {multiline ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} /> : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} />}
    </div>
  );
}

function PracticeCardFull({ practice: p, variant, expanded, onToggle }) {
  const isFeatured = variant === "featured";
  const isToday = p.date === today;
  const isFuture = p.date > today;
  const gradMap = { "POWERHOUR": [T.accent, T.accentDark], "WE FLOW HARD": [T.warning, "#7c2d12"], "YIN": ["#4c566a", "#2e3440"], "RISE": [T.success, "#92400e"], "MOBILITY": ["#6d6875", "#3c3647"], "SPECIAL": ["#4c566a", "#2e3440"] };
  const [g1, g2] = gradMap[p.type] || [T.accent, T.accentDark];

  return (
    <div onClick={onToggle} style={{ background: isFeatured ? `linear-gradient(135deg, ${g1}, ${g2})` : T.bgCard, border: isFeatured ? "none" : `1px solid ${T.border}`, borderRadius: 14, padding: isFeatured ? "20px 18px" : "16px 18px", cursor: onToggle ? "pointer" : "default", transition: "all 0.2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "2px 8px", borderRadius: 4, background: isFeatured ? "rgba(255,255,255,.15)" : T.accentGhost, color: isFeatured ? "#fff" : T.accent }}>{p.type}</span>
            {isToday && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: isFeatured ? "rgba(255,255,255,.2)" : T.successGhost, color: isFeatured ? "#fff" : T.success }}>TODAY</span>}
            {isFuture && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: isFeatured ? "rgba(255,255,255,.15)" : T.warningGhost, color: isFeatured ? "#fff" : T.warning }}>UPCOMING</span>}
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isFeatured ? 26 : 20, fontWeight: 600, margin: 0, color: isFeatured ? "#fff" : T.text }}>{p.name}</h3>
        </div>
        {onToggle && <ChevronDown size={16} color={isFeatured ? "rgba(255,255,255,.5)" : T.textFaint} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", marginTop: 4 }} />}
      </div>
      <div style={{ display: "flex", gap: 12, fontSize: 12, color: isFeatured ? "rgba(255,255,255,.7)" : T.textMuted, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><CalendarDays size={12} /> {formatDateShort(p.date)}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {p.duration} min</span>
        {p.temp && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Flame size={12} /> {p.temp}</span>}
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.5, margin: 0, color: isFeatured ? "rgba(255,255,255,.85)" : "#5a5040" }}>{p.description}</p>
      {(expanded || isFeatured) && p.intention && (
        <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 10, background: isFeatured ? "rgba(255,255,255,.08)" : T.bgDim, borderLeft: `3px solid ${isFeatured ? "rgba(255,255,255,.3)" : T.accent}` }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: isFeatured ? "rgba(255,255,255,.6)" : T.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>Intention</p>
          <p style={{ fontSize: 13, fontStyle: "italic", color: isFeatured ? "rgba(255,255,255,.9)" : T.text, margin: 0, lineHeight: 1.5 }}>{p.intention}</p>
        </div>
      )}
      {expanded && p.teacherTip && (
        <div style={{ marginTop: 8, padding: "12px 14px", borderRadius: 10, background: T.successGhost, borderLeft: `3px solid ${T.success}` }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: T.success, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>Teacher Tip</p>
          <p style={{ fontSize: 13, color: "#5a5040", margin: 0, lineHeight: 1.5 }}>{p.teacherTip}</p>
        </div>
      )}
      {isFeatured && p.playlist && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 12, color: "rgba(255,255,255,.5)" }}>
          <Music size={13} /> {p.playlist}
        </div>
      )}
    </div>
  );
}

function CTACard() {
  return (
    <div style={{ background: `linear-gradient(135deg, ${T.bg}, hsl(225,22%,14%))`, borderRadius: 16, padding: "24px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: T.accent, opacity: 0.08 }} />
      <Mountain size={28} color={T.success} style={{ marginBottom: 10 }} />
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, color: "#fff", margin: "0 0 6px" }}>Join the Ekam Family</h3>
      <p style={{ fontSize: 13, color: "#9a9080", lineHeight: 1.5, margin: "0 0 16px" }}>All bodies, all abilities, all backgrounds. Your first class is free — come see what it means to be one.</p>
      <button style={{ padding: "12px 24px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, letterSpacing: "0.02em" }}>Explore Memberships</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════════════════════════════
function ReservationModal({ classData, onConfirm, onClose }) {
  const [step, setStep] = useState("confirm");
  const totalReg = classData.registered;
  const isFull = totalReg >= classData.capacity;
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 390, background: T.bgCard, borderRadius: "20px 20px 0 0", padding: "24px 20px 32px" }}>
        {step === "confirm" ? (<>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, margin: 0 }}>{isFull ? "Join Waitlist" : "Reserve Spot"}</h3>
            <button onClick={onClose} style={{ padding: 6, borderRadius: 8, border: "none", background: T.bgDim, cursor: "pointer" }}><X size={18} color={T.textMuted} /></button>
          </div>
          <div style={{ background: T.bgDim, borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <p style={{ fontWeight: 700, fontSize: 16, margin: "0 0 4px" }}>{classData.type}</p>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "0 0 2px" }}>{classData.coach} • {classData.dayLabel || formatDateShort(classData.date || today)}</p>
            <p style={{ fontSize: 13, color: T.textMuted, margin: 0 }}>{fmtTime(classData.time)} • {totalReg}/{classData.capacity} spots filled</p>
          </div>
          <button onClick={() => { onConfirm(classData.id); setStep("done"); }} style={{ width: "100%", padding: "14px 0", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, background: isFull ? T.warning : T.accent, color: "#fff" }}>
            {isFull ? "Join Waitlist" : "Confirm Reservation"}
          </button>
        </>) : (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.accentGhost, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><Check size={28} color={T.accent} /></div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, margin: "0 0 6px" }}>{isFull ? "Waitlisted!" : "You're In!"}</h3>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "0 0 20px" }}>{classData.type} • {fmtTime(classData.time)}</p>
            <button onClick={onClose} style={{ padding: "12px 32px", borderRadius: 8, border: "none", fontWeight: 600, cursor: "pointer", background: T.bgDim, color: T.text }}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "90%", maxWidth: 360, background: T.bgCard, borderRadius: 16, padding: "24px 20px", maxHeight: "80%", overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, margin: 0 }}>Settings</h3>
          <button onClick={onClose} style={{ padding: 6, borderRadius: 8, border: "none", background: T.bgDim, cursor: "pointer" }}><X size={18} color={T.textMuted} /></button>
        </div>
        {[{ label: "Notification Preferences", sub: "Class reminders, milestones" }, { label: "Practice Privacy", sub: "Control what the community sees" }, { label: "Partner Studio Perks", sub: "Zephyr Cycling, Pure Barre" }, { label: "Account & Billing", sub: "Membership, payment methods" }, { label: "Help & Feedback", sub: "Contact the studio" }].map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${T.borderLight}`, cursor: "pointer" }}>
            <div><p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>{item.label}</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{item.sub}</p></div>
            <ChevronRight size={16} color={T.textFaint} />
          </div>
        ))}
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <p style={{ fontSize: 11, color: T.textFaint }}>Ekam Yoga Member App v1.0</p>
          <p style={{ fontSize: 11, color: T.textFaint }}>9 E Main Street, Bozeman MT</p>
        </div>
      </div>
    </div>
  );
}

function NotificationsModal({ onClose }) {
  const notifs = [
    { id: 1, title: "Class Reminder", message: "PowerHour with Kara starts in 1 hour", time: "11:00 AM", read: false },
    { id: 2, title: "Milestone Unlocked!", message: "You've completed 50 classes at Ekam!", time: "Yesterday", read: false },
    { id: 3, title: "Workshop Alert", message: "Ashtanga Workshop is 75% full — reserve your spot", time: "2 days ago", read: true },
    { id: 4, title: "Streak Update", message: "12-day streak! Keep showing up.", time: "3 days ago", read: true },
  ];
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "90%", maxWidth: 360, background: T.bgCard, borderRadius: 16, padding: "24px 20px", maxHeight: "80%", overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, margin: 0 }}>Notifications</h3>
          <button onClick={onClose} style={{ padding: 6, borderRadius: 8, border: "none", background: T.bgDim, cursor: "pointer" }}><X size={18} color={T.textMuted} /></button>
        </div>
        {notifs.map(n => (
          <div key={n.id} style={{ padding: "12px 0", borderBottom: `1px solid ${T.borderLight}`, opacity: n.read ? 0.6 : 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: T.text }}>{n.title}</p>
              {!n.read && <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.accent }} />}
            </div>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "3px 0 0" }}>{n.message}</p>
            <p style={{ fontSize: 11, color: T.textFaint, margin: "3px 0 0" }}>{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CONSUMER PAGES
// ═══════════════════════════════════════════════════════════════
function HomePage() {
  const { classRegistrations, openReservation, feedCelebrations, celebrateFeed } = useContext(AppContext);
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
  const upcoming = CLASSES_TODAY.filter(c => c.time >= currentTime).slice(0, 4);

  return (
    <div>
      {/* Hero with background image — ~30% darkening */}
      <section style={{ position: "relative", overflow: "hidden", padding: "32px 22px", minHeight: 240 }}>
        <img src={STUDIO_IMAGES.hero} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} onError={e => { e.target.style.display = "none"; }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.15) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 220 }}>
          <p style={{ color: T.success, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>
            {formatDateLong(today)}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 52, lineHeight: 0.95, letterSpacing: "-0.02em", margin: 0, fontWeight: 400, color: "#fff" }}>
            {STUDIO_CONFIG.heroLine1}<br/>
            <span style={{ color: T.success, fontStyle: "italic" }}>{STUDIO_CONFIG.heroLine2}</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, maxWidth: 280, marginTop: 10, lineHeight: 1.5 }}>{STUDIO_CONFIG.description}</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section style={{ padding: "0 16px", marginTop: -16, position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            { icon: Calendar, label: "Reserve", page: "schedule", color: T.accent },
            { icon: Flame, label: "Practice", page: "practice", color: T.success },
            { icon: Heart, label: "Community", page: "community", color: T.warning },
            { icon: Users, label: "Teachers", page: "teachers", color: T.textMuted },
          ].map(a => <QuickAction key={a.label} {...a} />)}
        </div>
      </section>

      {/* Today's Practice */}
      <section style={{ padding: "0 16px", marginTop: 24 }}>
        <SectionHeader title="Today's Practice" linkText="All Classes" linkPage="classes" />
        <PracticeCardFull practice={TODAYS_FOCUS} variant="featured" />
      </section>

      {/* Upcoming Classes */}
      <section style={{ padding: "0 16px", marginTop: 28 }}>
        <SectionHeader title="Upcoming Classes" linkText="Full Schedule" linkPage="schedule" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {upcoming.length > 0 ? upcoming.map(c => {
            const regs = (classRegistrations[c.id] || 0);
            const totalReg = c.registered + regs;
            const isFull = totalReg >= c.capacity;
            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
                <div style={{ textAlign: "center", minWidth: 44 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, color: T.text, fontWeight: 600 }}>{fmtTime(c.time).split(":")[0]}</span>
                  <span style={{ display: "block", fontSize: 11, color: T.textMuted }}>{fmtTime(c.time).slice(-5)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: T.text, fontSize: 14, margin: 0 }}>{c.type}</p>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{c.coach.split(" ")[0]}</p>
                </div>
                <div style={{ textAlign: "right", marginRight: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: isFull ? T.warning : totalReg >= c.capacity * 0.8 ? T.success : T.accent }}>{totalReg}/{c.capacity}</span>
                  {c.waitlist > 0 && <span style={{ display: "block", fontSize: 11, color: T.textFaint }}>+{c.waitlist} waitlist</span>}
                </div>
                <button onClick={() => openReservation({ ...c, date: today })} style={{ padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: isFull ? T.bgDim : T.accent, color: isFull ? T.textMuted : "#fff" }}>
                  {isFull ? "Waitlist" : "Reserve"}
                </button>
              </div>
            );
          }) : <EmptyState icon={Moon} message="No more classes today" sub="See tomorrow's schedule" />}
        </div>
      </section>

      {/* Community */}
      {STUDIO_CONFIG.features.communityFeed && (
        <section style={{ padding: "0 16px", marginTop: 28 }}>
          <SectionHeader title="Community" linkText="View All" linkPage="community" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {COMMUNITY_FEED.slice(0, 3).map(item => {
              const myC = feedCelebrations[item.id] || 0;
              return (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: `linear-gradient(135deg, ${T.successGhost}, transparent)`, border: `1px solid ${T.successBorder}`, borderRadius: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.success, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Sparkles size={18} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: T.text, margin: 0 }}>
                      {item.user} <span style={{ color: T.success }}>{item.milestone}</span>
                    </p>
                    <p style={{ fontSize: 12, color: "#6b6050", margin: "2px 0 0", lineHeight: 1.4 }}>
                      {item.message.length > 60 ? item.message.slice(0, 60) + "…" : item.message}
                    </p>
                  </div>
                  <button onClick={() => celebrateFeed(item.id)} style={{ padding: 8, borderRadius: 8, border: "none", background: myC > 0 ? T.successGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    <Heart size={18} color={T.success} fill={myC > 0 ? T.success : "none"} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.success }}>{item.celebrations + myC}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Announcements */}
      {ANNOUNCEMENTS.length > 0 && (
        <section style={{ padding: "0 16px", marginTop: 28 }}>
          <SectionHeader title="Announcements" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ANNOUNCEMENTS.map(a => (
              <div key={a.id} style={{ padding: "14px 16px", borderRadius: 12, borderLeft: `4px solid ${a.type === "celebration" ? T.success : T.textMuted}`, background: a.type === "celebration" ? T.successGhost : T.bgDim }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, margin: 0 }}>{a.title}</h3>
                    <p style={{ fontSize: 13, color: "#6b6050", margin: "4px 0 0" }}>{a.message}</p>
                  </div>
                  {a.pinned && <span style={{ fontSize: 11, fontWeight: 600, color: T.success, background: T.successGhost, padding: "2px 8px", borderRadius: 99, flexShrink: 0 }}>Pinned</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ padding: "0 16px", marginTop: 28, paddingBottom: 8 }}>
        <CTACard />
      </section>
    </div>
  );
}

function ClassesPage() {
  const [expandedPractice, setExpandedPractice] = useState(null);
  const allPractices = [TODAYS_FOCUS, ...PAST_PRACTICES, UPCOMING_PRACTICE].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.classesHeader} title="Classes" subtitle="Past, present, and upcoming practice" />
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {allPractices.map(p => (
          <PracticeCardFull key={p.id} practice={p} expanded={expandedPractice === p.id} onToggle={() => setExpandedPractice(expandedPractice === p.id ? null : p.id)} />
        ))}
      </div>
    </div>
  );
}

function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const { openReservation } = useContext(AppContext);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.scheduleHeader} title="Schedule" subtitle="Reserve your spot — classes fill up fast" />
      <div style={{ padding: "0 16px" }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {days.map((d, i) => (
          <button key={d} onClick={() => setSelectedDay(i)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", background: selectedDay === i ? T.accent : T.bgDim, color: selectedDay === i ? "#fff" : T.textMuted }}>
            {d}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {WEEKLY_SCHEDULE[selectedDay]?.classes.map((cls, i) => {
          const isSpecial = cls.type.includes("Yin") || cls.type.includes("Restorative") || cls.type.includes("Queer");
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
              <div style={{ textAlign: "center", minWidth: 56 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: T.text, fontWeight: 600 }}>{fmtTime(cls.time)}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, color: T.text, margin: 0 }}>{cls.type}</p>
                  {isSpecial && <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", padding: "1px 6px", borderRadius: 4, background: T.warningGhost, color: T.warning }}>Special</span>}
                </div>
                {cls.coach && <p style={{ fontSize: 12, color: T.textMuted, margin: "3px 0 0" }}>{cls.coach}</p>}
              </div>
              <button onClick={() => openReservation({ id: `sched-${selectedDay}-${i}`, time: cls.time, type: cls.type, coach: cls.coach || "TBD", capacity: isSpecial ? STUDIO_CONFIG.specialtyCapacity : STUDIO_CONFIG.classCapacity, registered: Math.floor(Math.random() * 10) + 15, waitlist: 0, dayLabel: dayNames[selectedDay] })} style={{ padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: T.accent, color: "#fff" }}>
                Reserve
              </button>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

function PracticePage() {
  const [activeTab, setActiveTab] = useState("log");
  const [reflection, setReflection] = useState({ energy: 4, focus: 4, notes: "" });
  const [saved, setSaved] = useState(null);
  const handleSave = () => { setSaved("log"); setTimeout(() => setSaved(null), 2000); setReflection({ energy: 4, focus: 4, notes: "" }); };

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.practiceHeader} title="My Practice" subtitle="Track your journey and celebrate growth" />
      <div style={{ padding: "0 16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {[{ icon: Flame, val: 12, label: "Day Streak", bg: T.accentGhost, bdr: T.accentBorder, clr: T.accent },
          { icon: Star, val: 87, label: "Total Classes", bg: T.successGhost, bdr: T.successBorder, clr: T.success },
          { icon: Mountain, val: 6, label: "Milestones", bg: T.warningGhost, bdr: T.warningBorder, clr: T.warning }].map((s, i) => (
          <div key={i} style={{ background: s.bg, border: `1px solid ${s.bdr}`, borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <s.icon size={20} color={s.clr} style={{ margin: "0 auto 4px" }} />
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 700, color: T.text }}>{s.val}</div>
            <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: T.bgDim, borderRadius: 10, padding: 4 }}>
        {[{ id: "log", label: "Reflection" }, { id: "milestones", label: "Milestones" }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: activeTab === tab.id ? T.bgCard : "transparent", color: activeTab === tab.id ? T.text : T.textMuted, boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,.06)" : "none" }}>{tab.label}</button>
        ))}
      </div>
      {activeTab === "log" && (
        <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><Leaf size={18} color={T.accent} /><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Post-Practice Reflection</h3></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Energy Level</label>
              <div style={{ display: "flex", gap: 6 }}>
                {[1,2,3,4,5].map(n => (<button key={n} onClick={() => setReflection({...reflection, energy: n})} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${reflection.energy >= n ? T.accent : T.border}`, background: reflection.energy >= n ? T.accentGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{n <= 2 ? <Moon size={18} color={reflection.energy >= n ? T.accent : T.textFaint} /> : n <= 4 ? <Sun size={18} color={reflection.energy >= n ? T.accent : T.textFaint} /> : <Sparkles size={18} color={reflection.energy >= n ? T.accent : T.textFaint} />}</button>))}
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Focus & Presence</label>
              <div style={{ display: "flex", gap: 6 }}>
                {[1,2,3,4,5].map(n => (<button key={n} onClick={() => setReflection({...reflection, focus: n})} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${reflection.focus >= n ? T.success : T.border}`, background: reflection.focus >= n ? T.successGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{n <= 2 ? <Wind size={18} color={reflection.focus >= n ? T.success : T.textFaint} /> : n <= 4 ? <Heart size={18} color={reflection.focus >= n ? T.success : T.textFaint} /> : <Sparkles size={18} color={reflection.focus >= n ? T.success : T.textFaint} />}</button>))}
              </div>
            </div>
            <InputField label="Notes / Gratitude" value={reflection.notes} onChange={v => setReflection({...reflection, notes: v})} placeholder="What came up for you on the mat today?" multiline />
            <button onClick={handleSave} style={{ padding: "12px 0", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", background: T.accent, color: "#fff", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17 }}>
              {saved === "log" ? <><Check size={16} style={{ display: "inline", verticalAlign: "middle" }} /> Saved</> : "Save Reflection"}
            </button>
          </div>
        </div>
      )}
      {activeTab === "milestones" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Object.entries(MILESTONE_BADGES).map(([name, badge]) => {
            const earned = ["First Class", "10 Classes", "50 Classes", "7-Day Streak", "Crow Pose", "First Inversion"].includes(name);
            const BadgeIcon = badge.icon;
            return (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: earned ? T.bgCard : T.bgDim, border: `1px solid ${earned ? T.border : "transparent"}`, borderRadius: 12, opacity: earned ? 1 : 0.5 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: earned ? `${badge.color}18` : T.bgDim, display: "flex", alignItems: "center", justifyContent: "center" }}><BadgeIcon size={22} color={earned ? badge.color : T.textFaint} /></div>
                <div style={{ flex: 1 }}><p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: earned ? T.text : T.textFaint }}>{name}</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{earned ? "Achieved" : "Keep going"}</p></div>
                {earned && <CircleCheck size={20} color={badge.color} />}
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}

function CommunityPage() {
  const { feedCelebrations, celebrateFeed } = useContext(AppContext);
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.communityHeader} title="Community" subtitle="Celebrate milestones and lift each other up" />
      <div style={{ padding: "0 16px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {COMMUNITY_FEED.map(item => {
          const myC = feedCelebrations[item.id] || 0;
          return (
            <div key={item.id} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: "#fff", fontWeight: 700, flexShrink: 0 }}>{item.user[0]}</div>
                <div><p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: T.text }}>{item.user}</p><p style={{ fontSize: 12, color: T.textMuted, margin: "1px 0 0" }}>{formatDateShort(item.date)}</p></div>
                <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: T.successGhost, color: T.success }}>{item.milestone}</span>
              </div>
              <p style={{ fontSize: 14, color: "#4a4030", lineHeight: 1.5, margin: "0 0 12px" }}>{item.message}</p>
              <button onClick={() => celebrateFeed(item.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, border: `1px solid ${myC > 0 ? T.successBorder : T.border}`, background: myC > 0 ? T.successGhost : "transparent", cursor: "pointer" }}>
                <Heart size={16} color={T.success} fill={myC > 0 ? T.success : "none"} />
                <span style={{ fontSize: 13, fontWeight: 600, color: T.success }}>{item.celebrations + myC}</span>
              </button>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

function TeachersPage() {
  const [exp, setExp] = useState(null);
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.teachersHeader} title="Teachers" subtitle="Meet the Ekam Yoga teaching family" />
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {TEACHERS.map(t => {
          const open = exp === t.id;
          return (
            <div key={t.id} onClick={() => setExp(open ? null : t.id)} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, color: "#fff", flexShrink: 0, fontWeight: 600 }}>{t.firstName[0]}{t.lastName[0]}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: T.text }}>{t.firstName} {t.lastName}</h3>
                  <p style={{ fontSize: 13, color: T.accent, fontWeight: 600, margin: "2px 0 0" }}>{t.role}</p>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{t.yearsTeaching} years teaching</p>
                </div>
                <ChevronDown size={18} color={T.textFaint} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </div>
              {open && (
                <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${T.borderLight}`, paddingTop: 14 }}>
                  <p style={{ fontSize: 13, color: "#5a5040", lineHeight: 1.6, margin: "0 0 12px" }}>{t.bio}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    {t.specialties.map(s => <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.accentGhost, color: T.accent }}>{s}</span>)}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {t.certs.map(c => <span key={c} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.bgDim, color: T.textMuted }}>{c}</span>)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MembershipPage() {
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.membershipHeader} title="Membership" subtitle="Become part of the Ekam family" />
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {MEMBERSHIP_TIERS.map(tier => (
          <div key={tier.id} style={{ background: T.bgCard, border: `1px solid ${tier.popular ? T.accent : T.border}`, borderRadius: 14, padding: "20px 18px", position: "relative", overflow: "hidden" }}>
            {tier.popular && <div style={{ position: "absolute", top: 12, right: -28, background: T.accent, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 32px", transform: "rotate(45deg)", textTransform: "uppercase" }}>Popular</div>}
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, margin: "0 0 4px", color: T.text }}>{tier.name}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 38, color: T.accent, fontWeight: 700 }}>${tier.price}</span>
              <span style={{ fontSize: 13, color: T.textMuted }}>{tier.period}</span>
            </div>
            {tier.annualPrice && <p style={{ fontSize: 12, color: T.success, fontWeight: 600, marginBottom: 12 }}>Annual: ${tier.annualPrice}/yr (save ${tier.price * 12 - tier.annualPrice})</p>}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
              {tier.features.map((f, i) => <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 13, color: "#5a5040" }}><CircleCheck size={14} color={T.accent} style={{ flexShrink: 0 }} />{f}</li>)}
            </ul>
            <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Cormorant Garamond', Georgia, serif", background: tier.popular ? T.accent : T.bg, color: "#fff" }}>Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsPage() {
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.eventsHeader} title="Events & Workshops" subtitle="Deepen your practice and connect" />
      <div style={{ padding: "0 16px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {EVENTS.map(ev => (
          <div key={ev.id} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", padding: "2px 8px", borderRadius: 4, background: ev.type === "Workshop" ? T.accentGhost : ev.type === "Community Event" ? T.warningGhost : T.successGhost, color: ev.type === "Workshop" ? T.accent : ev.type === "Community Event" ? T.warning : T.success }}>{ev.type}</span>
              <span style={{ fontSize: 11, color: T.textMuted }}>{formatDateShort(ev.date)}</span>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, margin: "0 0 6px", color: T.text }}>{ev.name}</h3>
            <p style={{ fontSize: 13, color: "#5a5040", lineHeight: 1.5, margin: "0 0 12px" }}>{ev.description}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 700, color: T.accent }}>{ev.fee === 0 ? "Free" : `$${ev.fee}`}</span>
                <span style={{ fontSize: 12, color: T.textMuted, marginLeft: 8 }}>{ev.registered}/{ev.maxParticipants} registered</span>
              </div>
              <button style={{ padding: "8px 18px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: T.accent, color: "#fff" }}>{ev.status}</button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

function GuestPassPage() {
  const [sent, setSent] = useState(false);
  return (
    <div style={{ padding: "0 16px" }}>
      <PageTitle title="Guest Passes" subtitle="Invite a friend to practice with you" />
      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: T.accentGhost, display: "flex", alignItems: "center", justifyContent: "center" }}><Gift size={24} color={T.accent} /></div>
          <div><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>2 Passes Available</h3><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>Unlimited members get 2 guest passes per month</p></div>
        </div>
        <div style={{ background: T.bgDim, borderRadius: 10, padding: 14, marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: T.textMuted, margin: 0, lineHeight: 1.5 }}>Share the Ekam experience. Your guest gets one complimentary class — no strings attached.</p>
        </div>
        <button onClick={() => { setSent(true); setTimeout(() => setSent(false), 2500); }} style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", background: T.accent, color: "#fff", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {sent ? <><Check size={16} /> Invite Sent!</> : <><Share2 size={16} /> Send Guest Pass</>}
        </button>
      </div>
      <div style={{ marginTop: 20, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: 18 }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px" }}>Pass History</h4>
        {[{ name: "Sarah M.", date: offsetDate(-8), status: "Redeemed" }, { name: "Kevin L.", date: offsetDate(-22), status: "Redeemed" }].map((p, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.borderLight}` }}>
            <div><p style={{ fontWeight: 600, fontSize: 13, margin: 0 }}>{p.name}</p><p style={{ fontSize: 11, color: T.textMuted, margin: "2px 0 0" }}>{formatDateShort(p.date)}</p></div>
            <span style={{ fontSize: 11, fontWeight: 600, color: T.success, alignSelf: "center" }}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ADMIN PAGES
// ═══════════════════════════════════════════════════════════════
function AdminDashboard() {
  const m = ADMIN_METRICS;
  return (
    <div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, margin: "0 0 20px", color: "#f4f4f5" }}>Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Active Members", value: m.activeMembers, change: `+${m.memberChange}`, up: true, icon: Users, color: T.accent },
          { label: "Today Check-Ins", value: m.todayCheckIns, sub: `${m.weekCheckIns} this week`, icon: UserCheck, color: T.success },
          { label: "Monthly Revenue", value: `$${(m.monthlyRevenue/1000).toFixed(1)}k`, change: `+${m.revenueChange}%`, up: true, icon: DollarSign, color: T.success },
          { label: "Renewal Rate", value: `${m.renewalRate}%`, sub: `$${(m.workshopRevenue/1000).toFixed(1)}k workshops`, icon: TrendingUp, color: T.accent },
        ].map((card, i) => (
          <div key={i} style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><span style={{ fontSize: 12, color: "#71717a", fontWeight: 500 }}>{card.label}</span><card.icon size={16} color={card.color} /></div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: "#f4f4f5", fontWeight: 700 }}>{card.value}</div>
            {card.change && <span style={{ fontSize: 12, color: card.up ? "#22c55e" : "#ef4444", display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>{card.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{card.change}</span>}
            {card.sub && <span style={{ fontSize: 12, color: "#52525b", marginTop: 2, display: "block" }}>{card.sub}</span>}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12, padding: 16 }}>
          <h3 style={{ fontSize: 14, color: "#a1a1aa", margin: "0 0 12px", fontWeight: 600 }}>Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={180}><BarChart data={ADMIN_CHARTS.attendance}><CartesianGrid strokeDasharray="3 3" stroke="#27272a" /><XAxis dataKey="day" tick={{ fill: "#71717a", fontSize: 11 }} /><YAxis tick={{ fill: "#71717a", fontSize: 11 }} /><Tooltip contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 8, color: "#f4f4f5", fontSize: 12 }} /><Bar dataKey="total" fill={T.accent} radius={[4,4,0,0]} /></BarChart></ResponsiveContainer>
        </div>
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12, padding: 16 }}>
          <h3 style={{ fontSize: 14, color: "#a1a1aa", margin: "0 0 12px", fontWeight: 600 }}>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={180}><AreaChart data={ADMIN_CHARTS.revenue}><CartesianGrid strokeDasharray="3 3" stroke="#27272a" /><XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 11 }} /><YAxis tick={{ fill: "#71717a", fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} /><Tooltip contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 8, color: "#f4f4f5", fontSize: 12 }} formatter={v => [`$${v.toLocaleString()}`, "Revenue"]} /><Area type="monotone" dataKey="revenue" stroke={T.success} fill={T.success} fillOpacity={0.15} /></AreaChart></ResponsiveContainer>
        </div>
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12, padding: 16 }}>
          <h3 style={{ fontSize: 14, color: "#a1a1aa", margin: "0 0 12px", fontWeight: 600 }}>Class Fill Rate</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ADMIN_CHARTS.classPopularity.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#71717a", minWidth: 60 }}>{c.name}</span>
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: "#27272a" }}><div style={{ width: `${c.pct}%`, height: "100%", borderRadius: 4, background: c.pct > 90 ? T.warning : c.pct > 70 ? T.success : T.accent }} /></div>
                <span style={{ fontSize: 11, color: c.pct > 90 ? T.warning : "#a1a1aa", fontWeight: 600, minWidth: 32, textAlign: "right" }}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12, padding: 16 }}>
          <h3 style={{ fontSize: 14, color: "#a1a1aa", margin: "0 0 12px", fontWeight: 600 }}>Membership Breakdown</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ResponsiveContainer width="50%" height={150}><PieChart><Pie data={ADMIN_CHARTS.membershipBreakdown} cx="50%" cy="50%" outerRadius={55} innerRadius={30} paddingAngle={3} dataKey="value">{ADMIN_CHARTS.membershipBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie></PieChart></ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {ADMIN_CHARTS.membershipBreakdown.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: item.color, flexShrink: 0 }} /><span style={{ fontSize: 11, color: "#a1a1aa" }}>{item.name}: {item.value}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminMembers() {
  const [search, setSearch] = useState("");
  const filtered = MEMBERS_DATA.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.membership.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, margin: 0, color: "#f4f4f5" }}>Members</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#18181b", border: "1px solid #27272a", borderRadius: 8, padding: "6px 12px" }}><Search size={14} color="#71717a" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members…" style={{ background: "transparent", border: "none", color: "#f4f4f5", fontSize: 13, outline: "none", width: 160 }} /></div>
      </div>
      <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: "1px solid #27272a" }}>{["Member", "Membership", "Status", "Check-Ins", "Last Visit"].map(h => <th key={h} style={{ padding: "10px 12px", fontSize: 11, fontWeight: 600, color: "#71717a", textTransform: "uppercase", textAlign: "left", letterSpacing: "0.05em" }}>{h}</th>)}</tr></thead>
          <tbody>{filtered.map(m => (
            <tr key={m.id} style={{ borderBottom: "1px solid #1c1c1f" }}>
              <td style={{ padding: "10px 12px" }}><span style={{ fontWeight: 600, color: "#f4f4f5", fontSize: 13 }}>{m.name}</span><br/><span style={{ fontSize: 11, color: "#52525b" }}>{m.email}</span></td>
              <td style={{ padding: "10px 12px", fontSize: 13, color: "#a1a1aa" }}>{m.membership}</td>
              <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: m.status === "active" ? "rgba(34,197,94,.1)" : "rgba(239,68,68,.1)", color: m.status === "active" ? "#22c55e" : "#ef4444" }}>{m.status}</span></td>
              <td style={{ padding: "10px 12px", fontSize: 13, color: "#a1a1aa", fontWeight: 600 }}>{m.checkIns}</td>
              <td style={{ padding: "10px 12px", fontSize: 12, color: "#52525b" }}>{formatDateShort(m.lastVisit)}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function AdminScheduleView() {
  return (
    <div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, margin: "0 0 16px", color: "#f4f4f5" }}>Today's Schedule</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CLASSES_TODAY.map(c => {
          const pct = Math.round((c.registered / c.capacity) * 100);
          return (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 14, background: "#18181b", border: "1px solid #27272a", borderRadius: 10, padding: "12px 16px" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: "#f4f4f5", fontWeight: 600, minWidth: 72 }}>{fmtTime(c.time)}</span>
              <div style={{ flex: 1 }}><p style={{ fontWeight: 600, color: "#f4f4f5", fontSize: 13, margin: 0 }}>{c.type}</p><p style={{ fontSize: 12, color: "#52525b", margin: "2px 0 0" }}>{c.coach}</p></div>
              <div style={{ width: 100, height: 6, borderRadius: 3, background: "#27272a", overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", borderRadius: 3, background: pct >= 95 ? T.warning : pct >= 75 ? T.success : T.accent }} /></div>
              <span style={{ fontSize: 13, fontWeight: 600, color: pct >= 95 ? T.warning : "#a1a1aa", minWidth: 60, textAlign: "right" }}>{c.registered}/{c.capacity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AdminAnnouncements() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, margin: 0, color: "#f4f4f5" }}>Announcements</h1>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}><Plus size={14} /> New</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ANNOUNCEMENTS.map(a => (
          <div key={a.id} style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 10, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div><h3 style={{ fontSize: 15, fontWeight: 700, color: "#f4f4f5", margin: "0 0 4px" }}>{a.title}</h3><p style={{ fontSize: 13, color: "#71717a", margin: 0 }}>{a.message}</p></div>
              <div style={{ display: "flex", gap: 4 }}>
                {a.pinned && <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: "rgba(34,197,94,.1)", color: "#22c55e" }}>Pinned</span>}
                <button style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #27272a", background: "transparent", cursor: "pointer" }}><Edit3 size={12} color="#71717a" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminTeachers() {
  const [search, setSearch] = useState("");
  const filtered = TEACHERS.filter(t => t.firstName.toLowerCase().includes(search.toLowerCase()) || t.lastName.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, margin: 0, color: "#f4f4f5" }}>Teachers</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#18181b", border: "1px solid #27272a", borderRadius: 8, padding: "6px 12px" }}><Search size={14} color="#71717a" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search teachers…" style={{ background: "transparent", border: "none", color: "#f4f4f5", fontSize: 13, outline: "none", width: 140 }} /></div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}><Plus size={14} /> Add Teacher</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
        {filtered.map(t => (
          <div key={t.id} style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f4f4f5", margin: 0 }}>{t.firstName} {t.lastName}</h3>
                <p style={{ fontSize: 11, color: T.accent, margin: "4px 0 0" }}>{t.role}</p>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #27272a", background: "transparent", cursor: "pointer" }}><Edit3 size={12} color="#71717a" /></button>
                <button style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #27272a", background: "transparent", cursor: "pointer" }}>⋯</button>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#a1a1aa", lineHeight: 1.4 }}>
              <p style={{ margin: "0 0 8px" }}>Certs: {t.certs.join(", ")}</p>
              <p style={{ margin: 0 }}>Specialties: {t.specialties.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminEvents() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, margin: 0, color: "#f4f4f5" }}>Events & Workshops</h1>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}><Plus size={14} /> Create Event</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {EVENTS.map(e => (
          <div key={e.id} style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f4f4f5", margin: 0 }}>{e.name}</h3>
                <p style={{ fontSize: 12, color: "#71717a", margin: "4px 0 0" }}>{formatDateLong(e.date)} at {fmtTime(e.startTime)}</p>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: "rgba(34,197,94,.1)", color: "#22c55e" }}>{e.registered}/{e.maxParticipants}</span>
                <button style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #27272a", background: "transparent", cursor: "pointer" }}><Edit3 size={12} color="#71717a" /></button>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#a1a1aa", margin: 0, lineHeight: 1.4 }}>{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPricing() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, margin: 0, color: "#f4f4f5" }}>Pricing & Plans</h1>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}><Plus size={14} /> New Plan</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        {MEMBERSHIP_TIERS.map(m => (
          <div key={m.id} style={{ background: "#18181b", border: m.popular ? `2px solid ${T.accent}` : "1px solid #27272a", borderRadius: 12, padding: 16, position: "relative" }}>
            {m.popular && <span style={{ position: "absolute", top: -10, left: 16, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: T.accent, color: "#fff" }}>Popular</span>}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f4f4f5", margin: 0 }}>{m.name}</h3>
                <p style={{ fontSize: 24, fontWeight: 700, color: T.accent, margin: "4px 0 0" }}>${m.price}<span style={{ fontSize: 12, color: "#71717a", fontWeight: 400 }}> {m.period}</span></p>
              </div>
              <button style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #27272a", background: "transparent", cursor: "pointer" }}><Edit3 size={12} color="#71717a" /></button>
            </div>
            <ul style={{ fontSize: 12, color: "#a1a1aa", margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
              {m.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSettings() {
  return (
    <div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, margin: "0 0 20px", color: "#f4f4f5" }}>Admin Settings</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f4f4f5", margin: "0 0 14px" }}>Studio Info</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <label style={{ fontSize: 12, color: "#71717a", fontWeight: 600, display: "block", marginBottom: 4 }}>Studio Name</label>
              <input defaultValue={STUDIO_CONFIG.name} style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #27272a", background: "#09090b", color: "#f4f4f5", fontSize: 13 }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#71717a", fontWeight: 600, display: "block", marginBottom: 4 }}>Tagline</label>
              <input defaultValue={STUDIO_CONFIG.tagline} style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #27272a", background: "#09090b", color: "#f4f4f5", fontSize: 13 }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#71717a", fontWeight: 600, display: "block", marginBottom: 4 }}>Phone</label>
              <input defaultValue={STUDIO_CONFIG.phone} style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #27272a", background: "#09090b", color: "#f4f4f5", fontSize: 13 }} />
            </div>
            <button style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>Save Changes</button>
          </div>
        </div>
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f4f4f5", margin: "0 0 14px" }}>Admin Users</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #27272a" }}>
              <span style={{ fontSize: 13, color: "#f4f4f5" }}>Admin Access</span>
              <button style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #27272a", background: "transparent", color: "#71717a", fontSize: 12, cursor: "pointer" }}>Manage</button>
            </div>
          </div>
          <button style={{ width: "100%", padding: "8px 14px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 12 }}>Add Admin User</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App({ isEmbedded = false }) {
  const [page, setPage] = useState("home");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [classRegistrations, setClassRegistrations] = useState({});
  const [reservationClass, setReservationClass] = useState(null);
  const [feedCelebrations, setFeedCelebrations] = useState({});
  const contentRef = useRef(null);

  const registerForClass = useCallback((classId) => {
    setClassRegistrations(prev => ({ ...prev, [classId]: (prev[classId] || 0) + 1 }));
  }, []);
  const openReservation = useCallback((classData) => setReservationClass(classData), []);
  const celebrateFeed = useCallback((feedId) => {
    setFeedCelebrations(prev => ({ ...prev, [feedId]: (prev[feedId] || 0) + 1 }));
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (contentRef.current) contentRef.current.scrollTo(0, 0);
  }, [page]);

  const unreadCount = 2;

  const mainTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "practice", label: "Practice", icon: TrendingUp },
    { id: "community", label: "Community", icon: Heart },
    { id: "more", label: "More", icon: Menu },
  ];

  const moreItems = [
    { id: "classes", label: "Classes", icon: CalendarDays },
    { id: "teachers", label: "Teachers", icon: Users },
    { id: "membership", label: "Membership", icon: CreditCard },
    { id: "events", label: "Events", icon: Star },
    { id: "guest-pass", label: "Guest Pass", icon: Gift },
  ];

  const adminTabs = [
    { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "admin-schedule", label: "Schedule", icon: Calendar },
    { id: "admin-teachers", label: "Teachers", icon: Users },
    { id: "admin-members", label: "Members", icon: Users },
    { id: "admin-events", label: "Events", icon: Star },
    { id: "admin-pricing", label: "Pricing", icon: CreditCard },
    { id: "admin-announcements", label: "Broadcast", icon: Megaphone },
    { id: "admin-settings", label: "Settings", icon: Settings },
  ];

  const isMoreActive = moreItems.some(item => item.id === page);

  const renderPage = () => {
    switch(page) {
      case "home": return <HomePage />;
      case "schedule": return <SchedulePage />;
      case "practice": return <PracticePage />;
      case "classes": return <ClassesPage />;
      case "teachers": return <TeachersPage />;
      case "community": return <CommunityPage />;
      case "membership": return <MembershipPage />;
      case "events": return <EventsPage />;
      case "guest-pass": return <GuestPassPage />;
      case "admin-dashboard": return <AdminDashboard />;
      case "admin-schedule": return <AdminScheduleView />;
      case "admin-teachers": return <AdminTeachers />;
      case "admin-members": return <AdminMembers />;
      case "admin-events": return <AdminEvents />;
      case "admin-pricing": return <AdminPricing />;
      case "admin-announcements": return <AdminAnnouncements />;
      case "admin-settings": return <AdminSettings />;
      default: return <HomePage />;
    }
  };

  // Admin layout
  if (isAdmin) {
    return (
      <AppContext.Provider value={{ page, setPage, classRegistrations, registerForClass, openReservation, feedCelebrations, celebrateFeed }}>
        <div style={{ display: "flex", minHeight: "100vh", background: "#09090b", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#f4f4f5" }}>
          <aside style={{ width: 240, background: "#0a0a0a", borderRight: "1px solid #1c1c1f", display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0 }}>
            <div style={{ padding: "16px 14px", borderBottom: "1px solid #1c1c1f", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: "#fff", fontWeight: 700 }}>{STUDIO_CONFIG.logoMark}</div>
              <div><span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: "#f4f4f5", fontWeight: 600 }}>{STUDIO_CONFIG.name}</span><span style={{ display: "block", fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.1em" }}>Admin Portal</span></div>
            </div>
            <nav style={{ flex: 1, padding: "12px 8px", overflow: "auto" }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#71717a", padding: "0 10px", margin: "0 0 8px" }}>Management</p>
              {adminTabs.map(tab => {
                const active = page === tab.id;
                return (
                  <button key={tab.id} onClick={() => setPage(tab.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: active ? T.accent : "transparent", color: active ? "#fff" : "#a1a1aa", fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer", marginBottom: 2, textAlign: "left" }}>
                    <tab.icon size={18} /><span>{tab.label}</span>{active && <ChevronRight size={14} style={{ marginLeft: "auto", opacity: 0.6 }} />}
                  </button>
                );
              })}
            </nav>
            <div style={{ borderTop: "1px solid #27272a", padding: "10px 8px" }}>
              <button onClick={() => { setIsAdmin(false); setPage("home"); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: "transparent", color: "#a1a1aa", fontSize: 13, cursor: "pointer", textAlign: "left" }}><LogOut size={18} /><span>Exit Admin</span></button>
            </div>
          </aside>
          <main style={{ flex: 1, marginLeft: 240, padding: 24, overflow: "auto" }}>{renderPage()}</main>
        </div>
      </AppContext.Provider>
    );
  }

  // Consumer layout — uses flex column so header/nav stay fixed, only content scrolls
  return (
    <AppContext.Provider value={{ page, setPage, classRegistrations, registerForClass, openReservation, feedCelebrations, celebrateFeed }}>
      <div style={{ maxWidth: 390, margin: "0 auto", height: isEmbedded ? "100%" : "100vh", background: T.bgDim, fontFamily: "'DM Sans', system-ui, sans-serif", position: "relative", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        
        {/* Header — fixed at top */}
        <header style={{ flexShrink: 0, zIndex: 30, background: T.bg, color: "#fff", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, color: "#fff", fontWeight: 700, overflow: "hidden" }}>
              <img src={STUDIO_IMAGES.logo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; e.target.parentElement.textContent = STUDIO_CONFIG.logoMark; }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, lineHeight: 1, letterSpacing: "0.04em" }}>{STUDIO_CONFIG.name}</span>
              <span style={{ fontSize: 9, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em" }}>{STUDIO_CONFIG.subtitle}</span>
            </div>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <button onClick={() => { setIsAdmin(true); setPage("admin-dashboard"); }} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: T.accent }}><Shield size={20} /></button>
            <button onClick={() => setShowNotifications(true)} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#fff", position: "relative" }}>
              <Bell size={20} />
              {unreadCount > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 14, height: 14, borderRadius: "50%", background: T.accent, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>{unreadCount}</span>}
            </button>
            <button onClick={() => setShowSettings(true)} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#fff" }}><Settings size={20} /></button>
          </div>
        </header>

        {/* Scrollable content */}
        <main ref={contentRef} style={{ flex: 1, overflowY: "auto", paddingBottom: 76 }}>
          {renderPage()}
        </main>

        {/* More Menu */}
        {showMore && (
          <div onClick={() => setShowMore(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 40 }}>
            <div onClick={e => e.stopPropagation()} style={{ position: "absolute", bottom: 68, left: 16, right: 16, maxWidth: 358, margin: "0 auto", background: T.bgCard, borderRadius: 16, padding: "14px 12px", boxShadow: "0 8px 32px rgba(0,0,0,.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 6px 8px" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20 }}>More</span>
                <button onClick={() => setShowMore(false)} style={{ padding: 4, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer" }}><X size={18} color={T.textMuted} /></button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {moreItems.map(item => {
                  const active = page === item.id;
                  return (
                    <button key={item.id} onClick={() => { setPage(item.id); setShowMore(false); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? T.accentGhost : T.bgDim, color: active ? T.accent : T.textMuted }}>
                      <item.icon size={22} /><span style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav — fixed at bottom */}
        <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 390, margin: "0 auto", zIndex: 30, background: T.bgCard, borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-around", padding: "6px 4px 10px" }}>
            {mainTabs.map(tab => {
              const active = tab.id === "more" ? (isMoreActive || showMore) : page === tab.id;
              if (tab.id === "more") {
                return (
                  <button key={tab.id} onClick={() => setShowMore(true)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 12px", borderRadius: 10, border: "none", background: "transparent", cursor: "pointer", color: active ? T.accent : T.textFaint }}>
                    <tab.icon size={20} strokeWidth={active ? 2.5 : 2} /><span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{tab.label}</span>
                  </button>
                );
              }
              return (
                <button key={tab.id} onClick={() => setPage(tab.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 12px", borderRadius: 10, border: "none", background: "transparent", cursor: "pointer", color: active ? T.accent : T.textFaint }}>
                  <tab.icon size={20} strokeWidth={active ? 2.5 : 2} /><span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Modals */}
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        {showNotifications && <NotificationsModal onClose={() => setShowNotifications(false)} />}
        {reservationClass && <ReservationModal classData={reservationClass} onConfirm={registerForClass} onClose={() => setReservationClass(null)} />}
      </div>
    </AppContext.Provider>
  );
}
