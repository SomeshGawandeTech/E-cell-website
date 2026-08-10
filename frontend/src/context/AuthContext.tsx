import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { sendOtpRequest, verifyOtpRequest } from '../services/api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Visitor' | 'Student Member' | 'Core Team Member' | 'Admin';
  points: number;
  xp: number;
  level: number;
  badges: string[];
  department?: string;
  year?: string;
  avatar?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  sendOtp: (email: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (email: string, otp: string, name?: string, role?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('coeta_ecell_token'));
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      if (token) {
        const res = await api.get('/auth/me');
        if (res.data.success) {
          setUser(res.data.user);
        }
      }
    } catch (err) {
      console.warn('Session expired or invalid token');
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const sendOtp = async (email: string) => {
    return await sendOtpRequest(email);
  };

  const verifyOtp = async (email: string, otp: string, name?: string, role?: string) => {
    const data = await verifyOtpRequest(email, otp, name, role);
    if (data.success && data.token) {
      localStorage.setItem('coeta_ecell_token', data.token);
      setToken(data.token);
      // Log token for developer debugging (quick access in DevTools)
      try {
        // eslint-disable-next-line no-console
        console.debug('[Auth] Token stored:', data.token);
        // also expose to window for quick retrieval while developing
        // @ts-ignore
        window.__COETA_ECELL_TOKEN = data.token;
      } catch (e) {}
      setUser(data.user);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('coeta_ecell_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, sendOtp, verifyOtp, logout, refreshUser: fetchUser }}>
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
