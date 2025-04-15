import React, { useEffect, useRef, useState, useContext } from 'react';
import Typed from 'typed.js';
import { useSpring, animated } from 'react-spring';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

// Global style to force the typed cursor to be inline
const GlobalStyle = createGlobalStyle`
  .typed-cursor {
    display: inline !important;
    vertical-align: middle !important;
    margin-left: 2px;
    line-height: 1rem !important;
    font-size: 1.5rem !important;
    transform: translateY(-0.5em);
    color: ${props => props.theme.colors.accent};
    opacity: 1;
    animation: blink 0.7s infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

// New wrapper to force inline alignment for the typed text and its cursor
const TypedWrapper = styled.div`
  display: inline-flex;
  align-items: flex-end;
  position: relative;
  z-index: 10;
`;

// Styled component for the Bitmoji image
const Bitmoji = styled(animated.img)`
  position: absolute;
  border-radius: 50%;
  object-fit: cover;
  z-index: 5;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px) scale(1.05) rotate(5deg);
    box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.6);
  }
`;

// =================== Hero Section ===================
const HeroSection = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.background};
  transition: background-color 0.5s ease;
  overflow: hidden;
`;

// Background particles container
const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

// Particle styles
const Particle = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: ${props => props.isDarkMode ? 'rgba(100, 255, 218, 0.2)' : 'rgba(237, 109, 11, 0.2)'};
  pointer-events: none;
`;

// =================== Footer Section ===================
const FooterSection = styled.footer`
  position: fixed;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 999;
`;

const ArrowsFlowContainer = styled(motion.div)`
  position: relative;
  width: 32px;
  height: 60px;
  cursor: pointer;
`;

// Keyframes for the top arrow (Arrow1)
const arrow1Flow = keyframes`
  0% {
    opacity: 1;
    filter: drop-shadow(0 0 5px ${props => props.theme.colors.accent});
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 5px ${props => props.theme.colors.accent});
  }
  60% {
    opacity: 0;
    filter: drop-shadow(0 0 15px ${props => props.theme.colors.accent});
  }
  100% {
    opacity: 0;
    filter: drop-shadow(0 0 15px ${props => props.theme.colors.accent});
  }
`;

// Keyframes for the bottom arrow (Arrow2)
const arrow2Flow = keyframes`
  0% {
    opacity: 0;
    filter: drop-shadow(0 0 15px ${props => props.theme.colors.accent});
  }
  50% {
    opacity: 0;
    filter: drop-shadow(0 0 15px ${props => props.theme.colors.accent});
  }
  60% {
    opacity: 1;
    filter: drop-shadow(0 0 5px ${props => props.theme.colors.accent});
  }
  70% {
    opacity: 1;
    filter: drop-shadow(0 0 5px ${props => props.theme.colors.accent});
  }
  75% {
    opacity: 0;
    filter: drop-shadow(0 0 15px ${props => props.theme.colors.accent});
  }
  100% {
    opacity: 0;
    filter: drop-shadow(0 0 15px ${props => props.theme.colors.accent});
  }
`;

const Arrow1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 2rem;
  color: ${props => props.theme.colors.accent};
  transform: rotate(90deg);
  animation: ${arrow1Flow} 1.2s infinite linear;
`;

const Arrow2 = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 2rem;
  color: ${props => props.theme.colors.accent};
  transform: rotate(90deg);
  animation: ${arrow2Flow} 1.2s infinite linear;
`;

// Create an array of random particle positions
const createParticles = (count) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100, // percentage of view width
    y: Math.random() * 100, // percentage of view height
    size: Math.random() * 3 + 1, // particle size between 1-4px
    duration: Math.random() * 120 + 60, // animation duration
  }));
};

export default function Hero() {
  const typedEl = useRef(null);
  const [showArrow, setShowArrow] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const theme = useContext(ThemeContext);
  const [particles] = useState(() => createParticles(30)); // Create 30 particles
  
  // Compute the initial left position (centered) as a number in pixels.
  const initialLeft = typeof window !== 'undefined' ? window.innerWidth / 2 - 75 : 0;

  // Initialize Typed.js with the cursor enabled
  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: [
        'Hi!',
        'My name is Kalyankumar',
        'I build things for the upcoming AI world!',
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
    return () => typed.destroy();
  }, []);

  // Update scroll position and control arrow visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowArrow(window.scrollY <= 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate the Bitmoji image position & size based on scroll position using numeric values
  const bitmojiSpring = useSpring({
    top: scrollY > 100 ? 10 : 150,      // numbers in px
    left: scrollY > 100 ? 20 : initialLeft,
    width: scrollY > 100 ? 50 : 150,
    height: scrollY > 100 ? 50 : 150,
    config: { tension: 200, friction: 30 },
  });

  // Arrow container animation
  const arrowContainerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 1.5,
        duration: 0.5 
      } 
    },
    hover: { 
      scale: 1.1, 
      transition: { 
        duration: 0.3,
        yoyo: Infinity 
      } 
    }
  };

  return (
    <>
      <GlobalStyle theme={theme} />
      <HeroSection theme={theme}>
        {/* Particle background effect */}
        <ParticlesContainer>
          {particles.map((particle, index) => (
            <Particle
              key={index}
              size={particle.size}
              isDarkMode={theme.isDarkMode}
              initial={{ 
                x: `${particle.x}vw`, 
                y: `${particle.y}vh`, 
                opacity: 0 
              }}
              animate={{ 
                x: [`${particle.x}vw`, `${(particle.x + 5) % 100}vw`, `${(particle.x - 5 + 100) % 100}vw`, `${particle.x}vw`], 
                y: [`${particle.y}vh`, `${(particle.y - 10 + 100) % 100}vh`, `${(particle.y + 10) % 100}vh`, `${particle.y}vh`],
                opacity: [0, 1, 1, 0] 
              }}
              transition={{ 
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.3, 0.7, 1]
              }}
            />
          ))}
        </ParticlesContainer>

        {/* Bitmoji image with spring animation */}
        <Bitmoji 
          src="/images/kkk.jpeg" 
          style={bitmojiSpring} 
          alt="Kalyan"
          initial={{ scale: 0, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
        />
        
        {/* Typed text animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <TypedWrapper>
            <span
              ref={typedEl}
              style={{
                whiteSpace: 'nowrap',
                color: theme.colors.text,
                fontFamily: 'SF Mono, Fira Code, monospace',
                fontSize: '1.5rem',
                textAlign: 'center',
                transition: 'color 0.5s ease'
              }}
            />
          </TypedWrapper>
        </motion.div>
      </HeroSection>

      {showArrow && (
        <FooterSection>
          <Link to="about" smooth duration={500}>
            <ArrowsFlowContainer
              variants={arrowContainerVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <Arrow1 theme={theme}>{'>'}</Arrow1>
              <Arrow2 theme={theme}>{'>'}</Arrow2>
            </ArrowsFlowContainer>
          </Link>
        </FooterSection>
      )}
    </>
  );
}