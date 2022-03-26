import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { TextInputMaskProps, TextInputMaskRefCurrent } from './typings';

export default function useTextInputMask({
  onFocus,
  onBlur,
  secureTextEntry: secureTextEntryProp = false,
  onSecureTextEntryChange,
  inputRef: inputRefProp,
  error,
  errors = [],
  required,
  placeholder: placeholderProp,
}: {
  onFocus?: TextInputMaskProps['onFocus'];
  onBlur?: TextInputMaskProps['onBlur'];
  secureTextEntry?: boolean;
  onSecureTextEntryChange?: TextInputMaskProps['onSecureTextEntryChange'];
  error?: TextInputMaskProps['error'];
  errors?: TextInputMaskProps['errors'];
  inputRef?: TextInputMaskProps['inputRef'];
  required?: boolean;
  placeholder?: string;
}) {
  const hasError = useMemo(() => {
    const errs = error ? errors.concat([error]) : [...errors];
    return errs.reduce((result, [err]) => result || !!err, false);
  }, [error, errors]);
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<TextInputMaskRefCurrent>(null);

  const placeholder = placeholderProp
    ? `${placeholderProp}${required ? ' *' : ''}`
    : undefined;

  const handleFocus = useCallback<NonNullable<typeof onFocus>>(
    e => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback<NonNullable<typeof onBlur>>(
    e => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const onPressIcon = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const [secureTextEntry, setSecureTextEntry] = useState(secureTextEntryProp);

  const onPressSecureTextEntryToggle = useCallback(() => {
    setSecureTextEntry(prev => !prev);
  }, []);

  useEffect(() => {
    setSecureTextEntry(secureTextEntryProp);
  }, [secureTextEntryProp]);

  useEffect(() => {
    onSecureTextEntryChange && onSecureTextEntryChange(secureTextEntry);
  }, [onSecureTextEntryChange, secureTextEntry]);

  useEffect(() => {
    if (typeof inputRefProp === 'function') {
      inputRefProp(inputRef.current);
    } else if (inputRefProp) {
      inputRefProp.current = inputRef.current;
    }
  }, [inputRef, inputRefProp]);

  return {
    inputRef,
    focused,
    handleBlur,
    handleFocus,
    onPressIcon,
    onPressSecureTextEntryToggle,
    secureTextEntry,
    hasError,
    placeholder,
  };
}
