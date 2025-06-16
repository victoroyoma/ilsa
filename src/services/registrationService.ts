import { appendToSheet } from './sheetsService';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  jobTitle: string;
  country: string;
  dietaryRequirements: string;
  specialAssistance: string;
  requiresTransport: boolean;
  ticketType: string;
  price: string;
}

export const submitRegistration = async (data: RegistrationData) => {
  try {
    const result = await appendToSheet(data);

    // Send WhatsApp notification
    const message = encodeURIComponent(
      `*New ILSA 2025 Registration*\n\n` +
      `Name: ${data.firstName} ${data.lastName}\n` +
      `Email: ${data.email}\n` +
      `Ticket: ${data.ticketType}\n` +
      `Price: ${data.price}`
    );
    
    window.open(`https://wa.me/27636568545?text=${message}`, '_blank');

    return result;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
