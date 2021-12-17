import React, { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { Body } from '../../../../typography';

export interface HeaderProps {
  lang?: 'en' | 'es' | null | false;
  month?: number;
  year?: number;
  debug?: boolean;
}

function Header({ debug, lang, month, year }: HeaderProps) {
  const count = useRef(1);
  debug &&
    console.log(
      'HEADER',
      `${month}/${year},`,
      'RENDER COUNT:',
      count.current++,
    );

  const names = useMemo(() => {
    switch (lang) {
      case 'es':
        return 'DLMMJVS'.split('');
      default:
        return 'SMTWTFS'.split('');
    }
  }, [lang]);

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
