import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HomeNavigator from './HomeNavigator';
import RegisterNavigator from './RegisterNavigator';
import ProductListNavigator from './ProductListNavigator';

export default createAppContainer(
  createSwitchNavigator({
    Home: HomeNavigator,
    Register: RegisterNavigator,
    ProductList: ProductListNavigator,
  })
);
