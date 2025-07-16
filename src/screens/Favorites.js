import { useCallback } from 'react';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useStore } from '../store/context';
import JokeCard from '../components/JokeCard';
import TaleCard from '../components/TaleCard';
import AnimatedView from '../components/animate/AnimatedView';

const { height } = Dimensions.get('window');

const Favorites = () => {
  const navigation = useNavigation();
  const { getSavedJokes, favorites } = useStore();

  useFocusEffect(
    useCallback(() => {
      getSavedJokes();
    }, []),
  );

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
                <Text style={styles.title}>Favorites</Text>
                <Image source={require('../assets/icons/nicknames.png')} />
              </View>
            </View>

            <View>
              {favorites.length === 0 && (
                <Text style={styles.emptyScreenText}>
                  Haven't you enjoyed the jokes yet?
                </Text>
              )}

              {favorites.map(item => (
                <View key={item.id}>
                  {item.type === 'Jokes' ? (
                    <JokeCard item={item} />
                  ) : (
                    <TaleCard item={item} />
                  )}
                </View>
              ))}
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
  btnText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F4398',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F4398',
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
  emptyScreenText: {
    fontWeight: 'regular',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    paddingTop: height * 0.26,
    paddingBottom: 40,
  },
});

export default Favorites;
