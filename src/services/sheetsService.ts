import { google } from 'googleapis';

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
  try {
    const sheets = google.sheets({ version: 'v4' });
    const spreadsheetId = process.env.REACT_APP_SHEET_ID;
    
    const values = [
      [
        data.firstName,
        data.lastName,
        data.email,
        data.organization,
        data.jobTitle,
        data.country,
        data.dietaryRequirements,
        data.specialAssistance,
        data.requiresTransport ? 'Yes' : 'No',
        data.ticketType,
        data.price,
        new Date().toISOString()
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:L',
      valueInputOption: 'RAW',
      requestBody: { values }
    });

    return true;
  } catch (error) {
    console.error('Failed to append to sheet:', error);
    throw error;
  }
};
