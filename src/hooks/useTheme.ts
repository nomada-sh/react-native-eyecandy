import { useContext } from 'react';

import { EyeCandyContext } from '../context/EyeCandy';

export default function useTheme() {
  return useContext(EyeCandyContext);
}
