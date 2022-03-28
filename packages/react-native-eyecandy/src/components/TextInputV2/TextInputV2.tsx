import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import TextInputContainer, {
  TextInputContainerProps,
  extractTextInputContainerProps,
} from '../TextInputContainer';
export interface TextInputV2Props
  extends TextInputContainerProps,
    RNTextInputProps {}

const TextInputV2 = React.forwardRef<RNTextInput, TextInputV2Props>(
  (props, ref) => {
    const [containerProps, inputProps] =
      extractTextInputContainerProps<RNTextInputProps>(props);

    return (
      <TextInputContainer {...containerProps}>
        <RNTextInput disableFullscreenUI {...inputProps} ref={ref} />
      </TextInputContainer>
    );
  },
);

export default TextInputV2;
