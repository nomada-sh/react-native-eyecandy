import React, { Suspense, useEffect, useState } from 'react';
import { StyleProp, View, StyleSheet, ViewStyle, Platform } from 'react-native';

// import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Body } from '../../typography';
import { Button, ButtonProps, ButtonStyles } from '../Button';

const MaskedViewWeb = (props: any) => {
  return <View {...props} />;
};

const MaskedView =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? React.lazy(() => import('@react-native-masked-view/masked-view'))
    : MaskedViewWeb;

export interface ProgressButtonStyles {
  container?: StyleProp<ViewStyle>;
  button?: ButtonStyles;
  ghostButton?: ButtonStyles;
}

export interface ProgressButtonProps
  extends Omit<
    ButtonProps,
    'style' | 'textStyle' | 'pressableStyle' | 'styles'
  > {
  progress?: number;
  style?: ProgressButtonStyles;
}

export function ProgressButton({
  progress: progressProp,
  disabled: disabledProp,
  hideDisabledOverlay: hideDisabledOverlayProp,
  height = 56,
  marginBottom,
  marginTop,
  style,
  fullwidth,
  ...props
}: ProgressButtonProps) {
  const [ghostButtonMounted, setGhostButtonMounted] = useState(true);
  const progress = progressProp !== undefined ? progressProp : 1;
  const p = useSharedValue(progress);

  useEffect(() => {
    p.value = withTiming(progress);
  }, [p, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${p.value * 100}%`,
    };
  });

  const disabled = disabledProp || progress < 1;
  const hideDisabledOverlay = progress < 1 || hideDisabledOverlayProp;

  useAnimatedReaction(
    () => p.value,
    p => runOnJS(setGhostButtonMounted)(p < 1),
    [],
  );

  const ghostButton = (
    <Button
      height={height}
      style={{
        opacity: 0.5,
      }}
      disabled
      hideDisabledOverlay
      styles={style?.ghostButton}
      {...props}
    />
  );

  // TODO: Define fallback for web.
  return (
    <Suspense fallback={<Body>Loading ProgressButton...</Body>}>
      <View
        style={[
          {
            marginBottom,
            marginTop,
            height,
            width: fullwidth ? '100%' : undefined,
            flex: 1,
          },
          style?.container,
        ]}
      >
        {ghostButtonMounted ? ghostButton : null}
        <MaskedView
          style={[
            StyleSheet.absoluteFill,
            {
              flex: 1,
            },
          ]}
          androidRenderingMode="software"
          maskElement={
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}
            >
              <Animated.View
                style={[
                  {
                    height: '100%',
                    backgroundColor: 'black',
                  },
                  animatedStyle,
                ]}
              />
            </View>
          }
        >
          <Button
            height={height}
            hideDisabledOverlay={hideDisabledOverlay}
            disabled={disabled}
            styles={style?.button}
            {...props}
          />
        </MaskedView>
      </View>
    </Suspense>
  );
}
