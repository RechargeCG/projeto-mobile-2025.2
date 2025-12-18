import React, { useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
  Alert
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { mergeStyles } from "../components/GlobalStyles";
import { AppContext } from "../components/ContextoLogin";

// --- CONSTANTES ---
const MAX_SELECTION_LIMIT = 4;
const image = require("../assets/background.png");
const avatar = require("../assets/avatar.png");

const AVAILABLE_TAGS = [
  "Ação", "Aventura", "Comédia", "Drama", "Fantasia",
  "Ficção Científica", "Horror", "Mistério", "Romance", "Suspense",
];

// --- COMPONENTE DE HEADER ---
function AppHeader({ navigation }) {
  const insets = useSafeAreaInsets();
  const styles = mergeStyles({});
  return (
    <>
      <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
      <View style={styles.header}>
        <View style={{ margin: '2%', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={avatar} style={{ width: 30, height: 30, borderRadius: 15 }} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

// --- TELA DE FILTRO/BUSCA ---
export function FilterScreen({ navigation }) {
  const { ip } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const styles = mergeStyles({});

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < MAX_SELECTION_LIMIT) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('busca', searchQuery);
      formData.append('tags', selectedTags.join(','));

      const response = await fetch(`http://${ip}/SPLQ_Server/backend/pesquisa.php`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.sucesso) {
        navigation.navigate("SearchResults", { resultados: data.resultados });
      } else {
        Alert.alert("Erro", "Não foi possível realizar a busca.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro de Conexão", "Verifique se o servidor está online.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Resetar estados ao focar na tela, se desejar
    }, [])
  );

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={[styles.screentitle, { marginVertical: 20 }]}>Pesquisar</Text>

          {/* Barra de Pesquisa */}
          <TextInput
            style={[styles.inputField, { backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }]}
            placeholder="Digite o nome do quadrinho..."
            placeholderTextColor="#ccc"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <Text style={{ color: 'white', marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>
            Tags (Máx {MAX_SELECTION_LIMIT}):
          </Text>

          {/* Grid de Tags */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {AVAILABLE_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  style={{
                    backgroundColor: isSelected ? '#ff6347' : 'rgba(255,255,255,0.1)',
                    padding: 10,
                    margin: 5,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: isSelected ? '#ff6347' : '#fff'
                  }}
                >
                  <Text style={{ color: 'white' }}>{tag}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity 
            style={[styles.buttonContainer, { marginTop: 30 }]} 
            onPress={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Buscar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// --- TELA DE RESULTADOS ---
export function SearchResultsScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const styles = mergeStyles({});
  
  // Recebe os resultados vindos da FilterScreen
  const { resultados } = route.params || { resultados: [] };

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />
      <AppHeader navigation={navigation} />

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.screentitle, { marginVertical: 20 }]}>
            {resultados.length > 0 ? "Resultados" : "Nenhum resultado"}
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', paddingBottom: 20 }}>
            {resultados.map((item) => (
              <TouchableOpacity
                key={item.idQua}
                style={{
                  width: '31.33%',
                  margin: '1%',
                  borderRadius: 10,
                  overflow: 'hidden',
                  height: 160
                }}
                onPress={() => navigation.navigate('Quadrinho', { idQua: item.idQua })}
              >
                <Image
                  source={{ uri: item.fonte_capa }}
                  style={{ width: '100%', height: '100%' }}
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