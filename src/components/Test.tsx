import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';


import Box, { BoxProps } from '@mui/material/Box';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

export default function Test() {
  return (
    <div style={{ width: '100%' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Item style={{display: "flex", flexDirection: "row"}}>
                <video controls muted>
                    <source src="./videos/satellite.mp4" type="video/mp4"/>
                </video>
            </Item>
            <Item style={{display: "flex", flexDirection: "row"}}>
                <video controls muted>
                    <source src="./videos/ams_overdue.mp4" type="video/mp4"/>
                </video>
            </Item>
        </Box>
    </div>
  );
}