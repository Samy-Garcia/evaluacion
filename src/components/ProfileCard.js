import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

/**
 * Tarjeta reutilizable para mostrar un dato del perfil del usuario.
 * Props: icon (emoji o texto corto), label, value
 */
export function InfoCard({ label, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '—'}</Text>
    </View>
  );
}

/**
 * Encabezado del perfil con foto circular.
 * Props: imageUrl, name
 */
export function ProfileHeader({ imageUrl, name }) {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : { uri: 'https://placehold.co/200x200?text=Foto' }
        }
        style={styles.avatar}
      />
      <Text style={styles.name}>{name || 'Usuario'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: colors.secondary,
    marginBottom: 12,
    backgroundColor: colors.border,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
});
