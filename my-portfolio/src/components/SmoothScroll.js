import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const SmoothScroll = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      lerp: 0.075,
      smartphone: {
        smooth: true
      },
      tablet: {
        smooth: true
      }
    });

    // Update scroll on page content change
    setTimeout(() => {
      scroll.update();
    }, 500);

    // Clean up
    return () => scroll.destroy();
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
};

export default SmoothScroll;