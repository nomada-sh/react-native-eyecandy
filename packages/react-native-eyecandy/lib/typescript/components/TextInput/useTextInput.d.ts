/// <reference types="react" />
import type { TextInputProps, TextInputRefCurrent } from './typings';
export default function useTextInput({ onFocus, onBlur, secureTextEntry: secureTextEntryProp, onSecureTextEntryChange, inputRef: inputRefProp, error, errors, required, placeholder: placeholderProp, }: {
    onFocus?: TextInputProps['onFocus'];
    onBlur?: TextInputProps['onBlur'];
    secureTextEntry?: boolean;
    onSecureTextEntryChange?: TextInputProps['onSecureTextEntryChange'];
    error?: TextInputProps['error'];
    errors?: TextInputProps['errors'];
    inputRef?: TextInputProps['inputRef'];
    required?: boolean;
    placeholder?: string;
}): {
    inputRef: import("react").MutableRefObject<TextInputRefCurrent>;
    focused: boolean;
    handleBlur: (e: import("react-native").NativeSyntheticEvent<import("react-native").TextInputFocusEventData>) => void;
    handleFocus: (e: import("react-native").NativeSyntheticEvent<import("react-native").TextInputFocusEventData>) => void;
    onPressIcon: () => void;
    onPressSecureTextEntryToggle: () => void;
    secureTextEntry: boolean;
    hasError: boolean;
    placeholder: string | undefined;
};
