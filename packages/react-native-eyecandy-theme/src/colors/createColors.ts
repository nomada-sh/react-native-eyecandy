import { CreateThemeColors } from './types';
import { createPalette } from '../palette';
import { createTypography } from '../typography';

import getButtonColors from './getButtonColors';
import getTextColors from './getTextColors';
import getInputColors from './getInputColors';
import getSwitchColors from './getSwitchColors';
import getBackgroundColors from './getBackgroundColors';
import getDividerColors from './getDividerColors';

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
  };
};

export default createColors;
