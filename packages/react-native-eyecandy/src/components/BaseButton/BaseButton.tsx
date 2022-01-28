import React, { ReactNode, useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { usePressableStyles } from '../../hooks';
import type { ThemeButtonColorChoices } from '@nomada-sh/react-native-eyecandy-theme';
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
  color?: ThemeButtonColorChoices;
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
  loading?: boolean;
  hideDisabledOverlay?: boolean;
}

function BaseButton({
  children,
  style,
  buttonStyle,
  inverse,
  color,
  variant,
  height,
  fullwidth,
  disabled: disabledProp,
  loading,
  styles: customStyles = {},
  hideDisabledOverlay,
  ...props
}: BaseButtonProps) {
  const disabled = useMemo(
    () => disabledProp || loading,
    [disabledProp, loading],
  );

  const styles = useStyles({
    color,
    inverse,
    variant,
    height,
    disabled,
    fullwidth,
  });

  const getButtonStyle = usePressableStyles([
    styles.button,
    buttonStyle,
    customStyles.button,
  ]);

  return (
    <View style={[styles.container, style, customStyles.container]}>
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
      {disabled && !hideDisabledOverlay ? (
        <View style={styles.disabled} />
      ) : null}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={styles.loading.color} />
        </View>
      ) : null}
    </View>
  );
}

export default BaseButton;
