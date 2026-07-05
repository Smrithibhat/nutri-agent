Netlify environment configuration for NutriAgent

Add the following Environment Variable in your Netlify site settings (Site settings → Build & deploy → Environment):

- Key: VITE_GEMINI_API_KEY
- Value: <your-google-gemini-api-key>

Notes:

- Netlify exposes environment variables at build time for Vite applications when prefixed with `VITE_`.
- After adding the variable, trigger a site redeploy so the build picks up the key.
- Keep this key private — do not commit it to source control.

Local development:

- To test locally, create a `.env` file in the project root with the following line:

  VITE_GEMINI_API_KEY=your_local_test_key

- Restart your dev server after changing `.env`.

Security:

- Use Netlify's environment variable feature or other secret managers to keep keys out of source control.
- Rotate keys regularly and restrict access where possible.
