import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import ProductScreen from '../screens/ProductScreen';
import ProductListScreen from '../screens/ProductListScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: { initialRouteName: 'ProductList' },
});

const ProtectedNavigator = createStackNavigator(
  {
    Product: {
      screen: ProductScreen,
      navigationOptions: () => ({
        title: `Product`,
      }),
    },
    ProductList: {
      screen: ProductListScreen,
      navigationOptions: () => ({
        title: `Product List`,
      }),
    },
  },
  config
);

export default ProtectedNavigator;
