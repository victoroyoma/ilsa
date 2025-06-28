import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeftIcon, CreditCardIcon } from 'lucide-react';
import { submitRegistration } from '../services/registrationService';
import { getPaystackUrlForTicket } from '../utils/paystackUrls';

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  jobTitle: string;
  country: string;
  dietaryRequirements: string;
  specialAssistance: string;
  requiresTransport: boolean;
}

interface PaymentOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ icon, title, description, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-6 text-left w-full transition-all duration-300 hover:scale-105"
  >
    <div className="flex items-start">
      <div className="mr-4 text-amber-400">{icon}</div>
      <div>
        <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
    </div>
  </button>
);

export const Registration: React.FC = () => {
  const {
    ticketType,
    price
  } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationForm>({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    jobTitle: '',
    country: '',
    dietaryRequirements: '',
    specialAssistance: '',
    requiresTransport: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    
    try {
      // Submit registration data to Airtable
      const { recordId } = await submitRegistration({
        ...formData,
        ticketType: ticketType || '',
        price: price || ''
      });

      // Store recordId in localStorage for payment verification
      localStorage.setItem('registration_record_id', recordId);
      localStorage.setItem('registration_email', formData.email);
      
      // After successful registration, show payment options modal
      setShowPaymentOptions(true);
      setIsSubmitting(false);
      
    } catch (error: any) {
      console.error('Registration failed:', error);
      alert(error.message || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handlePaystackPayment = async () => {
    try {
      const paystackUrl = getPaystackUrlForTicket(ticketType || '');
      if (paystackUrl) {
        // Store relevant information for tracking
        localStorage.setItem('payment_ticket_type', ticketType || '');
        localStorage.setItem('payment_amount', price || '');
        
        // Redirect directly to Paystack URL
        window.location.href = paystackUrl;
      } else {
        throw new Error('Payment link not available for this ticket type');
      }
    } catch (error: any) {
      console.error('Payment initialization failed:', error);
      alert(error.message || 'Failed to initialize payment. Please try again.');
    }
  };

  const handleEFTPayment = async () => {
    try {
      // Store payment information for EFT processing
      localStorage.setItem('payment_ticket_type', ticketType || '');
      localStorage.setItem('payment_amount', price || '');
      localStorage.setItem('payment_method', 'eft');
      
      // Navigate to EFT instructions page
      const recordId = localStorage.getItem('registration_record_id');
      if (recordId) {
        navigate(`/eft-instructions/${encodeURIComponent(ticketType || '')}/${encodeURIComponent(price || '')}`);
      } else {
        throw new Error('Registration information not found');
      }
    } catch (error: any) {
      console.error('EFT payment initialization failed:', error);
      alert(error.message || 'Failed to initialize EFT payment. Please try again.');
    }
  };

  const isFormValid = () => {
    return formData.firstName && formData.lastName && formData.email && formData.country;
  };

  return <div className="w-full min-h-screen pt-24">
    <div className="container mx-auto px-4 md:px-8 py-12">
      <button onClick={() => navigate('/tickets')} className="flex items-center text-white/60 hover:text-white mb-8 transition-colors">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Tickets
      </button>
      
      {!showPaymentOptions ? (
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 rounded-xl border border-white/10 p-8">
            <h1 className="text-2xl font-bold text-white mb-6">
              Secure Your Place
            </h1>
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2" htmlFor="firstName">
                    First Name *
                  </label>
                  <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500" required />
                </div>
                <div>
                  <label className="block text-white mb-2" htmlFor="lastName">
                    Last Name *
                  </label>
                  <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500" required />
                </div>
              </div>
              <div>
                <label className="block text-white mb-2" htmlFor="email">
                  Email Address *
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500" required />
              </div>
              <div>
                <label className="block text-white mb-2" htmlFor="organization">
                  Organization
                </label>
                <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-white mb-2" htmlFor="jobTitle">
                  Job Title
                </label>
                <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-white mb-2" htmlFor="country">
                  Country *
                </label>
                <select id="country" name="country" value={formData.country} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500" required>
                  <option value="">Select your country</option>
                  <option value="ZA">South Africa</option>
                  <option value="NG">Nigeria</option>
                  <option value="KE">Kenya</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="IN">India</option>
                  <option value="CN">China</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="BR">Brazil</option>
                  <option value="RU">Russia</option>
                  <option value="ETH">Ethiopia</option>
                  <option value="EG">Egypt</option>
                  <option value="RW">Ruwanda</option>
                  <option value="TZ">Tanzania</option>
                  <option value="UG">Uganda</option>
                  <option value="BR">Brazil</option>
                  <option value="MX">Mexico</option>
                  <option value="AR">Argentina</option>
                  <option value="ES">Spain</option>
                  <option value="IT">Italy</option>
                  <option value="NL">Netherlands</option>
                  <option value="SE">Sweden</option>
                  <option value="NO">Norway</option>
                  <option value="FI">Finland</option>
                  <option value="DK">Denmark</option>
                  <option value="PL">Poland</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-white mb-2" htmlFor="dietaryRequirements">
                  Dietary Requirements
                </label>
                <input type="text" id="dietaryRequirements" name="dietaryRequirements" value={formData.dietaryRequirements} onChange={handleChange} placeholder="e.g., Vegetarian, Halaal, etc." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-white mb-2" htmlFor="specialAssistance">
                  Special Assistance
                </label>
                <textarea id="specialAssistance" name="specialAssistance" value={formData.specialAssistance} onChange={handleChange} placeholder="Let us know if you need any special assistance" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 h-24" />
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" name="requiresTransport" checked={formData.requiresTransport} onChange={handleChange} className="w-4 h-4 rounded border-white/10 bg-white/5 text-amber-500 focus:ring-amber-500 focus:ring-offset-0" />
                  <span className="text-white">
                    I require transport to the event
                  </span>
                </label>
                {formData.requiresTransport && <p className="mt-2 text-sm text-white/60">
                    Our team will contact you with transport arrangements closer
                    to the event.
                  </p>}
              </div>
              
              <Button 
                variant="primary" 
                className="w-full" 
                type="submit" 
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Register Now'}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 rounded-xl border border-white/10 p-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Registration Complete!
            </h1>
            <p className="text-white/70 mb-6">Please select your preferred payment method to complete your purchase.</p>
            
            <div className="space-y-4 mb-8">
              <PaymentOption 
                icon={<CreditCardIcon className="w-6 h-6" />}
                title="Pay with Card (Paystack)"
                description="Fast and secure card payment. International cards accepted."
                onClick={handlePaystackPayment}
              />
              
              <PaymentOption 
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M2 4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4zm1 2h18V5H3v1zm18 4H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1zm-1 4H4v-2h16v2zm-9-7v2H9V7h2zm6 0v2h-2V7h2zm3 8v2h-2v-2h2zm-6 0v2H9v-2h2z"/>
                </svg>}
                title="Electronic Fund Transfer (EFT)"
                description="Direct bank transfer via EFT. Fast and secure."
                onClick={handleEFTPayment}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  </div>;
};