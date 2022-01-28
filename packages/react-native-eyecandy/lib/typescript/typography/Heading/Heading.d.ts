/// <reference types="react" />
import { ThemeHeadingFontSizes } from '@nomada-sh/react-native-eyecandy-theme';
import { TextProps } from '../Text';
export interface HeadingProps extends Omit<TextProps, 'variant'> {
    variant?: keyof ThemeHeadingFontSizes;
}
export default function Heading({ variant, weight, ...props }: HeadingProps): JSX.Element;
