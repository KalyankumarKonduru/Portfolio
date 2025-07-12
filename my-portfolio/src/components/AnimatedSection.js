import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedSection = ({ children, id, className }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const elements = section.querySelectorAll('.animate-gsap');

    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        { 
          y: 50, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Framer Motion variants for initial page load animations
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.6, 0.05, -0.01, 0.9],
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`${className || ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      data-scroll-section
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;