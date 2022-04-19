import { TextInputContainerProps } from './TextInputContainer';

export default function extractTextInputContainerProps<P>(
  props: TextInputContainerProps,
): [TextInputContainerProps, P] {
  const {
    fullWidth,
    iconLeft,
    iconRight,
    inputLeft,
    inputRight,
    onPressIconLeft,
    onPressIconRight,
    styles,
    color,
    error,
    focusOnLeftIconPress,
    focusOnRightIconPress,
    inputPaddingLeft,
    inputPaddingRight,
    required,
    marginBottom,
    marginTop,
    showSecureTextEntryToggle,
    onSecureTextEntryChange,
    secureTextEntry,
    style,
    ...inputProps
  } = props;

  return [
    {
      fullWidth,
      iconLeft,
      iconRight,
      inputLeft,
      inputRight,
      onPressIconLeft,
      onPressIconRight,
      styles,
      color,
      error,
      focusOnLeftIconPress,
      focusOnRightIconPress,
      inputPaddingLeft,
      inputPaddingRight,
      required,
      marginBottom,
      marginTop,
      showSecureTextEntryToggle,
      onSecureTextEntryChange,
      secureTextEntry,
      style,
    } as TextInputContainerProps,
    inputProps as P,
  ];
}
