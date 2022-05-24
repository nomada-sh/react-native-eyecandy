// react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// react-native-reanimated
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});