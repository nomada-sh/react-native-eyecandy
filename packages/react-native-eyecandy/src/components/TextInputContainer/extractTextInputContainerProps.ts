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
    withError,
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
      withError,
    } as TextInputContainerProps,
    inputProps as P,
  ];
}
