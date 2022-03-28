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
    } as TextInputContainerProps,
    inputProps as P,
  ];
}
