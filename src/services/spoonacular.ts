const BASE_URL = 'https://api.spoonacular.com';
const API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY ?? '';

export type Recipe = {
  id: number;
  title: string;
  image: string;
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
