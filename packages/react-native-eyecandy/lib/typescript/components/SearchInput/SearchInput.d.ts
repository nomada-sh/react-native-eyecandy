/// <reference types="react" />
import { TextInputProps } from '../TextInput';
export interface SearchInputProps extends Omit<TextInputProps, 'onPressAction'> {
    cancelButtonText?: string;
    onPressCancel?: () => void;
    onPressFilter?: TextInputProps['onPressAction'];
}
declare function SearchInput({ style, value, cancelButtonText, onPressCancel, onPressFilter, onFocus, onBlur, ...props }: SearchInputProps): JSX.Element;
export default SearchInput;
