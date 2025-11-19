import { Text, View, ImageBackground, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useContext } from 'react';
import { mergeStyles } from '../components/GlobalStyles';
import { AppContext } from '../components/ContextoLogin';
// REMOVIDO: import CadastroScreen from './Cadastro'; // Não é necessário aqui

const image = require('../assets/background.png');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { setLogado } = useContext(AppContext);

  const fazerLogin = () => {
    if (email != '' && senha != '') {
      setLogado(true); // Isso é correto e aciona a navegação em App.js
    }
    else {
      alert("Preencha os campos corretamente!");
    }
  }

  // REMOVIDO: const [cadastro, setCadastro] = useState(false); // Estado não utilizado

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