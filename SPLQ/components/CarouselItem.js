  import React from 'react';
  import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
  import Animated from 'react-native-reanimated';

  const CarouselItem = ({ item, index, navigation }) => {
    // You can use useAnimatedStyle, useSharedValue, etc. here for item-specific animations
    return (
      <Animated.View style={styles.itemContainer}>
        <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.navigate('Quadrinho', { idQua: 1 })}>
          <Image source={item.source} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    image: {
      width: '100%',
      height: '80%',
      borderStyle: 'solid',
      resizeMode: 'contain',
      borderRadius: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 2,
      color: 'white',
      textAlign: 'center'
    },
  });

  export default CarouselItem;