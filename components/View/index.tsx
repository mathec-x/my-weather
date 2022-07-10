import React from 'react';
import Box from "@mui/material/Box";
import { styled } from '@mui/system';

/**
 * material styled
 * @see https://mui.com/pt/system/styled/
 */

const View = styled(Box)( ({theme}) => ({
  padding: theme.spacing(2),
  minHeight: `calc(100vh - 64px)`,
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor: theme.palette.background.paper
}))

export default View;