import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // CORREÇÃO AQUI
import { createPatio, updatePatio } from '../../api/apiService';
import { Ionicons } from '@expo/vector-icons';
import ThemedButton from '../../components/ThemedButton';

export default function PatioFormScreen({ route, navigation }) {
  const patioParaEditar = route.params?.patioParaEditar;

  const { colors } = useTheme();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [nome, setNome] = useState('');

  useEffect(() => {
    if (patioParaEditar) {
      setNome(patioParaEditar.nome);
    }
  }, [patioParaEditar]);

  const mutation = useMutation({
    mutationFn: (patioData) => {
      if (patioParaEditar) {
        return updatePatio(patioParaEditar.id, patioData);
      } else {
        return createPatio(patioData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patios'] });
      Alert.alert('Sucesso!', `Pátio ${patioParaEditar ? 'atualizado' : 'criado'} com sucesso.`);
      navigation.goBack();
    },
    onError: (error) => {
      Alert.alert('Erro', `Não foi possível salvar o pátio: ${error.message}`);
    },
  });

  const handleSalvar = () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'O nome do pátio é obrigatório.');
      return;
    }
    const patioData = { nome };
    mutation.mutate(patioData);
  };

  const dynamicStyles = {
    input: {
      backgroundColor: colors.card,
      color: colors.text,
      borderColor: colors.border,
    },
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>{t('voltar')}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.primary }]}>
          {patioParaEditar ? 'Editar Pátio' : 'Novo Pátio'}
        </Text>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Nome do Pátio *</Text>
        <TextInput
          style={[styles.input, dynamicStyles.input]}
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: Pátio da Zona Leste"
          placeholderTextColor={colors.textSecondary}
        />

        <ThemedButton
            title={t('salvar')}
            onPress={handleSalvar}
            isLoading={mutation.isPending}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 20, paddingTop: 60 },
    backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    backText: { fontSize: 18, marginLeft: 8 },
    title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
    label: { fontSize: 16, marginBottom: 8 },
    input: {
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 12,
      marginBottom: 20,
      fontSize: 16,
    },
});