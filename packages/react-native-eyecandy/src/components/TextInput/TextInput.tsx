import React, { useImperativeHandle, useRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import TextInputContainer, {
  TextInputContainerProps,
  extractTextInputContainerProps,
} from '../TextInputContainer';

export interface TextInputHandle {
  focus: () => void;
}
export interface TextInputProps
  extends TextInputContainerProps,
    Omit<RNTextInputProps, 'style'> {}

const TextInputV2 = React.forwardRef<TextInputHandle, TextInputProps>(
  (props, ref) => {
    const [containerProps, inputProps] =
      extractTextInputContainerProps<RNTextInputProps>(props);

    const inputRef = useRef<RNTextInput>(null);

    const focus = () => {
      if (inputRef.current) inputRef.current.focus();
    };

    useImperativeHandle(ref, () => ({
      focus,
    }));

    return (
      <TextInputContainer {...containerProps} focus={focus}>
        <RNTextInput disableFullscreenUI {...inputProps} ref={inputRef} />
      </TextInputContainer>
    );
  },
);

export default TextInputV2;
