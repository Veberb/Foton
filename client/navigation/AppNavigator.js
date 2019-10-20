import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigator from '../navigation/AuthNavigator';
import ProtectedNavigator from '../navigation/ProtectedNavigator';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthNavigator,
      ProtectedNavigator,
    },
    { initialRouteName: 'AuthNavigator' }
  )
);
