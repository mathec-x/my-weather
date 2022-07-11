// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { forecast } from '@services/OpenWeatherMap'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    if(!req.query.q && !(req.query.lat && req.query.lon)) {
      throw new Error("?q=city or lat={n}&lon={n} is required on endpoint");
    }

    const data = await forecast(req.query)

    res.json(data)

  } catch (error) {
    if(error instanceof Response){
      res.status(error.status).json(error.statusText)

    } else {
      res.status(400).json(error)
    }
  }
}
