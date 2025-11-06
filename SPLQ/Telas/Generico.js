import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const image = require('../assets/background.png');

export default function GenericoScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />

      <View style={styles.body}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Título</Text>
            <Image source={require('../assets/capa.png')} style={styles.capa} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    color: 'white',
  },
  header: {
    margin: '2%',
    alignItems: 'flex-end',
  },
  title: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 18,
    opacity: 1,
    textAlign: 'left',
  },
  body : {
    flex: 1,
    paddingHorizontal: '5%'
  },
  capa: {
    margin: '5%',
    alignSelf: 'center',
  }

});
