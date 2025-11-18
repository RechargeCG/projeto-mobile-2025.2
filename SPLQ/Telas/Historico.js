import React from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mergeStyles } from '../components/GlobalStyles';

// --- IMAGENS E MOCKS ---
const image = require('../assets/background.png');
const avatar = require('../assets/avatar.png');

// Imagens de exemplo (mesmas usadas nas outras telas)
const OnePieceCover = require('../assets/one-piece.png');
const DemonSlayerCover = require('../assets/kimetsu.png');
const JujutsuKaisenCover = require('../assets/jujutsu.png');
const DragonBallCover = require('../assets/dragon-ball.png');

// Caso não tenha as imagens específicas, use as genéricas que já temos:
const FallbackCover = require('../assets/kimetsu.png');

const historyMock = [
    // Grupo 1
    { id: 1, title: "One Piece", chapter: "# 1090", date: "12/11/23 - 14:30", cover: OnePieceCover },
    { id: 2, title: "Buxa Slayer", chapter: "# 54", date: "12/11/23 - 10:15", cover: DemonSlayerCover },
    { id: 3, title: "Feiticeiros Buxosos", chapter: "# 236", date: "11/11/23 - 22:00", cover: JujutsuKaisenCover },
    { id: 4, title: "Buxas hiperbólicos", chapter: "# 89", date: "11/11/23 - 18:45", cover: DragonBallCover },
    
    // Grupo 2
    { id: 5, title: "One Piece", chapter: "# 1089", date: "10/11/23 - 09:30", cover: OnePieceCover },
    { id: 6, title: "Buxa Slayer", chapter: "# 53", date: "09/11/23 - 14:20", cover: DemonSlayerCover },
    { id: 7, title: "Feiticeiros Buxosos", chapter: "# 235", date: "08/11/23 - 16:40", cover: JujutsuKaisenCover },
    { id: 8, title: "Buxas hiperbólicos", chapter: "# 88", date: "08/11/23 - 11:10", cover: DragonBallCover },
  
    // Grupo 3
    { id: 9, title: "One Piece", chapter: "# 1088", date: "07/11/23 - 20:15", cover: OnePieceCover },
    { id: 10, title: "Buxa Slayer", chapter: "# 52", date: "06/11/23 - 13:00", cover: DemonSlayerCover },
    { id: 11, title: "Feiticeiros Buxosos", chapter: "# 234", date: "05/11/23 - 19:30", cover: JujutsuKaisenCover },
    { id: 12, title: "Buxas hiperbólicos", chapter: "# 87", date: "04/11/23 - 10:45", cover: DragonBallCover },
  
    // Grupo 4
    { id: 13, title: "One Piece", chapter: "# 1087", date: "03/11/23 - 08:20", cover: OnePieceCover },
    { id: 14, title: "Buxa Slayer", chapter: "# 51", date: "02/11/23 - 15:55", cover: DemonSlayerCover },
    { id: 15, title: "Feiticeiros Buxosos", chapter: "# 233", date: "01/11/23 - 21:10", cover: JujutsuKaisenCover },
    { id: 16, title: "Buxas hiperbólicos", chapter: "# 86", date: "31/10/23 - 17:05", cover: DragonBallCover },
  
    // Grupo 5
    { id: 17, title: "One Piece", chapter: "# 1086", date: "30/10/23 - 12:40", cover: OnePieceCover },
    { id: 18, title: "Buxa Slayer", chapter: "# 50", date: "29/10/23 - 09:50", cover: DemonSlayerCover },
    { id: 19, title: "Feiticeiros Buxosos", chapter: "# 232", date: "28/10/23 - 14:15", cover: JujutsuKaisenCover },
    { id: 20, title: "Buxas hiperbólicos", chapter: "# 85", date: "27/10/23 - 11:30", cover: DragonBallCover },
  ];

export default function HistoricoScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  
  // Combina estilos globais com estilos locais específicos desta tela
  const styles = mergeStyles(localStyles);

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />

      {/* --- HEADER (Padronizado) --- */}
      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      <View style={styles.header}>
        <View style={{ margin: '2%', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={avatar} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- CORPO --- */}
      <View style={styles.body}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            
            <Text style={[styles.screentitle, { marginTop: 15, marginBottom: 20 }]}>
              Histórico
            </Text>

            {/* Lista de Itens de Histórico */}
            <View style={{ paddingBottom: 20 }}>
              {historyMock.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.historyCard}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Quadrinho')} // Ação ao clicar
                >
                  {/* Capa (Esquerda) */}
                  <Image 
                    source={item.cover} 
                    style={styles.historyImage} 
                    resizeMode="cover" 
                  />

                  {/* Informações (Direita) */}
                  <View style={styles.historyInfoContainer}>
                    
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Quadrinho:</Text>
                      <Text style={styles.infoValue} numberOfLines={1}>{item.title}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Capítulo:</Text>
                      <Text style={styles.infoValue}>{item.chapter}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Data da visualização:</Text>
                      <Text style={styles.infoValue}>{item.date}</Text>
                    </View>

                  </View>
                </TouchableOpacity>
              ))}
            </View>

          </ScrollView>
        </View>
      </View>
    </View>
  );
}

// --- ESTILOS LOCAIS ---
const localStyles = {
  historyCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 16, 16, 0.6)', // Fundo escuro translúcido igual ao print
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Borda fina e sutil
    marginBottom: 12, // Espaçamento entre os cards
    overflow: 'hidden',
    height: 140, // Altura fixa aproximada para alinhar imagem e texto
  },
  historyImage: {
    width: 100, // Largura da capa no card horizontal
    height: '100%',
  },
  historyInfoContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-around', // Distribui os textos verticalmente
  },
  infoBlock: {
    marginBottom: 2,
  },
  infoLabel: {
    color: 'rgba(255, 255, 255, 0.8)', // Texto do label um pouco mais claro/fino
    fontSize: 12,
    fontFamily: 'Montserrat', // Supondo uso da fonte global
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  }
};