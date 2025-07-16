import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [likedImages, setLikedImages] = useState([]);
  const [likedImagesTales, setLikedImagesTales] = useState([]);
  const [likedImagesDaily, setLikedImagesDaily] = useState([]);
  const [isEnableNotification, setIsEnableNotification] = useState(false);

  const saveJokes = async item => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      let parced = jsonValue !== null ? JSON.parse(jsonValue) : [];

      const jokes = [...parced, item];

      await AsyncStorage.setItem('favorites', JSON.stringify(jokes));

      console.log('savedTales', jokes);
      console.log('savedTales');
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getSavedJokes = async () => {
    try {
      const savedData = await AsyncStorage.getItem('favorites');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setFavorites(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeJoke = async selectedJoke => {
    const jsonValue = await AsyncStorage.getItem('favorites');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedJoke.id);

    setFavorites(filtered);
    await AsyncStorage.setItem('favorites', JSON.stringify(filtered));
  };

  const value = {
    removeJoke,
    getSavedJokes,
    saveJokes,
    favorites,
    setFavorites,
    likedImages,
    setLikedImages,
    likedImagesTales,
    setLikedImagesTales,
    isEnableNotification,
    setIsEnableNotification,
    likedImagesDaily,
    setLikedImagesDaily,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
