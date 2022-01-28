import mergeColors from './mergeColors';

const getButtonColors = options => {
  const {
    dark,
    palette
  } = options;
  const defaultColors = {
    default: {
      container: dark ? palette.grey[900] : 'white',
      content: dark ? palette.grey[900] : 'white'
    }
  };
  return mergeColors({ ...options,
    defaultColors: defaultColors
  });
};

export default getButtonColors;
//# sourceMappingURL=getBackgroundColors.js.map