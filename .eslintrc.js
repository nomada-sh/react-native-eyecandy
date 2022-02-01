module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react-native/no-inline-styles': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-shadow': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        curly: 'off',
      },
    },
  ],
};
