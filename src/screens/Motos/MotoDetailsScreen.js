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
import MapView, { Marker } from 'react-native-maps'; // 1. Importar o mapa

export default function MotoDetailsScreen({ route, navigation }) {
  const { moto } = route.params;
  const motoId = moto.id;

  const { colors } = useTheme();
  const { t } = useTranslation();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['moto', motoId],
    queryFn: () => getMotoById(motoId).then(response => response.data),
  });

  if (isLoading) { /* ... (código de loading) ... */ }
  if (isError) { /* ... (código de erro) ... */ }

  const motoData = data || moto;

  // Formata a data para exibição
  const formatarData = (data) => {
    if (!data) return 'N/A';
    return new Date(data).toLocaleString('pt-BR');
  };

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
        </View>

        {/* 2. Seção do Mapa e Telemetria */}
        <View style={[styles.card, { backgroundColor: colors.card, marginTop: 20 }]}>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>Localização em Tempo Real</Text>
            {motoData.latitude && motoData.longitude ? (
                <>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: motoData.latitude,
                            longitude: motoData.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: motoData.latitude, longitude: motoData.longitude }}
                            title={motoData.placa}
                        />
                    </MapView>
                    <View style={[styles.infoRow, {borderBottomWidth: 0, marginTop: 10}]}>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>Última Atualização:</Text>
                        <Text style={[styles.value, { color: colors.text }]}>{formatarData(motoData.ultimaAtualizacaoLocalizacao)}</Text>
                    </View>
                </>
            ) : (
                <Text style={[styles.value, { color: colors.textSecondary, textAlign: 'center' }]}>
                    Nenhuma localização registrada para esta moto.
                </Text>
            )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    // ... (estilos anteriores) ...
    map: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
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
      padding: 20,
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