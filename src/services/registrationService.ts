import { submitToAirtable, updatePaymentStatus } from './airtableService';
import { appendToSheet } from './sheetsService';
import { v4 as uuidv4 } from 'uuid';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
  jobTitle?: string;
  country: string;
  dietaryRequirements?: string;
  specialAssistance?: string;
  requiresTransport: boolean;
  ticketType: string;
  price: string;
  paymentMethod?: string;
}

export const submitRegistration = async (data: RegistrationData) => {
  try {
    // Generate a unique reference for the payment
    const reference = `ILSA-${uuidv4().substring(0, 8)}`;
    
    // Save registration to Airtable
    const recordId = await submitToAirtable({
      ...data,
      paymentStatus: 'Pending',
      paymentMethod: data.paymentMethod || 'bank'
    });

    // Also save registration to Google Sheets if webhook URL is configured
    try {
      await appendToSheet({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        organization: data.organization || '',
        jobTitle: data.jobTitle || '',
        country: data.country,
        dietaryRequirements: data.dietaryRequirements || '',
        specialAssistance: data.specialAssistance || '',
        requiresTransport: data.requiresTransport,
        ticketType: data.ticketType,
        price: data.price
      });
    } catch (sheetsError) {
      // Log but don't fail if Google Sheets submission fails
      console.error('Google Sheets submission failed:', sheetsError);
    }

    // Store in localStorage for later use
    localStorage.setItem('registration_record_id', recordId);
    localStorage.setItem('payment_reference', reference);
    
    // Send WhatsApp notification
    const message = encodeURIComponent(
      `*New ILSA 2025 Registration*\n\n` +
      `Name: ${data.firstName} ${data.lastName}\n` +
      `Email: ${data.email}\n` +
      `Ticket: ${data.ticketType}\n` +
      `Price: ${data.price}`
    );
    
    window.open(`https://wa.me/27636568545?text=${message}`, '_blank');

    return { recordId, reference };
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Failed to submit registration. Please check your internet connection and try again.');
  }
};

export const updatePaymentInformation = async (recordId: string, status: string): Promise<void> => {
  await updatePaymentStatus(recordId, status);
};
