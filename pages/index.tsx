import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useWeather from '@hooks/useWeather';
import MainWeather from '@components/MainWeather';
import RegisterPlace from '@components/AppMenu';
import MenuIcon from '@mui/icons-material/Menu'
import BottomBar from '@components/BottomBar';
// @ts-ignore
import SwipeableViews from 'react-swipeable-views';

const Home: React.FC = () => {
  const { handleChange, setFormat, tab, places } = useWeather()
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    handleChange(places.length)
    setIndex(0);

  }, [places.length])

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Tabs variant='scrollable' value={tab} onChange={(_, value) => handleChange(value)}>
        <Tab value={0} label={<MenuIcon />} />
        {places.map((place, i) =>
          <Tab
            key={`tab-${place.id}`}
            value={i + 1}
            label={<Typography variant='subtitle2' fontSize={10}>{place.name}, {place.sys.country}</Typography>}
          />
        )}
      </Tabs>
      <SwipeableViews index={tab} onChangeIndex={handleChange}>
        <RegisterPlace />
        {places.map((place) =>
          <MainWeather
            key={`content-${place.id}`}
            index={index}
            place={place}
            setFormat={setFormat}
          />)}
      </SwipeableViews>
      <BottomBar
        place={places[tab - 1]}
        value={index}
        onChange={setIndex}
      />
    </Grid>
  )
}

export default Home