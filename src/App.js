import React from 'react';
import {Provider} from 'mobx-react';
import 'react-native-program-stylesheet';

import {createRootNavigator} from './routes/router';
import {store} from './store';

export default class App extends React.Component {
  render() {
    const AppContainer = createRootNavigator();

    return (
      <Provider store={store}>
        <AppContainer>
          onNavigationStateChange=
          {this.handleNavigationStateChange.bind(this)}
        </AppContainer>
      </Provider>
    );
  }

  handleNavigationStateChange(prevState, currentState, action) {
    console.log(
      'handleNavigationStateChange:',
      prevState,
      currentState,
      action,
    );
  }
}
