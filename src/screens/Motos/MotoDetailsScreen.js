import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getMotoById } from '../../api/apiService';
import { Ionicons } from '@expo/vector-icons';

export default function MotoDetailsScreen({ route, navigation }) {
  const { moto } = route.params; // Recebe o objeto moto da tela anterior
  const motoId = moto.id;

  const { colors } = useTheme();
  const { t } = useTranslation();

  // Busca os dados detalhados da moto específica pela API
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['moto', motoId], // Chave única com o ID da moto
    queryFn: () => getMotoById(motoId).then(response => response.data),
  });

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', padding: 20 }]}>
        <Text style={[styles.errorText, { color: colors.danger }]}>
          Erro ao carregar detalhes: {error.message}
        </Text>
      </View>
    );
  }

  // Enquanto 'data' não carrega, usamos os dados básicos passados via 'route.params'
  const motoData = data || moto;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>{t('voltar')}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.primary }]}>{motoData.modelo}</Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Placa:</Text>
            <Text style={[styles.value, { color: colors.text }]}>{motoData.placa}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Status:</Text>
            <Text style={[styles.value, { color: colors.text }]}>{t(motoData.status.toLowerCase())}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Pátio:</Text>
            <Text style={[styles.value, { color: colors.text }]}>{motoData.nomePatio || 'N/A'}</Text>
          </View>
        </View>

        {/* Aqui podemos adicionar a lista de sensores e histórico de status no futuro */}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    marginLeft: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
      paddingHorizontal: 20,
      borderRadius: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2E2E' // Idealmente colors.border
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
  },
});