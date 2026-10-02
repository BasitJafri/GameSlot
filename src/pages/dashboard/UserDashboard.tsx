import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Plus, ArrowRight, Timer } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { mockBookings } from '../../data/mockData';
import { formatDate, formatCurrency, formatDuration } from '../../utils/helpers';
import { PRICING } from '../../config/constants';
import type { Booking } from '../../types';

function statusVariant(status: Booking['status']): 'green' | 'yellow' | 'red' {
  return status === 'confirmed' ? 'green' : status === 'pending' ? 'yellow' : 'red';
}

function paymentVariant(p: Booking['paymentStatus']): 'green' | 'yellow' | 'red' {
  return p === 'paid' ? 'green' : p === 'partial' ? 'yellow' : 'red';
}

export function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Customer-specific bookings
  const userBookings = mockBookings.filter((b) => b.customerId === 'u1');
  const today = new Date().toISOString().split('T')[0];
  const upcoming = userBookings.filter((b) => b.date >= today && b.status !== 'cancelled');
  const past = userBookings.filter((b) => b.date < today || b.status === 'cancelled');

  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-1">Dashboard</p>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Welcome back, {user?.name.split(' ')[0]}!
            </h1>
            <p className="text-gray-400 mt-1">{user?.email}</p>
          </div>
          <Button onClick={() => navigate('/book')}>
            <Plus size={16} /> Book New Slot
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Upcoming', value: upcoming.length, color: 'accent' },
            { label: 'Total Sessions', value: userBookings.length, color: 'purple' },
            { label: 'Confirmed', value: userBookings.filter((b) => b.status === 'confirmed').length, color: 'accent' },
            { label: 'Advance Paid', value: `PKR ${userBookings.reduce((s, b) => s + b.advancePaid, 0).toLocaleString()}`, color: 'purple' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={[
                'bg-surface border rounded-2xl p-5',
                stat.color === 'accent' ? 'border-accent/15' : 'border-secondary/15',
              ].join(' ')}
            >
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{stat.label}</p>
              <p
                className={[
                  'text-2xl font-black',
                  stat.color === 'accent' ? 'text-accent' : 'text-secondary-light',
                ].join(' ')}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Upcoming */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-5">Upcoming Bookings</h2>
          {upcoming.length === 0 ? (
            <div className="text-center py-12 bg-surface rounded-2xl border border-white/08">
              <Calendar size={36} className="mx-auto mb-3 text-gray-600" />
              <p className="text-gray-400 mb-4">No upcoming bookings</p>
              <Button size="sm" onClick={() => navigate('/book')}>
                Book a Slot <ArrowRight size={14} />
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map((b) => (
                <BookingCard key={b.id} booking={b} />
              ))}
            </div>
          )}
        </section>

        {/* Past */}
        <section>
          <h2 className="text-xl font-bold text-white mb-5">Past Bookings</h2>
          {past.length === 0 ? (
            <p className="text-gray-500 text-sm">No past bookings.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {past.map((b) => (
                <BookingCard key={b.id} booking={b} past />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function BookingCard({ booking: b, past = false }: { booking: Booking; past?: boolean }) {
  return (
    <div
      className={[
        'bg-surface border rounded-2xl p-5 transition-all',
        past ? 'border-white/05 opacity-75' : 'border-white/08 hover:border-accent/20',
      ].join(' ')}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Reference</p>
          <p className="text-accent text-sm font-bold">{b.reference}</p>
        </div>
        <Badge variant={statusVariant(b.status)}>
          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
        </Badge>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Calendar size={13} className="text-accent flex-shrink-0" />
          {formatDate(b.date)}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Clock size={13} className="text-accent flex-shrink-0" />
          {b.sessionStart} – {b.sessionEnd}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Timer size={13} className="text-gray-600 flex-shrink-0" />
          {formatDuration(b.durationMinutes)}
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-white/08">
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-white font-semibold text-sm">{formatCurrency(b.totalAmount)}</p>
        </div>
        <Badge variant={paymentVariant(b.paymentStatus)}>
          {b.paymentStatus === 'partial'
            ? `Adv: PKR ${PRICING.ADVANCE_AMOUNT}`
            : b.paymentStatus === 'paid'
            ? 'Paid'
            : 'Unpaid'}
        </Badge>
      </div>
    </div>
  );
}
