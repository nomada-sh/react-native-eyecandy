import { NativeModules, Platform, ActionSheetIOS } from 'react-native';

const { RNActionSheet } = NativeModules;

export interface ActionSheetOptions {
  optionsIOS: string[];
  optionsAndroid: string[];
  title: string;
  tintColor?: string;
  destructiveButtonIndex?: number;
  message?: string;
  cancelButtonIndex?: number;
  onCancelAndroidIndex?: number;
}

const ActionSheet = (
  {
    optionsIOS,
    optionsAndroid,
    title,
    tintColor,
    message,
    destructiveButtonIndex,
    cancelButtonIndex,
    onCancelAndroidIndex = -1,
  }: ActionSheetOptions,
  callback: (index: number) => void,
) => {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: title,
        message: message,
        tintColor: tintColor,
        options: optionsIOS,
        destructiveButtonIndex:
          destructiveButtonIndex === null ? undefined : destructiveButtonIndex,
        cancelButtonIndex: cancelButtonIndex,
      },
      callback,
    );
  } else {
    RNActionSheet.show(title, optionsAndroid, onCancelAndroidIndex, callback);
  }
};

export default ActionSheet;
