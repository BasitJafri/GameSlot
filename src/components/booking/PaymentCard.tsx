import { Shield, Smartphone, CreditCard } from 'lucide-react';
import type { BookingSlot } from '../../types';
import { PRICING, calcTotal } from '../../config/constants';
import { formatCurrency, formatDate, formatDuration } from '../../utils/helpers';

interface PaymentCardProps {
  selectedDate: string;
  selectedSlot: BookingSlot | null;
  customerName: string;
}

export function PaymentCard({ selectedDate, selectedSlot, customerName }: PaymentCardProps) {
  const isComplete = selectedSlot && selectedSlot.durationMinutes > 0;
  const total = isComplete ? calcTotal(selectedSlot!.durationMinutes) : 0;
  const advance = PRICING.ADVANCE_AMOUNT;
  const remaining = total - advance;

  return (
    <div className="bg-surface rounded-2xl border border-white/08 overflow-hidden">
      <div className="p-5 border-b border-white/08 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <CreditCard size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-white">Payment Summary</h3>
            <p className="text-xs text-gray-400">Demo Payment — No real transaction</p>
          </div>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Customer</span>
          <span className="text-white font-medium">{customerName || '—'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Date</span>
          <span className="text-white">{formatDate(selectedDate)}</span>
        </div>
        {isComplete && selectedSlot && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Session</span>
              <span className="text-white">{selectedSlot.startTime} – {selectedSlot.endTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Duration</span>
              <span className="text-white">{formatDuration(selectedSlot.durationMinutes)}</span>
            </div>
          </>
        )}
        <div className="border-t border-white/08 pt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Amount</span>
            <span className="text-white font-semibold">{formatCurrency(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Advance to Pay Now</span>
            <span className="text-yellow-400 font-bold">{formatCurrency(advance)}</span>
          </div>
          <div className="flex justify-between text-sm bg-white/[0.03] rounded-xl p-3">
            <span className="text-gray-300">Remaining (Pay at Venue)</span>
            <span className="text-white font-bold">{formatCurrency(remaining)}</span>
          </div>
        </div>
        <div className="flex items-start gap-3 bg-secondary/10 border border-secondary/20 rounded-xl p-3 mt-2">
          <Smartphone size={16} className="text-secondary-light mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-300">
            Demo payment via JazzCash / EasyPaisa. No real transaction will be processed.
          </p>
        </div>
        <div className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-3">
          <Shield size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-400">
            Your session will be secured immediately after advance payment.
          </p>
        </div>
      </div>
    </div>
  );
}
