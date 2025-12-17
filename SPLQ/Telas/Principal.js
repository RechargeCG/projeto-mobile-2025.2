import React, { useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { mergeStyles } from '../components/GlobalStyles';
import { AppContext } from '../components/ContextoLogin'; 
// Importações de listas (assumidas, adapte conforme a necessidade real)
const DestaqueList = ({ navigation }) => <View style={{height: 200}}><Text style={{color: 'white'}}>Lista Destaque Placeholder</Text></View>;
const HorizontalList = ({ navigation }) => <View style={{height: 120}}><Text style={{color: 'white'}}>Lista Horizontal Placeholder</Text></View>;

const image = require('../assets/background.png');

const styles = mergeStyles({})

export default function PrincipalScreen() {
    const navigation = useNavigation();
    // Pega o nome do usuário e a função de logout do Contexto
    const { userData, handleLogout } = useContext(AppContext);
    
    // Função para lidar com o logout
    const onLogout = () => {
        Alert.alert(
            "Confirmação",
            "Deseja realmente sair da sua conta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { 
                    text: "Sair", 
                    onPress: async () => {
                        const success = await handleLogout();
                        if (success) {
                            // Após o logout, navega de volta para o Login, removendo o histórico
                            navigation.replace('Login'); 
                        } else {
                            Alert.alert("Erro", "Não foi possível desconectar.");
                        }
                    }
                }
            ]
        );
    };

    const userName = userData ? userData.nome : 'Usuário';

    const insets = useSafeAreaInsets();
    
    return (
        <View style={{flex:1}}>
            <ImageBackground source={image} style={styles.background} />
            <View style={{ paddingTop: insets.top, backgroundColor: '#ffffffaa' }} />
            <View style={styles.header}>
              <View style={{margin: '2%', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                  <Image source={require('../assets/avatar.png')} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.body}>
                <View style={styles.container}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.screentitle, { marginBottom: 15 }]}>Olá, {userName}!</Text> 
                    <Text style={styles.screentitle}>Destaques</Text>
                    <View style={styles.coverBox}>
                        <DestaqueList navigation={navigation}/> 
                    </View>
                    
                    <View style={{ marginBottom: 10, marginTop: -60 }}>
                      <Text style={{...styles.covertitle, textAlign: 'left'}}>Populares</Text>
                      <HorizontalList navigation={navigation} />
                    </View>

                    <TouchableOpacity 
                        style={{ padding: 10, backgroundColor: '#dc3545', borderRadius: 5, marginTop: 20 }} 
                        onPress={onLogout}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Sair (Logout)</Text>
                    </TouchableOpacity>

                    <View style={{ marginVertical: 10 }}>
                      <Text style={{...styles.covertitle, textAlign: 'left'}}>Recentes</Text>
                      <HorizontalList navigation={navigation} />
                    </View>

                    <View style={{ marginVertical: 10 }}>
                      <Text style={{...styles.covertitle, textAlign: 'left'}}>Nacionais</Text>
                      <HorizontalList navigation={navigation} />
                    </View>
                  </ScrollView>
                </View>
            </View>
        </View>
    );
}