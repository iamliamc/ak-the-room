import React, { useState, useRef } from 'react';
import type { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import PauseCircleOutline from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutline from '@mui/icons-material/PlayCircleOutline';
import Box, { BoxProps } from '@mui/material/Box';
import ReactPlayer from 'react-player'

// Possible solution                 https://www.npmjs.com/package/react-player
// Please consider migrating to https://nextjs.org or https://remix.run to develop React apps which are deployable using Heroku's Node.js buildpack https://github.com/heroku/heroku-buildpack-nodejs, or you may develop your own create-react-app deployment with Node.js and Nginx buildpacks.
// Possible solution https://www.npmjs.com/package/react-player
// https://github.com/CookPete/react-player/blob/HEAD/src/demo/App.js


interface OpeningDialogueProps {
  startVideos: Function, 
}

interface PausePlayProps {
  toggleVideoPlayState: React.MouseEventHandler<HTMLInputElement>
}

const PausePlay: FC<PausePlayProps> = ({toggleVideoPlayState}) => {
  const [playPauseState, setPlayPauseState] = useState<boolean>(true);

  return (
    playPauseState ? <div onClick={toggleVideoPlayState}><PlayCircleOutline fontSize="large" color="disabled"/></div> : <div onClick={toggleVideoPlayState}><PauseCircleOutline fontSize="large" color="disabled"/></div>
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
  const [videoOnePlaying, setVideoOnePlaying] = useState(false)
  const [videoTwoPlaying, setVideoTwoPlaying] = useState(false)


  const vidRef1 = useRef<any>(null);
  const vidRef2 = useRef<any>(null);

  const startVideos = (): void => {
    setVideoOnePlaying(true)
    setVideoTwoPlaying(true)
    // if (vidRef1.current != null && vidRef2.current != null) {
    //   vidRef1.current.play();
    //   vidRef2.current.play();
    // }
  }

  const switchAudio = (): void => {
    console.log('hi')
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
            <Item width="100%" height="100%" >
                <ReactPlayer playing={videoOnePlaying} url='https://vimeo.com/512330229?controls=0' />
            </Item>
            <Item width="100%" height="100%" >
              <ReactPlayer playing={videoTwoPlaying} url='https://player.vimeo.com/video/76979871?controls=0' />
            </Item>
        </Box>
        <PausePlay toggleVideoPlayState={() => {console.log('hi')}}/>
    </div>
  );
}