import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { useSpring, animated } from 'react-spring';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Link } from 'react-scroll';

// Global style to force the typed cursor to be inline
const GlobalStyle = createGlobalStyle`
  .typed-cursor {
    display: inline !important;
    vertical-align: middle !important;
    margin-left: 2px;
    line-height: 1rem !important;
    font-size: 1.5rem !important;
    transform: translateY(-0.5em);
  }
`;

// New wrapper to force inline alignment for the typed text and its cursor
const TypedWrapper = styled.div`
  display: inline-flex;
  align-items: flex-end;
`;

// Styled component for the Bitmoji image
const Bitmoji = styled(animated.img)`
  position: absolute;
  border-radius: 50%;
  object-fit: cover;
`;

// =================== Hero Section ===================
const HeroSection = styled.section`
  min-height: 100vh;
  position: relative; /* Needed for absolutely positioning the Bitmoji */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;

// =================== Footer Section ===================
const FooterSection = styled.footer`
  position: fixed;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 999;
`;

const ArrowsFlowContainer = styled.div`
  position: relative;
  width: 32px;
  height: 60px;
`;

// Keyframes for the top arrow (Arrow1)
const arrow1Flow = keyframes`
  0% {
    opacity: 1;
    filter: drop-shadow(0 0 5px #64ffda);
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 5px #64ffda);
  }
  60% {
    opacity: 0;
    filter: drop-shadow(0 0 15px #64ffda);
  }
  100% {
    opacity: 0;
    filter: drop-shadow(0 0 15px #64ffda);
  }
`;

// Keyframes for the bottom arrow (Arrow2)
const arrow2Flow = keyframes`
  0% {
    opacity: 0;
    filter: drop-shadow(0 0 15px #64ffda);
  }
  50% {
    opacity: 0;
    filter: drop-shadow(0 0 15px #64ffda);
  }
  60% {
    opacity: 1;
    filter: drop-shadow(0 0 5px #64ffda);
  }
  70% {
    opacity: 1;
    filter: drop-shadow(0 0 5px #64ffda);
  }
  75% {
    opacity: 0;
    filter: drop-shadow(0 0 15px #64ffda);
  }
  100% {
    opacity: 0;
    filter: drop-shadow(0 0 15px #64ffda);
  }
`;

const Arrow1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 2rem;
  color: #0a192f;
  transform: rotate(90deg);
  animation: ${arrow1Flow} 1.2s infinite linear;
`;

const Arrow2 = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 2rem;
  color: #0a192f;
  transform: rotate(90deg);
  animation: ${arrow2Flow} 1.2s infinite linear;
`;

export default function Hero() {
  const typedEl = useRef(null);
  const [showArrow, setShowArrow] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  // Compute the initial left position (centered) as a number in pixels.
  // (Assumes the image width is 150px; adjust as needed.)
  const initialLeft = typeof window !== 'undefined' ? window.innerWidth / 2 - 75 : 0;

  // Initialize Typed.js with the cursor enabled
  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: [
        'Hi!',
        'My name is Kalyankumar',
        'I build things for the upcoming AI world!',
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
    return () => typed.destroy();
  }, []);

  // Update scroll position and control arrow visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowArrow(window.scrollY <= 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate the Bitmoji image position & size based on scroll position using numeric values
  const bitmojiSpring = useSpring({
    top: scrollY > 100 ? 10 : 150,      // numbers in px
    left: scrollY > 100 ? 20 : initialLeft,
    width: scrollY > 100 ? 50 : 150,
    height: scrollY > 100 ? 50 : 150,
    config: { tension: 200, friction: 30 },
  });

  return (
    <>
      <GlobalStyle />
      <HeroSection>
        {/* Bitmoji image from public folder */}
        <Bitmoji src="/images/kkk.jpeg" style={bitmojiSpring} alt="Kalyan" />
        {/* Wrap the typed text in an inline-flex container */}
        <TypedWrapper>
          <span
            ref={typedEl}
            style={{
              whiteSpace: 'nowrap',
              color: '#0a192f',
              fontFamily: 'SF Mono, Fira Code, monospace',
              fontSize: '1.5rem',
              textAlign: 'center',
            }}
          />
        </TypedWrapper>
      </HeroSection>

      {showArrow && (
        <FooterSection>
          <Link to="about" smooth duration={500}>
            <ArrowsFlowContainer>
              <Arrow1>{'>'}</Arrow1>
              <Arrow2>{'>'}</Arrow2>
            </ArrowsFlowContainer>
          </Link>
        </FooterSection>
      )}
    </>
  );
}
