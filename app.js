const appContent = document.getElementById('app-content');

// --- APP STATE ---
let userState = {
    name: 'Ella',
    role: 'user', // user, specialist, admin
    currentScreen: 'home',
    onboardingStep: 0,
    medicalProfile: {
        condition: 'Diabetes',
        medications: ['Metformin'],
        cuisine: 'Nigerian',
        allergies: []
    },
    mealPlan: [],
    selectedDay: 0,
    groceryList: [],
    showPrototypePills: false
};

// --- DATA - 7 DAY PLANS ---
const CUISINE_PLANS = {
    'Nigerian': {
        'Diabetes': [
            { day: 'Mon', date: 16, meals: [
                { type: 'Breakfast', name: 'Baked Moin Moin & Oat Swallow', img: 'assets/moin_moin.png', macros: { kcal: 310, protein: 18, carbs: 35, fats: 8 }, ingredients: ['Beans', 'Oats', 'Pepper'] },
                { type: 'Lunch', name: 'Grilled Croaker & Steamed Veggies', img: 'assets/fish_veggies.png', macros: { kcal: 380, protein: 42, carbs: 12, fats: 13 }, ingredients: ['Croaker', 'Spinach', 'Onions'] },
                { type: 'Dinner', name: 'Okra Soup with Turkey Breast', img: 'assets/lentil_soup.png', macros: { kcal: 340, protein: 35, carbs: 15, fats: 11 }, ingredients: ['Okra', 'Turkey', 'Palm oil (minimal)'] }
            ]},
            { day: 'Tue', date: 17, meals: [
                { type: 'Breakfast', name: 'Akara (Air Fried) & Unsweetened Pap', img: 'assets/akara.png', macros: { kcal: 290, protein: 15, carbs: 40, fats: 7 }, ingredients: ['Beans', 'Corn', 'Ginger'] },
                { type: 'Lunch', name: 'Ofada Rice & Stir-fry Beef', img: 'assets/ofada_rice.png', macros: { kcal: 420, protein: 28, carbs: 45, fats: 14 }, ingredients: ['Ofada Rice', 'Beef', 'Bells peppers'] },
                { type: 'Dinner', name: 'Pepper Soup with Tilapia', img: 'assets/pepper_soup.png', macros: { kcal: 250, protein: 30, carbs: 8, fats: 8 }, ingredients: ['Tilapia', 'Pepper soup spices', 'Scent leaf'] }
            ]},
        ]
    },
    'South Asian': {
       'Diabetes': [
            { day: 'Mon', date: 16, meals: [
                { type: 'Breakfast', name: 'Moong Dal Chilla', img: 'assets/moong_chilla.png', macros: { kcal: 280, protein: 14, carbs: 35, fats: 8 }, ingredients: ['Moong dal', 'Green chili', 'Cumin'] },
                { type: 'Lunch', name: 'Cauliflower Rice & Paneer Bhurji', icon: '🍚', macros: { kcal: 350, protein: 18, carbs: 12, fats: 18 }, ingredients: ['Cauliflower', 'Paneer', 'Turmeric'] },
                { type: 'Dinner', name: 'Lentil Soup (Tadka Dal)', icon: '🥣', macros: { kcal: 310, protein: 15, carbs: 45, fats: 7 }, ingredients: ['Red lentils', 'Garlic', 'Mustard seeds'] }
            ]}
       ]
    },
    'Mediterranean': {
        'Diabetes': [
            { day: 'Mon', date: 16, meals: [
                { type: 'Breakfast', name: 'Greek Yogurt with Walnuts & Berries', img: 'assets/greek_yogurt.png', macros: { kcal: 250, protein: 15, carbs: 20, fats: 12 }, ingredients: ['Greek Yogurt', 'Walnuts', 'Blueberries'] },
                { type: 'Lunch', name: 'Grilled Chicken Souvlaki & Greek Salad', img: 'assets/chicken_souvlaki.png', macros: { kcal: 380, protein: 35, carbs: 15, fats: 18 }, ingredients: ['Chicken Breast', 'Cucumber', 'Feta Cheese', 'Olive Oil'] },
                { type: 'Dinner', name: 'Baked Salmon with Roasted Asparagus', img: 'assets/baked_salmon.png', macros: { kcal: 410, protein: 40, carbs: 10, fats: 22 }, ingredients: ['Salmon', 'Asparagus', 'Lemon', 'Herbs'] }
            ]}
        ]
    },
    'Mexican': {
        'Hypertension': [
            { day: 'Mon', date: 16, meals: [
                { type: 'Breakfast', name: 'Huevos Rancheros (Low Sodium)', img: 'assets/huevos_rancheros.png', macros: { kcal: 320, protein: 18, carbs: 25, fats: 14 }, ingredients: ['Corn Tortilla', 'Eggs', 'Fresh Salsa', 'Black Beans'] },
                { type: 'Lunch', name: 'Grilled Shrimp Tacos with Avocado', img: 'assets/shrimp_tacos.png', macros: { kcal: 350, protein: 28, carbs: 30, fats: 16 }, ingredients: ['Shrimp', 'Avocado', 'Cabbage Slaw', 'Lime'] },
                { type: 'Dinner', name: 'Chicken Fajita Bowl (No Added Salt)', img: 'assets/fajita_bowl.png', macros: { kcal: 390, protein: 32, carbs: 20, fats: 18 }, ingredients: ['Chicken', 'Bell Peppers', 'Onions', 'Cilantro Lime Rice'] }
            ]}
        ]
    },
    'East Asian': {
        'Diabetes': [
            { day: 'Mon', date: 16, meals: [
                { type: 'Breakfast', name: 'Steamed Egg Custard & Wilted Greens', img: 'assets/egg_custard.png', macros: { kcal: 210, protein: 14, carbs: 8, fats: 12 }, ingredients: ['Eggs', 'Bok Choy', 'Sesame Oil'] },
                { type: 'Lunch', name: 'Miso Glazed Cod & Steamed Broccoli', img: 'assets/miso_cod.png', macros: { kcal: 340, protein: 30, carbs: 12, fats: 10 }, ingredients: ['Cod', 'Miso Paste (Light)', 'Broccoli', 'Ginger'] },
                { type: 'Dinner', name: 'Tofu Stir-fry with Shirataki Noodles', img: 'assets/tofu_stir_fry.png', macros: { kcal: 280, protein: 20, carbs: 15, fats: 11 }, ingredients: ['Firm Tofu', 'Shirataki Noodles', 'Mixed Veggies', 'Soy Sauce (Low Sodium)'] }
            ]}
        ]
    }
};

// --- RENDER ENGINE ---
function render() {
    if (userState.currentScreen === 'onboarding') {
        renderOnboarding();
    } else {
        renderMainLayout();
    }
}

function renderMainLayout() {
    let contentHtml = '';
    
    if (userState.role === 'user') {
        switch (userState.currentScreen) {
            case 'home': contentHtml = renderDashboard(); break;
            case 'planner': contentHtml = renderPlanner(); break;
            case 'grocery': contentHtml = renderGrocery(); break;
            case 'specialists': contentHtml = renderSpecialists(); break;
            case 'profile': contentHtml = renderProfile(); break;
        }
    } else if (userState.role === 'specialist') {
        contentHtml = renderSpecialistPortal();
    } else if (userState.role === 'admin') {
        contentHtml = renderAdminPortal();
    }

    appContent.innerHTML = `
        <div class="prototype-trigger" onclick="togglePrototypePills()"></div>
        <div class="prototype-pills ${userState.showPrototypePills ? 'show' : ''}">
            <button class="${userState.role === 'user' ? 'active' : ''}" onclick="switchRole('user')">User</button>
            <button class="${userState.role === 'specialist' ? 'active' : ''}" onclick="switchRole('specialist')">Pro</button>
            <button class="${userState.role === 'admin' ? 'active' : ''}" onclick="switchRole('admin')">Admin</button>
        </div>

        ${contentHtml}

        <div class="nav-v2">
            <div class="nav-item-v2 ${userState.currentScreen === 'home' ? 'active' : ''}" onclick="navigateTo('home')">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div class="nav-item-v2 ${userState.currentScreen === 'planner' ? 'active' : ''}" onclick="navigateTo('planner')">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div class="nav-item-v2 ${userState.currentScreen === 'grocery' ? 'active' : ''}" onclick="navigateTo('grocery')">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <div class="nav-item-v2 ${userState.currentScreen === 'specialists' ? 'active' : ''}" onclick="navigateTo('specialists')">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div class="nav-item-v2 ${userState.currentScreen === 'profile' ? 'active' : ''}" onclick="navigateTo('profile')">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
        </div>
    `;
}

// --- SCREENS ---

function renderOnboarding() {
    const steps = [
        `
        <div class="onboarding-step" style="padding: 60px 24px; display: flex; flex-direction: column; justify-content: center; min-height: 100vh">
            <span class="label-xs" style="color: var(--primary); letter-spacing: 0.2em; margin-bottom: 24px">01 / INTRODUCTION</span>
            <h1 style="font-size: 52px; line-height: 0.9; margin-bottom: 24px; font-weight: 800">CarePlate.</h1>
            <p style="font-size: 18px; opacity: 0.6; line-height: 1.5; margin-bottom: 60px">Reimagining health through cultural culinary heritage.</p>
            
            <div class="input-group">
                <label class="label-xs">Preferred Name</label>
                <input type="text" id="ob-name" placeholder="How should we call you?" value="${userState.name}" 
                       style="font-size: 20px; font-weight: 500; border-bottom: 2px solid var(--primary); padding: 12px 0">
            </div>
            
            <div style="flex: 1"></div>
            <button class="btn btn-primary" onclick="nextStep()" style="padding: 24px; border-radius: 24px; font-size: 18px">Begin Journey</button>
        </div>
        `,
        `
        <div class="onboarding-step" style="padding: 60px 24px; display: flex; flex-direction: column; justify-content: center; min-height: 100vh">
            <span class="label-xs" style="color: var(--primary); letter-spacing: 0.2em; margin-bottom: 24px">02 / CLINICAL</span>
            <h1 style="font-size: 40px; line-height: 1; margin-bottom: 24px; font-weight: 800">Medical<br>Focus.</h1>
            <p style="font-size: 16px; opacity: 0.6; line-height: 1.5; margin-bottom: 48px">Clinically optimized plans for chronic care.</p>
            
            <div class="input-group" style="margin-bottom: 32px">
                <label class="label-xs">Primary Condition</label>
                <select id="ob-condition" style="font-size: 18px; font-weight: 600; padding: 12px 0; width: 100%; appearance: none">
                    <option value="Diabetes">Type 2 Diabetes</option>
                    <option value="Hypertension">Hypertension</option>
                    <option value="Obesity">Weight Management</option>
                </select>
            </div>

            <div class="input-group">
                <label class="label-xs">Active Medications</label>
                <input type="text" id="ob-meds" placeholder="e.g. Metformin" 
                       style="font-size: 18px; font-weight: 500; border-bottom: 1px solid #ddd; padding: 12px 0">
            </div>
            
            <div style="flex: 1"></div>
            <button class="btn btn-primary" onclick="nextStep()" style="padding: 24px; border-radius: 24px">Validate Health Data</button>
        </div>
        `,
        `
        <div class="onboarding-step" style="padding: 60px 24px; display: flex; flex-direction: column; justify-content: center; min-height: 100vh">
            <span class="label-xs" style="color: var(--primary); letter-spacing: 0.2em; margin-bottom: 24px">03 / HERITAGE</span>
            <h1 style="font-size: 40px; line-height: 1; margin-bottom: 24px; font-weight: 800">Culinary<br>DNA.</h1>
            <p style="font-size: 16px; opacity: 0.6; line-height: 1.5; margin-bottom: 48px">Food that feels like home, tailored for health.</p>
            
            <div class="input-group" style="margin-bottom: 32px">
                <label class="label-xs">Select Cuisine</label>
                <select id="ob-cuisine" style="font-size: 18px; font-weight: 600; padding: 12px 0; width: 100%; appearance: none">
                    <option value="Nigerian">West African (Nigerian)</option>
                    <option value="South Asian">South Asian</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="Mexican">Mexican</option>
                    <option value="East Asian">East Asian</option>
                </select>
            </div>
            
            <div style="flex: 1"></div>
            <button class="btn btn-primary" onclick="finishOnboarding()" style="padding: 24px; border-radius: 24px">Personalize My Plan</button>
        </div>
        `
    ];
    appContent.innerHTML = steps[userState.onboardingStep];
}

function renderDashboard() {
    const plans = CUISINE_PLANS[userState.medicalProfile.cuisine][userState.medicalProfile.condition] || CUISINE_PLANS['Nigerian']['Diabetes'];
    const today = plans[0];
    const lunch = today.meals.find(m => m.type === 'Lunch');

    return `
        <div class="screen">
            <header class="header-minimal">
                <div>
                    <h3 style="font-size: 24px">Dashboard</h3>
                    <p style="font-size: 13px; opacity: 0.5; font-weight: 600">Monday, March 16</p>
                </div>
                <div class="profile-pill">
                    <div class="profile-img">${userState.name[0]}</div>
                    <span style="font-size: 12px; font-weight: 700">${userState.name}</span>
                </div>
            </header>

            <div class="bento-grid">
                <!-- Main Featured Meal Card -->
                <div class="bento-item col-4 featured-meal" onclick="showMealDetails('${lunch.name}')">
                    <img src="${lunch.img}" class="featured-img" alt="Meal">
                    <div class="featured-content">
                        <span class="label-xs" style="opacity: 0.8; color: white">Next scheduled meal</span>
                        <h2 style="font-size: 28px; margin-top: 4px">${lunch.name}</h2>
                        <div style="display: flex; gap: 12px; margin-top: 12px; opacity: 0.9; font-size: 13px">
                            <span>🕒 1:00 PM</span>
                            <span>🔥 ${lunch.macros.kcal} kcal</span>
                        </div>
                    </div>
                </div>

                <!-- Macro Stats Tile -->
                <div class="bento-item col-2 row-2" style="background: #F8F9F8; display: flex; flex-direction: column; justify-content: space-between">
                    <div>
                        <span class="label-xs">Daily Macros</span>
                        <h4 style="font-size: 18px; margin-top: 4px">On Track</h4>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px">
                        ${renderMacroRing('P', 65, '#1B3C35')}
                        ${renderMacroRing('C', 40, '#D4AF37')}
                        ${renderMacroRing('F', 30, '#8E918F')}
                    </div>
                    <p style="font-size: 11px; opacity: 0.5; margin-top: 12px">840/1200 kcal used</p>
                </div>

                <!-- Health Alert Tile -->
                <div class="bento-item col-2" style="background: #FFF1F0; border: 1px solid #FFE4E1">
                    <span class="label-xs" style="color: var(--accent-red); opacity: 0.8">Blood Sugar</span>
                    <h3 style="color: var(--accent-red); margin-top: 4px">114</h3>
                    <p style="font-size: 11px; color: var(--accent-red); opacity: 0.6; margin-top: 4px">Stable</p>
                </div>

                <!-- Activity Tile -->
                <div class="bento-item col-2" style="background: #F0F7FF">
                    <span class="label-xs" style="color: #007AFF; opacity: 0.8">Movement</span>
                    <h3 style="color: #007AFF; margin-top: 4px">4.2k</h3>
                    <p style="font-size: 11px; color: #007AFF; opacity: 0.6; margin-top: 4px">Steps taken</p>
                </div>

                <!-- Coach Tip -->
                <div class="bento-item col-4" style="background: white; border: 1px solid rgba(0,0,0,0.03)">
                    <div style="display: flex; align-items: center; gap: 12px">
                        <div style="width: 40px; height: 40px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px">🩺</div>
                        <div style="flex: 1">
                            <h4 style="font-size: 14px">Doctor's Note</h4>
                            <p style="font-size: 13px; opacity: 0.6; line-height: 1.4">"Take your medications exactly 20 mins after this lunch."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderMacroRing(label, percent, color) {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    return `
        <div style="text-align: center">
            <div class="stat-ring">
                <svg width="44" height="44" class="ring-svg">
                    <circle class="ring-bg" cx="22" cy="22" r="${radius}" />
                    <circle class="ring-progress" cx="22" cy="22" r="${radius}" 
                            stroke="${color}" stroke-dasharray="${circumference}" 
                            stroke-dashoffset="${offset}" />
                </svg>
                <span style="position: absolute; font-size: 10px; font-weight: 800">${label}</span>
            </div>
        </div>
    `;
}

function renderPlanner() {
    const plans = CUISINE_PLANS[userState.medicalProfile.cuisine][userState.medicalProfile.condition] || CUISINE_PLANS['Nigerian']['Diabetes'];
    const selectedDayPlan = plans[userState.selectedDay] || plans[0];

    return `
        <div class="screen">
            <header class="header-minimal">
                <div>
                    <h3 style="font-size: 24px">Weekly Plan</h3>
                    <p style="font-size: 13px; opacity: 0.5; font-weight: 600">${userState.medicalProfile.cuisine} Cuisine</p>
                </div>
            </header>

            <div class="week-strip">
                ${plans.map((p, idx) => `
                    <div class="day-tab ${userState.selectedDay === idx ? 'active' : ''}" onclick="selectDay(${idx})">
                        <span class="name" style="font-size: 10px; opacity: 0.5">${p.day}</span>
                        <span class="date" style="font-size: 18px; font-weight: 800">${p.date}</span>
                    </div>
                `).join('')}
            </div>

            <div style="padding: 24px">
                <div class="meal-group">
                    ${selectedDayPlan.meals.map(m => `
                        <div class="meal-list-item" onclick="showMealDetails('${m.name}')" style="display: flex; align-items: center; gap: 20px; margin-bottom: 24px">
                            <div class="meal-mini-img-v2" style="width: 80px; height: 80px; border-radius: 24px; overflow: hidden; background: #f8f9f8">
                                ${m.img ? `<img src="${m.img}" style="width: 100%; height: 100%; object-fit: cover">` : `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:32px">${m.icon}</div>`}
                            </div>
                            <div style="flex: 1">
                                <span class="label-xs" style="color: var(--primary); opacity: 0.5">${m.type}</span>
                                <h4 style="font-size: 18px; margin: 4px 0">${m.name}</h4>
                                <div style="display: flex; font-size: 11px; opacity: 0.4; font-weight: 700; gap: 8px">
                                    <span>${m.macros.kcal} kcal | ${m.macros.protein}g P | ${m.macros.carbs}g C</span>
                                </div>
                            </div>
                            <div style="opacity: 0.2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderGrocery() {
    return `
        <div class="screen">
            <header class="header-minimal">
                <h3 style="font-size: 24px">Groceries</h3>
            </header>
            <div style="padding: 24px">
                <div class="bento-item col-4" style="background: white; border: 1px solid rgba(0,0,0,0.03); padding: 32px">
                    <span class="label-xs" style="color: var(--primary)">Weekly Essentials</span>
                    <div style="margin-top: 24px">
                        ${['Beans (Honey Beans)', 'Croaker Fish', 'Spinach', 'Oats', 'Onions'].map(item => `
                            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #f0f0f0">
                                <div style="display: flex; align-items: center; gap: 12px">
                                    <div style="width: 20px; height: 20px; border: 2px solid #ddd; border-radius: 6px"></div>
                                    <span style="font-size: 15px; font-weight: 500">${item}</span>
                                </div>
                                <span style="font-size: 12px; opacity: 0.4">1 Unit</span>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary" style="margin-top: 32px; width: 100%; border-radius: 20px">Order via Partner</button>
                </div>
            </div>
        </div>
    `;
}

function renderSpecialists() {
    return `
        <div class="screen">
            <header class="header-minimal">
                <h3 style="font-size: 24px">Care Team</h3>
            </header>
            <div style="padding: 24px">
                <div class="bento-grid">
                    <div class="bento-item col-4" style="display: flex; align-items: center; gap: 20px">
                        <div style="width: 56px; height: 56px; background: #E0F2FE; color: #0369A1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800">SC</div>
                        <div style="flex: 1">
                            <h4 style="font-size: 18px">Dr. Sarah Cole</h4>
                            <p style="font-size: 13px; opacity: 0.5">Clinical Dietitian</p>
                        </div>
                        <button style="background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: 12px; font-size: 13px; font-weight: 700">Chat</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderSpecialistPortal() {
    return `
        <div class="screen professional-portal" style="background: #F8F9F8">
            <header style="padding: 40px 24px; background: white; border-bottom: 1px solid #f0f0f0">
                <span class="label-xs">Professional Portal</span>
                <h2 style="font-size: 32px">Patient Management</h2>
            </header>
            
            <div style="padding: 24px">
                <div class="bento-grid">
                    <div class="bento-item col-2" style="background: white">
                        <span class="label-xs">Active Patients</span>
                        <h3 style="font-size: 28px; margin-top: 8px">12</h3>
                    </div>
                    <div class="bento-item col-2" style="background: white">
                        <span class="label-xs">Pending Reviews</span>
                        <h3 style="font-size: 28px; margin-top: 8px; color: var(--accent-red)">3</h3>
                    </div>
                    
                    <div class="bento-item col-4" style="background: white">
                        <h4 style="margin-bottom: 20px">Priority Cases</h4>
                        <div class="patient-row" style="display: flex; align-items: center; gap: 16px; padding: 16px; background: #FFF1F0; border-radius: 16px">
                            <div style="width: 40px; height: 40px; background: #FFDADA; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800">EB</div>
                            <div style="flex: 1">
                                <h5 style="font-size: 15px">Ella B.</h5>
                                <p style="font-size: 12px; opacity: 0.6">High Sodium Intake Detected</p>
                            </div>
                            <button style="background: white; border: 1px solid #ddd; padding: 8px 16px; border-radius: 10px; font-size: 12px; font-weight: 700">Action</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderAdminPortal() {
    return `
        <div class="screen professional-portal" style="background: #F0F4F8">
            <header style="padding: 40px 24px; background: #1B3C35; color: white">
                <span class="label-xs" style="opacity: 0.6">System Administration</span>
                <h2 style="font-size: 32px">Global Insights</h2>
            </header>
            
            <div style="padding: 24px">
                <div class="bento-grid">
                    <div class="bento-item col-1" style="background: white">
                        <span class="label-xs">Users</span>
                        <h4 style="font-size: 18px; margin-top: 4px">1.2k</h4>
                    </div>
                    <div class="bento-item col-1" style="background: white">
                        <span class="label-xs">Pros</span>
                        <h4 style="font-size: 18px; margin-top: 4px">24</h4>
                    </div>
                    <div class="bento-item col-2" style="background: #E8F5E9">
                        <span class="label-xs" style="color: #2E7D32">Churn Rate</span>
                        <h4 style="font-size: 18px; margin-top: 4px; color: #2E7D32">0.8%</h4>
                    </div>
                    <div class="bento-item col-4" style="background: white">
                        <h4 style="margin-bottom: 16px">Revenue Forecast</h4>
                        <div style="height: 120px; background: #f8f9fa; border-radius: 12px; display: flex; align-items: flex-end; gap: 8px; padding: 12px">
                            ${[40, 60, 45, 80, 70, 90, 85].map(h => `<div style="flex:1; background:var(--primary); height:${h}%; border-radius:4px 4px 0 0; opacity:0.8"></div>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- ACTIONS ---

function navigateTo(screen) {
    userState.currentScreen = screen;
    render();
}

function switchRole(role) {
    userState.role = role;
    userState.showPrototypePills = false;
    render();
}

function togglePrototypePills() {
    userState.showPrototypePills = !userState.showPrototypePills;
    render();
}

function nextStep() {
    if (userState.onboardingStep === 0) {
        userState.name = document.getElementById('ob-name').value || 'User';
    } else if (userState.onboardingStep === 1) {
        userState.medicalProfile.condition = document.getElementById('ob-condition').value;
        const medsVal = document.getElementById('ob-meds').value;
        userState.medicalProfile.medications = medsVal ? medsVal.split(',').map(m => m.trim()) : [];
    }
    userState.onboardingStep++;
    render();
}

function finishOnboarding() {
    const cuisineElem = document.getElementById('ob-cuisine');
    if (cuisineElem) userState.medicalProfile.cuisine = cuisineElem.value;
    userState.currentScreen = 'home';
    render();
}

function selectDay(idx) {
    userState.selectedDay = idx;
    render();
}

function showMealDetails(mealName) {
    const plans = CUISINE_PLANS[userState.medicalProfile.cuisine][userState.medicalProfile.condition] || CUISINE_PLANS['Nigerian']['Diabetes'];
    let meal;
    plans.forEach(day => {
        const found = day.meals.find(m => m.name === mealName);
        if (found) meal = found;
    });

    const mealModal = document.getElementById('mealModal');
    mealModal.innerHTML = `
        <div class="modal-sheet">
            <div style="width:40px; height:4px; background:rgba(0,0,0,0.1); border-radius:2px; margin:0 auto 24px"></div>
            
            ${meal.img ? `<img src="${meal.img}" class="modal-meal-img" alt="Meal">` : ''}

            <span class="label-xs" style="color:var(--primary)">Detailed Nutrition</span>
            <h2 style="font-size:32px; margin:8px 0">${meal.name}</h2>
            <p style="opacity:0.6; font-size:14px; margin-bottom:32px">Verified clinical breakdown for your ${userState.medicalProfile.condition} plan.</p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap:12px; margin-bottom:32px">
                <div style="background:rgba(27,60,53,0.05); padding:20px; border-radius:24px; text-align:center">
                    <div style="font-weight:800; font-size:18px; color:var(--primary)">${meal.macros.protein}g</div>
                    <div class="label-xs" style="font-size:9px">Protein</div>
                </div>
                <div style="background:rgba(212,175,55,0.05); padding:20px; border-radius:24px; text-align:center">
                    <div style="font-weight:800; font-size:18px; color:var(--accent-gold)">${meal.macros.carbs}g</div>
                    <div class="label-xs" style="font-size:9px">Carbs</div>
                </div>
                <div style="background:rgba(142,145,143,0.05); padding:20px; border-radius:24px; text-align:center">
                    <div style="font-weight:800; font-size:18px; color:#8E918F">${meal.macros.fats}g</div>
                    <div class="label-xs" style="font-size:9px">Fats</div>
                </div>
            </div>

            <h4 style="font-size:18px; margin-bottom:12px">Ingredients</h4>
            <div style="display:flex; flex-wrap:wrap; gap:8px">
                ${(meal.ingredients || []).map(ing => `<span style="background:rgba(27,60,53,0.05); padding:8px 16px; border-radius:100px; font-size:13px; font-weight:600">${ing}</span>`).join('')}
            </div>

            <button class="primary-btn" onclick="closeMealModal()">Dismiss</button>
        </div>
    `;
    mealModal.classList.add('show');
}

function closeMealModal() {
    document.getElementById('mealModal').classList.remove('show');
}

// Add event listener for clicking outside the modal
document.getElementById('mealModal').addEventListener('click', (e) => {
    if (e.target.id === 'mealModal') closeMealModal();
});

function renderProfile() {
    return `
        <div class="screen">
            <header class="header-minimal">
                <h3 style="font-size: 24px">Account</h3>
            </header>
            <div class="bento-grid">
                <div class="bento-item col-4" style="display:flex; align-items:center; gap:20px">
                    <div style="width:64px; height:64px; background:var(--primary); color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:800">${userState.name[0]}</div>
                    <div>
                        <h4 style="font-size:20px">${userState.name}</h4>
                        <p style="opacity:0.5; font-size:13px">Premium Member</p>
                    </div>
                </div>
                <div class="bento-item col-4">
                    <span class="label-xs">Active Program</span>
                    <h4 style="margin-top:4px">${userState.medicalProfile.condition} (Nigerian Cuisine)</h4>
                </div>
                <div class="bento-item col-2" onclick="switchRole('admin')" style="background:#F0F7FF">
                    <span class="label-xs" style="color:#007AFF">Support</span>
                    <p style="font-size:13px; margin-top:4px; font-weight:600; color:#007AFF">Talk to us</p>
                </div>
                <div class="bento-item col-2" onclick="location.reload()" style="background:#FFF1F0">
                    <span class="label-xs" style="color:var(--accent-red)">System</span>
                    <p style="font-size:13px; margin-top:4px; font-weight:600; color:var(--accent-red)">Sign Out</p>
                </div>
            </div>
        </div>
    `;
}

// --- BOOTSTRAP ---
render();
