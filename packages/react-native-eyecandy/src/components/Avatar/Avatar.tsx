import React from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
  View,
} from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

import { ms } from '../../utils';

export interface AvatarProps extends Omit<ImageBackgroundProps, 'source'> {
  size?: number;
  fallbackComponent?: React.ReactNode;
  fallback?: boolean;
  source?: ImageBackgroundProps['source'];
}

function Avatar({
  size = ms(64),
  style,
  fallbackComponent,
  fallback,
  source,
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

  // TODO: Remove fallback.
  if (fallback && fallbackComponent)
    return (
      <View style={[dynamicStyles.container, styles.container, style]}>
        {fallbackComponent}
      </View>
    );

  if (!source)
    return (
      <View style={[dynamicStyles.container, styles.container, style]}>
        {fallbackComponent}
      </View>
    );

  return (
    <ImageBackground
      source={source}
      style={[dynamicStyles.container, styles.container, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Avatar;
