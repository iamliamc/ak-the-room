
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
        Fugue
        </Link>{' & '}
        <Link color="inherit" href="#">
        Seesaw Pictures
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default function Footer() {
  return (    
    <Box style={{ bottom: 0}} sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
    </Box>
  )
}
