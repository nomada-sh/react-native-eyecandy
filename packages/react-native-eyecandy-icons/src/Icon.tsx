import React from 'react';
import Svg, { SvgProps } from 'react-native-svg';

import {
  useColors,
  ThemeTextColorsChoices,
} from '@nomada-sh/react-native-eyecandy-theme';

export interface IconProps extends Omit<SvgProps, 'color'> {
  size?: number;
  color?: ThemeTextColorsChoices;
  filled?: boolean;
}

export default function Icon({
  size = 24,
  stroke: strokeProp,
  fill: fillProp,
  color = 'default',
  filled,
  ...props
}: IconProps) {
  const colors = useColors(c => c.text);

  const stroke = strokeProp || colors[color].normal;
  const fill = fillProp || (filled ? stroke : undefined);

  return (
    <Svg
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={stroke}
      color={fill}
      {...props}
    />
  );
}
