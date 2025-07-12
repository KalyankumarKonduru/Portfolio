import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
`;

const MainCursor = styled(motion.div)`
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: ${props => props.theme.colors.highlight};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const FollowerCursor = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid ${props => props.theme.colors.highlight};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.5;
`;

const TrailEffect = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.highlight};
  opacity: 0.3;
  pointer-events: none;
`;

const CustomCursor = () => {
  const { colors } = useContext(ThemeContext);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const trailsRef = useRef([]);
  const trailCount = 10;

  useEffect(() => {
    // Initialize trail positions
    trailsRef.current = Array(trailCount).fill().map(() => ({ x: 0, y: 0 }));

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update trail positions with a delay effect
      setTimeout(() => {
        trailsRef.current = [
          { x: e.clientX, y: e.clientY },
          ...trailsRef.current.slice(0, trailCount - 1)
        ];
      }, 50);
    };

    // Track hover state for interactive elements
    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('hoverable')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <CursorWrapper>
      <MainCursor
        style={{ 
          backgroundColor: colors.highlight
        }}
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <FollowerCursor
        style={{ 
          borderColor: colors.highlight 
        }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          mass: 0.8,
        }}
      />
      {Array(trailCount).fill().map((_, index) => {
        const trail = trailsRef.current[index] || { x: 0, y: 0 };
        return (
          <TrailEffect
            key={index}
            style={{
              left: trail.x - 4,
              top: trail.y - 4,
              backgroundColor: colors.highlight,
              opacity: 0.3 - (index * 0.03),
              scale: 1 - (index * 0.08),
            }}
          />
        );
      })}
    </CursorWrapper>
  );
};

export default CustomCursor;