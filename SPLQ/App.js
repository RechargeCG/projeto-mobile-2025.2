import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator } from 'react-native'; 
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Icon from 'react-native-vector-icons/Ionicons';
// Importação CORRIGIDA: AppProvider deve ser o export default
import AppProvider, { AppContext } from './components/ContextoLogin'; 

import LoginScreen from './Telas/Login';
import CadastroScreen from './Telas/Cadastro';
import PrincipalScreen from './Telas/Principal';
import FavoritosScreen from './Telas/Favoritos';
import HistoricoScreen from './Telas/Historico';
import PerfilScreen from './Telas/Perfil';
import PerfilEdicaoScreen from './Telas/PerfilEdicao';
import SearchResultsScreen from './Telas/Pesquisa'; // Assumindo que PesquisaStack usa SearchResultsScreen
import FilterScreen from './Telas/Pesquisa'; // Assumindo que FilterScreen é a tela de pesquisa inicial
// import CadastrarObraScreen from './Telas/CadastrarObra';
// import CadastrarCapituloScreen from './Telas/CadastarCapitulo';
// import EditarObraScreen from './Telas/EditarObra';
// import EditarCapituloScreen from './Telas/EditarCapitulo';
// import CapituloScreen from './Telas/Capitulo';
// import QuadrinhoScreen from './Telas/Quadrinho';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Funções de navegação do seu arquivo original
function PesquisaStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Filtro" component={FilterScreen} /> 
            <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
            {/* <Stack.Screen name="Quadrinho" component={QuadrinhoScreen} />  */}
            <Stack.Screen name="Capitulo" component={CapituloScreen} /> 
        </Stack.Navigator>
    );
}

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Principal') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Pesquisa') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Historico') {
                        iconName = focused ? 'time' : 'time-outline';
                    } else if (route.name === 'Favoritos') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#dc3545', // Cor vermelha para ativo
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#1E1E1E', // Fundo escuro
                    borderTopColor: '#333333',
                },
            })}
        >
            <Tab.Screen name="Principal" component={PrincipalScreen} />
            <Tab.Screen name="Pesquisa" component={PesquisaStack} /> 
            <Tab.Screen name="Historico" component={HistoricoScreen} />
            <Tab.Screen name="Favoritos" component={FavoritosScreen} />
        </Tab.Navigator>
    );
}

function AppNavigatorContent() {
  // O estado logado e loading é gerenciado por ContextoLogin.js
  const { logado, loading } = useContext(AppContext);

  if (loading) {
    // Tela de carregamento enquanto o AsyncStorage está sendo checado
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ color: '#fff', marginTop: 10 }}>Carregando...</Text>
        </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!logado ? (
        // Se NÃO está logado, mostra apenas Login e Cadastro
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
        </>
      ) : (
        // Se está logado, permite acesso à MainTabs (Home) e telas internas
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          <Stack.Screen name="PerfilEdicao" component={PerfilEdicaoScreen} />
          {/* <Stack.Screen name="CadastrarObra" component={CadastrarObraScreen} />
          {/* <Stack.Screen name="CadastrarCapitulo" component={CadastrarCapituloScreen} /> */}
          {/* <Stack.Screen name="EditarObra" component={EditarObraScreen} /> */}
          {/* <Stack.Screen name="EditarCapitulo" component={EditarCapituloScreen} />}
          <Stack.Screen name="Capitulo" component={CapituloScreen} /> */} 
          {/* <Stack.Screen name="Quadrinho" component={QuadrinhoScreen} /> */}
          
          {/* Adiciona Login/Cadastro aqui, caso o usuário acesse (improvável) ou faça logout */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

// Componente raiz que fornece o Contexto e o KeyboardProvider
export default function AppNavigator() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <KeyboardProvider>
          <NavigationContainer>
            <AppNavigatorContent />
          </NavigationContainer>
        </KeyboardProvider>
      </SafeAreaProvider>
    </AppProvider>
  );
}