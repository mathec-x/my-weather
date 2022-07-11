import React from 'react'
import Box from '@mui/material/Box';
import View from '@components/View';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import LineChart from '@components/Chart/Line';
import type { WeatherResponse } from '@typeroots/weather'

const ColoredPaper: React.FC<{
  children: JSX.Element;
  title: string;
  linear: string
}> = (props) => {
  return (
    <Paper
      sx={{
        p: 2,
        minWidth: 70,
        height: 100,
        color: 'white',
        backgroundImage: `linear-gradient(${props.linear})`
      }}
    >
      <Typography variant="subtitle2" fontSize={10}>{props.title}</Typography>
      {props.children}
    </Paper>
  )
}

interface MainWeatherProps {
  place: WeatherResponse
  setFormat: (value: number) => string | undefined
  index: number
}

const MainWeather: React.FC<MainWeatherProps> = ({ place, index, setFormat }) => {

  const day = React.useMemo(() => {
    return place.daily?.[index]

  }, [place, index])

  return (
    <View>
      {place?.weather.map((weather) =>
        <React.Fragment key={`${place.id}-${weather.id}`}>
          <Box
            width='100%'
            textAlign='center'
            p={2}
          >
            <Image width={125} height={125} src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
            <Typography variant="subtitle1">{weather.description}</Typography>
            <Typography variant="subtitle2" fontSize={32}>
              {setFormat(place.main.temp)}º
            </Typography>
            <Typography>
              min: {setFormat(place.main.temp_min)}º/ max: {setFormat(place.main.temp_max)}º
            </Typography>
            <Typography variant="caption">{place?.day} {place.name}, {place.sys.country}</Typography>
          </Box>
          {day &&
            <Box
              display="flex"
              justifyContent="space-around"
              width='100%'
              textAlign='center'
              p={2}
            >
              <ColoredPaper title="morn" linear="blue, #1cafe9">
                <Typography>
                  {setFormat(day.temp.morn)}º
                </Typography>
              </ColoredPaper>
              <ColoredPaper title="day" linear="red, #f06d06">
                <Typography>
                  {setFormat(day.temp.day)}º
                </Typography>
              </ColoredPaper>
              <ColoredPaper title="even" linear="purple, #7b15ab">
                <Typography>
                  {setFormat(day.temp.eve)}º
                </Typography>
              </ColoredPaper>
              <ColoredPaper title="night" linear="black, #503c59">
                <Typography>
                  {setFormat(day.temp.night)}º
                </Typography>
              </ColoredPaper>
            </Box>
          }
          <LineChart
            labels={["date", "min", "max"]}
            values={place.daily?.map((x) => ([
              new Date(x.dt * 1000),
              x.temp.min,
              x.temp.max
            ]))}
            options={{
              backgroundColor: 'transparent',
              colors: ["#aaa", "#aaa"],
              chartArea: { width: '90%' },
              vAxis: {
                gridlines: { count: 1 }
              }
            }}
          />
        </React.Fragment>
      )}
    </View>
  )
}

export default MainWeather