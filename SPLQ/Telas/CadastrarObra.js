import React, { useState, useContext } from 'react';
import { 
  View, Text, ImageBackground, ScrollView, Image, 
  TouchableOpacity, TextInput, Modal, FlatList,
  KeyboardAvoidingView, Platform, Alert, ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mergeStyles } from '../components/GlobalStyles'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { AppContext } from '../components/ContextoLogin';

const image = require('../assets/background.png');
const placeholderCover = require('../assets/capa.png'); 

const availableTags = [
  { id: '1', name: 'Ação' }, { id: '2', name: 'Aventura' }, { id: '3', name: 'Comédia' },
  { id: '4', name: 'Drama' }, { id: '5', name: 'Fantasia' }, { id: '6', name: 'Ficção Científica' },
  { id: '7', name: 'Romance' }, { id: '8', name: 'Suspense' }, { id: '9', name: 'Terror' },
  { id: '10', name: 'Esportes' }, { id: '11', name: 'Musical' }, { id: '12', name: 'Histórico' },
];

export default function CadastrarObraScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { idUsu, ip } = useContext(AppContext);
  const styles = mergeStyles(LocalStyles);

  // Estados dos campos
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleTag = (tagName) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter(t => t !== tagName));
    } else if (selectedTags.length < 4) {
      setSelectedTags([...selectedTags, tagName]);
    } else {
      Alert.alert("Limite", "Selecione no máximo 4 gêneros.");
    }
  };

  const salvarObra = async () => {
    if (!nome || !autor || !sinopse) {
      Alert.alert("Erro", "Preencha os campos obrigatórios (Nome, Autor e Sinopse).");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('autor', autor);
      formData.append('editora', editora);
      formData.append('descricao', sinopse);
      formData.append('tags', selectedTags.join(', '));
      formData.append('idUsu', idUsu);

      const response = await fetch(`http://${ip}/SPLQ_Server/backend/cadastrar_obra.php`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.sucesso) {
        Alert.alert("Sucesso", data.mensagem);
        navigation.goBack();
      } else {
        Alert.alert("Erro", data.mensagem);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
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
        <Text style={styles.screentitle}>Cadastrar Obra</Text>
        <View style={{ width: 30 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={styles.coverUploadContainer}>
            <Image source={placeholderCover} style={styles.coverPreview} />
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.buttonText}>Alterar Capa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.labelText}>Nome da Obra *</Text>
            <TextInput style={styles.inputField} value={nome} onChangeText={setNome} placeholder="Título do mangá" placeholderTextColor="#999" />

            <Text style={styles.labelText}>Autor *</Text>
            <TextInput style={styles.inputField} value={autor} onChangeText={setAutor} placeholder="Nome do autor" placeholderTextColor="#999" />

            <Text style={styles.labelText}>Editora</Text>
            <TextInput style={styles.inputField} value={editora} onChangeText={setEditora} placeholder="Editora original" placeholderTextColor="#999" />

            <Text style={styles.labelText}>Sinopse *</Text>
            <TextInput 
              style={[styles.inputField, { height: 100 }]} 
              value={sinopse} 
              onChangeText={setSinopse} 
              multiline 
              placeholder="Conte um pouco sobre a história..."
              placeholderTextColor="#999"
            />

            <Text style={styles.labelText}>Gêneros (Max 4)</Text>
            <TouchableOpacity style={styles.tagSelector} onPress={() => setModalVisible(true)}>
              <Text style={styles.tagSelectorText}>
                {selectedTags.length > 0 ? selectedTags.join(', ') : "Selecionar Tags"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={salvarObra} disabled={loading}>
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Cadastrar Obra</Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Selecione os Gêneros</Text>
            <FlatList
              data={availableTags}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isSelected = selectedTags.includes(item.name);
                return (
                  <TouchableOpacity 
                    style={[styles.modalTagItem, isSelected && styles.modalTagSelected]} 
                    onPress={() => toggleTag(item.name)}
                  >
                    <Text style={styles.modalTagText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Confirmar</Text>
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
    marginBottom: 20
  },
  coverUploadContainer: { alignItems: 'center', marginVertical: 20 },
  coverPreview: { width: 150, height: 220, borderRadius: 10, backgroundColor: '#333' },
  formContainer: { paddingHorizontal: 20 },
  tagSelector: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 15
  },
  tagSelectorText: { color: 'white', fontFamily: 'Montserrat' },
  saveButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  modalCenteredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' },
  modalView: { backgroundColor: '#222', width: '85%', borderRadius: 20, padding: 20 },
  modalTagItem: { flex: 1, padding: 10, margin: 5, backgroundColor: '#444', borderRadius: 5, alignItems: 'center' },
  modalTagSelected: { backgroundColor: '#e74c3c' },
  modalTagText: { color: 'white', fontWeight: 'bold' },
  modalCloseButton: { backgroundColor: '#27ae60', padding: 10, borderRadius: 10, marginTop: 20, alignItems: 'center' }
};