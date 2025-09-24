import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import ThemedButton from '../../components/ThemedButton';

const desenvolvedores = [
    {
      nome: 'Gabriel Teodoro',
      rm: '555962',
      github: 'https://github.com/gtheox',
      linkedin: 'https://www.linkedin.com/in/gabriel-teodoro-gon%C3%A7alves-rosa-a26970236/',
      foto: require('../../assets/gabriel.png'),
    },
    {
      nome: 'Luka Shibuya',
      rm: '558123',
      github: 'https://github.com/lukashibuya',
      linkedin: 'https://www.linkedin.com/in/luka-shibuya-b62a322b3/',
      foto: require('../../assets/luka.png'),
    },
    {
      nome: 'Eduardo Giovannini',
      rm: '555030',
      github: 'https://github.com/DuGiovannini',
      linkedin: 'https://www.linkedin.com/in/eduardo-giovannini-157216262/',
      foto: require('../../assets/du.png'),
    },
  ];


export default function SobreScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>{t('sobre')}</Text>

        <Text style={[styles.explanation, { color: colors.text }]}>
          Este projeto foi desenvolvido como parte de um desafio acadêmico para a criação de uma solução de
          mapeamento e monitoramento inteligente de motos em pátios de uma empresa. O objetivo é fornecer uma
          plataforma eficiente e escalável para gerenciar as motos de forma inteligente.
        </Text>

        <ThemedButton 
            title="Ver Informações do Build"
            onPress={() => navigation.navigate('CommitInfo')}
        />

        <Text style={[styles.subTitle, { color: colors.primary }]}>Desenvolvedores</Text>

        <View style={styles.devsContainer}>
          {desenvolvedores.map((dev, index) => (
            <View key={index} style={[styles.devCard, { backgroundColor: colors.card }]}>
              <Image source={dev.foto} style={styles.foto} />
              <Text style={[styles.devName, { color: colors.text }]}>{dev.nome}</Text>
              <Text style={[styles.devRM, { color: colors.textSecondary }]}>RM: {dev.rm}</Text>

              <View style={styles.socialLinks}>
                <TouchableOpacity onPress={() => Linking.openURL(dev.github)}>
                  <Ionicons name="logo-github" size={30} color={colors.text} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(dev.linkedin)}>
                  <Ionicons name="logo-linkedin" size={30} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  explanation: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
    lineHeight: 24,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  devsContainer: {
    alignItems: 'center',
  },
  devCard: {
    padding: 20,
    borderRadius: 15,
    width: '95%',
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  foto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  devRM: {
    fontSize: 14,
    marginBottom: 15,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});