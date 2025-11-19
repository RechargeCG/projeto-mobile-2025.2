import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { mergeStyles } from '../components/GlobalStyles';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

const image = require('../assets/background.png');

export default function PerfilEdicaoScreen({  }) {
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

      <View style={styles.body}>
        <View style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>          
          <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.screentitle}>Editar Perfil</Text>

              <TouchableOpacity style={{...styles.buttonContainer, marginVertical: 20}}>
                <Text style={styles.buttonText}>Escolher imagem de perfil</Text>
              </TouchableOpacity>

              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={[styles.sectiontitle, {marginTop: 0}]}>Preview</Text>
                <Image source={require('../assets/avatar.png')} style={{ width: 200, height: 200, resizeMode: 'cover' }}/>
              </View>

              <TextInput 
                style={[styles.inputField, {marginTop: 20}]}                
                placeholder='Nome do usuário'
                placeholderTextColor={'white'}
              ></TextInput>

              <TextInput 
                style={[styles.inputField, {marginTop: 10}]}                
                placeholder='Descrição do usuário'
                placeholderTextColor={'white'}
              ></TextInput>

              <TouchableOpacity style={{...styles.buttonContainer, marginTop: 20}} onPress={() => navigation.navigate("Perfil")}>
                <Text style={styles.buttonText}>Salvar Alterações</Text>
              </TouchableOpacity>

          </ScrollView>
        </View>
      </View>

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