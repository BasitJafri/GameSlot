import { ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { DateSelector } from '../../components/booking/DateSelector';
import { Button } from '../../components/ui/Button';

export function Step1Date() {
  const { state, setDate, goNext } = useBooking();

  return (
    <div>
      <h2 className="text-2xl font-black text-white mb-2">Select a Date</h2>
      <p className="text-gray-400 mb-8">
        Choose from the available booking dates below. Slots are open for the next 3 days.
      </p>
      <DateSelector selectedDate={state.selectedDate} onSelect={setDate} />
      <div className="mt-8 flex justify-end">
        <Button
          disabled={!state.selectedDate}
          onClick={goNext}
        >
          Continue to Slot Selection <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
