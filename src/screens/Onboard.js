import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
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
import PulsingButton from '../components/PulsButton';

const { height } = Dimensions.get('window');

const Onboard = () => {
  const [step, setStep] = useState(1);
  const navigation = useNavigation();

  const handleNextStep = () => {
    step === 3 ? navigation.navigate('Home') : setStep(step + 1);
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, minHeight: 750 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {step !== 3 && (
            <Image source={require('../assets/images/logo.png')} />
          )}
        </View>
        <Image
          source={require('../assets/images/blur.png')}
          style={styles.admiralImg}
        />
        {step === 1 ? (
          <Image
            source={require('../assets/images/admiral1.png')}
            style={styles.admiralImg}
          />
        ) : step === 2 ? (
          <Image
            source={require('../assets/images/admiral2.png')}
            style={styles.admiralImg}
          />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/images/largeLogo.png')}
              style={styles.logoImg}
            />
          </View>
        )}
        <View style={{ position: 'absolute', bottom: 0 }}>
          <Image source={require('../assets/images/board.png')} />
          <View style={{ position: 'absolute', left: 70, top: 60 }}>
            <Text style={[styles.welcomeText, step === 1 && { fontSize: 15 }]}>
              {step === 1
                ? `Ahoy, sailor! I am Admiral Harcourt, your guide to the world of salty jokes. There will be no salty tears here - only sea laughter to the horizon! Ready to set sail for the future of humor?`
                : step === 2
                ? `Every morning you will receive a fresh wave of humor straight from the stateroom. No pathos, no embellishments - just honest, profound anecdotes, like the very ripples of the ocean. 
Can you withstand this storm of laughter?`
                : `When you want to gather the crew on board, choose a battle nickname — “Captain’s Leg!”, “Sea Devil!” or “Boatsman’s Toe!” — and send it straight from the hold. Let every shout be the start of a new adventure of laughter!`}
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNextStep}>
            <Text style={styles.buttonText}>
              {step === 1 ? 'Start' : step === 2 ? 'Next' : 'Start'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.07, alignItems: 'center' },
  admiralImg: {
    position: 'absolute',
    bottom: 0,
  },
  welcomeText: {
    color: '#fff',
    width: 282,
    fontSize: 13,
  },
  button: {
    width: 91,
    height: 41,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 59,
    right: 55,
  },
  logoImg: { marginTop: height * 0.09 },
  buttonText: {
    fontWeight: 'bold',
    color: '#0F4398',
    fontSize: 15,
  },
});

export default Onboard;
