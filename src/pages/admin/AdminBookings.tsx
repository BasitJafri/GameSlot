import { useState } from 'react';
import { Search, Eye, X } from 'lucide-react';
import { mockBookings } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatDate, formatCurrency, formatDuration } from '../../utils/helpers';
import type { Booking } from '../../types';
import { PRICING } from '../../config/constants';

function statusVariant(s: Booking['status']): 'green' | 'yellow' | 'red' {
  return s === 'confirmed' ? 'green' : s === 'pending' ? 'yellow' : 'red';
}
function payVariant(p: Booking['paymentStatus']): 'green' | 'yellow' | 'red' {
  return p === 'paid' ? 'green' : p === 'partial' ? 'yellow' : 'red';
}

type StatusFilter = 'all' | Booking['status'];

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

export function AdminBookings() {
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filtered = mockBookings.filter((b) => {
    if (dateFilter !== 'all' && b.date !== dateFilter) return false;
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        b.reference.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-secondary-light text-xs font-semibold uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-3xl font-black text-white">Manage Bookings</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, or reference..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 text-sm"
            />
          </div>
          {/* Date filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-surface border border-white/10 text-gray-300 focus:outline-none focus:border-accent/50 text-sm"
          >
            <option value="all">All Dates</option>
            <option value={today}>Today</option>
            <option value={tomorrow}>Tomorrow</option>
          </select>
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="px-4 py-2.5 rounded-xl bg-surface border border-white/10 text-gray-300 focus:outline-none focus:border-accent/50 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {(search || dateFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => { setSearch(''); setDateFilter('all'); setStatusFilter('all'); }}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white text-sm flex items-center gap-2"
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>

        <p className="text-gray-500 text-sm mb-4">{filtered.length} booking{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Table */}
        <div className="bg-surface border border-white/08 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/08 bg-white/[0.02]">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Time</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Advance</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Payment</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 text-accent text-sm font-semibold">{b.reference}</td>
                    <td className="px-5 py-4">
                      <p className="text-white text-sm font-medium">{b.customerName}</p>
                      <p className="text-gray-500 text-xs">{b.customerPhone}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-300 text-sm hidden sm:table-cell">
                      {formatDate(b.date)}
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-gray-300 text-xs">{b.sessionStart}–{b.sessionEnd}</p>
                      <p className="text-gray-600 text-xs">{formatDuration(b.durationMinutes)}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-300 text-sm hidden lg:table-cell">
                      {formatCurrency(b.advancePaid)}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={statusVariant(b.status)}>
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <Badge variant={payVariant(b.paymentStatus)}>
                        {b.paymentStatus === 'partial' ? 'Partial' : b.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="p-2 rounded-lg text-gray-500 hover:text-accent hover:bg-accent/5 transition-all"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-gray-500">
                      No bookings found for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title="Booking Detail"
        size="lg"
      >
        {selectedBooking && (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <p className="text-xs text-gray-500 mb-1">Booking Reference</p>
              <p className="text-accent text-2xl font-black">{selectedBooking.reference}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Customer', value: selectedBooking.customerName },
                { label: 'Phone', value: selectedBooking.customerPhone },
                { label: 'Email', value: selectedBooking.customerEmail || '—' },
                { label: 'Date', value: formatDate(selectedBooking.date) },
                { label: 'Session', value: `${selectedBooking.sessionStart} – ${selectedBooking.sessionEnd} (${formatDuration(selectedBooking.durationMinutes)})` },
                { label: 'Total', value: formatCurrency(selectedBooking.totalAmount) },
                { label: 'Advance Paid', value: formatCurrency(selectedBooking.advancePaid) },
                { label: 'Remaining', value: formatCurrency(selectedBooking.remainingAmount) },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-wider">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <div className="flex-1 text-center">
                <p className="text-xs text-gray-500 mb-1">Booking Status</p>
                <Badge variant={statusVariant(selectedBooking.status)} size="md">
                  {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                </Badge>
              </div>
              <div className="flex-1 text-center">
                <p className="text-xs text-gray-500 mb-1">Payment</p>
                <Badge variant={payVariant(selectedBooking.paymentStatus)} size="md">
                  {selectedBooking.paymentStatus === 'partial'
                    ? `Advance: ${formatCurrency(PRICING.ADVANCE_AMOUNT)}`
                    : selectedBooking.paymentStatus === 'paid'
                    ? 'Paid in Full'
                    : 'Unpaid'}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
