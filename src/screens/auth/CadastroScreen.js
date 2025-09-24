import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseconfig'; 
import ThemedButton from '../../components/ThemedButton';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCadastro = () => {
    if (!email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        Alert.alert('Sucesso!', 'Conta criada com sucesso.');
        navigation.goBack(); // Volta para a tela de login após o cadastro
      })
      .catch((error) => {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Erro', 'Este e-mail já está em uso.');
        } else if (error.code === 'auth/weak-password') {
          Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
        } else {
          Alert.alert('Erro de Cadastro', 'Não foi possível criar a conta. Tente novamente.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const dynamicStyles = {
    input: {
      backgroundColor: colors.card,
      color: colors.text,
      borderColor: colors.border,
    },
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>Voltar para o Login</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.primary }]}>Criar Conta</Text>

        <Text style={[styles.label, { color: colors.textSecondary }]}>E-mail</Text>
        <TextInput
          style={[styles.input, dynamicStyles.input]}
          value={email}
          onChangeText={setEmail}
          placeholder="seuemail@exemplo.com"
          placeholderTextColor={colors.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Senha</Text>
        <TextInput
          style={[styles.input, dynamicStyles.input]}
          value={senha}
          onChangeText={setSenha}
          placeholder="Mínimo 6 caracteres"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Confirmar Senha</Text>
        <TextInput
          style={[styles.input, dynamicStyles.input]}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholder="Repita a senha"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
        />

        <ThemedButton
          title="Cadastrar"
          onPress={handleCadastro}
          isLoading={isLoading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    marginLeft: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
  },
});