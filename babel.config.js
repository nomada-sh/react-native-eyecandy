const presets = [];
const plugins = [];

presets.push('module:metro-react-native-babel-preset');

plugins.push([
  'babel-plugin-module-resolver',
  {
    root: ['.'],
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
]);

plugins.push('@babel/plugin-proposal-export-namespace-from');

module.exports = {
  presets,
  plugins,
};
