import React, { useMemo } from 'react';
import Svg, { SvgProps } from 'react-native-svg';

import { useTheme } from '../hooks';
import type { TextColors } from '../theme';

export interface IconProps extends Omit<SvgProps, 'color'> {
  size?: number;
  color?: TextColors;
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
  const { components } = useTheme();

  const stroke = useMemo(
    () => strokeProp || components.text[color].normal,
    [strokeProp, components.text, color],
  );

  const fill = useMemo(
    () => fillProp || (filled ? stroke : undefined),
    [fillProp, filled, stroke],
  );

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
