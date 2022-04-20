import React from 'react';

import { Country, CountryCode } from 'react-native-country-picker-modal';
import { Masks } from 'react-native-mask-input';

import MaskedTextInput, {
  MaskedTextInputHandle,
  MaskedTextInputProps,
} from '../MaskedTextInput';

import InputLeft from './InputLeft';

export interface MaskedTextInputPropsPhone extends MaskedTextInputProps {
  callingCode?: string;
  countryCode: CountryCode;
  onCountryChange: (country: Country) => void;
}

const MaskedTextInputPhone = React.forwardRef<
  MaskedTextInputHandle,
  MaskedTextInputPropsPhone
>(
  (
    {
      mask = Masks.BRL_PHONE,
      placeholder = '(___) ___ __ __',
      keyboardType = 'phone-pad',
      callingCode,
      countryCode,
      onCountryChange,
      ...props
    },
    ref,
  ) => {
    return (
      <MaskedTextInput
        inputLeft={
          <InputLeft
            callingCode={callingCode}
            countryCode={countryCode}
            onChange={onCountryChange}
          />
        }
        inputPaddingLeft={0}
        maxLength={mask.length}
        mask={mask}
        placeholder={placeholder}
        keyboardType={keyboardType}
        {...props}
        ref={ref}
      />
    );
  },
);

export default MaskedTextInputPhone;
