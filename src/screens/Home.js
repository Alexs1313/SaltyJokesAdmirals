import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { dailyJokes } from '../data/dailyJokes';
import SmallButton from '../components/SmallButton';
import AnimatedView from '../components/animate/AnimatedView';
import { useStore } from '../store/context';

const { height, width } = Dimensions.get('window');

const Home = () => {
  const [randomIdx, setRandomIdx] = useState(() =>
    Math.floor(Math.random() * 30),
  );
  const navigation = useNavigation();
  const {
    likedImages,
    setLikedImages,
    saveJokes,
    removeJoke,
    isEnableNotification,
  } = useStore();

  const handleShare = async joke => {
    try {
      await Share.share({
        message: `${joke}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadLikedImages();
  }, []);

  const isCurrentLiked = likedImages.includes(dailyJokes[randomIdx].id);

  const loadLikedImages = async () => {
    const stored = await AsyncStorage.getItem('liked');
    if (stored) {
      setLikedImages(JSON.parse(stored));
    }
  };

  const saveLikedImages = async data => {
    await AsyncStorage.setItem('liked', JSON.stringify(data));
  };

  const toggleLike = () => {
    const currentId = dailyJokes[randomIdx].id;
    const isLiked = likedImages.includes(currentId);

    const updatedLikes = isLiked
      ? likedImages.filter(id => id !== currentId)
      : [...likedImages, currentId];

    setLikedImages(updatedLikes);
    saveLikedImages(updatedLikes);

    if (isCurrentLiked) {
      removeJoke(dailyJokes[randomIdx]);
      if (isEnableNotification)
        Toast.show({
          text1: `Removed from favorites!`,
        });
    } else {
      saveJokes(dailyJokes[randomIdx]);
      if (isEnableNotification)
        Toast.show({
          text1: `Joke added to favorites!`,
        });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <AnimatedView>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.detailsContainer}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Info')}
              >
                <Image source={require('../assets/icons/info.png')} />
              </TouchableOpacity>
              <Image
                source={require('../assets/images/homeLogo.png')}
                style={styles.logoImg}
              />
              <TouchableOpacity
                style={styles.detailsContainer}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Settings')}
              >
                <Image source={require('../assets/icons/settings.png')} />
              </TouchableOpacity>
            </View>
            <View>
              <LinearGradient
                colors={['#051632', '#0F4398']}
                style={styles.gradientContainer}
              >
                <View style={styles.contentWrap}>
                  <Text style={styles.title}>Laugh quickly!</Text>
                  <Text style={styles.jokeText}>
                    {dailyJokes[randomIdx].text}
                  </Text>
                  <View style={styles.buttonsWrap}>
                    <SmallButton
                      onPress={() => handleShare(dailyJokes[randomIdx].text)}
                      title={'Drop a friend'}
                      type={'Share'}
                    />

                    <TouchableOpacity
                      onPress={() => toggleLike()}
                      style={styles.addToFavBtn}
                    >
                      {isCurrentLiked ? (
                        <Image source={require('../assets/icons/liked.png')} />
                      ) : (
                        <Image source={require('../assets/icons/like.png')} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
              <Image
                source={require('../assets/images/jokeAdmiral.png')}
                style={styles.admiralImg}
              />
            </View>

            <LinearGradient
              colors={['#051632', '#0F4398']}
              style={styles.menuContainer}
            >
              <View style={styles.menuGradientContainer}>
                <Text style={styles.menuTitle}>MENU</Text>

                <TouchableOpacity
                  style={styles.menuBtn}
                  onPress={() => navigation.navigate('Jokes')}
                >
                  <Text style={styles.menuBtnText}>Salty Jokes</Text>
                  <Image source={require('../assets/icons/jokes.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuBtn}
                  onPress={() => navigation.navigate('Nicknames')}
                >
                  <Text style={styles.menuBtnText}>Nicknames</Text>
                  <Image source={require('../assets/icons/nicknames.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuBtn}
                  onPress={() => navigation.navigate('Favorites')}
                >
                  <Text style={styles.menuBtnText}>Favorites</Text>
                  <Image source={require('../assets/icons/fav.png')} />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </AnimatedView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.054, padding: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  logoImg: { width: 150, height: 150 },
  detailsContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    width: '100%',
    borderRadius: 24,
    marginTop: 45,
  },
  admiralImg: {
    width: 146,
    height: 220,
    bottom: 0,
    position: 'absolute',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  jokeText: {
    fontWeight: 'medium',
    fontSize: 11,
    color: '#fff',
    marginBottom: 5,
    minWidth: 172,
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
  },
  buttonsWrap: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 13,
  },
  contentWrap: {
    paddingLeft: width * 0.4,
    paddingRight: 20,
    paddingVertical: 20,
  },
  menuContainer: {
    width: '100%',
    borderRadius: 12,
    marginTop: 20,
  },
  menuGradientContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 16,
    alignItems: 'center',
  },
  menuBtn: {
    width: '70%',
    height: 65,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  menuBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F4398',
  },
});

export default Home;
