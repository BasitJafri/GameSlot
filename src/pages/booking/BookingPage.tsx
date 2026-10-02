import { useBooking } from '../../context/BookingContext';
import { StepIndicator } from '../../components/booking/StepIndicator';
import { Step1Date } from './Step1Date';
import { Step2Slots } from './Step2Slots';
import { Step3Details } from './Step3Details';
import { Step4Review } from './Step4Review';
import { Step5Terms } from './Step5Terms';
import { Step6Payment } from './Step6Payment';
import { Step7Confirmation } from './Step7Confirmation';

export function BookingPage() {
  const { state } = useBooking();

  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Online Booking</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-6">Book Your Session</h1>
          <StepIndicator currentStep={state.step} />
        </div>

        {/* Step content */}
        <div className="animate-fadeIn">
          {state.step === 1 && <Step1Date />}
          {state.step === 2 && <Step2Slots />}
          {state.step === 3 && <Step3Details />}
          {state.step === 4 && <Step4Review />}
          {state.step === 5 && <Step5Terms />}
          {state.step === 6 && <Step6Payment />}
          {state.step === 7 && <Step7Confirmation />}
        </div>
      </div>
    </div>
  );
}
