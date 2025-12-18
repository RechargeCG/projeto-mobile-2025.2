import { Text, View, ImageBackground, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useContext } from 'react'; // Adicionado useContext
import { mergeStyles } from '../components/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../components/ContextoLogin'; // Importar Contexto

const image = require('../assets/background.png');

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNasc, setDataNasc] = useState('');

  // Puxar o IP do contexto
  const { ip } = useContext(AppContext);

  const navigation = useNavigation();

  const handleDataNascChange = (text) => {
    let formattedText = text.replace(/[^0-9]/g, '');
    if (formattedText.length > 2) formattedText = formattedText.substring(0, 2) + '/' + formattedText.substring(2);
    if (formattedText.length > 5) formattedText = formattedText.substring(0, 5) + '/' + formattedText.substring(5, 9);
    setDataNasc(formattedText);
  };

  const fazerCadastro = async () => {
    // Validação básica
    if (!nome || !email || !senha || dataNasc.length !== 10) { 
      Alert.alert("Erro", "Preencha todos os campos corretamente (Data: DD/MM/AAAA)");
      return;
    }

    try {
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('data_nascimento', dataNasc);

        // ATENÇÃO: Verifique se o caminho '/SPLQ_Server/backend/cadastro.php' está correto no seu XAMPP/WAMP
        const url = `http://${ip}/SPLQ_Server/backend/cadastro.php`;
        console.log("Tentando conectar em:", url); // Ajuda a debugar

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        const textResponse = await response.text(); 
        // Dica: Pegar como texto primeiro ajuda a ver se o PHP deu erro de HTML antes do JSON
        
        try {
            const data = JSON.parse(textResponse);
            
            if (data.sucesso) {
                Alert.alert('Sucesso', 'Cadastro Realizado e Pasta Criada!');
                navigation.goBack();
            } else {
                Alert.alert('Erro no Backend', data.erro || 'Ocorreu um erro desconhecido');
            }
        } catch (e) {
            console.error("Erro ao converter JSON:", textResponse);
            Alert.alert("Erro Fatal", "O servidor retornou algo que não é JSON. Verifique o console.");
        }

    } catch (error) {
        console.error(error);
        Alert.alert("Erro de Conexão", "Verifique se o IP está correto no ContextoLogin.js e se o servidor está rodando.");
    }
  }

  const insets = useSafeAreaInsets();
  const styles = mergeStyles({}) 

  return (
    <View style={{flex:1}}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', margin: '5%'}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
        {/* INPUT NOME */}
        <View style={styles.boxContainer}>
          <Text style={styles.labelText}>Nome de usuário</Text>
          <TextInput
              style={styles.inputField}
              placeholder='Nome de usuário'
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={nome}
              onChangeText={setNome}
          />
        </View>

        {/* INPUT EMAIL */}
        <View style={[styles.boxContainer, { marginTop: 10 }]}> 
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

        {/* INPUT SENHA */}
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

        {/* INPUT DATA */}
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
        
        <TouchableOpacity style={{marginTop: 10}} onPress={() => navigation.goBack()}>
            <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat'}}>Já tem uma conta?</Text>
            <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat'}}>Faça login agora!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
// styles deve ser declarado após o componente para evitar referência indefinida se não estiver no global
const styles = mergeStyles({})