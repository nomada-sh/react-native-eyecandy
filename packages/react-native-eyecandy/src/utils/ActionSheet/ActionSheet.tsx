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
  darkTheme?: boolean;
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
    // TODO: Implement for Android
    darkTheme,
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
        userInterfaceStyle:
          darkTheme !== undefined ? (darkTheme ? 'dark' : 'light') : undefined,
      },
      callback,
    );
  } else {
    RNActionSheet.show(title, optionsAndroid, onCancelAndroidIndex, callback);
  }
};

export default ActionSheet;
