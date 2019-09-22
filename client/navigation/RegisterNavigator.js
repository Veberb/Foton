import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RegisterScreen from '../screens/RegisterScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const RegisterNavigator = createStackNavigator(
  {
    Register: RegisterScreen,
  },
  config
);

RegisterNavigator.navigationOptions = {
  tabBarLabel: 'Register',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

RegisterNavigator.path = '';

export default RegisterNavigator;
