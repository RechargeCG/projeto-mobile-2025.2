import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { mergeStyles } from '../components/GlobalStyles';
import CarouselComponent from '../components/CarouselComponent';

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
  { id: 10, primary: true, source: JujutsuKaisenCover, title: "Jujutsu Kaisen 3" }, // Marcado como primário para testar item único na última linha
];

const NUM_COLUMNS = 3;

const Item = ({image}) => (
  <View style={styles.item}>
    <Image source={image} style={styles.cover} />
    <Text style={styles.covertitle}>Título da capa</Text>
  </View>
);

const DestaqueList = () => (
  <CarouselComponent data={covers}/>
)

const HorizontalList = ({ navigation }) => (
  <ScrollView 
    style={styles.listContainerHorizontal}
    horizontal={true} 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.listContentHorizontal}
  >
    {covers.map((item, index) => (
      // Envolvendo a Imagem em TouchableOpacity
      <TouchableOpacity
        key={item.id}
        // onnPress intencionalmente vazio, pois 'não é para mexer com variável'
        onPress={() => navigation.navigate('Quadrinho')}
      >
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
  </ScrollView>
);

// CORRIGIDO: Substituímos FlatList por View para evitar conflitos de rolagem
const GridList = () => {
  return (
    <View 
      style={[
        styles.listContainerGrid,
        { 
          // CRUCIAL: Flexbox para permitir o quebramento de linha (grid)
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start', // Garante que itens incompletos não expandam
        }
      ]}
    >
      {covers.map((item) => (
        // Envolvendo a Imagem em TouchableOpacity
        <TouchableOpacity
          key={item.id}
          // onnPress intencionalmente vazio, pois 'não é para mexer com variável'
          style={styles.gridItemWrapper} // Usa o wrapper com largura percentual (31.33%)
        >
          <Image
            source={item.source}
            style={styles.listGridImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function PrincipalScreen({ navigation }) {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');

  const styles = mergeStyles({});

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
          <ScrollView>
            <Text style={styles.screentitle}>Título da página</Text>
            <View style={styles.coverBox}>
              <DestaqueList></DestaqueList>
            </View>
            
            <View style={{ height: 30 }} />
            <Text style={styles.covertitle}>Capas Roláveis (Horizontal)</Text>
            <HorizontalList navigation={navigation} />

            <Text style={styles.covertitle}>Capas Roláveis (Horizontal)</Text>
            <HorizontalList navigation={navigation} />

            <Text style={styles.covertitle}>Capas Roláveis (Horizontal)</Text>
            <HorizontalList navigation={navigation} />

            <View style={{ height: 30 }} />

        
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = mergeStyles({})