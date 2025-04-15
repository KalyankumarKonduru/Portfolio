import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography, Container, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const StyledFooter = styled.footer`
  padding: 20px 0;
  background-color: ${props => props.theme.colors.background};
  text-align: center;
  transition: background-color 0.5s ease;
  position: relative;
  overflow: hidden;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;
`;

const StyledIconButton = styled(motion.a)`
  color: ${props => props.theme.colors.secondaryText};
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.5s ease;
  background-color: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.accent};
    transform: scale(0);
    transition: transform 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: ${props => props.theme.isDarkMode ? '#0a192f' : '#ffffff'};
    transform: translateY(-5px);
  }
  
  &:hover::before {
    transform: scale(1);
  }
`;

const Copyright = styled(motion.p)`
  color: ${props => props.theme.colors.secondaryText};
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 12px;
  transition: color 0.5s ease;
  
  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease;
    
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -2px;
      left: 0;
      background-color: ${props => props.theme.colors.accent};
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: ${props => props.theme.colors.highlight};
      
      &::after {
        width: 100%;
      }
    }
  }
`;

// Wave design at the top of the footer
const WaveContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
`;

const Wave = styled.svg`
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 30px;
  
  .shape-fill {
    fill: ${props => props.theme.colors.accent};
    transition: fill 0.5s ease;
    opacity: 0.2;
  }
`;

function Footer() {
  const theme = useContext(ThemeContext);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: i => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }),
    hover: { 
      scale: 1.2,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { 
        duration: 0.5
      }
    },
    tap: { 
      scale: 0.9,
      transition: { duration: 0.1 }
    }
  };

  const socialIcons = [
    { icon: <GitHubIcon />, url: 'https://github.com/KalyankumarKonduru', label: 'GitHub' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/kalyankumarkonduru', label: 'LinkedIn' },
    { icon: <InstagramIcon />, url: 'https://www.instagram.com/k_kalyan_kumar/', label: 'Instagram' }
  ];

  return (
    <StyledFooter theme={theme}>
      {/* Wave separator at the top */}
      <WaveContainer>
        <Wave viewBox="0 0 1200 120" preserveAspectRatio="none" theme={theme}>
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            className="shape-fill"
          />
        </Wave>
      </WaveContainer>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SocialLinks>
            {socialIcons.map((social, index) => (
              <StyledIconButton
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                theme={theme}
                custom={index}
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {social.icon}
              </StyledIconButton>
            ))}
          </SocialLinks>
          
          <Box mb={2}>
            <Copyright
              theme={theme}
              variants={itemVariants}
            >
              Designed & Built by{' '}
              <a
                href="https://github.com/KalyankumarKonduru"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kalyankumar Konduru
              </a>
            </Copyright>
          </Box>
        </motion.div>
      </Container>
    </StyledFooter>
  );
}

export default Footer;