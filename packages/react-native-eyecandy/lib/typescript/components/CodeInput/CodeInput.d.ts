/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export interface CodeInputProps {
    onFinish: (code: string) => void;
    dimissKeyboardOnFinish?: boolean;
    length: number;
    style?: StyleProp<ViewStyle>;
    size?: number;
}
declare function CodeInput({ onFinish, dimissKeyboardOnFinish, length, style, size, }: CodeInputProps): JSX.Element;
export default CodeInput;
