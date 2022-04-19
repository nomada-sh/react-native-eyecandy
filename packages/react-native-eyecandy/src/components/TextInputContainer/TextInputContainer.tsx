import React from 'react';
import {
  TextStyle,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';

import { EyeCheck, EyeOff } from '@nomada-sh/react-native-eyecandy-icons';

import useSecureTextEntry from './useSecureTextEntry';
import useTextInputTheme, {
  UseThemeInputThemeProps,
} from './useTextInputTheme';

export type Styles = {
  root?: StyleProp<ViewStyle>;
  input?: StyleProp<TextStyle>;
  iconContainer?: StyleProp<ViewStyle>;
  leftIconContainer?: StyleProp<ViewStyle>;
  rightIconContainer?: StyleProp<ViewStyle>;
};

interface TextInputProps {
  placeholderTextColor?: string;
  style?: StyleProp<TextStyle>;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  selectionColor?: string;
}

interface IconProps {
  size: number;
  stroke: string;
}

interface IconTouchableProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: React.ComponentType<IconProps> | React.ReactElement<any>;
  color: string;
}

export interface TextInputContainerProps extends UseThemeInputThemeProps {
  style?: StyleProp<ViewStyle>;
  styles?: Styles;
  fullWidth?: boolean;
  inputLeft?: React.ReactNode;
  inputRight?: React.ReactNode;
  iconLeft?: React.ComponentType<IconProps> | React.ReactElement<any>;
  onPressIconLeft?: () => void;
  iconRight?: React.ComponentType<IconProps> | React.ReactElement<any>;
  onPressIconRight?: () => void;
  focusOnLeftIconPress?: boolean;
  focusOnRightIconPress?: boolean;
  inputPaddingLeft?: number;
  inputPaddingRight?: number;
  required?: boolean;
  marginBottom?: number;
  marginTop?: number;
  showSecureTextEntryToggle?: boolean;
  secureTextEntry?: boolean;
  onSecureTextEntryChange?: (secureTextEntry: boolean) => void;
}

const defaultStyles: Styles = {};

function IconTouchable({
  onPress,
  icon: Icon,
  style,
  color,
}: IconTouchableProps) {
  if (!Icon) return null;

  const icon = React.isValidElement(Icon) ? (
    Icon
  ) : (
    <Icon size={20} stroke={color} />
  );

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.iconContainer, style]}>{icon}</View>
    </TouchableWithoutFeedback>
  );
}

function TextInputContainer({
  style,
  fullWidth = true,
  styles: customStyles = defaultStyles,
  children,
  inputLeft,
  inputRight,
  iconLeft,
  onPressIconLeft,
  iconRight,
  onPressIconRight,
  color,
  error: withError,
  focus,
  focusOnLeftIconPress = true,
  focusOnRightIconPress,
  inputPaddingLeft: inputPaddingLeftProp,
  inputPaddingRight: inputPaddingRightProp,
  required,
  marginBottom,
  marginTop,
  showSecureTextEntryToggle,
  secureTextEntry: secureTextEntryProp,
  onSecureTextEntryChange,
}: TextInputContainerProps & {
  children?: React.ReactElement<TextInputProps>;
  focus: () => void;
}) {
  const inputHorizontalPadding = 16;
  let inputPaddingLeft = iconLeft ? 0 : inputHorizontalPadding;

  if (inputPaddingLeftProp !== undefined)
    inputPaddingLeft = inputPaddingLeftProp;

  let inputPaddingRight =
    iconRight || showSecureTextEntryToggle ? 0 : inputHorizontalPadding;

  if (inputPaddingRightProp !== undefined)
    inputPaddingRight = inputPaddingRightProp;

  const { theme, setFocused } = useTextInputTheme({
    error: withError,
    color,
  });

  const dynamicStyles = StyleSheet.create({
    root: {
      width: fullWidth ? '100%' : undefined,
      backgroundColor: theme.backgroundColor,
      borderColor: theme.borderColor,
      marginTop,
      marginBottom,
    },
    input: {
      color: theme.textColor,
      fontSize: theme.textSize,
      paddingLeft: inputPaddingLeft,
      paddingRight: inputPaddingRight,
    },
  });

  const { secureTextEntry, onPressSecureTextEntryToggle } = useSecureTextEntry(
    secureTextEntryProp,
    onSecureTextEntryChange,
  );

  const injectedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      const placeholder = child.props.placeholder ?? '';

      return React.cloneElement(child, {
        placeholderTextColor: theme.placeholderTextColor,
        style: [
          styles.input,
          dynamicStyles.input,
          customStyles.input,
          child.props.style,
        ],
        onFocus: (e: any) => {
          setFocused(true);
          if (child.props.onFocus) child.props.onFocus(e);
        },
        onBlur: (e: any) => {
          setFocused(false);
          if (child.props.onBlur) child.props.onBlur(e);
        },
        placeholder: required ? `${placeholder} *` : placeholder,
        secureTextEntry,
        selectionColor: child.props.selectionColor ?? theme.selectionColor,
      });
    }

    return child;
  });

  const handlePressIconLeft = () => {
    if (onPressIconLeft) onPressIconLeft();
    if (focusOnLeftIconPress) focus();
  };

  const handlePressIconRight = () => {
    if (onPressIconRight) onPressIconRight();
    if (focusOnRightIconPress) focus();
  };

  return (
    <View style={[styles.root, dynamicStyles.root, customStyles.root, style]}>
      {/* Left Icon */}
      <IconTouchable
        onPress={handlePressIconLeft}
        style={[styles.leftIconContainer, customStyles.leftIconContainer]}
        icon={iconLeft}
        color={theme.iconColor}
      />

      {/* Left Component */}
      {inputLeft}

      {injectedChildren}

      {/* Right Component */}
      {inputRight}

      {/* Right Icon */}
      <IconTouchable
        onPress={handlePressIconRight}
        style={[styles.rightIconContainer, customStyles.rightIconContainer]}
        icon={iconRight}
        color={theme.iconColor}
      />

      {/* Secure Text Entry Toggle */}
      {showSecureTextEntryToggle ? (
        <IconTouchable
          onPress={onPressSecureTextEntryToggle}
          style={[styles.rightIconContainer, customStyles.rightIconContainer]}
          icon={secureTextEntry ? EyeOff : EyeCheck}
          color={theme.iconColor}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    borderStyle: 'solid',
  },
  input: {
    flex: 1,
  },
  iconContainer: {
    justifyContent: 'center',
  },
  leftIconContainer: {
    paddingHorizontal: 16,
  },
  rightIconContainer: {
    paddingHorizontal: 16,
  },
});

export default TextInputContainer;
