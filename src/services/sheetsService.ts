import { google } from 'googleapis';

const sheets = google.sheets('v4');
const SPREADSHEET_ID = process.env.REACT_APP_SHEET_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

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

export const appendToSheet = async (data: RegistrationData) => {
  const webhookUrl = process.env.REACT_APP_GOOGLE_SHEETS_WEBHOOK_URL;
  
  if (!webhookUrl) {
    throw new Error('Environment variable REACT_APP_GOOGLE_SHEETS_WEBHOOK_URL is not configured');
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        registrationDate: new Date().toISOString(),
        requiresTransport: data.requiresTransport ? 'Yes' : 'No'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Registration API error:', errorText);
      throw new Error(`Failed to submit registration: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};


