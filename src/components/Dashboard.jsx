import { DollarSign, Droplet, Flame, Sparkles, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Dashboard({ 
  profile, 
  mealPlan, 
  waterIntake, 
  setWaterIntake, 
  loggedMeals, 
  toggleLoggedMeal,
  savedAmount 
}) {
  
  // Calculate today's selected meal plan metrics
  // Get current day name
  const currentDay = new Date().toLocaleDateString('en-US', {weekday: 'long'});

// Get meals for today's day
  const todayMeals = mealPlan[currentDay] || [];
  
  // Calculate logged values based on checked status
  const loggedCal = loggedMeals.reduce((acc, meal) => acc + meal.calories, 0);
  const loggedProtein = loggedMeals.reduce((acc, meal) => acc + meal.protein, 0);
  const loggedCarbs = loggedMeals.reduce((acc, meal) => acc + meal.carbs, 0);
  const loggedFats = loggedMeals.reduce((acc, meal) => acc + meal.fats, 0);
  const loggedCost = loggedMeals.reduce((acc, meal) => acc + meal.cost, 0);

  // Targets from profile
  const targetCal = profile.calories;
  const targetProtein = profile.protein;
  const targetCarbs = profile.carbs;
  const targetFats = profile.fats;
  const targetBudget = profile.budget;

  // Percentages
  const calPercent = Math.min(Math.round((loggedCal / targetCal) * 100), 100);
  const proteinPercent = Math.min(Math.round((loggedProtein / targetProtein) * 100), 100);
  const carbsPercent = Math.min(Math.round((loggedCarbs / targetCarbs) * 100), 100);
  const fatsPercent = Math.min(Math.round((loggedFats / targetFats) * 100), 100);
  
  // Budget status
  const budgetPercent = Math.min(Math.round((loggedCost / targetBudget) * 100), 100);
  const isBudgetExceeded = loggedCost > targetBudget;

  const renderProgressRing = (percent, colorClass, size = 80, strokeWidth = 8, label = "", subtext = "") => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div className="macro-ring-widget" style={{ width: size, height: size }}>
        <svg className="macro-ring-svg">
          <circle
            className="macro-ring-bg"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className={`macro-ring-fill`}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ stroke: `var(--${colorClass})` }}
          />
        </svg>
        <div className="macro-ring-center">
          <span className="macro-ring-value" style={{ fontSize: size > 100 ? '1.5rem' : '1.1rem' }}>{subtext}</span>
          <span className="macro-ring-label">{label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-view animate-slide-up">
      <div className="dashboard-grid">
        
        {/* Calorie & Macro Circle Card */}
        <div className="col-8 glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame style={{ color: 'var(--text-danger)' }} size={20} />
            Nutrition Tracker ({currentDay})
          </h3>
          <div className="metric-ring-container">
            {/* Calorie Large Circle */}
            {renderProgressRing(calPercent, 'primary', 140, 10, `${calPercent}%`, `${loggedCal}/${targetCal}`)}

            {/* Protein, Carbs, Fats smaller circles */}
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {renderProgressRing(proteinPercent, 'primary-light', 95, 7, 'Prot', `${loggedProtein}g`)}
              {renderProgressRing(carbsPercent, 'secondary-light', 95, 7, 'Carb', `${loggedCarbs}g`)}
              {renderProgressRing(fatsPercent, 'text-danger', 95, 7, 'Fat', `${loggedFats}g`)}
            </div>
          </div>
        </div>

        {/* Budget Status Widget */}
        <div className="col-4 glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <DollarSign style={{ color: 'var(--text-success)' }} size={20} />
              Budget Status
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '800', color: isBudgetExceeded ? 'var(--text-danger)' : 'var(--text-success)' }}>
                ${loggedCost.toFixed(2)}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>Target: ${targetBudget.toFixed(2)}</span>
            </div>

            <div className="progress-bar-container">
              <div 
                className={`progress-bar-fill ${isBudgetExceeded ? 'danger' : budgetPercent > 85 ? 'warning' : 'normal'}`}
                style={{ width: `${budgetPercent}%` }}
              ></div>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            {isBudgetExceeded ? (
              <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-sm)', color: '#fca5a5', fontSize: '0.8rem', alignItems: 'center' }}>
                <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                <span>You have exceeded your daily budget by ${(loggedCost - targetBudget).toFixed(2)}! Try Swapping items.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', background: 'var(--primary-glow)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-sm)', color: 'var(--primary-light)', fontSize: '0.8rem', alignItems: 'center' }}>
                <Sparkles size={18} style={{ flexShrink: 0 }} />
                <span>Within budget limits! Excellent meal planning.</span>
              </div>
            )}

            {savedAmount > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', background: 'rgba(245,158,11,0.08)', border: '1px dashed rgba(245,158,11,0.3)', borderRadius: 'var(--radius-sm)', color: 'var(--text-warning)', fontSize: '0.8rem', alignItems: 'center', marginTop: '0.5rem' }}>
                <TrendingUp size={18} style={{ flexShrink: 0 }} />
                <span>Smart Swaps saved you <strong>${savedAmount.toFixed(2)}</strong> today!</span>
              </div>
            )}
          </div>
        </div>

        {/* Daily Meals Logger Checklist */}
        <div className="col-8 glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle style={{ color: 'var(--primary-light)' }} size={20} />
            {currentDay}'s Log Checklist
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {todayMeals.map((meal) => {
              const isLogged = loggedMeals.some(m => m.id === meal.id);
              return (
                <div 
                  key={meal.id} 
                  className="glass-card" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '1rem',
                    borderLeft: `4px solid ${
                      meal.category === 'Breakfast' ? '#3b82f6' : 
                      meal.category === 'Lunch' ? '#f59e0b' : 
                      meal.category === 'Dinner' ? '#a855f7' : '#10b981'
                    }`,
                    background: isLogged ? 'rgba(255,255,255,0.02)' : 'var(--bg-card)',
                    opacity: isLogged ? 0.75 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input 
                      type="checkbox" 
                      id={`log-${meal.id}`} 
                      checked={isLogged}
                      onChange={() => toggleLoggedMeal(meal)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                    />
                    <div>
                      <span className={`meal-time-badge badge-${meal.category.toLowerCase()}`} style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>{meal.category}</span>
                      <h4 style={{ fontSize: '1rem', margin: '0.15rem 0' }}>{meal.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{meal.calories} kcal | {meal.protein}g Protein | ${meal.cost.toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    {isLogged ? (
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: 'bold' }}>Logged</span>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Not Logged</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Water Logger Widget */}
        <div className="col-4 glass-panel water-widget">
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Droplet style={{ color: '#60a5fa' }} size={20} />
            Hydration Agent
          </h3>
          
          <div className="water-glass-container">
            <div className="water-fill" style={{ height: `${(waterIntake / 8) * 100}%` }}>
              {waterIntake > 0 && <div className="water-bubbles"></div>}
            </div>
          </div>

          <div style={{ textHeading: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{waterIntake} / 8 Glasses</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target: 64 fl oz (2L)</div>
          </div>

          <div className="water-controls">
            <button className="btn-circle" onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}>-</button>
            <button className="btn-circle" onClick={() => setWaterIntake(Math.min(12, waterIntake + 1))}>+</button>
          </div>
        </div>

      </div>
    </div>
  );
}
