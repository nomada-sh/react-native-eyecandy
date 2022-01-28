/// <reference types="react" />
import type { SelectProps } from './typings';
declare function Select<ValueType>({ items, onValueChange, value, color, icon: Icon, onFocus, onBlur, style, variant, pickerProps, placeholder: placeholderProp, androidItemSelectedColor, ...props }: SelectProps<ValueType>): JSX.Element;
export default Select;
