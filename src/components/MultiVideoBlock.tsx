import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import PauseCircleOutline from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutline from '@mui/icons-material/PlayCircleOutline';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import Box, { BoxProps } from '@mui/material/Box';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import CircularProgress from '@mui/material/CircularProgress';


import ReactPlayer from 'react-player'

// Possible solution                 https://www.npmjs.com/package/react-player
// Please consider migrating to https://nextjs.org or https://remix.run to develop React apps which are deployable using Heroku's Node.js buildpack https://github.com/heroku/heroku-buildpack-nodejs, or you may develop your own create-react-app deployment with Node.js and Nginx buildpacks.
// Possible solution https://www.npmjs.com/package/react-player
// https://github.com/CookPete/react-player/blob/HEAD/src/demo/App.js

// #graph-icon {
//   border-radius: 29px;
//   animation: animate 3s linear infinite;
//   text-shadow: 0 0 50px #0072ff, 0 0 100px #0072ff, 0 0 150px #0072ff,
//     0 0 200px #0072ff;
// }

// @keyframes animate {
//   0% { filter: hue-rotate(0deg)}
//   50% {filter: hue-rotate(20deg)}
//   100% {filter: hue-rotate(0deg)}
// }


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
    playPauseState ? <PauseCircleOutline onClick={internalToggleVideoPlayState} fontSize="large" color="disabled"/> : <PlayCircleOutline onClick={internalToggleVideoPlayState} fontSize="large" color="disabled"/>
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
              <strong>Press spacebar <SpaceBarIcon style={{ position: 'relative', top: '8px'}} color="disabled" /> or click the <GraphicEqIcon style={{transform: 'rotate(90deg)', position: 'relative', top: '3px'}} fontSize="small" color="disabled"/> icon to switch the active audio channel. </strong>             
              <br/>
              Press start to begin the experience.
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
      {...other}
    />
  );
}


export default function MultiVideoBlock() {
  const [audioSwitchState, setAudioSwitchState] = useState<boolean>(false);
  const [playPauseState, setPlayPauseState] = useState<boolean>(false);
  const [readyCount, setReadyCount] = useState(0);
  const [audioOneState, setAudioOneState] = useState(0.85);
  const [audioTwoState, setAudioTwoState] = useState(0);

  const switchAudio = useCallback((): void => {
    if (audioSwitchState) {
      setAudioOneState(0.85)
      setAudioTwoState(0)
    } else {
      setAudioOneState(0)
      setAudioTwoState(0.85)
    }
    setAudioSwitchState(!audioSwitchState)
  }, [audioSwitchState])


  useEffect(() => {
    const checkKeyInput = (e: any): void => {
      if(e.keyCode === 32) {
        switchAudio()
      }
    }

    // Code to execute when component is mounted
    document.addEventListener("keydown", checkKeyInput, false);
    
    return () => {
      // Code to execute when component is unmounted
      document.removeEventListener("keydown", checkKeyInput, false);
    };
  }, [audioSwitchState, switchAudio]);


  const startVideos = (): void => {
    setPlayPauseState(true)
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
      <Box  sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}>
        <div style={{cursor: "pointer", pointerEvents: "none"}}>
          <Item style={{display: "flex", flexDirection: "row"}}>
            <ReactPlayer width="100%" height="720px" onReady={onReady} controls={false} volume={audioOneState} playing={playPauseState} url='https://player.vimeo.com/video/863599740?h=caa8c95c67' />
            <ReactPlayer width="100%" height="720px" onReady={onReady} controls={false} volume={audioTwoState} playing={playPauseState} url='https://player.vimeo.com/video/863599937?h=6f1f04bbcd' />
          </Item> 
        </div>
        <div>
          <GraphicEqIcon fontSize="large" color="disabled" style={{transform: !audioSwitchState ? 'rotate(90deg)' : 'rotate(0deg)'}} onClick={switchAudio}></GraphicEqIcon>
          <br/>
          <PausePlay toggleVideoPlayState={toggleVideoPlayState}/>
        </div>
      </Box>
    </div>
  );
}