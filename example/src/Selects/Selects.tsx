import React, { useRef } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';

import {
  Button,
  Select,
  SelectHandle,
  SelectItem,
} from '@nomada-sh/react-native-eyecandy';
import { Crown, Star } from '@nomada-sh/react-native-eyecandy-icons';

const items1: SelectItem<string>[] = [
  ...Array.from({ length: 100 }, (_, i) => ({
    label: `Option ${i}`,
    value: `option${i}`,
    icon: Crown,
  })),
];

const items2: SelectItem<string>[] = [
  ...Array.from({ length: 10 }, (_, i) => ({
    label: `Option ${i}`,
    value: `option${i}`,
    icon: Star,
  })),
];

export default function Selects() {
  const [v1, setV1] = React.useState<string | undefined>(undefined);
  const [v2, setV2] = React.useState<string | undefined>('option0');

  const ref = useRef<SelectHandle>(null);

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
        <Select
          marginBottom={20}
          modalTitle="Select an option"
          placeholder="Select an option"
          icon={Crown}
          value={v1}
          items={items1}
          onChange={setV1}
        />
        <Select
          marginBottom={20}
          modalTitle="Select an item"
          emptyText="Empty"
        />
        <Select
          marginBottom={20}
          ref={ref}
          icon={Star}
          value={v2}
          items={items2}
          onChange={setV2}
          hideClearIcon
        />
        <Button
          marginBottom={20}
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
