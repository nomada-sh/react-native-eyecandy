import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import {
  useColors,
  ThemeTextColorsChoices,
  isThemeTextColorsChoices,
} from '@nomada-sh/react-native-eyecandy-theme';
import Svg from 'react-native-svg';
import { LiteralUnion } from 'type-fest/source/literal-union';

export interface IconProps {
  color?: LiteralUnion<ThemeTextColorsChoices, string>;
  filled?: boolean;
  stroke?: string;
  fill?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  size?: number;
}

export default function Icon({
  size = 24,
  color = 'default',
  stroke,
  fill,
  filled,
  ...props
}: IconProps) {
  const colors = useColors(c => c.text);

  const iconColor: string = isThemeTextColorsChoices(color)
    ? colors[color].normal
    : color;

  const s = stroke ?? iconColor;
  const f = fill ?? (filled ? s : undefined);

  return (
    <Svg
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={s}
      color={f}
      {...props}
    />
  );
}
