import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {routeConfigs} from './routeConfigs';
import {bottomTabNavigationOptions} from './navigationOptions';
import HomeScreen from '../pages/home/HomeScreen';
import MineScreen from '../pages/mine/MineScreen';

export function createAppTabStack() {
  const appTabStack = createBottomTabNavigator(
    {
      [routeConfigs.Home]: HomeScreen,
      [routeConfigs.Mine]: MineScreen,
    },
    bottomTabNavigationOptions,
  );
  appTabStack.navigationOptions = {
    header: null,
  };
  return appTabStack;
}
