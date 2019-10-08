import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import ProductListScreen from '../screens/ProductListScreen';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
const ProductListNavigator = createStackNavigator(
  {
    ProductList: ProductListScreen,
  },
  config
);

ProductListNavigator.path = '';

export default ProductListNavigator;
