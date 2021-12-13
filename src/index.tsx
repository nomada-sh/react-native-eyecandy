export * from './context';
export * from './hooks';
export * from './theme';
export * from './utils';
export * from './components';
export * from './typography';

export * as Icons from './icons';

/*
import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-eyecandy' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const Eyecandy = NativeModules.Eyecandy
  ? NativeModules.Eyecandy
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return Eyecandy.multiply(a, b);
}
*/
