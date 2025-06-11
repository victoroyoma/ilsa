import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ClipboardIcon, CheckIcon, ArrowLeftIcon, Loader2Icon } from 'lucide-react';

interface PaymentDetails {
  paypal: {
    email: string;
    instructions: string[];
  };
  paystack: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    // swiftCode: string;
    // bankAddress: string;
    instructions: string[];
  };
}


export const Checkout: React.FC = () => {
  const { method, ticketType, price } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);

  const paymentDetails: PaymentDetails = {
    paypal: {
      email: 'taffdsIncPay@gmail.com',
      instructions: [
        'Send the payment to the PayPal email address above',
        'Include your full name and ticket type in the payment note',
        'Take a screenshot of the payment confirmation',
        'Upload the screenshot below to complete your registration'
      ]
    },
    paystack: {
      accountName: 'TAFFD\'s',
      accountNumber: '63111409496',
      bankName: 'First National Bank',
    //   swiftCode: 'FBNINGLA',
    //   bankAddress: '35 Marina, Lagos Island, Lagos, Nigeria',
      instructions: [
        'Use the bank details provided above for your transfer',
        'Include your full name and ticket type as payment reference',
        'Take a screenshot or save the payment confirmation',
        'Upload your proof of payment below to complete registration'
      ]
    }
  };

  const details = method === 'paypal' ? paymentDetails.paypal : paymentDetails.paystack;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should be less than 5MB');
        return;
      }
      setProofFile(file);
    }
  };

  const handleSubmission = async () => {
    if (!proofFile) {
      alert('Please upload your proof of payment');
      return;
    }

    setIsSubmitting(true);
    try {
      // WhatsApp redirect with payment details
      const message = encodeURIComponent(
        `Hello, I'd like to submit my payment proof for ILSA 2025.\n` +
        `Ticket Type: ${ticketType}\n` +
        `Amount: $${price} USD\n` +
        `Payment Method: ${method}\n\n` +
        `I have uploaded my proof of payment and will share it in this chat.`
      );
      
      const whatsappUrl = `https://wa.me/27636568545?text=${message}`;
      window.open(whatsappUrl, '_blank');
      
      // Navigate back to tickets page
      navigate('/tickets');
    } catch (error) {
      alert('Failed to process. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!method || !ticketType || !price || !details) {
    return <div className="w-full min-h-screen pt-24 text-center">
      <p className="text-white">Invalid checkout session</p>
      <Button variant="secondary" onClick={() => navigate('/tickets')}>
        Return to Tickets
      </Button>
    </div>;
  }

  return (
    <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <button 
          onClick={() => navigate('/tickets')} 
          className="flex items-center text-white/60 hover:text-white mb-8 transition-colors"
          disabled={isSubmitting}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Tickets
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 rounded-xl border border-white/10 p-8 mb-8">
            <h1 className="text-2xl font-bold text-white mb-6">Complete Your Payment</h1>

            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60">Ticket Type</span>
                <span className="text-white font-medium">{ticketType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Amount</span>
                <span className="text-amber-400 font-bold">${price} USD</span>
              </div>
            </div>

            {/* Payment Details Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">
                {method === 'paypal' ? 'PayPal Details' : 'Bank Transfer Details'}
              </h2>

              <div className="bg-white/5 rounded-lg p-4 mb-4 space-y-3">
                {method === 'paypal' ? (
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">PayPal Email</span>
                    <button 
                      onClick={() => copyToClipboard((details as PaymentDetails['paypal']).email)}
                      className="flex items-center text-amber-400 hover:text-amber-300"
                    >
                      {(details as PaymentDetails['paypal']).email}
                      {copied ? <CheckIcon className="w-4 h-4 ml-2" /> : <ClipboardIcon className="w-4 h-4 ml-2" />}
                    </button>
                  </div>
                ) : (
                  <>
                    {Object.entries(details).map(([key, value]) => {
                      if (key !== 'instructions' && typeof value === 'string') {
                        return (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-white/60">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <button 
                              onClick={() => copyToClipboard(value)}
                              className="flex items-center text-amber-400 hover:text-amber-300"
                            >
                              {value}
                              {copied ? <CheckIcon className="w-4 h-4 ml-2" /> : <ClipboardIcon className="w-4 h-4 ml-2" />}
                            </button>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-medium">Instructions:</h3>
                <ol className="list-decimal list-inside space-y-2 text-white/70">
                  {details.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Upload Section */}
            <div className="space-y-4">
              <h3 className="text-white font-medium">Upload Payment Proof</h3>
              <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="proof-upload"
                  disabled={isSubmitting}
                />
                <label 
                  htmlFor="proof-upload" 
                  className={`cursor-pointer text-white/60 hover:text-white block ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {proofFile ? (
                    <div className="text-green-400 flex items-center justify-center">
                      <CheckIcon className="w-5 h-5 mr-2" />
                      {proofFile.name}
                    </div>
                  ) : (
                    'Click to upload payment proof (Max 5MB)'
                  )}
                </label>
              </div>

<Button
              variant="primary"
              className="w-full"
              onClick={handleSubmission}
              disabled={!proofFile || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Loader2Icon className="animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                'Submit Payment Proof'
              )}
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};