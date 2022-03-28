import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import {
  Body,
  TextInputMask,
  TextInputV2,
  TextInput,
} from '@nomada-sh/react-native-eyecandy';
import CountryPicker, {
  Country,
  CountryCode,
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import { Masks } from 'react-native-mask-input';

import { useTheme } from '../shared/hooks';

const InputLeft = ({ onSelect, countryCode, callingCode }: any) => {
  const { dark } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <CountryPicker
        theme={dark ? DARK_THEME : DEFAULT_THEME}
        containerButtonStyle={{
          width: 30,
        }}
        withFilter
        withCallingCode
        withAlphaFilter
        countryCode={countryCode}
        onSelect={onSelect}
      />
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

export default function TextInputs() {
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('MX');
  const [callingCode, setCallingCode] = useState<string | undefined>('52');
  const [country, setCountry] = useState<Country | null>(null);

  const placeholder = `(___) ___ __ __`;

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  useEffect(() => {
    if (!country) return;

    setCallingCode(country.callingCode[0]);
  }, [country]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <TextInputMask
        inputLeft={
          <InputLeft
            onSelect={onSelect}
            countryCode={countryCode}
            callingCode={callingCode}
          />
        }
        maxLength={Masks.BRL_PHONE.length}
        keyboardType="phone-pad"
        mask={Masks.BRL_PHONE}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
      />

      <TextInputV2 />
      <TextInput />
    </ScrollView>
  );
}
