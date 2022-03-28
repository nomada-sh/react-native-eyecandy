import { createPalette } from '../palette';
import { createTypography } from '../typography';

import getBackgroundColors from './getBackgroundColors';
import getBadgeColors from './getBadgeColors';
import getButtonColors from './getButtonColors';
import getDividerColors from './getDividerColors';
import getInputColors from './getInputColors';
import getSwitchColors from './getSwitchColors';
import getTextColors from './getTextColors';
import { CreateThemeColors } from './types';

const createColors: CreateThemeColors = (options = {}) => {
  const variables = {
    dark: Boolean(options.dark),
    palette: createPalette(options.palette),
    typography: createTypography(options.typography),
  };

  const partialColors =
    options.colors instanceof Function
      ? options.colors(variables)
      : options.colors || {};

  return {
    button: getButtonColors({
      ...variables,
      colors: partialColors.button,
    }),
    text: getTextColors({
      ...variables,
      colors: partialColors.text,
    }),
    input: getInputColors({
      ...variables,
      colors: partialColors.input,
    }),
    switch: getSwitchColors({
      ...variables,
      colors: partialColors.switch,
    }),
    background: getBackgroundColors({
      ...variables,
      colors: partialColors.background,
    }),
    divider: getDividerColors({
      ...variables,
      colors: partialColors.divider,
    }),
    badge: getBadgeColors({
      ...variables,
      colors: partialColors.badge,
    }),
  };
};

export default createColors;
