import { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';

import SmallButton from '../components/SmallButton';
import { nicknamesLoader } from '../components/nicknamesLoader';
import { nicknames } from '../data/nicknames';
import AnimatedView from '../components/animate/AnimatedView';
import PulsingButton from '../components/PulsButton';

const { height } = Dimensions.get('window');

const Nicknames = () => {
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNickname, setShowNickname] = useState(false);
  const navigation = useNavigation();

  const randomIdx = Math.floor(Math.random() * 50);

  const handleShare = async randomNickname => {
    try {
      await Share.share({
        message: `Nickname for ${nickname}: ${randomNickname}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleShowNickname = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowNickname(true);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      {isLoading ? (
        <WebView originWhitelist={['*']} source={{ html: nicknamesLoader }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <AnimatedView>
            {showNickname ? (
              <View style={[styles.container, { paddingTop: height * 0.228 }]}>
                <Text style={styles.selectedName}>Nickname for {nickname}</Text>
                <View>
                  <LinearGradient
                    colors={['#051632', '#0F4398']}
                    style={styles.gradientContainer}
                  >
                    <View
                      style={[
                        styles.contentWrap,
                        {
                          height: 240,
                          justifyContent: 'center',
                        },
                      ]}
                    >
                      <View>
                        <Text style={styles.randomNameText}>
                          {nicknames[randomIdx]}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                  <Image
                    source={require('../assets/images/nicknameAdmiral.png')}
                    style={styles.admiralImg}
                  />
                </View>
                <View style={styles.buttonsWrap}>
                  <SmallButton
                    title={'Drop a friend'}
                    type={'Share'}
                    onPress={() => handleShare(nicknames[randomIdx])}
                  />
                  <SmallButton
                    title={'Try again'}
                    type={'Retry'}
                    onPress={handleShowNickname}
                  />

                  <PulsingButton
                    activeOpacity={0.7}
                    style={styles.homeBtn}
                    onPress={() => navigation.goBack()}
                  >
                    <Image source={require('../assets/icons/home.png')} />
                  </PulsingButton>
                </View>
              </View>
            ) : (
              <View style={styles.container}>
                <View style={styles.header}>
                  <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}
                  >
                    <Image source={require('../assets/icons/back.png')} />
                  </TouchableOpacity>

                  <View style={styles.titleContainer} activeOpacity={0.7}>
                    <Text style={styles.title}>Nicknames</Text>
                    <Image source={require('../assets/icons/nicknames.png')} />
                  </View>
                </View>

                <View>
                  <LinearGradient
                    colors={['#051632', '#0F4398']}
                    style={styles.gradientContainer}
                  >
                    <View style={[styles.contentWrap]}>
                      <Text style={styles.menuTitle}>
                        Enter the sailor's name
                      </Text>
                      <TextInput
                        value={nickname}
                        style={[styles.input, nickname && { fontSize: 24 }]}
                        placeholder="Type here"
                        placeholderTextColor={'rgba(255, 255, 255, 0.56)'}
                        textAlign="center"
                        onChangeText={setNickname}
                      />
                      <PulsingButton
                        disabled={!nickname}
                        onPress={handleShowNickname}
                        activeOpacity={0.7}
                        style={styles.startBtn}
                      >
                        <Text style={styles.btnText}>Name for a sardine</Text>
                        <Image source={require('../assets/icons/start.png')} />
                      </PulsingButton>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            )}
          </AnimatedView>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.098, padding: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 31,
  },
  backButton: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F4398',
  },
  randomNameText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 154,
  },
  homeBtn: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  selectedName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  startBtn: {
    width: 222,
    height: 65,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 33,

    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  admiralImg: { width: 162, height: 243, position: 'absolute', bottom: 0 },
  logoImg: { width: 150, height: 150, marginLeft: 165 },
  titleContainer: {
    width: 202,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 9,
  },
  gradientContainer: {
    width: '100%',
    borderRadius: 24,
    marginTop: 23,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F4398',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  jokeText: {
    fontWeight: 'regular',
    fontSize: 15,
    color: '#fff',
    marginBottom: 5,
  },
  contentWrap: {
    paddingHorizontal: 22,
    paddingVertical: 35,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 74,
    backgroundColor: '#001435',
    borderRadius: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonsWrap: {
    alignItems: 'center',
    gap: 9,
    marginVertical: 17,
  },
});

export default Nicknames;
