import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { mergeStyles } from '../components/GlobalStyles';

const image = require('../assets/background.png');

export default function GenericoScreen({ navigation }) {
  const [date, setDate] = useState('');

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
          <KeyboardAwareScrollView>
            <ScrollView>
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
                <Text style={styles.labelText}>Data de nascimento</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder='DD/MM/AAAA'
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={date}
                  onChangeText={setDate}
                />
              </View>

              
              <Text style={styles.screentitle}>Título da página</Text>
              <Text style={styles.screentitle}>Título da página</Text>
              <Text style={styles.screentitle}>Título da página</Text>
              <Text style={styles.screentitle}>Título da página</Text>
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = mergeStyles({})
