import React, { useMemo } from 'react';
import { View } from 'react-native';

import { ChevronDown } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import CountryPicker, {
  Country,
  CountryCode,
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import { Masks } from 'react-native-mask-input';

import { Body } from '../../typography';
import TextInputMask, {
  TextInputMaskHandle,
  TextInputMaskProps,
} from '../TextInputMask';

interface InputLeftProps {
  onChange: (country: Country) => void;
  countryCode: CountryCode;
  callingCode?: string;
}

const InputLeft = ({ onChange, countryCode, callingCode }: InputLeftProps) => {
  const { dark, palette, colors } = useTheme();

  const baseTheme = dark ? DARK_THEME : DEFAULT_THEME;

  const theme: typeof baseTheme = useMemo(
    () => ({
      ...baseTheme,
      backgroundColor: colors.background.default.container,
      primaryColor: palette.primary[500],
    }),
    [baseTheme, colors.background.default.container, palette.primary],
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 5,
      }}
    >
      <CountryPicker
        theme={theme}
        containerButtonStyle={{
          width: 30,
        }}
        withFilter
        withCallingCode
        withAlphaFilter
        withCloseButton={false}
        countryCode={countryCode}
        onSelect={onChange}
      />
      <ChevronDown size={20} />
      {callingCode ? (
        <Body
          style={{
            marginLeft: 8,
          }}
        >
          +{callingCode}
        </Body>
      ) : null}
    </View>
  );
};

export interface PhoneTextInputProps extends TextInputMaskProps {
  callingCode?: string;
  countryCode: CountryCode;
  onCountryChange: (country: Country) => void;
}

const PhoneTextInput = React.forwardRef<
  TextInputMaskHandle,
  PhoneTextInputProps
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
      <TextInputMask
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

export default PhoneTextInput;
