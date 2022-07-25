import React from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
  View,
} from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

import { ms } from '../../utils';

export interface AvatarProps extends ImageBackgroundProps {
  size?: number;
  fallbackComponent?: React.ReactNode;
  fallback?: boolean;
}

function Avatar({
  size = ms(64),
  style,
  fallbackComponent,
  fallback,
  ...props
}: AvatarProps) {
  const { dark, palette } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: palette.grey[dark ? 800 : 100],
    },
  });

  if (fallback && fallbackComponent)
    return (
      <View style={[dynamicStyles.container, styles.container, style]}>
        {fallbackComponent}
      </View>
    );

  return (
    <ImageBackground
      style={[dynamicStyles.container, styles.container, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default Avatar;
