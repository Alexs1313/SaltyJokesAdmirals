import { useCallback, useEffect, useState } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import SmallButton from '../components/SmallButton';
import { tales } from '../data/tales';
import { jokes } from '../data/jokes';
import { useStore } from '../store/context';
import AnimatedView from '../components/animate/AnimatedView';
import PulsingButton from '../components/PulsButton';

const { height, width } = Dimensions.get('window');

const Jokes = () => {
  const [showTales, setShowTales] = useState(false);
  const [showJokes, setShowJokes] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexTale, setCurrentIndexTale] = useState(0);
  const navigation = useNavigation();
  const {
    saveJokes,
    getSavedJokes,
    removeJoke,
    isEnableNotification,
    likedImages,
    setLikedImages,
    likedImagesTales,
    setLikedImagesTales,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      getSavedJokes();
    }, []),
  );

  const handleNext = () => {
    if (tales.length - 1 === currentIndexTale) return;
    setCurrentIndexTale(currentIndexTale + 1);
  };

  const handlePrev = () => {
    setCurrentIndexTale(currentIndexTale - 1);
  };

  const handleNextJoke = () => {
    if (jokes.length - 1 === currentIndex) return;
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrevJoke = () => {
    setCurrentIndex(prev => prev - 1);
  };

  const handleGoBack = () => {
    if (showJokes || showTales) setShowJokes(false), setShowTales(false);
    else navigation.goBack();
  };

  useEffect(() => {
    loadLikedImages();
    loadLikedImagesTales();
  }, []);

  const isCurrentLiked = likedImages.includes(jokes[currentIndex].id);

  const isCurrentLikedTale = likedImagesTales.includes(
    tales[currentIndexTale].id,
  );

  const loadLikedImages = async () => {
    const stored = await AsyncStorage.getItem('liked');
    if (stored) {
      setLikedImages(JSON.parse(stored));
    }
  };

  const loadLikedImagesTales = async () => {
    const stored = await AsyncStorage.getItem('likedTales');
    if (stored) {
      setLikedImagesTales(JSON.parse(stored));
    }
  };

  const saveLikedImagesTale = async data => {
    await AsyncStorage.setItem('likedTales', JSON.stringify(data));
  };

  const saveLikedImages = async data => {
    await AsyncStorage.setItem('liked', JSON.stringify(data));
  };

  const toggleLike = () => {
    const currentId = jokes[currentIndex].id;
    const isLiked = likedImages.includes(currentId);

    const updatedLikes = isLiked
      ? likedImages.filter(id => id !== currentId)
      : [...likedImages, currentId];

    setLikedImages(updatedLikes);
    saveLikedImages(updatedLikes);

    if (isCurrentLiked) {
      removeJoke(jokes[currentIndex]);
      if (isEnableNotification)
        Toast.show({
          text1: `Removed from favorites!`,
        });
    } else {
      saveJokes(jokes[currentIndex]);
      if (isEnableNotification)
        Toast.show({
          text1: `Joke added to favorites!`,
        });
    }
  };

  const toggleLikeTale = () => {
    const currentId = tales[currentIndexTale].id;
    const isLiked = likedImagesTales.includes(currentId);

    const updatedLikes = isLiked
      ? likedImagesTales.filter(id => id !== currentId)
      : [...likedImagesTales, currentId];

    setLikedImagesTales(updatedLikes);
    saveLikedImagesTale(updatedLikes);

    if (isCurrentLikedTale) {
      removeJoke(tales[currentIndexTale]);
      if (isEnableNotification)
        Toast.show({
          text1: `Removed from favorites!`,
        });
    } else {
      saveJokes(tales[currentIndexTale]);
      if (isEnableNotification)
        Toast.show({
          text1: `Admiral's tale added to favorites!`,
        });
    }
  };

  const handleShareTale = async (title, tale) => {
    try {
      await Share.share({
        message: `${title}
 ${tale}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleShareJoke = async title => {
    try {
      await Share.share({
        message: `${title}
`,
      });
    } catch (error) {
      alert(error.message);
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
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logoImg}
              />
              <TouchableOpacity
                style={styles.backButton}
                activeOpacity={0.7}
                onPress={handleGoBack}
              >
                <Image source={require('../assets/icons/back.png')} />
              </TouchableOpacity>
            </View>

            <View>
              <LinearGradient
                colors={['#051632', '#0F4398']}
                style={[
                  styles.gradientContainer,
                  !showJokes && !showTales && { minHeight: 550 },
                ]}
              >
                {showTales ? (
                  <View style={[styles.contentWrap]}>
                    <View style={{ alignItems: 'center' }}>
                      <View style={styles.selectButtonContainer}>
                        <Text style={styles.btnText}>Admiral`s Tales</Text>
                      </View>

                      <View style={styles.taleContainer}>
                        <View style={{ height: 185 }}>
                          <Text style={styles.taleTitle}>
                            {tales[currentIndexTale].title}
                          </Text>
                          <Text style={styles.taleText}>
                            {tales[currentIndexTale].tale}
                          </Text>
                        </View>

                        <View style={styles.containerButtonsWrap}>
                          <PulsingButton
                            onPress={() =>
                              toggleLikeTale(tales[currentIndexTale])
                            }
                            style={styles.addToFavBtn}
                            activeOpacity={0.7}
                          >
                            {isCurrentLikedTale ? (
                              <Image
                                source={require('../assets/icons/liked.png')}
                              />
                            ) : (
                              <Image
                                source={require('../assets/icons/like.png')}
                              />
                            )}
                          </PulsingButton>
                          <SmallButton
                            onPress={() =>
                              handleShareTale(
                                tales[currentIndexTale].title,
                                tales[currentIndexTale].tale,
                              )
                            }
                            title={'Drop a friend'}
                            type={'Share'}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.buttonsWrapper}>
                      {currentIndexTale !== 0 && (
                        <View style={styles.nextBtnWrap}>
                          <TouchableOpacity
                            style={styles.nextButton}
                            activeOpacity={0.7}
                            onPress={() => handlePrev()}
                          >
                            <Image
                              source={require('../assets/icons/back.png')}
                            />
                          </TouchableOpacity>
                          <Text style={styles.nextBtnText}>Previous</Text>
                        </View>
                      )}

                      <View style={styles.nextBtnWrap}>
                        <TouchableOpacity
                          style={styles.nextButton}
                          activeOpacity={0.7}
                          onPress={() => handleNext()}
                        >
                          <Image source={require('../assets/icons/next.png')} />
                        </TouchableOpacity>
                        <Text style={styles.nextBtnText}>Next</Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={styles.contentWrap}>
                    {showJokes ? (
                      <View style={{ alignItems: 'center' }}>
                        <View style={styles.selectButtonContainer}>
                          <Text style={styles.btnText}>Jokes</Text>
                        </View>
                        <View
                          style={[styles.taleContainer, { minHeight: 290 }]}
                        >
                          <Text style={[styles.taleText, { marginLeft: 115 }]}>
                            {jokes[currentIndex].text}
                          </Text>

                          <Image
                            source={require('../assets/images/nicknameAdmiral.png')}
                            style={styles.admiralImg}
                          />
                        </View>

                        <View style={styles.containerButtonsWrap}>
                          <PulsingButton
                            style={styles.addToFavBtn}
                            activeOpacity={0.7}
                            onPress={() => toggleLike()}
                          >
                            {isCurrentLiked ? (
                              <Image
                                source={require('../assets/icons/liked.png')}
                              />
                            ) : (
                              <Image
                                source={require('../assets/icons/like.png')}
                              />
                            )}
                          </PulsingButton>
                          <SmallButton
                            onPress={() =>
                              handleShareJoke(jokes[currentIndex].text)
                            }
                            title={'Drop a friend'}
                            type={'Share'}
                          />
                        </View>
                      </View>
                    ) : (
                      <View>
                        <Text style={styles.menuTitle}>Select jokes:</Text>
                        <View style={styles.buttonsWrap}>
                          <PulsingButton
                            style={styles.selectButtonContainer}
                            onPress={() => setShowTales(true)}
                          >
                            <Text style={styles.btnText}>Admiral`s Tales</Text>
                          </PulsingButton>
                          <PulsingButton
                            style={styles.selectButtonContainer}
                            onPress={() => setShowJokes(true)}
                          >
                            <Text style={styles.btnText}>Jokes</Text>
                          </PulsingButton>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </LinearGradient>
              {showTales && (
                <Image
                  source={require('../assets/images/jokeAdmiral.png')}
                  style={styles.admiralImg}
                />
              )}
              {showJokes && (
                <View style={{ alignItems: 'center' }}>
                  <View
                    style={[
                      styles.buttonsWrapper,
                      {
                        position: 'absolute',
                        bottom: -30,
                      },
                    ]}
                  >
                    {currentIndex !== 0 && (
                      <TouchableOpacity
                        style={styles.nextButton}
                        activeOpacity={0.7}
                        onPress={() => handlePrevJoke()}
                      >
                        <Image source={require('../assets/icons/back.png')} />
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      style={styles.nextButton}
                      activeOpacity={0.7}
                      onPress={() => handleNextJoke()}
                    >
                      <Image source={require('../assets/icons/next.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </AnimatedView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.054, padding: 16, paddingBottom: 50 },
  header: {
    alignItems: 'center',
    paddingHorizontal: 31,
    justifyContent: 'center',
  },
  backButton: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: width * 0.031,
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
  admiralImg: { width: 162, height: 243, position: 'absolute', bottom: 0 },
  logoImg: { width: 150, height: 150 },

  gradientContainer: {
    width: '100%',
    borderRadius: 24,
    marginTop: 23,
  },
  selectButtonContainer: {
    paddingHorizontal: 19,
    height: 47,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F4398',
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 13,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F4398',
  },
  contentWrap: {
    paddingHorizontal: 22,
    paddingVertical: 24,
    paddingBottom: 60,
  },
  buttonsWrap: {
    flexDirection: 'row',
    gap: 20,
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
    marginTop: 21,
    justifyContent: 'flex-end',
  },
  nextButton: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    gap: 23,
    justifyContent: 'flex-end',
    marginTop: 43,
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
  nextBtnWrap: {
    alignItems: 'center',
    gap: 9,
  },
  nextBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Jokes;
