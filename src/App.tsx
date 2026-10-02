import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AdminNavbar } from './components/layout/AdminNavbar';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Public pages
import { HomePage }       from './pages/public/HomePage';
import { AboutPage }      from './pages/public/AboutPage';
import { ExperiencePage } from './pages/public/ExperiencePage';
import { GalleryPage }    from './pages/public/GalleryPage';
import { FAQPage }        from './pages/public/FAQPage';
import { ContactPage }    from './pages/public/ContactPage';

// Auth pages
import { LoginPage }    from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Booking
import { BookingPage } from './pages/booking/BookingPage';

// Dashboard
import { UserDashboard } from './pages/dashboard/UserDashboard';

// Admin
import { AdminLogin }        from './pages/admin/AdminLogin';
import { AdminDashboard }    from './pages/admin/AdminDashboard';
import { AdminBookings }     from './pages/admin/AdminBookings';
import { AdminAvailability } from './pages/admin/AdminAvailability';

/** Public pages — full Navbar + Footer */
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}

/** Auth / booking / dashboard pages — Navbar only, no Footer */
function AppLayout() {
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
    </>
  );
}

/** Admin pages — dedicated AdminNavbar, no public nav */
function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <main><Outlet /></main>
    </>
  );
}

/** Redirects unauthenticated users to login */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setRedirectAfterLogin } = useAuth();
  if (!isAuthenticated) {
    setRedirectAfterLogin(window.location.pathname);
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

/** Redirects non-admins to admin login */
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      {/* ── Public routes (Navbar + Footer) ── */}
      <Route element={<PublicLayout />}>
        <Route path="/"           element={<HomePage />} />
        <Route path="/about"      element={<AboutPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/gallery"    element={<GalleryPage />} />
        <Route path="/faq"        element={<FAQPage />} />
        <Route path="/contact"    element={<ContactPage />} />
      </Route>

      {/* ── Auth routes (Navbar only) ── */}
      <Route element={<AppLayout />}>
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* ── Protected customer routes ── */}
      <Route element={<PublicLayout />}>
        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <BookingProvider>
                <BookingPage />
              </BookingProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ── Admin login (no navbar) ── */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ── Admin pages (AdminNavbar only) ── */}
      <Route element={<AdminLayout />}>
        <Route
          path="/admin"
          element={<AdminRoute><AdminDashboard /></AdminRoute>}
        />
        <Route
          path="/admin/bookings"
          element={<AdminRoute><AdminBookings /></AdminRoute>}
        />
        <Route
          path="/admin/availability"
          element={<AdminRoute><AdminAvailability /></AdminRoute>}
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
