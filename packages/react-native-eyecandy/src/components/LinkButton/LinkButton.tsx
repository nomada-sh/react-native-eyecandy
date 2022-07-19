import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';

import {
  ChevronRight,
  IconProps,
} from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme, useColors } from '@nomada-sh/react-native-eyecandy-theme';

import { usePressableStyles } from '../../hooks';
import { Body } from '../../typography';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';

export interface LinkButtonProps extends ButtonBaseProps {
  icon?: React.ComponentType<IconProps> | React.ReactElement<any>;
  text?: string;
  children?: string;
  showChevronRight?: boolean;
  bold?: boolean;
  focused?: boolean;
}

function LinkButton({
  text,
  children,
  icon: Icon,
  pressableStyle,
  color = 'default',
  showChevronRight = true,
  bold,
  focused,
  ...props
}: LinkButtonProps) {
  const { palette } = useTheme();
  const colors = useColors(c => c.button[color]);

  const buttonStyles = usePressableStyles([
    styles.button,
    pressableStyle,
    {
      borderColor: focused ? palette.primary[500] : colors.background,
    },
  ]);

  const textStyle: TextStyle = {
    color: colors.foreground,
    fontWeight: bold ? 'bold' : 'normal',
  };

  const icon = Icon ? (
    React.isValidElement(Icon) ? (
      Icon
    ) : (
      <Icon
        style={styles.icon}
        size={20}
        stroke={focused ? palette.primary[500] : (textStyle.color as string)}
      />
    )
  ) : null;

  return (
    <ButtonBase color={color} pressableStyle={buttonStyles} {...props}>
      {icon}
      <Body style={[textStyle, styles.text]}>{children ?? text}</Body>
      {showChevronRight ? <ChevronRight color="greyout" size={20} /> : null}
    </ButtonBase>
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
