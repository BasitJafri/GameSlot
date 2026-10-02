import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, BookOpen, ToggleLeft, ExternalLink, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const adminLinks = [
  { to: '/admin',              label: 'Dashboard',    icon: LayoutDashboard, end: true },
  { to: '/admin/bookings',     label: 'Bookings',     icon: BookOpen,        end: false },
  { to: '/admin/availability', label: 'Availability', icon: ToggleLeft,      end: false },
];

export function AdminNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-16 bg-[#0d0d18] border-b border-secondary/20 shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

        {/* Logo + badge */}
        <Link to="/admin" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-secondary/15 border border-secondary/30 flex items-center justify-center group-hover:shadow-glow-purple transition-all">
            <Shield size={15} className="text-secondary-light" />
          </div>
          <span className="font-black text-base sm:text-lg tracking-wide hidden xs:block">
            GAME <span className="text-accent">INN</span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest bg-secondary/20 text-secondary-light border border-secondary/30 px-1.5 py-0.5 rounded-full hidden sm:inline">
            Admin Panel
          </span>
        </Link>

        {/* Nav links — scroll on small screens */}
        <div className="flex items-center gap-0.5 overflow-x-auto flex-1 justify-center max-w-sm mx-auto">
          {adminLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0',
                  isActive
                    ? 'text-secondary-light bg-secondary/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5',
                ].join(' ')
              }
            >
              <Icon size={13} className="flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 border border-white/08 transition-all whitespace-nowrap"
          >
            Website <ExternalLink size={11} />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-all"
            title="Logout"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
