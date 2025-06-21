import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { updatePaymentInformation } from '../services/registrationService';
import { getPaystackUrlForTicket } from '../utils/paystackUrls';
import { createPaypalOrder } from '../services/paypalService';

export const PaymentSelection: React.FC = () => {
  const { ticketType, price, recordId } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>('bank');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!recordId || !ticketType || !price) {
    navigate('/tickets');
    return null;
  }

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Update payment method in Airtable
      await updatePaymentInformation(recordId, 'Pending', paymentMethod);
      
      // Proceed to payment based on selected method
      const priceValue = parseFloat(price?.replace(/[^0-9.]/g, '') || '0');
      
      switch (paymentMethod) {
        case 'paystack':
          // Use direct Paystack URL
          const paystackUrl = getPaystackUrlForTicket(ticketType);
          if (paystackUrl) {
            window.location.href = paystackUrl;
          } else {
            throw new Error('Payment link not available for this ticket type');
          }
          break;
            case 'paypal':
          const description = `ILSA Conference - ${ticketType} Ticket`;
          // We need email for PayPal, but we don't have it here
          // Let's use a temporary solution by getting from localStorage
          const email = localStorage.getItem('registration_email') || '';
          const paypalUrl = await createPaypalOrder(priceValue, 'ZAR', description, email);
          window.location.href = paypalUrl;
          break;
          
        default: // bank transfer
          navigate(`/checkout/bank/${encodeURIComponent(ticketType)}/${encodeURIComponent(price)}`);
      }
    } catch (error: any) {
      console.error('Payment processing failed:', error);
      alert(error.message || 'Payment processing failed. Please try again.');
    } finally {
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
            <div className="flex items-center justify-center mb-8 text-center">
              <CheckCircleIcon className="w-12 h-12 text-green-500 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Registration Complete
                </h1>
                <p className="text-white/70 mt-2">
                  Please select your preferred payment method to complete your booking
                </p>
              </div>
            </div>
            
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
            
            {/* Payment Method Selection */}
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