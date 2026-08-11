import { searchRecipes } from '../spoonacular';

const mockFetch = jest.fn();
(globalThis as unknown as { fetch: jest.Mock }).fetch = mockFetch;

describe('searchRecipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns mapped recipes from the API', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            id: 1,
            title: 'Pasta',
            image: 'https://example.com/pasta.jpg',
            nutrition: {
              nutrients: [{ name: 'Calories', amount: 450, unit: 'kcal' }],
            },
          },
        ],
      }),
    });

    const recipes = await searchRecipes('pasta');

    expect(recipes).toHaveLength(1);
    expect(recipes[0]).toEqual({
      id: 1,
      title: 'Pasta',
      image: 'https://example.com/pasta.jpg',
      calories: 450,
    });
  });

  it('returns undefined calories when nutrition is absent', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ id: 2, title: 'Soup', image: 'soup.jpg' }],
      }),
    });

    const recipes = await searchRecipes('soup');

    expect(recipes[0].calories).toBeUndefined();
  });

  it('returns undefined calories when Calories nutrient is missing', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            id: 3,
            title: 'Salad',
            image: 'salad.jpg',
            nutrition: {
              nutrients: [{ name: 'Fat', amount: 5, unit: 'g' }],
            },
          },
        ],
      }),
    });

    const recipes = await searchRecipes('salad');

    expect(recipes[0].calories).toBeUndefined();
  });

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 401 });

    await expect(searchRecipes('test')).rejects.toThrow('Spoonacular error: 401');
  });

  it('returns empty array when results is empty', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    const recipes = await searchRecipes('xyznotarecipe');

    expect(recipes).toHaveLength(0);
  });
});
