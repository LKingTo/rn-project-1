/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
// import MyTest from './components/myTest.js';
// import MActivityIndicator from './components/MActivityIndicator';
import MButton from './components/MButton';
import MFlatList from './components/MFlatList';
import MImage from './components/MImage';
import MModal from './components/MModal';
import APIController from './components/APIController';

const App: () => React$Node = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        {/*<MActivityIndicator />*/}
        <MButton />
        <MFlatList />
        <MImage />
        <MModal />
        <APIController />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
  },
});

export default App;
