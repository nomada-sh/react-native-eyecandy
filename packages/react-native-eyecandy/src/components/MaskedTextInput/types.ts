import { MaskInputProps } from 'react-native-mask-input';

import { TextInputBaseProps, TextInputHandle } from '../TextInput';

export interface MaskedTextInputHandle extends TextInputHandle {}

export interface MaskedTextInputProps
  extends TextInputBaseProps,
    Omit<MaskInputProps, 'style'> {}
