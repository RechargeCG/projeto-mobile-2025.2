import { Text, View, ImageBackground, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect, useContext } from 'react';
import { mergeStyles } from '../components/GlobalStyles';
import { AppContext } from '../components/ContextoLogin';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/background.png');

export default function PrincipalScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = mergeStyles({});
  const { ip } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState({ destaques: [], recentes: [], populares: [] });

  useEffect(() => {
    fetchDados();
  }, []);

  const fetchDados = async () => {
    try {
      const response = await fetch(`http://${ip}/SPLQ_Server/backend/listar_principal.php`);
      const json = await response.json();
      if (json.sucesso) {
        setDados(json);
      }
    } catch (error) {
      console.error("Erro ao carregar principal:", error);
    } finally {
      setLoading(false);
    }
  };

  // Componente para as listas horizontais
  const HorizontalList = ({ data }) => (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.idQua.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={{ marginRight: 15 }} 
          onPress={() => navigation.navigate('Quadrinho', { idQua: item.idQua })}
        >
          <Image 
            source={{ uri: item.fonte_capa }} // Supondo que a URL esteja no banco
            style={{ width: 120, height: 180, borderRadius: 8 }} 
          />
          <Text style={{ color: 'white', width: 120, textAlign: 'center', marginTop: 5 }}>{item.nome}</Text>
        </TouchableOpacity>
      )}
    />
  );

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#000'}}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      
      <View style={styles.header}>
        <View style={{ margin: '2%', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={require('../assets/avatar.png')} style={{ width: 35, height: 35, borderRadius: 17 }} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.screentitle}>Destaques</Text>
        {/* Aqui você pode usar seu CarouselComponent passando dados.destaques */}
        <HorizontalList data={dados.destaques} />

        <View style={{ marginVertical: 20 }}>
          <Text style={styles.covertitle}>Mais Recentes</Text>
          <HorizontalList data={dados.recentes} />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={styles.covertitle}>Populares</Text>
          <HorizontalList data={dados.populares} />
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}