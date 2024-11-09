import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext';
import './Payment.css';

function Payment() {
  const { clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      alert('Payment successful!');
      clearCart();
      setLoading(false);
    }, 4000); // Simula un retraso de 4 segundos
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <form>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input type="text" id="expiryDate" className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" className="form-control" required />
        </div>
        <button type="button" className="btn btn-primary" onClick={handlePayment} disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
      {loading && <div className="loading-icon">Loading...</div>}
    </div>
  );
}

export default Payment;