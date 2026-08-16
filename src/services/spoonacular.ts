const BASE_URL = 'https://api.spoonacular.com';
const API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY ?? '';

export type Recipe = {
  id: number;
  title: string;
  image: string;
  calories?: number;
};

export type RecipeDetails = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: { id: number; original: string }[];
  analyzedInstructions: { name: string; steps: { number: number; step: string }[] }[];
  calories?: number;
};

type NutritionNutrient = {
  name: string;
  amount: number;
  unit: string;
};

type SpoonacularResult = {
  id: number;
  title: string;
  image: string;
  nutrition?: {
    nutrients: NutritionNutrient[];
  };
};

type SearchResponse = {
  results: SpoonacularResult[];
};

type RecipeInfoResponse = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: { id: number; original: string }[];
  analyzedInstructions: { name: string; steps: { number: number; step: string }[] }[];
  nutrition?: { nutrients: NutritionNutrient[] };
};

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const params = new URLSearchParams({
    query,
    number: '10',
    addRecipeNutrition: 'true',
    apiKey: API_KEY,
  });

  const response = await fetch(`${BASE_URL}/recipes/complexSearch?${params}`);
  if (!response.ok) {
    throw new Error(`Spoonacular error: ${response.status}`);
  }

  const data: SearchResponse = await response.json();

  return data.results.map(r => ({
    id: r.id,
    title: r.title,
    image: r.image,
    calories: r.nutrition?.nutrients.find(n => n.name === 'Calories')?.amount,
  }));
}

export async function getRecipeDetails(id: number): Promise<RecipeDetails> {
  const params = new URLSearchParams({
    includeNutrition: 'true',
    apiKey: API_KEY,
  });

  const response = await fetch(`${BASE_URL}/recipes/${id}/information?${params}`);
  if (!response.ok) {
    throw new Error(`Spoonacular error: ${response.status}`);
  }

  const data: RecipeInfoResponse = await response.json();

  return {
    id: data.id,
    title: data.title,
    image: data.image,
    readyInMinutes: data.readyInMinutes,
    servings: data.servings,
    extendedIngredients: data.extendedIngredients,
    analyzedInstructions: data.analyzedInstructions,
    calories: data.nutrition?.nutrients.find(n => n.name === 'Calories')?.amount,
  };
}
