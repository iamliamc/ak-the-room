import React, { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';


import Box, { BoxProps } from '@mui/material/Box';

function OpeningDialogue () {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"The Room"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Press start to begin the experience. Click anywhere to switch between the audio channels of the two videos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose} autoFocus>
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        // border: '0.1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        m: 1,
        // borderRadius: 2,
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
    <div style={{width: '100%'}}>
        <OpeningDialogue/>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Item style={{display: "flex", flexDirection: "row"}}>
                <video controls muted width="100%" height="100%">
                    <source src="./videos/satellite.mp4" type="video/mp4"/>
                </video>
            </Item>
            <Item style={{display: "flex", flexDirection: "row"}}>
                <video controls muted width="100%" height="100%">
                    <source src="./videos/ams_overdue.mp4" type="video/mp4"/>
                </video>
            </Item>
        </Box>
    </div>
  );
}