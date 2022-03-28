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
export interface TextInputV2Props
  extends TextInputContainerProps,
    RNTextInputProps {}

const TextInputV2 = React.forwardRef<TextInputHandle, TextInputV2Props>(
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
