import React, { FC } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import BaseButton, { BaseButtonProps } from '../BaseButton';
import { useTheme, useColors } from '@nomada-sh/react-native-eyecandy-theme';
import { usePressableStyles } from '../../hooks';
import { ChevronRight } from '@nomada-sh/react-native-eyecandy-icons';
import { Body } from '../../typography';

export interface LinkButtonProps extends BaseButtonProps {
  icon?: FC<{
    size?: number;
    stroke?: string;
    style?: StyleProp<ViewStyle>;
  }>;
  text: string;
  showChevron?: boolean;
  bold?: boolean;
  focused?: boolean;
}

function LinkButton({
  text,
  icon,
  buttonStyle,
  color = 'default',
  showChevron = true,
  bold,
  focused,
  ...props
}: LinkButtonProps) {
  const { palette } = useTheme();
  const colors = useColors(c => c.button[color]);

  const Icon = icon;

  const buttonStyles = usePressableStyles([
    styles.button,
    buttonStyle,
    {
      borderColor: focused ? palette.primary[500] : colors.background,
    },
  ]);

  const textStyle: TextStyle = {
    color: colors.foreground,
    fontWeight: bold ? 'bold' : 'normal',
  };

  return (
    <BaseButton color={color} buttonStyle={buttonStyles} {...props}>
      {Icon ? (
        <Icon
          style={styles.icon}
          size={20}
          stroke={focused ? palette.primary[500] : (textStyle.color as string)}
        />
      ) : null}
      <Body style={[textStyle, styles.text]}>{text}</Body>
      {showChevron ? <ChevronRight color="greyout" size={20} /> : null}
    </BaseButton>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderWidth: 1,
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
