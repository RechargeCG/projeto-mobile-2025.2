import { Text, View, ImageBackground, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useContext } from 'react';
import { mergeStyles } from '../components/GlobalStyles';
import { AppContext } from '../components/ContextoLogin';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/background.png');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation();

  // Pega o IP e o Setter do ID do contexto
  const { setIdUsu, ip } = useContext(AppContext);

  const fazerLogin = async () => {
    if (email !== '' && senha !== '') {
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('senha', senha);
        
        // Monta a URL usando o IP do contexto
        const url = `http://${ip}/SPLQ_Server/backend/login.php`;
        console.log("Tentando logar em:", url);

        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        // Primeiro pegamos o texto para garantir que não veio um erro HTML do PHP
        const textResponse = await response.text();
        
        try {
            const data = JSON.parse(textResponse);

            if (data.sucesso) {
              // Sucesso: Salva o ID no contexto global
              setIdUsu(data.idUsu);
              Alert.alert("Bem-vindo!", `Olá, ${data.nome}`);
              navigation.goBack(); // Volta para a tela anterior (ou navega para Home)
            } else {
              // Erro de lógica (senha errada, etc)
              Alert.alert("Atenção", data.erro || "Login e/ou senha incorreto(s)");
            }

        } catch (e) {
            console.error("Resposta não é JSON:", textResponse);
            Alert.alert("Erro Técnico", "O servidor respondeu com um formato inválido. Verifique o console.");
        }

      } catch (error) {
        console.error(error);
        Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor. Verifique o IP no ContextoLogin.js");
      }
    } else {
      Alert.alert("Campos vazios", "Preencha o e-mail e a senha!");
    }
  };

  const insets = useSafeAreaInsets();
  const styles = mergeStyles({})

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
              keyboardType="email-address"
              autoCapitalize="none"
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