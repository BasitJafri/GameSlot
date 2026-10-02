import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { validatePhone, validateEmail } from '../../utils/helpers';

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Full name is required (min 2 chars).';
    if (!validatePhone(form.phone)) errs.phone = 'Enter a valid Pakistani number (03XX-XXXXXXX).';
    if (!validateEmail(form.email)) errs.email = 'Enter a valid email address.';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setApiError('');
    setLoading(true);
    const result = await register(form.name, form.email, form.phone, form.password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setApiError(result.error || 'Registration failed.');
    }
  };

  const Field = ({
    id: _id,
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    hint,
  }: {
    id: keyof typeof form;
    label: string;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
    hint?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          'w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-gray-600 focus:outline-none focus:bg-white/[0.06] transition-all',
          error ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/10 focus:border-accent/50',
        ].join(' ')}
        placeholder={placeholder}
      />
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-24">
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <span className="text-accent font-black text-xl leading-none">G</span>
            </div>
            <span className="font-black text-2xl tracking-wide">
              GAME <span className="text-accent">INN</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join Game Inn Islamabad</p>
        </div>

        <div className="bg-surface border border-white/08 rounded-2xl p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field
              id="name"
              label="Full Name *"
              placeholder="Ahmed Khan"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              error={errors.name}
            />
            <Field
              id="phone"
              label="Phone Number *"
              placeholder="0312-3456789"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              error={errors.phone}
              hint="Pakistani format: 03XX-XXXXXXX"
            />
            <Field
              id="email"
              label="Email Address *"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              error={errors.email}
            />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={[
                    'w-full px-4 py-3 pr-12 rounded-xl bg-white/[0.04] border text-white placeholder-gray-600 focus:outline-none focus:bg-white/[0.06] transition-all',
                    errors.password ? 'border-red-500/50' : 'border-white/10 focus:border-accent/50',
                  ].join(' ')}
                  placeholder="Min 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 p-1"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
            </div>
            <Field
              id="confirm"
              label="Confirm Password *"
              type="password"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={(v) => setForm({ ...form, confirm: v })}
              error={errors.confirm}
            />

            {apiError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {apiError}
              </div>
            )}

            <Button type="submit" fullWidth loading={loading}>
              Create Account <ArrowRight size={16} />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:text-accent-dim font-medium transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
