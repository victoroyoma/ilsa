import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeftIcon } from 'lucide-react';
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the registration data to your backend
    // For now, we'll just proceed to payment
    navigate(`/payment/${ticketType}/${price}`);
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
                <select id="country" name="country" value={formData.country} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-amber-500" required>
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
                <input type="text" id="dietaryRequirements" name="dietaryRequirements" value={formData.dietaryRequirements} onChange={handleChange} placeholder="e.g., Vegetarian, Halal, etc." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500" />
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
                    I require airport transfer services
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
                disabled={!isFormValid()}
                onClick={() => navigate(`/checkout/${ticketType}/${price}`)}
              >
                Proceed to Payment
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>;
};