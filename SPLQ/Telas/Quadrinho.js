import {
    StyleSheet, Text, TextInput, View, ImageBackground, ScrollView,
    Image, Dimensions, TouchableOpacity, ActivityIndicator
  } from 'react-native';
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import Icon from 'react-native-vector-icons/Ionicons';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import { useState, useEffect } from 'react';
  import { mergeStyles } from '../components/GlobalStyles';
  
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
  
    // const { idQua } = route.params; // recebido da navegação
  
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

        const response = await fetch('http://192.168.2.102/SPLQ_Server/backend/quadrinho.php', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error);
        }
        setQuadrinho(data.quadrinho);
        setCapitulos(data.capitulos || []);
        setTags([data.tags] || []);
        setPublicador(data.publicador || '');
      } catch (err) {
        setError(err.message);
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
      alert(error);
      return (
        <View style={styles.wrapper}>
          <Text style={{ color: 'white', textAlign: 'center' }}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.wrapper}>
        <ImageBackground source={image} style={styles.background} />
        <View style={{ paddingTop: useSafeAreaInsets().top, backgroundColor: '#ffffffaa' }} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
  
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginHorizontal: '5%', marginBottom: insets.bottom }}
        >
          <Text style={styles.screentitle}>{quadrinho.titulo}</Text>
  
          <ProportionalImageItem uri={quadrinho.fonte_capa} />
  
          <Text style={styles.sectiontitle}>Sinopse</Text>
          <TextInput
            style={[styles.inputField, { height: 200 }]}
            multiline
            editable={false}
            value={quadrinho.descricao}
          />
  
          <Text style={styles.sectiontitle}>Editora</Text>
          <TextInput
            style={styles.inputField}
            editable={false}
            value={quadrinho.editora}
          />
  
          <Text style={styles.sectiontitle}>Publicador(a)</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('Perfil', { nome: publicador })}
          >
            <Text style={styles.buttonText}>{publicador}</Text>
          </TouchableOpacity>
  
          <Text style={styles.sectiontitle}>Gêneros</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {tags.map((tag, index) => (
              <TouchableOpacity key={index} style={[styles.buttonContainer, { margin: 4 }]}>
                <Text style={[styles.buttonText, { fontSize: 12 }]}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
  
          <Text style={styles.sectiontitle}>Capítulos</Text>
          {capitulos.map((idCap, numCap, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.buttonContainer, { marginBottom: 8 }]}
              onPress={() => navigation.navigate('Capitulo', { idCap, numCap })}
            >
              <Text style={styles.buttonText}>Capítulo {numCap}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
  
  const LocalStyles = {
    header: {
      margin: '2%',
    },
  };
  
  const styles = mergeStyles(LocalStyles);
  