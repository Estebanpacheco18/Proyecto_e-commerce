import React, { createContext, useState } from 'react';

//Lo que hacemos en este archivo es crear un contexto de React que
//nos permitirá compartir el estado del carrito de compras entre los 
//componentes de nuestra aplicación. Para ello, 
//creamos un componente CartProvider que se encargará de almacenar el 
//estado del carrito.

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');

  const addToCart = (product, showMessage = true) => {
    setCartItems(prevItems => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      if (existingProduct) {
        if (existingProduct.quantity < product.stock) {
          return prevItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          setMessage(`Cannot add more than ${product.stock} items of ${product.name}`);
          setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
          return prevItems;
        }
      } else {
        if (showMessage) {
          setMessage(`${product.name} added to cart!`);
          setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        }
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (product) => {
    setCartItems(prevItems => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      if (existingProduct && existingProduct.quantity > 1) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter(item => item.id !== product.id);
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    setMessage('Item removed from cart!');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, message }}>
      {children}
    </CartContext.Provider>
  );
};