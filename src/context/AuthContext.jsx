import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../data/dummyData.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    setIsAuthenticated(true);
    localStorage.setItem('ig_user', JSON.stringify(u));
    setLoading(false);
  }, []);

  const login = (username, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const u = getCurrentUser();
        setUser(u);
        setIsAuthenticated(true);
        localStorage.setItem('ig_user', JSON.stringify(u));
        resolve(u);
      }, 300);
    });
  };

  const signup = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const u = getCurrentUser();
        setUser(u);
        setIsAuthenticated(true);
        localStorage.setItem('ig_user', JSON.stringify(u));
        resolve(u);
      }, 300);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('ig_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
