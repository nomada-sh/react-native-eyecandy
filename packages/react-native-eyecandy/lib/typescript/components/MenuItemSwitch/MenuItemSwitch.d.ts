/// <reference types="react" />
import { BaseMenuItemProps } from '../BaseMenuItem';
export interface MenuItemSwitchProps extends Omit<BaseMenuItemProps, 'children'> {
    text?: string;
    textColor?: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
}
declare function MenuItemSwitch({ textColor, text, value, onValueChange, ...props }: MenuItemSwitchProps): JSX.Element;
export default MenuItemSwitch;
