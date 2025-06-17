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
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('Google Sheets webhook URL not configured - skipping sheet update');
    return { success: false, message: 'Google Sheets webhook not configured' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        registrationDate: new Date().toISOString(),
        requiresTransport: data.requiresTransport ? 'Yes' : 'No'
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Sheets API error (${response.status}):`, errorText);
      return { 
        success: false, 
        message: `Google Sheets error: ${response.status} ${response.statusText}` 
      };
    }

    return await response.json();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('Google Sheets request timeout');
      return { success: false, message: 'Google Sheets request timed out' };
    }
    
    console.error('Google Sheets error:', error);
    return { 
      success: false, 
      message: error.message || 'Unknown error occurred while updating Google Sheets'
    };
  }
};



