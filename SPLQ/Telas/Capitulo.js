import { 
  StyleSheet, Text, TextInput, View, ImageBackground, Modal, 
  FlatList, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableOpacity, Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { mergeStyles } from '../components/GlobalStyles';
import { chapters } from '../assets/chapters';
const image = require('../assets/background.png');

const { width: screenWidth } = Dimensions.get('window');
const totalPaddingHorizontal = 0; 
const imageContainerWidth = screenWidth - totalPaddingHorizontal;

const ProportionalImageItem = ({ uri }) => {
  // HOOKS NO NÍVEL SUPERIOR DO COMPONENTE ProportionalImageItem (CORRETO)
  const [aspectRatio, setAspectRatio] = useState(1); 

  useEffect(() => {
    Image.getSize(
      uri,
      (width, height) => {
        setAspectRatio(width / height);
      },
      (error) => {
        console.warn('Erro ao obter o tamanho da imagem:', error);
      }
    );
  }, [uri]);

  return (
    <View 
      style={{
        width: imageContainerWidth,
        // marginBottom: 10,
      }} 
    >
      <Image
        source={{ uri }}
        style={{
          width: '100%',
          aspectRatio: aspectRatio, 
          backgroundColor: 'black', 
          resizeMode: 'contain', 
        }}
      />
    </View>
  );
};

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

const todoscomentarios = [
  {
    id: 1,
    text: "Obrigado pela informação detalhada! Estava procurando exatamente esse ponto sobre a implementação assíncrona. No entanto, notei um pequeno erro na linha 45 do seu código de exemplo. Não deveria ser 'const data = await fetchAPI()' em vez de apenas 'fetchAPI()'? Acredito que isso está causando um race condition em navegadores mais antigos. Além disso, a seção sobre otimização de imagens poderia incluir uma menção sobre o WebP, que é crucial para performance mobile hoje em dia. Poderia expandir um pouco mais sobre isso na próxima atualização? Seria de grande valia para quem está começando em desenvolvimento full-stack.",
  },
  {
    id: 2,
    text: "Comentário curto.",
  },
  {
    id: 3,
    text: "Este é um texto um pouco maior, mas não o suficiente para ser expandido, o que torna o botão 'Ler Mais' invisível. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    text: "Absolutamente fascinante a forma como você abordou a arquitetura de microservices. Principalmente a parte onde descreve a comunicação via Kafka. Tenho tido problemas com a latência na orquestração de eventos e a sua sugestão de usar o padrão Saga com compensação parece ser a solução ideal. Vou tentar implementar isso no meu projeto ainda esta semana e te dou um feedback. Esse artigo salvou meu deadline! Muito obrigado mesmo por compartilhar seu conhecimento técnico com tanta clareza. Você é um mestre!",
  },
];

export default function CapituloScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [modalCapituloVisible, setModalCapituloVisible] = useState(false);
  const [modalPaginaVisible, setModalPaginaVisible] = useState(false);
  const [capitulo, setCapitulo] = useState(2);
  const [allPages, setAllPages] = useState(false);
  const [page, setPage] = useState(0);
  const [name, setName] = useState('');
  const [imagens, setImagens] = useState([]);
  const [expandedStates, setExpandedStates] = useState({});

  const toggleExpand = (commentId) => {
    setExpandedStates(prevStates => ({
      ...prevStates,
      [commentId]: !prevStates[commentId],
    }));
  };

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

  return(
    <View style={[styles.wrapper,{paddingBottom: '10%'}]}>
      
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
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
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
              style={[styles.arrowButton, page <= 0 && styles.arrowDisabled, { opacity: !allPages ? 1 : 0 }]}
              onPress={() => page > 0 && setPage(page - 1)}
              disabled={page <= 0 || allPages}
            >
              <Image source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '90deg' }] }]} />
            </TouchableOpacity>
            
            {!allPages &&
              <View style={styles.boxContainer}>
                <TouchableOpacity style={[styles.capituloButton,{width: 'auto',margin: 0,padding: 0 }]} onPress={() => setModalPaginaVisible(true)}>
                  <Text style={styles.capituloText}>{page+1}</Text>
                </TouchableOpacity>
              </View>
            }
            
            {/* MODAL DE PÁGINAS */}
            <Modal animationType="slide" transparent visible={modalPaginaVisible}>
              <View style={styles.modalCenteredView}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Selecione uma página</Text>

                  <FlatList
                    data={Array.from({ length: totalPaginas }, (_, index) => index + 1)} // Gera um array de números
                    keyExtractor={item => item.toString()} // Usamos o número como chave
                    style={styles.modalListContainer}
                    contentContainerStyle={styles.modalListContent}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.modalTagItem}
                        onPress={() => {
                          setPage(item-1); // Definindo a página com o número
                          setModalPaginaVisible(false);
                        }}
                      >
                        <Text style={styles.modalTagText}>Página {item}</Text>
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
              style={[styles.arrowButton, page >= totalPaginas - 1 && styles.arrowDisabled, { opacity: !allPages ? 1 : 0 }]}
              onPress={() => page < totalPaginas - 1 && setPage(page + 1)}
              disabled={page >= totalPaginas - 1 || allPages}
            >
              <Image source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '270deg' }] }]} />
            </TouchableOpacity>
          </View>
        </View>

        {
        /* Colocar no lugar da visualização de página inteira
            <FlatList
              data={imagens}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
            />


            <View style={styles.footer}>
              <Text>Conteúdo Abaixo da Lista</Text>
            </View>
        */
        }

        {/* VIEWER */}
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          {imagens.length === 0 ? (
            <Text style={{ color: '#fff', flex: 1, alignSelf: 'center' }}>Carregando...</Text>
          ) : allPages ? (
            // ========= WEBTOON MODE =========
            <View>
              {imagens.map((uri, idx) => (
                // Chama o componente ProportionalImageItem, que gerencia seu próprio estado
                <ProportionalImageItem 
                  uri={uri} 
                  key={idx} 
                  // Não adicione Hooks aqui!
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
              style={[styles.arrowButton, page <= 0 && styles.arrowDisabled, { opacity: !allPages ? 1 : 0 }]}
              onPress={() => page > 0 && setPage(page - 1)}
              disabled={page <= 0 || allPages}
            >
              <Image source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '90deg' }] }]} />
            </TouchableOpacity>

            {!allPages &&
              <View style={styles.boxContainer}>
                <TouchableOpacity style={[styles.capituloButton,{width: 'auto',margin: 0,padding: 0 }]} onPress={() => setModalPaginaVisible(true)}>
                  <Text style={styles.capituloText}>{page+1}</Text>
                </TouchableOpacity>
              </View>
            }

            <View style={styles.boxContainer}>
              <TouchableOpacity style={[styles.capituloButton, { width: '100%' }]} onPress={() => setAllPages(!allPages)}>
                <Text style={styles.capituloText}>Alterar modo</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.arrowButton, page >= totalPaginas - 1 && styles.arrowDisabled, { opacity: !allPages ? 1 : 0 }]}
              onPress={() => page < totalPaginas - 1 && setPage(page + 1)}
              disabled={page >= totalPaginas - 1 || allPages}
            >
              <Image source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '270deg' }] }]} />
            </TouchableOpacity>
          </View>

          {/* INPUT NOME (com KeyboardAvoiding) */}
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.boxContainer}>
              <Text style={styles.labelText}>Comentar</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Digite seu comentário..."
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={name}
                onChangeText={setName}
              />
            </View>
            {todoscomentarios.map((item, index) => {
              const canBeExpanded = item.text.length > 100; 
              const isTextExpanded = expandedStates[item.id] || false;

              return (
                <View 
                  key={item.id}
                  style={[
                    styles.expandableBoxContainer, 
                    index > 0 && { marginTop: 10 }
                  ]}
                >
                  <View style={styles.expandableBoxField}>
                    <Text 
                      style={styles.expandableBoxText}
                      numberOfLines={isTextExpanded ? undefined : 4} 
                    >
                      {item.text}
                    </Text>
                    
                    <TouchableOpacity
                      onPress={() => canBeExpanded ? toggleExpand(item.id) : 0} 
                      style={styles.expandableButton}
                    >
                      {canBeExpanded && 
                        <Text style={styles.expandableButtonText}>
                          {isTextExpanded ? '... Ler Menos' : '... Ler Mais'}
                        </Text>
                      }
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </KeyboardAvoidingView>
        </View>

      </ScrollView>

      <View style={{ paddingBottom: insets.bottom, backgroundColor: '#ffffffff', position: 'absolute', bottom: 0, left: 0, right: 0 }} />

    </View>
  );
}

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
