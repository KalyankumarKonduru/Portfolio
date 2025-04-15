import React, { useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Typography, Container, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const StyledSection = styled.section`
  padding: 100px 0;
  background-color: ${props => props.theme.colors.background};
  min-height: 60vh;
  display: flex;
  align-items: center;
  transition: background-color 0.5s ease;
  position: relative;
  overflow: hidden;
`;

// Background floating elements
const FloatingElement = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: ${props => props.theme.isDarkMode 
    ? `rgba(237, 109, 11, ${props.opacity})` 
    : `rgba(237, 109, 11, ${props.opacity})`
  };
  filter: blur(${props => props.blur}px);
  z-index: 0;
  pointer-events: none;
  transition: background 0.5s ease;
`;

const Title = styled(motion.h3)`
  color: ${props => props.theme.colors.accent};
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 20px;
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 20px;
  transition: color 0.5s ease;
  position: relative;
  z-index: 2;
`;

const BigTitle = styled(motion.h2)`
  color: ${props => props.theme.colors.text};
  font-size: clamp(40px, 5vw, 60px);
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  transition: color 0.5s ease;
  position: relative;
  z-index: 2;
  
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.accent}, 
    ${props => props.theme.colors.highlight}, 
    ${props => props.theme.colors.accent}
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradient 3s linear infinite;
  
  @keyframes gradient {
    0% { background-position: 0% center; }
    100% { background-position: 200% center; }
  }
`;

const Description = styled(motion.p)`
  color: ${props => props.theme.colors.secondaryText};
  max-width: 600px;
  margin: 0 auto 50px;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
  transition: color 0.5s ease;
  position: relative;
  z-index: 2;
`;

const StyledButton = styled(motion.a)`
  color: ${props => props.theme.colors.accent};
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: 4px;
  padding: 1.25rem 1.75rem;
  font-size: 14px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  margin-top: 30px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  z-index: 2;
  transition: color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.accent};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    z-index: -1;
  }
  
  &:hover {
    color: ${props => props.theme.isDarkMode ? '#0a192f' : '#ffffff'};
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const theme = useContext(ThemeContext);
  
  // Floating elements for background
  const floatingElements = [
    { size: 80, x: '10%', y: '20%', blur: 30, opacity: 0.1 },
    { size: 150, x: '80%', y: '70%', blur: 50, opacity: 0.08 },
    { size: 60, x: '70%', y: '25%', blur: 20, opacity: 0.15 },
    { size: 120, x: '25%', y: '85%', blur: 40, opacity: 0.1 },
  ];

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
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        delay: 0.8
      }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };
  
  const floatingVariants = {
    animate: {
      y: ["0%", "5%", "-5%", "0%"],
      transition: {
        duration: Math.random() * 3 + 5,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <StyledSection id="contact" theme={theme}>
      {/* Background floating elements */}
      {floatingElements.map((element, index) => (
        <FloatingElement
          key={index}
          size={element.size}
          style={{ left: element.x, top: element.y }}
          blur={element.blur}
          opacity={element.opacity}
          theme={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.2 }}
          variants={floatingVariants}
          animate="animate"
        />
      ))}
      
      <Container maxWidth="md" sx={{ height: '100%' }}>
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Box
            sx={{
              height: '60vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Title 
              component="h3" 
              theme={theme}
              variants={itemVariants}
            >
              What's Next?
            </Title>

            <BigTitle 
              theme={theme}
              variants={itemVariants}
            >
              Get In Touch
            </BigTitle>
            
            <Description
              theme={theme}
              variants={itemVariants}
            >
              I'm currently looking for new opportunities, and my inbox is always
              open. Whether you have a question or just want to say hi, I'll try
              my best to get back to you!
            </Description>
            
            <StyledButton
              href="mailto:konduru.kalyan555@gmail.com"
              theme={theme}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Say Hello
            </StyledButton>
          </Box>
        </motion.div>
      </Container>
    </StyledSection>
  );
}

export default Contact;