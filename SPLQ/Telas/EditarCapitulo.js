import React, { useState, useContext } from 'react';
import { 
  View, Text, ImageBackground, ScrollView, Image, 
  TouchableOpacity, TextInput, KeyboardAvoidingView, 
  Platform, Alert, ActivityIndicator 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mergeStyles } from '../components/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import { AppContext } from '../components/ContextoLogin';
import { useRoute } from '@react-navigation/native';

const image = require('../assets/background.png');
const avatar = require('../assets/avatar.png');

export default function EditarCapituloScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { ip } = useContext(AppContext);
  
  // Recebe os dados do capítulo vindos da tela anterior
  const { capitulo } = route.params; 

  const [capituloNum, setCapituloNum] = useState(capitulo.numCap.toString());
  const [arquivo, setArquivo] = useState(null);
  const [loading, setLoading] = useState(false);

  const styles = mergeStyles(LocalStyles);

  const selecionarArquivo = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ['application/x-cbz', 'application/zip'],
        copyToCacheDirectory: true,
      });

      if (!res.canceled) {
        setArquivo(res.assets[0]);
      }
    } catch (err) {
      console.log("Erro ao selecionar arquivo:", err);
    }
  };

  const handleSalvar = async () => {
    if (!capituloNum) {
      Alert.alert("Erro", "O número do capítulo é obrigatório.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('idCap', capitulo.idCap);
      formData.append('numCap', capituloNum);
      
      // Se o usuário escolheu um novo arquivo, anexa-o
      if (arquivo) {
        formData.append('arquivo', {
          uri: arquivo.uri,
          name: arquivo.name,
          type: 'application/octet-stream', 
        });
      }

      const response = await fetch(`http://${ip}/SPLQ_Server/backend/editar_capitulo.php`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Sucesso", "Capítulo atualizado!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", data.error || "Erro ao atualizar");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha na conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />
      
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.screentitle}>Editar Capítulo</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Image source={avatar} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          
          <View style={styles.boxContainer}>
            <Text style={styles.labelText}>Arquivo do Capítulo</Text>
            <TouchableOpacity 
              style={[styles.buttonContainer, { backgroundColor: '#222', marginTop: 10 }]}
              onPress={selecionarArquivo}
            >
              <Text style={styles.buttonText}>
                {arquivo ? arquivo.name : "Substituir arquivo (.cbz)"}
              </Text>
            </TouchableOpacity>
            {!arquivo && <Text style={styles.helperText}>Deixe vazio para manter o arquivo atual</Text>}
          </View>

          <View style={[styles.boxContainer, { marginTop: 20 }]}> 
            <Text style={styles.labelText}>Número do capítulo</Text>
            <TextInput
              style={styles.inputField}
              placeholder='Ex: 105'
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={capituloNum}
              onChangeText={setCapituloNum}
              keyboardType='numeric'
            />
          </View>

          <TouchableOpacity 
            style={[styles.buttonContainer, { marginTop: 40, backgroundColor: loading ? '#555' : '#27ae60' }]}
            onPress={handleSalvar}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Salvar Alterações</Text>}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.buttonContainer, { marginTop: 15, backgroundColor: '#c0392b' }]}
            onPress={() => Alert.alert("Aviso", "Funcionalidade de exclusão em breve.")}
          >
            <Text style={styles.buttonText}>Excluir Capítulo</Text>
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
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  helperText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center'
  }
};