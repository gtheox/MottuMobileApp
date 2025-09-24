import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function MotoCard({ moto, onPress }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View>
        <Text style={[styles.modelo, { color: colors.text }]}>{moto.modelo}</Text>
        <Text style={[styles.placa, { color: colors.primary }]}>{moto.placa}</Text>
        <Text style={[styles.status, { color: colors.textSecondary }]}>Status: {moto.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  modelo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placa: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  status: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 8,
  },
});