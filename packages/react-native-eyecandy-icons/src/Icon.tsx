import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import {
  useColors,
  ThemeTextColorsChoices,
} from '@nomada-sh/react-native-eyecandy-theme';
import Svg from 'react-native-svg';

export interface IconProps {
  size?: number;
  color?: ThemeTextColorsChoices;
  filled?: boolean;
  stroke?: string;
  fill?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
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

  const s = stroke ?? colors[color].normal;
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
