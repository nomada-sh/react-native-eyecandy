module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./jest.setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/.yalc', '.+\.ignore'],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    '/node_modules/(?!victory|react-native-svg|@react-native|react-native|@react-navigation)',
  ],
  timers: 'fake',
};
