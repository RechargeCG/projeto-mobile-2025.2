import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

// ****** SUBSTITUA ESTE IP PELO IP REAL DA SUA MÁQUINA NA REDE LOCAL ******
const PHP_API_URL = 'http://200.18.140.153/teste/index.php'; 
// Exemplo: 'http://192.168.1.105/dados.php'
// ************************************************************************

export default function FetchDataComponent() {
  const [dataMessage, setDataMessage] = useState('Aguardando conexão...');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(PHP_API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Verifica se a resposta HTTP foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();

      // Atualiza o estado com a mensagem e o timestamp do PHP
      setDataMessage(`✅ Sucesso! \n Mensagem: ${data.message} \n Timestamp: ${data.timestamp} \n Servidor: ${data.serverName}`);
      
    } catch (error) {
      console.error('Erro ao buscar dados do PHP:', error);
      setDataMessage(`❌ ERRO na Conexão:\n Verifique se o PHP está rodando e o IP está correto. \n Detalhe: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Executa a função fetchData ao montar o componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Status da Conexão com PHP</Text>
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.resultText}>{dataMessage}</Text>
      )}

      <Text style={styles.urlText}>
        URL Tentada: {PHP_API_URL}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    minHeight: 100,
  },
  urlText: {
    marginTop: 15,
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  }
});