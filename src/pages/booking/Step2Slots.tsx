import { ArrowLeft, ArrowRight, CalendarDays } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { TimeSlotPicker } from '../../components/booking/SlotGrid';
import { Button } from '../../components/ui/Button';
import { bookedBlocks } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';
import type { BookingSlot } from '../../types';

export function Step2Slots() {
  const { state, selectSlot, clearSlot, goNext, goBack } = useBooking();

  const blocks = bookedBlocks[state.selectedDate] ?? [];
  const isComplete = state.selectedSlot !== null && state.selectedSlot.durationMinutes > 0;

  const handleSelect = (slot: BookingSlot) => {
    selectSlot(slot);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-white mb-1">Build Your Session</h2>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <CalendarDays size={14} className="text-accent" />
            {formatDate(state.selectedDate)}
          </div>
        </div>
        <div className="text-sm text-gray-500 bg-white/[0.03] border border-white/08 rounded-xl px-4 py-2 max-w-xs">
          Pick your <span className="text-white font-medium">start time</span> then choose how many <span className="text-white font-medium">hours</span> you want to play.
        </div>
      </div>

      <TimeSlotPicker
        bookedBlocks={blocks}
        currentSlot={state.selectedSlot}
        onSelect={handleSelect}
        onClear={clearSlot}
      />

      <div className="mt-10 flex justify-between">
        <Button variant="ghost" onClick={goBack}>
          <ArrowLeft size={16} /> Back
        </Button>
        <Button disabled={!isComplete} onClick={goNext}>
          Continue <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
