# ILSA Conference Website

## Environment Setup

This application requires specific environment variables to function properly. Please follow these steps:

1. Ensure you have a `.env` file in the root directory with the following variables:
   ```
   VITE_AIRTABLE_API_KEY=your_airtable_api_key_here
   VITE_AIRTABLE_BASE_ID=your_airtable_base_id_here
   VITE_AIRTABLE_TABLE_NAME=Registrations
   ```

2. Replace `your_airtable_api_key_here` with your actual Airtable API key
3. Replace `your_airtable_base_id_here` with your actual Airtable Base ID

## Where to find Airtable credentials

1. **API Key**: 
   - Log in to your Airtable account
   - Go to Account > API
   - Your API key will be displayed or you can generate a new one

2. **Base ID**:
   - Open your Airtable base
   - Look at the URL, it will be in this format: `https://airtable.com/BASEID/...`
   - The Base ID is the part that says "BASEID" in the URL

## Development

After setting up your environment variables, you can run the project:

```bash
npm install
npm run dev
```

## Note

If you're running in development mode, the application will use mock data if Airtable credentials are not properly configured. This allows for testing without actual API access.
