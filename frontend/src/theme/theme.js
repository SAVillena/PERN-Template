import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'light'
        ? {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
          }
        : {
            main: '#90caf9',
            light: '#bbdefb',
            dark: '#64b5f6',
          }),
    },
    secondary: {
      main: '#f44336',
    },
    ...(mode === 'light'
      ? {
          background: {
            default: '#fafafa',
            paper: '#ffffff',
          },
          text: {
            primary: '#000000',
            secondary: '#666666',
          },
        }
      : {
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
          },
          divider: 'rgba(255, 255, 255, 0.12)',
        }),
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          ...(mode === 'dark' && {
            backgroundColor: '#1e1e1e',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }),
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          ...(mode === 'dark' && {
            backgroundColor: '#1e1e1e',
            backgroundImage: 'none',
          }),
        },
      },
    },
  },
});

export const createMyTheme = (mode) => createTheme(getDesignTokens(mode));
