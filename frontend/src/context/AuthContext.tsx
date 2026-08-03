'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  email: string;
  name: string;
  avatar: string;
  bio: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
  isLoadingAuth: boolean;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '');


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('bts_token');
    if (savedToken) {
      setToken(savedToken);
      fetchUserProfile(savedToken);
    } else {
      setIsLoadingAuth(false);
      setIsAuthModalOpen(true);
    }
  }, []);

  const fetchUserProfile = async (jwtToken: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setIsAuthModalOpen(false);
      } else {
        localStorage.removeItem('bts_token');
        setToken(null);
        setUser(null);
        setIsAuthModalOpen(true);
      }
    } catch (err) {
      console.warn('Backend offline or unreachable during auth check:', err);
      setIsAuthModalOpen(true);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    if (user) {
      setIsAuthModalOpen(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'Invalid email or password');
      }

      const data = await res.json();
      localStorage.setItem('bts_token', data.access_token);
      setToken(data.access_token);
      setUser(data.user);
      setIsAuthModalOpen(false);
    } catch (err: any) {
      if (err.name === 'TypeError' || err.message?.includes('fetch')) {
        throw new Error('Unable to connect to backend server. Please make sure the Python server is running (python main.py in backend folder).');
      }
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'Registration failed');
      }

      const data = await res.json();
      localStorage.setItem('bts_token', data.access_token);
      setToken(data.access_token);
      setUser(data.user);
      setIsAuthModalOpen(false);
    } catch (err: any) {
      if (err.name === 'TypeError' || err.message?.includes('fetch')) {
        throw new Error('Unable to connect to backend server. Please make sure the Python server is running (python main.py in backend folder).');
      }
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('bts_token');
    setToken(null);
    setUser(null);
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthModalOpen,
        authMode,
        isLoadingAuth,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
