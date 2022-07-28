import React, { useImperativeHandle, useRef, useState } from 'react';
import { View, TextInput as RNTextInput } from 'react-native';

import { EyeCheck, EyeOff } from '@nomada-sh/react-native-eyecandy-icons';

import IconTouchable from './IconTouchable';
import styles from './styles';
import { TextInputStyles, TextInputProps, TextInputHandle } from './types';
import useSecureTextEntry from './useSecureTextEntry';
import useStyles from './useStyles';

const DEFAULT_CUSTOM_STYLES: TextInputStyles = {};

export const TextInput = React.forwardRef<TextInputHandle, TextInputProps>(
  (props, ref) => {
    const {
      styles: customStyles = DEFAULT_CUSTOM_STYLES,
      focusOnLeftIconPress = true,
      placeholder,
      style,
      inputStyle,
      onPressIconLeft,
      onPressIconRight,
      focusOnRightIconPress,
      iconLeft,
      iconRight,
      inputLeft: InputLeft,
      inputRight: InputRight,
      showSecureTextEntryToggle,
      required,
      onFocus,
      onBlur,
      hideIconLeftUnfocused,
      hideIconRightUnfocused,
      autoFocus,
      ...inputProps
    } = props;

    const inputRef = useRef<RNTextInput>(null);
    const [focused, setFocused] = useState(!!autoFocus);

    const focus = () => {
      if (inputRef.current) inputRef.current.focus();
    };

    const blur = () => {
      if (inputRef.current) inputRef.current.blur();
    };

    const clear = () => {
      if (inputRef.current) inputRef.current.clear();
    };

    const isFocused = () => {
      if (inputRef.current) return inputRef.current.isFocused();
      return false;
    };

    useImperativeHandle(ref, () => ({
      focus,
      blur,
      clear,
      isFocused,
    }));

    let iconLeftVisible = !!iconLeft;
    let iconRightVisible = !!iconRight;

    if (iconLeftVisible && hideIconLeftUnfocused && !focused)
      iconLeftVisible = false;

    if (iconRightVisible && hideIconRightUnfocused && !focused)
      iconRightVisible = false;

    const dynamicStyles = useStyles({
      ...props,
      removeDefaultLeftPadding: iconLeftVisible,
      removeDefaultRightPadding: iconRightVisible || showSecureTextEntryToggle,
      focused,
    });

    const inputLeft = InputLeft ? (
      React.isValidElement(InputLeft) ? (
        InputLeft
      ) : (
        <InputLeft
          focused={focused}
          color={dynamicStyles.icon.color}
          onPress={focus}
        />
      )
    ) : null;

    const inputRight = InputRight ? (
      React.isValidElement(InputRight) ? (
        InputRight
      ) : (
        <InputRight
          focused={focused}
          color={dynamicStyles.icon.color}
          onPress={focus}
        />
      )
    ) : null;

    const { secureTextEntry, onPressSecureTextEntryToggle } =
      useSecureTextEntry(props);

    const handlePressIconLeft = () => {
      if (onPressIconLeft) onPressIconLeft();
      if (focusOnLeftIconPress) focus();
    };

    const handlePressIconRight = () => {
      if (onPressIconRight) onPressIconRight();
      if (focusOnRightIconPress) focus();
    };

    return (
      <View
        style={[
          styles.container,
          dynamicStyles.container,
          customStyles.container instanceof Function
            ? customStyles.container({ focused })
            : customStyles.container,
          style,
        ]}
      >
        {/* Left Icon */}
        <IconTouchable
          focused={focused}
          onPress={handlePressIconLeft}
          style={[
            styles.leftIconContainer,
            customStyles.leftIconContainer instanceof Function
              ? customStyles.leftIconContainer({ focused })
              : customStyles.leftIconContainer,
          ]}
          icon={iconLeft}
          color={dynamicStyles.icon.color}
          hideUnfocused={hideIconLeftUnfocused}
        />

        {/* Left Component */}
        {inputLeft}

        <RNTextInput
          disableFullscreenUI
          placeholder={
            placeholder && required ? `${placeholder} *` : placeholder
          }
          selectionColor={dynamicStyles.selection.color}
          placeholderTextColor={dynamicStyles.placeholder.color}
          style={[
            styles.input,
            dynamicStyles.input,
            customStyles.input instanceof Function
              ? customStyles.input({
                  focused,
                  paddingLeft: dynamicStyles.input.paddingLeft,
                  paddingRight: dynamicStyles.input.paddingRight,
                })
              : customStyles.input,
            inputStyle,
          ]}
          {...inputProps}
          onFocus={e => {
            setFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={e => {
            setFocused(false);
            if (onBlur) onBlur(e);
          }}
          secureTextEntry={secureTextEntry}
          ref={inputRef}
        />

        {/* Right Component */}
        {inputRight}

        {/* Right Icon */}
        <IconTouchable
          focused={focused}
          onPress={handlePressIconRight}
          style={[
            styles.rightIconContainer,
            customStyles.rightIconContainer instanceof Function
              ? customStyles.rightIconContainer({ focused })
              : customStyles.rightIconContainer,
          ]}
          icon={iconRight}
          color={dynamicStyles.icon.color}
          hideUnfocused={hideIconRightUnfocused}
        />

        {/* Secure Text Entry Toggle */}
        {showSecureTextEntryToggle ? (
          <IconTouchable
            focused={focused}
            onPress={onPressSecureTextEntryToggle}
            style={[
              styles.rightIconContainer,
              customStyles.rightIconContainer instanceof Function
                ? customStyles.rightIconContainer({ focused })
                : customStyles.rightIconContainer,
            ]}
            icon={secureTextEntry ? EyeOff : EyeCheck}
            color={dynamicStyles.icon.color}
          />
        ) : null}
      </View>
    );
  },
);
