import { Text, View, ImageBackground, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react'; // REMOVIDO useEffect e useContext (não usados)
import { mergeStyles } from '../components/GlobalStyles';
// REMOVIDO: import { AppContext } from '../components/ContextoLogin';

const image = require('../assets/background.png');

export default function CadastroScreen({  }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNasc, setDataNasc] = useState('');

  // REMOVIDO: const { logado } = useContext(AppContext);

  // REMOVIDO: lógica de useEffect para dataNasc

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

  const fazerCadastro = () => {
    // Adicionada validação de tamanho para a data
    if (nome && email && senha && dataNasc.length === 10) { 
      alert('Cadastro Realizado.');
      navigation.goBack();
    }
    else {
      alert("Preencha os campos corretamente! (Data no formato DD/MM/AAAA)");
    }
  }

  const insets = useSafeAreaInsets();
  const styles = mergeStyles({}) // Styles deve ser inicializado fora do componente ou como está no final

  return (
    <View style={{flex:1}}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', margin: '5%'}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.boxContainer}>
          <TextInput
              style={styles.inputField}
              placeholder='Nome de usuário'
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={nome}
              onChangeText={setNome}
          />
        </View>
        <View style={[styles.boxContainer, { marginTop: 10 }]}> 
          <TextInput
              style={styles.inputField}
              placeholder='E-mail'
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={email}
              onChangeText={setEmail}
          />
        </View>
        <View style={[styles.boxContainer, { marginTop: 10 }]}> 
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
          <TextInput
              style={styles.inputField}
              placeholder='DD/MM/AAAA'
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={dataNasc}
              onChangeText={handleDataNascChange} // FUNÇÃO CORRIGIDA
              keyboardType='numeric'
              maxLength={10}
          />
        </View>
        <TouchableOpacity style={[styles.buttonContainer, { marginTop: 20 }]} onPress={fazerCadastro}>
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

// styles deve ser declarado após o componente para evitar referência indefinida se não estiver no global
const styles = mergeStyles({})