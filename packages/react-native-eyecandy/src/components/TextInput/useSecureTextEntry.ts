import { useEffect, useState } from 'react';

import { TextInputSecureTextEntryProps } from './types';

interface UseSecureTextEntry extends TextInputSecureTextEntryProps {}

export default function useSecureTextEntry({
  secureTextEntry: secureTextEntryProp,
  onSecureTextEntryChange,
}: UseSecureTextEntry) {
  const [secureTextEntry, setSecureTextEntry] = useState(
    secureTextEntryProp ?? false,
  );

  const onPressSecureTextEntryToggle = () => setSecureTextEntry(prev => !prev);

  useEffect(() => {
    setSecureTextEntry(secureTextEntryProp ?? false);
  }, [secureTextEntryProp]);

  useEffect(() => {
    onSecureTextEntryChange && onSecureTextEntryChange(secureTextEntry);
  }, [onSecureTextEntryChange, secureTextEntry]);

  return {
    secureTextEntry,
    onPressSecureTextEntryToggle,
  };
}
