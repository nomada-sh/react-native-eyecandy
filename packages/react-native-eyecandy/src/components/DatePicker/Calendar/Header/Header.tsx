import React, { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import type { Locale } from 'date-fns';

import { Body } from '../../../../typography';

export interface HeaderProps {
  locale?: Locale;
  month?: number;
  year?: number;
  debug?: boolean;
}

const EN_NAMES = 'SMTWTFS'.split('');
const ES_NAMES = 'DLMMJVS'.split('');

function Header({ debug, locale, month, year }: HeaderProps) {
  const count = useRef(1);
  debug &&
    console.log(
      'HEADER',
      `${month}/${year},`,
      'RENDER COUNT:',
      count.current++,
    );

  const names = useMemo(() => {
    if (locale) {
      const code = locale.code ?? 'en';

      if (/^es(-[A-Za-z]{2})?$/.test(code)) {
        return ES_NAMES;
      }

      if (/^en(-[A-Za-z]{2})?$/.test(code)) {
        return EN_NAMES;
      }
    }

    return EN_NAMES;
  }, [locale]);

  return (
    <View style={styles.container}>
      {names.map((name, index) => {
        return (
          <Body
            weight="bold"
            color="greyout"
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
