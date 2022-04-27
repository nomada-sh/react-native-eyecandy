import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';

import { SwipeButton } from '@nomada-sh/react-native-eyecandy';

export default function Buttons() {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <SwipeButton
          marginBottom={20}
          width={width - 40}
          onSuccess={() => Alert.alert('Success')}
          onFail={() => Alert.alert('Fail')}
        />
        <SwipeButton marginBottom={20} width={width - 40} height={100} />
        <SwipeButton width={width - 40} height={100} padding={20} />
      </ScrollView>
    </SafeAreaView>
  );
}
