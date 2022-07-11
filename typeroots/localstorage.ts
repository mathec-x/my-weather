import { WeatherResponse } from "./weather"

export interface LocalStorageValues {
  theme: "light" | "dark"
  units: "metric" | "imperial"
  places: WeatherResponse[]
  tab: number
}
