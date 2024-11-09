// src/components/Cart.js
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../CartContext';
import './Cart.css';

//Aqui se crea la funcion Cart que se encarga de mostrar 
//los productos que se encuentran en el carrito

function Cart() {
    const { cartItems, removeFromCart, message } = useContext(CartContext);
  
    return (
      <div className="container cart-container">
        <h1 className="cart-header">Shopping Cart</h1>
        {message && <div className="alert alert-success">{message}</div>}
        {cartItems.length > 0 ? (
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h5>{item.name}</h5>
                  <p>{item.description}</p>
                  <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in cart</p>
        )}
      </div>
    );
  }
  
  export default Cart;