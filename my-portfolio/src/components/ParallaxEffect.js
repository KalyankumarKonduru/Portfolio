import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: ${props => props.height || '100%'};
`;

const ParallaxElement = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
`;

const ParallaxEffect = ({ children, speed = 0.5, direction = 'vertical', height }) => {
  const containerRef = useRef(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const element = elementRef.current;

    if (!container || !element) return;

    const setTransform = () => {
      // Create parallax effect
      if (direction === 'vertical') {
        gsap.to(element, {
          y: (i, target) => -speed * ScrollTrigger.maxScroll(window) * 
            ScrollTrigger.getScrollFunc(window)() / ScrollTrigger.maxScroll(window),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            invalidateOnRefresh: true,
            scrub: true,
          }
        });
      } else {
        gsap.to(element, {
          x: (i, target) => -speed * ScrollTrigger.maxScroll(window) * 
            ScrollTrigger.getScrollFunc(window)() / ScrollTrigger.maxScroll(window),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            invalidateOnRefresh: true,
            scrub: true,
          }
        });
      }
    };

    setTransform();

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction]);

  return (
    <ParallaxContainer ref={containerRef} height={height}>
      <ParallaxElement ref={elementRef}>
        {children}
      </ParallaxElement>
    </ParallaxContainer>
  );
};

export default ParallaxEffect;