"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTextInput;

var _react = require("react");

function useTextInput(_ref) {
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
  const hasError = (0, _react.useMemo)(() => {
    const errs = error ? errors.concat([error]) : [...errors];
    return errs.reduce((result, _ref2) => {
      let [err] = _ref2;
      return result || !!err;
    }, false);
  }, [error, errors]);
  const [focused, setFocused] = (0, _react.useState)(false);
  const inputRef = (0, _react.useRef)(null);
  const placeholder = placeholderProp ? `${placeholderProp}${required ? ' *' : ''}` : undefined;
  const handleFocus = (0, _react.useCallback)(e => {
    setFocused(true);
    onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
  }, [onFocus]);
  const handleBlur = (0, _react.useCallback)(e => {
    setFocused(false);
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
  }, [onBlur]);
  const onPressIcon = (0, _react.useCallback)(() => {
    var _inputRef$current;

    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
  }, [inputRef]);
  const [secureTextEntry, setSecureTextEntry] = (0, _react.useState)(secureTextEntryProp);
  const onPressSecureTextEntryToggle = (0, _react.useCallback)(() => {
    setSecureTextEntry(prev => !prev);
  }, []);
  (0, _react.useEffect)(() => {
    setSecureTextEntry(secureTextEntryProp);
  }, [secureTextEntryProp]);
  (0, _react.useEffect)(() => {
    onSecureTextEntryChange && onSecureTextEntryChange(secureTextEntry);
  }, [onSecureTextEntryChange, secureTextEntry]);
  (0, _react.useEffect)(() => {
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