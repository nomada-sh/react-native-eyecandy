import { NativeModules, Platform } from 'react-native';

const { RNActionSheet } = NativeModules;

export type ActionSheetAndroidOptions = {
  title?: string;
  options: string[];
  cancelButtonIndex?: number;
  userInterfaceStyle?: 'light' | 'dark';
};

export class ActionSheetAndroid {
  static show(
    options: ActionSheetAndroidOptions,
    callback: (index: number) => void,
  ) {
    if (Platform.OS === 'android')
      RNActionSheet.show(
        options.title,
        options.options,
        options.cancelButtonIndex,
        options.userInterfaceStyle,
        callback,
      );
    else {
      console.warn('RNActionSheet is not supported on iOS.');
    }
  }
}
