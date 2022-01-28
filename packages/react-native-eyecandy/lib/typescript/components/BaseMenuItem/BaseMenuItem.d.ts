import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { IconButtonProps } from '../IconButton';
export interface BaseMenuItemProps {
    style?: StyleProp<ViewStyle>;
    icon?: IconButtonProps['icon'];
    iconColor?: string;
    iconBackgroundColor?: string;
    separator?: boolean;
    onPress?: () => void;
    children?: React.ReactNode;
}
declare function BaseMenuItem({ style, icon, iconColor, iconBackgroundColor, separator, onPress, children, }: BaseMenuItemProps): JSX.Element;
export default BaseMenuItem;
