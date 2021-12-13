import type { ThemeComponents, ThemeVariables } from '../typings';

import Button from './Button';
import Input from './Input';
import Switch from './Switch';
import Text from './Text';

export default function (variables: ThemeVariables): ThemeComponents {
  return {
    button: Button(variables),
    input: Input(variables),
    text: Text(variables),
    toggle: Switch(variables),
  };
}
