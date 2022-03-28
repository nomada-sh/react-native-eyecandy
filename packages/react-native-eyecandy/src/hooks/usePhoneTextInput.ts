import { useState } from 'react';

import { Country, CountryCode } from 'react-native-country-picker-modal';

export default function usePhoneTextInput() {
  const [formattedPhone, setFormattedPhone] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('MX');
  const [callingCode, setCallingCode] = useState<string | undefined>('52');

  const onCountryChange = (country: Country) => {
    setCountryCode(country.cca2);

    if (country.callingCode.length) setCallingCode(country.callingCode[0]);
    else setCallingCode(undefined);
  };

  return {
    value: formattedPhone,
    onChangeText: setFormattedPhone,
    countryCode,
    callingCode,
    onCountryChange,
  };
}
