import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import {routeConfigs} from './routeConfigs';
import {createAppTabStack} from './appTabStack';
import {navigationOptions} from './navigationOptions';
import SplashADScreen from '../pages/splash/SplashADScreen';
import SettingsScreen from '../pages/settings/SettingsScreen';

export function createRootNavigator() {
  const AppNavigator = createSwitchNavigator(
    {
      [routeConfigs.SplashAD]: SplashADScreen,
      // [routeConfigs.AuthStack]: createStackNavigator({
      //   [routeConfigs.Login]: LoginScreen
      // }),
      [routeConfigs.AppStack]: createStackNavigator(
        {
          [routeConfigs.AppTabStack]: createAppTabStack(),
          [routeConfigs.Settings]: SettingsScreen,
        },
        {defaultNavigationOptions: navigationOptions},
      ),
    },
    {
      initialRouteName: routeConfigs.SplashAD,
    },
  );
  return createAppContainer(AppNavigator);
}
