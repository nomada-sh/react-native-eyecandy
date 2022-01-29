import React, {useMemo} from 'react';
import {Animated} from 'react-native';

import {Body} from '../../typography';

type Error = [boolean | undefined | null, string];

export interface TextInputErrorsProps {
  errors?: Error[];
  error?: Error;
}

function TextInputErrors({errors = [], error}: TextInputErrorsProps) {
  const isEmpty = useMemo(
    () => !errors.length && !error,
    [errors.length, error],
  );

  const containerStyle = useMemo(
    () => ({
      marginTop: isEmpty ? 0 : 4,
      marginLeft: isEmpty ? 0 : 12,
    }),
    [isEmpty],
  );

  return (
    <Animated.View style={containerStyle}>
      {error && error[0] && (
        <Body size="small" color="error">
          {error[1]}
        </Body>
      )}
      {errors.map(([e, message], index) =>
        e ? (
          <Body key={index} color="error" size="small">
            {message}
          </Body>
        ) : null,
      )}
    </Animated.View>
  );
}

export default TextInputErrors;
