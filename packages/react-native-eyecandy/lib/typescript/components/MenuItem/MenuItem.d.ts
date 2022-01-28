/// <reference types="react" />
import { BaseMenuItemProps } from '../BaseMenuItem';
export interface MenuItemProps extends Omit<BaseMenuItemProps, 'children'> {
    text?: string;
    textColor?: string;
}
declare function MenuItem({ textColor, text, ...props }: MenuItemProps): JSX.Element;
export default MenuItem;
