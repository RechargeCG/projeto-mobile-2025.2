// components/ContextoLogin.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { View, ActivityIndicator, Text } from 'react-native'; // <--- CORREÇÃO 1: Importação de componentes de UI

export const AppContext = createContext();

const USER_DATA_KEY = '@UserData';

// CORREÇÃO 2: Declaração padrão do componente funcional
const AppProvider = ({ children }) => { 
  const [logado, setLogado] = useState(false);  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efeito para checar o login no carregamento do app (persistência via AsyncStorage)
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_DATA_KEY);
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData(user);
          setLogado(true);
        }
      } catch (e) {
        console.error("Erro ao carregar dados do AsyncStorage:", e);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  // Função para logar, armazena os dados do usuário e atualiza o estado
  const handleLogin = async (user) => {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
      setUserData(user);
      setLogado(true);
      return true;
    } catch (e) {
      console.error("Erro ao salvar dados de login:", e);
      return false;
    }
  };

  // Função para deslogar, limpa o AsyncStorage e o estado
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(USER_DATA_KEY);
      setUserData(null);
      setLogado(false);
      return true;
    } catch (e) {
      console.error("Erro ao fazer logout:", e);
      return false;
    }
  };

  if(loading) {
    // Retorna um indicador de carregamento enquanto o AsyncStorage é checado
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ color: '#fff', marginTop: 10 }}>Carregando sessão...</Text>
        </View>
    );
  }

  return (
    <AppContext.Provider value={{ logado, userData, handleLogin, handleLogout, loading }}>
      {children}
    </AppContext.Provider>
  );
};

// CORREÇÃO 2: Exportação padrão do componente
export default AppProvider;