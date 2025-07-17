import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';

export default function PulsingButton({ style, children, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (!isPressed) {
      runJitteryAnimation();
    }
  }, [isPressed]);

  const runJitteryAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(1900),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.15,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: -5,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 5,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: -3,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 2,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 0,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const rotateDeg = rotate.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.button,
          {
            transform: [{ scale }, { rotate: rotateDeg }],
          },
          style,
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 24,
    letterSpacing: 2,
  },
});
