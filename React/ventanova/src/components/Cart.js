// src/components/Cart.js
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

//Aqui se crea la funcion Cart que se encarga de mostrar 
//los productos que se encuentran en el carrito

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <ul className="list-group">
          {cartItems.map(item => (
            <li key={item.id} className="list-group-item">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      {cartItems.length > 0 && (
        <Link to="/payment" className="btn btn-success">
          Proceed to Payment
        </Link>
      )}
    </div>
  );
}

export default Cart;