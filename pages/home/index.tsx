import useLocalStorage from '@hooks/useLocalStorage'
import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import View from '@components/View';
// @ts-ignore
import SwipeableViews from 'react-swipeable-views';

const Home: React.FC = () => {
  const [places, setPlaces] = useLocalStorage('places', [])
  const [index, setIndex] = React.useState(0);

  const handleChangeIndex = (event, value: number) => {
    setIndex(value);
  };

  return (
    <Grid item xs={12} md={6} lg={3}>
      <Tabs value={index} onChange={handleChangeIndex}>
        {places.map((place, i) =>
          <Tab value={i} label={place.name} key={`tab-${place.id}`} />
        )}
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        {places.map((place) =>
          <View key={`content-${place.id}`}>
            {place.name}
          </View>
        )}
      </SwipeableViews>
    </Grid>
  )
}

export default Home