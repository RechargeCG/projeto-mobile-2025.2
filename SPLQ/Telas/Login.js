import { Text, View, ImageBackground, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useContext } from 'react';
import { mergeStyles } from '../components/GlobalStyles';
import { AppContext } from '../components/ContextoLogin';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/background.png');

export default function LoginScreen({ }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation();

  const { setIdUsu, ip } = useContext(AppContext);

  const fazerLogin = async () => {
    if (email !== '' && senha !== '') {
      try {
        // Criamos o corpo da requisição
        const formData = new FormData();
        formData.append('email', email);
        formData.append('senha', senha);
        
        // Substitua 'caminho/do/seu/login.php' pelo caminho real no seu servidor
        const response = await fetch(`http://${ip}/SPLQ_Server/backend/login.php`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.idUsu > 0) {
          // Sucesso: seta o ID no contexto e navega
          setIdUsu(data.idUsu);
          alert("Bem-vindo!");
          navigation.goBack();
        } else {
          // Falha: exibe mensagem de erro do backend ou padrão
          alert(data.erro || "Login e/ou senha incorreto(s)");
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor. Verifique o IP e a rede.");
      }
    } else {
      alert("Preencha os campos corretamente!");
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