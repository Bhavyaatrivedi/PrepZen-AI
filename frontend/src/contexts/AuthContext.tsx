import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect, useMemo } from 'react';
import API, { setToken } from '../services/api';

interface IUser { id: string; email: string; name?: string }

interface AuthContextValue {
  user: IUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUserFromStorage(): { user: IUser | null; token: string | null } {
  const token = localStorage.getItem('prepzen-token');
  const user = localStorage.getItem('prepzen-user');
  return { token, user: user ? JSON.parse(user) : null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(() => loadUserFromStorage().user);
  const [token, setTokenState] = useState<string | null>(() => loadUserFromStorage().token);

  useEffect(() => {
    if (token) {
      setToken(token);
      localStorage.setItem('prepzen-token', token);
    } else {
      setToken();
      localStorage.removeItem('prepzen-token');
      localStorage.removeItem('prepzen-user');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('prepzen-user', JSON.stringify(user));
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await API.post('/auth/login', { email, password });
    const t = res.data.token;
    setTokenState(t);
    setUser(res.data.user);
  }, []);

  const register = useCallback(async (email: string, password: string, name?: string) => {
    const res = await API.post('/auth/register', { email, password, name });
    const t = res.data.token;
    setTokenState(t);
    setUser(res.data.user);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setTokenState(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({ user, token, login, register, logout }), [user, token, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
