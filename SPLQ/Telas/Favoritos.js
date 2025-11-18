import React from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mergeStyles } from '../components/GlobalStyles';

// Imagens e Mocks
const image = require('../assets/background.png');
const avatar = require('../assets/avatar.png');

const OnePieceCover = require('../assets/one-piece.png');
const DemonSlayerCover = require('../assets/kimetsu.png');
const JujutsuKaisenCover = require('../assets/jujutsu.png');
const DragonBallCover = require('../assets/dragon-ball.png');

const mockFavorites = [
  // Favoritos / Resultados 1-4
  { id: 1, title: "Mangá 1", cover: OnePieceCover },
  { id: 2, title: "Mangá 2", cover: DemonSlayerCover },
  { id: 3, title: "Mangá 3", cover: JujutsuKaisenCover },
  { id: 4, title: "Mangá 4", cover: DragonBallCover },

  // Favoritos / Resultados 5-8
  { id: 5, title: "Mangá 5", cover: OnePieceCover },
  { id: 6, title: "Mangá 6", cover: DemonSlayerCover },
  { id: 7, title: "Mangá 7", cover: JujutsuKaisenCover },
  { id: 8, title: "Mangá 8", cover: DragonBallCover },

  // Favoritos / Resultados 9-12
  { id: 9, title: "Mangá 9", cover: OnePieceCover },
  { id: 10, title: "Mangá 10", cover: DemonSlayerCover },
  { id: 11, title: "Mangá 11", cover: JujutsuKaisenCover },
  { id: 12, title: "Mangá 12", cover: DragonBallCover },

  // Favoritos / Resultados 13-16
  { id: 13, title: "Mangá 13", cover: OnePieceCover },
  { id: 14, title: "Mangá 14", cover: DemonSlayerCover },
  { id: 15, title: "Mangá 15", cover: JujutsuKaisenCover },
  { id: 16, title: "Mangá 16", cover: DragonBallCover },
  
  // Favoritos / Resultados 17-20
  { id: 17, title: "Mangá 17", cover: OnePieceCover },
  { id: 18, title: "Mangá 18", cover: DemonSlayerCover },
  { id: 19, title: "Mangá 19", cover: JujutsuKaisenCover },
  { id: 20, title: "Mangá 20", cover: DragonBallCover },
];

// Configuração do Grid
const NUM_COLUMNS = 3;

// Função utilitária para quebrar o array em linhas (igual ao Generico.js)
const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

export default function FavoritosScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const styles = mergeStyles({}); // Carrega os estilos globais
  
  // Prepara os dados em linhas de 3 colunas
  const chunkedFavorites = chunkArray(mockFavorites, NUM_COLUMNS);

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />

      {/* --- HEADER PADRONIZADO --- */}
      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      <View style={styles.header}>
        <View style={{ margin: '2%', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={avatar} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- CORPO DA TELA --- */}
      <View style={styles.body}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            
            <Text style={[styles.screentitle, { marginTop: 15, marginBottom: 15 }]}>
              Favoritos
            </Text>

            {/* --- GRID SYSTEM (Baseado no Generico.js) --- */}
            <View style={styles.listContainerGrid}>
              {chunkedFavorites.map((row, rowIndex) => (
                <View 
                  key={rowIndex}
                  style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'flex-start',
                    // marginBottom não é necessário aqui se o gridItemWrapper já tiver margin
                  }}
                >
                  {row.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.gridItemWrapper} // Usa estilo global (33% width aprox)
                      onPress={() => navigation.navigate('Quadrinho')}
                    >
                      <Image
                        source={item.cover}
                        style={[styles.listGridImage, { maxHeight: '100%' }]}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                  
                  {/* Preenchimento de espaços vazios para manter alinhamento à esquerda */}
                  {rowIndex === chunkedFavorites.length - 1 && row.length < NUM_COLUMNS && 
                    [...Array(NUM_COLUMNS - row.length)].map((_, emptyIndex) => (
                      <View key={`empty-${emptyIndex}`} style={styles.gridItemWrapper} />
                    ))
                  }
                </View>
              ))}
            </View>

          </ScrollView>
        </View>
      </View>
    </View>
  );
}