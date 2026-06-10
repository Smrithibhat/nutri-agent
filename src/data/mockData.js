export const RECIPES = [
  {
    id: "r1",
    name: "Hearty Oatmeal with Seeds & Banana",
    category: "Breakfast",
    description: "A warm, energy-packed breakfast loaded with fiber, healthy fats, and natural sweetness.",
    prepTime: "10 mins",
    calories: 380,
    protein: 12,
    carbs: 58,
    fats: 10,
    diets: ["Vegan", "Vegetarian", "Dairy-Free"],
    cost: 1.20,
    ingredients: [
      { name: "Rolled Oats", amount: "1/2 cup", price: 0.15 },
      { name: "Chia Seeds", amount: "1 tbsp", price: 0.25 },
      { name: "Banana", amount: "1 medium", price: 0.20 },
      { name: "Peanut Butter", amount: "1 tbsp", price: 0.15 },
      { name: "Water/Almond Milk", amount: "1 cup", price: 0.25 },
      { name: "Honey or Maple Syrup", amount: "1 tsp", price: 0.20 }
    ],
    instructions: [
      "Combine oats and chia seeds in a pot with water or almond milk.",
      "Bring to a gentle boil, then simmer for 5 minutes, stirring occasionally.",
      "Pour oatmeal into a bowl.",
      "Slice the banana on top and drizzle with peanut butter and honey."
    ]
  },
  {
    id: "r2",
    name: "Avocado & Egg Toast",
    category: "Breakfast",
    description: "A modern classic breakfast containing essential fats and high-quality protein.",
    prepTime: "8 mins",
    calories: 390,
    protein: 16,
    carbs: 28,
    fats: 22,
    diets: ["Vegetarian"],
    cost: 3.50,
    ingredients: [
      { name: "Fresh Avocado", amount: "1/2 medium", price: 1.80, isExpensive: true, swapId: "avocado" },
      { name: "Eggs", amount: "2 large", price: 0.60 },
      { name: "Whole Wheat Bread", amount: "2 slices", price: 0.40 },
      { name: "Olive Oil", amount: "1 tsp", price: 0.10 },
      { name: "Salt, Pepper, Chili Flakes", amount: "a pinch", price: 0.10 },
      { name: "Cherry Tomatoes", amount: "4 pieces", price: 0.50 }
    ],
    instructions: [
      "Toast the whole wheat bread slices until golden brown.",
      "In a bowl, mash the avocado with salt, pepper, and a pinch of chili flakes.",
      "Heat olive oil in a pan and fry the eggs to your liking (sunny-side up recommended).",
      "Spread mashed avocado over the toast, top with the fried eggs, and serve with tomatoes."
    ]
  },
  {
    id: "r3",
    name: "Sunflower & Egg Savory Toast",
    category: "Breakfast",
    description: "A clever, budget-optimized version of avocado toast using nutritious sunflower butter and roasted seeds.",
    prepTime: "8 mins",
    calories: 410,
    protein: 18,
    carbs: 29,
    fats: 23,
    diets: ["Vegetarian"],
    cost: 1.35,
    ingredients: [
      { name: "Sunflower Seed Butter", amount: "1.5 tbsp", price: 0.25 },
      { name: "Roasted Sunflower Seeds", amount: "1 tbsp", price: 0.15 },
      { name: "Eggs", amount: "2 large", price: 0.60 },
      { name: "Whole Wheat Bread", amount: "2 slices", price: 0.40 },
      { name: "Salt, Pepper, Lemon Juice", amount: "a pinch", price: 0.10 }
    ],
    instructions: [
      "Toast the whole wheat bread slices.",
      "Spread the sunflower seed butter evenly across the hot toast.",
      "Fry the eggs in a pan and place them over the spread.",
      "Garnish with roasted sunflower seeds and a pinch of salt and pepper."
    ]
  },
  {
    id: "r4",
    name: "Greek Yogurt & Fresh Berry Parfait",
    category: "Breakfast",
    description: "Creamy probiotic yogurt layered with high-antioxidant fresh berries and crunchy granola.",
    prepTime: "5 mins",
    calories: 320,
    protein: 18,
    carbs: 42,
    fats: 8,
    diets: ["Vegetarian", "Gluten-Free"],
    cost: 4.20,
    ingredients: [
      { name: "Greek Yogurt", amount: "1 cup", price: 1.20 },
      { name: "Fresh Blueberries & Raspberries", amount: "1/2 cup", price: 2.20, isExpensive: true, swapId: "berries" },
      { name: "Granola", amount: "1/4 cup", price: 0.60 },
      { name: "Honey", amount: "1 tsp", price: 0.20 }
    ],
    instructions: [
      "Spoon half of the Greek yogurt into a glass or bowl.",
      "Add a layer of granola and half of the fresh berries.",
      "Repeat the layers with the remaining yogurt, granola, and berries.",
      "Drizzle honey over the top before serving."
    ]
  },
  {
    id: "r5",
    name: "Yogurt & Smart Frozen Berry Parfait",
    category: "Breakfast",
    description: "An affordable, equally nutritious alternative utilizing sweet frozen berries thawed to release rich juices.",
    prepTime: "5 mins",
    calories: 310,
    protein: 18,
    carbs: 40,
    fats: 7,
    diets: ["Vegetarian", "Gluten-Free"],
    cost: 2.30,
    ingredients: [
      { name: "Greek Yogurt", amount: "1 cup", price: 1.20 },
      { name: "Frozen Mixed Berries (Thawed)", amount: "1/2 cup", price: 0.50 },
      { name: "Granola", amount: "1/4 cup", price: 0.60 },
      { name: "Honey", amount: "1 tsp", price: 0.20 }
    ],
    instructions: [
      "Briefly microwave frozen berries for 15-20 seconds to thaw and create a natural syrup.",
      "Spoon half of the Greek yogurt into your bowl.",
      "Layer with granola and thawed berries along with their syrup.",
      "Add remaining yogurt, granola, and top with the remaining berries and a light honey drizzle."
    ]
  },
  {
    id: "r6",
    name: "Pan-Seared Fresh Salmon & Quinoa",
    category: "Lunch",
    description: "Premium fresh salmon fillet served over organic quinoa and steamed tender asparagus.",
    prepTime: "25 mins",
    calories: 580,
    protein: 42,
    carbs: 46,
    fats: 24,
    diets: ["Gluten-Free", "Dairy-Free"],
    cost: 9.50,
    ingredients: [
      { name: "Fresh Salmon Fillet", amount: "150g", price: 6.50, isExpensive: true, swapId: "salmon" },
      { name: "Organic Quinoa", amount: "1/2 cup dry", price: 1.00, isExpensive: true, swapId: "quinoa" },
      { name: "Asparagus", amount: "100g", price: 1.50 },
      { name: "Lemon & Herbs", amount: "1 serving", price: 0.30 },
      { name: "Olive Oil", amount: "1 tbsp", price: 0.20 }
    ],
    instructions: [
      "Rinse quinoa and cook in water (1:2 ratio) for 15 minutes until fluffy.",
      "Season salmon fillet with salt, pepper, and dried herbs.",
      "Heat olive oil in a skillet and sear salmon for 4-5 minutes per side.",
      "Steam asparagus for 5 minutes.",
      "Serve salmon over quinoa with asparagus and a squeeze of fresh lemon."
    ]
  },
  {
    id: "r7",
    name: "Smart Canned Tuna & Barley Bowl",
    category: "Lunch",
    description: "A highly affordable, high-protein swap using premium flaked canned tuna and fiber-rich pearl barley.",
    prepTime: "20 mins",
    calories: 520,
    protein: 36,
    carbs: 55,
    fats: 16,
    diets: ["Dairy-Free"],
    cost: 2.10,
    ingredients: [
      { name: "Canned Light Tuna in Oil", amount: "1 can (120g)", price: 1.10 },
      { name: "Pearl Barley", amount: "1/2 cup dry", price: 0.20 },
      { name: "Frozen Green Peas & Carrots", amount: "100g", price: 0.50 },
      { name: "Lemon Juice & Soy Sauce", amount: "1 serving", price: 0.20 },
      { name: "Sunflower Oil", amount: "1 tsp", price: 0.10 }
    ],
    instructions: [
      "Boil pearl barley in salted water for 25 minutes until tender, then drain.",
      "Steam frozen peas and carrots for 3 minutes.",
      "Drain canned tuna slightly and flake it into a bowl.",
      "Mix barley, flaked tuna, and steamed vegetables.",
      "Drizzle with oil, a splash of soy sauce, and a squeeze of lemon."
    ]
  },
  {
    id: "r8",
    name: "Mediterranean Chickpea Salad",
    category: "Lunch",
    description: "A crisp, refreshing vegetarian salad packed with plant-based protein, cucumbers, and feta.",
    prepTime: "12 mins",
    calories: 410,
    protein: 14,
    carbs: 48,
    fats: 18,
    diets: ["Vegetarian", "Gluten-Free"],
    cost: 1.80,
    ingredients: [
      { name: "Canned Chickpeas", amount: "1 can (240g drained)", price: 0.75 },
      { name: "Cucumber", amount: "1/2 medium", price: 0.30 },
      { name: "Feta Cheese", amount: "30g", price: 0.45 },
      { name: "Red Onion & Parsley", amount: "small handful", price: 0.20 },
      { name: "Olive Oil & Vinegar Dressing", amount: "1.5 tbsp", price: 0.10 }
    ],
    instructions: [
      "Drain and rinse the canned chickpeas.",
      "Dice cucumber, red onion, and chop parsley.",
      "Combine chickpeas and vegetables in a mixing bowl.",
      "Crumble feta cheese over the mix, drizzle dressing, and toss gently."
    ]
  },
  {
    id: "r9",
    name: "Keto Beef & Broccoli Stir-Fry",
    category: "Lunch",
    description: "A quick, satisfying low-carb meal featuring tender steak strips and crisp broccoli.",
    prepTime: "15 mins",
    calories: 490,
    protein: 34,
    carbs: 10,
    fats: 35,
    diets: ["Keto", "Gluten-Free", "Dairy-Free"],
    cost: 6.20,
    ingredients: [
      { name: "Ribeye Steak Strips", amount: "150g", price: 4.80, isExpensive: true, swapId: "steak" },
      { name: "Fresh Broccoli Florets", amount: "1.5 cups", price: 0.80 },
      { name: "Sesame Oil & Soy Sauce", amount: "1.5 tbsp", price: 0.30 },
      { name: "Garlic & Ginger", amount: "1 tsp minced", price: 0.20 },
      { name: "Sesame Seeds", amount: "1 tsp", price: 0.10 }
    ],
    instructions: [
      "Heat sesame oil in a wok or large skillet over high heat.",
      "Add garlic, ginger, and steak strips. Sear for 3 minutes until browned.",
      "Toss in broccoli florets and soy sauce. Stir-fry for 4-5 minutes until broccoli is tender-crisp.",
      "Sprinkle sesame seeds and serve warm."
    ]
  },
  {
    id: "r10",
    name: "Smart Tofu & Egg Low-Carb Stir-Fry",
    category: "Lunch",
    description: "A super-budget low-carb alternative swapping expensive steak for high-protein extra firm tofu and egg.",
    prepTime: "15 mins",
    calories: 420,
    protein: 28,
    carbs: 9,
    fats: 30,
    diets: ["Keto", "Vegetarian", "Gluten-Free", "Dairy-Free"],
    cost: 1.70,
    ingredients: [
      { name: "Extra Firm Tofu", amount: "150g", price: 0.70 },
      { name: "Egg (Scrambled)", amount: "1 large", price: 0.30 },
      { name: "Fresh Broccoli Florets", amount: "1.5 cups", price: 0.80 },
      { name: "Soy Sauce & Sesame Oil", amount: "1.5 tbsp", price: 0.30 },
      { name: "Garlic & Ginger", amount: "1 tsp", price: 0.20 }
    ],
    instructions: [
      "Press tofu with a paper towel to remove water, then cube it.",
      "Pan-fry tofu cubes in sesame oil until crispy on all sides.",
      "Push tofu to the side, crack in the egg, and scramble.",
      "Add broccoli, garlic, ginger, and soy sauce. Cook for 4 minutes until broccoli is bright green."
    ]
  },
  {
    id: "r11",
    name: "Classic Chicken Breast, Brown Rice & Asparagus",
    category: "Dinner",
    description: "A staple fitness meal providing lean protein and complex carbohydrates.",
    prepTime: "30 mins",
    calories: 510,
    protein: 38,
    carbs: 45,
    fats: 12,
    diets: ["Gluten-Free", "Dairy-Free"],
    cost: 4.80,
    ingredients: [
      { name: "Chicken Breast", amount: "150g", price: 2.20 },
      { name: "Brown Rice", amount: "1/2 cup dry", price: 0.20 },
      { name: "Fresh Asparagus", amount: "100g", price: 1.80, isExpensive: true, swapId: "asparagus" },
      { name: "Olive Oil", amount: "1 tbsp", price: 0.20 },
      { name: "Garlic Powder & Paprika", amount: "1 tsp", price: 0.40 }
    ],
    instructions: [
      "Cook brown rice in boiling water for 35-40 minutes.",
      "Season chicken breast with olive oil, garlic powder, paprika, salt, and pepper.",
      "Bake chicken in the oven at 400°F (200°C) for 22 minutes or pan-sear.",
      "Roast or steam asparagus for 6 minutes.",
      "Plate the chicken with a scoop of brown rice and side of asparagus."
    ]
  },
  {
    id: "r12",
    name: "Chicken, Rice & Smart Green Beans",
    category: "Dinner",
    description: "An economical standard dinner substituting expensive asparagus with sweet, affordable green beans.",
    prepTime: "25 mins",
    calories: 500,
    protein: 38,
    carbs: 46,
    fats: 11,
    diets: ["Gluten-Free", "Dairy-Free"],
    cost: 3.10,
    ingredients: [
      { name: "Chicken Breast", amount: "150g", price: 2.20 },
      { name: "Brown Rice", amount: "1/2 cup dry", price: 0.20 },
      { name: "Frozen Green Beans", amount: "120g", price: 0.40 },
      { name: "Olive Oil", amount: "1 tsp", price: 0.10 },
      { name: "Seasonings", amount: "1 serving", price: 0.20 }
    ],
    instructions: [
      "Cook brown rice.",
      "Season chicken and pan-sear until fully cooked (interior temp 165°F).",
      "Sauté green beans in olive oil with garlic for 5 minutes.",
      "Serve the seasoned chicken alongside rice and sautéed green beans."
    ]
  },
  {
    id: "r13",
    name: "Creamy Salmon Fettuccine",
    category: "Dinner",
    description: "Indulgent pasta cooked in a garlic cream sauce loaded with pan-seared fresh salmon flakes.",
    prepTime: "25 mins",
    calories: 720,
    protein: 44,
    carbs: 68,
    fats: 30,
    diets: [],
    cost: 8.90,
    ingredients: [
      { name: "Fresh Salmon Fillet", amount: "120g", price: 5.20, isExpensive: true, swapId: "salmon" },
      { name: "Fettuccine Pasta", amount: "100g", price: 0.40 },
      { name: "Heavy Cream", amount: "1/4 cup", price: 0.80 },
      { name: "Parmesan Cheese", amount: "2 tbsp", price: 1.00 },
      { name: "Butter & Garlic", amount: "1 tbsp", price: 0.50 }
    ],
    instructions: [
      "Boil fettuccine pasta in salted water until al dente.",
      "Sear salmon fillet in butter for 4 minutes each side, then shred with a fork.",
      "In the same pan, simmer minced garlic, heavy cream, and parmesan cheese for 2 minutes.",
      "Toss the pasta and shredded salmon in the cream sauce. Garnish with pepper."
    ]
  },
  {
    id: "r14",
    name: "Smart Canned Mackerel Fettuccine",
    category: "Dinner",
    description: "An incredibly tasty, high Omega-3 alternative swapping salmon for affordable canned mackerel fillet.",
    prepTime: "15 mins",
    calories: 690,
    protein: 41,
    carbs: 68,
    fats: 28,
    diets: [],
    cost: 3.20,
    ingredients: [
      { name: "Canned Mackerel Fillets", amount: "1 can (120g)", price: 1.30 },
      { name: "Fettuccine Pasta", amount: "100g", price: 0.40 },
      { name: "Heavy Cream", amount: "1/4 cup", price: 0.80 },
      { name: "Parmesan Cheese", amount: "1 tbsp", price: 0.50 },
      { name: "Garlic & Butter", amount: "1 tbsp", price: 0.20 }
    ],
    instructions: [
      "Boil fettuccine pasta.",
      "Melt butter in a pan, sauté garlic, and gently stir-in drained canned mackerel fillets (break into pieces).",
      "Stir in heavy cream and cheese, simmering on low for 1 minute.",
      "Toss pasta directly into the mackerel sauce and serve."
    ]
  },
  {
    id: "r15",
    name: "Loaded Lentil & Sweet Potato Curry",
    category: "Dinner",
    description: "A rich, flavorful plant-based curry that is incredibly filling and cheap to prepare.",
    prepTime: "35 mins",
    calories: 460,
    protein: 16,
    carbs: 72,
    fats: 12,
    diets: ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"],
    cost: 1.60,
    ingredients: [
      { name: "Brown Lentils", amount: "1/2 cup dry", price: 0.25 },
      { name: "Sweet Potato", amount: "1 medium", price: 0.40 },
      { name: "Canned Coconut Milk", amount: "1/2 can", price: 0.60 },
      { name: "Curry Powder & Spices", amount: "1 tbsp", price: 0.15 },
      { name: "Spinach (Frozen)", amount: "50g", price: 0.20 }
    ],
    instructions: [
      "Peel and cube sweet potatoes.",
      "In a pot, combine lentils, sweet potatoes, coconut milk, curry powder, and 1 cup water.",
      "Bring to a boil, then cover and simmer on low for 25 minutes until lentils are soft.",
      "Stir in frozen spinach and simmer for an additional 3 minutes. Season with salt."
    ]
  },
  {
    id: "r16",
    name: "Classic Beef Chili",
    category: "Dinner",
    description: "A hearty bowl of lean ground beef, kidney beans, and fire-roasted tomatoes.",
    prepTime: "40 mins",
    calories: 520,
    protein: 34,
    carbs: 42,
    fats: 22,
    diets: ["Gluten-Free", "Dairy-Free"],
    cost: 4.50,
    ingredients: [
      { name: "Ground Beef (Lean)", amount: "150g", price: 2.80 },
      { name: "Canned Kidney Beans", amount: "1/2 can", price: 0.40 },
      { name: "Canned Diced Tomatoes", amount: "1/2 can", price: 0.50 },
      { name: "Onion & Bell Pepper", amount: "1/2 each", price: 0.60 },
      { name: "Chili Spices", amount: "1 tbsp", price: 0.20 }
    ],
    instructions: [
      "Sauté diced onions and bell peppers in a large pot until soft.",
      "Add ground beef and brown it, draining excess fat.",
      "Stir in kidney beans (with liquid), diced tomatoes, and spices.",
      "Simmer uncovered on medium-low for 25 minutes. Garnish with herbs."
    ]
  },
  {
    id: "r17",
    name: "Mixed Nuts & Dark Chocolate",
    category: "Snack",
    description: "Premium almond, walnut, and pecan mix paired with high-quality dark chocolate.",
    prepTime: "2 mins",
    calories: 260,
    protein: 6,
    carbs: 18,
    fats: 20,
    diets: ["Vegetarian", "Gluten-Free"],
    cost: 3.10,
    ingredients: [
      { name: "Premium Almond & Pecan Mix", amount: "30g", price: 2.10, isExpensive: true, swapId: "nuts" },
      { name: "Dark Chocolate (70%+)", amount: "2 squares", price: 1.00 }
    ],
    instructions: [
      "Portion out nuts and chocolate squares into a small container.",
      "Enjoy as an antioxidant-rich afternoon snack."
    ]
  },
  {
    id: "r18",
    name: "Smart Peanut & Dark Chocolate Mix",
    category: "Snack",
    description: "An equally satisfying snack swapping expensive tree nuts for raw or dry-roasted peanuts.",
    prepTime: "2 mins",
    calories: 275,
    protein: 8,
    carbs: 16,
    fats: 21,
    diets: ["Vegetarian", "Gluten-Free"],
    cost: 1.15,
    ingredients: [
      { name: "Roasted Peanuts", amount: "35g", price: 0.25 },
      { name: "Dark Chocolate (70%+)", amount: "2 squares", price: 0.90 }
    ],
    instructions: [
      "Combine peanuts and dark chocolate.",
      "Peanuts offer higher protein at a fraction of the cost."
    ]
  },
  {
    id: "r19",
    name: "Hummus & Fresh Vegetable Sticks",
    category: "Snack",
    description: "Creamy hummus served with crunchy carrots and celery sticks.",
    prepTime: "5 mins",
    calories: 180,
    protein: 5,
    carbs: 16,
    fats: 11,
    diets: ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"],
    cost: 0.95,
    ingredients: [
      { name: "Hummus", amount: "3 tbsp", price: 0.50 },
      { name: "Carrot", amount: "1 large", price: 0.25 },
      { name: "Celery Stalk", amount: "1 stick", price: 0.20 }
    ],
    instructions: [
      "Slice carrot and celery into thin sticks.",
      "Spoon hummus onto a plate and arrange veggie sticks around it.",
      "Dip and enjoy."
    ]
  },
  {
    id: "r20",
    name: "Apple slices with Almond Butter",
    category: "Snack",
    description: "Crisp apple wedges paired with smooth, nutrient-dense almond butter.",
    prepTime: "3 mins",
    calories: 240,
    protein: 5,
    carbs: 25,
    fats: 16,
    diets: ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"],
    cost: 2.80,
    ingredients: [
      { name: "Crisp Fuji Apple", amount: "1 medium", price: 0.80 },
      { name: "Almond Butter", amount: "1.5 tbsp", price: 2.00, isExpensive: true, swapId: "almondbutter" }
    ],
    instructions: [
      "Core and slice the apple into wedges.",
      "Serve alongside a dollop of almond butter for dipping."
    ]
  },
  {
    id: "r21",
    name: "Apple slices with Smart Peanut Butter",
    category: "Snack",
    description: "A tasty, pocket-friendly snack swapping almond butter for classic creamy peanut butter.",
    prepTime: "3 mins",
    calories: 250,
    protein: 7,
    carbs: 24,
    fats: 16,
    diets: ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"],
    cost: 1.00,
    ingredients: [
      { name: "Crisp Apple", amount: "1 medium", price: 0.80 },
      { name: "Peanut Butter", amount: "1.5 tbsp", price: 0.20 }
    ],
    instructions: [
      "Slice the apple.",
      "Serve with creamy peanut butter, which is richer in protein and much cheaper."
    ]
  },
  {
    id: "r22",
    name: "Whey Protein Shake",
    category: "Snack",
    calories: 180,
    protein: 30,
    carbs: 5,
    fats: 2,
    diets: ["Vegetarian"],
    cost: 1.50
  },
  {
    id: "r23",
    name: "Chicken Protein Bowl",
    category: "Lunch",
    calories: 620,
    protein: 55,
    carbs: 40,
    fats: 15
  }
];

export const BUDGET_SWAPS = [
  {
    id: "salmon",
    name: "Fresh Salmon",
    expensiveCost: 6.50,
    alternativeName: "Canned Light Tuna or Mackerel",
    alternativeCost: 1.20,
    savings: 5.30,
    nutritionBenefit: "Maintains high Omega-3 and protein profiles while reducing heavy metal exposure and cost by 80%.",
    recipesToSwap: {
      "r6": "r7",   // Salmon Quinoa -> Tuna Barley
      "r13": "r14"  // Salmon Fettuccine -> Mackerel Fettuccine
    }
  },
  {
    id: "avocado",
    name: "Fresh Avocado",
    expensiveCost: 1.80,
    alternativeName: "Sunflower Seeds & Seed Butter",
    alternativeCost: 0.40,
    savings: 1.40,
    nutritionBenefit: "Sunflower seeds provide similar monounsaturated healthy fats, more vitamin E, and extra protein at a fraction of the price.",
    recipesToSwap: {
      "r2": "r3"    // Avocado Toast -> Sunflower Toast
    }
  },
  {
    id: "berries",
    name: "Fresh Berries",
    expensiveCost: 2.20,
    alternativeName: "Frozen Mixed Berries",
    alternativeCost: 0.50,
    savings: 1.70,
    nutritionBenefit: "Frozen berries are picked at peak ripeness, locking in vitamin C and antioxidants without spoilage risk, costing 75% less.",
    recipesToSwap: {
      "r4": "r5"    // Berry Parfait -> Frozen Berry Parfait
    }
  },
  {
    id: "steak",
    name: "Ribeye Steak Strips",
    expensiveCost: 4.80,
    alternativeName: "Extra Firm Tofu & Egg",
    alternativeCost: 1.00,
    savings: 3.80,
    nutritionBenefit: "Tofu combined with egg replicates the complete amino acid profile, lowering saturated fat and cholesterol while reducing food costs.",
    recipesToSwap: {
      "r9": "r10"   // Beef Stir-Fry -> Tofu Stir-Fry
    }
  },
  {
    id: "asparagus",
    name: "Fresh Asparagus",
    expensiveCost: 1.80,
    alternativeName: "Frozen/Canned Green Beans",
    alternativeCost: 0.40,
    savings: 1.40,
    nutritionBenefit: "Green beans supply matching dietary fiber, vitamin A, and folate, but can be stored long-term to eliminate waste.",
    recipesToSwap: {
      "r11": "r12"  // Chicken Asparagus -> Chicken Green Beans
    }
  },
  {
    id: "nuts",
    name: "Premium Almond & Pecan Mix",
    expensiveCost: 2.10,
    alternativeName: "Roasted Peanuts",
    alternativeCost: 0.25,
    savings: 1.85,
    nutritionBenefit: "Peanuts are technically legumes, providing higher protein content (26g/100g) and rich Coenzyme Q10 for heart health cheaply.",
    recipesToSwap: {
      "r17": "r18"  // Nuts & Chocolate -> Peanuts & Chocolate
    }
  },
  {
    id: "almondbutter",
    name: "Premium Almond Butter",
    expensiveCost: 2.00,
    alternativeName: "All-Natural Peanut Butter",
    alternativeCost: 0.20,
    savings: 1.80,
    nutritionBenefit: "Natural peanut butter matches the calorie and monounsaturated fat density of almond butter, while offering 2g extra protein per serving.",
    recipesToSwap: {
      "r20": "r21"  // Apple Almond Butter -> Apple Peanut Butter
    }
  }
];

export const MOCK_CHAT_RESPONSES = [
  {
    keywords: ["high protein", "protein", "under $3", "under 3", "cheap protein"],
    response: `To hit high protein targets on a budget, look for plant-and-fish combinations! Here are my top budget protein recommendations:
    
1. **Smart Canned Tuna & Barley Bowl** (Cost: **$2.10** | Protein: **36g**)
2. **Smart Tofu & Egg Low-Carb Stir-Fry** (Cost: **$1.70** | Protein: **28g**)
3. **Loaded Lentil & Sweet Potato Curry** (Cost: **$1.60** | Protein: **16g**)

*Pro tip: Swapping fresh meats for canned fish or soy/egg combos will instantly save you $3-$5 per meal while keeping macronutrients identical!*`
  },
  {
    keywords: ["egg allergy", "substitute for egg", "egg alternative", "no eggs"],
    response: `If you have an egg allergy, here are highly nutritional and budget-friendly egg alternatives:

1. **Chia Seed Slurry** (1 tbsp chia seeds + 3 tbsp water): Great binder for baking and pancakes. Cost: **~$0.15**.
2. **Extra Firm Tofu**: Fantastic swap in stir-fries. You can scramble it with a pinch of turmeric for that classic yellow egg look! Cost: **~$0.70/serving**.
3. **Mashed Banana or Applesauce**: Perfect for keeping baked goods moist. Cost: **~$0.20/serving**.`
  },
  {
    keywords: ["peanut allergy", "nut allergy", "allergy to peanut", "peanut substitute"],
    response: `For peanut allergies, you can safely substitute peanuts/peanut butter with:

1. **Roasted Sunflower Seeds or Seed Butter**: Incredibly high in Vitamin E and magnesium. Tastes rich and costs only **~$0.25/serving** (a great alternative to expensive almond butter!).
2. **Roasted Chickpeas**: A crispy, nut-free snack loaded with fiber and protein. Cost: **~$0.30/serving**.
3. **Pumpkin Seeds (Pepitas)**: Packed with zinc and iron. Cost: **~$0.40/serving**.`
  },
  {
    keywords: ["keto", "low carb", "carb restriction"],
    response: `For a low-carb or Keto lifestyle on a budget:
    
- Avoid expensive specialized Keto flours and packaged keto snacks.
- Focus on whole fats and affordable proteins: eggs, canned mackerel, extra-firm tofu, block cheeses, and cruciferous veggies like cabbage and frozen broccoli.
- Recommended recipe: **Smart Tofu & Egg Low-Carb Stir-Fry** (Cost: **$1.70** | Net Carbs: **6g** | Fats: **30g**). It keeps you in ketosis without straining your wallet!`
  },
  {
    keywords: ["budget", "save money", "cheapest", "frugal"],
    response: `My best frugal nutrition tips to slash your food bill by 50%:

1. **Buy Frozen**: Frozen green beans, spinach, and berries have equal or better vitamin retention than fresh items and never spoil in your drawer.
2. **Embrace Grain & Legume Bases**: Pearl barley, oats, and brown lentils cost less than $0.30 a serving and are loaded with slow-digesting carbs and prebiotics.
3. **Leverage the "Swap & Save" Tab**: Click the Swap button to substitute premium ingredients (salmon, avocado) with our recommended alternatives. It averages a daily savings of **$4.50**!`
  }
];

export const DEFAULT_CHAT_HISTORY = [
  {
    id: "c1",
    sender: "agent",
    text: "Hello! I am your AI Smart Nutrition Agent. I'm loaded with budget tips and allergen hacks. Ask me anything, or try some of the suggestion pills below!",
    timestamp: "Just now"
  }
];
