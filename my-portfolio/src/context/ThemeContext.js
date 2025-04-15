// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the theme context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if dark mode preference is stored in localStorage
  const storedTheme = localStorage.getItem('theme');
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Initialize state based on stored preference or system preference
  const [isDarkMode, setIsDarkMode] = useState(
    storedTheme ? storedTheme === 'dark' : prefersDarkMode
  );

  // Theme colors for light and dark modes
  const theme = {
    isDarkMode,
    // Dark mode colors
    dark: {
      background: '#0a192f',
      secondaryBg: '#112240',
      text: '#ccd6f6',
      secondaryText: '#8892b0',
      accent: '#ed6d0b',
      highlight: '#64ffda',
      cardBg: '#112240',
      navBackground: 'rgba(10, 25, 47, 0.85)',
    },
    // Light mode colors
    light: {
      background: '#f8f8f8',
      secondaryBg: '#ffffff',
      text: '#333333',
      secondaryText: '#555555',
      accent: '#ed6d0b',
      highlight: '#2a9d8f',
      cardBg: '#ffffff',
      navBackground: 'rgba(248, 248, 248, 0.85)',
    },
    // Current colors based on mode
    colors: {},
    // Toggle function
    toggleTheme: () => {
      setIsDarkMode(!isDarkMode);
    }
  };

  // Update colors object based on current mode
  theme.colors = isDarkMode ? theme.dark : theme.light;

  // Update localStorage and apply body class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    
    // Apply background color to body for smooth transitions
    document.body.style.backgroundColor = theme.colors.background;
    document.body.style.color = theme.colors.text;
    
    // Add transition for smooth color changes
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  }, [isDarkMode, theme.colors.background, theme.colors.text]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;