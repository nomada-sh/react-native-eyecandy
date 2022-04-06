import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { CheckList, CheckListOption } from '@nomada-sh/react-native-eyecandy';

const options = [
  {
    id: '1',
    title: 'Option 1',
    description: 'Option 1 description',
    value: 'Option 1',
    image: {
      uri: 'https://picsum.photos/200/200',
    },
  },
  {
    id: '2',
    title: 'Option 2',
    description: 'Option 2 description',
    value: 'Option 2',
  },
  {
    id: '3',
    title: 'Option 3',
    description: 'Option 3 description',
    value: 'Option 3',
    image: {
      uri: 'https://picsum.photos/300/300',
    },
  },
  {
    id: '4',
    title: 'Option 4',
    description: 'Option 4 description',
    value: 'Option 4',
  },
];

export default function CheckLists() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <ScrollView>
      <CheckList
        maxSelected={2}
        selected={selected}
        onSelectedChange={setSelected}
        style={{
          padding: 20,
        }}
      >
        {options.map(option => (
          <CheckListOption key={option.id} {...option} />
        ))}
      </CheckList>
    </ScrollView>
  );
}
