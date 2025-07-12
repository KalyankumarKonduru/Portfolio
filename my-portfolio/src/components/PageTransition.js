import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import gsap from 'gsap';
import barba from '@barba/core';

const TransitionOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  transform: translateY(100%);
  z-index: 9999;
  pointer-events: none;
`;

const PageTransition = ({ children }) => {
  const { colors } = useContext(ThemeContext);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    // Initialize Barba.js
    barba.init({
      transitions: [{
        name: 'overlay-transition',
        async leave(data) {
          const done = this.async();
          
          gsap.to(overlayRef.current, {
            duration: 0.5,
            y: 0,
            ease: 'power2.inOut',
            onComplete: done
          });
        },
        async enter(data) {
          gsap.to(overlayRef.current, {
            duration: 0.5,
            y: '-100%',
            ease: 'power2.inOut'
          });
        }
      }]
    });

    return () => {
      barba.destroy();
    };
  }, []);

  return (
    <>
      {children}
      <TransitionOverlay ref={overlayRef} style={{ backgroundColor: colors.background }} />
    </>
  );
};

export default PageTransition;