import React, { useState, useCallback } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  ImageBackground,
  Modal
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { mergeStyles } from "../components/GlobalStyles";

// Imagens
const image = require("../assets/background.png");
const avatar = require("../assets/avatar.png");

const OnePieceCover = require("../assets/one-piece.png");
const DemonSlayerCover = require("../assets/kimetsu.png");
const JujutsuKaisenCover = require("../assets/jujutsu.png");
const DragonBallCover = require("../assets/dragon-ball.png");

const styles = mergeStyles({});

// -----------------------------
// HEADER NO ESTILO DO FAVORITOS
// -----------------------------
function AppHeader({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ width: "100%" }}>
      {/* Safe area superior cinza semi-transparente */}
      <View style={{ paddingTop: insets.top, backgroundColor: "#ffffffaa" }} />

      {/* Header real transparente, apenas padding e ícone */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 10,
          backgroundColor: "transparent", // <- aqui era #ffffffaa
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
          <Image source={avatar} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


// -----------------------------
// DROPDOWN COM MODAL
// -----------------------------
function Dropdown({ label, selected, options, onSelect }) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginBottom: 18 }}>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          backgroundColor: "rgba(255,255,255,0.2)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.4)",
          padding: 12,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "#fff" }}>{selected || label}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            padding: 20,
          }}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View
            style={{
              backgroundColor: "#222",
              padding: 20,
              borderRadius: 12,
            }}
          >
            {options.map((opt) => (
              <TouchableOpacity
                key={opt.id || opt}
                onPress={() => {
                  onSelect(opt.name || opt);
                  setVisible(false);
                }}
                style={{ paddingVertical: 10 }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {opt.name || opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// -----------------------------
// MOCK FIXO
// -----------------------------
const mockResults = [
  { id: 1, title: "Mangá 1", cover: OnePieceCover },
  { id: 2, title: "Mangá 2", cover: DemonSlayerCover },
  { id: 3, title: "Mangá 3", cover: JujutsuKaisenCover },
  { id: 4, title: "Mangá 4", cover: DragonBallCover },
  { id: 5, title: "Mangá 5", cover: OnePieceCover },
];

// Opções
const availableTags = [
  { id: "1", name: "Ação" }, { id: "2", name: "Aventura" }, { id: "3", name: "Comédia" },
  { id: "4", name: "Drama" }, { id: "5", name: "Fantasia" }, { id: "6", name: "Ficção Científica" },
  { id: "7", name: "Romance" }, { id: "8", name: "Suspense" }, { id: "9", name: "Terror" },
];

const releaseOptions = ["Mais recentes", "Mais antigos"];
const popularityOptions = ["Mais populares", "Menos populares"];
const alphabeticalOptions = ["A → Z", "Z → A", "Nenhum"];

// -----------------------------
// FILTER SCREEN
// -----------------------------
export function FilterScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState("");
  const [tag, setTag] = useState(null);
  const [release, setRelease] = useState(null);
  const [popularity, setPopularity] = useState(null);
  const [alpha, setAlpha] = useState(null);

  // Quando a tela volta, reseta tudo
  useFocusEffect(
    useCallback(() => {
      setName("");
      setTag(null);
      setRelease(null);
      setPopularity(null);
      setAlpha(null);
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={image}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* HEADER FIXO E BONITO */}
      <AppHeader navigation={navigation} />

      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={{ color: "white", marginBottom: 8, fontSize: 18 }}>
          Nome
        </Text>

        <TextInput
          placeholder="Nome de um quadrinho"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#ccc"
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.4)",
            color: "white",
            padding: 12,
            borderRadius: 12,
            marginBottom: 20,
          }}
        />

        <Text style={{ color: "white", marginBottom: 8, fontSize: 18 }}>
          Gênero (Tag)
        </Text>
        <Dropdown
          label="Selecionar tags"
          selected={tag}
          options={availableTags}
          onSelect={setTag}
        />

        <Text style={{ color: "white", marginBottom: 8, fontSize: 18 }}>
          Lançamento
        </Text>
        <Dropdown
          label="Mais recentes"
          selected={release}
          options={releaseOptions}
          onSelect={setRelease}
        />

        <Text style={{ color: "white", marginBottom: 8, fontSize: 18 }}>
          Popularidade
        </Text>
        <Dropdown
          label="Mais populares"
          selected={popularity}
          options={popularityOptions}
          onSelect={setPopularity}
        />

        <Text style={{ color: "white", marginBottom: 8, fontSize: 18 }}>
          Ordem alfabética
        </Text>
        <Dropdown
          label="A → Z"
          selected={alpha}
          options={alphabeticalOptions}
          onSelect={setAlpha}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("SearchResults")}
          style={{
            backgroundColor: "rgba(255,255,255,0.25)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.4)",
            padding: 15,
            borderRadius: 12,
            marginTop: 20,
          }}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontSize: 18 }}
          >
            Pesquisar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// -----------------------------
// SEARCH RESULTS SCREEN
// -----------------------------
export function SearchResultsScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={image}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <AppHeader navigation={navigation} />

      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={{ color: "white", fontSize: 24, marginBottom: 20 }}>
          Resultados da pesquisa
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {mockResults.map((item) => (
            <View
              key={item.id}
              style={{
                width: "48%",
                backgroundColor: "rgba(255,255,255,0.1)",
                padding: 10,
                marginBottom: 20,
                borderRadius: 12,
              }}
            >
              <Image
                source={item.cover}
                style={{ width: "100%", height: 150, borderRadius: 10 }}
              />
              <Text
                style={{ color: "white", marginTop: 10, textAlign: "center" }}
              >
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
