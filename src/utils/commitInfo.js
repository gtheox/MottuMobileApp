import Constants from 'expo-constants';

// Esta função busca o hash do commit do manifest do app.
// O Expo automaticamente insere essa informação durante o processo de build/publicação.
export const getCommitHash = () => {
  return Constants.expoConfig?.extra?.commitHash ?? 'N/A';
};

// Se você estiver usando o EAS Update, o hash fica em outro lugar:
export const getUpdateCommitHash = () => {
    return Constants.expoConfig?.updates?.commitTime ?? 'N/A';
}