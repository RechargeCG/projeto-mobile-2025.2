import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import GenericoScreen from './Telas/Generico';
import PerfilScreen from './Telas/Perfil';
import LoginScreen from './Telas/Login';
import { useContext, useState } from 'react';
import AppProvider, { AppContext } from './components/ContextoLogin';

function PesquisaScreen() { return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Busca</Text></View>; }
function HistoricoScreen() { return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Historico</Text></View>; }
function FavoritosScreen() { return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Favoritos</Text></View>; }
// function PerfilScreen() { return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Perfil</Text></View>; }

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  // const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarStyle: { 
          // marginBottom: insets.bottom,
          // backgroundColor: 'red'
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Inicio') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Pesquisa') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Historico') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Favoritos') iconName = focused ? 'heart' : 'heart-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black', 
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Inicio" component={GenericoScreen} options={{ title: 'Início'}} />
      <Tab.Screen name="Pesquisa" component={PesquisaScreen} options={{ title: 'Pesquisa'}} />
      <Tab.Screen name="Historico" component={HistoricoScreen} options={{ title: 'Histórico'}} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} options={{ title: 'Favoritos'}} />
    </Tab.Navigator>
  );
}

function ConteudoNavegacao() {
  const { logado } = useContext(AppContext); // Agora funciona

  if (!logado) {
    return (
      <SafeAreaProvider>
        <LoginScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function AppNavigator() {
  return (
    <AppProvider>
      <ConteudoNavegacao />
    </AppProvider>
  );
}