"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _RBSheet = _interopRequireDefault(require("./RBSheet"));

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const DARK_MASK_COLOR = 'rgba(0, 0, 0, 0.75)',
      LIGHT_MASK_COLOR = 'rgba(0, 0, 0, 0.5)';

const BottomSheet = /*#__PURE__*/_react.default.forwardRef((_ref, forwardedRef) => {
  let {
    style,
    visible,
    customStyles,
    ...props
  } = _ref;
  // TODO: Create BottomSheet colors.
  const {
    dark,
    background,
    divider
  } = (0, _reactNativeEyecandyTheme.useTheme)(t => ({
    dark: t.dark,
    background: t.colors.background.default,
    divider: t.colors.divider.default
  }));
  const ref = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(forwardedRef, () => ({
    open: () => {
      var _ref$current;

      return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.open();
    },
    close: () => {
      var _ref$current2;

      return (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.close();
    }
  }));
  (0, _react.useEffect)(() => {
    var _ref$current3, _ref$current4;

    if (visible) (_ref$current3 = ref.current) === null || _ref$current3 === void 0 ? void 0 : _ref$current3.open();else (_ref$current4 = ref.current) === null || _ref$current4 === void 0 ? void 0 : _ref$current4.close();
  }, [visible]);
  return /*#__PURE__*/_react.default.createElement(_RBSheet.default, _extends({
    customStyles: {
      wrapper: [{
        backgroundColor: dark ? DARK_MASK_COLOR : LIGHT_MASK_COLOR
      }, customStyles.wrapper],
      container: [{
        backgroundColor: background.container,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 20,
        paddingTop: 0
      }, customStyles.container, style],
      draggableIcon: [{
        backgroundColor: divider,
        width: 64,
        marginBottom: 20
      }, customStyles.draggableIcon]
    }
  }, props, {
    ref: ref
  }));
});

BottomSheet.defaultProps = {
  closeOnDragDown: true,
  animationType: 'none',
  height: 260,
  minClosingHeight: 0,
  openDuration: 300,
  closeDuration: 200,
  dragFromTopOnly: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: _reactNative.Platform.OS === 'ios',
  customStyles: {},
  onClose: () => {},
  onOpen: () => {}
};
var _default = BottomSheet;
exports.default = _default;
//# sourceMappingURL=BottomSheet.js.map