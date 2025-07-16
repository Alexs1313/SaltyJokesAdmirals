import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Onboard from '../screens/Onboard';
import Settings from '../screens/Settings';
import Info from '../screens/Info';
import Nicknames from '../screens/Nicknames';
import Jokes from '../screens/Jokes';
import Favorites from '../screens/Favorites';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Nicknames" component={Nicknames} />
      <Stack.Screen name="Jokes" component={Jokes} />
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
