import React from 'react';
import { RefreshCw, TrendingUp, HelpCircle, ShieldCheck, Award } from 'lucide-react';

export default function SwapSave({ 
  mealPlan, 
  budgetSwaps, 
  onRecipeSwap, 
  allRecipes 
}) {
  
  // Find all active recipes in the current week's meal plan
  const getActiveRecipeIds = () => {
    const ids = new Set();
    Object.values(mealPlan).forEach(dayMeals => {
      dayMeals.forEach(meal => ids.add(meal.id));
    });
    return ids;
  };

  const activeRecipeIds = getActiveRecipeIds();

  // Determine which swaps are relevant to the user's active plan
  const activeSwaps = budgetSwaps.map(swap => {
    // Check if any of the "expensive recipes" in recipesToSwap are active in the current plan
    const expensiveIds = Object.keys(swap.recipesToSwap);
    const activeExpensiveId = expensiveIds.find(id => activeRecipeIds.has(id));
    const alternativeId = activeExpensiveId ? swap.recipesToSwap[activeExpensiveId] : null;
    const isAlternativeActive = alternativeId && activeRecipeIds.has(alternativeId);
    
    return {
      ...swap,
      activeExpensiveId,
      alternativeId,
      isAvailable: !!activeExpensiveId,
      isSwapped: isAlternativeActive && !activeRecipeIds.has(activeExpensiveId)
    };
  });

  // Calculate potential weekly savings
  // Let's count how many times the expensive recipes appear in the weekly plan
  const calculatePotentialSavings = () => {
    let totalSavings = 0;
    Object.values(mealPlan).forEach(dayMeals => {
      dayMeals.forEach(meal => {
        // Find if this meal is an expensive one in any swap
        const swap = budgetSwaps.find(s => Object.keys(s.recipesToSwap).includes(meal.id));
        if (swap) {
          totalSavings += swap.savings;
        }
      });
    });
    return totalSavings;
  };

  const weeklySavings = calculatePotentialSavings();

  const handleApplySwap = (swap) => {
    if (!swap.activeExpensiveId || !swap.alternativeId) return;
    
    // Find all days where the expensive recipe is used and replace it
    Object.entries(mealPlan).forEach(([day, dayMeals]) => {
      if (dayMeals.some(m => m.id === swap.activeExpensiveId)) {
        onRecipeSwap(day, swap.activeExpensiveId, swap.alternativeId, swap.savings);
      }
    });
  };

  return (
    <div className="swaps-view animate-slide-up">
      {/* Banner showing weekly savings */}
      <div className="swap-header-banner">
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-warning)' }}>
            <TrendingUp size={20} />
            Weekly Smart Savings Potential
          </h3>
          <p style={{ fontStyle: 'normal', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Swapping expensive premium ingredients for smart equivalents helps optimize your healthy meal plan.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="swap-savings-amount">${weeklySavings.toFixed(2)}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Est. Saved This Week</span>
        </div>
      </div>

      <h3 style={{ marginBottom: '1.25rem' }}>Available Swaps in Your Meal Plan</h3>
      
      <div className="swap-card-container">
        {activeSwaps.filter(s => s.isAvailable || s.isSwapped).length === 0 ? (
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <ShieldCheck size={48} style={{ color: 'var(--primary-light)', marginBottom: '1rem', opacity: 0.8 }} />
            <h4>Your Meal Plan is Fully Optimized!</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>No expensive ingredients found in your current schedule. You're shopping smart!</p>
          </div>
        ) : (
          activeSwaps
            .filter(swap => swap.isAvailable || swap.isSwapped)
            .map(swap => {
              const expensiveRecipe = allRecipes.find(r => r.id === (swap.activeExpensiveId || Object.keys(swap.recipesToSwap)[0]));
              const alternativeRecipe = allRecipes.find(r => r.id === (swap.alternativeId || Object.values(swap.recipesToSwap)[0]));
              
              const alreadySwapped = swap.isSwapped;

              return (
                <div key={swap.id} className="glass-panel swap-card">
                  
                  {/* Left Side: Expensive Item */}
                  <div className={`item-side expensive ${alreadySwapped ? 'inactive-swap' : ''}`} style={{ opacity: alreadySwapped ? 0.45 : 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span className="meal-time-badge" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}>Expensive Base</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{expensiveRecipe?.category}</span>
                    </div>
                    <h4 className="item-side-title">{expensiveRecipe?.name}</h4>
                    <div className="item-side-price">${expensiveRecipe?.cost.toFixed(2)}</div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Key item: <strong>{swap.name}</strong>
                    </p>
                  </div>

                  {/* Divider Action Area */}
                  <div className="swap-card-divider">
                    <RefreshCw className={alreadySwapped ? "" : "spin-hover"} style={{ animation: alreadySwapped ? 'none' : 'spin 10s linear infinite', opacity: alreadySwapped ? 0.3 : 0.8 }} />
                    <span className="swap-savings-badge">Save ${swap.savings.toFixed(2)}</span>
                    
                    {!alreadySwapped ? (
                      <button 
                        className="btn btn-primary" 
                        onClick={() => handleApplySwap(swap)}
                        style={{ marginTop: '1rem', padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                      >
                        Apply Swap
                      </button>
                    ) : (
                      <div style={{ marginTop: '1rem', color: 'var(--text-success)', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <ShieldCheck size={16} /> Swapped!
                      </div>
                    )}
                  </div>

                  {/* Right Side: Smart Alternative */}
                  <div className="item-side alternative">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span className="meal-time-badge" style={{ background: 'var(--primary-glow)', color: 'var(--primary-light)', border: '1px solid var(--border-primary)' }}>Nutritious Swap</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alternativeRecipe?.category}</span>
                    </div>
                    <h4 className="item-side-title">{alternativeRecipe?.name}</h4>
                    <div className="item-side-price">${alternativeRecipe?.cost.toFixed(2)}</div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Key swap: <strong>{swap.alternativeName}</strong>
                    </p>
                  </div>

                  {/* Full-width nutrition benefit description */}
                  <div className="col-12 swap-benefit-text" style={{ gridColumn: 'span 3' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <Award size={16} style={{ color: 'var(--secondary-light)', marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem' }}>
                        <strong>Nutritional Equivalence:</strong> {swap.nutritionBenefit}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
