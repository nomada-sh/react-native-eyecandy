import { NativeModules, Platform, ActionSheetIOS } from 'react-native';
const {
  RNActionSheet
} = NativeModules;

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

  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions({
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

export default ActionSheet;
//# sourceMappingURL=ActionSheet.js.map