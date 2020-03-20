import React from 'react';
import {View, Text, DatePickerIOS, StyleSheet} from 'react-native';

class MDatePickerIOS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chosenDate: new Date()};
    this.setDate = this.setDate.bind(this);
  }

  setDate(newState) {
    this.setState({chosenDate: newState});
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>MDatePickerIOS</Text>
        <View style={[styles.container, styles.horizontal]}>
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate}
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

export default MDatePickerIOS;
