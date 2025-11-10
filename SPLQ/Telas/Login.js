import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { mergeStyles } from '../components/GlobalStyles';
import { Button } from 'react-native-web';

const image = require('../assets/background.png');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={{flex:1}}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: useSafeAreaInsets().top, backgroundColor: '#ffffffaa' }} />
      <View style={styles.body}>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
                style={styles.inputField}
                placeholder='E-mail'
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={{...styles.inputField, marginTop: '10px'}}
                placeholder='Senha'
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={senha}
                onChangeText={setSenha}
            />
            <TouchableOpacity style={{...styles.buttonContainer, marginTop: '10px'}}>
                <Text style={styles.buttonText}>Fazer Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: '100px'}}>
                <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat'}}>Não tem uma conta?</Text>
                <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat'}}>Cadastre-se agora!</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = mergeStyles({})
