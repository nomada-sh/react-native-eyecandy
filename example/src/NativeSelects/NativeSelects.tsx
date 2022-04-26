import React, { useRef } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import {
  Button,
  NativeSelect,
  NativeSelectHandle,
  NativeSelectItem,
} from '@nomada-sh/react-native-eyecandy';
import { Crown, Star } from '@nomada-sh/react-native-eyecandy-icons';

const items1: NativeSelectItem<string>[] = [
  ...Array.from({ length: 100 }, (_, i) => ({
    label: `Option ${i}`,
    value: `option${i}`,
  })),
];

const items2: NativeSelectItem<string>[] = [
  ...Array.from({ length: 10 }, (_, i) => ({
    label: `Option ${i}`,
    value: `option${i}`,
  })),
];

export default function Selects() {
  const [v1, setV1] = React.useState<string | undefined>(undefined);
  const [v2, setV2] = React.useState<string | undefined>('option0');

  const ref = useRef<NativeSelectHandle>(null);

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
        <NativeSelect
          value={v1}
          marginBottom={20}
          icon={Crown}
          items={items1}
          onChange={setV1}
        />
        <NativeSelect marginBottom={20} ref={ref} emptyText="Empty" />
        <NativeSelect
          value={v2}
          onChange={setV2}
          items={items2}
          ref={ref}
          marginBottom={20}
          icon={Star}
        />
        <Button
          onPress={() => {
            ref.current?.focus();
          }}
        >
          Open select
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
