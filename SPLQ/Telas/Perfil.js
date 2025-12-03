import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { mergeStyles } from '../components/GlobalStyles';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

const image = require('../assets/background.png');

const OnePieceCover = require("../assets/one-piece.png");
const DemonSlayerCover = require("../assets/kimetsu.png");
const JujutsuKaisenCover = require("../assets/jujutsu.png");
const DragonBallCover = require("../assets/dragon-ball.png");

const obras = [
  // Favoritos / Resultados 1-4
  { id: 1, title: "Mangá 1", cover: OnePieceCover },
  { id: 2, title: "Mangá 2", cover: DemonSlayerCover },
  { id: 3, title: "Mangá 3", cover: JujutsuKaisenCover },
  { id: 4, title: "Mangá 4", cover: DragonBallCover },

  // Favoritos / Resultados 5-8
  { id: 5, title: "Mangá 5", cover: OnePieceCover },
  { id: 6, title: "Mangá 6", cover: DemonSlayerCover },
  { id: 7, title: "Mangá 7", cover: JujutsuKaisenCover },
  { id: 8, title: "Mangá 8", cover: DragonBallCover },

  // Favoritos / Resultados 9-12
  { id: 9, title: "Mangá 9", cover: OnePieceCover },
  { id: 10, title: "Mangá 10", cover: DemonSlayerCover },
  { id: 11, title: "Mangá 11", cover: JujutsuKaisenCover },
  { id: 12, title: "Mangá 12", cover: DragonBallCover },

  // Favoritos / Resultados 13-16
  { id: 13, title: "Mangá 13", cover: OnePieceCover },
  { id: 14, title: "Mangá 14", cover: DemonSlayerCover },
  { id: 15, title: "Mangá 15", cover: JujutsuKaisenCover },
  { id: 16, title: "Mangá 16", cover: DragonBallCover },
  
  // Favoritos / Resultados 17-20
  { id: 17, title: "Mangá 17", cover: OnePieceCover },
  { id: 18, title: "Mangá 18", cover: DemonSlayerCover },
  { id: 19, title: "Mangá 19", cover: JujutsuKaisenCover },
  { id: 20, title: "Mangá 20", cover: DragonBallCover },
];

export default function PerfilScreen({  }) {
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
              <Text style={styles.screentitle}>Perfil</Text>

              <View style={{flex: 1, alignItems: 'center'}}>
                <Image source={require('../assets/avatar.png')} style={{ width: 200, height: 200, resizeMode: 'cover' }}/>
                <Text style={styles.sectiontitle}>Nome do usuário</Text>
              </View>

              <TextInput 
                style={[styles.inputField, {width: '100%', height: 200}]}                
                multiline={true}                        
                inputMode={'none'}
                value={"Caixa de texto rolável com descrição que o usuário desejar exibir. Lorem ipsum dolor sit amet. Ex iure modi est maiores doloribus ex natus labore et magni neque. Est sequi voluptas et dolores incidunt et aperiam tenetur sed aspernatur perspiciatis ut dolore perspiciatis et error illum. Et quod nobis rem mollitia voluptatibus vel culpa quibusdam ad eaque enim ea quod porro et explicabo odit eos laudantium debitis. Aut quidem dolor qui accusamus exercitationem vel accusantium voluptas qui unde ipsa qui blanditiis quis 33 ducimus voluptatem."}
              ></TextInput>

              <TouchableOpacity style={{...styles.buttonContainer, marginTop: 20}} onPress={() => navigation.navigate("PerfilEdicao")}>
                <Text style={styles.buttonText}>Editar Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{...styles.buttonContainer, marginVertical: 5}} onPress={() => navigation.navigate('CadastrarObra')}>
                <Text style={styles.buttonText}>Cadastrar obra</Text> 
              </TouchableOpacity>

              <Text style={styles.sectiontitle}>Minhas obras</Text>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  paddingBottom: 20
                }}
              >
                {obras.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      width: '31.33%', // Grid de 3 colunas simples
                      margin: '1%',
                      borderRadius: 10,
                      overflow: 'hidden',
                      height: 160 // Altura fixa para consistência
                    }}
                    onPress={() => navigation.navigate('Quadrinho')}
                  >
                    <Image
                      source={item.cover}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </View>
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