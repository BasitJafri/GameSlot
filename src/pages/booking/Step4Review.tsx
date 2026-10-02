import { ArrowLeft, ArrowRight, Edit2, Calendar, Clock, User, Phone, Mail, Timer } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';
import { formatDate, formatCurrency, formatDuration } from '../../utils/helpers';
import { PRICING, calcTotal } from '../../config/constants';

export function Step4Review() {
  const { state, goNext, goBack, setStep } = useBooking();
  const { selectedDate, selectedSlot, customerDetails } = state;

  const isComplete = selectedSlot && selectedSlot.durationMinutes > 0;
  const total = isComplete ? calcTotal(selectedSlot!.durationMinutes) : 0;
  const advance = PRICING.ADVANCE_AMOUNT;
  const remaining = total - advance;

  return (
    <div>
      <h2 className="text-2xl font-black text-white mb-2">Review Your Booking</h2>
      <p className="text-gray-400 mb-8">Please review all details before proceeding to terms.</p>

      <div className="bg-surface border border-white/08 rounded-2xl overflow-hidden mb-6">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/08 bg-white/[0.02] flex items-center justify-between">
          <h3 className="font-bold text-white">Booking Details</h3>
          <button
            onClick={() => setStep(3)}
            className="flex items-center gap-1.5 text-accent text-sm hover:text-accent-dim transition-colors"
          >
            <Edit2 size={14} /> Edit
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar size={18} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-wider">Date</p>
                <p className="text-white font-semibold">{formatDate(selectedDate)}</p>
              </div>
            </div>

            {isComplete && selectedSlot && (
              <>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-wider">Time</p>
                    <p className="text-white font-semibold">
                      {selectedSlot.startTime} – {selectedSlot.endTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Timer size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-wider">Duration</p>
                    <p className="text-white font-semibold">
                      {formatDuration(selectedSlot.durationMinutes)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User size={18} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-wider">Name</p>
                <p className="text-white font-semibold">{customerDetails.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-wider">Phone</p>
                <p className="text-white font-semibold">{customerDetails.phone}</p>
              </div>
            </div>
            {customerDetails.email && (
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-wider">Email</p>
                  <p className="text-white font-semibold">{customerDetails.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="px-6 py-5 border-t border-white/08 bg-white/[0.02] space-y-3">
          {isComplete && selectedSlot && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">
                {formatDuration(selectedSlot.durationMinutes)} session
              </span>
              <span className="text-white">{formatCurrency(total)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Advance to Pay Now</span>
            <span className="text-yellow-400 font-semibold">{formatCurrency(advance)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/08">
            <span className="text-gray-300">Remaining at Venue</span>
            <span className="text-white">{formatCurrency(remaining)}</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/15 text-sm text-gray-400 mb-8">
        By continuing, you acknowledge this is a{' '}
        <span className="text-white font-medium">DEMO booking</span>. No real transaction or
        session reservation occurs. All data is for demonstration purposes.
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={goBack}>
          <ArrowLeft size={16} /> Back
        </Button>
        <Button onClick={goNext}>
          Confirm & Continue <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
