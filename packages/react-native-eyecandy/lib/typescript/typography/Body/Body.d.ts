/// <reference types="react" />
import { ThemeBodyFontSizes } from '@nomada-sh/react-native-eyecandy-theme';
import { TextProps } from '../Text';
export interface BodyProps extends Omit<TextProps, 'size'> {
    size?: keyof ThemeBodyFontSizes;
}
declare function Body({ size, ...props }: BodyProps): JSX.Element;
export default Body;
