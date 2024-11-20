import React, { useState } from 'react';
import './Payment.css';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [paymentStatus, setPaymentStatus] = useState('initial');
 const navigate = useNavigate();

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardDetailChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
      setCardDetails(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }

    // Format expiry with slash
    if (name === 'expiry') {
      const formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 4)
        .replace(/(\d{2})/, '$1/');
      setCardDetails(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    const { cardNumber, expiry, cvv } = cardDetails;
    
    if (paymentMethod === 'card') {
      if (!cardNumber || !expiry || !cvv) {
        alert('Please fill in all card details');
        return;
      }
    }

    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  const resetPayment = () => {
    setPaymentStatus('initial');
    navigate('/');
  };

  // Render processing state
  if (paymentStatus === 'processing') {
    return (
      <div className="payment-container processing">
        <div className="loader">
          <div className="spinner"></div>
          Processing Payment...
        </div>
      </div>
    );
  }

  // Render success state
  if (paymentStatus === 'success') {
    return (
      <div className="payment-container success">
        <div className="success-animation">
          <div className="checkmark">
            <div className="check-icon">✓</div>
          </div>
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase</p>
          <button onClick={resetPayment} className="reset-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Render initial payment form
  return (
    <div className="payment-container">
      <div className="payment-header">
        <span>🚚</span>
        Complete Your Purchase
      </div>
      
      <div className="payment-content">
        <div className="payment-methods">
          <label>
            <input 
              type="radio" 
              name="payment" 
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => handlePaymentMethodChange('card')}
            />
            💳 Card Payment
          </label>
          <label>
            <input 
              type="radio" 
              name="payment" 
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => handlePaymentMethodChange('cod')}
            />
            💵 Cash on Delivery
          </label>
        </div>

        {paymentMethod === 'card' && (
          <div className="card-details">
            <input 
              type="text" 
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailChange}
              maxLength={19}
            />
            <div className="card-row">
              <input 
                type="text" 
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleCardDetailChange}
                maxLength={5}
              />
              <input 
                type="text" 
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardDetailChange}
                maxLength={3}
              />
            </div>
          </div>
        )}

        {paymentMethod === 'cod' && (
          <div className="cod-details">
            <p>You'll pay the total amount when the package is delivered.</p>
          </div>
        )}

        <button 
          className="pay-button" 
          onClick={handleSubmit}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;