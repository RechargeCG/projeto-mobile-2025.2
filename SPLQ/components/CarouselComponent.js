import React from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import CarouselItem from './CarouselItem'; // Assuming you create this file
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.65;
const ITEM_SPACING = 0;

const customParallaxAnimation = (value) => {
  'worklet';
  const translateX = interpolate(
    value,
    [-1, 0, 1],
    [-ITEM_WIDTH / 2 - ITEM_SPACING / 2, 0, ITEM_WIDTH / 2 + ITEM_SPACING / 2],
    Extrapolation.EXTEND
  );

  const scale = interpolate(
    value,
    [-1, 0, 1],
    [0.7, 1, 0.7],
    Extrapolation.EXTEND
  );

  const opacity = interpolate(
    value,
    [-1, 0, 1],
    [0.6, 1, 0.6],
    Extrapolation.EXTEND
  );

  const rotateZ = `${interpolate(
    value,
    [-1, 0, 1], 
    [-15, 0, 15], // Angle in degrees
    'extend'
  )}deg`;

  const zIndex = Math.round(
    interpolate(
      value,
      [-1, 0, 1], // Relative position: left, center, right
      [10, 20, 10], // Output range: low, high, low
      'extend'
    )
  );

  return {
    zIndex,
    transform: [{ translateX }, { scale }, { rotateZ } ],
    opacity,
  };
};

const CarouselComponent = ({ data }) => {
  return (
    <Carousel
      loop
      width={width}
      mode="parallax"
      height={width} // Adjust height as needed
      data={data}
      renderItem={({ item, index }) => <CarouselItem item={item} index={index} />}
    // Optional: Add custom animations or layouts here
      customAnimation={customParallaxAnimation}
    />
  );
};

export default CarouselComponent;