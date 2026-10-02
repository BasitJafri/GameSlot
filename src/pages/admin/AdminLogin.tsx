import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/admin');
    } else {
      setError('Invalid admin credentials.');
    }
  };

  const fillAdmin = () => {
    setEmail('admin@gaminn.pk');
    setPassword('Admin123!');
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-secondary/15 border border-secondary/30 mx-auto mb-4 flex items-center justify-center">
            <Shield size={32} className="text-secondary-light" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Admin Access</h1>
          <p className="text-gray-400">Game Inn Management Portal</p>
        </div>

        <div className="bg-surface border border-secondary/20 rounded-2xl p-8 shadow-glow-purple">
          {/* Demo hint */}
          <div className="mb-6 p-3 rounded-xl bg-secondary/5 border border-secondary/15">
            <p className="text-xs font-bold text-secondary-light mb-1">DEMO ADMIN CREDENTIALS</p>
            <p className="text-xs text-gray-400">admin@gaminn.pk / Admin123!</p>
            <button onClick={fillAdmin} className="text-secondary-light text-xs hover:underline mt-1">
              Auto-fill →
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-secondary/50 transition-all"
                placeholder="admin@gaminn.pk"
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
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-secondary/50 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 p-1"
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
            <Button type="submit" fullWidth variant="secondary" loading={loading}>
              Access Admin Panel
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
