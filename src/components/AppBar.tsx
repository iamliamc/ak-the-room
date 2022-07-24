import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {
  return (
    <AppBar position="relative">
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
      </Typography>
    </Toolbar>
  </AppBar>
  );
}