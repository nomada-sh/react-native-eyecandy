/// <reference types="react" />
import { SvgProps } from 'react-native-svg';
import { ThemeTextColorsChoices } from '@nomada-sh/react-native-eyecandy-theme';
export interface IconProps extends Omit<SvgProps, 'color'> {
    size?: number;
    color?: ThemeTextColorsChoices;
    filled?: boolean;
}
export default function Icon({ size, stroke: strokeProp, fill: fillProp, color, filled, ...props }: IconProps): JSX.Element;
