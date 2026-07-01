import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../constants/theme';

export function MealPlanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan de Comidas</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          Aquí podrás ver y editar tu plan de comidas semanal
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: spacing.lg,
  },
  placeholderText: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: 'center',
  },
});
