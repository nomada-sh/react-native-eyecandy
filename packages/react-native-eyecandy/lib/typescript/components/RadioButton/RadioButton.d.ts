/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export interface RadioButtonProps {
    value?: boolean;
    onValueChange?: (checked: boolean) => void;
    style?: StyleProp<ViewStyle>;
    color?: string;
    size?: number;
    label?: string;
}
declare function RadioButton({ value, size, style, onValueChange, }: RadioButtonProps): JSX.Element;
export default RadioButton;
