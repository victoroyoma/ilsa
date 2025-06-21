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
    let recordId;
    try {
      recordId = await submitToAirtable({
        ...data,
        paymentStatus: 'Pending',
        paymentMethod: data.paymentMethod || 'bank'
      });
    } catch (airtableError: any) {
      console.error('Airtable submission failed:', airtableError);
      // If we're in development mode, still continue with a mock ID
      if (import.meta.env.DEV) {
        recordId = `rec${Math.random().toString(36).substring(2, 10)}`;
        console.warn('Development mode: Using mock record ID:', recordId);
      } else {
        throw new Error(airtableError.message || 'Failed to save registration. Please try again.');
      }
    }

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
    try {
      const message = encodeURIComponent(
        `*New ILSA 2025 Registration*\n\n` +
        `Name: ${data.firstName} ${data.lastName}\n` +
        `Email: ${data.email}\n` +
        `Ticket: ${data.ticketType}\n` +
        `Price: ${data.price}`
      );
      
      window.open(`https://wa.me/27636568545?text=${message}`, '_blank');
    } catch (notificationError) {
      // Don't fail if notification fails
      console.error('WhatsApp notification failed:', notificationError);
    }

    return { recordId, reference };
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(error.message || 'Failed to submit registration. Please check your internet connection and try again.');
  }
};

export const updatePaymentInformation = async (recordId: string, status: string): Promise<void> => {
  try {
    await updatePaymentStatus(recordId, status);
  } catch (error: any) {
    console.error('Payment update error:', error);
    throw new Error(error.message || 'Failed to update payment information. Please try again later.');
  }
};
