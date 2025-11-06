import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/background.png');

export default function PerfilScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: useSafeAreaInsets().top, backgroundColor: '#ffffffaa' }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Image 
            source={require('../assets/avatar.png')} 
            style={{ width: 30, height: 30, resizeMode: 'cover' }} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
      
      </View>

      <View style={{paddingBottom: useSafeAreaInsets().bottom, backgroundColor: '#ffffffaa', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
