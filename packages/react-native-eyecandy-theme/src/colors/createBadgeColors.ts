import mergeColors from './mergeColors';
import { GetThemeColors } from './types';

import { ThemeBadgeColors } from '.';

const createBadgeColors: GetThemeColors<ThemeBadgeColors> = options => {
  const { dark, palette } = options;

  const border = dark ? palette.grey[900] : 'white';

  const defaultColors: ThemeBadgeColors = {
    default: {
      border,
      background: dark ? 'white' : palette.grey[900],
    },
    primary: {
      border,
      background: palette.primary[500],
    },
    danger: {
      border,
      background: palette.error[200],
    },
    error: {
      border,
      background: palette.error[200],
    },
    warning: {
      border,
      background: palette.warning[200],
    },
    success: {
      border,
      background: palette.success[200],
    },
    greyout: {
      border,
      background: palette.grey[dark ? 400 : 500],
    },
  };

  return mergeColors({
    ...options,
    defaultColors,
  });
};

export default createBadgeColors;
