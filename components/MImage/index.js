import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

/**
 * Image https://reactnative.cn/docs/image/
 */
class MImage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text style={styles.text}>MImage</Text>
        {/* 三种方式引用图片 */}
        <View style={[styles.container, styles.horizontal]}>
          <Image
            style={{width: 60, height: 60}}
            source={require('../../components/EPL-logo.png')}
          />
          <Image
            style={{width: 50, height: 50}}
            source={{
              uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
            }}
          />
          <Image
            style={{width: 66, height: 58}}
            source={{
              uri:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  text: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
  },
});

export default MImage;
