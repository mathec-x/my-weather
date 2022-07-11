import { OneCallResponse } from '@typeroots/weather';
import React, { startTransition } from 'react'
import useLanguage from './useLanguage'
import useLocalstorage from './useLocalStorage'

const useWeather = () => {
  const lang = useLanguage();
  const [tab, setTab] = useLocalstorage('tab', 0)
  const [places, setPlaces] = useLocalstorage('places', [])
  const [units] = useLocalstorage('units', 'imperial')

  const setFormat = React.useCallback((value?: number) => {
    if (lang && value) {
      return new Intl.NumberFormat(lang, { maximumFractionDigits: 0 }).format(value)
    }
  }, [lang])

  /**
   * @todo use place sunrise & sunset in the future
   */
  const getCurrentPos = (date: number) => {
    let hours = new Date(date * 1000).getHours()

    if (hours >= 20) return 'night'
    if (hours >= 15) return 'eve'
    if (hours >= 10) return 'day'
    if (hours >= 5) return 'morn'

    return 'night'
  };

  const handleChange = React.useCallback((index: number, retry = 0) => {
    const place = places?.[index - 1]

    if (place) {
      const queryParams = `/api/onecall?lat=${place.coord.lat}&lon=${place.coord.lon}&lang=${lang}&units=${units}`
      setTab(index)
      startTransition(() => {
        if (place) {
          fetch(queryParams)
            .then(e => e.json())
            .then((response: OneCallResponse) => {

              place.day = new Date(response.current.dt * 1000).toLocaleDateString(lang, { weekday: 'long' })

              place.weather = response.current.weather
              place.main.temp = response.current.temp;
              place.main.temp_min = response.daily[0].temp.min;
              place.main.temp_max = response.daily[0].temp.max;
              place.main.feels_like = response.current.feels_like;
              place.main.pressure = response.current.pressure;
              place.main.humidity = response.current.humidity;
              place.wind.deg = response.current.wind_deg;
              place.wind.gust = response.current.wind_gust;
              place.wind.speed = response.current.wind_speed;
              place.clouds = {
                all: response.current.clouds
              }

              place.daily = response.daily.map(e => ({
                ...e,
                day: new Date(e.dt as number * 1000).toLocaleDateString(lang, { weekday: 'short' })
              }));

              setPlaces(places)
            })
            .catch((error) => {
              console.log('retry', retry, error)
              return setTimeout(() => {
                if (retry < 5) {
                  handleChange(index, retry + 1);
                } else {
                  console.warn('retry failed')
                }
              }, 1000)
            })
        }
      })
    } else {
      setTab(0)
    }
  }, [places])

  return { handleChange, setFormat, tab, places, lang }
}

export default useWeather;