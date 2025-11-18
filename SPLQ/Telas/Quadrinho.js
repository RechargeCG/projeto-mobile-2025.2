import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { mergeStyles } from '../components/GlobalStyles';

const image = require('../assets/background.png');

export default function QuadrinhoScreen({  }) {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />
      <View style={{ paddingTop: useSafeAreaInsets().top, backgroundColor: '#ffffffaa' }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{margin: '2%'}}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={{margin: '2%'}}>
            <Image source={require('../assets/avatar.png')} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
          </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', margin: '5%'}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => navigation.navigate('Capitulo')}>
            <Text style={styles.labelText}> Ir para tela de capítulo </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={{paddingBottom: useSafeAreaInsets().bottom, backgroundColor: '#ffffffaa', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </View>
  );
}

const LocalStyles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
    // paddingVertical: 8,
    margin: '2%',
  },
};

const styles = mergeStyles(LocalStyles)