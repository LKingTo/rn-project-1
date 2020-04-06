import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Screen from '../Screen';

export default class MineScreen extends Screen {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Mine Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  buttonTabsBox: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E1E1',
  },
  contentBox: {
    width: '100%',
    flex: 1,
  },
});
