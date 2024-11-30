import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

//Aqui se crea la funcion Cart que se encarga de mostrar 
//los productos que se encuentran en el carrito

function Cart() {
  const { cartItems, removeFromCart, addToCart, message } = useContext(CartContext);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountedPrice = totalPrice - discount;

  const handleApplyCoupon = () => {
    if (coupon) {
      setDiscount(totalPrice * 0.1); // Simula un descuento del 10%
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Shopping Cart</h2>
      {message && <div className="alert alert-warning">{message}</div>}
      {cartItems.length > 0 ? (
        <ul className="cart-list">
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h5>{item.name}</h5>
                <p>{item.description.substring(0, 100)}...</p> {/* Descripción breve */}
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
                <p>Stock: {item.stock}</p>
                <button onClick={() => addToCart(item)} className="cart-item-add">
                  Add More
                </button>
                <button onClick={() => removeFromCart(item.id)} className="cart-item-remove">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty. Add some products to your cart!</p> {/* Descripción breve */}
          <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Products</button>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <h3>Discounted Price: ${discountedPrice.toFixed(2)}</h3>
          <div className="coupon-container">
            <label htmlFor="coupon">Coupon Code:</label>
            <input
              type="text"
              id="coupon"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="form-control"
            />
            <button onClick={handleApplyCoupon} className="btn btn-primary">
              Apply Coupon
            </button>
          </div>
          <div className="cart-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/')}>Continue Shopping</button>
            <Link to="/payment" className="btn btn-success">
              Proceed to Payment
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;