import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
export default function useTextInput(_ref) {
  let {
    onFocus,
    onBlur,
    secureTextEntry: secureTextEntryProp = false,
    onSecureTextEntryChange,
    inputRef: inputRefProp,
    error,
    errors = [],
    required,
    placeholder: placeholderProp
  } = _ref;
  const hasError = useMemo(() => {
    const errs = error ? errors.concat([error]) : [...errors];
    return errs.reduce((result, _ref2) => {
      let [err] = _ref2;
      return result || !!err;
    }, false);
  }, [error, errors]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const placeholder = placeholderProp ? `${placeholderProp}${required ? ' *' : ''}` : undefined;
  const handleFocus = useCallback(e => {
    setFocused(true);
    onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
  }, [onFocus]);
  const handleBlur = useCallback(e => {
    setFocused(false);
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
  }, [onBlur]);
  const onPressIcon = useCallback(() => {
    var _inputRef$current;

    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
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
    if (typeof inputRefProp === 'function') inputRefProp(inputRef.current);else if (inputRefProp) inputRefProp.current = inputRef.current;
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
    placeholder
  };
}
//# sourceMappingURL=useTextInput.js.map