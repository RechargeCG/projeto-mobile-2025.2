import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { mergeStyles } from '../components/GlobalStyles'; // Garanta que este import exista e funcione!

const image = require('../assets/background.png');
const OnePieceCover = require('../assets/one-piece.png');
const DemonSlayerCover = require('../assets/kimetsu.png');
const JujutsuKaisenCover = require('../assets/jujutsu.png');
const DragonBallCover = require('../assets/dragon-ball.png');

const covers = [
  { id: 1, source: OnePieceCover, title: "One Piece" },
  { id: 2, source: DemonSlayerCover, title: "Demon Slayer" },
  { id: 3, source: JujutsuKaisenCover, title: "Jujutsu Kaisen" },
  { id: 4, source: DragonBallCover, title: "DB Super" },
  { id: 5, source: DemonSlayerCover, title: "Demon Slayer 2" },
  { id: 6, source: JujutsuKaisenCover, title: "Jujutsu Kaisen 2" },
  { id: 7, source: OnePieceCover, title: "One Piece 2" },
  { id: 8, source: DragonBallCover, title: "DB Super 2" },
  { id: 9, source: DemonSlayerCover, title: "Demon Slayer 3" },
  { id: 10, primary: true, source: JujutsuKaisenCover, title: "Jujutsu Kaisen 3" },
];

const NUM_COLUMNS = 3;

// Função auxiliar para agrupar o array em linhas de N elementos
const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

const chunkedCovers = chunkArray(covers, NUM_COLUMNS);

export default function GenericoScreen({ navigation }) {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: useSafeAreaInsets().top, backgroundColor: '#ffffffaa' }} />
      <View style={styles.header}>
        <View style={{margin: '2%', alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={require('../assets/avatar.png')} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.container}>
          <KeyboardAwareScrollView style={{flex: 1}}>
            <ScrollView >
              <Text style={styles.screentitle}>Título da página</Text>
              <View style={styles.coverBox}>
                <Image source={require('../assets/capa.png')} style={styles.cover} />
                <Text style={styles.covertitle}>Título da capa</Text>
              </View>
              <View style={styles.boxContainer}> 
                <Text style={styles.labelText}>Data de nascimento</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder='DD/MM/AAAA'
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={date}
                  onChangeText={setDate}
                />
              </View>
              <View style={styles.boxContainer}>
                <Text style={styles.labelText}>Nome</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder='Nome'
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <TouchableOpacity 
                style={styles.buttonContainer} 
                
              >
                <Text style={styles.buttonText}>Editar Perfil</Text>
              </TouchableOpacity>

              {/* --- LISTA ROLÁVEL (HORIZONTAL) --- */}
              <Text style={styles.sectiontitle}>Capas Roláveis (Horizontal)</Text>
              <ScrollView 
                style={styles.listContainerHorizontal}
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContentHorizontal}
              >
                {covers.map((item, index) => (
                  <TouchableOpacity key={item.id}>
                    <Image
                      source={item.source}
                      style={[
                        styles.listImageItem, 
                        index !== 0 && { marginLeft: 6 }
                      ]}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
                {/* Aqui você replicaria a estrutura se quisesse adicionar mais capas na lista rolável */}
              </ScrollView>

              <View style={{ height: 30 }} />

              {/* --- LISTA EMPILHADA (GRID 3X) --- */}
              <Text style={styles.sectiontitle}>Capas Empilhadas (Grid 3x)</Text>
              <View style={styles.listContainerGrid}>
                {chunkedCovers.map((row, rowIndex) => (
                  // <linha>
                  <View 
                    key={rowIndex}
                    style={{ 
                      flexDirection: 'row', 
                      justifyContent: 'flex-start', // Garante que não haja expansão
                    }}
                  >
                    {row.map((item, colIndex) => (
                      // <capa>
                      <TouchableOpacity
                        key={item.id}
                        style={styles.gridItemWrapper} // 31.33% de largura e margem
                      >
                        <Image
                          source={item.source}
                          style={[styles.listGridImage,{maxHeight: '100%'}]} // width: 100% e aspectRatio
                          resizeMode="cover" // Garante que a imagem preencha e seja cortada se necessário
                        />
                      </TouchableOpacity>
                    ))}
                    
                    {/* Preenchimento dos espaços vazios se a linha não estiver completa (apenas na última linha) */}
                    {rowIndex === chunkedCovers.length - 1 && row.length < NUM_COLUMNS && 
                      [...Array(NUM_COLUMNS - row.length)].map((_, emptyIndex) => (
                        // Aqui inserimos Views invisíveis para ocupar o espaço.
                        <View key={`empty-${emptyIndex}`} style={styles.gridItemWrapper} />
                      ))
                    }
                  </View>
                  // </linha>
                ))}
              </View>
              
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = mergeStyles({});