import React from 'react';
import logo from './logo.svg';
import './App.css';
import MultiVideoBlock from './components/MultiVideoBlock'
import AppBar from './components/AppBar'
import { Container } from '@mui/material';
import Footer from './components/Footer'
import Test from './components/MultiVideoBlock'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <AppBar></AppBar>
      <div className="App">
        <MultiVideoBlock></MultiVideoBlock>
      </div>
      <Footer></Footer>
    </ThemeProvider>
  );
}

export default App;
