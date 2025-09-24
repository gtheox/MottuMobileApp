import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../services/firebaseconfig';
import { signOut } from 'firebase/auth';

// Array para configurar os cards de navegação
const featureCards = [
  {
    titleKey: 'motos',
    icon: 'bicycle-outline',
    route: 'Motos',
  },
  {
    titleKey: 'patios',
    icon: 'business-outline',
    route: 'Patios',
  },
  {
    titleKey: 'sobre',
    icon: 'information-circle-outline',
    route: 'Sobre',
  },
  {
    titleKey: 'configuracoes',
    icon: 'settings-outline',
    route: 'Configuracoes',
  },
];

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handleLogout = () => {
    signOut(auth).catch(error => console.error('Erro no logout:', error));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>{t('boasVindas')}</Text>
          <Text style={[styles.userEmail, { color: colors.text }]}>{auth.currentUser?.email}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        {featureCards.map((card) => (
          <TouchableOpacity
            key={card.titleKey}
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={() => navigation.navigate(card.route)}
          >
            <Ionicons name={card.icon} size={40} color={colors.primary} />
            <Text style={[styles.cardText, { color: colors.text }]}>{t(card.titleKey)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
  },
  userEmail: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start',
    padding: 10,
  },
  card: {
    width: '45%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2.5%',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
  },
});