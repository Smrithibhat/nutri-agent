import React from 'react';
import { User, DollarSign, Award, ShieldAlert } from 'lucide-react';

export default function UserProfile({ profile, setProfile, onSave }) {
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleBudgetChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setProfile(prev => ({ ...prev, budget: val }));
  };

  const handleGoalSelect = (goal) => {
    let targets = { calories: 2000, protein: 100, carbs: 250, fats: 65 };
    if (goal === 'Weight Loss') {
      targets = { calories: 1600, protein: 120, carbs: 160, fats: 50 };
    } else if (goal === 'Muscle Gain') {
      targets = { calories: 2700, protein: 150, carbs: 320, fats: 90 };
    }
    setProfile(prev => ({ ...prev, goal, ...targets }));
  };

  const handleDietToggle = (diet) => {
    setProfile(prev => {
      const diets = prev.diets.includes(diet)
        ? prev.diets.filter(d => d !== diet)
        : [...prev.diets, diet];
      return { ...prev, diets };
    });
  };

  const goals = [
    { name: 'Balanced Diet', desc: 'Maintain weight & improve health markers', calories: 2000 },
    { name: 'Weight Loss', desc: 'Fat loss with high satiety protein focus', calories: 1600 },
    { name: 'Muscle Gain', desc: 'Caloric surplus and protein target booster', calories: 2700 }
  ];

  const dietOptions = ['Vegan', 'Vegetarian', 'Keto', 'Gluten-Free', 'Dairy-Free'];

  return (
    <div className="profile-view animate-slide-up">
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <User className="logo-icon" size={24} />
          <h2 style={{ fontSize: '1.5rem' }}>Personal Profile & Targets</h2>
        </div>

        <div className="profile-section">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label htmlFor="name-input">Display Name</label>
              <input
                id="name-input"
                type="text"
                name="name"
                value={profile.name}
                onChange={handleTextChange}
                className="form-input"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="budget-input">Daily Budget ($)</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>$</span>
                <input
                  id="budget-input"
                  type="number"
                  name="budget"
                  value={profile.budget}
                  onChange={handleBudgetChange}
                  className="form-input"
                  style={{ paddingLeft: '24px' }}
                  min="5"
                  max="100"
                  step="0.5"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} style={{ color: 'var(--primary-light)' }} />
              Health Focus & Calorie Plan
            </label>
            <div className="radio-group">
              {goals.map(g => (
                <div key={g.name} className="radio-card">
                  <input
                    type="radio"
                    id={`goal-${g.name}`}
                    name="goal"
                    checked={profile.goal === g.name}
                    onChange={() => handleGoalSelect(g.name)}
                  />
                  <label htmlFor={`goal-${g.name}`} className="radio-card-label">
                    <span className="radio-card-label-title">{g.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{g.desc}</span>
                    <span style={{ fontSize: '1rem', color: 'var(--primary-light)', fontWeight: 'bold', marginTop: '8px' }}>{g.calories} kcal</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={18} style={{ color: 'var(--text-warning)' }} />
              Dietary Restrictions & Allergens
            </label>
            <div className="checkbox-grid">
              {dietOptions.map(diet => (
                <div key={diet} className="radio-card">
                  <input
                    type="checkbox"
                    id={`diet-${diet}`}
                    checked={profile.diets.includes(diet)}
                    onChange={() => handleDietToggle(diet)}
                  />
                  <label htmlFor={`diet-${diet}`} className="radio-card-label" style={{ padding: '0.85rem' }}>
                    <span className="radio-card-label-title">{diet}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.01)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Calories</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-light)' }}>{profile.calories} kcal</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Protein Target</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{profile.protein}g</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Carbs Target</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{profile.carbs}g</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Fats Target</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{profile.fats}g</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={onSave}>Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}
