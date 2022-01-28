"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeImagePicker = require("react-native-image-picker");

var _Avatar = _interopRequireDefault(require("../Avatar"));

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _reactNativeEyecandyIcons = require("@nomada-sh/react-native-eyecandy-icons");

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AvatarEdit(_ref) {
  let {
    style,
    size = (0, _utils.ms)(100),
    source,
    onPress,
    onChange,
    ...props
  } = _ref;
  const colors = (0, _reactNativeEyecandyTheme.useColors)(c => c.background.default);
  const onImageSelected = (0, _react.useCallback)(res => {
    if (res.errorCode) throw JSON.stringify(res);
    if (res.didCancel) return;
    onChange === null || onChange === void 0 ? void 0 : onChange(res.assets);
  }, [onChange]);
  const onActionSheetSelect = (0, _react.useCallback)(index => {
    if (index === 2) return;
    const options = {
      mediaType: 'photo'
    };
    const launch = index === 0 ? _reactNativeImagePicker.launchImageLibrary : _reactNativeImagePicker.launchCamera;
    launch(options).then(onImageSelected).catch(console.error);
  }, [onImageSelected]);
  const handlePress = (0, _react.useCallback)(e => {
    (0, _utils.ActionSheet)({
      optionsIOS: ['From Gallery', 'From Camera', 'Cancel'],
      optionsAndroid: ['From Gallery', 'From Camera'],
      cancelButtonIndex: 2,
      onCancelAndroidIndex: 2,
      title: 'Update Profile Picture'
    }, onActionSheetSelect);
    onPress === null || onPress === void 0 ? void 0 : onPress(e);
  }, [onActionSheetSelect, onPress]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, _extends({
    onPress: handlePress,
    style: [{
      width: size,
      height: size,
      borderRadius: size / 2
    }, style]
  }, props), /*#__PURE__*/_react.default.createElement(_Avatar.default, {
    size: size,
    source: source
  }), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    style: [{
      borderWidth: 1.5,
      borderColor: colors.content
    }, styles.cameraIconButton],
    icon: _reactNativeEyecandyIcons.Camera,
    iconSize: 14,
    size: 24,
    color: "primary",
    onPress: handlePress
  }));
}

const styles = _reactNative.StyleSheet.create({
  cameraIconButton: {
    position: 'absolute',
    bottom: 2,
    right: 2
  }
});

var _default = AvatarEdit;
exports.default = _default;
//# sourceMappingURL=AvatarEdit.js.map