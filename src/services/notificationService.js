import { Alert, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';

// Configura como as notificações devem se comportar com o app em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Função principal para registrar o dispositivo para receber notificações
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permissão Negada', 'Não foi possível obter o token para notificações push!');
      return;
    }

    // Usando o Firebase Cloud Messaging (FCM) para obter o token
    try {
      // É importante garantir que a permissão do Firebase também foi solicitada
      await messaging().requestPermission();
      
      const fcmToken = await messaging().getToken();
      
      if (fcmToken) {
        console.log('Firebase Cloud Messaging Token:', fcmToken);
        token = fcmToken;
      } else {
         Alert.alert('Erro', 'Não foi possível obter o token FCM.');
      }
    } catch (e) {
      console.error('Erro ao obter o token FCM:', e);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar para notificações.');
    }

  } else {
    Alert.alert('Aviso', 'Notificações Push só funcionam em dispositivos físicos.');
  }

  return token;
}