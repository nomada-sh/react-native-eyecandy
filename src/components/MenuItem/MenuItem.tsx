import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import IconButton, { IconButtonProps } from '../IconButton';
import { ChevronRight } from '../../icons';
import { useRippleColor, useTheme } from '../../hooks';
import { Body } from '../../typography';

export interface MenuItemProps {
  text?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  icon?: IconButtonProps['icon'];
  iconColor?: string;
  iconBackgroundColor?: string;
  separator?: boolean;
}

function MenuItem({
  textColor,
  text,
  style,
  icon,
  iconColor,
  iconBackgroundColor,
  separator = false,
}: MenuItemProps) {
  const { palette } = useTheme();
  const rippleColor = useRippleColor(palette.background.container);

  return (
    <Pressable
      android_ripple={{
        color: rippleColor.string(),
      }}
      style={[
        {
          backgroundColor: palette.background.container,
        },
        styles.container,
        style,
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <IconButton
            variant="transparent-rounded"
            style={styles.icon}
            buttonStyle={{
              backgroundColor: iconBackgroundColor,
            }}
            disabled
            icon={icon}
            iconColor={iconColor}
            size={40}
            iconSize={22}
          />
        )}
        <Body
          style={styles.text}
          weight="bold"
          size="medium"
          customColor={textColor}
        >
          {text}
        </Body>
        <ChevronRight size={16} color="grey" />
      </View>
      {separator ? (
        <View
          style={[
            {
              backgroundColor: palette.divider,
            },
            styles.separator,
          ]}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    flex: 1,
  },
  icon: {
    marginEnd: 16,
  },
  separator: {
    height: 1,
    width: '100%',
  },
});

export default MenuItem;
