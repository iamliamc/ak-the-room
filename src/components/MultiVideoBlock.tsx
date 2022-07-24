import React, { useState, useRef } from 'react';
import type { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

// https://stackoverflow.com/questions/37463832/how-to-play-pause-video-in-react-without-external-library
import Box, { BoxProps } from '@mui/material/Box';

interface OpeningDialogueProps {
  startVideos: Function, 
}

const OpeningDialogue: FC<OpeningDialogueProps> = ({startVideos}) => {
  const [open, setOpen] = useState(true);

  const handleStart = () => {
    startVideos()
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleStart}
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
          <Button onClick={handleStart}>
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
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        m: 1,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

export default function MultiVideoBlock() {
  const [audioSwitchState, setAudioSwitchState]  = useState<boolean>(true);


  const vidRef1 = useRef<any>(null);
  const vidRef2 = useRef<any>(null);

  const startVideos = (): void => {
    if (vidRef1.current != null && vidRef2.current != null) {
      vidRef1.current.play();
      vidRef2.current.play();
    }
  }

  const switchAudio = (): void => {
    if (audioSwitchState) {
      vidRef1.current.muted = true;
      vidRef2.current.muted = false;
    } else {
      vidRef1.current.muted = false;
      vidRef2.current.muted = true;
    }
    setAudioSwitchState(!audioSwitchState)
  }

  return (
    <div style={{width: '100%'}}>
        <OpeningDialogue startVideos={startVideos}/>
        <Box style={{cursor: "pointer"}} onClick={switchAudio} sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Item style={{display: "flex", flexDirection: "row"}}>
                <video ref={vidRef1} muted width="100%" height="100%">
                    <source src="./videos/satellite.mp4" type="video/mp4"/>
                </video>
            </Item>
            <Item style={{display: "flex", flexDirection: "row"}}>
                <video ref={vidRef2} width="100%" height="100%">
                    <source src="./videos/ams_overdue.mp4" type="video/mp4"/>
                </video>
            </Item>
        </Box>
    </div>
  );
}