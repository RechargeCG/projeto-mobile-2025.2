import { 
  StyleSheet, Text, TextInput, View, ImageBackground, Modal, 
  FlatList, ScrollView, Image, KeyboardAvoidingView, Platform, 
  TouchableOpacity, Dimensions, ActivityIndicator, Alert // Adicionado ActivityIndicator e Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native'; // Adicionado useRoute
import { useState, useEffect } from 'react';
import { mergeStyles } from '../components/GlobalStyles';

const image = require('../assets/background.png');

const { width: screenWidth } = Dimensions.get('window');
const imageContainerWidth = screenWidth;

// Componente para exibir imagens proporcionais (mantido)
const ProportionalImageItem = ({ uri }) => {
  const [aspectRatio, setAspectRatio] = useState(1); 

  useEffect(() => {
    if (!uri) return; // Garante que não tente carregar URI nulo
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

  if (!uri) return null; // Não renderiza se não houver URI

  return (
    <View style={{ width: imageContainerWidth }}>
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

// Dados de mock (remanescentes) removidos: todoscapitulos, todoscomentarios.
// O 'chapters' importado agora é desnecessário se estamos usando o fetch.

export default function CapituloScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  
  // --- PARÂMETROS RECEBIDOS DA NAVEGAÇÃO ---
  // O idCap será usado para o fetch. O numCap é usado na UI.
  // Assumindo que você passa idCap e numCap (opcionalmente)
  const { idCap, numCap } = /*route.params ||*/ { idCap: 1, numCap: 1 }; 

  alert(idCap);
  
  // --- SIMULAÇÃO DO USUÁRIO LOGADO ---
  // EM PRODUÇÃO, O idUsu DEVE VIR DE UM CONTEXTO/STORE/ASYNCSTORAGE
  const idUsuarioLogado = 1; // Exemplo: ID do usuário logado

  // --- ESTADOS DE CARREGAMENTO E DADOS ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [quadrinhoData, setQuadrinhoData] = useState(null);
  const [capituloData, setCapituloData] = useState(null);
  const [paginas, setPaginas] = useState([]); // Array de URIs de páginas
  const [comentarios, setComentarios] = useState([]); // Array de objetos de comentário
  
  // --- ESTADOS DA UI ---
  const [modalCapituloVisible, setModalCapituloVisible] = useState(false);
  const [modalPaginaVisible, setModalPaginaVisible] = useState(false);
  // O nome do capítulo (numeral) será obtido de capituloData ou numCap recebido
  const [page, setPage] = useState(0); 
  const [allPages, setAllPages] = useState(false); // Modo Webtoon
  const [novoComentario, setNovoComentario] = useState(''); // Estado para o novo comentário
  const [expandedStates, setExpandedStates] = useState({});

  // --- FUNÇÃO PARA EXCLUIR COMENTÁRIO (Placeholder) ---
  const handleDeleteComment = (idCom) => {
    // Implementar a lógica de DELETE aqui (fetch para um delete_comentario.php)
    Alert.alert("Excluir Comentário", `Você tem certeza que deseja excluir o comentário ${idCom}?`);
    // Após o sucesso do delete no backend, você deve chamar fetchCapitulo() novamente
    // ou remover o comentário do estado 'comentarios' localmente.
  };

  const toggleExpand = (commentId) => {
    setExpandedStates(prevStates => ({
      ...prevStates,
      [commentId]: !prevStates[commentId],
    }));
  };

  // --- FUNÇÃO PARA BUSCAR DADOS DO CAPÍTULO ---
  const fetchCapitulo = async () => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('idCap', idCap); 

      // URL base do seu backend
      const response = await fetch('http://192.168.1.7/SPLQ_Server/backend/capitulo.php', {
        method: 'POST',
        body: formData,
      });

      // Se o erro HTML persistir, use esta abordagem:
      // const textData = await response.text();
      // console.log("Resposta bruta:", textData);
      // const data = JSON.parse(textData);
      
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }
      
      setCapituloData(data.capitulo);
      setQuadrinhoData(data.quadrinho);
      setPaginas(data.paginas || []);
      setComentarios(data.comentarios || []);
      setPage(0); // Volta sempre para a primeira página ao carregar

    } catch (err) {
      setError(`Falha ao carregar o capítulo: ${err.message}`);
      Alert.alert("Erro de Rede", `Não foi possível carregar o capítulo. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idCap) {
      fetchCapitulo();
    }
  }, [idCap]); // Recarrega se o idCap mudar

  // --- Variáveis derivadas (para uso na UI) ---
  const totalPaginas = paginas.length;
  // O id do publicador é o fk_Usuario_idUsu do quadrinho
  const idPublicadorQuadrinho = quadrinhoData ? parseInt(quadrinhoData.fk_Usuario_idUsu) : null;
  // O usuário logado pode deletar se for o dono do comentário OU o publicador do quadrinho.
  const isPublicador = idUsuarioLogado === idPublicadorQuadrinho;
  const nomeCapituloDisplay = capituloData ? `Capítulo ${capituloData.numCap}` : `Capítulo ${numCap || '...'}`;


  // --- Renderização de Status ---
  if (loading) {
    return (
      <View style={[styles.wrapper, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{color: 'white', marginTop: 10}}>Carregando Capítulo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.wrapper, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
        <TouchableOpacity 
            style={[styles.modalButton, { marginTop: 20, backgroundColor: '#333' }]} 
            onPress={fetchCapitulo}
        >
            <Text style={styles.modalTextStyle}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- Renderização Principal ---
  return(
    <View style={[styles.wrapper,{marginBottom: insets.bottom}]}>
      
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
          {/* CONTROLE DO CAPÍTULO (MOCK para mudança de capítulo) */}
          <View style={styles.changeChapter}>
            <View style={[styles.boxContainer, { marginRight: '15%' }]}>
              <TouchableOpacity style={styles.capituloButton} onPress={() => Alert.alert("Navegação de Capítulos", "A navegação de capítulos precisa buscar a lista completa de capítulos do Quadrinho.")}>
                <Text style={styles.capituloText}>{nomeCapituloDisplay}</Text>
                <Image source={require('../assets/arrow.png')} style={styles.capituloArrow} />
              </TouchableOpacity>
            </View>

            {/* seta esquerda/direita (Navegação precisa de lista completa do quadrinho, simulando desabilitado) */}
            <TouchableOpacity
              style={[styles.arrowButton, styles.arrowDisabled]}
              disabled={true}
            >
              <Image source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '90deg' }] }]} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.arrowButton, styles.arrowDisabled]}
              disabled={true}
            >
              <Image source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '270deg' }] }]} />
            </TouchableOpacity>
          </View>

          {/* MODAL DE CAPÍTULOS (Removido, pois exige a lista completa do quadrinho) */}
          {/* CONTROLE DE PÁGINA */}
          <View style={[styles.changeChapter, { marginTop: 10 }]}>
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
                  <Text style={styles.capituloText}>{page+1} / {totalPaginas}</Text>
                </TouchableOpacity>
              </View>
            }
            
            {/* MODAL DE PÁGINAS (Com FlatList para as páginas carregadas) */}
            <Modal animationType="slide" transparent visible={modalPaginaVisible}>
              <View style={styles.modalCenteredView}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Selecione uma página</Text>

                  <FlatList
                    data={Array.from({ length: totalPaginas }, (_, index) => index + 1)} 
                    keyExtractor={item => item.toString()} 
                    style={styles.modalListContainer}
                    contentContainerStyle={styles.modalListContent}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.modalTagItem}
                        onPress={() => {
                          setPage(item-1); 
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
                <Text style={styles.capituloText}>{allPages ? 'Página Única' : 'Webtoon'}</Text>
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

        {/* VIEWER */}
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          {paginas.length === 0 ? (
            <Text style={{ color: '#fff', flex: 1, alignSelf: 'center', marginTop: 50, marginBottom: 50 }}>
              Nenhuma página encontrada para este capítulo.
            </Text>
          ) : allPages ? (
            // ========= WEBTOON MODE =========
            <View>
              {paginas.map((uri, idx) => (
                <ProportionalImageItem uri={uri} key={idx} />
              ))}
            </View>
            
          ) : (
            // ========= PAGE MODE =========
            <ProportionalImageItem uri={paginas[page]} />
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
                  <Text style={styles.capituloText}>{page+1} / {totalPaginas}</Text>
                </TouchableOpacity>
              </View>
            }

            <View style={styles.boxContainer}>
              <TouchableOpacity style={[styles.capituloButton, { width: '100%' }]} onPress={() => setAllPages(!allPages)}>
                <Text style={styles.capituloText}>{allPages ? 'Página Única' : 'Webtoon'}</Text>
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

          {/* INPUT COMENTÁRIO */}
          <Text style={styles.sectiontitle}>Comentários</Text>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.boxContainer}>
              <View style={[styles.expandableBoxField,{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
                    <TextInput
                      style={{color: 'white',}}
                      multiline={true}
                      placeholder="Digite seu comentário..."
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      value={novoComentario}
                      onChangeText={setNovoComentario}
                      // Adicione um limite de caracteres
                      maxLength={500} 
                    />
                  </View>
                  <TouchableOpacity 
                    style={{marginLeft: 20}}
                    onPress={() => Alert.alert("Enviar Comentário", novoComentario)} // Placeholder para envio
                    disabled={!novoComentario.trim()} // Desabilita se vazio
                  >
                    <Icon name={'send'} size={20} color={novoComentario.trim() ? 'white' : 'rgba(255,255,255,0.4)'}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{height: 2, backgroundColor: 'white', borderRadius: 5, marginVertical: 10}}/>

            {/* LISTA DE COMENTÁRIOS */}
            {comentarios.map((item, index) => {
              // A exclusão é permitida se:
              // 1. O usuário logado for o dono do comentário (comparando idUsu do comentário)
              // 2. OU O usuário logado for o publicador do quadrinho (comparando idUsu do quadrinho)
              const podeDeletar = (item.idUsu === idUsuarioLogado) || isPublicador;
              
              const canBeExpanded = item.texto.length > 100; 
              const isTextExpanded = expandedStates[item.idCom] || false; // Usamos idCom para o estado

              return (
                <View 
                  key={item.idCom || index} // Usamos idCom como key
                  style={[
                    styles.expandableBoxContainer, 
                    index > 0 && { marginTop: 10 },
                  ]}
                >
                  <View style={[styles.expandableBoxField,{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%'}}>
                      
                      {/* DETALHES DO USUÁRIO */}
                      <TouchableOpacity onPress={() => navigation.navigate('Perfil', { idUsu: item.idUsu })}>
                        <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                          {/* O backend retorna fonte_foto, mas usando avatar.png por convenção */}
                          <Image source={require('../assets/avatar.png')} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
                          <Text style={[styles.expandableBoxText,{marginLeft: 10, maxWidth: '80%', fontWeight: 'bold'}]} numberOfLines={1} >{item.nome}</Text>
                        </View>
                      </TouchableOpacity>
                      
                      {/* TEXTO DO COMENTÁRIO */}
                      <Text 
                        style={[styles.expandableBoxText, { marginTop: 5 }]}
                        numberOfLines={isTextExpanded ? undefined : 4} 
                      >
                        {item.texto}
                      </Text>
                      
                      {/* BOTÃO LER MAIS/MENOS */}
                      <TouchableOpacity
                        onPress={() => canBeExpanded ? toggleExpand(item.idCom) : null} 
                        style={styles.expandableButton}
                      >
                        {canBeExpanded && 
                          <Text style={styles.expandableButtonText}>
                            {isTextExpanded ? '... Ler Menos' : '... Ler Mais'}
                          </Text>
                        }
                      </TouchableOpacity>
                      
                      {/* Data (Opcional) */}
                      {item.data && <Text style={[styles.expandableButtonText, { fontSize: 10, marginTop: 5 }]}>{new Date(item.data).toLocaleDateString()}</Text>}
                    </View>
                    
                    {/* BOTÃO DE DELETAR (CONDICIONAL) */}
                    {podeDeletar && (
                      <TouchableOpacity 
                        style={{marginLeft: 15}}
                        onPress={() => handleDeleteComment(item.idCom)}
                      >
                        <Icon name={'trash'} size={30} color={'white'}/>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </KeyboardAvoidingView>
        </View>

      </ScrollView>

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
  modalTextStyle: {
      color: 'white', // Adicionado para consistência
      fontWeight: 'bold',
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
      color: 'white',
      fontSize: 20,
      marginBottom: 15,
      fontWeight: 'bold',
  },
  modalListContainer: {
      maxHeight: 300,
      width: '100%',
  },
  modalListContent: {
      alignItems: 'center',
  },
  modalTagText: {
      color: 'white',
      fontSize: 16,
  },
  modalCloseButton: {
      marginTop: 15,
      backgroundColor: '#555',
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
  expandableBoxContainer: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  expandableBoxField: {
    padding: 5,
  },
  expandableBoxText: {
    color: 'white',
    fontSize: 14,
  },
  expandableButton: {
      alignSelf: 'flex-start',
      marginTop: 5,
  },
  expandableButtonText: {
      color: '#ADD8E6', // Light Blue
      fontSize: 12,
  },
};

const styles = mergeStyles(LocalStyles);