import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

const navLinks = [
  { to: '/',           label: 'Home' },
  { to: '/about',      label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/gallery',    label: 'Gallery' },
  { to: '/faq',        label: 'FAQs' },
  { to: '/contact',    label: 'Contact' },
];

export function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [profileOpen,  setProfileOpen]  = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  // Scroll detection for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Lock / unlock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    closeMobile();
    navigate('/');
  };

  const handleBookNow = () => {
    closeMobile();
    navigate(isAuthenticated ? '/book' : '/login');
  };

  return (
    <>
      {/* ── Fixed top bar ───────────────────────────────────── */}
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled || mobileOpen
            ? 'bg-primary/98 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group" onClick={closeMobile}>
              <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:shadow-glow-green-sm transition-all">
                <span className="text-accent font-black text-lg leading-none">G</span>
              </div>
              <span className="font-black text-xl tracking-wide">
                GAME <span className="text-accent">INN</span>
              </span>
            </Link>

            {/* Desktop nav links */}
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

            {/* Desktop right actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button size="sm" onClick={handleBookNow}>Book Now</Button>

              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                      <span className="text-accent text-xs font-bold">{user.name.charAt(0)}</span>
                    </div>
                    <span className="text-sm text-white font-medium">{user.name.split(' ')[0]}</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>

                  {profileOpen && (
                    <>
                      {/* Backdrop to close dropdown */}
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 top-12 w-48 bg-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                        {!isAdmin && (
                          <Link
                            to="/dashboard"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                          >
                            <LayoutDashboard size={16} /> My Dashboard
                          </Link>
                        )}
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                          >
                            <Shield size={16} /> Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5 border-t border-white/05"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </>
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
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen drawer ────────────────────────── */}
      {/*
        Rendered OUTSIDE the nav so it truly covers 100vh.
        z-50 sits above the nav (z-40).
      */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-primary animate-fadeIn overflow-y-auto">

          {/* Drawer header — same height as the top bar */}
          <div className="flex items-center justify-between px-4 h-16 flex-shrink-0 border-b border-white/[0.06] bg-primary/98">
            <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
              <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                <span className="text-accent font-black text-lg leading-none">G</span>
              </div>
              <span className="font-black text-xl tracking-wide">
                GAME <span className="text-accent">INN</span>
              </span>
            </Link>
            <button
              aria-label="Close menu"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              onClick={closeMobile}
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={closeMobile}
                className={({ isActive }) =>
                  [
                    'flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all',
                    isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Bottom actions */}
          <div className="px-4 pb-8 pt-4 border-t border-white/[0.06] space-y-3 flex-shrink-0">
            <Button fullWidth size="lg" onClick={handleBookNow}>
              Book Now
            </Button>

            {isAuthenticated ? (
              <>
                {!isAdmin && (
                  <Link
                    to="/dashboard"
                    onClick={closeMobile}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    <LayoutDashboard size={16} /> My Dashboard
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={closeMobile}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    <Shield size={16} /> Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all w-full"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMobile}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                <User size={16} /> Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
