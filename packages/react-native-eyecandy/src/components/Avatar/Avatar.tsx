import React from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
} from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

import { ms } from '../../utils';

export interface AvatarProps extends ImageBackgroundProps {
  size?: number;
}

function Avatar({ size = ms(64), style, ...props }: AvatarProps) {
  const { dark, palette } = useTheme();

  return (
    <ImageBackground
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: palette.grey[dark ? 800 : 100],
        },
        styles.container,
        style,
      ]}
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
