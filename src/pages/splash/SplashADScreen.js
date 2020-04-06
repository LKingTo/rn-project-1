import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Screen from '../Screen';
// import * as sessionService from '../../services/session/sessionService';
// import * as systemService from '../../services/system/systemService';

export default class SplashADScreen extends Screen {
  constructor(props) {
    super(props);
    this.bootstrap();
  }

  async bootstrap() {
    // let isPass = await this.doAndWait(async () => {
    //   const [isPass] = await Promise.all([
    //     sessionService.checkAuth(),
    //     systemService.getAppVersion(),
    //   ]);
    //   SplashScreen.hide(); // 隐藏开屏页
    //   return isPass;
    // }, 100);
    // if (isPass) {
    //   this.navigate(this.constructor.routeConfigs.AppStack);
    // } else {
    //   this.navigate(this.constructor.routeConfigs.AuthStack);
    // }

    setTimeout(() => {
      // SplashScreen.hide(); // 隐藏开屏页 todo SplashScreen is undefined
      this.navigate(this.constructor.routeConfigs.AppStack);
    }, 3000);
  }

  async doAndWait(promiseFunction, totalWait) {
    let startTime = new Date().getTime();
    let result = await promiseFunction();
    let timeElapse = new Date().getTime() - startTime;
    let timeToWait = totalWait - timeElapse;
    if (timeToWait > 0) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(result);
        }, timeToWait);
      });
    } else {
      return result;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Splash Screen</Text>
        <Text>启动页面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
