# Plateo - Project Roadmap

## Project Overview

**Plateo** is a meal planning app that helps individuals and families plan weekly/monthly menus, generate shopping lists, and maintain nutritional balance.

### Tech Stack
| Layer | Technology |
|-------|------------|
| Mobile | React Native + Expo + TypeScript |
| Backend | Supabase (Postgres, Auth, Edge Functions) |
| Nutrition Data | Spoonacular API |
| Deployment | Expo EAS |

### Cost Structure (scales with users)
- **Supabase**: Free up to 500MB DB, 50K MAU → $25/mo at scale
- **Spoonacular**: Free 150 req/day → $29/mo for 1,500 req/day

---

## Completed (2025-07-01)

### Session 1: Project Setup
- [x] Chose React Native + Expo over Flutter (TypeScript talent pool, code reuse potential)
- [x] Created Expo project with TypeScript template
- [x] Installed dependencies: Supabase, React Navigation, Secure Store
- [x] Set up folder structure (`src/screens`, `src/navigation`, `src/services`, etc.)
- [x] Implemented auth screens (Login, Register) with Supabase integration
- [x] Created placeholder screens (Home, MealPlan, ShoppingList, Profile)
- [x] Set up navigation (Auth stack ↔ Main tabs based on session)
- [x] Applied Plateo branding (green `#22c55e`, Spanish UI)
- [x] Initialized git repository
- [x] Pushed to GitHub: https://github.com/mauba/plateo-app

---

## Next Steps

### Phase 1: Environment Setup (Week 1-2)
- [x] Create Supabase project at https://supabase.com
- [x] Copy URL and anon key to `.env` file
- [x] Run app locally with `pnpm start` and test on phone via Expo Go
- [x] Test registration and login flow
- [ ] Enable email confirmation in Supabase (optional for dev)
- [ ] Fix confirmation email redirect URL — Supabase is configured with `http://localhost:3000` as the redirect, which is invalid for a mobile app. Needs a deep link URL scheme (e.g. `plateo://auth/confirm`) configured in both Supabase (Authentication → URL Configuration) and the Expo app (`app.json` scheme).

### Phase 2: Recipe Search (Week 3-5)
- [ ] Sign up for Spoonacular API at https://spoonacular.com/food-api
- [ ] Create recipe search screen
- [ ] Display recipe cards with image, title, nutrition summary
- [ ] Add recipe detail view (ingredients, instructions, nutrition)
- [ ] Implement search filters (diet type, cuisine, max time)

### Phase 3: Meal Planning (Week 6-9)
- [ ] Design database schema for meal plans (Supabase)
- [ ] Create weekly calendar view
- [ ] Allow adding recipes to specific days/meals
- [ ] Save meal plans per user
- [ ] Generate meal plan suggestions via Spoonacular API

### Phase 4: Shopping List (Week 10-12)
- [ ] Auto-generate shopping list from meal plan
- [ ] Group ingredients by category (produce, dairy, etc.)
- [ ] Allow manual additions and check-off
- [ ] Persist list in Supabase

### Phase 5: Polish & Deploy (Week 13-16)
- [ ] Add onboarding flow (dietary preferences, household size)
- [ ] Implement push notifications for meal reminders
- [ ] App icons and splash screen
- [ ] Build with Expo EAS
- [ ] Submit to App Store and Google Play

---

## Future Ideas (Post-MVP)
- Family sharing (multiple users, one household)
- Pantry tracking (what you already have)
- Recipe favorites and history
- WhatsApp/email delivery of weekly plans
- Integration with grocery delivery services
- Budget tracking per meal plan

---

## How to Run

```bash
cd /Users/miquel.auba/VSCode-projects/plateo-app

# 1. Create .env from template
cp .env.example .env
# Edit .env with your Supabase credentials

# 2. Start dev server
pnpm start

# 3. Scan QR code with Expo Go app on your phone
```

---

## Related Resources
- Landing page: `/Users/miquel.auba/CascadeProjects/plateo/`
- Supabase docs: https://supabase.com/docs
- Spoonacular docs: https://spoonacular.com/food-api/docs
- Expo docs: https://docs.expo.dev/versions/v57.0.0/
