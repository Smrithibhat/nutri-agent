// Centralized config access for build-time environment variables
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export function isGeminiEnabled() {
  return !!GEMINI_API_KEY;
}
