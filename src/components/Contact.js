import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Typography, Container, Button, Box } from '@mui/material';

const StyledSection = styled.section`
  padding: 100px 0;
  background-color: white;
  min-height: 60vh;
  display: flex;
  align-items: center;
`;

const Title = styled(Typography)`
  && {
    color: #ed6d0b;
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 70px;
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
`;


const BigTitle = styled(Typography)`
  color: #ccd6f6;
  font-size: clamp(40px, 5vw, 60px);
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const Description = styled(Typography)`
  color: black;
  max-width: 600px;
  margin: 0 auto 50px;
  text-align: center;
  font-size: 20px;
`;

const StyledButton = styled(Button)`
  && {
    color: #ed6d0b;
    background-color: transparent;
    border: 1px solid #ed6d0b;
    border-radius: 4px;
    padding: 1.25rem 1.75rem;
    font-size: 14px;
    font-family: 'SF Mono', 'Fira Code', monospace;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    margin-top: 50px;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  
  &&:hover {
    background-color: rgba(100, 255, 218, 0.1);
    transform: translateY(-3px);
  }
`;


function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    config: { duration: 1000 }
  });

  return (
    <StyledSection id="contact">
  <Container maxWidth="md" sx={{ height: '100%' }}>
    <animated.div ref={ref} style={fadeIn}>
      <Box
        sx={{
          height: '60vh', // or use '100%' if the parent has a fixed height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Title component="h1">What's Next?</Title>

        <BigTitle variant="h2">Get In Touch</BigTitle>
        <Description>
          I'm currently looking for new opportunities, and my inbox is always
          open. Whether you have a question or just want to say hi, I'll try
          my best to get back to you!
        </Description>
        <StyledButton
          href="mailto:konduru.kalyan555@gmail.com"
          variant="outlined"
          size="large"
        >
          Say Hello
        </StyledButton>
      </Box>
    </animated.div>
  </Container>
</StyledSection>

  );
}

export default Contact;
