import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Typography, Container, Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { ThemeContext } from '../context/ThemeContext';

const StyledSection = styled.section`
  padding-top: 20px;
  padding-bottom: 60px;
  background: ${props => props.theme.colors.background};
  overflow: hidden;
  min-height: 100vh;
  position: relative;
  transition: background-color 0.5s ease;
`;

const MainTitle = styled.h2`
  color: ${props => props.theme.colors.accent};
  font-size: clamp(40px, 5vw, 50px);
  font-weight: 700;
  margin-bottom: 80px;
  text-align: center;
  position: relative;
  width: 100%;
  transition: color 0.5s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 2px;
    background: linear-gradient(to right, transparent, ${props => props.theme.colors.accent}, transparent);
    transition: background 0.5s ease;
  }
`;

const CategoryTitle = styled.h3`
  color: ${props => props.theme.colors.accent};
  font-size: 20px !important;
  font-weight: 500;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: left;
  position: relative;
  padding-left: 15px;
  line-height: 1;
  transition: color 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 20px;
    background: ${props => props.theme.colors.accent};
    border-radius: 2px;
    transition: background 0.5s ease;
  }
`;

const SkillsRowWrapper = styled.div`
  margin-bottom: 60px;
  padding: 40px 0;
  position: relative;
  background: linear-gradient(to right, transparent, 
    ${props => props.theme.isDarkMode 
      ? 'rgba(100, 255, 218, 0.02)' 
      : 'rgba(237, 109, 11, 0.02)'
    }, transparent);
  border-radius: 20px;
  overflow: hidden;
  transition: background 0.5s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    transition: background 0.5s ease;
  }

  &::before {
    top: 0;
    background: linear-gradient(to right, transparent, 
      ${props => props.theme.isDarkMode 
        ? 'rgba(100, 255, 218, 0.1)' 
        : 'rgba(237, 109, 11, 0.1)'
      }, transparent);
  }

  &::after {
    bottom: 0;
    background: linear-gradient(to right, transparent, 
      ${props => props.theme.isDarkMode 
        ? 'rgba(100, 255, 218, 0.1)' 
        : 'rgba(237, 109, 11, 0.1)'
      }, transparent);
  }
`;

// Improved marquee container
const SkillsRow = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 100px;
`;

// Primary track with pause on hover functionality
const SkillsTrack = styled.div`
  display: flex;
  position: absolute;
  width: fit-content;
  will-change: transform;
  animation: ${props => props.direction === 'left' 
    ? 'marqueeLeft 30s linear infinite'
    : 'marqueeRight 30s linear infinite'
  };
  animation-play-state: ${props => props.isPaused ? 'paused' : 'running'};

  @keyframes marqueeLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  @keyframes marqueeRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
`;

const IconWrapper = styled.div`
  color: ${props => props.theme.colors.secondaryText};
  font-size: 20px;
  margin: 0 1.5rem;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  position: relative;
  padding: 15px;
  border-radius: 8px;
  background: ${props => props.theme.isDarkMode 
    ? 'rgba(255, 255, 255, 0.02)' 
    : 'rgba(0, 0, 0, 0.02)'
  };
  font-family: 'SF Mono', 'Fira Code', monospace;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  
  i {
    font-size: 35px;
    display: block;
    margin-bottom: 8px;
    text-align: center;
    transition: color 0.3s ease;
  }

  span.skill-name {
    display: block;
    font-size: 14px;
    text-align: center;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    white-space: nowrap;
  }

  &:hover {
    color: ${props => props.theme.colors.accent};
    transform: translateY(-8px) scale(1.05);
    background: ${props => props.theme.isDarkMode 
      ? 'rgba(237, 109, 11, 0.05)' 
      : 'rgba(237, 109, 11, 0.05)'
    };
    box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.3);
    
    span.skill-name {
      opacity: 1;
    }
  }
`;

const CategorySection = styled(Box)`
  margin-bottom: 20px;
  margin-top: 80px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const GlowingText = styled.span`
  display: inline-block;
  color: ${props => props.theme.colors.accent};
  text-shadow: 0 0 5px ${props => props.theme.colors.accent + '40'},
               0 0 10px ${props => props.theme.colors.accent + '20'};
  transition: color 0.5s ease, text-shadow 0.5s ease;
`;

const programming = [
  // ... your programming skills array
  { iconClass: 'fas fa-code', name: 'C/C++' },
  { iconClass: 'fab fa-java', name: 'Java' },
  { iconClass: 'fab fa-js', name: 'JavaScript' },
  { iconClass: 'fas fa-layer-group', name: 'TypeScript' },
  { iconClass: 'fab fa-python', name: 'Python' },
  { iconClass: 'fab fa-html5', name: 'HTML' },
  { iconClass: 'fab fa-css3-alt', name: 'CSS' },
  { iconClass: 'fab fa-angular', name: 'Angular' },
  { iconClass: 'fab fa-react', name: 'React.js' },
  { iconClass: 'fab fa-node-js', name: 'Node.js' },
  { iconClass: 'fas fa-forward', name: 'Next.js' },
  { iconClass: 'fab fa-figma', name: 'Figma' },
  { iconClass: 'fas fa-icons', name: 'UI Design' },
];

const databases = [
  // ... your databases skills array
  { iconClass: 'fas fa-database', name: 'MySQL' },
  { iconClass: 'fas fa-server', name: 'PostgreSQL' },
  { iconClass: 'fas fa-leaf', name: 'MongoDB' },
  { iconClass: 'fas fa-database', name: 'NoSQL' },
  { iconClass: 'fas fa-project-diagram', name: 'JIRA' },
  { iconClass: 'fas fa-book', name: 'Confluence' },
  { iconClass: 'fas fa-chart-bar', name: 'Power BI' },
];

const frameworks = [
  // ... your frameworks skills array
  { iconClass: 'fab fa-cloud', name: 'Spring Boot' },
  { iconClass: 'fas fa-archive', name: 'Apache Maven' },
  { iconClass: 'fab fa-aws', name: 'AWS' },
  { iconClass: 'fas fa-cloud', name: 'Azure' },
  { iconClass: 'fas fa-users-cog', name: 'Agile' },
  { iconClass: 'fas fa-sync', name: 'CI/CD' },
  { iconClass: 'fab fa-docker', name: 'Docker' },
  { iconClass: 'fab fa-git-alt', name: 'Git' },
  { iconClass: 'fas fa-brain', name: 'YOLOv8' },
  { iconClass: 'fas fa-project-diagram', name: 'TensorFlow' },
  { iconClass: 'fas fa-robot', name: 'Ultralytics' },
  { iconClass: 'fas fa-chart-line', name: 'Matplotlib' },
  { iconClass: 'fas fa-square-root-alt', name: 'NumPy' }
];

function Skills() {
  const theme = useContext(ThemeContext);
  const [isPaused, setIsPaused] = useState(false);
  
  // Section heading animation
  const [titleRef, titleInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Category animations
  const [progRef, progInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const [dbRef, dbInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const [frameworkRef, frameworkInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Improved marquee effect with pause functionality
  const renderSkillRow = (skills, direction) => {
    // Create a clone of all items to ensure the marquee is continuous
    const totalSkills = [...skills, ...skills, ...skills];
    
    return (
      <SkillsRowWrapper 
        theme={theme}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <SkillsRow>
          <SkillsTrack 
            direction={direction} 
            theme={theme} 
            isPaused={isPaused}
          >
            {totalSkills.map((skill, index) => (
              <IconWrapper 
                key={`${skill.name}-${index}`} 
                theme={theme}
              >
                <i className={skill.iconClass}></i>
                <span className="skill-name">{skill.name}</span>
              </IconWrapper>
            ))}
          </SkillsTrack>
        </SkillsRow>
      </SkillsRowWrapper>
    );
  };

  return (
    <StyledSection id="skills" theme={theme}>
      <Container sx={{ paddingTop: '20px' }}>
        <MainTitle 
          ref={titleRef}
          theme={theme}
        >
          Tech Stack
        </MainTitle>
        
        <CategorySection>
          <CategoryTitle 
            ref={progRef}
            theme={theme} 
          >
            <GlowingText theme={theme}>
              Programming & Web Development
            </GlowingText>
          </CategoryTitle>
          {renderSkillRow(programming, 'left')}
        </CategorySection>

        <CategorySection>
          <CategoryTitle 
            ref={dbRef}
            theme={theme}
          >
            <GlowingText theme={theme}>
              Databases & Tools
            </GlowingText>
          </CategoryTitle>
          {renderSkillRow(databases, 'right')}
        </CategorySection>

        <CategorySection>
          <CategoryTitle 
            ref={frameworkRef}
            theme={theme}
          >
            <GlowingText theme={theme}>
              Frameworks, Cloud & Methodologies
            </GlowingText>
          </CategoryTitle>
          {renderSkillRow(frameworks, 'left')}
        </CategorySection>
      </Container>
    </StyledSection>
  );
}

export default Skills;