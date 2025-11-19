import React, { useState } from 'react';
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
  Platform 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mergeStyles } from '../components/GlobalStyles'; 
import Icon from 'react-native-vector-icons/Ionicons';


const image = require('../assets/background.png');
const avatar = require('../assets/avatar.png');

const placeholderCover = require('../assets/capa.png'); 


const availableTags = [
  { id: '1', name: 'Ação' }, { id: '2', name: 'Aventura' }, { id: '3', name: 'Comédia' },
  { id: '4', name: 'Drama' }, { id: '5', name: 'Fantasia' }, { id: '6', name: 'Ficção Científica' },
  { id: '7', name: 'Romance' }, { id: '8', name: 'Suspense' }, { id: '9', name: 'Terror' },
  { id: '10', name: 'Esportes' }, { id: '11', name: 'Musical' }, { id: '12', name: 'Histórico' },
  { id: '13', name: 'Mecha' }, { id: '14', name: 'Slice of Life' },
];
const MAX_SELECTION_LIMIT = 4;


export default function CadastrarObraScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const styles = mergeStyles(LocalStyles); // Styles agora inclui LocalStyles
  
  // --- ESTADOS DA TELA ---
  const [nomeObra, setNomeObra] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [sinopse, setSinopse] = useState('');
  
  // Estado para o Modal de Gêneros
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTagIds, setSelectedTagIds] = useState([]);


  
  const toggleTag = (tagId) => {
    const isSelected = selectedTagIds.includes(tagId);
    if (isSelected) {
      setSelectedTagIds((prevSelected) =>
        prevSelected.filter((id) => id !== tagId)
      );
    } else if (selectedTagIds.length < MAX_SELECTION_LIMIT) {
      setSelectedTagIds((prevSelected) =>
        [...prevSelected, tagId]
      );
    }
  };

  
  const getSelectedTagText = () => {
    if (selectedTagIds.length === 0) {
      return 'Selecionar tags';
    }
    const selectedNames = selectedTagIds.map(id => {
      const tag = availableTags.find(t => t.id === id);
      return tag ? tag.name : '';
    });
    return selectedNames.join(', ');
  };

 


  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />

      
     <View style={{ paddingTop: useSafeAreaInsets().top, backgroundColor: '#ffffffaa' }} />
      {/* HEADER CORRIGIDO: Usa styles.header definido no LocalStyles */}
      <View style={styles.header}>
        
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={avatar} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
          </TouchableOpacity>
        
      </View>

      {/* --- CORPO WRAPPER COM KEYBOARDAVOIDINGVIEW --- */}
      <KeyboardAvoidingView 
        style={styles.body} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            
            <Text style={[styles.screentitle, { marginBottom: 20 }]}>Cadastrar Obra</Text>

            
            <TouchableOpacity 
              style={[styles.buttonContainer, { marginBottom: 10, backgroundColor: 'rgba(0,0,0,0.6)' }]}
              
            >
              <Text style={styles.buttonText}>Escolher imagem de capa</Text>
            </TouchableOpacity>

            
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
            
              <Image 
                source={placeholderCover} 
                style={styles.cover} 
                resizeMode="cover"
              />
            </View>

            
            <View style={styles.boxContainer}> 
              <Text style={styles.labelText}>Nome da obra</Text>
              <TextInput
                style={styles.inputField}
                placeholder='Título completo da obra'
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={nomeObra}
                onChangeText={setNomeObra}
              />
            </View>
            
            
            <View style={styles.boxContainer}> 
              <Text style={styles.labelText}>Autor</Text>
              <TextInput
                style={styles.inputField}
                placeholder='Nome do autor/mangaká'
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={autor}
                onChangeText={setAutor}
              />
            </View>
            
           
            <View style={styles.boxContainer}> 
              <Text style={styles.labelText}>Editora</Text>
              <TextInput
                style={styles.inputField}
                placeholder='Nome da editora'
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={editora}
                onChangeText={setEditora}
              />
            </View>

            <View style={styles.boxContainer}> 
              <Text style={styles.labelText}>Sinopse</Text>
              <TextInput
               
                style={[styles.inputField, { height: 120, textAlignVertical: 'top' }]} 
                placeholder='Breve descrição da obra'
                placeholderTextColor="rgba(255, 255, 255, 0.4)" 
                value={sinopse}
                onChangeText={setSinopse}
                multiline={true}
              />
            </View>

            {/* Gênero (Tags) */}
            <View style={styles.boxContainer}>
              <Text style={styles.labelText}>Gênero (Tag)</Text>
              <TouchableOpacity
                style={styles.displayField}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.displayFieldText} numberOfLines={1}>
                  {getSelectedTagText()}
                </Text>
                
                <Text style={{ color: 'white', fontSize: 18, position: 'absolute', right: 15, top: 20 }}>⌄</Text> 
              </TouchableOpacity>
            </View>

            
            <TouchableOpacity 
              style={[styles.buttonContainer, { marginTop: 30, marginBottom: 50 }]}
              onPress={() => navigation.navigate('Quadrinho')}
            >
              <Text style={styles.buttonText}>Cadastrar Obra</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible} 
        onRequestClose={() => setModalVisible(false)} 
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione Gêneros (4 max)</Text>
            
            <FlatList
              data={availableTags} 
              keyExtractor={(item) => item.id}
              style={styles.modalListContainer}
              contentContainerStyle={styles.modalListContent}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = selectedTagIds.includes(item.id);

                return (
                  <TouchableOpacity 
                    key={item.id}
                    style={styles.modalTagItem} 
                    onPress={() => toggleTag(item.id)}
                  >
                    <Text style={styles.modalTagText}>{item.name}</Text>
                    
                    <View style={[
                      styles.modalCheckbox,
                      isSelected && styles.modalCheckboxSelected
                    ]}>
                      {isSelected && <Text style={styles.modalCheckMark}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />

            <View style={styles.modalButtonGroup}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalCloseButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalTextStyle}>Fechar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalSaveButton]} 
                onPress={() => { 
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalTextStyle}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}


// NOVO BLOCO: Definindo os estilos locais para o cabeçalho
const LocalStyles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Essencial para separar os ícones
    paddingHorizontal: 15, // Espaçamento nas laterais
    paddingVertical: 8, // Espaçamento vertical (opcional, mas ajuda)
  },
};

const styles = mergeStyles(LocalStyles);