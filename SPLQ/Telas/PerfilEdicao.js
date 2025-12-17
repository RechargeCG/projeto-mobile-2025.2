import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { mergeStyles } from '../components/GlobalStyles';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

// Biblioteca para escolher imagens (Certifique-se de que está instalada: npx expo install expo-image-picker)
import * as ImagePicker from 'expo-image-picker'; 

const image = require('../assets/background.png');

// **ATENÇÃO:** Substitua pelo URL do seu script PHP no servidor/ambiente de desenvolvimento
const API_URL = 'http://192.168.2.102/SPLQ_Server/backend/editar_perfil.php'; 

export default function PerfilEdicaoScreen({ }) {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemSelecionada, setImagemSelecionada] = useState(null); // URI da imagem

  // --- Funções de Manipulação de Imagem ---
  const pickImage = async () => {
    // Pedir permissão para acessar a biblioteca de mídia
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Desculpe, precisamos de permissão para acessar sua galeria.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // result.assets é um array, pegamos o primeiro elemento
      setImagemSelecionada(result.assets[0].uri); 
    }
  };
  
  // --- Função de Envio de Dados ---
  const handleSave = async () => {
    const formData = new FormData();

    // 1. Adicionar Nome e Descrição se alterados (para o PHP fazer o UPDATE)
    if (nome) {
        formData.append('nome', nome);
    }
    if (descricao) {
        formData.append('descricao', descricao);
    }

    // 2. Adicionar a Imagem, se selecionada
    if (imagemSelecionada) {
      const uriParts = imagemSelecionada.split('.');
      const fileType = uriParts[uriParts.length - 1];
      
      formData.append('imagem', {
        id: 1,
        uri: imagemSelecionada,
        name: `profile.${fileType}`, // Nome do arquivo no $_FILES do PHP
        type: `image/${fileType}`, // Tipo MIME
      });
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            // Não defina Content-Type, pois o FormData faz isso automaticamente (multipart/form-data)
            // Se precisar enviar tokens de sessão/autenticação, adicione-os aqui
        },
        body: formData,
      });

      // Se o PHP retornar um cabeçalho de Location, o fetch não segue por padrão
      if (response.ok) {
        // Você pode checar o corpo da resposta se o PHP retornar mensagens de sucesso/erro
        const textResponse = await response.text();
        console.log('Resposta do Servidor:', textResponse);
        
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        navigation.goBack(); // Volta para a tela de perfil após o sucesso
      } else {
        Alert.alert('Erro', 'Falha ao salvar o perfil. Status: ' + response.status);
      }
    } catch (error) {
      console.error('Erro de rede/servidor:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: useSafeAreaInsets().top, backgroundColor: '#ffffffaa' }} />
      {/* ... Seu Header ... */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ margin: '2%' }}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ margin: '2%' }}>
          <Image source={require('../assets/avatar.png')} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.screentitle}>Editar Perfil</Text>

            {/* Botão para Selecionar Imagem */}
            <TouchableOpacity 
              style={{ ...styles.buttonContainer, marginVertical: 20 }} 
              onPress={pickImage} // Chamada à função pickImage
            >
              <Text style={styles.buttonText}>Escolher imagem de perfil</Text>
            </TouchableOpacity>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[styles.sectiontitle, { marginTop: 0 }]}>Preview</Text>
              {/* Preview da Imagem Selecionada ou Avatar Padrão */}
              <Image 
                source={imagemSelecionada ? { uri: imagemSelecionada } : require('../assets/avatar.png')} 
                style={{ width: 200, height: 200, resizeMode: 'cover', borderRadius: 100 }} // Adicionado borderRadius para um visual de perfil
              />
            </View>

            {/* Input Nome */}
            <TextInput
              style={[styles.inputField, { marginTop: 20 }]}
              placeholder='Nome do usuário'
              placeholderTextColor={'white'}
              onChangeText={setNome} // Captura o valor do campo
              value={nome}
            ></TextInput>

            {/* Input Descrição */}
            <TextInput
              style={[styles.inputField, { marginTop: 10 }]}
              placeholder='Descrição do usuário'
              placeholderTextColor={'white'}
              onChangeText={setDescricao} // Captura o valor do campo
              value={descricao}
            ></TextInput>

            {/* Botão Salvar Alterações */}
            <TouchableOpacity 
              style={{ ...styles.buttonContainer, marginTop: 20, marginBottom: 10 }} 
              onPress={handleSave} // Chamada à função de envio
            >
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.buttonContainer, marginTop: 0 }}>
              <Text style={[styles.buttonText, { color: '#ff5555' }]}>Deletar Conta</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>

      <View style={{ paddingBottom: useSafeAreaInsets().bottom, backgroundColor: '#ffffffaa', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </View>
  );
}

// ... seus estilos Locais e mergeStyles
const LocalStyles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '2%',
  },
  // Certifique-se de que o inputField está definido nos seus estilos
  inputField: { 
    height: 50,
    backgroundColor: '#00000055',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16,
  }
};

const styles = mergeStyles(LocalStyles)