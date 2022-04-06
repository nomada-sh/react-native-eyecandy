import React from 'react';
import {
  StyleSheet,
  ViewProps,
  View,
  ImageSourcePropType,
  ImageBackground,
} from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { RectButton } from 'react-native-gesture-handler';

import { useRippleColor } from '../../hooks';
import { Body } from '../../typography';
import RadioButton from '../RadioButton';

export interface CheckListOptionProps<V = any>
  extends Omit<ViewProps, 'children' | 'id'> {
  title?: string;
  description?: string;
  value: V;
  selected?: boolean;
  id: string;
  onPress?: (props: { value: V; id: string }) => void;
  disabled?: boolean;
  image?: ImageSourcePropType;
}

function CheckListOption<V = any>({
  title,
  description,
  selected,
  style,
  id,
  value,
  onPress,
  disabled,
  image,
  ...props
}: CheckListOptionProps<V>) {
  const { dark, palette, colors } = useTheme();

  const defaultBackground = colors.background.default.container;
  const selectedBackground = dark ? palette.grey[800] : palette.primary[100];

  const backgroundColor = selected ? selectedBackground : defaultBackground;
  const borderColor = selected ? backgroundColor : colors.input.default.border;
  const rippleColor = useRippleColor(selectedBackground).string();

  return (
    <View
      style={[
        styles.root,
        style,
        {
          backgroundColor,
          borderColor,
        },
      ]}
      {...props}
    >
      <RectButton
        enabled={!disabled}
        rippleColor={rippleColor}
        onPress={() => onPress?.({ value, id })}
      >
        <View style={styles.container} accessible accessibilityRole="button">
          {image ? (
            <ImageBackground
              style={[styles.imageContainer, { backgroundColor: borderColor }]}
              source={image}
            />
          ) : null}
          <View style={styles.textsContainer}>
            <Body weight="bold">{title}</Body>
            <Body color="greyout">{description}</Body>
          </View>
          <RadioButton disabled value={selected} />
        </View>
      </RectButton>
      {disabled ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: borderColor,
              opacity: 0.4,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
  },
  container: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textsContainer: {
    flex: 1,
    marginEnd: 20,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginEnd: 20,
    overflow: 'hidden',
  },
});

export default CheckListOption;
