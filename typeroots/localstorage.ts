import { WeatherResponse } from "./weather"

export interface LocalStorageValues {
  theme: "light" | "dark"
  places: WeatherResponse[]
}
