import React from 'react';
import {View, Text, Button, StyleSheet, ActionSheetIOS} from 'react-native';

class APIController extends React.Component {
  constructor(props) {
    super(props);
  }
  _showActionSheetWithOptions = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['取消', '删除'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          console.log(buttonIndex);
        }
      },
    );
  };
  render() {
    return (
      <View>
        <Text style={styles.text}>APIController</Text>
        <View style={[styles.container, styles.horizontal]}>
          <Button
            title="showActionSheetWithOptions"
            onPress={this._showActionSheetWithOptions.bind(this)}
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

export default APIController;
