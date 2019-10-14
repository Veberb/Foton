import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HomeNavigator from './HomeNavigator';
import RegisterNavigator from './RegisterNavigator';
import ProductListNavigator from './ProductListNavigator';
import ProductNavigator from './ProductNavigator';

export default createAppContainer(
  createSwitchNavigator({
    Home: HomeNavigator,
    Register: RegisterNavigator,
    ProductList: ProductListNavigator,
    Product: ProductNavigator,
  })
);
