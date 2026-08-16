import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, fontSize } from '../constants/theme';
import { useLocale } from '../i18n';
import { getRecipeDetails, RecipeDetails } from '../services/spoonacular';
import type { RecipeStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RecipeStackParamList, 'RecipeDetail'>;

export function RecipeDetailScreen({ route }: Props) {
  const { recipe } = route.params;
  const { t } = useLocale();
  const [details, setDetails] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRecipeDetails(recipe.id)
      .then(setDetails)
      .catch(() => setError(t.recipeDetail_errorMessage))
      .finally(() => setLoading(false));
  }, [recipe.id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !details) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? t.recipeDetail_errorMessage}</Text>
      </View>
    );
  }

  const calories = details.calories ?? recipe.calories;
  const steps = details.analyzedInstructions.flatMap(instruction => instruction.steps);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: details.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{details.title}</Text>
        <View style={styles.meta}>
          {calories !== undefined && (
            <View style={styles.metaChip}>
              <Text style={styles.metaText}>{Math.round(calories)} {t.recipeDetail_calories}</Text>
            </View>
          )}
          <View style={styles.metaChip}>
            <Text style={styles.metaText}>{details.readyInMinutes} {t.recipeDetail_readyIn}</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={styles.metaText}>{details.servings} {t.recipeDetail_servings}</Text>
          </View>
        </View>

        {details.extendedIngredients.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>{t.recipeDetail_ingredients}</Text>
            {details.extendedIngredients.map((ing, index) => (
              <Text key={index} style={styles.ingredient}>• {ing.original}</Text>
            ))}
          </>
        )}

        {steps.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>{t.recipeDetail_instructions}</Text>
            {steps.map(step => (
              <View key={step.number} style={styles.step}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepNumber}>{step.number}</Text>
                </View>
                <Text style={styles.stepText}>{step.step}</Text>
              </View>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  image: {
    width: '100%',
    height: 250,
  },
  body: {
    padding: spacing.md,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  metaChip: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  metaText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  ingredient: {
    fontSize: fontSize.md,
    color: colors.text,
    paddingVertical: spacing.xs,
  },
  step: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNumber: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.white,
  },
  stepText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
  },
});
