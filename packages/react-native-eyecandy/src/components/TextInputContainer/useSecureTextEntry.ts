import { useEffect, useState } from 'react';

export default function useSecureTextEntry(
  secureTextEntryProp?: boolean,
  onSecureTextEntryChange?: (secureTextEntry: boolean) => void,
) {
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
