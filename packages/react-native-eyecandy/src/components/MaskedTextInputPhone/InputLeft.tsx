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

import { Body } from '../../typography';

export interface InputLeftProps {
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

export default InputLeft;
