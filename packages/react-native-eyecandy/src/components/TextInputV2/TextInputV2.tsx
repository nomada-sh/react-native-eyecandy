import React, { useCallback, useState } from 'react';
import {
  TextInput as TextInputBase,
  TextInputProps as TextInputBaseProps,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  ThemeInputColorChoices,
  useTheme,
} from '@nomada-sh/react-native-eyecandy-theme';

import TextInputContainer, {
  TextInputContainerProps,
} from '../TextInputContainer';

export type Styles = {
  root?: StyleProp<ViewStyle>;
  input?: TextInputBaseProps['style'];
  iconContainer?: StyleProp<ViewStyle>;
  leftIconContainer?: StyleProp<ViewStyle>;
  rightIconContainer?: StyleProp<ViewStyle>;
};

interface IconProps {
  size: number;
  stroke: string;
}

interface IconTouchableProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: React.FC<IconProps>;
  color: string;
}

export interface TextInputV2Props extends Omit<TextInputBaseProps, 'style'> {
  color?: ThemeInputColorChoices;
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

const TextInputV2 = React.forwardRef<TextInputBase, TextInputV2Props>(
  (
    {
      fullWidth = true,
      color = 'default',
      styles: customStyles = defaultStyles,
      onFocus,
      onBlur,
      inputLeft,
      inputRight,
      iconLeft,
      onPressIconLeft,
      iconRight,
      onPressIconRight,
      ...props
    }: TextInputV2Props,
    ref,
  ) => {
    const withError = false;
    const [focused, setFocused] = useState(false);
    const { palette, colors, fontSize } = useTheme(t => ({
      palette: t.palette,
      colors: t.colors.input[color],
      fontSize: t.typography.body.fontSize,
    }));

    const errorColor = palette.error[200];

    const backgroundColor = focused
      ? colors.focused.background
      : colors.background;

    let textColor = colors.foreground;
    textColor = withError ? errorColor : textColor;

    let placeholderColor = colors.placeholder;
    placeholderColor = withError ? errorColor : placeholderColor;

    let borderColor = focused ? colors.focused.indicator : backgroundColor;
    borderColor = withError ? errorColor : borderColor;

    let iconColor = focused ? borderColor : textColor;

    const dynamicStyles = StyleSheet.create({
      root: {
        width: fullWidth ? '100%' : undefined,
        backgroundColor,
        borderColor,
      },
      input: {
        color: textColor,
        fontSize: fontSize.medium,
      },
    });

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        if (onFocus) onFocus(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        if (onBlur) onBlur(e);
      },
      [onBlur],
    );

    return (
      <View style={[styles.root, dynamicStyles.root, customStyles.root]}>
        {/* Left Icon */}
        <IconTouchable
          onPress={onPressIconLeft}
          style={[styles.leftIconContainer, customStyles.leftIconContainer]}
          icon={iconLeft}
          color={iconColor}
        />

        {/* Left Component */}
        {inputLeft}

        {/* TextInput */}
        <TextInputBase
          style={[styles.input, dynamicStyles.input, customStyles.input]}
          disableFullscreenUI
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholderTextColor={placeholderColor}
          ref={ref}
          {...props}
        />

        {/* Right Component */}
        {inputRight}

        {/* Right Icon */}
        <IconTouchable
          onPress={onPressIconRight}
          style={[styles.rightIconContainer, customStyles.rightIconContainer]}
          icon={iconRight}
          color={iconColor}
        />
      </View>
    );
  },
);

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

export default TextInputV2;
