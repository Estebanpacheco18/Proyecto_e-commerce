// src/CartContext.js
import React, { createContext, useState } from 'react';

//Lo que hacemos en este archivo es crear un contexto de React que
//nos permitirá compartir el estado del carrito de compras entre los 
//componentes de nuestra aplicación. Para ello, 
//creamos un componente CartProvider que se encargará de almacenar el 
//estado del carrito.
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      if (existingProduct) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

