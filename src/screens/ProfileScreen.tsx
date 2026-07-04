import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import { colors, spacing, fontSize } from '../constants/theme';
import { useLocale } from '../i18n';
import type { SupportedLocale } from '../i18n/types';

export function ProfileScreen() {
  const { t, locale, setLocale } = useLocale();

  async function handleLogout() {
    Alert.alert(
      t.profile_logoutAlertTitle,
      t.profile_logoutAlertMessage,
      [
        { text: t.profile_logoutAlertCancel, style: 'cancel' },
        {
          text: t.profile_logoutButton,
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.profile_title}</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>{t.profile_placeholder}</Text>
      </View>
      <View style={styles.languageSection}>
        <Text style={styles.languageHeading}>{t.profile_languageHeading}</Text>
        <View style={styles.languageRow}>
          {(['es', 'en'] as SupportedLocale[]).map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[styles.langButton, locale === lang && styles.langButtonActive]}
              onPress={() => setLocale(lang)}
            >
              <Text style={[styles.langButtonText, locale === lang && styles.langButtonTextActive]}>
                {lang === 'es' ? t.profile_languageEs : t.profile_languageEn}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>{t.profile_logoutButton}</Text>
      </TouchableOpacity>
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
  languageSection: {
    marginTop: spacing.lg,
  },
  languageHeading: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  languageRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  langButton: {
    flex: 1,
    borderRadius: 8,
    padding: spacing.sm,
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
  },
  langButtonActive: {
    backgroundColor: colors.primary,
  },
  langButtonText: {
    fontSize: fontSize.md,
    color: colors.textLight,
    fontWeight: '600',
  },
  langButtonTextActive: {
    color: colors.white,
  },
  logoutButton: {
    backgroundColor: colors.error,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  logoutText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
