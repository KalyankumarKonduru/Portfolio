import React, { useContext, useEffect, useState, useRef } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import styled from 'styled-components';
import './App.css';
import ThreeBackground from './components/ThreeBackground';
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
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';

// Animation Libraries
import { AnimatePresence } from 'framer-motion';
// Removed LocomotiveScrollProvider import
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import barba from '@barba/core';
import anime from 'animejs/lib/anime.es.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Main App Content that uses the theme context
const AppContent = () => {
  const { colors, isDarkMode } = useContext(ThemeContext);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Theme configuration
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

  // Initial page load animation
  useEffect(() => {
    // Page load animation
    const loadingAnimation = anime.timeline({
      easing: 'easeOutExpo',
      complete: () => setPageLoaded(true)
    });
  
    loadingAnimation
      .add({
        targets: '.loading-screen',
        opacity: [1, 0],
        duration: 800,
        easing: 'easeInOutQuad',
        complete: function() {
          document.querySelector('.loading-screen').style.display = 'none';
        }
      })
      .add({
        targets: '.fade-in',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 800,
      }, '-=400');
  
    // Initialize Barba.js
    barba.init({
      transitions: [{
        name: 'opacity-transition',
        leave(data) {
          return gsap.to(data.current.container, {
            opacity: 0,
            duration: 0.5
          });
        },
        enter(data) {
          return gsap.from(data.next.container, {
            opacity: 0,
            duration: 0.5
          });
        },
        after() {
          window.scrollTo(0, 0);
          // Refresh ScrollTrigger after transition
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
        }
      }]
    });
  
    // Wait a bit before initializing ScrollTrigger
    setTimeout(() => {
      // Initialize GSAP ScrollTrigger animations
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.animate-on-scroll'),
          { 
            y: 50, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }, 500);
  
    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      barba.destroy();
    };
  }, []);

  const MainContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    background-color: ${colors.background};
    transition: background-color 0.5s ease;
  `;

  const LoadingScreen = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${colors.background};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

  const LoadingLogo = styled.div`
    font-size: 3rem;
    color: ${colors.highlight};
    font-weight: bold;
    letter-spacing: 2px;
  `;

  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={{ colors }}>
        <CssBaseline />
        <CustomCursor />
        
        {!pageLoaded && (
          <LoadingScreen className="loading-screen">
            <LoadingLogo>KK</LoadingLogo>
          </LoadingScreen>
        )}
        
        <PageTransition>
          <AnimatePresence mode="wait">
            <MainContainer>
              <ThreeBackground />
              <Navbar />
              <div data-barba="wrapper">
                <main data-barba="container" data-barba-namespace="home">
                  <Hero />
                  <About />
                  <Experience/>
                  <Skills />
                  <Projects />
                  <Certificates/>
                  <Contact />
                </main>
              </div>
              <Footer />
            </MainContainer>
          </AnimatePresence>
        </PageTransition>
      </StyledThemeProvider>
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