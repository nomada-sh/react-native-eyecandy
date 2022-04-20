import { MaskInputProps } from 'react-native-mask-input';

import { TextInputBaseProps, TextInputHandle } from '../TextInput';

export interface TextInputMaskHandle extends TextInputHandle {}

export interface TextInputMaskProps
  extends TextInputBaseProps,
    Omit<MaskInputProps, 'style'> {}
