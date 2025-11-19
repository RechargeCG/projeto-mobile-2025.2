import { Text, View, ImageBackground, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useContext, useEffect } from 'react';
import { mergeStyles } from '../components/GlobalStyles';
import { AppContext } from '../components/ContextoLogin';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/background.png');

export default function CadastroScreen({  }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNasc, setDataNasc] = useState('');

  const { logado } = useContext(AppContext);

  const navigation = useNavigation();

  let length = dataNasc.length;

  const formatarData = useEffect(() => {
    if (dataNasc.length == 2 && length < 2)
        setDataNasc(dataNasc.concat('/'));
  });

  const fazerCadastro = () => {
    if (nome && email && senha  && dataNasc) {
      alert('Cadastro Realizado.');
      navigation.goBack();
    }
    else {
      alert("Preencha os campos corretamente!");
    }
  }

  return (
    <View style={{flex:1}}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: useSafeAreaInsets().top, backgroundColor: '#ffffffaa' }} />
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', margin: '5%'}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.boxContainer}>
          <TextInput
              style={styles.inputField}
              placeholder='Nome de usuário'
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={nome}
              onChangeText={setNome}
          />
        </View>
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
        <View style={styles.boxContainer}>
          <TextInput
              style={{...styles.inputField, marginTop: '10px'}}
              placeholder='DD/MM/AAAA'
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={dataNasc}
              onChangeText={(text) => {formatarData; setDataNasc(text)}}
          />
        </View>
        <TouchableOpacity style={{...styles.buttonContainer, marginTop: '10px'}} onPress={fazerCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: '10px'}} onPress={() => navigation.goBack()}>
            <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat'}}>Já tem uma conta?</Text>
            <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat'}}>Faça login agora!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = mergeStyles({})
