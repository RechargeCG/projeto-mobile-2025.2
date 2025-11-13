import { Text, View, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
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
    <View style={{ flex: 1 }}>
      <ImageBackground source={image} style={styles.background}>
        <View style={{ paddingTop: useSafeAreaInsets().top, backgroundColor: '#ffffffaa' }} />
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Definindo o comportamento do teclado
        >
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
              style={{ ...styles.inputField, marginTop: 10 }}
              placeholder='Senha'
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={senha}
              secureTextEntry={true}
              onChangeText={setSenha}
            />
          </View>
          <TouchableOpacity style={{ ...styles.buttonContainer, marginTop: 10 }} onPress={fazerLogin}>
            <Text style={styles.buttonText}>Fazer Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 10 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat' }}>Não tem uma conta?</Text>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat' }}>Cadastre-se agora!</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = mergeStyles({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // boxContainer: {
  //   marginHorizontal: 20,
  //   marginBottom: 20,
  // },
  // inputField: {
  //   height: 50,
  //   backgroundColor: '#ffffff',
  //   borderRadius: 5,
  //   paddingHorizontal: 15,
  //   fontSize: 16,
  //   color: '#333',
  // },
  // buttonContainer: {
  //   backgroundColor: '#007BFF',
  //   paddingVertical: 15,
  //   borderRadius: 5,
  // },
  // buttonText: {
  //   color: '#fff',
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  //   fontSize: 16,
  // },
});
