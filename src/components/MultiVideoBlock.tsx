import React, { useState, useRef } from 'react';
import type { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, StyledEngineProvider } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import PauseCircleOutline from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutline from '@mui/icons-material/PlayCircleOutline';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import Box, { BoxProps } from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


import ReactPlayer from 'react-player'

// Possible solution                 https://www.npmjs.com/package/react-player
// Please consider migrating to https://nextjs.org or https://remix.run to develop React apps which are deployable using Heroku's Node.js buildpack https://github.com/heroku/heroku-buildpack-nodejs, or you may develop your own create-react-app deployment with Node.js and Nginx buildpacks.
// Possible solution https://www.npmjs.com/package/react-player
// https://github.com/CookPete/react-player/blob/HEAD/src/demo/App.js


interface OpeningDialogueProps {
  startVideos: Function, 
  readyCount: Number
}

interface PausePlayProps {
  toggleVideoPlayState: any //React.MouseEventHandler<HTMLInputElement>
}

const PausePlay: FC<PausePlayProps> = ({toggleVideoPlayState}) => {
  const [playPauseState, setPlayPauseState] = useState<boolean>(true);

  const internalToggleVideoPlayState = (): void => {
    setPlayPauseState(!playPauseState)
    toggleVideoPlayState()
  } 

  return (
    playPauseState ? <div onClick={internalToggleVideoPlayState}><PlayCircleOutline fontSize="large" color="disabled"/></div> : <div onClick={internalToggleVideoPlayState}><PauseCircleOutline fontSize="large" color="disabled"/></div>
  )
}

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const OpeningDialogue: FC<OpeningDialogueProps> = ({startVideos, readyCount}) => {
  const [open, setOpen] = useState(true);

  const handleStart = () => {
    
    startVideos()
    sleep(500)
    setOpen(false);
  };

  const dialogActionHelper = () => {
    if (readyCount === 2) {
      return (
        <Button onClick={handleStart}>
          Start
        </Button>
      )
    } else {
      return (
        <CircularProgress></CircularProgress>
      )
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleStart}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`The Room`}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Press start to begin the experience. Click either video to switch the audio channel.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {dialogActionHelper()}
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
  const [playPauseState, setPlayPauseState] = useState<boolean>(false);
  const [readyCount, setReadyCount] = useState(0);

  const startVideos = (): void => {
    setPlayPauseState(true)
  }

  const switchAudio = (): void => {
    setAudioSwitchState(!audioSwitchState)
  }

  const toggleVideoPlayState = (): void => {
    setPlayPauseState(!playPauseState)
  }

  const onReady = () => {
    setReadyCount(readyCount + 1);
  };

  return (
    <div style={{width: '100%', height: '100%'}}>
        <OpeningDialogue startVideos={startVideos} readyCount={readyCount}/>
        <div style={{cursor: "pointer"}} onClick={switchAudio}>
          <Box  sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Item style={{display: "flex", flexDirection: "row"}}>
                  <ReactPlayer width="100%" height="100%" onReady={onReady} muted={audioSwitchState} playing={playPauseState} url='https://vimeo.com/512330229?controls=0' />
              </Item>
              <Item  style={{display: "flex", flexDirection: "row"}}>
                <ReactPlayer width="100%" height="720px" onReady={onReady} muted={audioSwitchState} playing={playPauseState} url='https://vimeo.com/376578408?controls=0' />
              </Item>
          </Box>
        </div>
        <GraphicEqIcon fontSize="large" color="disabled" style={{transform: audioSwitchState ? 'rotate(90deg)' : 'rotate(0deg)'}} onClick={switchAudio}></GraphicEqIcon>
        <PausePlay toggleVideoPlayState={toggleVideoPlayState}/>
    </div>
  );
}