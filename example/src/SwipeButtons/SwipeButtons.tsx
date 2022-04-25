import React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';

import { SwipeButton } from '@nomada-sh/react-native-eyecandy';

export default function Buttons() {
  const { width } = useWindowDimensions();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <SwipeButton width={width - 40} />
      <SwipeButton width={width - 40} height={100} />
      <SwipeButton width={width - 40} height={100} padding={20} />
    </ScrollView>
  );
}
