import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import MaskInput, { MaskInputProps } from 'react-native-mask-input';

import TextInputContainer, {
  TextInputContainerProps,
  extractTextInputContainerProps,
} from '../TextInputContainer';

export interface TextInputMaskProps
  extends TextInputContainerProps,
    MaskInputProps {}

const TextInputMask = React.forwardRef<RNTextInput, TextInputMaskProps>(
  (props, ref) => {
    const [containerProps, inputProps] =
      extractTextInputContainerProps<MaskInputProps>(props);

    return (
      <TextInputContainer {...containerProps}>
        <MaskInput disableFullscreenUI {...inputProps} ref={ref} />
      </TextInputContainer>
    );
  },
);

export default TextInputMask;
