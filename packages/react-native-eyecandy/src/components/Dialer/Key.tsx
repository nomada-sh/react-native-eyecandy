import React from 'react';
import { View } from 'react-native';

import { Backspace } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

import { Body } from '../../typography';
import { ButtonBase } from '../ButtonBase';

// TODO: Make this work.
// const AnimatedBackspace = Animated.createAnimatedComponent(Backspace);

export interface KeyProps {
  keyValue: string | null;
  isDeleteKey: boolean;
  isEmptyKey: boolean;
  hideDeleteKey: boolean;
  onPressIn: () => void;
  onPressOut: () => void;
  row: number;
  col: number;
  testID?: string;
  testIDPrefix?: string;
}

export function Key({
  keyValue,
  isDeleteKey,
  isEmptyKey,
  hideDeleteKey,
  onPressIn,
  onPressOut,
  testID,
  testIDPrefix,
}: KeyProps) {
  const { colors } = useTheme();
  const backgroundColor = colors.button.default.background;

  const visible = !(
    (isEmptyKey && keyValue === null) ||
    (isDeleteKey && hideDeleteKey)
  );

  return (
    <View
      testID={
        testIDPrefix ? `${testIDPrefix}-${keyValue}-container` : undefined
      }
      style={{
        flex: 1,
        alignItems: 'center',
        margin: 4,
      }}
    >
      {visible ? (
        <ButtonBase
          testID={testID}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            backgroundColor,
          }}
        >
          {isDeleteKey && keyValue === null ? (
            <Backspace
              style={{
                transform: [{ translateX: -1 }],
              }}
            />
          ) : (
            <Body size={18} weight="bold">
              {keyValue}
            </Body>
          )}
        </ButtonBase>
      ) : null}
    </View>
  );
}
