import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  RefreshCw, 
  MessageSquare, 
  UserSquare2, 
  Apple, 
  Sparkles, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';

import { RECIPES, BUDGET_SWAPS, DEFAULT_CHAT_HISTORY } from './data/mockData';
import Dashboard from './components/Dashboard';
import MealPlanner from './components/MealPlanner';
import SwapSave from './components/SwapSave';
import NutritionAgent from './components/NutritionAgent';
import UserProfile from './components/UserProfile';

// Initial meal plan template (Monday - Sunday) with a mix of high-cost items
const INITIAL_PLAN = {
  Monday: ['r2', 'r6', 'r11', 'r17'],     // Avocado Toast, Salmon Quinoa, Chicken Asparagus, Mixed Nuts
  Tuesday: ['r4', 'r9', 'r15', 'r20'],    // Yogurt Parfait, Beef Broccoli, Lentil Curry, Apple Almond Butter
  Wednesday: ['r1', 'r8', 'r13', 'r19'],   // Oatmeal, Chickpea Salad, Salmon Fettuccine, Hummus Veggies
  Thursday: ['r2', 'r7', 'r16', 'r17'],   // Avocado Toast, Tuna Barley Bowl, Beef Chili, Mixed Nuts
  Friday: ['r4', 'r6', 'r12', 'r20'],     // Yogurt Parfait, Salmon Quinoa, Chicken Green Beans, Apple Almond Butter
  Saturday: ['r1', 'r10', 'r11', 'r19'],  // Oatmeal, Tofu Stir-Fry, Chicken Asparagus, Hummus Veggies
  Sunday: ['r2', 'r8', 'r13', 'r21']      // Avocado Toast, Chickpea Salad, Salmon Fettuccine, Apple Peanut Butter
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [plannerDayTab, setPlannerDayTab] = useState(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long'
    })
  );
  
  // User Profile
  const [profile, setProfile] = useState({
    name: 'Smrithi',
    budget: 15.00,
    goal: 'Balanced Diet',
    calories: 2000,
    protein: 100,
    carbs: 250,
    fats: 65,
    diets: []
  });

  // Plan State - contains Recipe Objects
  const [mealPlan, setMealPlan] = useState({});
  const [savedAmount, setSavedAmount] = useState(0);
  const [optimizeBudgetToggle, setOptimizeBudgetToggle] = useState(false);

  // Daily Logger State
  const [waterIntake, setWaterIntake] = useState(0);
  const [loggedMeals, setLoggedMeals] = useState([]);

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

  // Initialize and update meal plan based on profile selections
  useEffect(() => {
  const initializedPlan = {};

  Object.keys(INITIAL_PLAN).forEach(day => {

    if (profile.protein >= 140) {
      initializedPlan[day] = [
        getRecipeById('r4'),
        getRecipeById('r6'),
        getRecipeById('r13'),
        getRecipeById('r18')
      ];
    }

    else if (profile.protein >= 120) {
      initializedPlan[day] = [
        getRecipeById('r3'),
        getRecipeById('r6'),
        getRecipeById('r11'),
        getRecipeById('r18')
      ];
    }

    else {
      initializedPlan[day] = [
        getRecipeById('r1'),
        getRecipeById('r7'),
        getRecipeById('r12'),
        getRecipeById('r21')
      ];
    }
  });

  setMealPlan(initializedPlan);
}, [profile.protein]);
  // Sync Logged Meals when active Day changes
  useEffect(() => {
  const currentDay = new Date().toLocaleDateString('en-US', {
    weekday: 'long'
  });

  if (mealPlan[currentDay]) {
    setLoggedMeals([
      mealPlan[currentDay][0],
      mealPlan[currentDay][2]
    ]);
  }
  }, [mealPlan]);
  // Handle Diet restriction updates
  const applyDietaryRestrictions = (selectedDiets) => {
    if (!mealPlan || Object.keys(mealPlan).length === 0) return;

    const updatedPlan = {};
    let changesMade = false;

    Object.entries(mealPlan).forEach(([day, dayMeals]) => {
      updatedPlan[day] = dayMeals.map(meal => {
        // If meal doesn't match selected diets, find one that does
        const matchesDiet = selectedDiets.every(diet => meal.diets.includes(diet));
        if (matchesDiet) return meal;

        // Find fallback recipe in same category
        const fallback = RECIPES.find(r => 
          r.category === meal.category && 
          selectedDiets.every(diet => r.diets.includes(diet))
        );

        if (fallback) {
          changesMade = true;
          return fallback;
        }
        return meal; // Return original if no fallback matches all constraints
      });
    });

    if (changesMade) {
      setMealPlan(updatedPlan);
      showToast("Meal plan updated to match your new dietary settings!");
    }
  };

  // Plan-wide Budget Optimizer logic
  useEffect(() => {
    if (!mealPlan || Object.keys(mealPlan).length === 0) return;

    const updatedPlan = {};
    let totalSaved = 0;

    Object.entries(mealPlan).forEach(([day, dayMeals]) => {
      updatedPlan[day] = dayMeals.map(meal => {
        if (optimizeBudgetToggle) {
          // If we are optimizing, check if any swap exists for this meal
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
          // If turning off optimization, check if this is a swapped alternative and we can restore the expensive one
          const swap = BUDGET_SWAPS.find(s => Object.values(s.recipesToSwap).includes(meal.id));
          if (swap) {
            const expensiveId = Object.keys(swap.recipesToSwap).find(key => swap.recipesToSwap[key] === meal.id);
            const expensive = getRecipeById(expensiveId);
            if (expensive) {
              return expensive;
            }
          }
        }
        return meal;
      });
    });

    setMealPlan(updatedPlan);
    setSavedAmount(optimizeBudgetToggle ? totalSaved / 7 : 0); // Average daily saving

    if (optimizeBudgetToggle) {
      showToast(`Budget Optimizer Active! Weekly cost slashed by $${totalSaved.toFixed(2)}.`);
    } else {
      showToast("Budget Optimizer disabled. Restored original plan.");
    }
  }, [optimizeBudgetToggle]);

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
            setOptimizeBudgetToggle={setOptimizeBudgetToggle}
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
          />
        );
      case 'Profile':
        return (
          <UserProfile 
            profile={profile}
            setProfile={setProfile}
            onSave={handleProfileSave}
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
            <h1>{activeTab}</h1>
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
