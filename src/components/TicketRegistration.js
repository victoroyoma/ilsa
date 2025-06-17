import React, { useState } from 'react';
import { getPaystackUrlForTicket } from '../../utils/paystackUrls';

const TicketRegistration = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [error, setError] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    try {
      // ...existing code for user registration...
      
      // After successful registration, redirect to Paystack
      const paystackUrl = getPaystackUrlForTicket(selectedTicket.type);
      
      if (paystackUrl) {
        window.location.href = paystackUrl;
      } else {
        setError("Payment link not available for this ticket type.");
      }
    } catch (error) {
      // ...existing error handling code...
    }
  };

  return (
    <div>
      <h1>Register for Ticket</h1>
      <form onSubmit={handleRegistration}>
        {/* ...existing form fields... */}
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TicketRegistration;