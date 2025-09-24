import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getPatioById } from '../../api/apiService';
import { Ionicons } from '@expo/vector-icons';
import MotoCard from '../../components/MotoCard'; // Reutilizando nosso componente de card de moto

export default function PatioDetailsScreen({ route, navigation }) {
  const { patio } = route.params;
  const patioId = patio.id;

  const { colors } = useTheme();
  const { t } = useTranslation();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['patio', patioId],
    queryFn: () => getPatioById(patioId).then(response => response.data),
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

  const patioData = data || patio;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.content}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={colors.primary} />
                <Text style={[styles.backText, { color: colors.primary }]}>{t('voltar')}</Text>
            </TouchableOpacity>

            <Text style={[styles.title, { color: colors.primary }]}>{patioData.nome}</Text>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, {color: colors.text}]}>Motos neste Pátio ({patioData.motos?.length || 0})</Text>
                {patioData.motos && patioData.motos.length > 0 ? (
                    <FlatList
                        data={patioData.motos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <MotoCard item={item} onPress={() => navigation.navigate('Motos', { screen: 'MotoDetails', params: { moto: item }}) } />}
                        scrollEnabled={false}
                    />
                ) : (
                    <Text style={{color: colors.textSecondary, textAlign: 'center', marginTop: 20}}>Não há motos neste pátio.</Text>
                )}
            </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
    backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    backText: { fontSize: 18, marginLeft: 8 },
    title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
    errorText: { textAlign: 'center', fontSize: 16 },
    section: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
});