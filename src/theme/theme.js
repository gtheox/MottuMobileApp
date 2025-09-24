// src/theme/theme.js

export const theme = {
  light: {
    theme: 'light',
    primary: '#00af34',
    background: '#F0F2F5', // Um cinza bem claro para o fundo
    card: '#FFFFFF', // Cards brancos
    text: '#0D0D0D', // Texto principal preto
    textSecondary: '#6B6B6B', // Texto secundário cinza
    border: '#E0E0E0',
    buttonText: '#FFFFFF',
    danger: '#D32F2F', // Um tom de vermelho para ações de perigo
  },
  dark: {
    theme: 'dark',
    primary: '#00af34', // O verde se destaca bem no escuro
    background: '#121212', // Fundo escuro padrão
    card: '#1E1E1E', // Cards um pouco mais claros que o fundo
    text: '#EAEAEA', // Texto principal quase branco
    textSecondary: '#A0A0A0', // Texto secundário cinza claro
    border: '#2E2E2E',
    buttonText: '#0D0D0D', // Texto preto para botões claros
    danger: '#EF5350', // Vermelho mais claro para o modo escuro
  },
};