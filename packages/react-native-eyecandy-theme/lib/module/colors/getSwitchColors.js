import mergeColors from './mergeColors';

const getSwitchColors = options => {
  const {
    dark,
    palette
  } = options;
  const defaultColors = {
    default: {
      thumbColor: palette.grey[100],
      trackColor: palette.grey[dark ? 800 : 200],
      trackColorEnabled: palette.primary[500]
    }
  };
  return mergeColors({ ...options,
    defaultColors: defaultColors
  });
};

export default getSwitchColors;
//# sourceMappingURL=getSwitchColors.js.map