import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeftIcon } from 'lucide-react';
import { getPaystackUrlForTicket } from '../utils/paystackUrls';
import { createPaypalOrder } from '../services/paypalService';
import { updatePaymentInformation } from '../services/registrationService';

export const PaymentSelection: React.FC = () => {
  const { ticketType, price, recordId } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bank');

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleProceedToPayment = async () => {
    if (!recordId) {
      alert('Registration information is missing. Please try again.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Update payment method in Airtable
      await updatePaymentInformation(recordId, 'Pending', paymentMethod);
      
      // Get the price as a number
      const priceValue = parseFloat(price?.replace(/[^0-9.]/g, '') || '0');
      
      // Redirect based on selected payment method
      switch (paymentMethod) {
        case 'paystack':
          // Use direct Paystack URL
          const paystackUrl = getPaystackUrlForTicket(ticketType || '');
          if (paystackUrl) {
            window.location.href = paystackUrl;
          } else {
            throw new Error('Payment link not available for this ticket type');
          }
          break;
          
        case 'paypal':
          const email = localStorage.getItem('registration_email') || '';
          const description = `ILSA Conference - ${ticketType} Ticket`;
          const paypalUrl = await createPaypalOrder(priceValue, 'ZAR', description, email);
          window.location.href = paypalUrl;
          break;
          
        default: // bank transfer
          navigate(`/checkout/bank/${encodeURIComponent(ticketType || '')}/${encodeURIComponent(price || '')}`);
      }
    } catch (error: any) {
      console.error('Payment processing error:', error);
      alert(error.message || 'Failed to process payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <button onClick={() => navigate('/tickets')} className="flex items-center text-white/60 hover:text-white mb-8 transition-colors">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Tickets
        </button>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 rounded-xl border border-white/10 p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold mr-2">1</div>
              <div className="h-1 w-12 bg-amber-500/50"></div>
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold mx-2">2</div>
              <div className="h-1 w-12 bg-amber-500/30"></div>
              <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold ml-2">3</div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2 text-center">
              Registration Complete!
            </h1>
            <p className="text-white/70 text-center mb-8">
              Please select your preferred payment method to complete your booking
            </p>
            
            <div className="bg-white/5 rounded-lg p-4 mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60">Selected Ticket</span>
                <span className="text-white font-medium">{ticketType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Price</span>
                <span className="text-amber-400 font-bold">R{price} ZAR</span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <h3 className="text-white mb-3 font-medium">Select Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="bank" 
                    checked={paymentMethod === 'bank'} 
                    onChange={handlePaymentMethodChange}
                    className="w-4 h-4 text-amber-500 focus:ring-amber-500 focus:ring-offset-0"
                  />
                  <span className="text-white">Bank Transfer</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="paystack" 
                    checked={paymentMethod === 'paystack'} 
                    onChange={handlePaymentMethodChange}
                    className="w-4 h-4 text-amber-500 focus:ring-amber-500 focus:ring-offset-0"
                  />
                  <span className="text-white">Pay with Card (Paystack)</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="paypal" 
                    checked={paymentMethod === 'paypal'} 
                    onChange={handlePaymentMethodChange}
                    className="w-4 h-4 text-amber-500 focus:ring-amber-500 focus:ring-offset-0"
                  />
                  <span className="text-white">PayPal</span>
                </label>
              </div>
            </div>
            
            <Button 
              variant="primary" 
              className="w-full" 
              onClick={handleProceedToPayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};