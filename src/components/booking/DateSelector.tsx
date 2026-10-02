import { Calendar } from 'lucide-react';
import { getBookingDates, getDayLabel, getDayName, formatDateShort } from '../../utils/helpers';

interface DateSelectorProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

export function DateSelector({ selectedDate, onSelect }: DateSelectorProps) {
  const dates = getBookingDates();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {dates.map((date) => {
        const isSelected = date === selectedDate;
        return (
          <button
            key={date}
            onClick={() => onSelect(date)}
            className={[
              'relative p-6 rounded-2xl border-2 text-left transition-all duration-200 group',
              isSelected
                ? 'border-accent bg-accent/10 shadow-glow-green-sm'
                : 'border-white/08 bg-surface hover:border-accent/30 hover:bg-accent/5',
            ].join(' ')}
          >
            {isSelected && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>
            )}
            <Calendar
              size={24}
              className={isSelected ? 'text-accent mb-3' : 'text-gray-500 mb-3'}
            />
            <div
              className={[
                'text-xs font-bold tracking-widest mb-1',
                isSelected ? 'text-accent' : 'text-gray-500',
              ].join(' ')}
            >
              {getDayLabel(date)}
            </div>
            <div className="text-2xl font-black text-white mb-1">
              {formatDateShort(date)}
            </div>
            <div className="text-sm text-gray-400">{getDayName(date)}</div>
          </button>
        );
      })}
    </div>
  );
}
