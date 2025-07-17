import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SmallButton = ({ onPress, style, title, type }) => {
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
      activeOpacity={0.7}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.shareBtn,
          {
            transform: [{ scale }, { rotate: rotateDeg }],
          },
          style,
        ]}
      >
        <Text style={styles.btnText}>{title}</Text>
        {type === 'Share' ? (
          <Image source={require('../assets/icons/share.png')} />
        ) : (
          <Image source={require('../assets/icons/retry.png')} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#0F4398',
  },
  shareBtn: {
    minWidth: '33%',
    height: 42,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,

    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default SmallButton;
