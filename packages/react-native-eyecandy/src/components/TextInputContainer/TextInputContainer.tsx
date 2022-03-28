import React from 'react';
import {
  TextStyle,
  TextInputProps as RNTextInputProps,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';

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

export interface IconProps {
  size: number;
  stroke: string;
}

export interface IconTouchableProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: React.FC<IconProps>;
  color: string;
}

export interface TextInputContainerProps extends UseThemeInputThemeProps {
  styles?: Styles;
  fullWidth?: boolean;
  inputLeft?: React.ReactNode;
  inputRight?: React.ReactNode;
  iconLeft?: React.FC<IconProps>;
  onPressIconLeft?: () => void;
  iconRight?: React.FC<IconProps>;
  onPressIconRight?: () => void;
}

const defaultStyles: Styles = {};

function IconTouchable({
  onPress,
  icon: Icon,
  style,
  color,
}: IconTouchableProps) {
  if (!Icon) return null;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.iconContainer, style]}>
        <Icon size={20} stroke={color} />
      </View>
    </TouchableWithoutFeedback>
  );
}

function TextInputContainer({
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
  withError,
}: TextInputContainerProps & {
  children?: React.ReactElement<{
    placeholderTextColor?: string;
    style?: StyleProp<TextStyle>;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
  }>;
}) {
  const { theme, setFocused } = useTextInputTheme({
    withError,
    color,
  });

  const dynamicStyles = StyleSheet.create({
    root: {
      width: fullWidth ? '100%' : undefined,
      backgroundColor: theme.backgroundColor,
      borderColor: theme.borderColor,
    },
    input: {
      color: theme.textColor,
      fontSize: theme.textSize,
    },
  });

  const injectedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
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
      });
    }

    return child;
  });

  return (
    <View style={[styles.root, dynamicStyles.root, customStyles.root]}>
      {/* Left Icon */}
      <IconTouchable
        onPress={onPressIconLeft}
        style={[styles.leftIconContainer, customStyles.leftIconContainer]}
        icon={iconLeft}
        color={theme.iconColor}
      />

      {/* Left Component */}
      {inputLeft}

      {/* Children */}
      {injectedChildren}
      {/* {renderTextInput({
        onFocus: e => {
          setFocused(true);
          if (onFocus) onFocus(e);
        },
        onBlur: e => {
          setFocused(false);
          if (onBlur) onBlur(e);
        },
        style: [styles.input, dynamicStyles.input, customStyles.input],
        disableFullscreenUI: true,
        placeholderTextColor: placeholderColor,
        ...props,
      })} */}

      {/* Right Component */}
      {inputRight}

      {/* Right Icon */}
      <IconTouchable
        onPress={onPressIconRight}
        style={[styles.rightIconContainer, customStyles.rightIconContainer]}
        icon={iconRight}
        color={theme.iconColor}
      />
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
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
  },
  iconContainer: {},
  leftIconContainer: {
    marginRight: 16,
  },
  rightIconContainer: {
    marginLeft: 16,
  },
});

export default TextInputContainer;
