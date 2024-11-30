import React, { createContext, useState, useEffect } from 'react';

// Creamos un contexto de React para compartir el estado de autenticación
// entre los componentes de nuestra aplicación.

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Cargar el usuario desde localStorage si existe
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Cargar los usuarios registrados desde localStorage si existen
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const login = (username, password) => {
    const existingUser = users.find(user => user.username === username && user.password === password);
    if (existingUser) {
      setUser(username);
      localStorage.setItem('user', JSON.stringify(username));
    } else {
      throw new Error('Incorrect username or password');
    }
  };

  const register = (username, password) => {
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      throw new Error('Username already exists');
    } else {
      const newUser = { username, password };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUser(username);
      localStorage.setItem('user', JSON.stringify(username));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};