import { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, fontSize } from '../constants/theme';
import { useLocale } from '../i18n';
import { searchRecipes, Recipe } from '../services/spoonacular';
import type { RecipeStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RecipeStackParamList, 'RecipeList'>;

export function RecipeSearchScreen({ navigation }: Props) {
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

  function renderEmpty() {
    if (loading) {
      return <ActivityIndicator size="large" color={colors.primary} style={styles.centered} />;
    }
    if (error) {
      return <Text style={styles.centeredText}>{error}</Text>;
    }
    if (submittedQuery) {
      return <Text style={styles.centeredText}>{t.recipes_noResults}</Text>;
    }
    return <Text style={styles.hint}>{t.recipes_hint}</Text>;
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
      <FlatList
        data={recipes}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={() => navigation.navigate('RecipeDetail', { recipe: item })} />
        )}
        ListEmptyComponent={renderEmpty}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

function RecipeCard({ recipe, onPress }: { recipe: Recipe; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: recipe.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>{recipe.title}</Text>
        {recipe.calories !== undefined && (
          <Text style={styles.cardCalories}>{Math.round(recipe.calories)} kcal</Text>
        )}
      </View>
    </TouchableOpacity>
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
    flex: 1,
  },
  listContent: {
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
