import React, { useRef } from 'react';
import { ScrollView } from 'react-native';

import {
  Button,
  Select,
  SelectHandle,
  SelectItem,
} from '@nomada-sh/react-native-eyecandy';
import { Crown, Star } from '@nomada-sh/react-native-eyecandy-icons';

const items: SelectItem<string>[] = [
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
  const [value, setValue] = React.useState<string | undefined>(undefined);
  const [value2, setValue2] = React.useState<string | undefined>('option0');

  const ref = useRef<SelectHandle>(null);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Select
        marginBottom={20}
        modalTitle="Select an item"
        icon={Crown}
        value={value}
        items={items}
        onChange={setValue}
      />
      <Select marginBottom={20} modalTitle="Select an item" />
      <Select
        marginBottom={20}
        ref={ref}
        icon={Star}
        value={value2}
        items={items2}
        onChange={setValue2}
        hideClearIcon
      />
      <Button
        onPress={() => {
          ref.current?.focus();
        }}
      >
        Open select
      </Button>
    </ScrollView>
  );
}
