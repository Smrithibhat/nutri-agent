/**
 * Google Gemini 1.5 Flash API Service Layer for NutriAgent
 */

import { GEMINI_API_KEY } from '../config';

// Read API Key from centralized config
const getApiKey = () => GEMINI_API_KEY || '';

// Helper to make POST request to Gemini
async function callGeminiAPI(prompt, isJsonMode = false) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Gemini API Key is not set in environment variables.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  if (isJsonMode) {
    requestBody.generationConfig = {
      responseMimeType: "application/json"
    };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error?.message || `HTTP error! status: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!textOutput) {
    throw new Error("Empty response received from Gemini API");
  }

  return textOutput;
}

/**
 * Checks if the Gemini API Key is configured in the environment
 */
export function isGeminiConfigured() {
  return !!getApiKey();
}

/**
 * Generates a fully custom 7-day meal plan based on user profile and budget
 */
export async function generateLiveMealPlan(profile) {
  const systemPrompt = `You are a world-class AI Smart Nutrition Agent named NutriAgent. Your job is to create a highly detailed, 7-day meal plan (Monday to Sunday) that matches the user's budget, dietary needs, calories, and macronutrient targets.

User Profile:
- Name: ${profile.name}
- Target Daily Calories: ${profile.calories} kcal
- Target Daily Protein: ${profile.protein}g
- Target Daily Carbohydrates: ${profile.carbs}g
- Target Daily Fats: ${profile.fats}g
- Daily Budget: $${profile.budget} (Sum of all meals in a single day MUST be less than or equal to this daily budget!)
- Dietary Restrictions: ${profile.diets.length > 0 ? profile.diets.join(', ') : 'None'}
- Health Focus: ${profile.goal}

Instructions:
1. Create a 7-day meal plan (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday).
2. For each day, provide exactly 4 meals: Breakfast, Lunch, Dinner, Snack.
3. The sum of costs of all 4 meals in a day must be <= $${profile.budget}. Be extremely realistic about food pricing (e.g. oats, bananas, eggs, canned tuna, and beans are cheap; fresh organic berries, salmon, steaks, and avocados are expensive).
4. The daily total calories should be close to ${profile.calories} kcal (+/- 10%), and macros (Protein, Carbs, Fats) should reflect their health focus.
5. If there is an expensive ingredient in a recipe, set "isExpensive" to true for that ingredient.
6. To enable our "Swap & Save" feature, if an ingredient is expensive and matches one of these categories, supply the exact "swapId" string:
   - "salmon" (for fresh salmon/trout)
   - "avocado" (for fresh avocados)
   - "berries" (for fresh organic berries)
   - "steak" (for ribeye/sirloin/expensive beef)
   - "asparagus" (for fresh asparagus)
   - "nuts" (for premium almonds/pecans/pine nuts)
   - "almondbutter" (for premium almond butter)
7. Ensure all recipes align with their dietary restrictions (e.g. if Vegetarian, no beef/chicken/fish; if Vegan, no eggs/dairy/honey; if Keto, very low carbs).

You MUST respond with a valid JSON object matching the following structure:
{
  "Monday": [
    {
      "id": "g-mon-1",
      "name": "Meal Name",
      "category": "Breakfast",
      "description": "Short description of the meal.",
      "prepTime": "10 mins",
      "calories": 350,
      "protein": 12,
      "carbs": 50,
      "fats": 8,
      "diets": ["Vegetarian", "Gluten-Free"],
      "cost": 1.25,
      "ingredients": [
        { "name": "Rolled Oats", "amount": "1/2 cup", "price": 0.15, "isExpensive": false },
        { "name": "Fresh Berries", "amount": "1/4 cup", "price": 1.10, "isExpensive": true, "swapId": "berries" }
      ],
      "instructions": [
        "Boil oats in water.",
        "Top with fresh berries."
      ]
    },
    ...
  ],
  "Tuesday": [ ... ],
  ...
}

Generate only the JSON object. Do not wrap in markdown backticks.`;

  const responseText = await callGeminiAPI(systemPrompt, true);
  
  // Clean up code block wrappers if any remain despite JSON config
  let jsonString = responseText.trim();
  if (jsonString.startsWith("```json")) {
    jsonString = jsonString.substring(7);
  }
  if (jsonString.startsWith("```")) {
    jsonString = jsonString.substring(3);
  }
  if (jsonString.endsWith("```")) {
    jsonString = jsonString.substring(0, jsonString.length - 3);
  }
  jsonString = jsonString.trim();

  return JSON.parse(jsonString);
}

/**
 * Generates an intelligent, contextual chatbot response using the Gemini API
 */
export async function generateLiveChatResponse(query, history, profile) {
  const formattedHistory = history.map(h => `${h.sender === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n');
  
  const systemPrompt = `You are a helpful, professional, and friendly AI Smart Nutrition Agent named NutriAgent. You specialize in meal planning, budget hacking, allergen substitutions, and custom recipes.

User Context:
- Name: ${profile.name}
- Daily Budget: $${profile.budget}
- Dietary Restrictions: ${profile.diets.length > 0 ? profile.diets.join(', ') : 'None'}
- Goal: ${profile.goal}
- Targets: ${profile.calories} kcal, ${profile.protein}g Protein, ${profile.carbs}g Carbs, ${profile.fats}g Fats

Guidelines:
1. Respond to the user's latest query while taking their profile context and history into account.
2. If they ask about budget tips, emphasize freezing veggies, buying in bulk, or using canned fish/legumes.
3. If they ask for ingredient substitutions (allergies, cost, or availability), provide realistic alternatives with estimated price points.
4. Keep your response concise, well-structured, and styled in clear markdown. Use bullet points and bold titles.
5. Do not write extremely long paragraphs. Make it easily scannable in a chat window.

Conversation History:
${formattedHistory}

User Query: "${query}"

Assistant Response:`;

  return await callGeminiAPI(systemPrompt, false);
}
