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
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import SmallButton from './SmallButton';
import { useStore } from '../store/context';
import Toast from 'react-native-toast-message';

const TaleCard = ({ item }) => {
  const {
    saveJokes,
    getSavedJokes,
    removeJoke,
    likedImagesTales,
    setLikedImagesTales,
    isEnableNotification,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      getSavedJokes();
      loadLikedImagesTales();
    }, []),
  );

  const handleShareJoke = async () => {
    try {
      await Share.share({
        message: `${item.title}
 ${item.tale}
`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const isCurrentLikedTale = likedImagesTales.includes(item.id);

  const loadLikedImagesTales = async () => {
    const stored = await AsyncStorage.getItem('likedTales');
    if (stored) {
      setLikedImagesTales(JSON.parse(stored));
    }
  };

  const saveLikedImagesTale = async data => {
    await AsyncStorage.setItem('likedTales', JSON.stringify(data));
  };

  const toggleLikeTale = item => {
    const currentId = item.id;
    const isLiked = likedImagesTales.includes(currentId);

    const updatedLikes = isLiked
      ? likedImagesTales.filter(id => id !== currentId)
      : [...likedImagesTales, currentId];

    setLikedImagesTales(updatedLikes);
    saveLikedImagesTale(updatedLikes);

    if (isCurrentLikedTale) {
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
          <Text style={[styles.menuTitle, { width: 190 }]}>{item.title}</Text>

          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>
        <Text style={styles.jokeText}>{item.tale}</Text>

        <View style={styles.containerButtonsWrap}>
          <TouchableOpacity
            style={styles.addToFavBtn}
            activeOpacity={0.7}
            onPress={() => toggleLikeTale(item)}
          >
            {isCurrentLikedTale ? (
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
  taleText: {
    fontSize: 15,
    fontWeight: 'regular',
    color: '#fff',
    marginBottom: 21,
  },
  taleContainer: {
    width: '100%',
    paddingVertical: 29,
    paddingHorizontal: 24,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 21,
  },
  taleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  taleText: {
    fontSize: 15,
    fontWeight: 'regular',
    color: '#fff',
    marginBottom: 21,
  },
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
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 26,
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

export default TaleCard;
