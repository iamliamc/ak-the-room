import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';



const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  return (
    <div>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <video>
                    <source src="/videos/ams_overdue.mp4" type="video/mp4"/>
                </video>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <video>
                    <source src="/videos/satellite.mp4" type="video/mp4"/>
                </video>
              </Grid>
          </Grid>
        </Container>
      </main>
      </div>
  );
}