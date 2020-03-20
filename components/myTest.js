import React from 'react';
import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native';

class MyTest extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>sss</Text>
        <Image style={styles.logo} source={require('./EPL-logo.png')} />
        <ImageBackground
          source={require('./EPL-logo.png')}
          style={[{width: '50%', height: '50%'}, styles.container]}>
          <Text>背景图组件ImageBackground</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  text: {
    width: 100,
    height: 100,
    backgroundColor: 'pink',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default MyTest;
