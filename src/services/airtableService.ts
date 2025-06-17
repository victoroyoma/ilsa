import axios from 'axios';

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Registrations';

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
  paymentStatus?: string;
}

export const submitToAirtable = async (data: RegistrationData): Promise<string> => {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error('Airtable API key or Base ID not configured');
  }

  try {
    const response = await axios({
      method: 'POST',
      url: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        fields: {
          'First Name': data.firstName,
          'Last Name': data.lastName,
          'Email': data.email,
          'Organization': data.organization || '',
          'Job Title': data.jobTitle || '',
          'Country': data.country,
          'Dietary Requirements': data.dietaryRequirements || '',
          'Special Assistance': data.specialAssistance || '',
          'Requires Transport': data.requiresTransport,
          'Ticket Type': data.ticketType,
          'Price': data.price,
          'Payment Method': data.paymentMethod || '',
          'Payment Status': data.paymentStatus || 'Pending'
        }
      }
    });

    return response.data.id;
  } catch (error) {
    console.error('Airtable submission error:', error);
    throw new Error('Failed to submit registration data to Airtable');
  }
};

export const updatePaymentStatus = async (recordId: string, status: string): Promise<void> => {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error('Airtable API key or Base ID not configured');
  }

  try {
    await axios({
      method: 'PATCH',
      url: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`,
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        fields: {
          'Payment Status': status
        }
      }
    });
  } catch (error) {
    console.error('Failed to update payment status:', error);
    throw new Error('Failed to update payment status in Airtable');
  }
};
