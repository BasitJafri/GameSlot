import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, ChevronDown, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/faq', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-primary/95 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:shadow-glow-green-sm transition-all">
              <span className="text-accent font-black text-lg leading-none">G</span>
            </div>
            <span className="font-black text-xl tracking-wide">
              GAME <span className="text-accent">INN</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  [
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => navigate(isAuthenticated ? '/book' : '/login')}
            >
              Book Now
            </Button>
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <span className="text-accent text-xs font-bold">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-white font-medium">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                    {!isAdmin && (
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                      >
                        <LayoutDashboard size={16} />
                        My Dashboard
                      </Link>
                    )}
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                      >
                        <Shield size={16} />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5 border-t border-white/05"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <User size={20} />
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-primary/98 backdrop-blur-lg animate-fadeIn">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  [
                    'block px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
              <Button
                fullWidth
                onClick={() => {
                  setMobileOpen(false);
                  navigate(isAuthenticated ? '/book' : '/login');
                }}
              >
                Book Now
              </Button>
              {isAuthenticated ? (
                <>
                  {!isAdmin && (
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl"
                    >
                      <LayoutDashboard size={16} />
                      My Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => { setMobileOpen(false); handleLogout(); }}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5 rounded-xl"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl"
                >
                  <User size={16} />
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
