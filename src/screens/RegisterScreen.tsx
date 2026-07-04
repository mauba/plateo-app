import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { supabase } from '../services/supabase';
import { colors, spacing, fontSize } from '../constants/theme';
import { AuthStackParamList } from '../types/navigation';
import { useLocale } from '../i18n';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email || !password || !confirmPassword) {
      Alert.alert(t.common_error, t.register_errorEmptyFields);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t.common_error, t.register_errorPasswordMismatch);
      return;
    }

    if (password.length < 6) {
      Alert.alert(t.common_error, t.register_errorPasswordLength);
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(t.common_error, error.message);
    } else {
      Alert.alert(
        t.register_successTitle,
        t.register_successMessage,
        [{ text: t.common_ok, onPress: () => navigation.navigate('Login') }]
      );
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.logo}>Plateo</Text>
          <Text style={styles.subtitle}>{t.register_subtitle}</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={t.register_emailPlaceholder}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={colors.textLight}
            />
            <TextInput
              style={styles.input}
              placeholder={t.register_passwordPlaceholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={colors.textLight}
            />
            <TextInput
              style={styles.input}
              placeholder={t.register_confirmPasswordPlaceholder}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor={colors.textLight}
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? t.register_buttonLoading : t.register_button}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.linkText}>
                {t.register_hasAccount}{' '}
                <Text style={styles.linkTextBold}>{t.register_loginLink}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xl,
    fontWeight: '600',
  },
  form: {
    gap: spacing.md,
  },
  input: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  linkText: {
    color: colors.textLight,
    fontSize: fontSize.md,
  },
  linkTextBold: {
    color: colors.primary,
    fontWeight: '600',
  },
});
