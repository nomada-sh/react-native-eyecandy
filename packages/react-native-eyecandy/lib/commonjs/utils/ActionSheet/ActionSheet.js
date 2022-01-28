"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

const {
  RNActionSheet
} = _reactNative.NativeModules;

const ActionSheet = (_ref, callback) => {
  let {
    optionsIOS,
    optionsAndroid,
    title,
    tintColor,
    message,
    destructiveButtonIndex,
    cancelButtonIndex,
    onCancelAndroidIndex = -1
  } = _ref;

  if (_reactNative.Platform.OS === 'ios') {
    _reactNative.ActionSheetIOS.showActionSheetWithOptions({
      title: title,
      message: message,
      tintColor: tintColor,
      options: optionsIOS,
      destructiveButtonIndex: destructiveButtonIndex === null ? undefined : destructiveButtonIndex,
      cancelButtonIndex: cancelButtonIndex
    }, callback);
  } else {
    RNActionSheet.show(title, optionsAndroid, onCancelAndroidIndex, callback);
  }
};

var _default = ActionSheet;
exports.default = _default;
//# sourceMappingURL=ActionSheet.js.map