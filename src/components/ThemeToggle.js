// src/components/ThemeToggle.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { motion } from 'framer-motion';

const ToggleWrapper = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  background-color: ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  
  &:hover {
    transform: rotate(15deg);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.isDarkMode ? '#FFD700' : '#FFA500'};
  font-size: 24px;
`;

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const toggleVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    },
    tap: {
      scale: 0.9
    }
  };

  const iconVariants = {
    rotate: {
      rotate: isDarkMode ? [0, 360] : [0, -360],
      transition: {
        duration: 0.7,
        ease: "easeInOut"
      }
    }
  };

  return (
    <ToggleWrapper 
      isDarkMode={isDarkMode}
      onClick={toggleTheme}
      variants={toggleVariants}
      whileHover="hover"
      whileTap="tap"
      animate="rotate"
    >
      <IconWrapper
        isDarkMode={isDarkMode}
        variants={iconVariants}
        initial={false}
        animate="rotate"
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconWrapper>
    </ToggleWrapper>
  );
};

export default ThemeToggle;