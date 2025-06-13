import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PaymentModal } from './PaymentModal';

export const PaymentModalPage: React.FC = () => {
  const { ticketType, price } = useParams();
  const navigate = useNavigate();

  if (!ticketType || !price) {
    navigate('/tickets');
    return null;
  }

  return (
    <PaymentModal
      isOpen={true}
      onClose={() => navigate('/tickets')}
      ticketType={ticketType}
      price={price}
    />
  );
};
