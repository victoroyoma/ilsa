import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2Icon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { verifyPayment } from '../services/paystackService';
import { capturePaypalPayment } from '../services/paypalService';
import { updatePaymentInformation } from '../services/registrationService';
import { Button } from '../components/Button';

export const PaymentVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        const method = searchParams.get('method') || 'paystack';
        const recordId = localStorage.getItem('registration_record_id');
        
        if (!recordId) {
          throw new Error('Registration information not found');
        }

        if (method === 'paystack') {
          const reference = searchParams.get('reference');
          if (!reference) {
            throw new Error('Payment reference not found');
          }

          const verificationResult = await verifyPayment(reference);
          
          if (verificationResult.status && verificationResult.data.status === 'success') {
            await updatePaymentInformation(recordId, 'Paid');
            setStatus('success');
            setMessage('Payment successful! Your registration is complete.');
          } else {
            throw new Error(verificationResult.message || 'Payment verification failed');
          }
        } else if (method === 'paypal') {
          const orderId = searchParams.get('token');
          if (!orderId) {
            throw new Error('PayPal order ID not found');
          }

          const captureResult = await capturePaypalPayment(orderId);
          
          if (captureResult.status === 'COMPLETED') {
            await updatePaymentInformation(recordId, 'Paid');
            setStatus('success');
            setMessage('Payment successful! Your registration is complete.');
          } else {
            throw new Error('PayPal payment capture failed');
          }
        }
      } catch (error: any) {
        console.error('Payment verification error:', error);
        setStatus('error');
        setMessage(error.message || 'Payment verification failed');
      }
    };

    verifyTransaction();
  }, [searchParams]);

  return (
    <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 rounded-xl border border-white/10 p-8 text-center">
            {status === 'loading' && (
              <>
                <Loader2Icon className="w-16 h-16 mx-auto animate-spin text-amber-400 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Processing Payment</h2>
              </>
            )}
            
            {status === 'success' && (
              <>
                <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Payment Successful</h2>
              </>
            )}
            
            {status === 'error' && (
              <>
                <XCircleIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Payment Failed</h2>
              </>
            )}
            
            <p className="text-white/70 mb-6">{message}</p>
            
            <Button 
              variant={status === 'error' ? 'secondary' : 'primary'} 
              onClick={() => navigate('/')}
              className="w-full"
            >
              {status === 'error' ? 'Try Again' : 'Return to Home'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
