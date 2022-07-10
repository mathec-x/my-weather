export interface WeatherResponse {
  timezone: number
  id: number
  name: string
  cod: number
  visibility: number      // Visibility, meter. The maximum value of the visibility is 10km
  dt: number              // Time of data calculation, unix, UTC
  dt_txt?: string         // Parsed Date ex "2022-07-09 21:00:00"
  sys: {
    country: string,
    sunrise: number,
    sunset: number
  },
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number          //  Weather condition id
    main: string        // Group of weather parameters (Rain, Snow, Extreme etc.)
    description: string // Weather condition within the group. You can get the output in your language
    icon: string        // Weather icon id
  }[]
  main: {
    temp: number          // Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    feels_like: number    // Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    temp_min: number      // Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    temp_max: number      // Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    pressure: number      // Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
    humidity: number      // Humidity, %
    sea_level?: number    // Atmospheric pressure on the sea level, hPa
    grnd_level?: number   // Atmospheric pressure on the ground level, hPa
  }
  wind: {
    speed: number          // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
    deg: number            // Wind direction, degrees (meteorological)
    gust: number           // Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
  }
  clouds: {
    all: number           // Cloudiness, %
  }
  rain?: {
    "1h": number //Rain volume for the last 1 hour, mm
    "3h": number //Rain volume for the last 3 hours, mm
  }
  snow?: {
    "1h": number // Snow volume for the last 1 hour, mm
    "3h": number // Snow volume for the last 3 hours, mm
  }
}
