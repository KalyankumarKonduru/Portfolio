import React, { useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import styled from 'styled-components';
import './App.css';

// Theme Context
import ThemeProvider, { ThemeContext } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

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

// Motion imports
import { AnimatePresence } from 'framer-motion';

// Main App Content that uses the theme context
const AppContent = () => {
  const { colors, isDarkMode } = useContext(ThemeContext);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: colors.highlight,
      },
      secondary: {
        main: colors.accent,
      },
      background: {
        default: colors.background,
        paper: colors.secondaryBg,
      },
      text: {
        primary: colors.text,
        secondary: colors.secondaryText,
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
    background-color: ${colors.background};
    transition: background-color 0.5s ease;
  `;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence mode="wait">
        <MainContainer>
          {/* <ThemeToggle /> */}
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
      </AnimatePresence>
    </MuiThemeProvider>
  );
};

// Wrap everything with our custom ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;