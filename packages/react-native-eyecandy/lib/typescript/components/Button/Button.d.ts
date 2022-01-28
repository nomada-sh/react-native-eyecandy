/// <reference types="react" />
import { BaseButtonProps } from '../BaseButton';
export interface ButtonProps extends Omit<BaseButtonProps, 'children'> {
    text: string;
}
declare function Button({ text, color, inverse, ...props }: ButtonProps): JSX.Element;
export default Button;
