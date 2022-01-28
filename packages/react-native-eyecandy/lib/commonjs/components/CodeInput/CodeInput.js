"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Cell = _interopRequireDefault(require("./Cell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CodeInput(_ref) {
  let {
    onFinish,
    dimissKeyboardOnFinish = true,
    length,
    style,
    size
  } = _ref;
  const inputRef = (0, _react.useRef)(null);
  const [code, setCode] = (0, _react.useState)('');
  const [focused, setFocused] = (0, _react.useState)(false);
  const [focusedIndex, setFocusedIndex] = (0, _react.useState)(0);
  const finished = (0, _react.useMemo)(() => code.length === length, [code, length]);
  const cells = (0, _react.useMemo)(() => {
    const newCells = [];

    for (let i = 0; i < length; i++) {
      newCells.push( /*#__PURE__*/_react.default.createElement(_Cell.default, {
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
  (0, _react.useEffect)(() => {
    setCode('');
  }, [length]);
  (0, _react.useEffect)(() => {
    setFocusedIndex(code.length === length ? length - 1 : code.length);
  }, [code, dimissKeyboardOnFinish, length, onFinish]);
  (0, _react.useEffect)(() => {
    if (focused && finished) {
      dimissKeyboardOnFinish && _reactNative.Keyboard.dismiss();
      onFinish(code);
    }
  }, [code, dimissKeyboardOnFinish, finished, focused, onFinish]);
  (0, _react.useEffect)(() => {
    if (!focused) return;

    const subscription = _reactNative.Keyboard.addListener('keyboardDidHide', () => {
      var _inputRef$current2;

      (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.blur();
    });

    return () => {
      subscription.remove();
    };
  }, [focused]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, style]
  }, cells, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
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

const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  }
});

var _default = CodeInput;
exports.default = _default;
//# sourceMappingURL=CodeInput.js.map