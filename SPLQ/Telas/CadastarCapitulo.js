import React, { useState, useContext } from 'react';
import { 
  View, Text, ImageBackground, ScrollView, TouchableOpacity, 
  TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mergeStyles } from '../components/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import { AppContext } from '../components/ContextoLogin';
import { useRoute } from '@react-navigation/native';

const image = require('../assets/background.png');

export default function CadastrarCapituloScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { ip } = useContext(AppContext);
  
  // Recebe o idQua da tela de Quadrinho ou Perfil
  const { idQua } = route.params || { idQua: 1 }; 

  const [capituloNum, setCapituloNum] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [loading, setLoading] = useState(false);

  const selecionarArquivo = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ['application/x-cbz', 'application/zip', 'application/octet-stream'],
        copyToCacheDirectory: true,
      });

      if (!res.canceled) {
        setArquivo(res.assets[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCadastrar = async () => {
    if (!capituloNum || !arquivo) {
      Alert.alert("Erro", "Preencha o número do capítulo e selecione o arquivo .cbz");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('idQua', idQua);
      formData.append('numCap', capituloNum);
      
      // Preparação do arquivo para o FormData no mobile
      formData.append('arquivo', {
        uri: arquivo.uri,
        name: arquivo.name,
        type: 'application/octet-stream', 
      });

      const response = await fetch(`http://${ip}/SPLQ_Server/backend/cadastrar_capitulo.php`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Sucesso", "Capítulo enviado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", data.error || "Falha no upload");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  const styles = mergeStyles(LocalStyles);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: insets.top }} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={[styles.screentitle, { fontSize: 20 }]}>Novo Capítulo</Text>
        <View style={{ width: 30 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          
          <View style={styles.boxContainer}>
            <Text style={styles.labelText}>Número do capítulo</Text>
            <TextInput
              style={styles.inputField}
              placeholder='Ex: 1'
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={capituloNum}
              onChangeText={setCapituloNum}
              keyboardType='numeric'
            />
          </View>

          <View style={[styles.boxContainer, { marginTop: 20 }]}>
            <Text style={styles.labelText}>Arquivo do Capítulo (.cbz ou .zip)</Text>
            <TouchableOpacity style={styles.uploadArea} onPress={selecionarArquivo}>
              <Icon name="cloud-upload-outline" size={40} color="white" />
              <Text style={{ color: 'white', marginTop: 10 }}>
                {arquivo ? arquivo.name : "Clique para selecionar o arquivo"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.buttonContainer, { marginTop: 40, backgroundColor: loading ? '#555' : '#e74c3c' }]}
            onPress={handleCadastrar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Finalizar Cadastro</Text>
            )}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const LocalStyles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.05)'
  }
};