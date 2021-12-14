import React from 'react';
import {
  Button,
  Check,
  IconButton,
  LinkButton,
  TextInput,
  Avatar,
  AvatarEdit,
  Select,
  SearchInput,
  CodeInput,
  Menu,
  MenuItem,
  Card,
} from '@nomada-sh/react-native-eyecandy/components';
import { Body } from '@nomada-sh/react-native-eyecandy/typography';
import { View } from 'react-native';

import * as icons from '@nomada-sh/react-native-eyecandy/icons';

export default function Components() {
  return (
    <View>
      <Button text="Button" />
      <LinkButton icon={icons.Mail} text="LinkButton" />
      <TextInput
        startIcon={icons.User}
        endIcon={icons.Camera}
        placeholder="Placeholder"
      />
      <TextInput
        startIcon={icons.Lock}
        placeholder="Password"
        secureTextEntry
        showSecureTextEntryToggle
      />
      <SearchInput placeholder="Search" />
      <CodeInput length={4} onFinish={() => {}} />
      <Select
        icon={icons.User}
        items={[
          {
            label: 'Item 1',
            value: 'item1',
          },
          {
            label: 'Item 2',
            value: 'item2',
          },
        ]}
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Object.keys(icons).map(key => {
          const Icon = icons[key as keyof typeof icons];
          return <IconButton key={key} icon={Icon} />;
        })}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Check value={true} />
        <Check value={false} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Avatar
          source={{
            uri: 'https://avatars0.githubusercontent.com/u/1234?s=460&v=4',
          }}
        />
        <AvatarEdit
          source={{
            uri: 'https://avatars0.githubusercontent.com/u/1234?s=460&v=4',
          }}
        />
      </View>
      <Menu
        style={{
          padding: 20,
        }}
      >
        <MenuItem icon={icons.Crown} text="MenuItem" separator />
        <MenuItem icon={icons.Camera} text="MenuItem" separator />
        <MenuItem icon={icons.Edit} text="MenuItem" />
      </Menu>
      <Card>
        <Body
          style={{
            margin: 40,
          }}
        >
          Card
        </Body>
      </Card>
    </View>
  );
}
