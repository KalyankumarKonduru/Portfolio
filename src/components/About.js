import React, { useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Typography, Container, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const StyledSection = styled.section`
  padding: 100px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  place-content: center;
  overflow: hidden;
  place-items: center;
  background-color: ${props => props.theme.colors.background};
  transition: background-color 0.5s ease;
`;

const SectionTitle = styled(motion.h2)`
  color: ${props => props.theme.colors.accent};
  font-size: clamp(40px, 5vw, 60px);
  font-weight: 700;
  margin-bottom: 30px;
  position: relative;
  transition: color 0.5s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 70px;
    height: 4px;
    background: ${props => props.theme.colors.accent};
    transition: background 0.5s ease, width 0.5s ease;
  }
  
  &:hover::after {
    width: 100px;
  }
`;

const AboutText = styled(motion.p)`
  color: ${props => props.theme.colors.secondaryText};
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 25px;
  transition: color 0.5s ease;
  position: relative;
  
  strong {
    color: ${props => props.theme.colors.text};
    transition: color 0.5s ease;
    font-weight: 600;
  }
  
  &::before {
    content: '>';
    color: ${props => props.theme.colors.accent};
    position: absolute;
    left: -20px;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
    transform: translateX(5px);
  }
`;

const Highlight = styled.span`
  color: ${props => props.theme.colors.accent};
  font-weight: 500;
  transition: color 0.5s ease;
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  &::before {
    top: 15px;
    left: 15px;
    border: 2px solid ${props => props.theme.colors.accent};
    z-index: -1;
  }
  
  &::after {
    top: 25px;
    left: 25px;
    border: 2px solid ${props => props.theme.colors.highlight};
    z-index: -2;
  }
  
  &:hover::before {
    top: 10px;
    left: 10px;
  }
  
  &:hover::after {
    top: 20px;
    left: 20px;
  }
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
  filter: ${props => props.theme.isDarkMode ? 'brightness(0.9)' : 'brightness(1)'};
  transition: filter 0.5s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 30px -15px rgba(0, 0, 0, 0.3);
  }
`;

// Floating decoration elements
const Decoration = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.round ? '50%' : '4px'};
  background-color: ${props => props.filled 
    ? props.theme.colors.accent + '20' 
    : 'transparent'
  };
  border: ${props => !props.filled ? `2px solid ${props.theme.colors.accent + '40'}` : 'none'};
  transition: background-color 0.5s ease, border 0.5s ease;
  z-index: -1;
`;

function About() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  const theme = useContext(ThemeContext);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.6
      }
    }
  };
  
  // Decoration positions
  const decorations = [
    { x: '10%', y: '15%', size: 40, round: true, filled: true },
    { x: '85%', y: '25%', size: 60, round: false, filled: false },
    { x: '15%', y: '85%', size: 50, round: false, filled: true },
    { x: '80%', y: '75%', size: 35, round: true, filled: false },
  ];
  
  // Float animation for decorations
  const floatVariants = {
    animate: index => ({
      y: [0, -15, 0, 10, 0],
      x: [0, 10, 0, -10, 0],
      rotate: [0, index % 2 === 0 ? 10 : -10, 0, index % 2 === 0 ? -5 : 5, 0],
      transition: {
        duration: 8 + index * 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <StyledSection id="about" theme={theme}>
      {/* Decorative elements */}
      {decorations.map((dec, index) => (
        <Decoration
          key={index}
          style={{ left: dec.x, top: dec.y }}
          size={dec.size}
          round={dec.round}
          filled={dec.filled}
          theme={theme}
          custom={index}
          variants={floatVariants}
          animate="animate"
        />
      ))}
      
      <Container>
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <SectionTitle theme={theme} variants={itemVariants}>
                  About Me
                </SectionTitle>
                <AboutText theme={theme} variants={itemVariants}>
                  I'm an <Highlight theme={theme}>innovative software engineer</Highlight> who loves exploring emerging technologies and finding creative solutions. 
                </AboutText>
                <AboutText theme={theme} variants={itemVariants}>
                  I develop <strong>robust applications</strong>, enhance user experiences, and turn fresh ideas into real-world impact. 
                </AboutText>
                <AboutText theme={theme} variants={itemVariants}>
                  Whether it's testing new limits or simply pushing a commit, I'm all in.
                </AboutText>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
              <ImageWrapper theme={theme} variants={imageVariants}>
                <StyledImage
                  src="/images/hacker.avif"
                  alt="Software Developer Icon"
                  theme={theme}
                  initial={{ opacity: 0, rotate: -5 }}
                  animate={inView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -5 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                />
              </ImageWrapper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </StyledSection>
  );
}

export default About;