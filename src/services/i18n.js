import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Importa os arquivos de tradução
import pt from '../locales/pt.json';
import en from '../locales/en.json';

// Pega o idioma do dispositivo do usuário (ex: 'pt', 'en')
const userDeviceLanguage = Localization.getLocales()[0].languageCode;

i18n
  .use(initReactI18next) // Passa a instância do i18n para o react-i18next
  .init({
    // Nossos recursos (traduções)
    resources: {
      en: {
        translation: en.translation,
      },
      pt: {
        translation: pt.translation,
      },
    },

    // Idioma a ser usado se o idioma do dispositivo não estiver disponível
    fallbackLng: 'en',

    // Define o idioma inicial com base no dispositivo do usuário
    lng: userDeviceLanguage,

    // Desativa o modo de debug no console
    debug: false,

    interpolation: {
      escapeValue: false, // O React já faz a proteção contra ataques XSS
    },
  });

export default i18n;