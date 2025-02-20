import React from 'react';
import styled from 'styled-components';
import { Typography, Container, IconButton, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const StyledFooter = styled.footer`
  padding: 20px 0;
  background-color: #0a192f;
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;
`;

const StyledIconButton = styled(IconButton)`
  color: #8892b0;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  
  &:hover {
    color: #64ffda;
    transform: translateY(-3px);
  }
`;

const Copyright = styled(Typography)`
  color: #8892b0;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 12px;
  
  a {
    color: #64ffda;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <Container>
        <SocialLinks>
          <StyledIconButton
            href="https://github.com/kalyankumarraju5"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </StyledIconButton>
          <StyledIconButton
            href="https://www.linkedin.com/in/kalyankumarkonduru"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </StyledIconButton>
          <StyledIconButton
            href="https://www.instagram.com/k_kalyan_kumar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </StyledIconButton>
        </SocialLinks>
        
        <Box mb={2}>
          <Copyright>
            Designed & Built by{' '}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kalyankumar Konduru
            </a>
          </Copyright>
        </Box>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
