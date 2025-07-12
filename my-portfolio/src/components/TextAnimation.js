import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import styled from 'styled-components';

const TextContainer = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
`;

const TextAnimation = ({ 
  children, 
  animation = 'fadeIn', 
  duration = 1000, 
  delay = 0,
  staggerDelay = 50,
  className = '',
  tag = 'span'
}) => {
  const containerRef = useRef(null);
  const Tag = tag;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split text into individual characters or words
    const splitText = () => {
      const text = container.textContent;
      container.textContent = '';
      
      // Split by character or word based on animation type
      const splitBy = animation === 'letterFadeIn' || animation === 'letterSlideUp' ? '' : ' ';
      const items = text.split(splitBy);
      
      items.forEach((item, i) => {
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        
        const inner = document.createElement('span');
        inner.style.display = 'inline-block';
        inner.textContent = splitBy === '' ? item : `${item}${i < items.length - 1 ? ' ' : ''}`;
        inner.classList.add('anime-item');
        
        wrapper.appendChild(inner);
        container.appendChild(wrapper);
      });
      
      return container.querySelectorAll('.anime-item');
    };

    const elements = splitText();
    let animeConfig = {};

    // Configure animation based on type
    switch (animation) {
      case 'fadeIn':
        animeConfig = {
          targets: elements,
          opacity: [0, 1],
          duration: duration,
          delay: anime.stagger(staggerDelay, {start: delay}),
          easing: 'easeOutExpo'
        };
        break;
      case 'slideUp':
        animeConfig = {
          targets: elements,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: duration,
          delay: anime.stagger(staggerDelay, {start: delay}),
          easing: 'easeOutExpo'
        };
        break;
      case 'letterFadeIn':
        animeConfig = {
          targets: elements,
          opacity: [0, 1],
          duration: duration,
          delay: anime.stagger(staggerDelay, {start: delay}),
          easing: 'easeOutExpo'
        };
        break;
      case 'letterSlideUp':
        animeConfig = {
          targets: elements,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: duration,
          delay: anime.stagger(staggerDelay, {start: delay}),
          easing: 'easeOutExpo'
        };
        break;
      case 'reveal':
        elements.forEach(el => {
          el.style.opacity = 0;
          el.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
        });
        animeConfig = {
          targets: elements,
          opacity: [0, 1],
          clipPath: ['polygon(0 0, 0 0, 0 100%, 0 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'],
          duration: duration,
          delay: anime.stagger(staggerDelay, {start: delay}),
          easing: 'easeOutQuint'
        };
        break;
      default:
        animeConfig = {
          targets: elements,
          opacity: [0, 1],
          duration: duration,
          delay: anime.stagger(staggerDelay, {start: delay}),
          easing: 'easeOutExpo'
        };
    }

    // Run the animation
    anime(animeConfig);

    // Cleanup function
    return () => {
      anime.remove(elements);
    };
  }, [animation, duration, delay, staggerDelay, children]);

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  );
};

export default TextAnimation;