import React from 'react'
import PwaApp from "react-pwa-app";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Pwa: React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <PwaApp
      config={{ swUrl: '/sw.js' }}
      suspense={<Box> <LinearProgress /></Box>}
      {...props}
    />
  )
}

export default Pwa