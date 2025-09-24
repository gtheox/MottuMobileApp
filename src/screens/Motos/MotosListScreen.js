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
import { getMotos, deleteMoto } from '../../api/apiService';
import { Ionicons } from '@expo/vector-icons';

// Componente para um item da lista de motos
const MotoItem = ({ item, colors, navigation, onDelete }) => (
  <View style={[styles.card, { backgroundColor: colors.card }]}>
    <TouchableOpacity
      style={styles.infoContainer}
      onPress={() => navigation.navigate('MotoDetails', { moto: item })}
    >
      <Text style={[styles.motoModelo, { color: colors.text }]}>{item.modelo}</Text>
      <Text style={[styles.motoPlaca, { color: colors.primary }]}>{item.placa}</Text>
      <Text style={[styles.motoStatus, { color: colors.textSecondary }]}>{item.status}</Text>
    </TouchableOpacity>
    <View style={styles.buttonsContainer}>
        <TouchableOpacity
            style={[styles.buttonIcon, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('MotoForm', { motoParaEditar: item })}
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

export default function MotosListScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['motos'],
    queryFn: async () => {
      const response = await getMotos();
      return response.data; // A API retorna a lista de motos
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (motoId) => deleteMoto(motoId),
    onSuccess: () => {
      Alert.alert('Sucesso', 'Moto excluída com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['motos'] });
    },
    onError: (err) => {
      Alert.alert('Erro', `Não foi possível excluir a moto: ${err.message}`);
    },
  });

  const handleDelete = (motoId) => {
    Alert.alert(
      t('confirmarExclusao'),
      t('certezaExcluirMoto'),
      [
        { text: t('cancelar'), style: 'cancel' },
        { text: t('excluir'), style: 'destructive', onPress: () => deleteMutation.mutate(motoId) },
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
          Erro ao carregar os dados: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>{t('catalogoDeMotos')}</Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('MotoForm')}
        >
          <Ionicons name="add" size={24} color={colors.buttonText} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <MotoItem
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
            <Text style={{color: colors.textSecondary, textAlign: 'center'}}>{t('nenhumaMotoEncontrada')}</Text>
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
  motoModelo: { fontSize: 18, fontWeight: 'bold' },
  motoPlaca: { fontSize: 16, fontWeight: '600', marginTop: 5 },
  motoStatus: { fontSize: 14, fontStyle: 'italic', marginTop: 5 },
  buttonsContainer: { flexDirection: 'row' },
  buttonIcon: { padding: 8, borderRadius: 8 },
  errorText: { textAlign: 'center', fontSize: 16 },
});