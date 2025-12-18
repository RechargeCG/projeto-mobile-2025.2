import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  Modal, 
  FlatList,
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mergeStyles } from '../components/GlobalStyles'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { AppContext } from '../components/ContextoLogin';
import { useNavigation, useRoute } from '@react-navigation/native';

const image = require('../assets/background.png');
const placeholderCover = require('../assets/capa.png'); 

const availableTags = [
  { id: '1', name: 'Ação' }, { id: '2', name: 'Aventura' }, { id: '3', name: 'Comédia' },
  { id: '4', name: 'Drama' }, { id: '5', name: 'Fantasia' }, { id: '6', name: 'Ficção Científica' },
  { id: '7', name: 'Romance' }, { id: '8', name: 'Suspense' }, { id: '9', name: 'Terror' },
  { id: '10', name: 'Esportes' }, { id: '11', name: 'Musical' }, { id: '12', name: 'Histórico' },
  { id: '13', name: 'Mecha' }, { id: '14', name: 'Slice of Life' },
];

export default function EditarObraScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const { idUsu, ip } = useContext(AppContext);
  const { idQua } = route.params; // ID da obra vindo da navegação

  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const styles = mergeStyles(LocalStyles);

  // Carregar dados da obra ao iniciar
  useEffect(() => {
    fetchObra();
  }, []);

  const fetchObra = async () => {
    try {
      const formData = new FormData();
      formData.append('idQua', idQua);

      const response = await fetch(`http://${ip}/SPLQ_Server/backend/quadrinho.php`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setNome(data.quadrinho.nome);
        setAutor(data.quadrinho.autor);
        setEditora(data.quadrinho.editora);
        setDescricao(data.quadrinho.descricao);
        // Ajuste conforme o formato que as tags salvam no seu banco (ex: string separada por vírgula)
        if (data.quadrinho.tag) {
           setSelectedTags(data.quadrinho.tag.split(', '));
        }
      } else {
        Alert.alert("Erro", "Não foi possível carregar os dados da obra.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const salvarAlteracoes = async () => {
    if (!nome || !autor) {
      Alert.alert("Erro", "Nome e Autor são obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('idQua', idQua);
      formData.append('nome', nome);
      formData.append('autor', autor);
      formData.append('editora', editora);
      formData.append('descricao', descricao);
      formData.append('tags', selectedTags.join(', '));
      formData.append('idUsu', idUsu);

      // Substituir pelo seu arquivo de update no backend
      const response = await fetch(`http://${ip}/SPLQ_Server/backend/editar_obra.php`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        Alert.alert("Sucesso", "Obra atualizada com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", result.error || "Erro ao atualizar obra.");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tagName) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter(t => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  if (loading && !nome) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />
      
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.screentitle}>Editar Obra</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <TouchableOpacity style={styles.coverUploadButton}>
              <Image source={placeholderCover} style={styles.coverPreview} />
              <View style={styles.uploadIconBadge}>
                <Icon name="camera" size={20} color="white" />
              </View>
            </TouchableOpacity>
            <Text style={styles.uploadText}>Alterar Capa</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.boxContainer}>
              <Text style={styles.labelText}>Título da Obra</Text>
              <TextInput
                style={styles.inputField}
                value={nome}
                onChangeText={setNome}
                placeholder="Ex: One Piece"
                placeholderTextColor="rgba(255,255,255,0.5)"
              />
            </View>

            <View style={styles.boxContainer}>
              <Text style={styles.labelText}>Autor</Text>
              <TextInput
                style={styles.inputField}
                value={autor}
                onChangeText={setAutor}
                placeholder="Nome do autor"
                placeholderTextColor="rgba(255,255,255,0.5)"
              />
            </View>

            <View style={styles.boxContainer}>
              <Text style={styles.labelText}>Editora</Text>
              <TextInput
                style={styles.inputField}
                value={editora}
                onChangeText={setEditora}
                placeholder="Nome da editora"
                placeholderTextColor="rgba(255,255,255,0.5)"
              />
            </View>

            <View style={styles.boxContainer}>
              <Text style={styles.labelText}>Sinopse / Descrição</Text>
              <TextInput
                style={[styles.inputField, { height: 100, textAlignVertical: 'top' }]}
                value={descricao}
                onChangeText={setDescricao}
                multiline
                placeholder="Escreva sobre a obra..."
                placeholderTextColor="rgba(255,255,255,0.5)"
              />
            </View>

            <TouchableOpacity 
              style={styles.tagSelectorButton} 
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>
                Tags: {selectedTags.length > 0 ? selectedTags.join(', ') : 'Selecionar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.buttonContainer, { marginTop: 30 }]} 
              onPress={salvarAlteracoes}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Salvar Alterações</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Escolha as Tags</Text>
            <FlatList
              data={availableTags}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={({ item }) => {
                const isSelected = selectedTags.includes(item.name);
                return (
                  <TouchableOpacity 
                    style={[styles.tagItem, isSelected && styles.tagItemSelected]} 
                    onPress={() => toggleTag(item.name)}
                  >
                    <Text style={styles.tagText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity 
              style={[styles.buttonContainer, { width: '100%', marginTop: 20 }]} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const LocalStyles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  coverUploadButton: {
    width: 150,
    height: 220,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#222',
    elevation: 5,
  },
  coverPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadIconBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },
  uploadText: {
    color: 'white',
    marginTop: 10,
    fontFamily: 'Montserrat',
  },
  tagSelectorButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tagItem: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  tagItemSelected: {
    backgroundColor: '#e74c3c',
  },
  tagText: {
    color: 'white',
  }
};