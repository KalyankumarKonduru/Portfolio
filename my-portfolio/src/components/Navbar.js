import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { ThemeContext } from '../context/ThemeContext';
import { WiDaySunny, WiMoonWaxingCrescent4 } from 'react-icons/wi';

// Completely transparent navbar with no card structure
const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  z-index: 1000;
  transition: all 0.4s ease;
  background-color: transparent;
  
  /* Control visibility based on scroll position */
  opacity: ${props => props.visible ? 1 : 0};
  pointer-events: ${props => props.visible ? 'auto' : 'none'};
  transform: translateY(${props => props.visible ? 0 : '-20px'});
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: rotate(360deg);
    }
  }
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.isDarkMode ? '#ffffff' : '#333333'};
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  padding: 8px 0;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.accent};
    transition: width 0.3s ease;
  }
  
  &:hover, &.active {
    color: ${props => props.theme.colors.accent};
    
    &::after {
      width: 100%;
    }
  }
`;

const ResumeButton = styled.a`
  color: ${props => props.theme.colors.accent};
  border: 1px solid ${props => props.theme.colors.accent};
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: transparent;
  
  &:hover {
    background-color: ${props => props.theme.isDarkMode ? 
      'rgba(237, 109, 11, 0.1)' : 
      'rgba(237, 109, 11, 0.1)'
    };
    transform: translateY(-2px);
  }
`;

const ThemeToggle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  padding: 0;
  color: ${props => props.theme.isDarkMode ? '#f1c40f' : '#f39c12'};
  font-size: 24px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(15deg);
  }
  
  &:focus {
    outline: none;
  }
`;

// Floating theme toggle that appears only in hero section
const FloatingThemeToggle = styled(ThemeToggle)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
  opacity: ${props => props.visible ? 1 : 0};
  pointer-events: ${props => props.visible ? 'auto' : 'none'};
  transition: all 0.4s ease;
`;

function Navbar() {
  const theme = useContext(ThemeContext);
  const [activeLink, setActiveLink] = useState('');
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [heroToggleVisible, setHeroToggleVisible] = useState(true);
  
  // Handle navbar visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Get hero section height
      const heroSection = document.getElementById('hero');
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
      
      // Control navbar visibility
      if (window.scrollY >= heroHeight - 100) {
        setNavbarVisible(true);
        setHeroToggleVisible(false); // Hide hero toggle when navbar appears
      } else {
        setNavbarVisible(false);
        setHeroToggleVisible(true); // Show hero toggle when in hero section
      }
      
      // Update active link
      const sections = ['about', 'work', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveLink(section);
          break;
        }
      }
    };
    
    // Initial call to set correct state on load
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'About', target: 'about' },
    { name: 'Work', target: 'work' },
    { name: 'Contact', target: 'contact' },
  ];

  return (
    <>
      {/* Floating theme toggle for hero section only */}
      <FloatingThemeToggle 
        onClick={theme.toggleTheme}
        theme={theme}
        visible={heroToggleVisible}
        aria-label="Toggle theme"
      >
        {theme.isDarkMode ? 
          <WiMoonWaxingCrescent4 style={{ fontSize: '24px' }} /> : 
          <WiDaySunny style={{ fontSize: '24px' }} />
        }
      </FloatingThemeToggle>
      
      {/* Main navbar that appears after hero section */}
      <Nav theme={theme} visible={navbarVisible}>
        <Logo>
          <img src="/images/kkk.jpeg" alt="Logo" />
        </Logo>
        
        <NavItems>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.target}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              theme={theme}
              className={activeLink === item.target ? 'active' : ''}
            >
              {item.name}
            </NavLink>
          ))}
          
          <ResumeButton 
            href="/KalyankumarKonduru.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            theme={theme}
          >
            Resume
          </ResumeButton>
          
          <ThemeToggle 
            onClick={theme.toggleTheme}
            theme={theme}
            aria-label="Toggle theme"
          >
            {theme.isDarkMode ? 
              <WiMoonWaxingCrescent4 style={{ fontSize: '24px' }} /> : 
              <WiDaySunny style={{ fontSize: '24px' }} />
            }
          </ThemeToggle>
        </NavItems>
      </Nav>
    </>
  );
}

export default Navbar;