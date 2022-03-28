import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import TextInputContainer, {
  TextInputContainerProps,
} from '../TextInputContainer';

export interface TextInputV2Props extends TextInputContainerProps {}

const TextInputV2 = React.forwardRef<RNTextInput, TextInputV2Props>(
  (props, ref) => {
    return (
      <TextInputContainer
        renderTextInput={props => <RNTextInput {...props} ref={ref} />}
        {...props}
      />
    );
  },
);

export default TextInputV2;
