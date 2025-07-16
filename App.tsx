import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/nav/StackNavigation';
import { ContextProvider } from './src/store/context';
import WebView from 'react-native-webview';
import Toast from 'react-native-toast-message';

import { useEffect, useState } from 'react';
import { loaderHTML } from './src/components/loader';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <ContextProvider>
        {loader ? (
          <StackNavigation />
        ) : (
          <WebView originWhitelist={['*']} source={{ html: loaderHTML }} />
        )}
        <Toast position="top" topOffset={50} />
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
