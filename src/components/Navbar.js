import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Button, Box, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import { Link } from 'react-scroll';

const StyledAppBar = styled(AppBar)`
  background: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: none;
  transition: transform 0.5s ease-in-out;
  height: 70px;
  transform: ${({ scrolled }) => (scrolled ? 'translateY(0)' : 'translateY(-100%)')};
`;

const NavLink = styled(Link)`
  color: #ccd6f6;
  margin: 0 20px;
  padding: 10px;
  text-decoration: none;
  font-size: 13px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    color: #ed6d0b;
  }
`;

const ResumeButton = styled(Button)`
  color: #ed6d0b;
  border: 1px solid #ed6d0b;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-size: 13px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  line-height: 1;
  text-decoration: none;
  margin-left: 15px;

  &:hover {
    background-color: #ed6d0b;
  }
`;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.9; // Adjust threshold if needed
      const isScrolled = window.scrollY > threshold;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = ['About', 'Experience', 'Work', 'Contact'];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item}>
            <NavLink
              to={item.toLowerCase()=== 'work' ? 'projects' : item.toLowerCase()}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              {item}
            </NavLink>
          </ListItem>
        ))}
        <ListItem>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <ResumeButton variant="outlined">Resume</ResumeButton>
          </a>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar scrolled={scrolled} position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box component="a" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
              src="/images/kkk.jpeg"
              alt="Logo"
              style={{
                height: '42px',
                width: '42px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {menuItems.map((item, index) => (
              <NavLink
                key={item}
                to={item.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                {item}
              </NavLink>
            ))}
            <a href="/KalyankumarKonduru.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <ResumeButton variant="outlined">Resume</ResumeButton>
            </a>
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              backgroundColor: '#112240',
              color: '#ccd6f6'
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
