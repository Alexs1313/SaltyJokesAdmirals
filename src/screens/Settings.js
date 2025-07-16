import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import AnimatedView from '../components/animate/AnimatedView';
import { useStore } from '../store/context';

const { height } = Dimensions.get('window');

const Settings = () => {
  const { isEnableNotification, setIsEnableNotification } = useStore();
  const navigation = useNavigation();

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
                <Text style={styles.title}>Settings</Text>
                <Image source={require('../assets/icons/settings.png')} />
              </View>
            </View>
            <View>
              <LinearGradient
                colors={['#051632', '#0F4398']}
                style={styles.gradientContainer}
              >
                <View style={styles.contentWrap}>
                  <View>
                    <Text style={styles.menuTitle}>Push notifications</Text>
                    <Text style={styles.jokeText}>Joke of the day</Text>
                  </View>
                  <View style={styles.buttonsWrap}>
                    <View style={styles.radioBtnsWrap}>
                      <TouchableOpacity
                        style={styles.notificationRadioBtn}
                        onPress={() => setIsEnableNotification(false)}
                      >
                        {!isEnableNotification && (
                          <Image
                            source={require('../assets/icons/selected.png')}
                          />
                        )}
                      </TouchableOpacity>
                      <Text style={styles.radioBtnText}>Off</Text>
                    </View>

                    <View style={styles.radioBtnsWrap}>
                      <TouchableOpacity
                        style={styles.notificationRadioBtn}
                        onPress={() => setIsEnableNotification(true)}
                      >
                        {isEnableNotification && (
                          <Image
                            source={require('../assets/icons/selected.png')}
                          />
                        )}
                      </TouchableOpacity>
                      <Text style={styles.radioBtnText}>On</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
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
    textAlign: 'center',
    marginBottom: 10,
  },
  jokeText: {
    fontWeight: 'regular',
    fontSize: 15,
    color: '#fff',
    marginBottom: 5,
  },
  radioBtnText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
  notificationRadioBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioBtnsWrap: { alignItems: 'center', gap: 5 },
  buttonsWrap: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 13,
  },
  contentWrap: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Settings;
