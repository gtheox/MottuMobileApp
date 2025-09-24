import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseconfig'; // CORREÇÃO AQUI
import ThemedButton from '../../components/ThemedButton';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o e-mail e a senha.');
      return;
    }

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log('Usuário logado:', userCredential.user.uid);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erro de Login', 'E-mail ou senha inválidos. Por favor, tente novamente.');
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Ionicons name="bicycle" size={60} color={colors.primary} />
        <Text style={[styles.title, { color: colors.primary }]}>Mottu Control</Text>
        
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
          placeholder="********"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
        />
        
        <ThemedButton
            title="Entrar"
            onPress={handleLogin}
            isLoading={isLoading}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={[styles.linkText, {color: colors.primary}]}>
                Não tem uma conta? Cadastre-se
            </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
  linkText: {
      marginTop: 20,
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 16,
  }
});