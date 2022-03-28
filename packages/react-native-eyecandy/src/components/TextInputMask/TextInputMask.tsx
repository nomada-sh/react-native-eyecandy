import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import MaskInput, { MaskInputProps } from 'react-native-mask-input';

import TextInputContainer, {
  TextInputContainerProps,
} from '../TextInputContainer';

export interface TextInputMaskProps
  extends Omit<TextInputContainerProps, 'onChangeText' | 'value'>,
    MaskInputProps {}

const TextInputMask = React.forwardRef<RNTextInput, TextInputMaskProps>(
  ({ onChangeText, value, mask, ...props }, ref) => {
    return (
      <TextInputContainer
        renderTextInput={props => (
          <MaskInput
            onChangeText={onChangeText}
            value={value}
            mask={mask}
            {...props}
            ref={ref}
          />
        )}
        {...props}
      />
    );
  },
);

export default TextInputMask;
