import { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { BaseButtonProps } from '../BaseButton';
interface IconProps {
    size: number;
    stroke?: string;
    style?: StyleProp<ViewStyle>;
}
export interface IconButtonProps extends BaseButtonProps {
    icon?: FC<IconProps>;
    size?: number;
    iconSize?: number;
    iconColor?: string;
}
declare function IconButton({ icon: Icon, style, size, iconSize: iconSizeProp, color, iconColor: iconColorProp, variant, inverse, ...props }: IconButtonProps): JSX.Element;
export default IconButton;
