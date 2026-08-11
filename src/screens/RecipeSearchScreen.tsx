import { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { colors, spacing, fontSize } from '../constants/theme';
import { useLocale } from '../i18n';
import { searchRecipes, Recipe } from '../services/spoonacular';

export function RecipeSearchScreen() {
  const { t } = useLocale();
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    const trimmed = query.trim();
    if (!trimmed) return;

    setSubmittedQuery(trimmed);
    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const results = await searchRecipes(trimmed);
      setRecipes(results);
    } catch {
      setError(t.recipes_errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function renderContent() {
    if (loading) {
      return <ActivityIndicator size="large" color={colors.primary} style={styles.centered} />;
    }
    if (error) {
      return <Text style={styles.centeredText}>{error}</Text>;
    }
    if (submittedQuery && recipes.length === 0) {
      return <Text style={styles.centeredText}>{t.recipes_noResults}</Text>;
    }
    if (!submittedQuery) {
      return <Text style={styles.hint}>{t.recipes_hint}</Text>;
    }
    return (
      <FlatList
        data={recipes}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        contentContainerStyle={styles.list}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder={t.recipes_searchPlaceholder}
        placeholderTextColor={colors.textLight}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      {renderContent()}
    </View>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: recipe.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>{recipe.title}</Text>
        {recipe.calories !== undefined && (
          <Text style={styles.cardCalories}>{Math.round(recipe.calories)} kcal</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  input: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    color: colors.text,
    marginBottom: spacing.md,
  },
  centered: {
    marginTop: spacing.xl,
  },
  centeredText: {
    marginTop: spacing.xl,
    textAlign: 'center',
    color: colors.textLight,
    fontSize: fontSize.md,
  },
  hint: {
    marginTop: spacing.xl,
    textAlign: 'center',
    color: colors.textLight,
    fontSize: fontSize.md,
  },
  list: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardBody: {
    padding: spacing.md,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardCalories: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
});
