import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { FilterScreen, SearchResultsScreen } from "./Telas/Pesquisa";
import CadastrarCapituloScreen from './Telas/CadastarCapitulo';
import CadastrarObraScreen from './Telas/CadastrarObra';
import EditarCapituloScreen from './Telas/EditarCapitulo';
import EditarObraScreen from './Telas/EditarObra';

import FavoritosScreen from './Telas/Favoritos';
import HistoricoScreen from './Telas/Historico';

import GenericoScreen from './Telas/Generico';
import PrincipalScreen from './Telas/Principal';
import PerfilScreen from './Telas/Perfil';
import CapituloScreen from './Telas/Capitulo';
import QuadrinhoScreen from './Telas/Quadrinho';
import LoginScreen from './Telas/Login';
import CadastroScreen from './Telas/Cadastro'; // ADICIONADO: Import do CadastroScreen
import { useContext, useState } from 'react';
import AppProvider, { AppContext } from './components/ContextoLogin';
import PerfilEdicaoScreen from './Telas/PerfilEdicao';
import CadastroScreen from './Telas/Cadastro';



const PesquisaStack = createStackNavigator();

function PesquisaStackScreens() {
  return (
    <PesquisaStack.Navigator screenOptions={{ headerShown: false }}>
      <PesquisaStack.Screen name="FilterScreen" component={FilterScreen} />
      <PesquisaStack.Screen name="SearchResults" component={SearchResultsScreen} />
    </PesquisaStack.Navigator>
  );
}


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false, 
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
      <Tab.Screen name="Inicio" component={PrincipalScreen} options={{ title: 'Início'}} />
      <Tab.Screen
        name="Pesquisa"
        component={PesquisaStackScreens}
        options={{ title: 'Pesquisa' }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Pesquisa', { screen: 'FilterScreen' });
          },
        })}
      />

      <Tab.Screen name="Historico" component={HistoricoScreen} options={{ title: 'Histórico'}} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} options={{ title: 'Favoritos'}} />
    </Tab.Navigator>
  );
}

function ConteudoNavegacao() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          <Stack.Screen name="PerfilEdicao" component={PerfilEdicaoScreen} />
          <Stack.Screen name="Favoritos" component={FavoritosScreen} />
          <Stack.Screen name="Historico" component={HistoricoScreen} />
          <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
          <Stack.Screen name="CadastrarObra" component={CadastrarObraScreen} />
          <Stack.Screen name="CadastrarCapitulo" component={CadastrarCapituloScreen} />
          <Stack.Screen name="EditarObra" component={EditarObraScreen} />
          <Stack.Screen name="EditarCapitulo" component={EditarCapituloScreen} />
          <Stack.Screen name="Capitulo" component={CapituloScreen} />
          <Stack.Screen name="Quadrinho" component={QuadrinhoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function AppNavigator() {
  return (
    <AppProvider>
      <KeyboardProvider>
        <ConteudoNavegacao />
      </KeyboardProvider>
    </AppProvider>
  );
}