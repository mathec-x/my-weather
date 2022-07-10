import React, { useState, SyntheticEvent } from 'react';
import { FormControl, Grid, TextField } from '@mui/material';
import useLocalStorage from '@hooks/useLocalStorage';
import View from '@components/View';
import Head from 'next/head';

export default function Register() {

  const [places, setPlaces] = useLocalStorage('places', [])

  const [input, setInput] = useState({
    value: '',
    error: '',
    disabled: false
  });

  const handleInput = (value: Partial<typeof input>) => {
    setInput({ ...input, ...value })
  }

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleInput({ disabled: true })

    const response = await fetch(`/api/weather?q=${input.value}`);
    handleInput({ disabled: false })
    if (response.ok) {
      const result = await response.json() as any;
      if (places.findIndex(place => place.id === result.id) !== -1) {
        handleInput({ error: "ERROR: DUPLICATED ENTRY" })
      } else {
        setPlaces([...places, result])
      }

    } else {
      handleInput({ error: "ERROR: " + response.statusText })
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Register Place</title>
      </Head>
      <Grid item xs={12} md={6} lg={3}>
        <View>
          <FormControl
            fullWidth
            component="form"
            onSubmit={handleSearch}>
            <TextField
              autoFocus
              error={!!input.error}
              value={input.value}
              disabled={input.disabled}
              onChange={({ target }) => handleInput({ error: '', value: target.value })}
              variant="standard"
              label="Find your place"
              helperText={"Eg: city, state." + input.error}
            />
          </FormControl>
        </View>
      </Grid>
    </React.Fragment>
  )
}