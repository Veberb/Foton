import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import ProductScreen from '../screens/ProductScreen';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
const ProductNavigator = createStackNavigator(
  {
    Product: {
      screen: ProductScreen,
      path: 'product/:id',
      navigationOptions: () => ({
        title: `Product`,
      }),
    },
  },
  config
);

export default ProductNavigator;
