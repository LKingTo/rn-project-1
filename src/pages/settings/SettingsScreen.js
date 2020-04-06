import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Screen from '../Screen';

export default class SettingsScreen extends Screen {
  static navigationOptions = {
    title: '设置',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  settingItem: {
    flex: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e1e1e1',
  },
  settingLabel: {
    flex: 2,
    flexDirection: 'row',
  },
  settingText: {
    color: '#666',
    fontSize: 16,
    lineHeight: 26,
  },
  settingValue: {
    flex: 2,
  },
  settingArrow: {
    justifyContent: 'flex-end',
  },
  rightArrow: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 20,
  },
  rightArrowText: {
    color: '#e1e1e1',
    fontSize: 26,
    paddingLeft: 4,
    paddingRight: 2,
    lineHeight: 30,
    textAlign: 'right',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
