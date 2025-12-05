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
  margin-bottom: 80px;
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

// Main container for the timeline
const TimelineContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 100px;
`;

// The fixed vertical line
const FixedLine = styled.div`
  position: absolute;
  top: -60px; // Start above the title
  bottom: 0;
  left: 50%;
  width: 2px;
  background-color: ${props => props.theme.colors.accent};
  transform: translateX(-50%);
  z-index: 1;
  opacity: 0.2;
`;

// The growing progress line that animates as user scrolls
const ProgressLine = styled.div`
  position: absolute;
  top: -60px; // Same offset as fixed line
  left: 50%;
  width: 2px;
  height: ${props => props.progress}px;
  background-color: ${props => props.theme.colors.accent};
  transform: translateX(-50%);
  z-index: 2;
  transition: height 0.1s linear;
`;

// NEW: Scrolling pointer that follows the end of the progress line
const ScrollPointer = styled.div`
  position: absolute;
  top: ${props => props.progress - 60}px; // Position at end of progress line
  left: 50%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.accent};
  transform: translateX(-50%);
  z-index: 3;
  transition: top 0.1s linear;
  opacity: ${props => props.hidden ? 0 : 1};
  
  /* Add a subtle glow effect */
  box-shadow: 0 0 10px ${props => props.theme.colors.accent};
`;

// Timeline item container
const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 100px;
  position: relative;
  
  &:nth-child(odd) {
    padding-right: 50%;
    justify-content: flex-end;
    
    .content {
      margin-right: 50px;
      text-align: right;
      border-right: 4px solid ${props => props.active ? props.theme.colors.accent : 'transparent'};
      transition: border-right-color 0.3s ease;
    }
    
    .year {
      right: auto;
      left: calc(50% + 20px);
    }
  }
  
  &:nth-child(even) {
    padding-left: 50%;
    justify-content: flex-start;
    
    .content {
      margin-left: 50px;
      text-align: left;
      border-left: 4px solid ${props => props.active ? props.theme.colors.accent : 'transparent'};
      transition: border-left-color 0.3s ease;
    }
    
    .year {
      left: auto;
      right: calc(50% + 20px);
    }
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// The checkpoint dot on the timeline with blinking effect when active
const TimelineDot = styled.div`
  position: absolute;
  top: 25px;
  left: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.passed ? props.theme.colors.accent : props.theme.isDarkMode ? props.theme.colors.background : '#fff'};
  border: 2px solid ${props => props.theme.colors.accent};
  transform: translateX(-50%);
  z-index: ${props => props.passed ? 1 : 3};
  transition: background-color 0.3s ease, z-index 0.1s;
  
  /* Radar blinking effect only when this is the active dot AND it's being touched by the pointer */
  ${props => props.active && !props.passed && props.touching ? `
    &::before, &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: transparent;
      border: 2px solid ${props.theme.colors.accent};
      animation: radarPulse 2s infinite;
    }
    
    &::before {
      width: 30px;
      height: 30px;
      animation-delay: 0s;
    }
    
    &::after {
      width: 45px;
      height: 45px;
      animation-delay: 0.5s;
    }
    
    @keyframes radarPulse {
      0% {
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 0;
      }
    }
  ` : ''}
`;

// Year badge
const YearBadge = styled.div`
  position: absolute;
  top: 20px;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 500;
  z-index: 4;
`;

// Content card
const ContentCard = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: ${props => props.theme.isDarkMode ? '#112240' : 'white'};
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform: ${props => props.active ? 'translateY(-5px)' : 'none'};
  opacity: ${props => props.active ? 1 : 0.7};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Role = styled.h3`
  color: ${props => props.theme.colors.text};
  margin: 0 0 5px 0;
  font-size: 24px;
  font-weight: 600;
`;

const Company = styled.h4`
  color: ${props => props.theme.colors.accent};
  margin: 0 0 15px 0;
  font-size: 18px;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.secondaryText};
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
`;

// Experience items data
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
    description: "Developed e-commerce platform using React with Redux state management and virtual scrolling for performance. Built Node.js RESTful APIs with JWT authentication and payment integration, configured MongoDB with optimized indexes, and automated testing with Jest and GitHub Actions."
},
  {
    role: "Software Engineer",
    company: "Accenture",
    year: "2022",
    description: "Built Spring Boot microservices with Kafka, Redis, and PostgreSQL on AWS EC2. Developed FastAPI services with async processing and optimized database performance with HikariCP and materialized views. Configured AWS auto-scaling infrastructure with CloudWatch monitoring, implemented OAuth 2.0/JWT security with RBAC, and mentored team on microservices best practices."
},
  {
    role: "Master's Student",
    company: "Purdue University",
    year: "2024",
    description: "Currently pursuing a Master's in Computer Science, specializing in advanced software development and problem-solving. Working on Python projects, applying algorithms, data structures, and AI techniques. Gaining hands-on experience with cloud computing, system design, and scalable application development."
  },
    {
    role: "Software Engineer Intern",
    company: "Medical Informatics Engineering",
    year: "2025",
    description: "Developed MCP-based healthcare chatbot in TypeScript integrating Epic EHR and Aidbox FHIR APIs with ClinicalBERT-powered query routing. Built Kubernetes autoscaler in Go using Prometheus metrics, deployed microservices to GKE with Docker and Helm, and created Grafana dashboards for real-time monitoring of deployment health and performance."
}
];

function Experience() {
  const theme = useContext(ThemeContext);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  // Store dot positions for precise alignment
  const [dotPositions, setDotPositions] = useState([]);
  
  // NEW: Track which dot the pointer is touching
  const [touchingDotIndex, setTouchingDotIndex] = useState(-1);
  
  // NEW: Track if pointer should be hidden after touching a dot
  const [hidePointer, setHidePointer] = useState(false);
  
  // Measure dot positions on mount and window resize
  useEffect(() => {
    const measureDotPositions = () => {
      if (!timelineRef.current) return;
      
      const dots = timelineRef.current.querySelectorAll('.timeline-dot');
      const positions = Array.from(dots).map(dot => {
        const rect = dot.getBoundingClientRect();
        const timelineRect = timelineRef.current.getBoundingClientRect();
        return rect.top - timelineRect.top + rect.height/2;
      });
      
      setDotPositions(positions);
    };
    
    // Initial measurement after DOM is ready
    setTimeout(measureDotPositions, 500);
    
    // Remeasure on window resize
    window.addEventListener('resize', measureDotPositions);
    return () => window.removeEventListener('resize', measureDotPositions);
  }, []);
  
  // Handle scroll to track progress and active item
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return;
      
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate visible height of the timeline (in pixels)
      const timelineTop = Math.max(0, timelineRect.top);
      const visibleHeight = Math.min(viewportHeight, timelineRect.bottom) - timelineTop;
      
      // Calculate progress based on section's position
      if (sectionRect.top >= viewportHeight) {
        // Section is completely below viewport
        setProgress(0);
      } else if (sectionRect.bottom <= 0) {
        // Section is completely above viewport
        setProgress(timelineRect.height);
      } else {
        // Calculate how far we've scrolled into the timeline
        const scrollProgress = Math.min(
          timelineRect.height,
          Math.max(0, viewportHeight - timelineRect.top)
        );
        
        setProgress(scrollProgress);
      }
      
      // Determine active dot based on what's most visible
      const items = document.querySelectorAll('.timeline-item');
      let newActiveIndex = -1;
      let bestVisibility = 0;
      
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const visibility = Math.min(viewportHeight, rect.bottom) - Math.max(0, rect.top);
        
        if (visibility > bestVisibility && visibility > 0) {
          bestVisibility = visibility;
          newActiveIndex = index;
        }
      });
      
      setActiveIndex(newActiveIndex);
      
      // NEW: Check if pointer is touching any dot
      const currentScrollProgress = progress; // Use the progress state instead of undefined scrollProgress
      
      dotPositions.forEach((position, index) => {
        // Define "touching" as within 10px of the center of the dot
        const pointerPosition = currentScrollProgress;
        const isTouching = Math.abs(pointerPosition - position) < 10;
        
        if (isTouching && !isDotPassed(index)) {
          setTouchingDotIndex(index);
          
          // Hide pointer after 2 seconds
          if (!hidePointer) {
            setTimeout(() => {
              setHidePointer(true);
            }, 2000);
          }
        }
      });
      
      // NEW: Show pointer again when scrolling down and away from the touched dot
      if (hidePointer) {
        const touchedPosition = touchingDotIndex >= 0 ? dotPositions[touchingDotIndex] : 0;
        if (currentScrollProgress - touchedPosition > 50) {
          setHidePointer(false);
          setTouchingDotIndex(-1);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dotPositions, hidePointer, touchingDotIndex]);
  
  // Determine if a dot is passed by the progress line
  const isDotPassed = (index) => {
    if (!dotPositions[index]) return false;
    return progress >= dotPositions[index];
  };
  
  return (
    <StyledSection id="experience" ref={sectionRef} theme={theme}>
      <Container maxWidth="lg">
        <SectionTitle theme={theme}>MY CAREER & EXPERIENCE</SectionTitle>
        
        <TimelineContainer ref={timelineRef}>
          <FixedLine theme={theme} />
          <ProgressLine progress={progress} theme={theme} />
          
          {/* NEW: Add the scrolling pointer */}
          <ScrollPointer 
            progress={progress} 
            theme={theme} 
            hidden={hidePointer}
          />
          
          {experienceItems.map((item, index) => {
            const isActive = index === activeIndex;
            const isPassed = isDotPassed(index);
            const isTouching = index === touchingDotIndex;
            
            return (
              <TimelineItem
                key={index}
                className="timeline-item"
                theme={theme}
                active={isActive}
              >
                <YearBadge
                  theme={theme}
                  className="year"
                >
                  {item.year}
                </YearBadge>
                
                <TimelineDot 
                  theme={theme} 
                  active={isActive} 
                  passed={isPassed}
                  touching={isTouching} // NEW: Pass the touching state
                  className="timeline-dot"
                />
                
                <ContentCard
                  className="content"
                  theme={theme}
                  active={isActive}
                >
                  <Role theme={theme}>{item.role}</Role>
                  <Company theme={theme}>{item.company}</Company>
                  <Description theme={theme}>{item.description}</Description>
                </ContentCard>
              </TimelineItem>
            );
          })}
        </TimelineContainer>
      </Container>
    </StyledSection>
  );
}

export default Experience;