import * as icons from '@nomada-sh/react-native-eyecandy/icons';
import { View } from 'react-native';

export default function Icons() {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {Object.keys(icons).map(key => {
        const Icon = icons[key as keyof typeof icons];
        return <Icon key={key} />;
      })}
    </View>
  );
}
