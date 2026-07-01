import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import { colors, spacing, fontSize } from '../constants/theme';

export function ProfileScreen() {
  async function handleLogout() {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
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
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          Aquí podrás configurar tus preferencias dietéticas y datos personales
        </Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
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
