import React, { createContext, useState, useEffect } from 'react';

// Creamos un contexto de React para compartir el estado de autenticación
// entre los componentes de nuestra aplicación.

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cargar el usuario desde localStorage si existe
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username) => {
    setUser(username);
    localStorage.setItem('user', JSON.stringify(username));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};