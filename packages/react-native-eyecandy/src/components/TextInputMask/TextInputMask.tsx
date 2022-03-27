import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import MaskInput, { Masks, MaskInputProps } from 'react-native-mask-input';

import TextInputContainer, {
  TextInputContainerProps,
} from '../TextInputContainer';

export interface TextInputMaskProps extends TextInputContainerProps {}

const TextInputMask = React.forwardRef<RNTextInput, TextInputMaskProps>(
  (props, ref) => {
    return (
      <TextInputContainer
        TextInput={RNTextInput}
        textInputRef={ref}
        {...props}
      />
    );
  },
);

export default TextInputMask;
