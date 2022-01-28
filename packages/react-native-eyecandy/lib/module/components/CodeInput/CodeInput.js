import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Keyboard, TextInput as TextInputBase } from 'react-native';
import Cell from './Cell';

function CodeInput(_ref) {
  let {
    onFinish,
    dimissKeyboardOnFinish = true,
    length,
    style,
    size
  } = _ref;
  const inputRef = useRef(null);
  const [code, setCode] = useState('');
  const [focused, setFocused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const finished = useMemo(() => code.length === length, [code, length]);
  const cells = useMemo(() => {
    const newCells = [];

    for (let i = 0; i < length; i++) {
      newCells.push( /*#__PURE__*/React.createElement(Cell, {
        key: i,
        index: i,
        value: code[i],
        size: size,
        onPress: index => {
          var _inputRef$current;

          (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
          setCode(code.substring(0, index));
        },
        focused: focused && focusedIndex === i
      }));
    }

    return newCells;
  }, [length, code, size, focused, focusedIndex]);
  useEffect(() => {
    setCode('');
  }, [length]);
  useEffect(() => {
    setFocusedIndex(code.length === length ? length - 1 : code.length);
  }, [code, dimissKeyboardOnFinish, length, onFinish]);
  useEffect(() => {
    if (focused && finished) {
      dimissKeyboardOnFinish && Keyboard.dismiss();
      onFinish(code);
    }
  }, [code, dimissKeyboardOnFinish, finished, focused, onFinish]);
  useEffect(() => {
    if (!focused) return;
    const subscription = Keyboard.addListener('keyboardDidHide', () => {
      var _inputRef$current2;

      (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.blur();
    });
    return () => {
      subscription.remove();
    };
  }, [focused]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, style]
  }, cells, /*#__PURE__*/React.createElement(TextInputBase, {
    keyboardType: "numeric",
    ref: inputRef,
    autoCorrect: false,
    spellCheck: false,
    autoCapitalize: "none",
    maxLength: length + 1,
    value: code,
    onChangeText: text => {
      if (!/^\d*$/.test(text)) return;
      const newCode = text.substring(0, Math.max(0, Math.min(text.length - 1, length - 1)));
      const lastChar = text.slice(-1);
      setCode(newCode + lastChar);
    },
    style: {
      position: 'absolute',
      width: 0,
      height: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      borderWidth: 0,
      backgroundColor: 'transparent'
    },
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  }));
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  }
});
export default CodeInput;
//# sourceMappingURL=CodeInput.js.map