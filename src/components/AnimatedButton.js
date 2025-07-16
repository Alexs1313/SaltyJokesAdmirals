import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';

const GlowButton = () => {
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  const shadowInterpolation = glow.interpolate({
    inputRange: [0, 1],
    outputRange: ['0px', '12px'],
  });

  return (
    <TouchableOpacity>
      <Animated.View
        style={[
          styles.button,
          {
            shadowRadius: glow,
            shadowColor: '#0f0',
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 0 },
          },
        ]}
      >
        <Text style={styles.text}>Click Me</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
  },
  text: {
    color: '#0f0',
    fontWeight: 'bold',
  },
});

export default GlowButton;
