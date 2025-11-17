import { 
  StyleSheet, Text, TextInput, View, ImageBackground, Modal, 
  FlatList, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableOpacity 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { mergeStyles } from '../components/GlobalStyles';
import { chapters } from '../assets/chapters';

const image = require('../assets/background.png');

const todoscapitulos = [
  { id: '0', name: '0' },
  { id: '1', name: '0.1' },
  { id: '2', name: '1' },
  { id: '3', name: '2' },
  { id: '4', name: '3' },
  { id: '5', name: '3.1' },
  { id: '6', name: '4' },
  { id: '7', name: '5' },
  { id: '8', name: '6' },
  { id: '9', name: '6.1' },
  { id: '10', name: '6.2' },
  { id: '11', name: '7' },
  { id: '12', name: '8' },
  { id: '13', name: 'Final' },
];

export default function CapituloScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [modalCapituloVisible, setModalCapituloVisible] = useState(false);
  const [modalPaginaVisible, setModalPaginaVisible] = useState(false);
  const [capitulo, setCapitulo] = useState(0);
  const [allPages, setAllPages] = useState(false);
  const [page, setPage] = useState(0);
  const [name, setName] = useState('');
  const [imagens, setImagens] = useState([]);

  const totalCapitulos = todoscapitulos.length;
  const totalPaginas = imagens.length;

  /** Carrega as imagens do capítulo selecionado */
  useEffect(() => {
    const nome = todoscapitulos[capitulo].name;

    if (!chapters[nome]) {
      console.log("Capítulo não encontrado:", nome);
      setImagens([]);
      return;
    }

    const lista = chapters[nome].map(img => Image.resolveAssetSource(img).uri);
    setImagens(lista);
    setPage(0);
  }, [capitulo]);

  return (
    <View style={styles.wrapper}>
      
      <ImageBackground source={image} style={styles.background} />

      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ margin: '2%' }}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={{ margin: '2%' }}>
          <Image source={require('../assets/avatar.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingBottom: insets.bottom }}>
        <View style={{margin: '5%'}}>
          {/* CONTROLE DO CAPÍTULO */}
          <View style={styles.changeChapter}>
            <View style={[styles.boxContainer, { marginRight: '15%' }]}>
              <TouchableOpacity style={styles.capituloButton} onPress={() => setModalCapituloVisible(true)}>
                <Text style={styles.capituloText}>Capítulo {todoscapitulos[capitulo].name}</Text>
                <Image source={require('../assets/arrow.png')} style={styles.capituloArrow} />
              </TouchableOpacity>
            </View>

            {/* seta esquerda */}
            <TouchableOpacity
              style={[styles.arrowButton, capitulo === 0 && styles.arrowDisabled]}
              onPress={() => capitulo > 0 && setCapitulo(capitulo - 1)}
              disabled={capitulo === 0}
            >
              <Image source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '90deg' }] }]} />
            </TouchableOpacity>

            {/* seta direita */}
            <TouchableOpacity
              style={[styles.arrowButton, capitulo === totalCapitulos - 1 && styles.arrowDisabled]}
              onPress={() => capitulo < totalCapitulos - 1 && setCapitulo(capitulo + 1)}
              disabled={capitulo === totalCapitulos - 1}
            >
              <Image source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '270deg' }] }]} />
            </TouchableOpacity>
          </View>

          {/* MODAL DE CAPÍTULOS */}
          <Modal animationType="slide" transparent visible={modalCapituloVisible}>
            <View style={styles.modalCenteredView}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione um capítulo</Text>

                <FlatList
                  data={todoscapitulos}
                  keyExtractor={i => i.id}
                  style={styles.modalListContainer}
                  contentContainerStyle={styles.modalListContent}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalTagItem}
                      onPress={() => {
                        setCapitulo(Number(item.id));
                        setModalCapituloVisible(false);
                      }}
                    >
                      <Text style={styles.modalTagText}>Capítulo {item.name}</Text>
                    </TouchableOpacity>
                  )}
                />

                <TouchableOpacity
                  style={[styles.modalButton, styles.modalCloseButton]}
                  onPress={() => setModalCapituloVisible(false)}
                >
                  <Text style={styles.modalTextStyle}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* CONTROLE DE PÁGINA */}
          <View style={styles.changeChapter}>
            <TouchableOpacity
              style={[styles.arrowButton, page === 0 && styles.arrowDisabled, { opacity: allPages ? 1 : 0 }]}
              onPress={() => page > 0 && setPage(page - 1)}
              disabled={page === 0 || !allPages}
            >
              <Image source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '90deg' }] }]} />
            </TouchableOpacity>

            <View style={styles.boxContainer}>
              <TouchableOpacity style={[styles.capituloButton,{width: 'auto',margin: 0,padding: 0 }]} onPress={() => setModalPaginaVisible(true)}>
                <Text style={styles.capituloText}>{page}</Text>
                {/* <Image source={require('../assets/arrow.png')} style={styles.capituloArrow} /> */}
              </TouchableOpacity>
            </View>
            
            {/* MODAL DE PÁGINAS */}
            <Modal animationType="slide" transparent visible={modalPaginaVisible}>
              <View style={styles.modalCenteredView}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Selecione uma página</Text>

                  <FlatList
                    data={totalPaginas}
                    keyExtractor={i => i.id}
                    style={styles.modalListContainer}
                    contentContainerStyle={styles.modalListContent}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.modalTagItem}
                        onPress={() => {
                          setPagina(Number(item.id));
                          setModalPaginaVisible(false);
                        }}
                      >
                        <Text style={styles.modalTagText}>Página {item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />

                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalCloseButton]}
                    onPress={() => setModalPaginaVisible(false)}
                  >
                    <Text style={styles.modalTextStyle}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.boxContainer}>
              <TouchableOpacity style={[styles.capituloButton, { width: '100%' }]} onPress={() => setAllPages(!allPages)}>
                <Text style={styles.capituloText}>Alterar modo</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.arrowButton, page === totalPaginas - 1 && styles.arrowDisabled, { opacity: allPages ? 1 : 0 }]}
              onPress={() => page < totalPaginas - 1 && setPage(page + 1)}
              disabled={page === totalPaginas - 1 || !allPages}
            >
              <Image source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '270deg' }] }]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* VIEWER */}
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          {imagens.length === 0 ? (
            <Text style={{ color: '#fff' }}>Carregando...</Text>
          ) : !allPages ? (
            // ========= WEBTOON MODE =========
            <View>
              {imagens.map((uri, idx) => (
                <Image
                  key={idx}
                  source={{ uri }}
                  style={{
                    width: '100%',
                    height: undefined,
                    resizeMode: 'contain',
                    aspectRatio: 1,
                    marginBottom: 4
                  }}
                />
              ))}
            </View>
          ) : (
            // ========= PAGE MODE =========
            <Image
              source={{ uri: imagens[page] }}
              style={{
                width: '100%',
                height: 600,
                resizeMode: 'cover'
              }}
            />
          )}
        </View>
        <View style={{margin: '5%'}}>
          {/* CONTROLE DE PÁGINA (duplicado) */}
          <View style={styles.changeChapter}>
            <TouchableOpacity
              style={[styles.arrowButton, page === 0 && styles.arrowDisabled, { opacity: allPages ? 1 : 0 }]}
              onPress={() => page > 0 && setPage(page - 1)}
              disabled={page === 0 || !allPages}
            >
              <Image source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '90deg' }] }]} />
            </TouchableOpacity>

            <View style={styles.boxContainer}>
              <TouchableOpacity style={[styles.capituloButton, { width: '100%' }]} onPress={() => setAllPages(!allPages)}>
                <Text style={styles.capituloText}>Alterar modo</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.arrowButton, page === totalPaginas - 1 && styles.arrowDisabled, { opacity: allPages ? 1 : 0 }]}
              onPress={() => page < totalPaginas - 1 && setPage(page + 1)}
              disabled={page === totalPaginas - 1 || !allPages}
            >
              <Image source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '270deg' }] }]} />
            </TouchableOpacity>
          </View>

          {/* INPUT NOME (com KeyboardAvoiding) */}
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.boxContainer}>
              <Text style={styles.labelText}>Nome</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Nome"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={name}
                onChangeText={setName}
              />
            </View>
          </KeyboardAvoidingView>
        </View>

      </ScrollView>

      <View style={{ paddingBottom: insets.bottom, backgroundColor: '#ffffffff', position: 'absolute', bottom: 0, left: 0, right: 0 }} />

    </View>
  );
}

/* -------------------------------- STYLES MANTIDOS ------------------------------- */
const LocalStyles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '2%',
  },
  modalTagItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capituloButton: {
    width: 174,
    height: 37,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  capituloText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '700',
  },
  capituloArrow: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  changeChapter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  arrowButton: {
    width: 44,
    height: 37,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowDisabled: {
    backgroundColor: '#555',
    opacity: 0.6,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
    resizeMode: 'contain',
  },
};

const styles = mergeStyles(LocalStyles);
