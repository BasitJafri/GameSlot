import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const STEP_LABELS = [
  'Date',
  'Slots',
  'Details',
  'Review',
  'Terms',
  'Payment',
  'Done',
];

export function StepIndicator({ currentStep, totalSteps = 7 }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-white/[0.06] -z-0" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-500 -z-0"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          const isFuture = step > currentStep;
          return (
            <div key={step} className="flex flex-col items-center gap-2 z-10">
              <div
                className={[
                  'w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300',
                  isCompleted
                    ? 'bg-accent border-accent text-black'
                    : isCurrent
                    ? 'bg-accent/15 border-accent text-accent shadow-glow-green-sm'
                    : 'bg-primary-light border-white/10 text-gray-600',
                ].join(' ')}
              >
                {isCompleted ? <Check size={14} /> : step}
              </div>
              <span
                className={[
                  'text-xs font-medium',
                  isCurrent ? 'text-accent' : isFuture ? 'text-gray-600' : 'text-gray-400',
                ].join(' ')}
              >
                {STEP_LABELS[i]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden items-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: totalSteps }, (_, i) => {
            const step = i + 1;
            return (
              <div
                key={step}
                className={[
                  'h-1 rounded-full transition-all duration-300',
                  step < currentStep
                    ? 'bg-accent w-6'
                    : step === currentStep
                    ? 'bg-accent w-8'
                    : 'bg-white/10 w-4',
                ].join(' ')}
              />
            );
          })}
        </div>
        <span className="text-sm text-gray-400">
          Step <span className="text-accent font-semibold">{currentStep}</span> of {totalSteps}:{' '}
          <span className="text-white">{STEP_LABELS[currentStep - 1]}</span>
        </span>
      </div>
    </div>
  );
}
