import type { Booking, BookedBlock, FAQItem, TestimonialItem, GalleryItem } from '../types';
import { PRICING, calcTotal } from '../config/constants';
import { minutesToDisplay } from '../utils/helpers';

function getDateString(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

const today = getDateString(0);
const tomorrow = getDateString(1);
const dayAfter = getDateString(2);

/**
 * Booked time blocks per date, stored as minutes-since-midnight ranges.
 * The time picker uses these to disable overlapping start/duration combinations.
 *
 *  600 = 10:00 AM   720 = 12:00 PM   900 = 3:00 PM
 *  750 = 12:30 PM   870 = 2:30 PM   1050 = 5:30 PM
 * 1170 = 7:30 PM   1200 = 8:00 PM   1320 = 10:00 PM
 */
export const bookedBlocks: Record<string, BookedBlock[]> = {
  [today]: [
    { start: 600,  end: 720,  label: 'GIN-2026-00001' }, // 10:00 AM – 12:00 PM
    { start: 900,  end: 1020, label: 'GIN-2026-00002' }, // 3:00 PM – 5:00 PM
  ],
  [tomorrow]: [
    { start: 1050, end: 1170, label: 'GIN-2026-00003' }, // 5:30 PM – 7:30 PM
  ],
  [dayAfter]: [
    { start: 750,  end: 870,  label: 'GIN-2026-00005' }, // 12:30 PM – 2:30 PM
    { start: 1200, end: 1320, label: 'GIN-2026-00006' }, // 8:00 PM – 10:00 PM
  ],
};

export const demoCustomers = [
  { id: 'u1', name: 'Ahmed Khan',   email: 'demo@gaminn.pk',    phone: '0312-3456789', role: 'customer' as const },
  { id: 'u2', name: 'Sara Ali',     email: 'sara@example.com',  phone: '0300-1234567', role: 'customer' as const },
  { id: 'u3', name: 'Usman Malik',  email: 'usman@example.com', phone: '0311-9876543', role: 'customer' as const },
  { id: 'u4', name: 'Zainab Raza',  email: 'zainab@example.com',phone: '0333-4567890', role: 'customer' as const },
];

function makeBooking(
  id: string,
  ref: string,
  cust: { id: string; name: string; phone: string; email: string },
  date: string,
  startMinutes: number,
  durationMinutes: number,
  status: Booking['status'],
  paymentStatus: Booking['paymentStatus'],
  daysAgo: number,
): Booking {
  const total = calcTotal(durationMinutes);
  const advance = paymentStatus !== 'unpaid' ? PRICING.ADVANCE_AMOUNT : 0;
  const created = new Date();
  created.setDate(created.getDate() - daysAgo);
  return {
    id,
    reference: ref,
    customerId: cust.id,
    customerName: cust.name,
    customerPhone: cust.phone,
    customerEmail: cust.email,
    date,
    sessionStart: minutesToDisplay(startMinutes),
    sessionEnd: minutesToDisplay(startMinutes + durationMinutes),
    durationMinutes,
    totalAmount: total,
    advancePaid: advance,
    remainingAmount: total - advance,
    status,
    paymentStatus,
    createdAt: created.toISOString(),
  };
}

export const mockBookings: Booking[] = [
  // Today
  makeBooking('b1',  'GIN-2026-00001', demoCustomers[0], today,              600,  120, 'confirmed', 'partial',  0),
  makeBooking('b2',  'GIN-2026-00002', demoCustomers[1], today,              900,  120, 'confirmed', 'partial',  0),
  // Tomorrow
  makeBooking('b3',  'GIN-2026-00003', demoCustomers[2], tomorrow,           1050, 120, 'pending',   'unpaid',   1),
  makeBooking('b4',  'GIN-2026-00004', demoCustomers[0], tomorrow,           720,  180, 'confirmed', 'partial',  1),
  // Day after
  makeBooking('b5',  'GIN-2026-00005', demoCustomers[3], dayAfter,           750,  120, 'confirmed', 'partial',  2),
  makeBooking('b6',  'GIN-2026-00006', demoCustomers[1], dayAfter,           1200, 120, 'confirmed', 'partial',  2),
  // Past bookings
  makeBooking('b7',  'GIN-2026-00007', demoCustomers[0], getDateString(-2),  600,  240, 'confirmed', 'paid',     3),
  makeBooking('b8',  'GIN-2026-00008', demoCustomers[2], getDateString(-3),  900,  90,  'confirmed', 'paid',     4),
  makeBooking('b9',  'GIN-2026-00009', demoCustomers[1], getDateString(-5),  1050, 150, 'cancelled', 'unpaid',   6),
  makeBooking('b10', 'GIN-2026-00010', demoCustomers[3], getDateString(-7),  720,  120, 'confirmed', 'paid',     8),
  makeBooking('b11', 'GIN-2026-00011', demoCustomers[0], getDateString(-10), 600,  360, 'confirmed', 'paid',     11),
  makeBooking('b12', 'GIN-2026-00012', demoCustomers[2], getDateString(-4),  1200, 90,  'confirmed', 'paid',     5),
];

export const mockFAQs: FAQItem[] = [
  {
    id: 'f1',
    category: 'booking',
    question: 'How do I book a gaming session at Game Inn?',
    answer: 'Create an account or log in, select your preferred date, pick a start time and session duration, fill in your details, review the booking, agree to our terms, and pay the advance. You\'ll receive a booking reference instantly.',
  },
  {
    id: 'f2',
    category: 'booking',
    question: 'How far in advance can I book?',
    answer: 'You can book up to 3 days in advance: today, tomorrow, and the day after tomorrow. This keeps availability fresh and reduces no-shows.',
  },
  {
    id: 'f3',
    category: 'booking',
    question: 'Can I book for multiple hours?',
    answer: 'Yes! You can book sessions from 1 hour up to 6 hours. Simply select your start time and the duration you need — available in 30-minute increments.',
  },
  {
    id: 'f4',
    category: 'booking',
    question: 'What happens if I arrive late?',
    answer: 'We hold your slot for 15 minutes past your booking start time. After that, the slot may be released. We recommend arriving 5–10 minutes early.',
  },
  {
    id: 'f5',
    category: 'payments',
    question: 'What is the advance payment for?',
    answer: 'An advance of PKR 500 per booking is required to secure your session. This amount is deducted from your total. The remaining balance is paid at the venue before your session.',
  },
  {
    id: 'f6',
    category: 'payments',
    question: 'Is the advance refundable?',
    answer: 'The advance is refundable if you cancel at least 4 hours before your session. Cancellations after that forfeit the advance.',
  },
  {
    id: 'f7',
    category: 'payments',
    question: 'What payment methods are accepted?',
    answer: 'We accept JazzCash, EasyPaisa, bank transfer, and cash at the venue. Online bookings require digital payment for the advance.',
  },
  {
    id: 'f8',
    category: 'equipment',
    question: 'What specs are the gaming PCs?',
    answer: 'Our PCs feature high-end processors, dedicated graphics cards, high-refresh-rate monitors, and peripherals optimized for competitive gaming. Exact specs are on display at the venue.',
  },
  {
    id: 'f9',
    category: 'equipment',
    question: 'Which consoles are available?',
    answer: 'We have PlayStation 5 and Xbox Series X stations. Please check availability when booking as console slots may differ.',
  },
  {
    id: 'f10',
    category: 'equipment',
    question: 'Do I need to bring my own peripherals?',
    answer: 'No — keyboards, mice, headsets, and controllers are all provided. You\'re welcome to bring your own preferred gear.',
  },
  {
    id: 'f11',
    category: 'general',
    question: 'What are your operating hours?',
    answer: 'Game Inn is open every day from 10:00 AM to 12:00 AM (midnight), 7 days a week including weekends and public holidays.',
  },
  {
    id: 'f12',
    category: 'general',
    question: 'Is there an age restriction?',
    answer: 'Players under 18 are welcome but must be accompanied by a parent or guardian after 10:00 PM.',
  },
  {
    id: 'f13',
    category: 'general',
    question: 'Do you host tournaments?',
    answer: 'Yes! We regularly host esports tournaments. Follow our social media for upcoming event announcements.',
  },
];

export const mockTestimonials: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Bilal Hussain',
    location: 'F-7, Islamabad',
    rating: 5,
    text: 'Game Inn is hands down the best gaming café in Islamabad. The PCs are beast-level and the atmosphere is exactly what you need for a serious gaming session.',
    avatar: 'BH',
  },
  {
    id: 't2',
    name: 'Aisha Mahmood',
    location: 'G-11, Islamabad',
    rating: 5,
    text: 'Booked for a girls\' gaming night and it was phenomenal. The staff was super helpful, the setup is premium, and the booking system made everything so easy.',
    avatar: 'AM',
  },
  {
    id: 't3',
    name: 'Hassan Tariq',
    location: 'DHA Phase 2, Islamabad',
    rating: 5,
    text: 'The VR experience at Game Inn is absolutely wild. The whole place has a professional esports vibe that sets it apart from anything else in Pakistan. 10/10.',
    avatar: 'HT',
  },
];

export const mockGallery: GalleryItem[] = [
  { id: 'g1',  category: 'pc',      label: 'High-Performance Gaming PCs',  icon: 'monitor' },
  { id: 'g2',  category: 'console', label: 'Console Gaming Zone',           icon: 'gamepad-2' },
  { id: 'g3',  category: 'vr',      label: 'VR Experience Suite',           icon: 'glasses' },
  { id: 'g4',  category: 'events',  label: 'Esports Tournament',            icon: 'trophy' },
  { id: 'g5',  category: 'venue',   label: 'Gaming Lounge',                 icon: 'sofa' },
  { id: 'g6',  category: 'pc',      label: 'Pro Gaming Setup',              icon: 'cpu' },
  { id: 'g7',  category: 'events',  label: 'Championship Event',            icon: 'award' },
  { id: 'g8',  category: 'venue',   label: 'Reception Area',                icon: 'building' },
  { id: 'g9',  category: 'console', label: 'PS5 Gaming Corner',             icon: 'gamepad-2' },
  { id: 'g10', category: 'vr',      label: 'VR Arena Zone',                 icon: 'zap' },
  { id: 'g11', category: 'pc',      label: 'Content Creation Studio',       icon: 'video' },
  { id: 'g12', category: 'events',  label: 'Community Gaming Night',        icon: 'users' },
];
