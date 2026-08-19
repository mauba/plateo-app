-- Plateo initial schema

CREATE TABLE households (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  created_by  UUID NOT NULL REFERENCES auth.users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  household_id UUID REFERENCES households(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE user_preferences (
  user_id            UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  household_size     SMALLINT,
  has_children       BOOLEAN,
  is_vegetarian      BOOLEAN NOT NULL DEFAULT false,
  high_protein       BOOLEAN NOT NULL DEFAULT false,
  budget_conscious   BOOLEAN NOT NULL DEFAULT false,
  max_cook_minutes   SMALLINT,
  favourite_cuisines TEXT[]
);

CREATE TABLE ingredients (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL UNIQUE,
  category     TEXT NOT NULL,
  default_unit TEXT
);

CREATE TABLE recipes (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spoonacular_id INT UNIQUE,
  title          TEXT NOT NULL,
  image_url      TEXT,
  servings       SMALLINT,
  prep_time_min  SMALLINT,
  cook_time_min  SMALLINT,
  difficulty     TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  calories       INT,
  protein_g      NUMERIC(5,1),
  carbs_g        NUMERIC(5,1),
  fat_g          NUMERIC(5,1),
  cuisine        TEXT,
  tags           TEXT[],
  instructions   JSONB,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE recipe_ingredients (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id     UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id),
  quantity      NUMERIC(8,2),
  unit          TEXT,
  notes         TEXT,
  UNIQUE (recipe_id, ingredient_id)
);

CREATE TABLE meal_plans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  household_id    UUID REFERENCES households(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (
    (user_id IS NOT NULL AND household_id IS NULL) OR
    (user_id IS NULL     AND household_id IS NOT NULL)
  ),
  UNIQUE (user_id, week_start_date),
  UNIQUE (household_id, week_start_date)
);

CREATE TABLE meal_plan_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
  recipe_id    UUID NOT NULL REFERENCES recipes(id),
  day_of_week  SMALLINT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
  meal_type    TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner')),
  UNIQUE (meal_plan_id, day_of_week, meal_type)
);

CREATE TABLE shopping_lists (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID NOT NULL UNIQUE REFERENCES meal_plans(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE shopping_list_items (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopping_list_id UUID NOT NULL REFERENCES shopping_lists(id) ON DELETE CASCADE,
  ingredient_id    UUID NOT NULL REFERENCES ingredients(id),
  name             TEXT NOT NULL,
  category         TEXT NOT NULL,
  quantity         NUMERIC(8,2),
  unit             TEXT,
  checked          BOOLEAN NOT NULL DEFAULT false
);

-- Indexes
CREATE INDEX ON recipes USING GIN (tags);
CREATE INDEX ON recipes (cuisine);
CREATE INDEX ON recipes (cook_time_min);

CREATE INDEX ON shopping_list_items (shopping_list_id, category);
CREATE INDEX ON shopping_list_items (shopping_list_id, checked);

CREATE INDEX ON meal_plans (user_id, week_start_date);
CREATE INDEX ON meal_plans (household_id, week_start_date);
