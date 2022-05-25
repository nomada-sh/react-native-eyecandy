import { Animated } from 'react-native';

// react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// react-native-reanimated
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};
  Reanimated.interpolateColor = () => {};

  return Reanimated;
});

// Silence the warning: RNReactNativeHapticFeedback is not available.
jest.mock('react-native-haptic-feedback', () => ({
  ...jest.requireActual('react-native-haptic-feedback'),
  trigger: jest.fn(),
}));

Animated.timing = () => ({
  // I'm mocking the Animated.timing here
  start: () => jest.fn(),
});