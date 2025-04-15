import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';

const StyledSection = styled.section`
  padding: 100px 0;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  transition: background-color 0.5s ease;
  position: relative;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.accent};
  font-size: clamp(26px, 5vw, 32px);
  font-weight: 600;
  margin-bottom: 60px;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, ${props => props.theme.colors.accent}, transparent);
    transition: background 0.5s ease;
  }
`;

const TimelineContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 20px 0;
`;

// Timeline vertical line
const TimelineLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background-color: ${props => props.theme.isDarkMode ? 'rgba(237, 109, 11, 0.3)' : 'rgba(237, 109, 11, 0.2)'};
  transform: translateX(-50%);
  z-index: 1;
`;

// Active timeline line that grows as user scrolls
const ActiveLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: ${props => props.progress + '%'};
  background-color: ${props => props.theme.colors.accent};
  transform: translateX(-50%);
  transition: height 0.2s linear;
  z-index: 2;
`;

// Timeline item container
const TimelineItem = styled.div`
  display: flex;
  justify-content: ${props => props.position === 'left' ? 'flex-end' : 'flex-start'};
  padding-right: ${props => props.position === 'left' ? '50px' : '0'};
  padding-left: ${props => props.position === 'right' ? '50px' : '0'};
  margin-bottom: 80px;
  position: relative;
  width: 50%;
  margin-left: ${props => props.position === 'right' ? '50%' : '0'};
`;

// Dot in the middle of the timeline
const TimelineDot = styled.div`
  position: absolute;
  top: 20px;
  left: ${props => props.position === 'left' ? 'calc(100% + 8px)' : '-8px'};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.active ? props.theme.colors.accent : props.theme.isDarkMode ? 'rgba(237, 109, 11, 0.3)' : 'rgba(237, 109, 11, 0.2)'};
  z-index: 3;
  transform: ${props => props.active ? 'scale(1.5)' : 'scale(1)'};
  transition: all 0.3s ease;
`;

// Blip effect that appears on the active dot
const BlipEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.accent};
  opacity: ${props => props.active ? 1 : 0};
  z-index: 3;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid ${props => props.theme.colors.accent};
  }
  
  &::before {
    width: 200%;
    height: 200%;
    opacity: ${props => props.active ? 0.7 : 0};
    animation: ${props => props.active ? 'blip 1.5s infinite' : 'none'};
  }
  
  &::after {
    width: 300%;
    height: 300%;
    opacity: ${props => props.active ? 0.5 : 0};
    animation: ${props => props.active ? 'blip 1.5s 0.3s infinite' : 'none'};
  }
  
  @keyframes blip {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0.8;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
`;

// Year badge
const YearBadge = styled.div`
  position: absolute;
  top: 20px;
  ${props => props.position === 'left' ? 'right: -90px;' : 'left: -90px;'}
  background-color: ${props => props.theme.colors.accent};
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  z-index: 3;
`;

// Content card
const TimelineCard = styled.div`
  background-color: ${props => props.theme.isDarkMode ? '#112240' : '#ffffff'};
  border-radius: 8px;
  padding: 25px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform: ${props => props.active ? 'translateY(-5px) scale(1.02)' : 'none'};
  opacity: ${props => props.active ? 1 : 0.9};
  border-left: ${props => props.position === 'right' && props.active ? `4px solid ${props.theme.colors.accent}` : 'none'};
  border-right: ${props => props.position === 'left' && props.active ? `4px solid ${props.theme.colors.accent}` : 'none'};
  text-align: ${props => props.position === 'left' ? 'right' : 'left'};
`;

const Role = styled.h3`
  color: ${props => props.theme.isDarkMode ? '#ccd6f6' : '#333333'};
  margin: 0 0 5px 0;
  font-size: 24px;
  font-weight: 600;
  transition: color 0.3s ease;
`;

const Company = styled.h4`
  color: ${props => props.theme.colors.accent};
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s ease;
`;

const Description = styled.p`
  color: ${props => props.theme.isDarkMode ? '#8892b0' : '#555555'};
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  transition: color 0.3s ease;
`;

// Array of experience items
const experienceItems = [
  {
    role: "Bachelor's",
    company: "Anna University",
    year: "2019",
    description: "Graduated with a Bachelor's in Computer Science, focusing on advanced software development and problem-solving."
  },
  {
    role: "Associate Software Engineer",
    company: "Accenture",
    year: "2021",
    description: "Designed and developed SaaS applications using React, AngularJS, Node.js, MongoDB, and RESTful APIs. Applied Agile methodologies and test-driven development to enhance stability and reliability. Optimized APIs, restructured database models, and collaborated with DevOps to streamline CI/CD pipelines, ensuring seamless deployment while maintaining version control and efficient code management in Git."
  },
  {
    role: "Software Engineer",
    company: "Accenture",
    year: "2021",
    description: "Developed Java backend features based on Jira requirements, integrating Windchill and Polarion tools with regular sprint updates. Optimized cloud infrastructure by testing AWS servers and monitoring Lambda functions. Enhanced deployment efficiency through automation while ensuring accurate user permissions and seamless documentation updates."
  },
  {
    role: "Master's Student",
    company: "Purdue University",
    year: "2024",
    description: "Currently pursuing a Master's in Computer Science, specializing in advanced software development and problem-solving. Working on Python projects, applying algorithms, data structures, and AI techniques. Gaining hands-on experience with cloud computing, system design, and scalable application development."
  }
];

function Experience() {
  const theme = useContext(ThemeContext);
  const timelineRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Track scroll progress to animate timeline
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate progress percentage for line growth
      if (timelineTop > viewportHeight) {
        // Timeline is below viewport
        setProgress(0);
      } else if (timelineTop + timelineHeight < 0) {
        // Timeline is above viewport
        setProgress(100);
      } else {
        // Timeline is partially visible
        const scrollableHeight = timelineHeight - viewportHeight * 0.5;
        const scrolled = Math.abs(timelineTop) + viewportHeight * 0.5;
        const progressPercentage = (scrolled / scrollableHeight) * 100;
        
        setProgress(Math.min(100, Math.max(0, progressPercentage)));
      }
      
      // Find the active timeline item
      const items = document.querySelectorAll('.timeline-dot');
      let currentActiveIndex = 0;
      
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        // If dot is in the middle of the screen, it's active
        if (rect.top <= viewportHeight * 0.6 && rect.bottom >= viewportHeight * 0.4) {
          currentActiveIndex = index;
        }
      });
      
      setActiveIndex(currentActiveIndex);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledSection id="experience" theme={theme}>
      <Container maxWidth="lg">
        <SectionTitle theme={theme}>MY CAREER & EXPERIENCE</SectionTitle>
        
        <TimelineContainer ref={timelineRef}>
          <TimelineLine theme={theme} />
          <ActiveLine progress={progress} theme={theme} />
          
          {experienceItems.map((item, index) => {
            const position = index % 2 === 0 ? 'right' : 'left';
            const isActive = index === activeIndex;
            
            return (
              <TimelineItem 
                key={index} 
                position={position}
              >
                <TimelineDot 
                  position={position} 
                  theme={theme} 
                  active={isActive}
                  className="timeline-dot"
                >
                  <BlipEffect theme={theme} active={isActive} />
                </TimelineDot>
                
                <YearBadge 
                  position={position} 
                  theme={theme}
                >
                  {item.year}
                </YearBadge>
                
                <TimelineCard 
                  theme={theme} 
                  active={isActive}
                  position={position}
                >
                  <Role theme={theme}>{item.role}</Role>
                  <Company theme={theme}>{item.company}</Company>
                  <Description theme={theme}>{item.description}</Description>
                </TimelineCard>
              </TimelineItem>
            );
          })}
        </TimelineContainer>
      </Container>
    </StyledSection>
  );
}

export default Experience;