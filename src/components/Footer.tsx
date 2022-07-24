
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/iamliamc">
          Storyteller Ink.
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default function Footer() {
  return (    
    <Box style={{position: "fixed", bottom: 0}} sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
    </Box>
  )
}
