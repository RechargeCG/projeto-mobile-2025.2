import React, { useState } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mergeStyles } from '../components/GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/background.png');

// 🚨 IMPORTANTE: SUBSTITUIR PELO IP OU DOMÍNIO DO SEU SERVIDOR PHP 🚨
const API_BASE_URL = 'http://192.168.1.7/SPLQ'; 
const API_CADASTRO = `${API_BASE_URL}/cadastro.php`; 

const styles = mergeStyles({})

export default function CadastroScreen({  }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNasc, setDataNasc] = useState(''); // Formato DD/MM/AAAA

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  // Função para formatar a data (DD/MM/AAAA)
  const handleDataNascChange = (text) => {
    let formattedText = text.replace(/[^0-9]/g, '');
    
    // Auto-adds '/'
    if (formattedText.length > 2) {
      formattedText = formattedText.substring(0, 2) + '/' + formattedText.substring(2);
    }
    if (formattedText.length > 5) {
      formattedText = formattedText.substring(0, 5) + '/' + formattedText.substring(5, 9);
    }
    
    setDataNasc(formattedText);
  };

  const fazerCadastro = async () => {
    if (nome === '' || email === '' || senha === '' || dataNasc === '') {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(API_CADASTRO, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              nome: nome,
              email: email,
              senha: senha,
              dataNasc: dataNasc, // Enviando DD/MM/AAAA, o PHP converte para DATE
          }),
      });

      const data = await response.json();
      
      if (response.ok) {
        Alert.alert("Sucesso", data.message || "Cadastro realizado com sucesso! Faça login.");
        // Navega de volta para a tela de Login
        navigation.navigate('Login'); 
      } else {
          // Exibe a mensagem de erro vinda do PHP (e.g., e-mail duplicado, data inválida)
          Alert.alert("Falha no Cadastro", data.message || "Ocorreu um erro desconhecido.");
      }

    } catch (error) {
      console.error("Erro na requisição de cadastro:", error);
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor. Verifique a URL.");
    }
  };

  // ... (JSX do Cadastro)
  return (
    <View style={{flex:1}}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', margin: '5%'}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.boxContainer}>
          <Text style={styles.labelText}>Nome</Text>
          <TextInput
              style={styles.inputField}
              placeholder='Nome Completo'
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={nome}
              onChangeText={setNome}
          />
        </View>
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
        <View style={[styles.boxContainer, { marginTop: 10 }]}> 
          <Text style={styles.labelText}>Data de nascimento</Text>
          <TextInput
              style={styles.inputField}
              placeholder='DD/MM/AAAA'
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={dataNasc}
              onChangeText={handleDataNascChange} 
              keyboardType='numeric'
              maxLength={10}
          />
        </View>
        <TouchableOpacity style={[styles.buttonContainer, { marginTop: 20 }]} onPress={fazerCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 10}} onPress={() => navigation.navigate('Login')}>
            <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat'}}>Já tem uma conta?</Text>
            <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat'}}>Faça login agora!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}