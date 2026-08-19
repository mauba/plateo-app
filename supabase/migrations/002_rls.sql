-- Row Level Security policies (MVP: solo users only)
-- Household-scoped policies are added in Week 10 without schema changes.

ALTER TABLE users               ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences    ENABLE ROW LEVEL SECURITY;
ALTER TABLE households          ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients         ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes             ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients  ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans          ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plan_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_lists      ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_list_items ENABLE ROW LEVEL SECURITY;

-- users
CREATE POLICY "users: own row" ON users
  FOR ALL USING (id = auth.uid());

-- user_preferences
CREATE POLICY "user_preferences: own row" ON user_preferences
  FOR ALL USING (user_id = auth.uid());

-- households: creator manages, members read
CREATE POLICY "households: creator manages" ON households
  FOR ALL USING (created_by = auth.uid());

CREATE POLICY "households: member reads" ON households
  FOR SELECT USING (
    id IN (SELECT household_id FROM users WHERE id = auth.uid())
  );

-- ingredients: public read, no user write
CREATE POLICY "ingredients: public read" ON ingredients
  FOR SELECT USING (true);

-- recipes: public read, no user write
CREATE POLICY "recipes: public read" ON recipes
  FOR SELECT USING (true);

-- recipe_ingredients: public read, no user write
CREATE POLICY "recipe_ingredients: public read" ON recipe_ingredients
  FOR SELECT USING (true);

-- meal_plans: own user_id plans (household policies added Week 10)
CREATE POLICY "meal_plans: own" ON meal_plans
  FOR ALL USING (user_id = auth.uid());

-- meal_plan_items: scoped through meal_plans
CREATE POLICY "meal_plan_items: own" ON meal_plan_items
  FOR ALL USING (
    meal_plan_id IN (
      SELECT id FROM meal_plans WHERE user_id = auth.uid()
    )
  );

-- shopping_lists: scoped through meal_plans
CREATE POLICY "shopping_lists: own" ON shopping_lists
  FOR ALL USING (
    meal_plan_id IN (
      SELECT id FROM meal_plans WHERE user_id = auth.uid()
    )
  );

-- shopping_list_items: scoped through shopping_lists -> meal_plans
CREATE POLICY "shopping_list_items: own" ON shopping_list_items
  FOR ALL USING (
    shopping_list_id IN (
      SELECT sl.id FROM shopping_lists sl
      JOIN meal_plans mp ON sl.meal_plan_id = mp.id
      WHERE mp.user_id = auth.uid()
    )
  );
