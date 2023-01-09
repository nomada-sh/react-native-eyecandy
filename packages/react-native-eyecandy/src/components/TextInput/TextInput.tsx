import React, { useImperativeHandle, useRef, useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
} from 'react-native';

import { EyeCheck, EyeOff } from '@nomada-sh/react-native-eyecandy-icons';

import { Body } from '../../typography';

import IconTouchable from './IconTouchable';
import styles from './styles';
import { TextInputStyles, TextInputProps, TextInputHandle } from './types';
import useStyles from './useStyles';

const DEFAULT_CUSTOM_STYLES: TextInputStyles = {};

export const TextInput = React.forwardRef<TextInputHandle, TextInputProps>(
  (props, ref) => {
    const {
      styles: customStyles = DEFAULT_CUSTOM_STYLES,
      focusOnLeftIconPress = true,
      placeholder: placeholderProp,
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
      autoFocus,
      hideIconLeftWhenUnfocused,
      hideIconRightWhenUnfocused,
      value,
      editable = true,
      secureTextEntry,
      onSecureTextEntryChange,
      numberOfLines,
      label: labelProp,
      height: heightProp,
      multiline,
      color,
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

    if (iconLeftVisible && hideIconLeftWhenUnfocused && !focused)
      iconLeftVisible = false;

    if (iconRightVisible && hideIconRightWhenUnfocused && !focused)
      iconRightVisible = false;

    const hasLabel = !!labelProp;

    let minHeight = 60;
    minHeight = heightProp !== undefined ? heightProp : minHeight;

    const dynamicStyles = useStyles({
      ...props,
      color,
      height: minHeight,
      removeDefaultLeftPadding: iconLeftVisible,
      removeDefaultRightPadding: iconRightVisible || showSecureTextEntryToggle,
      focused,
      hasLabel,
      multiline,
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
          paddingLeft={dynamicStyles.inputRight.paddingLeft}
          paddingRight={dynamicStyles.inputRight.paddingRight}
          iconRightVisible={iconRightVisible}
        />
      )
    ) : null;

    const handlePressIconLeft = () => {
      if (onPressIconLeft) onPressIconLeft();
      if (focusOnLeftIconPress) focus();
    };

    const handlePressIconRight = () => {
      if (onPressIconRight) onPressIconRight();
      if (focusOnRightIconPress) focus();
    };

    const inputStyles: StyleProp<TextStyle> = [
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
    ];

    const placeholder =
      placeholderProp && required ? `${placeholderProp}*` : placeholderProp;

    const label = labelProp && required ? `${labelProp}*` : labelProp;

    return (
      <View
        style={[
          styles.rootContainer,
          dynamicStyles.rootContainer,
          customStyles.rootContainer instanceof Function
            ? customStyles.rootContainer({ focused })
            : customStyles.rootContainer,
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
          hideUnfocused={hideIconLeftWhenUnfocused}
        />

        {/* Left Component */}
        {inputLeft}

        <View
          style={[
            styles.inputContainer,
            dynamicStyles.inputContainer,
            customStyles.inputContainer instanceof Function
              ? customStyles.inputContainer({ focused })
              : customStyles.inputContainer,
            style,
          ]}
        >
          {hasLabel ? (
            <TouchableWithoutFeedback onPress={focus}>
              <View
                style={[styles.labelContainer, dynamicStyles.labelContainer]}
              >
                <Body style={[styles.label, dynamicStyles.label]}>{label}</Body>
              </View>
            </TouchableWithoutFeedback>
          ) : null}

          <RNTextInput
            disableFullscreenUI
            placeholder={placeholder}
            selectionColor={dynamicStyles.selection.color}
            placeholderTextColor={dynamicStyles.placeholder.color}
            style={inputStyles}
            autoFocus={autoFocus}
            value={value}
            editable={editable}
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
            numberOfLines={numberOfLines}
            multiline={multiline}
            {...inputProps}
          />
        </View>

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
          hideUnfocused={hideIconRightWhenUnfocused}
        />

        {/* Secure Text Entry Toggle */}
        {showSecureTextEntryToggle ? (
          <IconTouchable
            focused={focused}
            onPress={() =>
              onSecureTextEntryChange &&
              onSecureTextEntryChange(!secureTextEntry)
            }
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

        {!editable ? (
          <View style={[styles.disabled, dynamicStyles.disabled]} />
        ) : null}
      </View>
    );
  },
);
