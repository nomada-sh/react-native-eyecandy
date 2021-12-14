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
  loading?: boolean;
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
  disabled,
  loading,
  styles: customStyles = {},
  ...props
}: BaseButtonProps) {
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

  const content = useMemo(() => {
    if (loading)
      return <ActivityIndicator size="large" color={styles.loading.color} />;

    return children;
  }, [children, loading, styles.loading.color]);

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
        {content}
      </Pressable>
      {disabled ? <View style={styles.disabled} /> : null}
    </View>
  );
}

export default BaseButton;
