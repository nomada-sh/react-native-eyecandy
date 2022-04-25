import React, { useRef } from 'react';
import { ScrollView } from 'react-native';

import {
  Body,
  Button,
  NativeSelect,
  NativeSelectHandle,
  NativeSelectItem,
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

const items3: NativeSelectItem<string>[] = [
  ...Array.from({ length: 10 }, (_, i) => ({
    label: `Option ${i}`,
    value: `option${i}`,
  })),
];

const items4: NativeSelectItem<string>[] = [
  ...Array.from({ length: 10 }, (_, i) => ({
    label: `Option ${i}`,
    value: `option${i}`,
  })),
];

export default function Selects() {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  const [value2, setValue2] = React.useState<string | undefined>('option0');
  const [value3, setValue3] = React.useState<string | undefined>(undefined);
  const [value4, setValue4] = React.useState<string | undefined>('option0');

  const ref = useRef<SelectHandle>(null);
  const nativeref = useRef<NativeSelectHandle>(null);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Body size="xlarge" weight="bold" marginBottom={20}>
        Select
      </Body>
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
        marginBottom={20}
        onPress={() => {
          ref.current?.focus();
        }}
      >
        Open select
      </Button>
      <Body size="xlarge" weight="bold" marginBottom={20}>
        NativeSelect
      </Body>
      <NativeSelect
        value={value3}
        marginBottom={20}
        icon={Crown}
        items={items3}
        onChange={setValue3}
      />
      <NativeSelect
        value={value4}
        onChange={setValue4}
        items={items4}
        ref={nativeref}
        marginBottom={20}
        icon={Star}
      />
      <Button
        onPress={() => {
          nativeref.current?.focus();
        }}
      >
        Open native select
      </Button>
    </ScrollView>
  );
}
