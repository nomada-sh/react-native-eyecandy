import { StyleProp, ViewStyle } from 'react-native';

import { ThemeTextColorsChoices } from '@nomada-sh/react-native-eyecandy-theme';
import { LiteralUnion } from 'type-fest/source/literal-union';

export interface SvgIconContainerProps {
  color?: LiteralUnion<ThemeTextColorsChoices, string>;
  size?: number;
  style?: StyleProp<ViewStyle>;
  variant?: 'stroke' | 'fill' | 'both';
  children?: React.ReactNode;
}

export type SvgIconProps = Omit<SvgIconContainerProps, 'children' | 'variant'>;

export type IconProps = {
  color: string;
  size: number;
}