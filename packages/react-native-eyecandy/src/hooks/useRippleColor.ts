import type Color from 'color';
import {useMemo} from 'react';

import {getRippleColor} from '../utils';

type ColorType = string | Color;

export default function useRippleColor(
  backgroundColor: ColorType,
  lightRippleColor?: ColorType,
  darkRippleColor?: ColorType,
) {
  return useMemo(
    () => getRippleColor(backgroundColor, lightRippleColor, darkRippleColor),
    [backgroundColor, darkRippleColor, lightRippleColor],
  );
}
