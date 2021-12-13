import type { ThemePalette } from '../typings';

export default function (dark: boolean = false): ThemePalette {
  return {
    background: {
      container: dark ? '#0f172a' : 'white',
      content: dark ? '#0f172a' : 'white',
    },
    foreground: {
      primary: dark ? '#f1f5f9' : '#0f172a',
      secondary: dark ? '#cbd5e1' : '#1e293b',
      disabled: '#64748b',
      hint: '#64748b',
    },
    divider: dark ? '#1e293b' : '#e2e8f0',
    primary: {
      100: '#f5f7ff',
      200: '#afb3ec',
      300: '#6068d9',
      400: '#4c55d5',
      500: '#3843d0',
    },
    secondary: {
      100: '#f3fbf9',
      200: '#daf4ed',
      300: '#c1ece2',
      400: '#9ee1d1',
      500: '#82d9c4',
    },
    success: {
      50: '#86EFAC',
      100: '#4ade80',
      200: '#22C55E',
    },
    warning: {
      50: '#FDE047',
      100: '#facc15',
      200: '#EAB308',
    },
    error: {
      50: '#FCA5A5',
      100: '#f75555',
      200: '#EF4444',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    white: '#ffffff',
    orange: '#f97316',
    purple: '#a855f7',
    pink: '#ec4899',
    teal: '#2dd4bf',
  };
}
