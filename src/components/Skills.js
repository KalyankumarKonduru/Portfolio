import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { Typography, Container, Box } from '@mui/material';

const StyledSection = styled.section`
  padding-top: 20px;
  padding-bottom: 60px;
  background: linear-gradient(to bottom, #0a192f, #112240);
  overflow: hidden;
  min-height: 100vh;
  position: relative;
`;

const MainTitle = styled(Typography)`
  color: #ed6d0b;
  font-size: clamp(40px, 5vw, 50px);
  font-weight: 700;
  margin-bottom: 80px;
  text-align: center;
  position: relative;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 2px;
    background: linear-gradient(to right, transparent, #ed6d0b, transparent);
  }
`;

const CategoryTitle = styled(Typography)`
  color: #ed6d0b;
  font-size: 20px !important;
  font-weight: 500;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: left;
  position: relative;
  padding-left: 15px;
  line-height: 1;


`;

const SkillsRow = styled(animated.div)`
  display: flex;
  white-space: nowrap;
  margin-bottom: 100px;
  padding: 40px 0;
  position: relative;
  background: linear-gradient(to right, transparent, rgba(100, 255, 218, 0.02), transparent);
  border-radius: 20px;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
  }

  &::before {
    top: 0;
    background: linear-gradient(to right, transparent, rgba(100, 255, 218, 0.1), transparent);
  }

  &::after {
    bottom: 0;
    background: linear-gradient(to right, transparent, rgba(100, 255, 218, 0.1), transparent);
  }
`;

const SkillsTrack = styled(animated.div)`
  display: flex;
  gap: 4rem;
  padding: 0 2rem;
  animation: scroll linear infinite;
  animation-duration: 30s;

  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-33.33%);
    }
  }
`;

const IconWrapper = styled.div`
  color: #8892b0;
  font-size: 20px;
  margin: 0 1.5rem;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  position: relative;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  font-family: 'SF Mono', 'Fira Code', monospace;

  i {
    font-size: 35px;
    display: block;
    margin-bottom: 5px;
  }

  &:hover {
    color: #64ffda;
    transform: translateY(-8px);
    background: rgba(100, 255, 218, 0.05);
    box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  }

  &::after {
    content: attr(title);
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    white-space: nowrap;
    color: #64ffda;
    opacity: 0;
    transition: all 0.3s ease;
    background: rgba(10, 25, 47, 0.85);
    padding: 4px 8px;
    border-radius: 4px;
  }

  &:hover::after {
    opacity: 1;
    bottom: -25px;
  }
`;

const CategorySection = styled(Box)`
  margin-bottom: 20px;
  margin-top: 80px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const languagesAndDatabases = [
  { iconClass: 'fab fa-js', name: 'JavaScript' },
  { iconClass: 'fab fa-python', name: 'Python' },
  { iconClass: 'fab fa-html5', name: 'HTML' },
  { iconClass: 'fab fa-css3-alt', name: 'CSS' },
  { iconClass: 'fas fa-terminal', name: 'C++' },
  { iconClass: 'fas fa-database', name: 'MySQL' },
  { iconClass: 'fas fa-server', name: 'PostgreSQL' },
  { iconClass: 'fas fa-leaf', name: 'MongoDB' },
];

const frameworksAndLibraries = [
  { iconClass: 'fab fa-react', name: 'React' },
  { iconClass: 'fas fa-forward', name: 'Next.js' },
  { iconClass: 'fab fa-node-js', name: 'Node.js' },
  { iconClass: 'fas fa-server', name: 'Express' },
  { iconClass: 'fas fa-palette', name: 'Material UI' },
  { iconClass: 'fas fa-vial', name: 'Cypress' },
  { iconClass: 'fab fa-angular', name: 'Angular' },
];

const toolsAndTech = [
  { iconClass: 'fab fa-git-alt', name: 'Git' },
  { iconClass: 'fab fa-docker', name: 'Docker' },
  { iconClass: 'fab fa-aws', name: 'AWS' },
  { iconClass: 'fab fa-windows', name: 'Windows' },
  { iconClass: 'fab fa-figma', name: 'Figma' },
  { iconClass: 'fas fa-code-branch', name: 'VS Code' },
  { iconClass: 'fas fa-file-word', name: 'Office' },
];

function Skills() {
  const renderSkillRow = (skills, direction) => {
    // Triple the array to ensure smooth infinite scrolling
    const sequence = [...skills, ...skills, ...skills];
    
    return (
      <SkillsRow>
        <SkillsTrack 
          style={{
            animationDirection: direction === 'left' ? 'normal' : 'reverse'
          }}
        >
          {sequence.map((skill, index) => (
            <IconWrapper key={`${skill.name}-${index}`} title={skill.name}>
              <i className={skill.iconClass}></i>
            </IconWrapper>
          ))}
        </SkillsTrack>
      </SkillsRow>
    );
  };

  return (
    <StyledSection id="skills">
      <Container sx={{ paddingTop: '20px' }}>
        <MainTitle variant="h2">Tech Stack</MainTitle>
        
        <CategorySection>
          <CategoryTitle variant="subtitle2">Languages & Databases</CategoryTitle>
          {renderSkillRow(languagesAndDatabases, 'left')}
        </CategorySection>

        <CategorySection>
          <CategoryTitle variant="subtitle2">Frameworks & Libraries</CategoryTitle>
          {renderSkillRow(frameworksAndLibraries, 'right')}
        </CategorySection>

        <CategorySection>
          <CategoryTitle variant="subtitle2">Tools & Technologies</CategoryTitle>
          {renderSkillRow(toolsAndTech, 'left')}
        </CategorySection>
      </Container>
    </StyledSection>
  );
}

export default Skills;
