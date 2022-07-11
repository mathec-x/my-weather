import React from 'react'
import useLanguage from '@hooks/useLanguage'
import { Chart, ReactGoogleChartProps } from "react-google-charts";
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';

interface LineChartProps extends Partial<ReactGoogleChartProps> {
  labels: any[]
  values?: any[][]
  title: JSX.Element
}

const LineChart: React.FC<LineChartProps> = ({ values, options, ...props }) => {
  const lang = useLanguage();

  if (!values) {
    return (
      <LinearProgress />
    )
  }

  return (
    <>
      {props.title}
      <Chart
        chartLanguage={lang}
        chartType="LineChart"
        width="100%"
        height="150px"
        data={[props.labels, ...values || []]}
        {...props}
        options={{
          backgroundColor: 'transparent',
          colors: ["#aaa", "#bbb"],
          chartArea: {width: '85%'},
          vAxis: {
            gridlines: { count: 1 },
            textPosition: 'none',
          },
          hAxis: {
            gridlines: { color: 'transparent' },
            // format: "H" if new date
          },
          ...options
        }}
      />
    </>
  )
}

export default React.memo(LineChart)