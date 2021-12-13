const presets = [];
const plugins = [];

presets.push('module:metro-react-native-babel-preset');

plugins.push([
  'module-resolver',
  {
    root: ['.'],
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
]);

module.exports = {
  presets,
  plugins,
};
