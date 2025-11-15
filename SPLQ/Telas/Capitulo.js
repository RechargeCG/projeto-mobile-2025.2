import { StyleSheet, Text, TextInput, View, ImageBackground, Modal, FlatList, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { mergeStyles } from '../components/GlobalStyles';

const image = require('../assets/background.png');

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

export default function PerfilScreen({  }) {
  const navigation = useNavigation();
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [capitulo, setCapitulo] = useState(0);
  const [allPages, setAllPages] = useState(false);
  const [page, setPage] = useState(0);
  let totalCapitulos=todoscapitulos.length;
  let totalPaginas=todoscapitulos.length;

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
          <View style={styles.changeChapter}>
            <View style={[styles.boxContainer,{marginRight: '15%'}]}>
              <TouchableOpacity style={styles.capituloButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.capituloText}>Capítulo {todoscapitulos[capitulo].name}</Text>

                <Image
                  source={require('../assets/arrow.png')} 
                  style={styles.capituloArrow}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.arrowButton,
                capitulo === 0 && styles.arrowDisabled
              ]}
              onPress={() => {
                if (capitulo > 0) setCapitulo(capitulo - 1);
              }}
              disabled={capitulo === 0}
            >
              <Image 
                source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '90deg' }] }]}  
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.arrowButton,
                capitulo === totalCapitulos - 1 && styles.arrowDisabled
              ]}
              onPress={() => {
                if (capitulo < totalCapitulos - 1) setCapitulo(capitulo + 1);
              }}
              disabled={capitulo === totalCapitulos - 1}
            >
              <Image 
                source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '270deg' }] }]}  
              />
            </TouchableOpacity>
          </View>


          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible} 
            onRequestClose={() => setModalVisible(false)} 
          >
            <View style={styles.modalCenteredView}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione um capítulo</Text>
                <FlatList
                  data={todoscapitulos}
                  keyExtractor={(item) => item.id}
                  style={styles.modalListContainer}
                  contentContainerStyle={styles.modalListContent}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalTagItem}
                      onPress={() => {
                        setCapitulo(item.id);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.modalTagText}>Capítulo {item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
                <View style={styles.modalButtonGroup}>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.modalCloseButton]} 
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalTextStyle}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View style={styles.changeChapter}>
            <TouchableOpacity
              style={[
                styles.arrowButton,
                page === 0 && styles.arrowDisabled,
                { opacity: allPages ? 1 : 0 }
              ]}
              onPress={() => {
                if (page > 0) setPage(page - 1);
              }}
              disabled={page === 0 || !allPages}
            >
              <Image 
                source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '90deg' }] }]}  
              />
            </TouchableOpacity>

            <View style={styles.boxContainer}>
              <TouchableOpacity style={[styles.capituloButton,{width: '100%'}]} onPress={() => setAllPages(!allPages)}>
                <Text style={styles.capituloText}>Alterar modo</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.arrowButton,
                page === totalPaginas - 1 && styles.arrowDisabled,
                { opacity: allPages ? 1 : 0 }
              ]}
              onPress={() => {
                if (page < totalPaginas - 1) setPage(page + 1);
              }}
              disabled={page === totalPaginas - 1 || !allPages}
            >
              <Image 
                source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '270deg' }] }]}  
              />
            </TouchableOpacity>
          </View>

          <Text>AAAAAAAAAAAAAAAAAA</Text>

          <View style={styles.changeChapter}>
            <TouchableOpacity
              style={[
                styles.arrowButton,
                page === 0 && styles.arrowDisabled,
                { opacity: allPages ? 1 : 0 }
              ]}
              onPress={() => {
                if (page > 0) setPage(page - 1);
              }}
              disabled={page === 0 || !allPages}
            >
              <Image 
                source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '90deg' }] }]}  
              />
            </TouchableOpacity>

            <View style={styles.boxContainer}>
              <TouchableOpacity style={[styles.capituloButton,{width: '100%'}]} onPress={() => setAllPages(!allPages)}>
                <Text style={styles.capituloText}>Alterar modo</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.arrowButton,
                page === totalPaginas - 1 && styles.arrowDisabled,
                { opacity: allPages ? 1 : 0 }
              ]}
              onPress={() => {
                if (page < totalPaginas - 1) setPage(page + 1);
              }}
              disabled={page === totalPaginas - 1 || !allPages}
            >
              <Image 
                source={require('../assets/arrow.png')}
                style={[styles.arrowIcon, { transform: [{ rotate: '270deg' }] }]}  
              />
            </TouchableOpacity>
          </View>

          <View style={styles.boxContainer}>
            <Text style={styles.labelText}>Nome</Text>
            <TextInput
              style={styles.inputField}
              placeholder='Nome'
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={name}
              onChangeText={setName}
            />
          </View>
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
  modalTagItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#555555',
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  capituloButton: {
    width: 174,
    height: 37,
    backgroundColor: '#222222',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 14,
  },
  capituloText: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '700',
  },
  capituloArrow: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  changeChapter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
  },
  arrowButton: {
    width: 44,
    height: 37,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,

    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowDisabled: {
    backgroundColor: '#555',
    opacity: 0.6,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
    resizeMode: 'contain',
  },
};

const styles = mergeStyles(LocalStyles)