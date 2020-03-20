import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

class MButton extends React.Component {
  constructor(props) {
    super(props);
  }
  onPressLearnMore(e) {
    console.log('onPressLearnMore', e);
  }
  render() {
    return (
      <View>
        <Text style={styles.text}>MButton</Text>
        <View style={[styles.container, styles.horizontal]}>
          <Button
            onPress={this.onPressLearnMore.bind(this)}
            title="Button"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={this.onPressLearnMore.bind(this)}
            disabled
            title="Disabled"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
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

export default MButton;
