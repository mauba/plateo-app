import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../constants/theme';
import { useLocale } from '../i18n';

export function HomeScreen() {
  const { t } = useLocale();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{t.home_greeting}</Text>
      <Text style={styles.subtitle}>{t.home_subtitle}</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>{t.home_placeholder}</Text>
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
  greeting: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textLight,
    marginBottom: spacing.xl,
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
