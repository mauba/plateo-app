# Plateo - Product Roadmap

## Product Vision

**Plateo creates a personalized weekly meal plan and automatically generates the grocery list.**

### MVP answers these questions in under 60 seconds

- What are we eating this week?
- What do I need to buy?

Everything else can come later.
- How long will it take to cook? (later)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Mobile | Expo + TypeScript |
| Backend | Supabase (authentication, PostgreSQL, storage, serverless functions) |
| Navigation | React Navigation |
| Server state | TanStack Query (API/data fetching) |
| Client state | Zustand (local app state) |
| Payments | RevenueCat (premium tier) |
| Deployment | Expo EAS |

### Spoonacular rule

No screen in the app depends on Spoonacular being online.

Every recipe that enters Plateo is copied into Supabase and becomes an internal object. The app queries Supabase only. Spoonacular is a one-time import tool, not a runtime dependency. This keeps costs low, improves performance, and makes Spoonacular replaceable without rebuilding the app.

### Cost Structure (scales with users)
- **Supabase**: Free up to 500MB DB, 50K MAU → $25/mo at scale
- **Spoonacular**: Free 150 req/day → used for initial seeding only, not runtime calls

---

## Month 1: Build the core product

### Week 1: Foundation

**Deliverables**
- [x] App setup (Expo + React Native + TypeScript)
- [x] Authentication (email)
- [x] Basic navigation (Auth stack ↔ Main tabs)
- [x] User profile screen
- [x] i18n (EN/ES with runtime switching)

### Week 2: Data model

Design the database before building AI features.

| Table | Purpose |
|-------|---------|
| users | User profile |
| households | Family/group |
| recipes | Recipe metadata |
| ingredients | Ingredient catalog |
| recipe_ingredients | Recipe composition |
| meal_plans | Weekly plans |
| meal_plan_items | Breakfast/lunch/dinner assignments |
| shopping_lists | Generated grocery list |

Recipe fields to keep simple: name, servings, prep time, cook time, difficulty, calories, protein/carbs/fat, cuisine, tags.

- [x] Design and create Supabase schema
- [x] Enable RLS (Row Level Security) Policy
- [x] Set up TanStack Query
- [x] Set up Zustand

### Week 3: Recipe library

Do not start with AI-generated recipes. Seed the app with 100–200 curated recipes.

Categories to cover:
- 15-minute meals
- Family dinners
- Vegetarian
- High-protein
- Pasta
- Rice dishes
- Chicken
- Fish
- Soups
- Salads

- [ ] Build Supabase importer: pull ~500 Mediterranean and family-friendly recipes from Spoonacular in one weekend, store in Supabase
- [ ] Recipe search screen querying Supabase (not Spoonacular at runtime)
- [ ] Recipe detail view

**Current progress**
- [x] Spoonacular runtime search screen (temporary — will be replaced once Supabase recipe table exists)
- [ ] Supabase importer script
- [ ] Migrate search to query Supabase
- [ ] Recipe detail view (ingredients, instructions, nutrition)
- [ ] Search filters (diet type, cuisine, max time)

### Week 4: Weekly planner

Build the main screen.

```
Week of Aug 17

Monday     Chicken stir-fry
Tuesday    Lentil soup
Wednesday  Salmon with vegetables
Thursday   Pasta carbonara
Friday     Homemade burgers
```

Allow:
- Regenerate a meal
- Swap meals
- Mark favourite recipes

- [ ] Weekly calendar view
- [ ] Add/swap/remove meals per day
- [ ] Persist meal plans per user (Supabase)

---

## Month 2: Make it useful

### Week 5: Grocery list generation

This is the first "wow" feature.

Aggregate ingredients across all recipes in the week's plan.

```
Shopping list

Vegetables       Protein
2 onions         800 g chicken breast
3 carrots        300 g salmon
1 kg tomatoes
```

Allow users to check items off.

- [ ] Auto-generate shopping list from meal plan
- [ ] Group by category (produce, protein, dairy…)
- [ ] Check-off items
- [ ] Persist list in Supabase

### Week 6: Preferences

Ask during onboarding:
- Household size
- Children? (yes/no)
- Vegetarian?
- High-protein?
- Budget-conscious?
- Max cooking time
- Favourite cuisines

Store and use to filter recipes.

- [ ] Onboarding flow
- [ ] Preference storage in Supabase
- [ ] Recipe filtering by preferences

### Week 7: AI meal planner

Now add AI. Use GPT through a Supabase Edge Function.

Prompt example:
> Create a 7-day dinner plan for a family of 4 with two children, max 30 minutes cooking time, Mediterranean cuisine, high protein, and avoid repeating the same main ingredient twice in a row.

**The AI must choose from the recipe database — not invent recipes.**

- [ ] Supabase Edge Function wrapping GPT
- [ ] "Generate my week" button
- [ ] AI-driven plan filtered by user preferences

### Week 8: Notifications

Simple reminders:
- "Tomorrow's dinner: Salmon with vegetables"
- "You're missing ingredients for tonight"

- [ ] Push notifications (Expo)
- [ ] Daily dinner reminder
- [ ] Missing-ingredient alert

---

## Month 3: Make people pay

### Week 9: Polish

- [ ] Loading states
- [ ] Empty states
- [ ] Icons and animations
- [ ] Typography
- [ ] Onboarding flow refinement

A polished app often beats a feature-rich one.

### Week 10: Premium tier

**Free**
- 1 meal plan per week
- Limited recipe library

**Premium (€4–8/month)**
- Unlimited meal plans
- AI personalisation
- Nutrition targets
- Export grocery list
- Household sharing

- [ ] Integrate RevenueCat
- [ ] Gate premium features
- [ ] Paywall screen

### Week 11: Beta launch

Recruit 20–50 real users. Ask families who cook regularly — not friends.

Track:
- Meal plans created
- Grocery lists opened
- Meals regenerated
- Weekly retention

- [ ] TestFlight / Google Play internal track
- [ ] Analytics (meal plans created, grocery lists opened, retention)

### Week 12: Iterate

Interview users. Ask:
- What did you expect?
- What frustrated you?
- When did you stop using it?
- Would you pay? Why or why not?

---

## Screen Roadmap

### MVP screens
- [x] Login / Register
- [ ] Onboarding
- [ ] Weekly Plan (main screen)
- [ ] Recipe Detail
- [ ] Shopping List
- [ ] Profile / Preferences

### V2 screens
- [ ] Pantry Inventory
- [ ] Nutrition Dashboard
- [ ] Calendar Sync
- [ ] Meal Prep Mode
- [ ] Household Collaboration
- [ ] Voice Assistant

---

## The one feature to obsess over

**Grocery list generation + meal-plan regeneration.**

A user should be able to:
1. Open the app.
2. Tap "Generate my week."
3. Tap "Send grocery list to my phone."

That is a complete value loop. Everything else — calories, macros, AI coaching, pantry scanning, barcode scanning — comes later.

---

## How to Run

```bash
cd /Users/miquel.auba/VSCode-projects/plateo-app

# 1. Create .env from template
cp .env.example .env
# Edit .env with your Supabase and Spoonacular credentials

# 2. Start dev server
pnpm start

# 3. Scan QR code with Expo Go app on your phone

# Run tests
pnpm test
```

---

## Related Resources
- GitHub: https://github.com/mauba/plateo-app
- Supabase docs: https://supabase.com/docs
- Spoonacular docs: https://spoonacular.com/food-api/docs
- Expo docs: https://docs.expo.dev/versions/v57.0.0/
- TanStack Query: https://tanstack.com/query/latest
- RevenueCat: https://www.revenuecat.com/docs
