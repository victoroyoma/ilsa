import axios from 'axios';

// Get environment variables or fallback to mock for development
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY || 'keyTest123456789';
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID || 'appTest123456789';
const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Registrations';

// Map payment method values to ones accepted by Airtable
const mapPaymentMethod = (method: string): string => {
  // Convert to appropriate case and format for Airtable
  switch(method.toLowerCase()) {
    case 'paystack':
      return 'Card Payment';
    case 'paypal':
      return 'PayPal';
    case 'bank':
    default:
      return 'Bank Transfer';
  }
};

// Convert boolean to "Yes"/"No" for Airtable
const formatBoolean = (value: boolean): string => {
  return value ? 'Yes' : 'No';
};

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
  // Check if we're in a development environment
  const isDevelopment = import.meta.env.DEV;
  
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error('Missing Airtable configuration');
    
    // In development mode, return a mock ID
    if (isDevelopment) {
      console.warn('Development mode: Using mock Airtable response');
      return `rec${Math.random().toString(36).substring(2, 10)}`;
    }
    
    throw new Error('Airtable API key or Base ID not configured. Please contact support.');
  }

  try {
    const response = await axios({
      method: 'POST',
      url: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },      data: {        fields: {
          'First Name': data.firstName,
          'Last Name': data.lastName,
          'Email': data.email,
          'Organization': data.organization || '',
          'Job Title': data.jobTitle || '',
          'Country/Region': data.country,
          'Dietary Requirements': data.dietaryRequirements || '',
          'Special Assistance': data.specialAssistance || '',
          'Requires Transport': formatBoolean(data.requiresTransport),
          'Ticket Type': data.ticketType,
          'Price': data.price
          // Payment fields removed from initial registration
        }
      },
      timeout: 10000 // 10 second timeout
    });

    return response.data.id;
  } catch (error: any) {
    console.error('Airtable submission error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Connection to Airtable timed out. Please try again later.');
    }
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Airtable error response:', error.response.data);
      throw new Error(`Airtable error: ${error.response.status} - ${error.response.data.error?.message || 'Unknown error'}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from Airtable. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Failed to submit registration: ${error.message}`);
    }
  }
};

export const updatePaymentStatus = async (recordId: string, status: string, paymentMethod?: string): Promise<void> => {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error('Airtable API key or Base ID not configured');
  }

  try {
    const fields: Record<string, string> = {
      'Payment Status': status
    };
    
    // Add payment method if provided
    if (paymentMethod) {
      fields['Payment Method'] = mapPaymentMethod(paymentMethod);
    }
    
    await axios({
      method: 'PATCH',
      url: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`,
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        fields: fields
      },
      timeout: 10000 // 10 second timeout
    });
  } catch (error: any) {
    console.error('Failed to update payment status:', error);
    if (error.response) {
      throw new Error(`Failed to update payment status: ${error.response.status} - ${error.response.data.error?.message || 'Unknown error'}`);
    } else if (error.request) {
      throw new Error('No response received from Airtable. Please check your internet connection.');
    } else {
      throw new Error(`Failed to update payment status: ${error.message}`);
    }
  }
};
