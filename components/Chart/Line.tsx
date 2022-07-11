import React from 'react'
import useLanguage from '@hooks/useLanguage'
import { Chart, ReactGoogleChartProps } from "react-google-charts";

interface LineChartProps extends Partial<ReactGoogleChartProps> {
  labels: any[]
  values?: any[][]
}

const LineChart: React.FC<LineChartProps> = ({values, options, ...props}) => {
  const lang = useLanguage();

  return (
    <Chart
      chartLanguage={lang}
      chartType="LineChart"
      width="100%"
      height="100px"
      data={[props.labels, ...values||[] ]}
      {...props}
      options={{
        hAxis: {
          gridlines: { count: 6 },
          format: "EE"
        },
        ...options
      }}
    />
  )
}

export default LineChart