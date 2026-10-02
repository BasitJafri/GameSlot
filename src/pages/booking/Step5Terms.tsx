import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';

const termsSections = [
  {
    title: '1. Booking Policy',
    content: [
      'All bookings are subject to availability and must be confirmed with advance payment.',
      'A booking reference will be issued upon successful payment.',
      'Bookings can be made up to 3 days in advance only.',
      'Maximum 4 slots per booking per customer.',
    ],
  },
  {
    title: '2. Arrival Policy',
    content: [
      'Customers must arrive at least 5 minutes before their booked slot.',
      'Game Inn reserves the right to release slots for customers arriving more than 15 minutes late.',
      'Late arrivals will not receive extensions; the session will end at the original end time.',
    ],
  },
  {
    title: '3. Cancellation Policy',
    content: [
      'Cancellations must be made at least 4 hours before the booked slot.',
      'Advance payments are refundable for cancellations made within the required window.',
      'Same-day cancellations forfeit the advance payment.',
      'No-shows result in full advance forfeiture.',
    ],
  },
  {
    title: '4. Payment Policy',
    content: [
      'An advance payment is required to confirm all bookings.',
      'Remaining balance is to be paid at the venue before the session begins.',
      'All payments are in Pakistani Rupees (PKR).',
      'Accepted methods: JazzCash, EasyPaisa, bank transfer, cash at venue.',
    ],
  },
  {
    title: '5. Venue Conduct',
    content: [
      'Respectful behavior toward staff and other customers is mandatory.',
      'Food and beverages from outside the venue are not permitted.',
      'Customers are responsible for any damage to equipment caused by misuse.',
      'Game Inn reserves the right to remove customers without refund for misconduct.',
    ],
  },
  {
    title: '6. Equipment',
    content: [
      'All equipment is provided and maintained by Game Inn.',
      'Personal peripherals may be used with prior approval.',
      'Customers must report equipment issues immediately to staff.',
    ],
  },
];

export function Step5Terms() {
  const { state, setAgreedToTerms, goNext, goBack } = useBooking();

  return (
    <div>
      <h2 className="text-2xl font-black text-white mb-2">Terms & Conditions</h2>
      <p className="text-gray-400 mb-6">
        Please read and agree to our terms before proceeding to payment.
      </p>

      {/* Demo notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-6">
        <AlertTriangle size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
        <p className="text-yellow-200/80 text-sm font-semibold">
          DEMO TERMS — Final policy to be reviewed and confirmed by client before launch.
        </p>
      </div>

      {/* Scrollable terms */}
      <div className="max-h-96 overflow-y-auto bg-surface border border-white/08 rounded-2xl p-6 mb-6 space-y-6">
        {termsSections.map((section) => (
          <div key={section.title}>
            <h3 className="font-bold text-white mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.content.map((line, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-2 flex-shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Checkbox */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="mt-0.5">
          <input
            type="checkbox"
            checked={state.agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="sr-only"
          />
          <div
            className={[
              'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
              state.agreedToTerms
                ? 'bg-accent border-accent'
                : 'border-white/20 bg-white/[0.03] group-hover:border-accent/50',
            ].join(' ')}
          >
            {state.agreedToTerms && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L4 7L9 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-gray-300 text-sm leading-relaxed">
          I have read and agree to the{' '}
          <span className="text-accent">Terms & Conditions</span> of Game Inn. I understand
          this is a demo prototype and no real booking is being made.
        </span>
      </label>

      <div className="mt-8 flex justify-between">
        <Button variant="ghost" onClick={goBack}>
          <ArrowLeft size={16} /> Back
        </Button>
        <Button disabled={!state.agreedToTerms} onClick={goNext}>
          Continue to Payment <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
