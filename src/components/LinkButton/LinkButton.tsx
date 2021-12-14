import React, { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import BaseButton, { BaseButtonProps } from '../BaseButton';
import { usePressableStyles, useTheme } from '../../hooks';
import { ChevronRight } from '../../icons';
import { Body } from '../../typography';

export interface LinkButtonProps extends BaseButtonProps {
  icon?: FC<{
    size?: number;
    stroke?: string;
    style?: StyleProp<ViewStyle>;
  }>;
  text: string;
}

function LinkButton({
  text,
  icon,
  buttonStyle,
  disabled,
  color = 'default',
  ...props
}: LinkButtonProps) {
  const { components } = useTheme();
  const colors = components.button[color];

  const Icon = icon;

  const buttonStyles = usePressableStyles([styles.button, buttonStyle]);

  const textStyle = {
    opacity: disabled ? 0.5 : 1,
    color: colors.foreground,
  };

  return (
    <BaseButton
      color={color}
      buttonStyle={buttonStyles}
      disabled={disabled}
      {...props}
    >
      {Icon ? (
        <Icon
          style={[textStyle, styles.icon]}
          size={20}
          stroke={textStyle.color}
        />
      ) : null}
      <Body style={[textStyle, styles.text]}>{text}</Body>
      <ChevronRight style={textStyle} color="grey" size={20} />
    </BaseButton>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  text: {
    flex: 1,
    marginEnd: 16,
  },
  icon: {
    marginEnd: 16,
  },
});

export default LinkButton;
