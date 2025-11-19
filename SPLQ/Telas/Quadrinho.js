import { StyleSheet, Text, TextInput, View, ImageBackground, ScrollView, Image, KeyboardAvoidingView, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { mergeStyles } from '../components/GlobalStyles';

const image = require('../assets/background.png');

const { width: screenWidth } = Dimensions.get('window');
const totalPaddingHorizontal = 0; 
const imageContainerWidth = screenWidth - totalPaddingHorizontal;
const localAsset = require('../assets/capa.png'); 
const capa = Image.resolveAssetSource(localAsset).uri;

const ProportionalImageItem = ({ uri }) => {
  // HOOKS NO NÍVEL SUPERIOR DO COMPONENTE ProportionalImageItem (CORRETO)
  const [aspectRatio, setAspectRatio] = useState(1); 
  const [height, setHeight] = useState(1); 

  useEffect(() => {
    Image.getSize(
      uri,
      (width, height) => {
        setHeight(height);
        setAspectRatio(width / height);
      },
      (error) => {
        console.warn('Erro ao obter o tamanho da imagem:', error);
      }
    );
  }, [uri]);

  return (
    <View 
      style={{
        width: imageContainerWidth,
        // width: '100%',
        height: height,
        marginBottom: '0',
        // aspectRatio: aspectRatio,
        // backgroundColor: 'red'
      }} 
    >
      <Image
        source={{ uri }}
        style={{
          width: '80%',
          alignSelf: 'center',
          aspectRatio: aspectRatio, 
          backgroundColor: 'black', 
          resizeMode: 'contain', 
        }}
      />
    </View>
  );
};

const todoscapitulos = [
  { id: '0', name: '0' },
  { id: '1', name: '0.1' },
  { id: '2', name: '1' },
  { id: '3', name: '2' },
  { id: '4', name: '3' },
  { id: '5', name: '3.1' },
  { id: '6', name: '4' },
  { id: '7', name: '5' },
  { id: '8', name: '6' },
  { id: '9', name: '6.1' },
  { id: '10', name: '6.2' },
  { id: '11', name: '7' },
  { id: '12', name: '8' },
  { id: '13', name: 'Final' },
];

const availableTags = [
  { id: '1', name: 'Ação' },
  { id: '2', name: 'Aventura' },
  { id: '3', name: 'Comédia' },
  { id: '4', name: 'Drama' },
  { id: '5', name: 'Fantasia' },
  // { id: '6', name: 'Ficção Científica' },
  // { id: '7', name: 'Romance' },
  // { id: '8', name: 'Suspense' },
  // { id: '9', name: 'Terror' },
  // { id: '10', name: 'Esportes' },
  // { id: '11', name: 'Musical' },
  // { id: '12', name: 'Histórico' },
  // { id: '13', name: 'Mecha' },
  // { id: '14', name: 'Slice of Life' },
];

export default function QuadrinhoScreen({  }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
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
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginHorizontal: '5%', marginBottom: insets.bottom }}>
        <Text style={styles.screentitle}>Witch Hat Atelier</Text>
        <View style={[styles.coverBox]}>
          <ProportionalImageItem uri={capa}/>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
          <TouchableOpacity style={[styles.buttonContainer,{width: '80%'}]} onPress={() => navigation.navigate('CadastrarCapitulo')}>
            <Text style={styles.buttonText}>Cadastrar capítulo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 20}} onPress={() => navigation.navigate('EditarObra')}>
              <Icon name={'pencil'} size={40} color={'white'}/>
            </TouchableOpacity>
        </View>
        <Text style={styles.sectiontitle}>Sinopse</Text>
        <TextInput 
          style={[styles.inputField, {width: '100%', height: 200, paddingTop: 10, textAlign: 'justify'}]}                
          multiline={true}                        
          inputMode={'none'}
          value={"Caixa de texto rolável com descrição que o usuário desejar exibir. Lorem ipsum dolor sit amet. Ex iure modi est maiores doloribus ex natus labore et magni neque. Est sequi voluptas et dolores incidunt et aperiam tenetur sed aspernatur perspiciatis ut dolore perspiciatis et error illum. Et quod nobis rem mollitia voluptatibus vel culpa quibusdam ad eaque enim ea quod porro et explicabo odit eos laudantium debitis. Aut quidem dolor qui accusamus exercitationem vel accusantium voluptas qui unde ipsa qui blanditiis quis 33 ducimus voluptatem."}
        ></TextInput>
        <Text style={styles.sectiontitle}>Gêneros (Tags)</Text>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'right', justifyContent: 'space-between', width: '100%'}}>
          {availableTags.map((item, key) => {
            return(
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '2%'}} key={key} >
                <TouchableOpacity style={[styles.buttonContainer,{ height: '80%', width: '90%'}]} onPress={() => navigation.navigate('Capitulo')}>
                  <Text numberOfLines={1} style={[styles.buttonText,{fontSize: 12, borderRadius: 500}]}>{item['name']}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <Text style={styles.sectiontitle}>Capitulos</Text>
        {todoscapitulos.map((item, key) => {
          return(
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}} key={key}>
              <TouchableOpacity style={[styles.buttonContainer,{ alignSelf: 'left',width: '80%'}]} onPress={() => navigation.navigate('Capitulo')}>
                <Text style={styles.buttonText}>Capítulo {item['name']}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 20}} onPress={() => navigation.navigate('EditarObra')}>
                <Icon name={'pencil'} size={40} color={'white'}/>
              </TouchableOpacity>
            </View>
          );
        })}

        
      </ScrollView>

      <View style={{ paddingBottom: insets.bottom, backgroundColor: '#ffffffaa', position: 'absolute', bottom: 0, left: 0, right: 0 }} />

    </View>
  );
}

const LocalStyles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '2%',
  },
};

const styles = mergeStyles(LocalStyles)