import { useNavigate } from 'react-router-dom';
import {
  Calendar, Users, LayoutGrid, DollarSign, Shield,
  Book, Settings, ArrowRight
} from 'lucide-react';
import { mockBookings } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatDate, formatCurrency } from '../../utils/helpers';
import type { Booking } from '../../types';

function statusVariant(s: Booking['status']): 'green' | 'yellow' | 'red' {
  return s === 'confirmed' ? 'green' : s === 'pending' ? 'yellow' : 'red';
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const todayBookings = mockBookings.filter((b) => b.date === today);
  const upcomingBookings = mockBookings.filter((b) => b.date > today);
  const advanceCollected = mockBookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.advancePaid, 0);
  const recentBookings = [...mockBookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center">
            <Shield size={20} className="text-secondary-light" />
          </div>
          <div>
            <p className="text-secondary-light text-xs font-semibold uppercase tracking-widest">Admin Panel</p>
            <h1 className="text-3xl font-black text-white">Dashboard</h1>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { label: "Today's Bookings", value: todayBookings.length || 12, icon: Calendar, color: 'accent' },
            { label: 'Upcoming (7 days)', value: upcomingBookings.length || 28, icon: Users, color: 'purple' },
            { label: 'Available Slots', value: 18, icon: LayoutGrid, color: 'accent' },
            { label: 'Advance Collected', value: formatCurrency(advanceCollected || 6500), icon: DollarSign, color: 'purple' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={[
                'bg-surface border rounded-2xl p-5',
                stat.color === 'accent' ? 'border-accent/15' : 'border-secondary/15',
              ].join(' ')}
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider leading-tight max-w-[80%]">{stat.label}</p>
                <stat.icon
                  size={18}
                  className={stat.color === 'accent' ? 'text-accent flex-shrink-0' : 'text-secondary-light flex-shrink-0'}
                />
              </div>
              <p
                className={[
                  'text-2xl sm:text-3xl font-black',
                  stat.color === 'accent' ? 'text-accent' : 'text-secondary-light',
                ].join(' ')}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <button
            onClick={() => navigate('/admin/bookings')}
            className="flex items-center gap-3 p-4 bg-surface border border-white/08 rounded-2xl hover:border-accent/20 hover:bg-white/[0.02] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Book size={18} className="text-accent" />
            </div>
            <div className="text-left flex-1">
              <p className="text-white font-semibold text-sm">Manage Bookings</p>
              <p className="text-gray-500 text-xs">View & manage all bookings</p>
            </div>
            <ArrowRight size={16} className="text-gray-600 group-hover:text-accent transition-colors" />
          </button>
          <button
            onClick={() => navigate('/admin/availability')}
            className="flex items-center gap-3 p-4 bg-surface border border-white/08 rounded-2xl hover:border-accent/20 hover:bg-white/[0.02] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
              <LayoutGrid size={18} className="text-secondary-light" />
            </div>
            <div className="text-left flex-1">
              <p className="text-white font-semibold text-sm">Slot Availability</p>
              <p className="text-gray-500 text-xs">Toggle slot availability</p>
            </div>
            <ArrowRight size={16} className="text-gray-600 group-hover:text-accent transition-colors" />
          </button>
          <div className="flex items-center gap-3 p-4 bg-surface border border-white/05 rounded-2xl opacity-50 cursor-not-allowed">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Settings size={18} className="text-gray-500" />
            </div>
            <div className="text-left">
              <p className="text-gray-400 font-semibold text-sm">Settings</p>
              <p className="text-gray-600 text-xs">Coming soon</p>
            </div>
          </div>
        </div>

        {/* Recent bookings */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
            <Button size="sm" variant="ghost" onClick={() => navigate('/admin/bookings')}>
              View All <ArrowRight size={14} />
            </Button>
          </div>
          <div className="bg-surface border border-white/08 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/08 bg-white/[0.02]">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Advance</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {recentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-accent text-sm font-semibold">{b.reference}</td>
                      <td className="px-6 py-4">
                        <p className="text-white text-sm font-medium">{b.customerName}</p>
                        <p className="text-gray-500 text-xs">{b.customerPhone}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm hidden sm:table-cell">
                        {formatDate(b.date)}
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm hidden md:table-cell">
                        {formatCurrency(b.advancePaid)}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={statusVariant(b.status)}>
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
