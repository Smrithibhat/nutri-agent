import { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  RefreshCw, 
  MessageSquare, 
  UserSquare2, 
  Apple, 
  Sparkles, 
  Bot
} from 'lucide-react';

import { RECIPES, BUDGET_SWAPS, DEFAULT_CHAT_HISTORY } from './data/mockData';
import { generateLiveMealPlan } from './services/geminiService';
import { isGeminiEnabled } from './config';
import Dashboard from './components/Dashboard';
import MealPlanner from './components/MealPlanner';
import SwapSave from './components/SwapSave';
import NutritionAgent from './components/NutritionAgent';
import UserProfile from './components/UserProfile';

// Initial default meal plan template
const INITIAL_PLAN = {
  Monday: ['r2', 'r6', 'r11', 'r17'],     
  Tuesday: ['r4', 'r9', 'r15', 'r20'],    
  Wednesday: ['r1', 'r8', 'r13', 'r19'],   
  Thursday: ['r2', 'r7', 'r16', 'r17'],   
  Friday: ['r4', 'r6', 'r12', 'r20'],     
  Saturday: ['r1', 'r10', 'r11', 'r19'],  
  Sunday: ['r2', 'r8', 'r13', 'r21']      
};

const LOADER_TIPS = [
  "Frozen green beans and canned mackerel can reduce your week's grocery bill by up to $25!",
  "Buying oats, lentils, and brown rice in bulk is the easiest way to hit complex carbohydrate targets cheaply.",
  "Replacing premium ribeye steak with extra firm tofu and eggs keeps protein high while cutting costs by 70%.",
  "Thawing frozen mixed berries locks in vitamins and creates a natural syrup at a fraction of the cost of fresh berries.",
  "Peanuts have higher protein content (26g/100g) than almonds or walnuts and cost 80% less."
];

// Helper to get current weekday name (e.g., Monday)
const getCurrentDayName = () => new Date().toLocaleDateString('en-US', { weekday: 'long' });

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [plannerDayTab, setPlannerDayTab] = useState(getCurrentDayName());
  
  // User Profile
  const [profile, setProfile] = useState({
    name: 'Smruthi',
    budget: 15.00,
    goal: 'Balanced Diet',
    calories: 2000,
    protein: 100,
    carbs: 250,
    fats: 65,
    diets: []
  });

  // Check if AI is active based on environment variable (injected privately by Netlify)
  const isAiActive = isGeminiEnabled();

  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [planGenerationStep, setPlanGenerationStep] = useState(1);
  const [currentLoaderTip, setCurrentLoaderTip] = useState(LOADER_TIPS[0]);

  // Chat History
  const [chatHistory, setChatHistory] = useState(DEFAULT_CHAT_HISTORY);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Build recipe references
  const getRecipeById = (id) => RECIPES.find(r => r.id === id);

  // Initialize meal plan and logged meals (lazy initialization)
  const initialMealPlan = (() => {
    const initializedPlan = {};
    Object.entries(INITIAL_PLAN).forEach(([day, recipeIds]) => {
      initializedPlan[day] = recipeIds.map(id => getRecipeById(id));
    });
    return initializedPlan;
  })();

  const [mealPlan, setMealPlan] = useState(initialMealPlan);
  const [savedAmount, setSavedAmount] = useState(0);
  const [optimizeBudgetToggle, setOptimizeBudgetToggle] = useState(false);

  // Daily Logger State
  const [waterIntake, setWaterIntake] = useState(0);
  const [loggedMeals, setLoggedMeals] = useState(() => {
    const today = initialMealPlan[getCurrentDayName()] || [];
    return [today[0], today[2]].filter(Boolean);
  });

  // Helper: Sifts local dataset to return a customized plan dynamically
  const generateLocalDynamicPlan = (userProfile) => {
    const selectedDiets = userProfile.diets;
    const targets = {
      Breakfast: RECIPES.filter(r => r.category === 'Breakfast'),
      Lunch: RECIPES.filter(r => r.category === 'Lunch'),
      Dinner: RECIPES.filter(r => r.category === 'Dinner'),
      Snack: RECIPES.filter(r => r.category === 'Snack')
    };

    const updatedPlan = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    days.forEach(day => {
      updatedPlan[day] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(category => {
        const pool = targets[category];
        // Filter pool by dietary restrictions
        let matching = pool.filter(recipe => 
          selectedDiets.every(diet => recipe.diets.includes(diet))
        );

        // Fallback to full pool if no recipes match all criteria
        if (matching.length === 0) {
          matching = pool;
        }

        // Return a random recipe from matching pool to simulate AI generation variety
        const randomIndex = Math.floor(Math.random() * matching.length);
        return matching[randomIndex];
      });
    });

    return updatedPlan;
  };

  // Triggered when saving dietary profile options (used to filter dynamic layouts)
  const applyDietaryRestrictions = (selectedDiets) => {
    if (!mealPlan || Object.keys(mealPlan).length === 0) return;

    const updatedPlan = {};
    let changesMade = false;

    Object.entries(mealPlan).forEach(([day, dayMeals]) => {
      updatedPlan[day] = dayMeals.map(meal => {
        const matchesDiet = selectedDiets.every(diet => meal.diets.includes(diet));
        if (matchesDiet) return meal;

        const fallback = RECIPES.find(r => 
          r.category === meal.category && 
          selectedDiets.every(diet => r.diets.includes(diet))
        );

        if (fallback) {
          changesMade = true;
          return fallback;
        }
        return meal;
      });
    });

    if (changesMade) {
      setMealPlan(updatedPlan);
      showToast("Meal plan updated to match your new dietary settings!");
    }
  };

  // Toggle budget optimizer: apply or revert swaps immediately
  const toggleOptimizeBudget = () => {
    const newToggle = !optimizeBudgetToggle;
    setOptimizeBudgetToggle(newToggle);

    setMealPlan(prevPlan => {
      if (!prevPlan || Object.keys(prevPlan).length === 0) return prevPlan;

      const updatedPlan = {};
      let totalSaved = 0;

      Object.entries(prevPlan).forEach(([day, dayMeals]) => {
        updatedPlan[day] = dayMeals.map(meal => {
          if (newToggle) {
            const swap = BUDGET_SWAPS.find(s => Object.keys(s.recipesToSwap).includes(meal.id));
            if (swap) {
              const alternativeId = swap.recipesToSwap[meal.id];
              const alternative = getRecipeById(alternativeId);
              if (alternative) {
                totalSaved += swap.savings;
                return alternative;
              }
            }
          } else {
            const swap = BUDGET_SWAPS.find(s => Object.values(s.recipesToSwap).includes(meal.id));
            if (swap) {
              const expensiveId = Object.keys(swap.recipesToSwap).find(key => swap.recipesToSwap[key] === meal.id);
              const expensive = getRecipeById(expensiveId);
              if (expensive) return expensive;
            }
          }
          return meal;
        });
      });

      setSavedAmount(newToggle ? totalSaved / 7 : 0);
      if (newToggle) showToast(`Budget Optimizer Active! Weekly cost slashed by $${totalSaved.toFixed(2)}.`);
      else showToast('Budget Optimizer disabled. Restored original plan.');

      return updatedPlan;
    });
  };

  // Swap recipe on a specific day
  const handleRecipeSwap = (day, oldRecipeId, newRecipeId, savings) => {
    setMealPlan(prev => {
      const dayMeals = prev[day] || [];
      const updated = dayMeals.map(meal => {
        if (meal.id === oldRecipeId) {
          const replacement = getRecipeById(newRecipeId);
          showToast(`Swapped: ${meal.name} ➡️ ${replacement.name}. Saved $${savings.toFixed(2)}!`);
          return replacement;
        }
        return meal;
      });
      return { ...prev, [day]: updated };
    });

    setSavedAmount(prev => prev + savings);
  };

  // Toggle meal logging on checklist
  const handleToggleLoggedMeal = (meal) => {
    setLoggedMeals(prev => {
      const exists = prev.some(m => m.id === meal.id);
      if (exists) {
        return prev.filter(m => m.id !== meal.id);
      } else {
        return [...prev, meal];
      }
    });
  };

  const handleProfileSave = () => {
    applyDietaryRestrictions(profile.diets);
    showToast("Profile settings saved successfully!");
  };

  // Generate dynamic 7-day meal plan
  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    setPlanGenerationStep(1);
    setCurrentLoaderTip(LOADER_TIPS[Math.floor(Math.random() * LOADER_TIPS.length)]);

    // Progress bar animations
    const step2Timer = setTimeout(() => setPlanGenerationStep(2), 1500);
    const step3Timer = setTimeout(() => setPlanGenerationStep(3), 3200);

    try {
      if (isAiActive) {
        // Live Gemini Generation (using private VITE_GEMINI_API_KEY environment variable)
        const livePlan = await generateLiveMealPlan(profile);
        clearTimeout(step2Timer);
        clearTimeout(step3Timer);
        setPlanGenerationStep(4);
        setMealPlan(livePlan);
        // Reset logged meals to first and third meal of Monday
        setLoggedMeals(() => {
          const monday = livePlan['Monday'] || [];
          return [monday[0], monday[2]].filter(Boolean);
        });
        showToast("Gemini AI generated a customized meal plan successfully!");
      } else {
        // Local Dynamic compilation Fallback (Simulates AI with local database filtering)
        await new Promise(resolve => setTimeout(resolve, 3800)); // Maintain loaders for aesthetic impact
        clearTimeout(step2Timer);
        clearTimeout(step3Timer);
        setPlanGenerationStep(4);
        const compiledPlan = generateLocalDynamicPlan(profile);
        setMealPlan(compiledPlan);
        setLoggedMeals(() => {
          const monday = compiledPlan['Monday'] || [];
          return [monday[0], monday[2]].filter(Boolean);
        });
        showToast("Dynamic meal plan compiled successfully!");
      }

      setOptimizeBudgetToggle(false); 
      setSavedAmount(0);
      
      setTimeout(() => {
        setIsGeneratingPlan(false);
      }, 500);

    } catch (error) {
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      setIsGeneratingPlan(false);
      showToast(`Generation failed: ${error.message}`, "error");
      console.error(error);
    }
  };

  const renderActiveView = () => {
    switch(activeTab) {
      case 'Dashboard':
        return (
          <Dashboard 
            profile={profile} 
            mealPlan={mealPlan}
            waterIntake={waterIntake}
            setWaterIntake={setWaterIntake}
            loggedMeals={loggedMeals}
            toggleLoggedMeal={handleToggleLoggedMeal}
            savedAmount={savedAmount}
          />
        );
      case 'Meal Planner':
        return (
          <MealPlanner 
            mealPlan={mealPlan} 
            onRecipeSwap={handleRecipeSwap}
            budgetSwaps={BUDGET_SWAPS}
            activeTab={plannerDayTab}
            setActiveTab={setPlannerDayTab}
            optimizeBudgetToggle={optimizeBudgetToggle}
            toggleOptimizeBudget={toggleOptimizeBudget}
          />
        );
      case 'Swap & Save':
        return (
          <SwapSave 
            mealPlan={mealPlan} 
            budgetSwaps={BUDGET_SWAPS}
            onRecipeSwap={handleRecipeSwap}
            allRecipes={RECIPES}
          />
        );
      case 'Nutrition Agent':
        return (
          <NutritionAgent 
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            profile={profile}
          />
        );
      case 'Profile':
        return (
          <UserProfile 
            profile={profile}
            setProfile={setProfile}
            onSave={handleProfileSave}
            onGeneratePlan={handleGeneratePlan}
            isGeneratingPlan={isGeneratingPlan}
            isAiActive={isAiActive}
          />
        );
      default:
        return <div>View not found</div>;
    }
  };

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Meal Planner', icon: CalendarDays },
    { name: 'Swap & Save', icon: RefreshCw },
    { name: 'Nutrition Agent', icon: MessageSquare },
    { name: 'Profile', icon: UserSquare2 }
  ];

  return (
    <div className="app-container">
      {/* Sidebar navigation */}
      <aside className="sidebar">
        <div className="logo-container">
          <Apple className="logo-icon" size={28} />
          <span className="logo-text">NutriAgent</span>
        </div>

        <nav>
          <ul className="nav-links">
            {navigation.map(item => {
              const Icon = item.icon;
              return (
                <li key={item.name} className={`nav-item ${activeTab === item.name ? 'active' : ''}`}>
                  <button onClick={() => setActiveTab(item.name)}>
                    <Icon size={20} />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-snippet">
            <div className="user-avatar">
              {profile.name.charAt(0)}
            </div>
            <div className="user-info">
              <span className="user-name">{profile.name}</span>
              <span className="user-budget-label">Limit: ${profile.budget.toFixed(2)}/day</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content viewport */}
      <main className="main-content">
        <header className="view-header">
          <div className="view-title">
            <h1>
              {activeTab}
              {isAiActive && activeTab === 'Nutrition Agent' && (
                <span style={{ fontSize: '0.85rem', verticalAlign: 'middle', background: 'var(--primary-glow)', color: 'var(--primary-light)', border: '1px solid var(--border-primary)', padding: '0.15rem 0.5rem', borderRadius: '4px', marginLeft: '0.75rem' }}>
                  Live AI Mode
                </span>
              )}
            </h1>
            <p className="view-subtitle">
              {activeTab === 'Dashboard' && `Welcome back, ${profile.name}! Track your metrics and log water.`}
              {activeTab === 'Meal Planner' && "Browse your weekly meal plan calendar, check ingredients and view recipe cards."}
              {activeTab === 'Swap & Save' && "Substitute expensive ingredients for cheap equivalents with matching macros."}
              {activeTab === 'Nutrition Agent' && "Consult your personal agent about recipes, allergens, and kitchen hacks."}
              {activeTab === 'Profile' && "Adjust calories, targets, budgets, and allergy limitations."}
            </p>
          </div>
        </header>

        {renderActiveView()}
      </main>

      {/* Full screen generative loader overlay */}
      {isGeneratingPlan && (
        <div className="loader-overlay">
          <div className="loader-card glass-panel animate-slide-up">
            <div className="loader-glow-circle">
              <Bot size={38} style={{ color: 'var(--primary-light)' }} />
            </div>
            <h2 className="loader-title">{isAiActive ? "Generating AI Meal Plan" : "Compiling Dynamic Menu"}</h2>
            <p className="loader-subtitle">{isAiActive ? "Connecting to Google Gemini 1.5 Flash..." : "Processing recipes based on macro profiles..."}</p>
            
            <div className="loader-steps">
              <div className={`loader-step-item ${planGenerationStep >= 1 ? (planGenerationStep > 1 ? 'completed' : 'active') : ''}`}>
                <div className="loader-step-dot"></div>
                <span>{isAiActive ? "Securing link to Google Gemini AI API..." : "Analyzing daily calorie and macro restrictions..."}</span>
              </div>
              <div className={`loader-step-item ${planGenerationStep >= 2 ? (planGenerationStep > 2 ? 'completed' : 'active') : ''}`}>
                <div className="loader-step-dot"></div>
                <span>{isAiActive ? "Structuring customized daily meal templates..." : "Sifting database for categories (Breakfast, Lunch, Dinner, Snacks)..."}</span>
              </div>
              <div className={`loader-step-item ${planGenerationStep >= 3 ? (planGenerationStep > 3 ? 'completed' : 'active') : ''}`}>
                <div className="loader-step-dot"></div>
                <span>{isAiActive ? `Adjusting ingredients to fit $${profile.budget.toFixed(2)} budget...` : `Filtering cost estimates under $${profile.budget.toFixed(2)} daily target...`}</span>
              </div>
              <div className={`loader-step-item ${planGenerationStep >= 4 ? 'completed' : ''}`}>
                <div className="loader-step-dot"></div>
                <span>{isAiActive ? "Finalizing nutrient counts and calorie balancing..." : "Formatting 7-day calendar view..."}</span>
              </div>
            </div>

            <div className="loader-tips-box">
              <strong>Smart Tip:</strong> {currentLoaderTip}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="toast-msg glass-panel" style={{ borderLeft: '4px solid var(--primary-light)' }}>
          <Sparkles size={18} style={{ color: 'var(--primary-light)' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
