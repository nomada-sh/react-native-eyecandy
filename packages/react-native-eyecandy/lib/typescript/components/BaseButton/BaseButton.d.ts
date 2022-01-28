import { ReactNode } from 'react';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';
import type { ThemeButtonColorChoices } from '@nomada-sh/react-native-eyecandy-theme';
export interface BaseButtonProps extends PressableProps {
    children?: ReactNode;
    /**
     * Container view style.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Pressable style.
     */
    buttonStyle?: PressableProps['style'];
    inverse?: boolean;
    color?: ThemeButtonColorChoices;
    styles?: {
        /**
         * Container view style (Applied after style).
         */
        container?: StyleProp<ViewStyle>;
        /**
         * Pressable style (Applied after buttonStyle).
         */
        button?: PressableProps['style'];
    };
    variant?: 'default' | 'outlined' | 'rounded' | 'transparent-rounded';
    height?: number;
    fullwidth?: boolean;
    loading?: boolean;
    hideDisabledOverlay?: boolean;
}
declare function BaseButton({ children, style, buttonStyle, inverse, color, variant, height, fullwidth, disabled: disabledProp, loading, styles: customStyles, hideDisabledOverlay, ...props }: BaseButtonProps): JSX.Element;
export default BaseButton;
