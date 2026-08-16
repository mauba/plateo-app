import type { Recipe } from '../services/spoonacular';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RecipeStackParamList = {
  RecipeSearch: undefined;
  RecipeDetail: { recipe: Recipe };
};

export type MainTabParamList = {
  RecipeSearch: undefined;
  MealPlan: undefined;
  ShoppingList: undefined;
  Profile: undefined;
};
