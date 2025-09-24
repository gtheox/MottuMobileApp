import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseconfig';
import { useTheme } from '../contexts/ThemeContext';

import AppNavigator from './AppNavigator'; // Nosso navegador principal com abas
import AuthNavigator from './AuthNavigator'; // Nosso navegador de login/cadastro

export default function RootNavigator() {
  const [user, setUser] = useState(null); // Guarda o estado de autenticação
  const [initializing, setInitializing] = useState(true); // Controla o loading inicial
  const { colors } = useTheme();

  useEffect(() => {
    // onAuthStateChanged é um "ouvinte" do Firebase que nos avisa em tempo real
    // se o usuário loga ou desloga.
    const unsubscribe = onAuthStateChanged(auth, (userState) => {
      setUser(userState); // Atualiza nosso estado com o usuário (ou null)
      if (initializing) {
        setInitializing(false);
      }
    });

    // Retorna a função de "desinscrição" para limpar o ouvinte quando o componente for desmontado
    return unsubscribe;
  }, []);

  // Enquanto o Firebase verifica o status do usuário, mostramos uma tela de carregamento
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Se 'user' não for nulo, o usuário está logado, então mostramos o AppNavigator.
  // Se for nulo, mostramos o AuthNavigator.
  return user ? <AppNavigator /> : <AuthNavigator />;
}