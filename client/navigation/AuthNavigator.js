import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: { initialRouteName: 'Home' },
});

const AuthNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Register: RegisterScreen,
  },
  config
);

export default AuthNavigator;
