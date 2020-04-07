module.exports = api => {
    api.cache(true)

    const env = process.env.BABEL_ENV || process.env.NODE_ENV

    let presets = ['module:metro-react-native-babel-preset']
    let plugins = [['@babel/plugin-proposal-decorators', { legacy: true }]]
    // if (env === 'production') {
    //   plugins = [
    //     ...plugins,
    //     ['transform-remove-console', {exclude: []}],
    //     [
    //       'transform-react-remove-prop-types',
    //       {mode: 'remove', removeImport: true, ignoreFilenames: ['node_modules']},
    //     ],
    //   ];
    // }
    return { presets, plugins }
}
