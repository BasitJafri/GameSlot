export const BOOKING_WINDOW_DAYS = 3;

/** Venue operating hours — all values in minutes since midnight */
export const VENUE_HOURS = {
  OPENING: 600,      // 10:00 AM
  CLOSING: 1440,     // 12:00 AM (midnight)
  TIME_STEP: 30,     // start-time options every 30 min
  MIN_DURATION: 60,  // minimum session = 1 hour
  DURATION_STEP: 30, // duration increments of 30 min
  MAX_DURATION: 360, // maximum session = 6 hours (configurable — DEMO VALUE)
};

/** Duration choices shown to the user, in minutes */
export const DURATION_OPTIONS = [60, 90, 120, 150, 180, 210, 240, 300, 360];

export const PRICING = {
  PRICE_PER_HOUR: 1000, // PKR per hour — DEMO VALUE
  ADVANCE_AMOUNT: 500,  // PKR fixed advance per booking — DEMO VALUE
};

/** Calculate total price for a session of given duration */
export function calcTotal(durationMinutes: number): number {
  return Math.round((durationMinutes / 60) * PRICING.PRICE_PER_HOUR);
}

export const DEMO_USERS = {
  customer: {
    id: 'u1',
    name: 'Ahmed Khan',
    email: 'demo@gaminn.pk',
    password: 'Demo123!',
    phone: '0312-3456789',
    role: 'customer' as const,
  },
  admin: {
    id: 'u0',
    name: 'Admin',
    email: 'admin@gaminn.pk',
    password: 'Admin123!',
    phone: '03100997770',
    role: 'admin' as const,
  },
};

export const CONTACT_INFO = {
  phone: '03100997770',
  email: 'info@gaminn.pk',
  location: 'Islamabad, Pakistan',
  hours: 'Mon–Sun: 10:00 AM – 12:00 AM',
};
