import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPatios, deletePatio } from '../../api/apiService';
import { Ionicons } from '@expo/vector-icons';

const PatioItem = ({ item, colors, navigation, onDelete }) => (
  <View style={[styles.card, { backgroundColor: colors.card }]}>
    <TouchableOpacity
      style={styles.infoContainer}
      onPress={() => navigation.navigate('PatioDetails', { patio: item })}
    >
      <Text style={[styles.patioNome, { color: colors.text }]}>{item.nome}</Text>
      <Text style={[styles.patioInfo, { color: colors.textSecondary }]}>
        {item.motos?.length || 0} motos neste pátio
      </Text>
    </TouchableOpacity>
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={[styles.buttonIcon, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('PatioForm', { patioParaEditar: item })}
      >
        <Ionicons name="pencil" size={20} color={colors.buttonText} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonIcon, { backgroundColor: colors.danger, marginLeft: 10 }]}
        onPress={onDelete}
      >
        <Ionicons name="trash" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function PatiosListScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['patios'],
    queryFn: async () => {
      const response = await getPatios();
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (patioId) => deletePatio(patioId),
    onSuccess: () => {
      Alert.alert('Sucesso', 'Pátio excluído com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['patios'] });
    },
    onError: (err) => {
      Alert.alert('Erro', `Não foi possível excluir o pátio: ${err.message}`);
    },
  });

  const handleDelete = (patioId) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este pátio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => deleteMutation.mutate(patioId) },
      ]
    );
  };

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
          Erro ao carregar pátios: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>{t('patios')}</Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('PatioForm')}
        >
          <Ionicons name="add" size={24} color={colors.buttonText} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PatioItem
            item={item}
            colors={colors}
            navigation={navigation}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        onRefresh={refetch}
        refreshing={isFetching || deleteMutation.isPending}
        ListEmptyComponent={
          <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>
            Nenhum pátio encontrado.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
  },
  title: { fontSize: 28, fontWeight: 'bold' },
  addButton: { padding: 8, borderRadius: 50 },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: { flex: 1 },
  patioNome: { fontSize: 18, fontWeight: 'bold' },
  patioInfo: { fontSize: 14, marginTop: 5 },
  buttonsContainer: { flexDirection: 'row' },
  buttonIcon: { padding: 8, borderRadius: 8 },
  errorText: { textAlign: 'center', fontSize: 16 },
});