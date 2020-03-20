const tpl = `import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
`;

module.exports = tpl;
