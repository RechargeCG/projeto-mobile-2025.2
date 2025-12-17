import {
  StyleSheet, Text, View, ImageBackground, ScrollView,
  Image, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { mergeStyles } from '../components/GlobalStyles';
import { TextInput } from 'react-native-gesture-handler';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../components/ContextoLogin';
import LoginScreen from './Login';

const image = require('../assets/background.png');

export default function PerfilScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const { idUsu, ip } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [obras, setObras] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPerfil();
  }, []);

  const fetchPerfil = async () => {
    try {
      const formData = new FormData();
      alert(idUsu)
      formData.append('idPerfil', idUsu);

      const response = await fetch(`http://${ip}/SPLQ_Server/backend/acessa_perfil.php`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setUsuario(data.usuario);
      setObras(data.obras);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
    if (!idUsu) {
      return (
        <LoginScreen></LoginScreen>
      )
    }

  if (loading) {
    return (
      <View style={[styles.wrapper, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.wrapper}>
        <Text style={{ color: 'white', textAlign: 'center' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} style={styles.background} />

      <View style={{ paddingTop: insets.top }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginHorizontal: '5%' }}>
        <Text style={styles.screentitle}>Perfil</Text>

        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/avatar.png')}
            style={{ width: 200, height: 200 }}
          />
          <Text style={styles.sectiontitle}>{usuario.nome}</Text>
        </View>

        <TextInput
          style={[styles.inputField, { height: 200 }]}
          multiline
          editable={false}
          value={usuario.descricao}
        />

        <TouchableOpacity
          style={[styles.buttonContainer, { marginVertical: 10 }]}
          onPress={() => navigation.navigate('PerfilEdicao')}
        >
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('CadastrarObra')}
        >
          <Text style={styles.buttonText}>Cadastrar obra</Text>
        </TouchableOpacity>

        <Text style={styles.sectiontitle}>Minhas obras</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {obras.map((obra) => (
            <TouchableOpacity
              key={obra.idQua}
              style={{
                width: '31.33%',
                margin: '1%',
                height: 160,
                borderRadius: 10,
                overflow: 'hidden'
              }}
              onPress={() =>
                navigation.navigate('Quadrinho', { idQua: obra.idQua })
              }
            >
              <Image
                source={{ uri: obra.capa_url }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={{ paddingBottom: insets.bottom }} />
    </View>
  );
}

const LocalStyles = {
  header: {
    margin: '2%',
  },
};

const styles = mergeStyles(LocalStyles);
