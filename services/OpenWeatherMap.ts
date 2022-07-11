import { WeatherResponse } from "@typeroots/weather"

// icon // http://openweathermap.org/img/wn/10d@2x.png
const baseUrl = "https://api.openweathermap.org/data/2.5"

export interface Params {
  id?: number
  q?: string
  lat?: number
  lon?: number
  cnt?: number
  units?: "standard" | "metric" | "imperial"
  appid?: string
  lang?: string
}

export const weather = async (params: Params): Promise<WeatherResponse> => {
  params.appid = process.env.REACT_APP_WEATHER_API_TOKEN
  if (!params.units) {
    params.units = 'metric'// default celsius
  }

  if (params.lang) {
    params.lang = params.lang.replace("-", "_")
  }

  const request = `${baseUrl}/weather?` + new URLSearchParams(params as any).toString()
  const response = await fetch(request)

  if (response.ok) {
    return await response.json()
  }

  throw response;
}

export const onecall = async (params: Params): Promise<{ list: WeatherResponse[] }> => {
  if (params.lang) {
    params.lang = params.lang.replace("-", "_")
  }
  const searchparams = {
    appid: process.env.REACT_APP_WEATHER_API_TOKEN,
    units: 'metric',
    exclude: 'minutely',
    ...params
  }

  const request = `${baseUrl}/onecall?` + new URLSearchParams(searchparams as any).toString()
  const response = await fetch(request)
  
  if (response.ok) {
    return await response.json()
  }

  throw response;
}


export const forecast = async (params: Params): Promise<{ list: WeatherResponse[] }> => {
  params.appid = process.env.REACT_APP_WEATHER_API_TOKEN
  if (!params.units) {
    params.units = 'metric'// default celsius
  }

  if (params.lang) {
    params.lang = params.lang.replace("-", "_")
  }

  const request = `${baseUrl}/forecast?` + new URLSearchParams(params as any).toString()
  const response = await fetch(request)

  if (response.ok) {
    return await response.json().then(e => e.list)
  }

  throw response;
}
