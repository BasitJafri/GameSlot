import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Hash, Timer, ArrowRight, RotateCcw } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';
import { formatDate, formatCurrency, formatDuration } from '../../utils/helpers';
import { PRICING, calcTotal } from '../../config/constants';

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
}

const CONFETTI_COLORS = ['#00ff87', '#7c3aed', '#ffffff', '#00cc6a', '#8b5cf6'];

function Confetti() {
  const [pieces] = useState<ConfettiPiece[]>(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
    })),
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${p.left}%`,
            top: '-10px',
            backgroundColor: p.color,
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

export function Step7Confirmation() {
  const { state, resetBooking } = useBooking();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  const isComplete = state.selectedSlot && state.selectedSlot.durationMinutes > 0;
  const total = isComplete ? calcTotal(state.selectedSlot!.durationMinutes) : 0;
  const advance = PRICING.ADVANCE_AMOUNT;
  const remaining = total - advance;

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const handleViewBookings = () => {
    resetBooking();
    navigate('/dashboard');
  };

  const handleBookAnother = () => {
    resetBooking();
    navigate('/book');
  };

  return (
    <div>
      {showConfetti && <Confetti />}

      <div className="text-center mb-10">
        <div className="w-24 h-24 rounded-full bg-accent/15 border-2 border-accent/40 mx-auto mb-6 flex items-center justify-center shadow-glow-green animate-pulse">
          <CheckCircle size={48} className="text-accent" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
          Booking <span className="gradient-text">Confirmed!</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Your gaming session is secured. We'll see you at Game Inn!
        </p>
      </div>

      {/* Booking reference */}
      <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Hash size={16} className="text-accent" />
          <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold">Booking Reference</p>
        </div>
        <p className="text-3xl font-black text-accent tracking-wider">{state.bookingReference}</p>
      </div>

      {/* Details card */}
      <div className="bg-surface border border-white/08 rounded-2xl overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-white/08 bg-white/[0.02]">
          <h3 className="font-bold text-white">Booking Details</h3>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex items-start gap-3">
            <Calendar size={18} className="text-accent mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Date</p>
              <p className="text-white font-semibold">{formatDate(state.selectedDate)}</p>
            </div>
          </div>

          {isComplete && state.selectedSlot && (
            <>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-accent mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Session Time</p>
                  <p className="text-white font-semibold">
                    {state.selectedSlot.startTime} – {state.selectedSlot.endTime}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Timer size={18} className="text-accent mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Duration</p>
                  <p className="text-white font-semibold">
                    {formatDuration(state.selectedSlot.durationMinutes)}
                  </p>
                </div>
              </div>
            </>
          )}

          <div>
            <p className="text-xs text-gray-500 mb-0.5">Customer</p>
            <p className="text-white font-semibold">{state.customerDetails.name}</p>
            <p className="text-gray-400 text-sm">{state.customerDetails.phone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Payment</p>
            <p className="text-accent font-bold">Advance Paid: {formatCurrency(advance)}</p>
            <p className="text-gray-400 text-sm">Due at venue: {formatCurrency(remaining)}</p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/08 text-sm text-gray-400 text-center mb-8">
        Confirmation details and final address will be shared by the venue team before your session.
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handleViewBookings}>
          View My Bookings <ArrowRight size={16} />
        </Button>
        <Button variant="ghost" onClick={handleBookAnother}>
          <RotateCcw size={16} /> Book Another Session
        </Button>
      </div>
    </div>
  );
}
