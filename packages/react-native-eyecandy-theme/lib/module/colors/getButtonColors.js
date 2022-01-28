import mergeColors from './mergeColors';

const getButtonColors = options => {
  const {
    dark,
    palette
  } = options;
  const defaultColors = {
    default: {
      background: palette.grey[dark ? 800 : 100],
      foreground: palette.grey[dark ? 100 : 800]
    },
    primary: {
      background: palette.primary['500'],
      foreground: palette.primary['100']
    }
  };
  return mergeColors({ ...options,
    defaultColors: defaultColors
  });
};

export default getButtonColors;
//# sourceMappingURL=getButtonColors.js.map