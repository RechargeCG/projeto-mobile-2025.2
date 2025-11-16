import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mergeStyles } from '../components/GlobalStyles';

const image = require('../assets/background.png');

const OnePieceCover = require('../assets/one-piece.png');
const DemonSlayerCover = require('../assets/kimetsu.png');
const JujutsuKaisenCover = require('../assets/jujutsu.png');
const DragonBallCover = require('../assets/dragon-ball.png');

// Mock dos favoritos (pode futuramente vir do backend)
const mockFavorites = [
  { id: 1, title: "Mangá 1", cover: OnePieceCover },
  { id: 2, title: "Mangá 2", cover: DemonSlayerCover },
  { id: 3, title: "Mangá 3", cover: JujutsuKaisenCover },
  { id: 4, title: "Mangá 4", cover: DragonBallCover },
  { id: 5, title: "Mangá 5", cover: OnePieceCover },
];

export default function FavoritosScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const styles = mergeStyles({});

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />

      {/* Safe Area + Header */}
      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      <View style={styles.header}>
        <View style={{ margin: '2%', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={require('../assets/avatar.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        <View style={styles.container}>
          <ScrollView>

            {/* Título */}
            <Text style={[styles.screentitle, { marginTop: 15 }]}>Favoritos</Text>

            {/* Grid */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                marginTop: 10,
              }}
            >
              {mockFavorites.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    width: '31.33%',
                    margin: '1%',
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={item.cover}
                    style={{
                      width: '100%',
                      height: 150,
                      borderRadius: 10,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>

          </ScrollView>
        </View>
      </View>
    </View>
  );
}
