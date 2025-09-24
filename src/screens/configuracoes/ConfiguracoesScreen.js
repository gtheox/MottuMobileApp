import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../services/firebaseconfig';
import { signOut } from 'firebase/auth';

export default function ConfiguracoesScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    signOut(auth).catch(error => Alert.alert('Erro', error.message));
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>{t('configuracoes')}</Text>

      <View style={styles.optionContainer}>
        <Text style={[styles.optionLabel, { color: colors.text }]}>{t('temaDoApp')}</Text>
        <View style={styles.optionControl}>
          <Text style={[styles.optionValue, { color: colors.textSecondary }]}>
            {theme === 'light' ? 'Claro' : 'Escuro'}
          </Text>
          <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
            <Ionicons
              name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <Text style={[styles.optionLabel, { color: colors.text }]}>{t('idioma')}</Text>
        <View style={styles.optionControl}>
          <TouchableOpacity
            style={[styles.langButton, i18n.language === 'pt' && { backgroundColor: colors.primary }]}
            onPress={() => changeLanguage('pt')}
          >
            <Text style={[styles.langButtonText, { color: i18n.language === 'pt' ? colors.buttonText : colors.text }]}>PT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langButton, i18n.language === 'en' && { backgroundColor: colors.primary }]}
            onPress={() => changeLanguage('en')}
          >
            <Text style={[styles.langButtonText, { color: i18n.language === 'en' ? colors.buttonText : colors.text }]}>EN</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { borderColor: colors.danger }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color={colors.danger} />
        <Text style={[styles.logoutButtonText, { color: colors.danger }]}>{t('sair')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2E2E', // Idealmente colors.border
  },
  optionLabel: {
    fontSize: 18,
  },
  optionControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    fontSize: 16,
    marginRight: 15,
  },
  iconButton: {
    padding: 5,
  },
  langButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E2E2E',
    marginLeft: 10,
  },
  langButtonText: {
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});