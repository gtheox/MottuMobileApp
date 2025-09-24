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
  Platform,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMoto, updateMoto } from '../../api/apiService';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function MotoFormScreen({ route, navigation }) {
  const motoParaEditar = route.params?.motoParaEditar;

  const { colors } = useTheme();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('Mottu Pop');
  const [status, setStatus] = useState('Disponível');
  
  useEffect(() => {
    // Preenche o formulário se estivermos no modo de edição
    if (motoParaEditar) {
      setPlaca(motoParaEditar.placa);
      setModelo(motoParaEditar.modelo);
      setStatus(motoParaEditar.status);
    }
  }, [motoParaEditar]);

  const mutation = useMutation({
    mutationFn: (motoData) => {
      if (motoParaEditar) {
        return updateMoto(motoParaEditar.id, motoData);
      } else {
        return createMoto(motoData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['motos'] });
      Alert.alert('Sucesso!', `Moto ${motoParaEditar ? 'atualizada' : 'criada'} com sucesso.`);
      navigation.goBack();
    },
    onError: (error) => {
      Alert.alert('Erro', `Não foi possível salvar a moto: ${error.message}`);
    },
  });

  const handleSalvar = () => {
    if (!placa.trim() || !modelo.trim()) {
      Alert.alert('Atenção', 'Placa e modelo são obrigatórios.');
      return;
    }
    const motoData = {
      placa,
      modelo,
      status,
      patioId: 1, // Exemplo: pátio fixo. Idealmente viria de um seletor de pátios.
    };
    mutation.mutate(motoData);
  };

  const dynamicStyles = {
    input: {
      backgroundColor: colors.card,
      color: colors.text,
      borderColor: colors.border,
    },
    pickerContainer: {
        backgroundColor: colors.card,
        borderColor: colors.border,
    },
    pickerItem: {
        color: colors.text,
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.content}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={colors.primary} />
                <Text style={[styles.backText, { color: colors.primary }]}>{t('voltar')}</Text>
            </TouchableOpacity>

            <Text style={[styles.title, { color: colors.primary }]}>
            {motoParaEditar ? 'Editar Moto' : t('cadastrarMoto')}
            </Text>

            <Text style={[styles.label, { color: colors.textSecondary }]}>Placa *</Text>
            <TextInput
                style={[styles.input, dynamicStyles.input]}
                value={placa}
                onChangeText={setPlaca}
                placeholder="Ex: ABC1D23"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="characters"
            />

            <Text style={[styles.label, { color: colors.textSecondary }]}>Modelo *</Text>
            <View style={[styles.pickerContainer, dynamicStyles.pickerContainer]}>
                <Picker selectedValue={modelo} onValueChange={setModelo} itemStyle={dynamicStyles.pickerItem}>
                    <Picker.Item label="Mottu Pop" value="Mottu Pop" color={colors.text} />
                    <Picker.Item label="Mottu Sport" value="Mottu Sport" color={colors.text} />
                    <Picker.Item label="Mottu-E" value="Mottu-E" color={colors.text} />
                </Picker>
            </View>

            <Text style={[styles.label, { color: colors.textSecondary }]}>Status *</Text>
            <View style={[styles.pickerContainer, dynamicStyles.pickerContainer]}>
                <Picker selectedValue={status} onValueChange={setStatus} itemStyle={dynamicStyles.pickerItem}>
                    <Picker.Item label={t('disponivel')} value="Disponível" color={colors.text} />
                    <Picker.Item label={t('alugada')} value="Alugada" color={colors.text} />
                    <Picker.Item label={t('manutencao')} value="Manutenção" color={colors.text} />
                </Picker>
            </View>

            <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleSalvar}
            disabled={mutation.isPending}
            >
            {mutation.isPending ? (
                <ActivityIndicator color={colors.buttonText} />
            ) : (
                <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                {t('salvar')}
                </Text>
            )}
            </TouchableOpacity>
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
  pickerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});