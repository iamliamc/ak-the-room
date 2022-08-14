import React, { useState, useRef } from 'react';
import type { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Box, { BoxProps } from '@mui/material/Box';

// Possible solution                 https://www.npmjs.com/package/react-player


interface OpeningDialogueProps {
  startVideos: Function, 
}

interface PausePlayProps {
  toggleVideoPlayState: React.MouseEventHandler<HTMLInputElement>
}

const PausePlay: FC<PausePlayProps> = ({toggleVideoPlayState}) => {
  const [playPauseState, setPlayPauseState] = useState<boolean>(true);

  return (
    playPauseState ? <div onClick={toggleVideoPlayState}><PlayCircleOutlineIcon fontSize="large" color="disabled"/></div> : <div onClick={toggleVideoPlayState}><PauseCircleOutlineIcon fontSize="large" color="disabled"/></div>
  )
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
            Press start to begin the experience. Click either video to switch the audio channel.
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
  const [audioSwitchState, setAudioSwitchState] = useState<boolean>(true);
  const [playPauseState, setPlayPauseState] = useState<boolean>(true);


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
      vidRef1.current.muted = false;
      vidRef2.current.muted = true;
    } else {
      vidRef1.current.muted = true;
      vidRef2.current.muted = false;
    }
    setAudioSwitchState(!audioSwitchState)
  }

  return (
    <div style={{width: '100%'}}>
        <OpeningDialogue startVideos={startVideos}/>
        <Box style={{cursor: "pointer"}} onClick={switchAudio} sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Item style={{display: "flex", flexDirection: "row"}}>
                <video ref={vidRef1} muted width="100%" height="100%">
                    <source src="./videos/LEFT Interrogation 15-10-2021 with clean sound.mp4" type="video/mp4"/>
                </video>
            </Item>
            <Item style={{display: "flex", flexDirection: "row"}}>
                <video ref={vidRef2} width="100%" height="100%">
                    <source src="./videos/RIGHT Dance 15-10-2021 clean sound.mp4" type="video/mp4"/>
                </video>
                {/* <iframe ref={vidRef2} width="100%" height="100%" src="https://www.youtube.com/embed/9YffrCViTVk" title="YouTube video player"></iframe> */}
            </Item>
        </Box>
        {/* <PausePlay/> */}
    </div>
  );
}