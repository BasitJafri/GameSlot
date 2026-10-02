/**
 * TimeSlotPicker — replaces the old fixed-slot grid.
 *
 * Step 1: user picks a START TIME (every 30 min, 10 AM – 11:30 PM).
 *         Chips that fall inside a booked block are disabled.
 *
 * Step 2: after picking start, user picks a DURATION (1h, 1.5h … up to MAX_DURATION).
 *         Duration buttons are disabled when the resulting end time would:
 *           • exceed closing time, OR
 *           • overlap a booked block.
 *
 * On change the component calls onSelect(BookingSlot) or onClear().
 */

import { Clock, AlertCircle } from 'lucide-react';
import type { BookedBlock, BookingSlot } from '../../types';
import { VENUE_HOURS, DURATION_OPTIONS, PRICING, calcTotal } from '../../config/constants';
import { minutesToDisplay, formatDuration, formatCurrency, rangesOverlap } from '../../utils/helpers';

interface TimeSlotPickerProps {
  bookedBlocks: BookedBlock[];
  currentSlot: BookingSlot | null;
  onSelect: (slot: BookingSlot) => void;
  onClear: () => void;
}

/** Generate every valid start-time option (multiple of TIME_STEP between OPENING and CLOSING - MIN_DURATION) */
function generateStartTimes(): number[] {
  const times: number[] = [];
  const lastStart = VENUE_HOURS.CLOSING - VENUE_HOURS.MIN_DURATION; // last possible start
  for (
    let t = VENUE_HOURS.OPENING;
    t <= lastStart;
    t += VENUE_HOURS.TIME_STEP
  ) {
    times.push(t);
  }
  return times;
}

/** A start-time chip is "blocked" if any booked block fully covers it (i.e. starts before and ends after) */
function isStartBlocked(startMin: number, blocks: BookedBlock[]): boolean {
  return blocks.some((b) => startMin >= b.start && startMin < b.end);
}

/** A duration is invalid for a given start if the resulting range exceeds closing or overlaps a booked block */
function isDurationInvalid(startMin: number, durMin: number, blocks: BookedBlock[]): boolean {
  const endMin = startMin + durMin;
  if (endMin > VENUE_HOURS.CLOSING) return true;
  return blocks.some((b) => rangesOverlap(startMin, endMin, b.start, b.end));
}

export function TimeSlotPicker({
  bookedBlocks,
  currentSlot,
  onSelect,
  onClear,
}: TimeSlotPickerProps) {
  const startTimes = generateStartTimes();

  const selectedStart = currentSlot?.startMinutes ?? null;
  const selectedDuration = currentSlot?.durationMinutes ?? null;

  const handleStartClick = (startMin: number) => {
    if (isStartBlocked(startMin, bookedBlocks)) return;
    // If same start already selected, deselect
    if (selectedStart === startMin) {
      onClear();
      return;
    }
    // Select start, clear duration
    onClear(); // reset previous selection
    // We temporarily signal "start picked but no duration yet" by setting a 0-duration placeholder
    // Actually we'll handle this with local state in Step2Slots — here we just call onClear and
    // the parent manages the two-step selection.
    // But since this component is purely display, we need the parent to track partial selection.
    // We'll handle that by calling onSelect with a special "pending" slot or via parent local state.
    // For simplicity: this component emits a "start-only" slot with duration=0.
    onSelect({
      startTime: minutesToDisplay(startMin),
      endTime: '',
      startMinutes: startMin,
      endMinutes: startMin,
      durationMinutes: 0,
    });
  };

  const handleDurationClick = (durMin: number) => {
    if (selectedStart === null) return;
    if (isDurationInvalid(selectedStart, durMin, bookedBlocks)) return;
    const endMin = selectedStart + durMin;
    onSelect({
      startTime: minutesToDisplay(selectedStart),
      endTime: minutesToDisplay(endMin),
      startMinutes: selectedStart,
      endMinutes: endMin,
      durationMinutes: durMin,
    });
  };

  const total = selectedDuration ? calcTotal(selectedDuration) : 0;
  const isComplete = selectedStart !== null && selectedDuration !== null && selectedDuration > 0;

  // Group start times into rows of 4 for a clean grid
  const rows: number[][] = [];
  for (let i = 0; i < startTimes.length; i += 4) {
    rows.push(startTimes.slice(i, i + 4));
  }

  return (
    <div className="space-y-8">
      {/* Step A: Start time */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-accent text-black flex items-center justify-center text-xs font-black">1</div>
          <h3 className="text-base font-bold text-white">Choose Start Time</h3>
          <span className="text-xs text-gray-500 ml-1">— when do you want to begin?</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {startTimes.map((t) => {
            const blocked = isStartBlocked(t, bookedBlocks);
            const selected = selectedStart === t;
            return (
              <button
                key={t}
                disabled={blocked}
                onClick={() => handleStartClick(t)}
                className={[
                  'relative py-2.5 px-3 rounded-xl text-sm font-semibold border-2 transition-all duration-150 text-center',
                  selected
                    ? 'border-accent bg-accent/15 text-accent shadow-glow-green-sm'
                    : blocked
                    ? 'border-white/[0.04] bg-white/[0.02] text-gray-600 cursor-not-allowed line-through'
                    : 'border-white/10 bg-surface text-gray-300 hover:border-accent/40 hover:text-white hover:bg-accent/5 cursor-pointer',
                ].join(' ')}
              >
                {minutesToDisplay(t)}
                {blocked && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500/80 flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold">✕</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border-2 border-accent bg-accent/15 inline-block" />
            Selected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border-2 border-white/10 bg-surface inline-block" />
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border-2 border-white/[0.04] bg-white/[0.02] inline-block" />
            Booked
          </span>
        </div>
      </div>

      {/* Step B: Duration — only shown after start is picked */}
      {selectedStart !== null && (
        <div className="animate-fadeIn">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-accent text-black flex items-center justify-center text-xs font-black">2</div>
            <h3 className="text-base font-bold text-white">Choose Duration</h3>
            <span className="text-xs text-gray-500 ml-1">— minimum 1 hour, in 30-min steps</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {DURATION_OPTIONS.map((dur) => {
              const invalid = isDurationInvalid(selectedStart, dur, bookedBlocks);
              const selected = selectedDuration === dur;
              const endMin = selectedStart + dur;
              const price = calcTotal(dur);
              return (
                <button
                  key={dur}
                  disabled={invalid}
                  onClick={() => handleDurationClick(dur)}
                  className={[
                    'flex flex-col items-center py-3 px-4 rounded-xl border-2 transition-all duration-150 min-w-[80px]',
                    selected
                      ? 'border-accent bg-accent/15 shadow-glow-green-sm'
                      : invalid
                      ? 'border-white/[0.04] bg-white/[0.02] opacity-40 cursor-not-allowed'
                      : 'border-white/10 bg-surface hover:border-accent/40 hover:bg-accent/5 cursor-pointer',
                  ].join(' ')}
                >
                  <span className={`text-base font-black ${selected ? 'text-accent' : invalid ? 'text-gray-600' : 'text-white'}`}>
                    {formatDuration(dur)}
                  </span>
                  <span className={`text-xs mt-0.5 ${selected ? 'text-accent/70' : 'text-gray-500'}`}>
                    {formatCurrency(price)}
                  </span>
                  {!invalid && (
                    <span className="text-[10px] text-gray-600 mt-0.5">
                      ends {minutesToDisplay(endMin)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Summary bar — shown once both are picked */}
      {isComplete && currentSlot && (
        <div className="p-4 rounded-2xl bg-accent/5 border border-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-accent flex-shrink-0" />
            <div>
              <p className="text-white font-bold">
                {currentSlot.startTime} – {currentSlot.endTime}
              </p>
              <p className="text-gray-400 text-sm">
                {formatDuration(currentSlot.durationMinutes)} session
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-accent font-black text-xl">{formatCurrency(total)}</p>
            <p className="text-gray-500 text-xs">
              Advance: {formatCurrency(PRICING.ADVANCE_AMOUNT)}
            </p>
          </div>
        </div>
      )}

      {/* Hint when start picked but no duration yet */}
      {selectedStart !== null && !isComplete && (
        <div className="flex items-center gap-2 text-yellow-400/80 text-sm animate-fadeIn">
          <AlertCircle size={15} />
          <span>Select a duration above to continue</span>
        </div>
      )}
    </div>
  );
}
