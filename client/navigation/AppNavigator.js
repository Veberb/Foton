import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HomeNavigator from './HomeNavigator';
import RegisterNavigator from './RegisterNavigator';

export default createAppContainer(
  createSwitchNavigator({
    Home: HomeNavigator,
    Register: RegisterNavigator,
  })
);
