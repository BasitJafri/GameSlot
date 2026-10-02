import { Calendar, Clock } from 'lucide-react';
import type { BookingSlot, CustomerDetails } from '../../types';
import { formatDate, formatCurrency, formatDuration } from '../../utils/helpers';
import { PRICING, calcTotal } from '../../config/constants';

interface BookingSummaryProps {
  selectedDate: string;
  selectedSlot: BookingSlot | null;
  customerDetails?: CustomerDetails;
  compact?: boolean;
}

export function BookingSummary({
  selectedDate,
  selectedSlot,
  customerDetails,
  compact = false,
}: BookingSummaryProps) {
  const isComplete = selectedSlot && selectedSlot.durationMinutes > 0;
  const total = isComplete ? calcTotal(selectedSlot!.durationMinutes) : 0;
  const advance = isComplete ? PRICING.ADVANCE_AMOUNT : 0;
  const remaining = total - advance;

  if (compact) {
    return (
      <div className="bg-white/[0.03] rounded-xl border border-white/08 p-4 space-y-2">
        {selectedDate && (
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Calendar size={14} className="text-accent" />
            {formatDate(selectedDate)}
          </div>
        )}
        {isComplete && selectedSlot && (
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Clock size={14} className="text-accent" />
            {selectedSlot.startTime} – {selectedSlot.endTime}
            <span className="text-gray-500">({formatDuration(selectedSlot.durationMinutes)})</span>
          </div>
        )}
        {isComplete && (
          <div className="pt-2 border-t border-white/08 flex justify-between text-sm">
            <span className="text-gray-400">Total</span>
            <span className="text-accent font-bold">{formatCurrency(total)}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl border border-white/08 overflow-hidden sticky top-24">
      <div className="p-5 border-b border-white/08">
        <h3 className="font-bold text-white text-base">Booking Summary</h3>
      </div>
      <div className="p-5 space-y-4">
        {selectedDate && (
          <div>
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Date</p>
            <div className="flex items-center gap-2 text-white font-medium">
              <Calendar size={15} className="text-accent" />
              {formatDate(selectedDate)}
            </div>
          </div>
        )}

        {isComplete && selectedSlot && (
          <div>
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Session</p>
            <div className="flex items-center gap-2 text-white font-medium">
              <Clock size={15} className="text-accent flex-shrink-0" />
              <span>{selectedSlot.startTime} – {selectedSlot.endTime}</span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5 ml-[23px]">
              {formatDuration(selectedSlot.durationMinutes)}
            </p>
          </div>
        )}

        {!isComplete && (
          <div className="text-sm text-gray-600 italic">
            No session selected yet
          </div>
        )}

        {customerDetails?.name && (
          <div>
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Customer</p>
            <p className="text-white font-medium">{customerDetails.name}</p>
            <p className="text-gray-400 text-sm">{customerDetails.phone}</p>
          </div>
        )}

        {isComplete && (
          <div className="pt-4 border-t border-white/08 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">
                {formatDuration(selectedSlot!.durationMinutes)} × PKR 1,000/hr
              </span>
              <span className="text-white">{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Advance Required</span>
              <span className="text-yellow-400">{formatCurrency(advance)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold pt-2 border-t border-white/08">
              <span className="text-gray-300">Pay at Venue</span>
              <span className="text-white">{formatCurrency(remaining)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
