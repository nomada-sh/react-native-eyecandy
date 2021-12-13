import { createTheme } from '../utilities';

export default createTheme({
  dark: true,
  components: {
    button: {
      default: {
        background: 'blue',
      },
      primary: {
        background: '#ff0000',
      },
    },
    input: {
      default: {
        focused: {
          background: '#fafafa',
          indicator: 'red',
        },
      },
    },
  },
});
