import React from 'react'
import Image from 'next/image';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

import type { WeatherResponse } from '@typeroots/weather';

export interface BottomBarProps {
  place: WeatherResponse
  onChange?: (value: number) => void
  value?: number
}

const BottomBar: React.FC<BottomBarProps> = (props) => {

  const labels = React.useMemo(() => {
    return props.place
      ?.daily
      ?.slice(0, -1)
      ?.map(({ weather: [weather], ...e }) => ({
        icon: <Image width={25} height={25} src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />,
        text: e.day
      })) || []

  }, [props]);

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        "& .MuiBottomNavigationAction-root": {
          "@media (max-width: 768px)": {
            minWidth: "auto",
            padding: "6px 0"
          }
        }
      }}>
      <BottomNavigation
        showLabels
        value={props.value}
        onChange={(_, value) => props?.onChange && props.onChange(value)}>
        {labels.map(label =>
          <BottomNavigationAction
            key={`bottom-navigation-${label.text}`}
            label={label.text}
            icon={label.icon}
          />
        )}
      </BottomNavigation>
    </Paper>
  )
}

export default React.memo(BottomBar)