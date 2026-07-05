import { useState } from 'react';
import { Clock, DollarSign, Eye, Sparkles, X } from 'lucide-react';

export default function MealPlanner({ 
  mealPlan, 
  onRecipeSwap, 
  budgetSwaps, 
  activeTab, 
  setActiveTab, 
  optimizeBudgetToggle,
  toggleOptimizeBudget 
}) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const todayMeals = mealPlan[activeTab] || [];

  const dayCost = todayMeals.reduce((acc, meal) => acc + meal.cost, 0);
  const dayCalories = todayMeals.reduce((acc, meal) => acc + meal.calories, 0);

  const handleShowRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };
  const getSwapInfo = (swapId) => {
    return budgetSwaps.find(s => s.id === swapId);
  };

  const executeInstantSwap = (recipeId, swapId) => {
    const swap = getSwapInfo(swapId);
    if (!swap) return;
    const alternativeRecipeId = swap.recipesToSwap[recipeId];
    if (alternativeRecipeId) {
      onRecipeSwap(activeTab, recipeId, alternativeRecipeId, swap.savings);
      handleCloseRecipe();
    }
  };

  return (
    <div className="planner-view animate-slide-up">
      {/* Plan Header stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeTab} Total Cost</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-success)' }}>${dayCost.toFixed(2)}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeTab} Calories</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-light)' }}>{dayCalories} kcal</div>
          </div>
        </div>
        
        {/* Toggle to optimize budget */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Plan-wide Budget Optimizer</span>
          <button 
            className={`btn ${optimizeBudgetToggle ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => toggleOptimizeBudget()}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 1rem' }}
          >
            <Sparkles size={16} />
            {optimizeBudgetToggle ? 'Optimized' : 'Optimize Budget'}
          </button>
        </div>
      </div>

      {/* Days navigation */}
      <div className="days-filter-row">
        {days.map(day => (
          <button
            key={day}
            className={`day-tab ${activeTab === day ? 'active' : ''}`}
            onClick={() => setActiveTab(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Meals grid for active day */}
      <div className="meal-cards-grid">
        {todayMeals.map(meal => {
          // Check if meal contains expensive ingredients
          const hasExpensive = meal.ingredients.some(ing => ing.isExpensive);
          
          return (
            <div key={meal.id} className="glass-panel glass-card">
              <div className="meal-card-header">
                <span className={`meal-time-badge badge-${meal.category.toLowerCase()}`}>
                  {meal.category}
                </span>
                <span className="meal-card-cost">
                  ${meal.cost.toFixed(2)}
                </span>
              </div>
              <h3 className="meal-card-title">{meal.name}</h3>
              <p className="meal-card-desc">{meal.description}</p>
              
              <div className="meal-card-macros">
                <span><strong>{meal.calories}</strong> kcal</span>
                <span>P: <strong>{meal.protein}g</strong></span>
                <span>C: <strong>{meal.carbs}g</strong></span>
                <span>F: <strong>{meal.fats}g</strong></span>
              </div>

              <div className="meal-card-actions">
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => handleShowRecipe(meal)}>
                  <Eye size={16} />
                  View Details
                </button>
                {hasExpensive && (
                  <button 
                    className="btn btn-glow-warning"
                    onClick={() => handleShowRecipe(meal)}
                    title="Budget substitute available!"
                  >
                    Swap Available
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={handleCloseRecipe}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseRecipe}>
              <X size={24} />
            </button>
            <div className="modal-header">
              <span className={`meal-time-badge badge-${selectedRecipe.category.toLowerCase()}`} style={{ marginBottom: '0.5rem' }}>
                {selectedRecipe.category}
              </span>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>{selectedRecipe.name}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{selectedRecipe.description}</p>
              
              <div className="modal-cost-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-success)', fontWeight: 'bold' }}>
                  <DollarSign size={18} />
                  Estimated Cost: ${selectedRecipe.cost.toFixed(2)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)' }}>
                  <Clock size={16} />
                  Prep: {selectedRecipe.prepTime}
                </div>
              </div>
            </div>

            {/* Nutrients summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', textAlign: 'center', marginBottom: '1.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.01)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Calories</div>
                <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{selectedRecipe.calories} kcal</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Protein</div>
                <div style={{ fontWeight: 'bold', color: 'var(--primary-light)' }}>{selectedRecipe.protein}g</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Carbs</div>
                <div style={{ fontWeight: 'bold' }}>{selectedRecipe.carbs}g</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fats</div>
                <div style={{ fontWeight: 'bold' }}>{selectedRecipe.fats}g</div>
              </div>
            </div>

            {/* Ingredients with costs */}
            <div className="ingredients-list">
              <h3 style={{ fontSize: '1.1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.35rem' }}>Ingredients Cost Breakdown</h3>
              <ul style={{ marginTop: '0.5rem' }}>
                {selectedRecipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="ingredient-item">
                    <span className={ing.isExpensive ? 'ingredient-expensive' : ''}>
                      {ing.amount} {ing.name} {ing.isExpensive && '⚠️'}
                    </span>
                    <span style={{ fontWeight: '500' }}>${ing.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="instructions-list">
              <h3 style={{ fontSize: '1.1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>Prep Instructions</h3>
              {selectedRecipe.instructions.map((step, idx) => (
                <div key={idx} className="instruction-step">
                  <div className="step-num">{idx + 1}</div>
                  <div>{step}</div>
                </div>
              ))}
            </div>

            {/* Actions: Swap alert */}
            {selectedRecipe.ingredients.some(ing => ing.isExpensive) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem', border: '1px dashed rgba(245,158,11,0.3)', borderRadius: 'var(--radius-md)', background: 'rgba(245,158,11,0.04)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-warning)' }}>
                  This recipe contains higher-cost ingredients (e.g.,{' '}
                  {selectedRecipe.ingredients.filter(i => i.isExpensive).map(i => i.name).join(', ')}).
                </div>
                {selectedRecipe.ingredients.filter(i => i.isExpensive).map(ing => {
                  const swap = getSwapInfo(ing.swapId);
                  if (!swap) return null;
                  return (
                    <div key={ing.swapId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem' }}>
                        Swap for <strong>{swap.alternativeName}</strong> to save <strong>${swap.savings.toFixed(2)}</strong>!
                      </span>
                      <button 
                        className="btn btn-glow-warning" 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                        onClick={() => executeInstantSwap(selectedRecipe.id, ing.swapId)}
                      >
                        Swap Now
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
