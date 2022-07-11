import React from 'react'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import useLocalStorage from '@hooks/useLocalStorage';
import CssBaseline from '@mui/material/CssBaseline';

const Theme: React.FC<{ children: React.ReactNode }> = (props) => {
  const [mode] = useLocalStorage('theme', "dark")
  const theme = useTheme();

  const config = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: mode,
        primary: {
          main: '#555'
        },
        secondary: {
          main: '#1cafe9'
        }
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            "body": {
              bgcolor: 'paper',
              margin: 0
            }
          }
        },
        MuiAvatar: {
          styleOverrides: {
            root: {
              bgcolor: 'primary.main'
            },
          },
        },
        MuiListItemIcon: {
          styleOverrides: {
            root: {
              paddingBlockEnd: 0,
            },
          },
        },
        MuiListSubheader: {
          styleOverrides: {
            root: {
              backgroundColor: 'transparent',
            },
          },
        },
      }
    });
  }, [mode]);

  return (
    <React.Fragment>
      <ThemeProvider theme={config}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Theme
