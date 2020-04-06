/**
 * React Navigation组件
 * https://reactnavigation.org/docs/getting-started
 * Nesting Navigators 路由嵌套、底部Tab组件
 * 结构:
 * Stack.Navigator
 *  Home (Tab.Navigator)
 *    Feed (Screen)
 *    Messages (Screen)
 *  Profile (Screen)
 *  Settings (Screen)
 */
import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function Feed({route, navigation}) {
  return <Text>Feed Screen</Text>;
}
function Messages({route, navigation}) {
  return <Text>Messages Screen</Text>;
}

function HomeScreen({route, navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}

function ProfileScreen({route, navigation}) {
  return <Text>Profile Screen</Text>;
}

function SettingsScreen({route, navigation}) {
  return <Text>Settings Screen</Text>;
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
