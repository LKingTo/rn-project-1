/**
 * @format
 */
import {AppRegistry} from 'react-native';
// import App from './App';
// import App from './App1';
import App from './components/MNavigation/MNavigation';
// import App from './components/MNestingNavigators/MNestingNavigators';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
