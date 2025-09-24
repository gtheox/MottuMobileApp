import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { getCommitHash } from '../../utils/commitInfo';

export default function CommitInfoScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const commitHash = getCommitHash();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>{t('voltar')}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.primary }]}>Informações do Build</Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Versão do Aplicativo (Commit Hash):
          </Text>
          <Text selectable style={[styles.hashText, { color: colors.text }]}>
            {commitHash}
          </Text>
          <Text style={[styles.explanation, { color: colors.textSecondary }]}>
            Este código identifica a versão exata do aplicativo que foi publicada. Ele aparecerá
            corretamente após o build via EAS / Firebase App Distribution.
          </Text>
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
    zIndex: 1,
  },
  backText: {
    fontSize: 18,
    marginLeft: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    borderRadius: 15,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  hashText: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginTop: 10,
    marginBottom: 20,
  },
  explanation: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});