import React from 'react'
import PwaApp from "react-pwa-app";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Pwa: React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <PwaApp
      config={{ 
        swUrl: '/sw.js',
        onUpdate: () => {
          alert('new updates available, please, close the app to finish installation')
        },
        onPrompt: (p) => {
          if(p.outcome === 'accepted'){
            setTimeout(() => {
              alert('app installed, close the browser and open the mobile menu')
              window.close()
            }, 10000)
          }
        }
      }}
      suspense={<Box> <LinearProgress /></Box>}
      {...props}
    />
  )
}

export default Pwa