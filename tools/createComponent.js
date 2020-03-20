const promptSync = require('prompt-sync');
const fs = require('fs');
const styleTpl = require('./tpl/tplStyle');

const componentsPath = './components';
const promptInput = promptSync();
let name = promptInput(`Input new component name:`);
name = name.trim();
if (!name) {
  console.log('[Create error]:Please input component name');
  return;
}
if (isExist(name)) {
  console.log(`[Create error]:'${name}' this component is exist`);
  return;
}
name = toCalm(name);
const myPath = `${componentsPath}/${name}/`;

let styleIndividual =
  promptInput('Want to create a individual style file? y or n(default): ') ===
  'y';

let tpl = `import React from 'react';
import {View, Text${styleIndividual ? '' : ', StyleSheet'}} from 'react-native';

class ${name} extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text style={styles.text}>${name}</Text>
        <View style={[styles.container, styles.horizontal]}>
        </View>
      </View>
    );
  }
}
${
  styleIndividual
    ? ''
    : `\nconst styles = StyleSheet.create({
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
`
}
export default ${name};
`;
fs.mkdir(myPath, err => {
  fs.writeFileSync(`${myPath}index.js`, tpl);
  console.log(
    `[Create component ${name} success]: path: component/${name}/index.js`,
  );
  if (styleIndividual) {
    fs.writeFileSync(`${myPath}style.js`, styleTpl);
    console.log(
      `[Create component ${name} success]: path: component/${name}/style.js`,
    );
  }
});

function isExist(dirName) {
  fs.existsSync(`${componentsPath}/${dirName}`, exists => {
    return exists;
  });
}

function toCalm(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}
