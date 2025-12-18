import {
    StyleSheet, Text, TextInput, View, ImageBackground, ScrollView,
    Image, Dimensions, TouchableOpacity, ActivityIndicator, Alert // Importei Alert
  } from 'react-native';
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import Icon from 'react-native-vector-icons/Ionicons';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import { useState, useEffect } from 'react';
  import { GlobalStyles, mergeStyles } from '../components/GlobalStyles';
  
  const image = require('../assets/background.png');
  const { width: screenWidth } = Dimensions.get('window');
  const imageContainerWidth = screenWidth;
  
  const ProportionalImageItem = ({ uri }) => {
    const [aspectRatio, setAspectRatio] = useState(1);
  
    useEffect(() => {
      if (!uri) return;
      Image.getSize(uri, (w, h) => setAspectRatio(w / h));
    }, [uri]);
  
    if (!uri) return null;
  
    return (
      <View style={{ width: imageContainerWidth }}>
        <Image
          source={{ uri }}
          style={{
            width: '80%',
            alignSelf: 'center',
            aspectRatio,
            resizeMode: 'contain',
            backgroundColor: 'black'
          }}
        />
      </View>
    );
  };
  
  export default function QuadrinhoScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const insets = useSafeAreaInsets();
  
    // Simulação: idUsu viria de um contexto global ou dos params.
    // Vamos usar '1' como ID do usuário logado para testes.
    // Em um app real, você buscaria isso de um estado global (Redux, Context) ou AsyncStorage.
    // const { idUsu } = route.params; 
    const idUsu = 1; // ID fixo para demonstração (assumindo que o publicador é 1)
    const IP = "http://192.168.1.7";
  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const [quadrinho, setQuadrinho] = useState(null);
    const [capitulos, setCapitulos] = useState([]);
    const [tags, setTags] = useState([]);
    const [publicador, setPublicador] = useState('');
  
    useEffect(() => {
      fetchQuadrinho();
    }, []);
  
    const fetchQuadrinho = async () => {
      try {
        const formData = new FormData();
        formData.append('idQua', 1);
        const response = await fetch(IP+'/SPLQ_Server/backend/quadrinho.php', {
          method: 'POST',
          body: formData
        });
        
        // Se o erro Unexpected token '<' persistir, tente:
        // const textData = await response.text();
        // console.log("Resposta bruta:", textData);
        // const data = JSON.parse(textData); 
        
        // Se a correção de URL foi suficiente:
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error);
        }
        setQuadrinho(data.quadrinho);
        setCapitulos(data.capitulos || []);
        // Assumindo que tags é um array, mesmo que o backend o retorne como []
        setTags([data.tags] || []); 
        setPublicador(data.publicador || '');
      } catch (err) {
        setError(err.message);
        Alert.alert("Erro de Carregamento", "Não foi possível carregar os dados do quadrinho: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (loading) {
      return (
        <View style={[styles.wrapper, { justifyContent: 'center' }]}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }
    
    if (error) {
      return (
        <View style={styles.wrapper}>
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>
            {`Ocorreu um erro: ${error}. Por favor, tente novamente.`}
          </Text>
          <TouchableOpacity 
            style={[styles.buttonContainer, {marginTop: 20}]} 
            onPress={fetchQuadrinho}
          >
            <Text style={styles.buttonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Lógica para determinar se o usuário logado é o publicador da obra
    // Converte o fk_Usuario_idUsu para número para garantir a comparação
    const idPublicadorObra = parseInt(quadrinho.fk_Usuario_idUsu);
    const podeEditar = idUsu === idPublicadorObra;

    return (
      <View style={styles.wrapper}>
        <ImageBackground source={image} style={styles.background} />
        <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          {/* Botão de navegação para o perfil do publicador no canto superior direito (OPCIONAL) */}
          <TouchableOpacity 
              onPress={() => navigation.navigate('Perfil', { nome: publicador })}
              style={{ padding: 5 }}
          >
              <Icon name="person-circle-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
  
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginHorizontal: '5%', marginBottom: insets.bottom }}
        >
          <Text style={styles.screentitle}>{quadrinho.nome}</Text>
  
          <ProportionalImageItem uri={IP+"/SPLQ_Server/"+quadrinho.fonte_capa} />

          {/* Botões de Edição Condicionais */}
          {podeEditar && (
            <View style={styles.editButtonsContainer}>
              <TouchableOpacity style={styles.cadastrarCapituloButton} onPress={() => navigation.navigate('CadastrarCapitulo', { idQua: quadrinho.idQua })}>
                <Text style={styles.buttonText}>Cadastrar Capítulo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editarObraButton} onPress={() => navigation.navigate('EditarObra', { quadrinho: quadrinho })}>
                <Icon name={'pencil'} size={30} color={'white'}/>
              </TouchableOpacity>
            </View>
          )}

          {/* ... Restante das Seções ... */}

          <Text style={styles.sectiontitle}>Sinopse</Text>
          <TextInput
            style={[styles.inputField, { height: 200, paddingTop: 10, textAlign: 'justify' }]}
            multiline
            editable={false}
            value={quadrinho.descricao}
          />
          
          <Text style={styles.sectiontitle}>Autor(es)</Text>
          <TextInput
            style={styles.inputField}
            editable={false}
            value={quadrinho.autor}
          />

          <Text style={styles.sectiontitle}>Editora</Text>
          <TextInput
            style={styles.inputField}
            editable={false}
            value={quadrinho.editora}
          />
  
          <Text style={styles.sectiontitle}>Publicador(a)</Text>
          <TouchableOpacity
            style={[styles.buttonContainer, {width: '100%'}]}
            onPress={() => navigation.navigate('Perfil', { idUsu: idPublicadorObra, nome: publicador })}
          >
            <Text style={styles.buttonText}>{publicador}</Text>
          </TouchableOpacity>
  
          <Text style={styles.sectiontitle}>Gêneros</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
            {/* O backend retorna 'tags' como [], mas se houver tags de verdade, elas seriam mapeadas aqui. */}
            {tags.map((tag, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.buttonContainer, { margin: 4, paddingHorizontal: 12, paddingVertical: 6 }]}
                onPress={() => navigation.navigate('MainTabs', { screen: 'Pesquisa', params: { screen: 'SearchResults', params: { tag: tag } } })}
              >
                <Text style={[styles.buttonText, { fontSize: 12 }]}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
  
          <Text style={styles.sectiontitle}>Capítulos</Text>
          {capitulos.map((idCap, numCap, index) => (
            <View key={index} style={styles.capituloRow}>
                <TouchableOpacity
                    style={styles.capituloButton}
                    onPress={() => navigation.navigate('Capitulo', { idCap: idCap, numCap: numCap })}
                >
                    <Text style={styles.buttonText}>Capítulo {numCap}</Text>
                </TouchableOpacity>
                
                {/* Botão de Edição de Capítulo Condicional */}
                {podeEditar && (
                    <TouchableOpacity 
                        style={styles.editarCapituloButton} 
                        onPress={() => navigation.navigate('EditarCapitulo', { idQua: quadrinho.idQua, numCap: numCap })}
                    >
                        <Icon name={'pencil'} size={30} color={'white'}/>
                    </TouchableOpacity>
                )}
            </View>
          ))}
          {/* Espaçamento extra no final para scroll */}
          <View style={{ height: 40 }} /> 

        </ScrollView>
      </View>
    );
  }
  
  const LocalStyles = {
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        paddingTop: 10,
    },
    editButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    cadastrarCapituloButton: {
        ...GlobalStyles.buttonContainer, // Estilos globais para botões
        width: '80%',
        marginRight: 20,
    },
    editarObraButton: {
        // Estilo para o ícone de lápis
    },
    capituloRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 8,
    },
    capituloButton: {
        ...GlobalStyles.buttonContainer,
        width: '80%',
        alignSelf: 'flex-start',
    },
    editarCapituloButton: {
        // Estilo para o ícone de lápis
        marginLeft: 20,
        padding: 5,
    }
  };
  
  // Note: 'styles' aqui precisa ser o objeto retornado por mergeStyles
  const styles = mergeStyles(LocalStyles);