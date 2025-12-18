import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { mergeStyles } from '../components/GlobalStyles';
import { AppContext } from '../components/ContextoLogin';

const image = require('../assets/background.png');
const avatar = require('../assets/avatar.png');

export default function FavoritosScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { idUsu, ip } = useContext(AppContext);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = mergeStyles({});

  useEffect(() => {
    fetchFavoritos();
  }, []);

  const fetchFavoritos = async () => {
    try {
      const formData = new FormData();
      formData.append('idUsu', idUsu);

      const response = await fetch(`http://${ip}/SPLQ_Server/backend/favoritos.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.sucesso) {
        setFavoritos(data.favoritos);
      }
    } catch (e) {
      console.error("Erro ao buscar favoritos:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />
      
      {/* Header Integrado */}
      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      <View style={styles.header}>
        <View style={{ margin: '2%', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={avatar} style={{ width: 30, height: 30, borderRadius: 15 }} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.screentitle, { marginVertical: 20 }]}>
            Favoritos
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#FFF" />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                paddingBottom: 20
              }}
            >
              {favoritos.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: '31.33%',
                    margin: '1%',
                    borderRadius: 10,
                    overflow: 'hidden',
                    height: 160
                  }}
                  onPress={() => navigation.navigate('Quadrinho', { idQua: item.idQua })}
                >
                  <Image
                    source={{ uri: item.fonte_capa }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}