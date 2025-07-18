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
import { useNavigation } from '@react-navigation/native';

import SmallButton from '../components/SmallButton';
import AnimatedView from '../components/animate/AnimatedView';

const { height, width } = Dimensions.get('window');

const Info = () => {
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `“Admiral’s Salty Jokes” is your daily storm of humor from 
 Admiral Harcourt: fresh jokes, funny stories, and battle
 nicknames that will keep you smiling all day long!`,
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
              <TouchableOpacity
                style={styles.backButton}
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
              >
                <Image source={require('../assets/icons/back.png')} />
              </TouchableOpacity>

              <View style={styles.titleContainer} activeOpacity={0.7}>
                <Text style={styles.title}>About</Text>
                <Image source={require('../assets/icons/info.png')} />
              </View>
            </View>

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
                    <Image
                      source={require('../assets/images/largeLogo.png')}
                      style={styles.logoImg}
                    />
                  </View>
                </View>
              </LinearGradient>
              <Image
                source={require('../assets/images/jokeAdmiral.png')}
                style={styles.admiralImg}
              />
            </View>

            <View>
              <LinearGradient
                colors={['#051632', '#0F4398']}
                style={styles.gradientContainer}
              >
                <View style={styles.contentWrap}>
                  <View>
                    <Text style={styles.menuTitle}>Information</Text>
                    <Text style={styles.jokeText}>
                      “Admiral’s Salty Jokes” is your daily storm of humor from
                      Admiral Harcourt: fresh jokes, funny stories, and battle
                      nicknames that will keep you smiling all day long!
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
            <View style={{ width: '40%', marginTop: 15 }}>
              <SmallButton
                onPress={handleShare}
                style={{ marginTop: 16 }}
                title={'Drop a friend'}
                type={'Share'}
              />
            </View>
          </View>
        </AnimatedView>
      </ScrollView>
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
  admiralImg: { width: 162, height: 243, position: 'absolute', bottom: 0 },
  logoImg: { width: 150, height: 150, marginLeft: width * 0.4 },
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
    marginBottom: 10,
  },
  jokeText: {
    fontWeight: 'regular',
    fontSize: 15,
    color: '#fff',
    marginBottom: 5,
  },
  contentWrap: {
    paddingHorizontal: 22,
    paddingVertical: 20,
  },
});

export default Info;
