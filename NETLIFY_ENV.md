Netlify environment configuration for NutriAgent

Add the following Environment Variable in your Netlify site settings (Site settings → Build & deploy → Environment):

- Server-side (recommended):
  - Key: `GEMINI_API_KEY` (or `NETLIFY_GEMINI_API_KEY`)
  - Value: <your-google-gemini-api-key>

- Optional client-side indicator (not required when using server proxy):
  - Key: `VITE_GEMINI_API_KEY`
  - Value: any non-empty value (used only to display "Live AI Mode" in the UI)

Notes:

- The project now uses a serverless Netlify Function `/.netlify/functions/gemini-proxy` so the real API key never gets embedded in the browser bundle.
- Add `GEMINI_API_KEY` to Netlify and redeploy — the server function will use it to call Google Gemini.
- If you also set `VITE_GEMINI_API_KEY`, the UI will show the Live AI indicator (this value is embedded into the client at build-time — do NOT use the real secret here if you want to keep it private).

Local development:

- To test the serverless proxy locally with Netlify CLI, create a `.env` file in the project root with:

  GEMINI_API_KEY=your_server_side_key_here
  VITE_GEMINI_API_KEY=1 # optional, for UI indicator

- Start Netlify dev (requires Netlify CLI):

  netlify dev

Security:

- Using the Netlify Function proxy keeps the API key server-side and out of the browser. This is the recommended approach for production.
- Rotate keys regularly and restrict usage in Google Cloud Console.
