import React, { createContext, useState, useContext, ReactNode } from 'react';
import API, { setToken } from '../services/api';

interface IUser { id: string; email: string; name?: string }

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const res = await API.post('/auth/login', { email, password });
    const t = res.data.token;
    setToken(t);
    setTokenState(t);
    setUser(res.data.user);
    setToken(t);
  };

  const register = async (email: string, password: string, name?: string) => {
    const res = await API.post('/auth/register', { email, password, name });
    const t = res.data.token;
    setToken(t);
    setTokenState(t);
    setUser(res.data.user);
  };

  const logout = () => {
    setUser(null);
    setTokenState(null);
    setToken();
  };

  return <AuthContext.Provider value={{ user, token, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
