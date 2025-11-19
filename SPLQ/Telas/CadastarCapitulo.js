import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput,
  // Novos Imports
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mergeStyles } from '../components/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa o Icone


const image = require('../assets/background.png');
const avatar = require('../assets/avatar.png');

const OnePieceCover = require('../assets/one-piece.png');
const DemonSlayerCover = require('../assets/kimetsu.png');
const JujutsuKaisenCover = require('../assets/jujutsu.png');
const DragonBallCover = require('../assets/dragon-ball.png');


const mockPages = [
  { id: 1, source: OnePieceCover },
  { id: 2, source: DemonSlayerCover },
  { id: 3, source: JujutsuKaisenCover },
  { id: 4, source: DragonBallCover },
  { id: 5, source: OnePieceCover },
];

export default function CadastrarCapituloScreen({ navigation }) {
  const insets = useSafeAreaInsets();
 
  const styles = mergeStyles(LocalStyles); // Usando LocalStyles para o header

  const [capituloNum, setCapituloNum] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(0); 

 
  const handleNext = () => {
    setCurrentPageIndex((prevIndex) => 
      prevIndex === mockPages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentPageIndex((prevIndex) => 
      prevIndex === 0 ? mockPages.length - 1 : prevIndex - 1
    );
  };

  const currentImage = mockPages[currentPageIndex];

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />

      
      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      {/* HEADER CORRIGIDO com seta de voltar e espaçamento */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Image source={avatar} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
        </TouchableOpacity>
      </View>

      
      {/* BODY WRAPPED WITH KEYBOARDAVOIDINGVIEW */}
      <KeyboardAvoidingView 
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            
            <Text style={[styles.screentitle, { marginBottom: 20 }]}>Cadastrar Capítulo</Text>

            
            <TouchableOpacity 
              style={[styles.buttonContainer, { backgroundColor: '#222', marginBottom: 20 }]}
       
            >
              <Text style={styles.buttonText}>Escolher o arquivo</Text>
            </TouchableOpacity>

           
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Text style={[styles.covertitle, { marginBottom: 5 }]}>Preview</Text>
              
             
              <View style={styles.carouselContainer}>
                
               
                <TouchableOpacity style={styles.navArrowButton} onPress={handlePrev}>
                  <Text style={styles.navArrowText}>{'<'}</Text>
                </TouchableOpacity>

                
                <View style={styles.carouselImageWrapper}>
                  <Image 
                    source={currentImage.source} 
                    style={styles.coverMedium} 
                    resizeMode="cover"
                  />
                  <Text style={styles.helperText}>
                    Pag {currentPageIndex + 1}/{mockPages.length}
                  </Text>
                </View>

                {/* Seta Direita */}
                <TouchableOpacity style={styles.navArrowButton} onPress={handleNext}>
                  <Text style={styles.navArrowText}>{'>'}</Text>
                </TouchableOpacity>

              </View>
            </View>

            
            <View style={styles.boxContainer}> 
              <Text style={styles.labelText}>Número do capítulo</Text>
              <TextInput
                style={styles.inputField}
                placeholder='Ex: 105'
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={capituloNum}
                onChangeText={setCapituloNum}
                keyboardType='numeric'
              />
            </View>

            
            <TouchableOpacity 
              style={[styles.buttonContainer, { marginTop: 30, marginBottom: 50 }]}
              // AÇÃO DE NAVEGAÇÃO ADICIONADA
              onPress={() => navigation.navigate('Capitulo')}
            >
              <Text style={styles.buttonText}>Cadastrar Capitulo</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// Estilos Locais: Garante que o header use flexbox para espaçar os ícones
const LocalStyles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15, // Espaçamento nas laterais
    paddingVertical: 8, 
  },
};