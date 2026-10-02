import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';
import { PaymentCard } from '../../components/booking/PaymentCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { PRICING, calcTotal } from '../../config/constants';
import { formatCurrency } from '../../utils/helpers';

export function Step6Payment() {
  const { state, setPaymentStatus, confirmBooking, goBack } = useBooking();
  const [localStatus, setLocalStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const total = state.selectedSlot ? calcTotal(state.selectedSlot.durationMinutes) : 0;
  const advance = PRICING.ADVANCE_AMOUNT;

  const handlePay = async () => {
    setLocalStatus('processing');
    setPaymentStatus('processing');
    await new Promise((r) => setTimeout(r, 2000));
    setLocalStatus('success');
    setPaymentStatus('success');
  };

  const handleConfirm = () => {
    confirmBooking();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-black text-white mb-2">Advance Payment</h2>
        <p className="text-gray-400 mb-8">
          Pay the advance to secure your session. Remaining balance is collected at the venue.
        </p>

        {localStatus === 'idle' && (
          <div>
            <div className="bg-surface border border-white/08 rounded-2xl p-6 mb-6">
              <p className="text-sm text-gray-400 mb-1">Session total</p>
              <p className="text-2xl font-bold text-white mb-4">{formatCurrency(total)}</p>
              <p className="text-sm text-gray-400 mb-1">You are paying now</p>
              <div className="text-4xl font-black text-accent mb-2">
                {formatCurrency(advance)}
              </div>
              <p className="text-gray-500 text-sm">Advance (Demo)</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/08 text-xs text-gray-500 mb-6">
              DEMO PAYMENT — No real transaction will occur. This simulates the payment flow only.
            </div>
            <Button fullWidth size="lg" onClick={handlePay}>
              PAY ADVANCE — {formatCurrency(advance)}
            </Button>
          </div>
        )}

        {localStatus === 'processing' && (
          <div className="text-center py-12">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-300 font-semibold">Processing Payment...</p>
            <p className="text-gray-500 text-sm mt-2">Please wait while we confirm your payment</p>
          </div>
        )}

        {localStatus === 'success' && (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-accent/15 border border-accent/30 mx-auto mb-6 flex items-center justify-center shadow-glow-green">
              <CheckCircle size={40} className="text-accent" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Payment Successful!</h3>
            <p className="text-gray-400 mb-2">
              {formatCurrency(advance)} advance payment confirmed.
            </p>
            <p className="text-xs text-gray-600 mb-8">Demo Payment — No real transaction occurred</p>
            <Button fullWidth onClick={handleConfirm}>
              Continue to Confirmation <ArrowRight size={16} />
            </Button>
          </div>
        )}

        {localStatus === 'idle' && (
          <div className="mt-4 flex justify-start">
            <Button variant="ghost" onClick={goBack} size="sm">
              <ArrowLeft size={16} /> Back
            </Button>
          </div>
        )}
      </div>

      <div>
        <PaymentCard
          selectedDate={state.selectedDate}
          selectedSlot={state.selectedSlot}
          customerName={state.customerDetails.name}
        />
      </div>
    </div>
  );
}
