import { createPalette } from '../palette';
import { createTypography } from '../typography';

import createBackgroundColors from './createBackgroundColors';
import createBadgeColors from './createBadgeColors';
import createButtonColors from './createButtonColors';
import createDividerColors from './createDividerColors';
import createInputColors from './createInputColors';
import createSwitchColors from './createSwitchColors';
import createTextColors from './createTextColors';
import { CreateThemeColors } from './types';

const createColors: CreateThemeColors = (options = {}) => {
  const dark = Boolean(options.dark);

  const variables = {
    dark,
    palette: createPalette({
      dark,
      palette: options.palette,
    }),
    typography: createTypography({
      dark,
      typography: options.typography,
    }),
  };

  const partialColors =
    options.colors instanceof Function
      ? options.colors(variables)
      : options.colors || {};

  return {
    button: createButtonColors({
      ...variables,
      colors: partialColors.button,
    }),
    text: createTextColors({
      ...variables,
      colors: partialColors.text,
    }),
    input: createInputColors({
      ...variables,
      colors: partialColors.input,
    }),
    switch: createSwitchColors({
      ...variables,
      colors: partialColors.switch,
    }),
    background: createBackgroundColors({
      ...variables,
      colors: partialColors.background,
    }),
    divider: createDividerColors({
      ...variables,
      colors: partialColors.divider,
    }),
    badge: createBadgeColors({
      ...variables,
      colors: partialColors.badge,
    }),
  };
};

export default createColors;
