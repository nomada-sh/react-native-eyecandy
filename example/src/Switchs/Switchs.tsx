import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Switch } from '@nomada-sh/react-native-eyecandy';

export default function Switchs() {
  const [value, setValue] = React.useState(false);

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
        <Switch value={value} onValueChange={setValue} />
      </ScrollView>
    </SafeAreaView>
  );
}
