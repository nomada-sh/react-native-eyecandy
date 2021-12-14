import React from 'react';
import {
  Button,
  RadioButton,
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
  Body,
  Icons as icons,
} from '@nomada-sh/react-native-eyecandy';
import { View } from 'react-native';

export default function Components() {
  const [value, setValue] = React.useState('');

  return (
    <View>
      <Button text="Button" />
      <Button text="Button Disabled" disabled />
      <Button color="primary" text="Button" />
      <Button color="primary" text="Button Disabled" disabled />
      <Button loading text="Button" />
      <Button color="primary" loading text="Button" />
      <LinkButton icon={icons.Mail} text="LinkButton" />
      <LinkButton icon={icons.Mail} text="LinkButton" disabled />
      <LinkButton
        icon={icons.Mail}
        text="LinkButton"
        disabled
        color="primary"
      />
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
      <SearchInput
        placeholder="Search"
        value={value}
        onChangeText={setValue}
        onPressCancel={() => setValue('')}
      />
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
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Object.keys(icons).map(key => {
          const Icon = icons[key as keyof typeof icons];
          return <IconButton key={key} icon={Icon} disabled />;
        })}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <RadioButton value={true} />
        <RadioButton value={false} />
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
      <Menu>
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
