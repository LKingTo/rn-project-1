import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';

/**
 * ActivityIndicator组件：
 * 显示一个圆形的 loading 提示符号。
 * @props
 * animating: 是否要显示指示器动画，默认为 true 表示显示，false 则隐藏。
 * color
 * size: 指示器的大小，默认为'small'。目前只能在 Android 上设定具体的数值。
 * hidesWhenStopped: 在animating为 false 的时候，是否要隐藏指示器（默认为 true）。如果animating和hidesWhenStopped都为 false，则显示一个静止的指示器。
 */
class MActivityIndicator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text style={styles.text}>ActivityIndicator:</Text>
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
          <ActivityIndicator
            animating="false"
            hidesWhenStopped="false"
            size="small"
            color="#00ff00"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
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

export default MActivityIndicator;
