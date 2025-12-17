import React, { useState, useContext } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mergeStyles } from '../components/GlobalStyles';
import { AppContext } from '../components/ContextoLogin';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/background.png');

// 🚨 IMPORTANTE: SUBSTITUIR PELO IP OU DOMÍNIO DO SEU SERVIDOR PHP 🚨
const API_BASE_URL = 'http://192.168.1.7/SPLQ'; 
const API_LOGIN = `${API_BASE_URL}/login.php`; 

const styles = mergeStyles({})

export default function LoginScreen({ }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation();
  // Pega a função de login do Contexto
  const { handleLogin } = useContext(AppContext); 
  const insets = useSafeAreaInsets(); // Adicionado para consistência de estilos

  const fazerLogin = async () => {
    if (email === '' || senha === '') {
      Alert.alert("Erro", "Preencha os campos de E-mail e Senha!");
      return;
    }

    try {
        const response = await fetch(API_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                senha: senha,
            }),
        });

        const data = await response.json();

        if (response.ok && data.usuario) {
            // Sucesso! Chama a função do Contexto para salvar o usuário e atualizar o estado
            const success = await handleLogin(data.usuario);
            if(success) {
                // Redireciona para a tela principal (MainTabs) ou usa navigation.goBack() 
                // dependendo da sua navegação em App.js
                navigation.navigate('MainTabs'); 
            } else {
                Alert.alert("Erro de Sessão", "Login OK, mas não foi possível salvar a sessão.");
            }
        } else {
            // Exibe a mensagem de erro vinda do PHP (e.g., senha incorreta)
            Alert.alert("Falha no Login", data.message || "Ocorreu um erro desconhecido.");
        }

    } catch (error) {
        console.error("Erro na requisição de login:", error);
        Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor. Verifique a URL.");
    }
  };

  // ... (JSX do Login)
  return (
    <View style={{flex:1}}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', margin: '5%'}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.boxContainer}>
          <Text style={styles.labelText}>E-mail</Text>
          <TextInput
              style={styles.inputField}
              placeholder='E-mail'
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
          />
        </View>
        <View style={[styles.boxContainer, { marginTop: 10 }]}> 
          <Text style={styles.labelText}>Senha</Text>
          <TextInput
              style={styles.inputField}
              placeholder='Senha'
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={senha}
              secureTextEntry={true}
              onChangeText={setSenha}
          />
        </View>
        <TouchableOpacity style={[styles.buttonContainer, { marginTop: 20 }]} onPress={fazerLogin}>
            <Text style={styles.buttonText}>Fazer Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 10}} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat'}}>Não tem uma conta?</Text>
            <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat'}}>Cadastre-se agora!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}