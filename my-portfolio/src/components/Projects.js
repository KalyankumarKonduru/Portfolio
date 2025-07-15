import React, { useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Typography, Container, Grid, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const StyledSection = styled.section`
  padding: 100px 0;
  background-color: ${props => props.theme.colors.background};
  transition: background-color 0.5s ease;
`;

const ProjectCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.cardBg};
  border-radius: 8px;
  padding: 2rem 1.75rem;
  height: 100%;
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1),
              background-color 0.5s ease,
              box-shadow 0.3s ease;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, ${props => props.theme.colors.accent}, ${props => props.theme.colors.highlight});
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px -15px rgba(0, 0, 0, 0.3);
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
`;

const ProjectTitle = styled(Typography)`
  color: ${props => props.theme.colors.text};
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const ProjectDescription = styled(Typography)`
  color: ${props => props.theme.colors.secondaryText};
  font-size: 16px;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  margin: 20px 0;
  list-style: none;
  
  li {
    color: ${props => props.theme.colors.accent};
    background-color: ${props => props.theme.isDarkMode ? 'rgba(237, 109, 11, 0.1)' : 'rgba(237, 109, 11, 0.1)'};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-family: 'SF Mono', 'Fira Code', monospace;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: ${props => props.theme.isDarkMode ? 'rgba(237, 109, 11, 0.2)' : 'rgba(237, 109, 11, 0.2)'};
      transform: translateY(-2px);
    }
  }
`;

const IconButton = styled(motion.a)`
  color: ${props => props.theme.colors.text};
  padding: 10px;
  min-width: auto;
  display: inline-flex;
  transition: color 0.3s ease, transform 0.3s ease;
  margin-right: 10px;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  svg {
    font-size: 20px;
  }
`;

const SectionTitle = styled(Typography)`
  color: ${props => props.theme.colors.accent};
  font-size: clamp(26px, 5vw, 32px);
  font-weight: 600;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, ${props => props.theme.colors.accent}, transparent);
  }
`;

const TerminalCard = styled(motion.div)`
  background-color: ${props => props.theme.isDarkMode ? '#1a1e2e' : '#f8f8f8'};
  color: ${props => props.theme.isDarkMode ? '#e2e8f0' : '#1a202c'};
  border-radius: 8px;
  padding: 2rem;
  height: 100%;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px -15px rgba(0, 0, 0, 0.3);
  }
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const TerminalButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  
  &.red {
    background-color: #ff5f56;
  }
  
  &.yellow {
    background-color: #ffbd2e;
  }
  
  &.green {
    background-color: #27c93f;
  }
`;

const TerminalTitle = styled.div`
  flex-grow: 1;
  text-align: center;
  font-size: 14px;
  opacity: 0.8;
`;

const ConsoleText = styled.div`
  color: ${props => props.theme.isDarkMode ? '#e2e8f0' : '#1a202c'};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  
  &.command::before {
    content: '$ ';
    color: ${props => props.theme.colors.accent};
    margin-right: 8px;
  }
  
  &.output {
    color: ${props => props.theme.isDarkMode ? '#a0aec0' : '#4a5568'};
    padding-left: 16px;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: ${props => props.theme.colors.accent};
  margin-left: 4px;
  animation: blink 1s step-end infinite;
  
  @keyframes blink {
    from, to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const consoleLines = [
  { type: 'command', text: 'Accessing server' },
  { type: 'output', text: 'Access Granted' },
  { type: 'command', text: 'fetch --projects status' },
  { type: 'output', text: 'STATUS: Development in progress' },
  { type: 'output', text: 'CURRENT: Building awesome projects' },
  { type: 'output', text: 'ETA: Coming soon!' },
];

// Project component with animation
function ProjectCard3D({ project, index, theme }) {
  const [cardRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut" 
      } 
    }
  };

  return (
    <ProjectCard 
      ref={cardRef}
      theme={theme}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ scale: 1.02 }}
    >
      <ProjectTitle variant="h5" theme={theme}>{project.title}</ProjectTitle>
      <ProjectDescription theme={theme}>{project.description}</ProjectDescription>
      <TechList theme={theme}>
        {project.tech.map((tech, techIndex) => (
          <motion.li 
            key={techIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + (techIndex * 0.05) }}
          >
            {tech}
          </motion.li>
        ))}
      </TechList>
      <div>
        <IconButton
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          theme={theme}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          href={project.external}
          target="_blank"
          rel="noopener noreferrer"
          theme={theme}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <OpenInNewIcon />
        </IconButton>
      </div>
    </ProjectCard>
  );
}

// Terminal console with typing effect
// Terminal console with infinite typing effect
function ProjectThree({ style, theme }) {
  const [displayedLines, setDisplayedLines] = React.useState([]);
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0);
  const [currentTypedText, setCurrentTypedText] = React.useState('');
  const [blink, setBlink] = React.useState(true);
  const [isRestarting, setIsRestarting] = React.useState(false);

  // Terminal card animation variants
  const terminalVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.6,
        ease: "easeOut" 
      } 
    }
  };

  // Blinking cursor effect
  React.useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Typewriter logic with infinite loop
  React.useEffect(() => {
    if (isRestarting) {
      // Briefly pause before restarting
      const restartTimeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentTypedText('');
        setIsRestarting(false);
      }, 2000);
      
      return () => clearTimeout(restartTimeout);
    }
    
    // If we've shown all lines, reset to start again
    if (currentLineIndex >= consoleLines.length) {
      setIsRestarting(true);
      return;
    }

    const currentLine = consoleLines[currentLineIndex].text;
    const typingSpeed = 70; // ms per character
    const pauseAfterLine = 800; // ms to pause after finishing a line

    if (currentTypedText.length < currentLine.length) {
      // Type forward until the line is complete
      const timeout = setTimeout(() => {
        setCurrentTypedText(
          currentLine.slice(0, currentTypedText.length + 1)
        );
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      // Once line is fully typed, add it to displayedLines, reset typed text, and go to next line
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, { 
          ...consoleLines[currentLineIndex],
          text: currentLine
        }]);
        setCurrentTypedText('');
        setCurrentLineIndex((prev) => prev + 1);
      }, pauseAfterLine);
      return () => clearTimeout(timeout);
    }
  }, [currentTypedText, currentLineIndex, isRestarting]);

  return (
    <TerminalCard 
      theme={theme}
      style={style}
      variants={terminalVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
    >
      <TerminalHeader theme={theme}>
        <TerminalButton className="red" />
        <TerminalButton className="yellow" />
        <TerminalButton className="green" />
        <TerminalTitle>dev-terminal</TerminalTitle>
      </TerminalHeader>

      {/* "LOADING" with its own blinking cursor */}
      {displayedLines.length === 0 && (
        <ConsoleText theme={theme} className="command">
          LOADING
          <Cursor theme={theme} />
        </ConsoleText>
      )}

      {/* Display lines that have finished typing */}
      {displayedLines.map((line, idx) => (
        <ConsoleText key={idx} theme={theme} className={line.type}>
          {line.text}
        </ConsoleText>
      ))}

      {/* If we're still typing lines, show the partially typed line + cursor */}
      {!isRestarting && currentLineIndex < consoleLines.length && (
        <ConsoleText theme={theme} className={consoleLines[currentLineIndex].type}>
          {currentTypedText}
          <span style={{ visibility: blink ? 'visible' : 'hidden' }}>|</span>
        </ConsoleText>
      )}
      
      {/* When restarting, show a blinking cursor */}
      {isRestarting && (
        <ConsoleText theme={theme} className="command">
          <Cursor theme={theme} />
        </ConsoleText>
      )}
    </TerminalCard>
  );
}

// Example Projects
const projects = [
  {
    title: 'Orama',
    description:
      'ORAMA is an AI-powered object detection and risk assessment system designed for low-visibility driving conditions like fog and rain, leveraging YOLOv8 and adaptive preprocessing to enhance safety. It delivers real-time visual alerts and collision risk analysis, targeting future SaaS deployment for autonomous vehicles.',
    tech: ['Python', 'Tensorflow', 'Jupyter', 'Yolov8', 'numpy'],
    github: 'https://github.com/KalyankumarKonduru/Orama',
    external: 'https://github.com/KalyankumarKonduru/Orama',
  },
  {
    title: 'Epic MCP Server',
    description:
      'A backend MCP server that integrates with the Epic FHIR API to create and retrieve patient data for a medical chatbot. It leverages MCP tool calling functions to enable secure and efficient communication with Epic systems, ensuring reliable and real-time healthcare responses.',
    tech: ['Node.js', 'JWT', 'MCP SDK'],
    github: 'https://github.com/KalyankumarKonduru/Epic-MCP',
    external: 'https://github.com/KalyankumarKonduru/Epic-MCP',
  },
  {
    title: 'MongoDB Atlas MCP server',
    description:
      'A backend MCP server that parses medical documents, generates embeddings using Xenova Transformers, and stores them in MongoDB Atlas with vector search enabled. Designed to support intelligent querying and retrieval through MCP function calls, enabling fast, context-aware responses in a medical chatbot.',
    tech: ['Xenova Transformers', 'Node.js', 'MCP SDK', 'MongoDB Atlas'],
    github: 'https://github.com/KalyankumarKonduru/MCP-Server',
    external: 'https://github.com/KalyankumarKonduru/MCP-Server',
  },
  {
    title: 'Medical Chatbot',
    description:
      'A full stack medical chatbot application that connects users with multiple MCP servers to provide accurate, real-time health-related responses. Utilizes API integrations for intelligent conversations and personalized care.',
    tech: ['MeteorJS', 'React', 'Node.js', 'MongoDB Atlas'],
    github: 'https://github.com/KalyankumarKonduru/MCP',
    external: 'https://github.com/KalyankumarKonduru/MCP',
  },
  {
    title: 'Alivio',
    description:
      'A full stack application that streamlines event management by offering scalable event planning and booking solutions. Features include secure user authentication with role-based access control and a responsive, cross-platform design.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/KalyankumarKonduru/Alivio',
    external: 'https://alivio.onrender.com/',
  },
];

function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Get theme context
  const theme = useContext(ThemeContext);

  // Title animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      } 
    }
  };

  return (
    <StyledSection ref={ref} id="work" theme={theme}>
      <Container>
        <Box mb={6}>
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SectionTitle variant="h2" theme={theme}>My Repository</SectionTitle>
          </motion.div>
        </Box>

        <Grid container spacing={7}>
          {/* Map projects to ProjectCard3D components */}
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <ProjectCard3D 
                project={project} 
                index={index}
                theme={theme} 
              />
            </Grid>
          ))}

          {/* The terminal card */}
          <Grid item xs={12} md={6} lg={4}>
            <ProjectThree theme={theme} />
          </Grid>
        </Grid>
      </Container>
    </StyledSection>
  );
}

export default Projects;