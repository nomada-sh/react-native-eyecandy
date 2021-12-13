import React from 'react';
import Svg, { SvgProps } from 'react-native-svg';

import { useTheme } from '../hooks';
import type { TextColors } from '../theme';

export interface IconProps extends Omit<SvgProps, 'color'> {
  size?: number;
  color?: TextColors;
}

export default function Icon({
  size = 24,
  stroke: strokeProp,
  color = 'default',
  ...props
}: IconProps) {
  const { components } = useTheme();
  const colors = components.text[color];
  const stroke = strokeProp || colors.normal;

  return (
    <Svg
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={stroke}
      {...props}
    />
  );
}
