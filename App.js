import 'react-native-gesture-handler'; // Deve ser sempre a primeira linha
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Importa todos os nossos provedores de contexto
import { ThemeProvider } from './src/contexts/ThemeContext';
import QueryClientProvider from './src/contexts/QueryClientProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/services/i18n';

// Importa o navegador raiz que gerencia o fluxo de autenticação
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    // 1. Provedor do TanStack Query (para dados da API)
    <QueryClientProvider>
      {/* 2. Provedor de Tema (para cores) */}
      <ThemeProvider>
        {/* 3. Provedor de Idiomas (para traduções) */}
        <I18nextProvider i18n={i18n}>
          {/* 4. Provedor de Navegação */}
          <NavigationContainer>
            <StatusBar style="light" />
            {/* 5. Navegador Raiz que decide entre Login e App Principal */}
            <RootNavigator />
          </NavigationContainer>
        </I18nextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}