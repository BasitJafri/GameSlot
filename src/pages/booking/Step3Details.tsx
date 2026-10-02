import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { BookingSummary } from '../../components/booking/BookingSummary';
import { validatePhone, validateEmail } from '../../utils/helpers';

export function Step3Details() {
  const { state, setCustomerDetails, goNext, goBack } = useBooking();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name:  state.customerDetails.name  || user?.name  || '',
    phone: state.customerDetails.phone || user?.phone || '',
    email: state.customerDetails.email || user?.email || '',
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Full name is required.';
    if (!validatePhone(form.phone)) errs.phone = 'Enter a valid Pakistani number (03XX-XXXXXXX).';
    if (form.email && !validateEmail(form.email)) errs.email = 'Enter a valid email address.';
    return errs;
  };

  const handleContinue = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setCustomerDetails(form);
    goNext();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-black text-white mb-2">Your Details</h2>
        <p className="text-gray-400 mb-8">
          {user
            ? 'Details pre-filled from your account — update if needed.'
            : 'Please provide your contact information.'}
        </p>

        <div className="space-y-5">
          {/* Full name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={[
                'w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-gray-600 focus:outline-none focus:bg-white/[0.06] transition-all',
                errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-accent/50',
              ].join(' ')}
              placeholder="Ahmed Khan"
            />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number * <span className="text-gray-500 font-normal">(Pakistani format)</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={[
                'w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-gray-600 focus:outline-none focus:bg-white/[0.06] transition-all',
                errors.phone ? 'border-red-500/50' : 'border-white/10 focus:border-accent/50',
              ].join(' ')}
              placeholder="0312-3456789"
            />
            {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
            <p className="text-xs text-gray-500 mt-1">Venue will use this number for confirmation</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={[
                'w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-gray-600 focus:outline-none focus:bg-white/[0.06] transition-all',
                errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-accent/50',
              ].join(' ')}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="ghost" onClick={goBack}>
            <ArrowLeft size={16} /> Back
          </Button>
          <Button onClick={handleContinue}>
            Review Booking <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <div className="lg:col-span-1">
        <BookingSummary
          selectedDate={state.selectedDate}
          selectedSlot={state.selectedSlot}
          customerDetails={form}
        />
      </div>
    </div>
  );
}
