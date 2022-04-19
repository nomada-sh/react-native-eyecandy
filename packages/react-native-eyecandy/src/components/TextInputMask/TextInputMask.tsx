import React, { useImperativeHandle, useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import MaskInput, { MaskInputProps } from 'react-native-mask-input';

import TextInputContainer, {
  TextInputContainerProps,
  extractTextInputContainerProps,
} from '../TextInputContainer';

export interface TextInputMaskHandle {
  focus: () => void;
}

export interface TextInputMaskProps
  extends TextInputContainerProps,
    Omit<MaskInputProps, 'style'> {}

const TextInputMask = React.forwardRef<TextInputMaskHandle, TextInputMaskProps>(
  (props, ref) => {
    const [containerProps, inputProps] =
      extractTextInputContainerProps<MaskInputProps>(props);

    const inputRef = useRef<RNTextInput>(null);

    const focus = () => {
      if (inputRef.current) inputRef.current.focus();
    };

    useImperativeHandle(ref, () => ({
      focus,
    }));

    return (
      <TextInputContainer {...containerProps} focus={focus}>
        <MaskInput disableFullscreenUI {...inputProps} ref={inputRef} />
      </TextInputContainer>
    );
  },
);

export default TextInputMask;
