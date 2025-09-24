import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';
import { theme as themeColors } from '../theme/theme'; // Importa nossas cores

// 1. Cria o Contexto
const ThemeContext = createContext();

// 2. Cria o Provedor que irá "envelopar" o aplicativo
export function ThemeProvider({ children }) {
  // Pega o tema padrão do sistema (light ou dark)
  const systemTheme = Appearance.getColorScheme();
  
  // Estado para guardar o tema atual, iniciando com o tema do sistema
  const [currentTheme, setCurrentTheme] = useState(systemTheme || 'light');

  // Função para permitir a troca manual de tema
  const toggleTheme = () => {
    setCurrentTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Efeito que "ouve" se o usuário mudar o tema do sistema operacional em tempo real
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setCurrentTheme(colorScheme || 'light');
    });

    return () => subscription.remove();
  }, []);

  // O "pacote" de dados que será distribuído para todo o app
  const value = {
    theme: currentTheme,
    colors: themeColors[currentTheme], // Pega a paleta de cores correta ('light' ou 'dark')
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// 3. Cria um "Hook" customizado para facilitar o uso deste contexto nas telas
export const useTheme = () => useContext(ThemeContext);