import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SmallButton from './SmallButton';
import { useStore } from '../store/context';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';

const JokeCard = ({ item }) => {
  const {
    saveJokes,
    getSavedJokes,
    removeJoke,
    likedImages,
    setLikedImages,
    isEnableNotification,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      getSavedJokes();
      loadLikedImages();
    }, []),
  );

  const handleShareJoke = async () => {
    try {
      await Share.share({
        message: `${item.text}
  `,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const isCurrentLiked = likedImages.includes(item.id);

  const loadLikedImages = async () => {
    const stored = await AsyncStorage.getItem('liked');
    if (stored) {
      setLikedImages(JSON.parse(stored));
    }
  };

  const saveLikedImages = async data => {
    await AsyncStorage.setItem('liked', JSON.stringify(data));
  };

  const toggleLike = item => {
    const currentId = item.id;
    const isLiked = likedImages.includes(currentId);

    const updatedLikes = isLiked
      ? likedImages.filter(id => id !== currentId)
      : [...likedImages, currentId];

    setLikedImages(updatedLikes);
    saveLikedImages(updatedLikes);

    if (isCurrentLiked) {
      removeJoke(item);
      if (isEnableNotification)
        Toast.show({
          text1: `Removed from favorites!`,
        });
    } else {
      saveJokes(item);
    }
  };

  return (
    <LinearGradient
      colors={['#051632', '#0F4398']}
      style={styles.gradientContainer}
    >
      <View style={[styles.contentWrap]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={[styles.jokeText, { width: 210 }]}>{item.text}</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>
        <View style={styles.containerButtonsWrap}>
          <TouchableOpacity
            style={styles.addToFavBtn}
            activeOpacity={0.7}
            onPress={() => toggleLike(item)}
          >
            {isCurrentLiked ? (
              <Image source={require('../assets/icons/liked.png')} />
            ) : (
              <Image source={require('../assets/icons/like.png')} />
            )}
          </TouchableOpacity>
          <SmallButton
            onPress={() => handleShareJoke()}
            title={'Drop a friend'}
            type={'Share'}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  addToFavBtn: {
    width: 42,
    height: 42,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,

    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
  containerButtonsWrap: {
    flexDirection: 'row',
    gap: 18,
  },
  typeContainer: {
    width: 86,
    height: 25,
    backgroundColor: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeText: {
    fontWeight: 'bold',
    fontSize: 8.5,
    color: '#0F4398',
  },
  gradientContainer: {
    width: '100%',
    borderRadius: 24,
    marginTop: 23,
  },
  jokeText: {
    fontWeight: 'regular',
    fontSize: 15,
    color: '#fff',
    marginBottom: 26,
  },
  contentWrap: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
});

export default JokeCard;
