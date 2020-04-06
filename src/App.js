import React from 'react';
import {Provider} from 'mobx-react';
import 'react-native-program-stylesheet';
import {View, Text} from 'react-native';
import {store} from './store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Text>app</Text>
          <Text>{JSON.stringify(store)}</Text>
        </View>
      </Provider>
    );
  }
}
