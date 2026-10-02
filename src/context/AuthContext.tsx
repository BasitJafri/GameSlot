import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { DEMO_USERS } from '../config/constants';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  redirectAfterLogin: string | null;
  setRedirectAfterLogin: (path: string | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('gameinn_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('gameinn_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gameinn_user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 600));
    if (email === DEMO_USERS.admin.email && password === DEMO_USERS.admin.password) {
      const adminUser: User = {
        id: DEMO_USERS.admin.id,
        name: DEMO_USERS.admin.name,
        email: DEMO_USERS.admin.email,
        phone: DEMO_USERS.admin.phone,
        role: 'admin',
      };
      setUser(adminUser);
      return { success: true };
    }
    if (email === DEMO_USERS.customer.email && password === DEMO_USERS.customer.password) {
      const custUser: User = {
        id: DEMO_USERS.customer.id,
        name: DEMO_USERS.customer.name,
        email: DEMO_USERS.customer.email,
        phone: DEMO_USERS.customer.phone,
        role: 'customer',
      };
      setUser(custUser);
      return { success: true };
    }
    // Check localStorage for registered users
    try {
      const registered = JSON.parse(localStorage.getItem('gameinn_registered_users') || '[]') as User[];
      const found = registered.find((u) => u.email === email);
      if (found) {
        setUser(found);
        return { success: true };
      }
    } catch { /* ignore */ }
    return { success: false, error: 'Invalid email or password.' };
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    _password: string
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 600));
    if (email === DEMO_USERS.admin.email || email === DEMO_USERS.customer.email) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser: User = {
      id: `u_${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
    };
    try {
      const existing = JSON.parse(localStorage.getItem('gameinn_registered_users') || '[]') as User[];
      if (existing.find((u) => u.email === email)) {
        return { success: false, error: 'An account with this email already exists.' };
      }
      existing.push(newUser);
      localStorage.setItem('gameinn_registered_users', JSON.stringify(existing));
    } catch { /* ignore */ }
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        register,
        redirectAfterLogin,
        setRedirectAfterLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
