import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

// Import das Telas
import HomeScreen from '../screens/home/HomeScreen';
import MotosListScreen from '../screens/motos/MotosListScreen';
import MotoDetailsScreen from '../screens/motos/MotoDetailsScreen';
import MotoFormScreen from '../screens/motos/MotoFormScreen';
import PatiosListScreen from '../screens/patios/PatiosListScreen';
import PatioDetailsScreen from '../screens/patios/PatioDetailsScreen';
import PatioFormScreen from '../screens/patios/PatioFormScreen';
import SobreScreen from '../screens/sobre/SobreScreen';
import CommitInfoScreen from '../screens/sobre/CommitInfoScreen';
import ConfiguracoesScreen from '../screens/configuracoes/ConfiguracoesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Pilha de navegação para a funcionalidade de Motos
function MotosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MotosList" component={MotosListScreen} />
      <Stack.Screen name="MotoDetails" component={MotoDetailsScreen} />
      <Stack.Screen name="MotoForm" component={MotoFormScreen} />
    </Stack.Navigator>
  );
}

// Pilha de navegação para a funcionalidade de Pátios
function PatiosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PatiosList" component={PatiosListScreen} />
      <Stack.Screen name="PatioDetails" component={PatioDetailsScreen} />
      <Stack.Screen name="PatioForm" component={PatioFormScreen} />
    </Stack.Navigator>
  );
}

// Pilha de navegação para a funcionalidade Sobre
function SobreStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SobrePage" component={SobreScreen} />
        <Stack.Screen name="CommitInfo" component={CommitInfoScreen} />
      </Stack.Navigator>
    );
  }

// Navegador principal com as abas inferiores
export default function AppNavigator() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Motos') iconName = focused ? 'bicycle' : 'bicycle-outline';
          else if (route.name === 'Patios') iconName = focused ? 'business' : 'business-outline';
          else if (route.name === 'Sobre') iconName = focused ? 'information-circle' : 'information-circle-outline';
          else if (route.name === 'Configuracoes') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: t('home') }} />
      <Tab.Screen name="Motos" component={MotosStack} options={{ tabBarLabel: t('motos') }} />
      <Tab.Screen name="Patios" component={PatiosStack} options={{ tabBarLabel: t('patios') }} />
      <Tab.Screen name="Sobre" component={SobreStack} options={{ tabBarLabel: t('sobre') }} />
      <Tab.Screen name="Configuracoes" component={ConfiguracoesScreen} options={{ tabBarLabel: t('configuracoes') }} />
    </Tab.Navigator>
  );
}