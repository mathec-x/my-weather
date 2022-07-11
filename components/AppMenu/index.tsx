import React, { useState, SyntheticEvent, useTransition } from 'react';
import useLocalStorage from '@hooks/useLocalStorage';
import View from '@components/View';
import useLanguage from '@hooks/useLanguage';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, TextField } from '@mui/material';
import { useWindowSize } from 'usehooks-ts';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import { usePwa } from 'react-pwa-app';
import { Delete } from '@mui/icons-material';

const defaultState = {
  value: '',
  error: '',
  disabled: false
}

export default function AppMenu() {
  const lang = useLanguage();
  const [places, setPlaces] = useLocalStorage('places', [])
  const [units, setUnits] = useLocalStorage('units', 'imperial')
  const [mode, setMode] = useLocalStorage('theme', 'dark')
  const sizes = useWindowSize()
  const pwa = usePwa()

  const toggleUnits = () => {
    setUnits(units === 'imperial' ? 'metric' : 'imperial')
  }

  const toggleTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }

  const [input, setInput] = useState(defaultState);
  const [isPending, startTransition] = useTransition();

  const handleInput = (value: Partial<typeof input>) => {
    setInput({ ...input, ...value })
  }

  const dropPlace = React.useCallback((id: any) => {
    setPlaces(places.filter(place => place.id !== id))

  }, [places])

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleInput({ disabled: true })

    const response = await fetch(`/api/weather?q=${input.value}&lang=${lang}&units=${units}`);
    handleInput({ disabled: false })

    if (response.ok) {
      const result = await response.json() as any;
      if (places.findIndex(place => place.id === result.id) !== -1) {
        handleInput({ error: "ERROR: DUPLICATED ENTRY" })
      } else {
        setPlaces([...places, result]);
        startTransition(() => {
          if (!isPending) {
            setInput(defaultState);
          }
        });
      }

    } else {
      handleInput({ error: "ERROR: " + response.statusText })
    }
  }
  return (
    <View>
      <List sx={{ width: '100%' }}>
        <ListSubheader>
          Register
        </ListSubheader>
        <ListItem>
          <ListItemButton component="label">
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText
              primary={
                <form onSubmit={handleSearch}>
                  <TextField
                    fullWidth
                    required
                    autoFocus
                    error={!!input.error}
                    value={input.value}
                    disabled={input.disabled}
                    onChange={({ target }) => handleInput({ error: '', value: target.value })}
                    type="text"
                    size="small"
                    variant="standard"
                    label="Add place"
                    helperText={"Eg: city, state." + input.error}
                  />
                </form>
              }
            >
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListSubheader>
          Accessibility
        </ListSubheader>
        <ListItem>
          <ListItemButton disabled={!pwa.supports} onClick={pwa.install as any}>
            <ListItemIcon>
              {sizes.width < 933
                ? <InstallMobileIcon />
                : <InstallDesktopIcon />}
            </ListItemIcon>
            <ListItemText
              primary={`Install`}
              secondary="Get this pwa app"
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={toggleUnits}>
            <ListItemIcon>
              <ThermostatAutoIcon />
            </ListItemIcon>
            <ListItemText
              primary={units === 'imperial' ? 'Fahrenheit' : 'Celsius'}
              secondary="Choose celsius or fahrenheit"
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={toggleTheme}>
            <ListItemIcon>
              {mode === 'light'
                ? <LightModeIcon />
                : <DarkModeIcon />}
            </ListItemIcon>
            <ListItemText
              primary={`mode: ${mode}`}
              secondary="Switch between light and dark mode"
            />
          </ListItemButton>
        </ListItem>

        {places.length > 0 && <>
          <ListSubheader>
            Drop
          </ListSubheader>
          {places.map((place) =>
            <ListItem key={`drop-${place.id}`}>
              <ListItemButton onClick={() => dropPlace(place.id)}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText
                  primary={<>{place.name}, {place.sys.country}</>}
                />
              </ListItemButton>
            </ListItem>
          )}
        </>}
      </List>
    </View>
  )
}