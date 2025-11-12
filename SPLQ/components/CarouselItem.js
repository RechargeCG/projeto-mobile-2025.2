  import React from 'react';
  import { View, Text, StyleSheet, Image } from 'react-native';
  import Animated from 'react-native-reanimated';

  const CarouselItem = ({ item, index }) => {
    // You can use useAnimatedStyle, useSharedValue, etc. here for item-specific animations
    return (
      <Animated.View style={styles.itemContainer}>
        <Image source={item.source} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginHorizontal: 10,
    },
    image: {
      width: '100%',
      height: '80%',
      resizeMode: 'contain',
      borderRadius: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      color: 'white'
    },
  });

  export default CarouselItem;