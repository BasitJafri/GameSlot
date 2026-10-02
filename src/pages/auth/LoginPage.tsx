import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, redirectAfterLogin, setRedirectAfterLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      const redirect = redirectAfterLogin || '/';
      setRedirectAfterLogin(null);
      navigate(redirect);
    } else {
      setError(result.error || 'Login failed.');
    }
  };

  const fillDemo = () => {
    setEmail('demo@gaminn.pk');
    setPassword('Demo123!');
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-24">
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <span className="text-accent font-black text-xl leading-none">G</span>
            </div>
            <span className="font-black text-2xl tracking-wide">
              GAME <span className="text-accent">INN</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your Game Inn account</p>
        </div>

        <div className="bg-surface border border-white/08 rounded-2xl p-8 shadow-card">
          {/* Demo hint */}
          <div className="mb-6 p-3 rounded-xl bg-accent/5 border border-accent/15 flex items-start gap-3">
            <div className="text-accent text-xs font-bold mt-0.5">DEMO</div>
            <div className="text-xs text-gray-400">
              <p className="font-medium text-gray-300 mb-1">Demo Account:</p>
              <p>Email: demo@gaminn.pk</p>
              <p>Password: Demo123!</p>
              <button onClick={fillDemo} className="text-accent hover:underline mt-1">
                Auto-fill →
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" fullWidth loading={loading}>
              Sign In <ArrowRight size={16} />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent hover:text-accent-dim font-medium transition-colors">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
