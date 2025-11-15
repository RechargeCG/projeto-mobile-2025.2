import { Text, View, ImageBackground, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useContext } from 'react';
import { mergeStyles } from '../components/GlobalStyles';
import { AppContext } from '../components/ContextoLogin';

const image = require('../assets/background.png');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { setLogado } = useContext(AppContext);

  const fazerLogin = () => {
    if (email != '' && senha != null) {
      setLogado(true);
    }
    else {
      alert("Preencha os campos corretamente!");
    }
  }

  return (
    <View style={{flex:1}}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: useSafeAreaInsets().top, backgroundColor: '#ffffffaa' }} />
      <KeyboardAvoidingView style={[{flex: 1, justifyContent: 'center', margin: '5%'}]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.boxContainer}>
          <TextInput
              style={styles.inputField}
              placeholder='E-mail'
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={email}
              onChangeText={setEmail}
          />
        </View>
        <View style={styles.boxContainer}>
          <TextInput
              style={{...styles.inputField, marginTop: '10px'}}
              placeholder='Senha'
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={senha}
              secureTextEntry={true}
              onChangeText={setSenha}
          />
        </View>
        <TouchableOpacity style={{...styles.buttonContainer, marginTop: '10px'}} onPress={fazerLogin}>
            <Text style={styles.buttonText}>Fazer Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: '10px'}}>
            <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat'}}>Não tem uma conta?</Text>
            <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat'}}>Cadastre-se agora!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = mergeStyles({})
