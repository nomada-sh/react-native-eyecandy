const path = require('path');
const pak = require('../package.json');

const presets = [];
const plugins = [];

presets.push([
  'module:metro-react-native-babel-preset',
  {
    useTransformReactJSXExperimental: true,
  },
]);

plugins.push([
  'module-resolver',
  {
    root: ['.'],
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      [pak.name]: path.join(__dirname, '..', pak.source),
      '~': path.join(__dirname, '..', pak.source),
    },
  },
]);

plugins.push('react-native-reanimated/plugin');

plugins.push([
  '@babel/plugin-transform-react-jsx',
  {
    runtime: 'automatic',
  },
]);

plugins.push('@babel/plugin-proposal-export-namespace-from');

module.exports = {
  presets,
  plugins,
};
