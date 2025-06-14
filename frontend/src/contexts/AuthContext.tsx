import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import { auth, user } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await user.getProfile();
      console.log(response,response.data.data.user, 'sss');
      setCurrentUser(response.data.data.user);
      navigate('/tasks');
    } catch {
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await auth.login({ email, password });
    localStorage.setItem('token', response.token);
    await fetchUserProfile();
  };

  const register = async (username: string, email: string, password: string) => {
    const response = await auth.register({ username, email, password });
    localStorage.setItem('token', response.token);
    await fetchUserProfile();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
