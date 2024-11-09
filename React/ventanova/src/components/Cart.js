import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <ul className="list-group">
          {cartItems.map((item, index) => (
            <li key={index} className="list-group-item">
              <h5>{item.name}</h5>
              <p>{item.description}</p>
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