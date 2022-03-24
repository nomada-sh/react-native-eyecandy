import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import RadioButton from '../RadioButton';
import { Body } from '../../typography';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';
import { RectButton } from 'react-native-gesture-handler';

export interface RadioGroupItemProps<V> {
  testID?: string;
  value: V;
  label: string;
  selected?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  numberOfLines?: number;
}

function RadioGroupItem<V>({
  testID,
  label,
  selected,
  onPress,
  containerStyle,
  style,
  numberOfLines = 1,
}: RadioGroupItemProps<V>) {
  const { dark, palette } = useTheme();

  const backgroundColor = Color(palette.grey[dark ? 800 : 100])
    .alpha(0.5)
    .string();

  const rippleColor = Color(palette.grey[dark ? 100 : 800])
    .alpha(0.2)
    .string();

  const borderColor = selected ? palette.primary[500] : 'transparent';

  return (
    <View
      testID={testID}
      style={[
        styles.root,
        {
          backgroundColor,
          borderColor,
        },
        containerStyle,
      ]}>
      <RectButton
        testID={`${testID}-button`}
        rippleColor={rippleColor}
        onPress={onPress}>
        <View
          style={[styles.button, style]}
          accessible
          accessibilityRole="button">
          <RadioButton value={selected} />
          <Body
            testID={`${testID}-label`}
            size="small"
            weight="bold"
            style={styles.label}
            numberOfLines={numberOfLines}>
            {label}
          </Body>
        </View>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    marginTop: 4,
  },
});

export default RadioGroupItem;
