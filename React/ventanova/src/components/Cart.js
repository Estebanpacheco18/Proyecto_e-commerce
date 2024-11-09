// src/components/Cart.js
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../CartContext';

//Aqui se crea la funcion Cart que se encarga de mostrar 
//los productos que se encuentran en el carrito

function Cart() {
    const { cartItems } = useContext(CartContext);
  
    return (
      <div className="container">
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item">
                <h5>{item.name}</h5>
                <p>{item.description}</p>
                <p>Quantity: {item.quantity}</p>
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