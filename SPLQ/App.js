import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardProvider } from 'react-native-keyboard-controller';

// --- IMPORTAÇÃO DE TELAS ---
import { FilterScreen, SearchResultsScreen } from "./Telas/Pesquisa";
import CadastrarCapituloScreen from './Telas/CadastarCapitulo';
import CadastrarObraScreen from './Telas/CadastrarObra';
import EditarCapituloScreen from './Telas/EditarCapitulo';
import EditarObraScreen from './Telas/EditarObra';

import FavoritosScreen from './Telas/Favoritos';
import HistoricoScreen from './Telas/Historico';
import PrincipalScreen from './Telas/Principal';
import PerfilScreen from './Telas/Perfil';
import CapituloScreen from './Telas/Capitulo';
import QuadrinhoScreen from './Telas/Quadrinho';
import LoginScreen from './Telas/Login';
import PerfilEdicaoScreen from './Telas/PerfilEdicao';
import CadastroScreen from './Telas/Cadastro';

// --- CONTEXTO ---
import AppProvider, { AppContext } from './components/ContextoLogin';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const PesquisaStack = createStackNavigator();

// --- NAVEGAÇÃO DE PESQUISA (SUB-STACK) ---
function PesquisaStackScreen() {
  return (
    <PesquisaStack.Navigator screenOptions={{ headerShown: false }}>
      <PesquisaStack.Screen name="Filter" component={FilterScreen} />
      <PesquisaStack.Screen name="SearchResults" component={SearchResultsScreen} />
    </PesquisaStack.Navigator>
  );
}

// --- TAB NAVIGATION (MENU INFERIOR) ---
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#121212', borderTopWidth: 0 },
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#666',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Início') iconName = 'home';
          else if (route.name === 'Pesquisa') iconName = 'search';
          else if (route.name === 'Histórico') iconName = 'time';
          else if (route.name === 'Favoritos') iconName = 'heart';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={PrincipalScreen} />
      <Tab.Screen name="Pesquisa" component={PesquisaStackScreen} />
      <Tab.Screen name="Histórico" component={HistoricoScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
    </Tab.Navigator>
  );
}

// --- NAVEGAÇÃO PRINCIPAL ---
function ConteudoNavegacao() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* A TabBar é a tela principal */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
          
          {/* Telas de Autenticação */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          
          {/* Telas de Perfil */}
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          <Stack.Screen name="PerfilEdicao" component={PerfilEdicaoScreen} />
          
          {/* Telas de Conteúdo (Recebem IDs via params) */}
          <Stack.Screen name="Quadrinho" component={QuadrinhoScreen} />
          <Stack.Screen name="Capitulo" component={CapituloScreen} />
          
          {/* Telas de Gerenciamento (Admin/Uploader) */}
          <Stack.Screen name="CadastrarObra" component={CadastrarObraScreen} />
          <Stack.Screen name="CadastrarCapitulo" component={CadastrarCapituloScreen} />
          <Stack.Screen name="EditarObra" component={EditarObraScreen} />
          <Stack.Screen name="EditarCapitulo" component={EditarCapituloScreen} />

          {/* Fallback para resultados de pesquisa fora do stack se necessário */}
          <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <KeyboardProvider>
        <ConteudoNavegacao />
      </KeyboardProvider>
    </AppProvider>
  );
}