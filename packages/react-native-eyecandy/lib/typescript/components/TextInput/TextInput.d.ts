/// <reference types="react" />
import type { TextInputProps } from './typings';
export default function TextInput({ startIcon: StartIcon, endIcon: EndIcon, onPressAction, style, inputStyle, secureTextEntry: secureTextEntryProp, showSecureTextEntryToggle, onSecureTextEntryChange, color, value, defaultValue, onFocus: onFocus, onBlur: onBlur, inputRef: inputRefProp, error, errors, required, fullWidth, placeholder: placeholderProp, ...props }: TextInputProps): JSX.Element;
