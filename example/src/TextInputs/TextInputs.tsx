import React from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';

import { Body, TextInput } from '@nomada-sh/react-native-eyecandy';
import { Lock, Mail, User } from '@nomada-sh/react-native-eyecandy-icons';

export default function TextInputs() {
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          required
          iconLeft={User}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="name"
          placeholder="Name"
          marginBottom={20}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          required
          iconLeft={User}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="username"
          placeholder="Username"
          marginBottom={20}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          required
          iconLeft={Mail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          marginBottom={20}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          required
          iconLeft={Lock}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="password"
          placeholder="Password"
          showSecureTextEntryToggle
          secureTextEntry
          marginBottom={20}
          value={password}
          onChangeText={setPassword}
        />
        <View>
          {name ? (
            <Body weight="bold">
              Name: <Body weight="normal">{name}</Body>
            </Body>
          ) : null}
          {username ? (
            <Body weight="bold">
              Username: <Body weight="normal">{username}</Body>
            </Body>
          ) : null}
          {email ? (
            <Body weight="bold">
              Email: <Body weight="normal">{email}</Body>
            </Body>
          ) : null}
          {password ? (
            <Body weight="bold">
              Password: <Body weight="normal">{password}</Body>
            </Body>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
