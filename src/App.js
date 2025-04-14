import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import styled from 'styled-components';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Experience from './components/Experience';
import Certificates from './components/Certificates';

console.log('Navbar:', Navbar);
console.log('Hero:', Hero);
console.log('About:', About);
console.log('Projects:', Projects);
console.log('Skills:', Skills);
console.log('Contact:', Contact);
console.log('Footer:', Footer);

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64ffda',
    },
    background: {
      default: '#0a192f',
      paper: '#112240',
    },
    text: {
      primary: '#ccd6f6',
      secondary: '#8892b0',
    },
  },
  typography: {
    fontFamily: '"SF Mono", "Fira Code", monospace',
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"SF Mono", "Fira Code", monospace',
    },
    body2: {
      fontFamily: '"SF Mono", "Fira Code", monospace',
    },
    subtitle1: {
      fontFamily: '"SF Mono", "Fira Code", monospace',
    },
    subtitle2: {
      fontFamily: '"SF Mono", "Fira Code", monospace',
    },
  },
});

const MainContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-color: #0a192f;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainContainer>
        <Navbar />
        <Hero />
        <About />
        <Experience/>
        <Skills />
        <Projects />
        <Certificates/>
        <Contact />
        <Footer />
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;