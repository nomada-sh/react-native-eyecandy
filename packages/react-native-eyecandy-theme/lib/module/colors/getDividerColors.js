import mergeColors from './mergeColors';

const getDividerColors = options => {
  const {
    dark,
    palette
  } = options;
  const defaultColors = {
    default: palette.grey[dark ? 800 : 200]
  };
  return mergeColors({ ...options,
    defaultColors: defaultColors
  });
};

export default getDividerColors;
//# sourceMappingURL=getDividerColors.js.map