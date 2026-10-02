import { useState } from 'react';
import { Clock, Info, ToggleLeft, ToggleRight, AlertCircle } from 'lucide-react';
import { bookedBlocks } from '../../data/mockData';
import { getBookingDates, getDayLabel, formatDateShort, minutesToDisplay } from '../../utils/helpers';
import { VENUE_HOURS } from '../../config/constants';
import { Badge } from '../../components/ui/Badge';
import type { BookedBlock } from '../../types';

/** Generate 30-min display blocks covering the full operating window */
function generateTimeBlocks(): Array<{ start: number; end: number }> {
  const blocks = [];
  for (let t = VENUE_HOURS.OPENING; t < VENUE_HOURS.CLOSING; t += VENUE_HOURS.TIME_STEP) {
    blocks.push({ start: t, end: t + VENUE_HOURS.TIME_STEP });
  }
  return blocks;
}

/** Check if a 30-min display block overlaps with any booked block */
function getBlockStatus(
  start: number,
  end: number,
  booked: BookedBlock[],
  manualBlocked: Set<number>,
): 'booked' | 'blocked' | 'available' {
  if (booked.some((b) => start < b.end && end > b.start)) return 'booked';
  if (manualBlocked.has(start)) return 'blocked';
  return 'available';
}

const timeBlocks = generateTimeBlocks();

export function AdminAvailability() {
  const dates = getBookingDates();
  const [activeDate, setActiveDate] = useState(dates[0]);

  // Admin can manually mark 30-min blocks as blocked/unblocked (demo only)
  const [manualBlocked, setManualBlocked] = useState<Record<string, Set<number>>>({});

  const currentBooked = bookedBlocks[activeDate] ?? [];
  const currentManual = manualBlocked[activeDate] ?? new Set<number>();

  const toggleBlock = (start: number) => {
    const status = getBlockStatus(start, start + VENUE_HOURS.TIME_STEP, currentBooked, currentManual);
    if (status === 'booked') return; // can't toggle confirmed bookings

    setManualBlocked((prev) => {
      const existing = new Set(prev[activeDate] ?? []);
      if (existing.has(start)) {
        existing.delete(start);
      } else {
        existing.add(start);
      }
      return { ...prev, [activeDate]: existing };
    });
  };

  const availableCount = timeBlocks.filter(
    (b) => getBlockStatus(b.start, b.end, currentBooked, currentManual) === 'available',
  ).length;
  const bookedCount = timeBlocks.filter(
    (b) => getBlockStatus(b.start, b.end, currentBooked, currentManual) === 'booked',
  ).length;
  const blockedCount = timeBlocks.filter(
    (b) => getBlockStatus(b.start, b.end, currentBooked, currentManual) === 'blocked',
  ).length;

  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <p className="text-secondary-light text-xs font-semibold uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-3xl font-black text-white">Slot Availability</h1>
          <p className="text-gray-400 mt-1 text-sm">
            View bookings and manually block/unblock 30-min windows. Demo only — no real persistence.
          </p>
        </div>

        {/* Date tabs */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => setActiveDate(date)}
              className={[
                'px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all',
                activeDate === date
                  ? 'border-secondary bg-secondary/10 text-secondary-light'
                  : 'border-white/10 bg-surface text-gray-400 hover:border-white/20 hover:text-white',
              ].join(' ')}
            >
              <span className="block text-xs opacity-60 mb-0.5">{getDayLabel(date)}</span>
              {formatDateShort(date)}
            </button>
          ))}
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Available', count: availableCount, color: 'text-accent', bg: 'bg-accent/5 border-accent/15' },
            { label: 'Booked', count: bookedCount, color: 'text-red-400', bg: 'bg-red-500/5 border-red-500/15' },
            { label: 'Blocked', count: blockedCount, color: 'text-gray-400', bg: 'bg-white/[0.02] border-white/08' },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl border p-4 text-center ${s.bg}`}>
              <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-5 text-xs text-gray-400 mb-6 bg-white/[0.02] border border-white/08 rounded-xl px-4 py-3">
          <Info size={14} className="text-gray-500 flex-shrink-0" />
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-accent/20 border border-accent/40 inline-block" /> Available — click to block
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-500/20 border border-red-500/40 inline-block" /> Booked (customer reservation)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-white/[0.06] border border-white/10 inline-block" /> Blocked by admin — click to unblock
          </span>
        </div>

        {/* Time grid */}
        <div className="bg-surface border border-white/08 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/08 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-secondary-light" />
              <h3 className="font-bold text-white text-sm">
                {formatDateShort(activeDate)} — Operating hours: {minutesToDisplay(VENUE_HOURS.OPENING)} to{' '}
                {minutesToDisplay(VENUE_HOURS.CLOSING === 1440 ? 0 : VENUE_HOURS.CLOSING)} (midnight)
              </h3>
            </div>
          </div>

          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {timeBlocks.map((block) => {
              const status = getBlockStatus(block.start, block.end, currentBooked, currentManual);
              const bookedBy = status === 'booked'
                ? currentBooked.find((b) => block.start < b.end && block.end > b.start)?.label
                : null;

              return (
                <button
                  key={block.start}
                  onClick={() => toggleBlock(block.start)}
                  disabled={status === 'booked'}
                  title={
                    status === 'booked'
                      ? `Booked: ${bookedBy ?? 'reservation'}`
                      : status === 'blocked'
                      ? 'Click to unblock this window'
                      : 'Click to block this window'
                  }
                  className={[
                    'group relative p-3 rounded-xl border text-xs text-center transition-all duration-150',
                    status === 'booked'
                      ? 'border-red-500/30 bg-red-500/10 cursor-not-allowed'
                      : status === 'blocked'
                      ? 'border-white/10 bg-white/[0.03] hover:border-accent/30 hover:bg-accent/5'
                      : 'border-accent/20 bg-accent/5 hover:border-accent/50 hover:bg-accent/10 cursor-pointer',
                  ].join(' ')}
                >
                  {/* Toggle icon */}
                  {status !== 'booked' && (
                    <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {status === 'blocked'
                        ? <ToggleLeft size={10} className="text-gray-400" />
                        : <ToggleRight size={10} className="text-accent" />}
                    </div>
                  )}

                  <p className={`font-semibold mb-0.5 ${
                    status === 'booked' ? 'text-red-400' :
                    status === 'blocked' ? 'text-gray-500' : 'text-accent'
                  }`}>
                    {minutesToDisplay(block.start)}
                  </p>
                  <p className="text-gray-600 text-[10px] mb-1.5">
                    – {minutesToDisplay(block.end)}
                  </p>

                  {status === 'booked' && (
                    <Badge variant="red">Booked</Badge>
                  )}
                  {status === 'blocked' && (
                    <Badge variant="gray">Blocked</Badge>
                  )}
                  {status === 'available' && (
                    <Badge variant="green">Open</Badge>
                  )}

                  {bookedBy && (
                    <p className="text-[9px] text-red-400/70 mt-1 truncate">{bookedBy}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-secondary/5 border border-secondary/15 rounded-xl text-sm text-gray-400">
          <AlertCircle size={16} className="text-secondary-light mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-white font-medium">Demo Note: </span>
            Changes made here are session-only and do not persist. In production, admin toggles would update the database and reflect in real-time booking availability.
          </div>
        </div>
      </div>
    </div>
  );
}
