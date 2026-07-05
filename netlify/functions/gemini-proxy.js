/* eslint-disable */
// Netlify Function: gemini-proxy
// Acts as a server-side proxy to call Google Gemini API using a server-only API key.
// Exposes a GET /?ping=1 endpoint to check if a key is configured, and a POST endpoint
// that accepts { prompt, isJsonMode } and returns { text }.

const fetch = globalThis.fetch || require('node-fetch');

exports.handler = async function (event, context) {
  try {
    // Ping endpoint to check if server key exists
    if (event.httpMethod === 'GET') {
      const qs = event.queryStringParameters || {};
      if (qs.ping) {
        const configured = !!(process.env.GEMINI_API_KEY || process.env.NETLIFY_GEMINI_API_KEY);
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enabled: configured })
        };
      }
      return { statusCode: 400, body: 'Missing ping=1' };
    }

    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const { prompt, isJsonMode } = body;
    if (!prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing prompt' }) };
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NETLIFY_GEMINI_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Gemini API key not configured on server' }) };
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        { parts: [{ text: prompt }] }
      ]
    };

    if (isJsonMode) {
      requestBody.generationConfig = { responseMimeType: 'application/json' };
    }

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      const message = data.error?.message || `HTTP ${resp.status}`;
      return { statusCode: resp.status || 500, body: JSON.stringify({ error: message }) };
    }

    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Empty response from Gemini' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: textOutput })
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
