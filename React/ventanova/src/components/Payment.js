import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
  const { clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      alert('Payment successful! Congratulations on your purchase!');
      clearCart();
      setLoading(false);
      navigate('/');
    }, 4000); // Simula un retraso de 4 segundos
  };

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    setLoading(false);
    setShowCancelConfirm(false);
    navigate('/');
  };

  const cancelCancel = () => {
    setShowCancelConfirm(false);
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
        <div className="button-group">
          <button type="button" className="btn btn-primary" onClick={handlePayment} disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
          <button type="button" className="btn btn-danger" onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
      {loading && <div className="loading-icon">Loading...</div>}
      {showCancelConfirm && (
        <div className="cancel-confirm">
          <p>Are you sure you want to cancel the payment process?</p>
          <button className="btn btn-secondary" onClick={confirmCancel}>Yes</button>
          <button className="btn btn-primary" onClick={cancelCancel}>No</button>
        </div>
      )}
    </div>
  );
}

export default Payment;