import React, { ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { usePressableStyles } from '../../hooks';
import type { ButtonColors } from '../../theme';
import useStyles from './useStyles';

export interface BaseButtonProps extends PressableProps {
  children?: ReactNode;
  /**
   * Container view style.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Pressable style.
   */
  buttonStyle?: PressableProps['style'];
  inverse?: boolean;
  color?: ButtonColors;
  styles?: {
    /**
     * Container view style (Applied after style).
     */
    container?: StyleProp<ViewStyle>;
    /**
     * Pressable style (Applied after buttonStyle).
     */
    button?: PressableProps['style'];
  };
  variant?: 'default' | 'outlined' | 'rounded' | 'transparent-rounded';
  height?: number;
  fullwidth?: boolean;
}

function BaseButton({
  children,
  style,
  buttonStyle,
  inverse,
  color,
  styles: customStyles = {},
  variant,
  height,
  fullwidth = true,
  disabled,
  ...props
}: BaseButtonProps) {
  const styles = useStyles({ color, inverse, variant, height, disabled });

  const getButtonStyle = usePressableStyles([
    styles.button,
    buttonStyle,
    customStyles.button,
  ]);

  return (
    <View
      style={[
        {
          width: fullwidth ? '100%' : undefined,
        },
        styles.container,
        style,
        customStyles.container,
      ]}
    >
      <Pressable
        style={getButtonStyle}
        android_ripple={{
          color: styles.ripple.color,
        }}
        disabled={disabled}
        {...props}
      >
        {children}
      </Pressable>
      {disabled ? <View style={styles.disabled} /> : null}
    </View>
  );
}

export default BaseButton;
