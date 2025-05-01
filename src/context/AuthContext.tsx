
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const mockUser: User = {
  id: "usr_123456789",
  name: "John Doe",
  email: "john.doe@example.com",
  isVerified: true
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage)
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('nairalock_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulating API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, just check if email contains "error" to simulate errors
      if (email.includes('error')) {
        throw new Error('Invalid credentials');
      }
      
      // Use mock user for now
      setUser(mockUser);
      localStorage.setItem('nairalock_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulating API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email.includes('error')) {
        throw new Error('Email already in use');
      }
      
      const newUser = {
        ...mockUser,
        name,
        email,
        isVerified: false
      };
      
      setUser(newUser);
      localStorage.setItem('nairalock_user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('nairalock_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
