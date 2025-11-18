import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Modal,
  FlatList,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { mergeStyles } from "../components/GlobalStyles";

// --- CONSTANTES E MOCKS ---
const MAX_SELECTION_LIMIT = 4;
const image = require("../assets/background.png");
const avatar = require("../assets/avatar.png");

const OnePieceCover = require("../assets/one-piece.png");
const DemonSlayerCover = require("../assets/kimetsu.png");
const JujutsuKaisenCover = require("../assets/jujutsu.png");
const DragonBallCover = require("../assets/dragon-ball.png");

const mockResults = [
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

const availableTags = [
  { id: '1', name: 'Ação' },
  { id: '2', name: 'Aventura' },
  { id: '3', name: 'Comédia' },
  { id: '4', name: 'Drama' },
  { id: '5', name: 'Fantasia' },
  { id: '6', name: 'Ficção Científica' },
  { id: '7', name: 'Romance' },
  { id: '8', name: 'Suspense' },
  { id: '9', name: 'Terror' },
  { id: '10', name: 'Esportes' },
  { id: '11', name: 'Musical' },
  { id: '12', name: 'Histórico' },
  { id: '13', name: 'Mecha' },
  { id: '14', name: 'Slice of Life' },
];

const releaseOptions = [{id: 'rec', name: "Mais recentes"}, {id: 'ant', name: "Mais antigos"}];
const popularityOptions = [{id: 'pop', name: "Mais populares"}, {id: 'men', name: "Menos populares"}];
const alphabeticalOptions = [{id: 'az', name: "A → Z"}, {id: 'za', name: "Z → A"}, {id: 'no', name: "Nenhum"}];

// --- COMPONENTE DE HEADER PADRONIZADO ---
function AppHeader({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      <View style={styles.header}>
        <View style={{ margin: '2%', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={avatar} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

// --- COMPONENTE DE DROPDOWN ESTILIZADO ---
// Agora usa boxContainer, labelText e displayField para consistência visual
function StyledDropdown({ label, value, options, onSelect }) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.boxContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.displayField}
      >
        <Text style={styles.displayFieldText}>
          {value ? value.name : "Selecione..."}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalCenteredView} // Reutiliza o estilo de centralização do modal
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.modalContent, { maxHeight: '50%' }]}>
            <Text style={styles.modalTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.id || item.name}
              style={{ width: '100%' }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalTagItem} // Reutiliza o estilo de item de lista do modal
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.modalTagText}>{item.name}</Text>
                  {/* Check visual se estiver selecionado */}
                  {value && value.id === item.id && (
                     <Text style={styles.modalCheckMark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
             <View style={[styles.modalButtonGroup, {marginTop: 15}]}>
               <TouchableOpacity 
                  style={[styles.modalButton, styles.modalCloseButton, {width: '100%'}]}
                  onPress={() => setVisible(false)}
                >
                 <Text style={styles.modalTextStyle}>Cancelar</Text>
               </TouchableOpacity>
             </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// --- COMPONENTE MODAL DE TAGS ---
function TagSelectionModal({
  visible,
  onClose,
  onSave,
  selectedTagIds,
  setSelectedTagIds,
  allTags,
}) {
  const toggleTag = (tagId) => {
    const isSelected = selectedTagIds.includes(tagId);

    if (isSelected) {
      setSelectedTagIds((prevSelected) =>
        prevSelected.filter((id) => id !== tagId)
      );
    } else if (selectedTagIds.length < MAX_SELECTION_LIMIT) {
      setSelectedTagIds((prevSelected) =>
        [...prevSelected, tagId]
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalCenteredView}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Selecione Gêneros ({selectedTagIds.length}/{MAX_SELECTION_LIMIT})
          </Text>

          <FlatList
            data={allTags}
            keyExtractor={(item) => item.id}
            style={styles.modalListContainer}
            contentContainerStyle={styles.modalListContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = selectedTagIds.includes(item.id);
              // Se já atingiu o limite e este item não está selecionado, fica "desabilitado" visualmente
              const limitReached = !isSelected && selectedTagIds.length >= MAX_SELECTION_LIMIT;

              return (
                <TouchableOpacity
                  style={styles.modalTagItem}
                  onPress={() => toggleTag(item.id)}
                  activeOpacity={limitReached ? 0.5 : 0.2}
                >
                  <Text style={[
                    styles.modalTagText, 
                    limitReached && { color: 'rgba(255,255,255,0.4)' }
                  ]}>
                    {item.name}
                  </Text>

                  <View style={[
                    styles.modalCheckbox,
                    isSelected && styles.modalCheckboxSelected,
                    limitReached && { borderColor: 'rgba(255,255,255,0.4)' }
                  ]}>
                    {isSelected && <Text style={styles.modalCheckMark}>✓</Text>}
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          <View style={styles.modalButtonGroup}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCloseButton]}
              onPress={onClose}
            >
              <Text style={styles.modalTextStyle}>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalSaveButton]}
              onPress={onSave}
            >
              <Text style={styles.modalTextStyle}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// --- TELA DE FILTROS ---
export function FilterScreen({ navigation }) {
  // Estados
  const [name, setName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  
  const [release, setRelease] = useState(null);
  const [popularity, setPopularity] = useState(null);
  const [alpha, setAlpha] = useState(null);

  // Resetar ao focar
  useFocusEffect(
    useCallback(() => {
      setName("");
      setSelectedTagIds([]);
      setRelease(null);
      setPopularity(null);
      setAlpha(null);
    }, [])
  );

  // Helpers
  const getSelectedTagNames = () => {
    if (selectedTagIds.length === 0) return "Selecione até 4 tags";
    const names = availableTags
      .filter(tag => selectedTagIds.includes(tag.id))
      .map(tag => tag.name);
    return names.join(', ');
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />
      <AppHeader navigation={navigation} />

      <View style={styles.body}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.screentitle, { marginBottom: 20, marginTop: 10 }]}>
              Filtrar Pesquisa
            </Text>

            {/* 1. Input Nome */}
            <View style={styles.boxContainer}>
              <Text style={styles.labelText}>Nome</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Nome do quadrinho"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* 2. Input Tags (Abre Modal) */}
            <View style={styles.boxContainer}>
              <Text style={styles.labelText}>Gênero (Tag)</Text>
              <TouchableOpacity
                style={styles.displayField}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.displayFieldText} numberOfLines={1}>
                  {getSelectedTagNames()}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Componente Modal Isolado */}
            <TagSelectionModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onSave={() => setModalVisible(false)}
              selectedTagIds={selectedTagIds}
              setSelectedTagIds={setSelectedTagIds}
              allTags={availableTags}
            />

            {/* 3. Dropdowns Padronizados */}
            <StyledDropdown 
              label="Lançamento" 
              value={release} 
              options={releaseOptions} 
              onSelect={setRelease} 
            />

            <StyledDropdown 
              label="Popularidade" 
              value={popularity} 
              options={popularityOptions} 
              onSelect={setPopularity} 
            />

            <StyledDropdown 
              label="Ordem alfabética" 
              value={alpha} 
              options={alphabeticalOptions} 
              onSelect={setAlpha} 
            />

            {/* 4. Botão de Pesquisar */}
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchResults")}
              style={[styles.buttonContainer, { marginTop: 30, marginBottom: 50 }]}
            >
              <Text style={styles.buttonText}>Pesquisar</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>
    </View>
  );
}

// --- TELA DE RESULTADOS ---
export function SearchResultsScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />
      <AppHeader navigation={navigation} />

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.screentitle, { marginVertical: 20 }]}>
            Resultados da pesquisa
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              paddingBottom: 20
            }}
          >
            {mockResults.map((item) => (
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
  );
}

// Aplica os estilos globais
const styles = mergeStyles({});