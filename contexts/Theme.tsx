import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useLocalStorage from '@hooks/useLocalStorage';

const Theme: React.FC<{ children: React.ReactNode }> = (props) => {
  const [mode, setMode] = useLocalStorage('theme', "light")

  const theme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: mode,
        primary: {
          main: '#393939'
        },
      },
    })

  }, [mode]);

  return (
    <ThemeProvider theme={theme} {...props} />
  )
}

export default Theme
