// src/components/About.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Typography, Container, Grid, Box } from '@mui/material';

const StyledSection = styled.section`
  padding: 100px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  place-content: center;
  overflow: hidden;
  place-items: center;
  background-color: #0a192f;
`;

const StyledImage = styled.img`
  width: 160px;
  height: auto;
  object-fit: contain;
  
  @media (min-width: 768px) {
    width: 192px;
  }
`;

function About() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { duration: 500 }
  });

  return (
    <StyledSection id="about">
      <Container>
        <animated.div style={fadeIn} ref={ref}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h1" gutterBottom sx={{ color: '#ed6d0b' }}>
                  About Me
                </Typography>
                <Typography 
                  paragraph 
                  sx={{ 
                    color: 'black', 
                    marginBottom: 2, 
                    fontSize: '16px', 
                    lineHeight: 1.7,
                    fontFamily: '"SF Mono", "Fira Code", monospace',
                  }}
                >
                  I'm an innovative software engineer who loves exploring emerging technologies and finding creative solutions. 
                  I develop robust applications, enhance user experiences, and turn fresh ideas into real-world impact. 
                  Whether it's testing new limits or simply pushing a commit, I'm all in.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
              <StyledImage
                src="/images/hacker.avif"
                alt="Software Developer Icon"
              />
            </Grid>
          </Grid>
        </animated.div>
      </Container>
    </StyledSection>
  );
}

export default About;
