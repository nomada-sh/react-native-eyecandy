import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Body } from '../../../../typography';

export interface HeaderProps {
  lang?: 'en' | 'es' | null | false;
}

function Header({ lang }: HeaderProps) {
  const names = useMemo(() => {
    switch (lang) {
      case 'es':
        return ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
      default:
        return ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    }
  }, [lang]);

  useEffect(() => {
    console.log('Header: rerender');
  }, [names]);

  return (
    <View style={styles.container}>
      {names.map((name, index) => {
        return (
          <Body
            weight="bold"
            color="grey"
            align="center"
            key={index}
            style={styles.name}
          >
            {name}
          </Body>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  name: {
    width: '14.28%',
    height: 40,
    textAlignVertical: 'center',
  },
});

export default React.memo(Header);
