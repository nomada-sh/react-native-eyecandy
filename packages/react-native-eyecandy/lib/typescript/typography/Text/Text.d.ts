/// <reference types="react" />
import { TextProps as TextBaseProps, TextStyle } from 'react-native';
import { ThemeTextColorsChoices } from '@nomada-sh/react-native-eyecandy-theme';
export interface TextProps extends TextBaseProps {
    weight?: TextStyle['fontWeight'] | 'semibold' | 'medium' | 'regular';
    size?: TextStyle['fontSize'];
    align?: TextStyle['textAlign'];
    contrast?: boolean;
    color?: ThemeTextColorsChoices;
    customColor?: string;
}
declare function Text({ weight, style, size, contrast, color, customColor, align, ...props }: TextProps): JSX.Element;
export default Text;
