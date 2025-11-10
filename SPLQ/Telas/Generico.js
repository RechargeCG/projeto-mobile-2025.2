import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { mergeStyles } from '../components/GlobalStyles';

const image = require('../assets/background.png');
const OnePieceCover = require('../assets/one-piece.png');
const DemonSlayerCover = require('../assets/kimetsu.png');
const JujutsuKaisenCover = require('../assets/jujutsu.png');
const DragonBallCover = require('../assets/dragon-ball.png');

const covers = [
  { id: 1, source: OnePieceCover, title: "One Piece" },
  { id: 2, source: DemonSlayerCover, title: "Demon Slayer" },
  { id: 3, source: JujutsuKaisenCover, title: "Jujutsu Kaisen" },
  { id: 4, source: DragonBallCover, title: "DB Super" },
  { id: 5, source: DemonSlayerCover, title: "Demon Slayer 2" },
  { id: 6, source: JujutsuKaisenCover, title: "Jujutsu Kaisen 2" },
  { id: 7, source: OnePieceCover, title: "One Piece 2" },
  { id: 8, source: DragonBallCover, title: "DB Super 2" },
  { id: 9, source: DemonSlayerCover, title: "Demon Slayer 3" },
  { id: 10, primary: true, source: JujutsuKaisenCover, title: "Jujutsu Kaisen 3" },
];

const availableTags = [
  { id: '1', name: 'Ação' },
  { id: '2', name: 'Aventura' },
  { id: '3', name: 'Comédia' },
  { id: '4', name: 'Drama' },
  { id: '5', name: 'Fantasia' },
  { id: '6', name: 'Ficção Científica' },
  { id: '7', name: 'Romance' },
  { id: '8', name: 'Suspense' },
  { id: '9', name: 'Terror' },
  { id: '10', name: 'Esportes' },
  { id: '11', name: 'Musical' },
  { id: '12', name: 'Histórico' },
  { id: '13', name: 'Mecha' },
  { id: '14', name: 'Slice of Life' },
];

const NUM_COLUMNS = 3;

// Função auxiliar para agrupar o array em linhas de N elementos
const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

const chunkedCovers = chunkArray(covers, NUM_COLUMNS);

export default function GenericoScreen({ navigation }) {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTagIds, setSelectedTagIds] = useState('');
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const MAX_SELECTION_LIMIT = 4;
  let canBeExpanded = true;
  let descriptiontext='Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life...';
  if(true){
    descriptiontext = 'Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... abcde Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... Ação, Aventura, Fantasia, Isekai, Shounen, Slice of Life... ';
  }

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: useSafeAreaInsets().top, backgroundColor: '#ffffffaa' }} />
      <View style={styles.header}>
        <View style={{margin: '2%', alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={require('../assets/avatar.png')} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.container}>
          {/* <KeyboardAwareScrollView style={{flex: 1}}> */}
            <ScrollView>
              <Text style={styles.screentitle}>Título da página</Text>
              <View style={styles.coverBox}>
                <Image source={require('../assets/capa.png')} style={styles.cover} />
                <Text style={styles.covertitle}>Título da capa</Text>
              </View>
              <View style={styles.boxContainer}> 
                <Text style={styles.labelText}>Data de nascimento</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder='DD/MM/AAAA'
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={date}
                  onChangeText={setDate}
                  textContentType='date'
                />
              </View>
              <View style={styles.boxContainer}>
                <Text style={styles.labelText}>Nome</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder='Nome'
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.boxContainer}>
                <Text style={styles.labelText}>Tags</Text>
                <TouchableOpacity
                  style={styles.displayField} // Usa o novo estilo de "campo de exibição"
                  onPress={() => setModalVisible(true)} // Função que abrirá o modal
                >
                  <Text style={styles.displayFieldText}>
                    Selecione até {MAX_SELECTION_LIMIT} tags
                  </Text>
                </TouchableOpacity>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(false)} 
              >
                <View style={styles.modalCenteredView}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Selecione Gêneros</Text>
                    
                    <FlatList
                      data={availableTags} 
                      keyExtractor={(item) => item.id}
                      style={styles.modalListContainer}
                      contentContainerStyle={styles.modalListContent}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }) => {
                        const isSelected = selectedTagIds.includes(item.id);
                        
                        const toggleTag = (tagId) => {
                          // LÓGICA DE LIMITAÇÃO
                          if (isSelected) {
                            // 1. DESSELECIONAR: Sempre permitido.
                            setSelectedTagIds((prevSelected) =>
                              prevSelected.filter((id) => id !== tagId)
                            );
                          } else if (selectedTagIds.length < MAX_SELECTION_LIMIT) {
                            // 2. SELECIONAR: Permitido APENAS se o limite não foi atingido.
                            setSelectedTagIds((prevSelected) =>
                              [...prevSelected, tagId]
                            );
                          }
                          // Se o limite foi atingido e a tag não estava selecionada, nada acontece.
                        };

                        return (
                          <TouchableOpacity 
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
                          // Lógica de salvar (chame a função de salvar da tela pai aqui)
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.modalTextStyle}>Salvar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              <Text style={styles.sectiontitle}>Caixa de texto expansível</Text>
              <View style={styles.expandableBoxContainer}>
                <View style={styles.expandableBoxField}>
                  <TouchableOpacity
                    onPress={() => canBeExpanded ? setIsTextExpanded(!isTextExpanded):0} 
                    style={styles.expandableButton}
                  >
                    <Text 
                      style={styles.expandableBoxText}
                      numberOfLines={isTextExpanded ? undefined : 6} 
                    >
                      {/*Texto a ser exibido*/}
                      {descriptiontext}
                    </Text>
                    
                    {canBeExpanded && 
                      <Text style={styles.expandableButtonText}>
                        {isTextExpanded ? '... Ler Menos' : '... Ler Mais'}
                      </Text>
                    }
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Editar Perfil</Text>
              </TouchableOpacity>

              {/* --- LISTA ROLÁVEL (HORIZONTAL) --- */}
              <Text style={styles.sectiontitle}>Capas Roláveis (Horizontal)</Text>
              <ScrollView 
                style={styles.listContainerHorizontal}
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContentHorizontal}
              >
                {covers.map((item, index) => (
                  <TouchableOpacity key={item.id}>
                    <Image
                      source={item.source}
                      style={[
                        styles.listImageItem, 
                        index !== 0 && { marginLeft: 6 }
                      ]}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* --- LISTA EMPILHADA (GRID 3X) --- */}
              <Text style={styles.sectiontitle}>Capas Empilhadas (Grid 3x)</Text>
              <View style={styles.listContainerGrid}>
                {chunkedCovers.map((row, rowIndex) => (
                  <View 
                    key={rowIndex}
                    style={{ 
                      flexDirection: 'row', 
                      justifyContent: 'flex-start',
                    }}
                  >
                    {row.map((item, colIndex) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.gridItemWrapper}
                      >
                        <Image
                          source={item.source}
                          style={[styles.listGridImage,{maxHeight: '100%'}]}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    ))}
                    
                    {/* Preenchimento dos espaços vazios se a linha não estiver completa (apenas na última linha) */}
                    {rowIndex === chunkedCovers.length - 1 && row.length < NUM_COLUMNS && 
                      [...Array(NUM_COLUMNS - row.length)].map((_, emptyIndex) => (
                        <View key={`empty-${emptyIndex}`} style={styles.gridItemWrapper} />
                      ))
                    }
                  </View>
                ))}
              </View>
              
            </ScrollView>
          {/* </KeyboardAwareScrollView> */}
        </View>
      </View>
    </View>
  );
}

const styles = mergeStyles({});