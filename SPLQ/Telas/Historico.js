import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { mergeStyles } from '../components/GlobalStyles';
import { AppContext } from '../components/ContextoLogin';

const image = require('../assets/background.png');
const avatar = require('../assets/avatar.png');

export default function HistoricoScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { idUsu, ip } = useContext(AppContext);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = mergeStyles({});

  useEffect(() => {
    fetchHistorico();
  }, []);

  const fetchHistorico = async () => {
    try {
      const formData = new FormData();
      formData.append('idUsu', idUsu);

      const response = await fetch(`http://${ip}/SPLQ_Server/backend/historico.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.sucesso) {
        setHistorico(data.historico);
      }
    } catch (e) {
      console.error("Erro ao buscar histórico:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />

      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      <View style={styles.header}>
        <View style={{ margin: '2%', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={avatar} style={{ width: 30, height: 30, borderRadius: 15 }} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.screentitle, { marginTop: 15, marginBottom: 20 }]}>
              Histórico
            </Text>

            {loading ? (
              <ActivityIndicator size="large" color="#FFF" />
            ) : (
              <View style={{ paddingBottom: 20 }}>
                {historico.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.historyCard}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Capitulo', { idCap: item.idCap, idQua: item.idQua })}
                  >
                    <Image 
                      source={{ uri: item.fonte_capa }} 
                      style={styles.historyImage} 
                      resizeMode="cover" 
                    />

                    <View style={styles.historyInfoContainer}>
                      <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>Quadrinho:</Text>
                        <Text style={styles.infoValue} numberOfLines={1}>{item.titulo}</Text>
                      </View>

                      <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>Capítulo:</Text>
                        <Text style={styles.infoValue}># {item.numCap}</Text>
                      </View>

                      <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>Data:</Text>
                        <Text style={styles.infoValue}>{item.data}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}