export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
}

/** A single dynamic booking session — start time + duration chosen by the user */
export interface BookingSlot {
  startTime: string;       // display: "10:00 AM"
  endTime: string;         // display: "12:00 PM"
  startMinutes: number;    // minutes since midnight, e.g. 600
  endMinutes: number;      // minutes since midnight, e.g. 720
  durationMinutes: number; // e.g. 120
}

/** A time range that is already booked or blocked (for availability checking) */
export interface BookedBlock {
  start: number; // minutes since midnight
  end: number;
  label?: string; // optional booking reference for admin display
}

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';
export type PaymentStatus = 'paid' | 'unpaid' | 'partial';

export interface Booking {
  id: string;
  reference: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;            // YYYY-MM-DD
  sessionStart: string;   // "10:00 AM"
  sessionEnd: string;     // "12:00 PM"
  durationMinutes: number;
  totalAmount: number;
  advancePaid: number;
  remainingAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
}

export interface BookingState {
  step: number;
  selectedDate: string;
  selectedSlot: BookingSlot | null;
  customerDetails: CustomerDetails;
  agreedToTerms: boolean;
  paymentStatus: 'pending' | 'processing' | 'success';
  bookingReference: string;
}

export interface GalleryItem {
  id: string;
  category: 'pc' | 'console' | 'vr' | 'events' | 'venue';
  label: string;
  icon: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'payments' | 'equipment' | 'general';
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}
