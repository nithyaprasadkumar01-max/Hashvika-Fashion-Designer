'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
