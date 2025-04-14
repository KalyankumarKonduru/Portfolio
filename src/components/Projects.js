import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Typography, Container, Grid, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const StyledSection = styled.section`
  padding: 100px 0;
  background-color: white;
`;

const ProjectCard = styled(animated.div)`
  background-color: #112240;
  transform: translateX(5px);
  border-radius: 4px;
  padding: 2rem 1.75rem;
  height: 100%;
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectTitle = styled(Typography)`
  color: #ccd6f6;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1rem;

  &:hover {
    color: #64ffda;
  }
`;

const ProjectDescription = styled(Typography)`
  color: #8892b0;
  font-size: 16px;
  margin-bottom: 1rem;
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  margin: 20px 0;
  list-style: none;
`;

const IconButton = styled.a`
  color: #ccd6f6;
  padding: 10px;
  min-width: auto;

  &:hover {
    color: #64ffda;
  }

  svg {
    font-size: 20px;
  }
`;

const SectionTitle = styled(Typography)`
  color: #ed6d0b;
  font-size: clamp(26px, 5vw, 32px);
  font-weight: 600;
  margin-bottom: 40px;
`;

const TerminalCard = styled(animated.div)`
  background-color: #ffffff;
  color: #000000;
  border-radius: 4px;
  /* Increased the padding to give more room for lines to stay on one row */
  padding: 7rem 2.75rem;
  height: 100%;
  font-family: monospace;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const consoleLines = [
  '>> Accessing server',
  '>> Access Granted',
  '>> fetch --projects status',
  'STATUS: Development in progress',
  'CURRENT: Building awesome projects',
  'ETA: Coming soon!',
];

// Updated "ProjectThree" with line-by-line typing and no duplication
function ProjectThree({ style }) {
  const [displayedLines, setDisplayedLines] = React.useState([]); // completed lines
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0);
  const [currentTypedText, setCurrentTypedText] = React.useState('');
  const [blink, setBlink] = React.useState(true);

  // Blinking cursor effect
  React.useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Typewriter logic: type each line, then move on to the next
  React.useEffect(() => {
    // If we've shown all lines, stop
    if (currentLineIndex >= consoleLines.length) return;

    const currentLine = consoleLines[currentLineIndex];
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
        setDisplayedLines((prev) => [...prev, currentLine]);
        setCurrentTypedText('');
        setCurrentLineIndex((prev) => prev + 1);
      }, pauseAfterLine);
      return () => clearTimeout(timeout);
    }
  }, [currentTypedText, currentLineIndex]);

  return (
    <TerminalCard style={style}>
      {/* "LOADING" with its own blinking cursor */}
      <div style={{ marginBottom: '1rem' }}>
        LOADING
      </div>

      {/* Display lines that have finished typing */}
      {displayedLines.map((line, idx) => {
        // If it's the last displayed line and all lines have been typed, keep the blinking cursor there
        const isLastLine = idx === displayedLines.length - 1;
        const showFinalCursor =
          isLastLine && displayedLines.length === consoleLines.length && blink;
        return (
          <div key={idx}>
            {line}
            {showFinalCursor && <span style={{ marginLeft: '5px' }}>|</span>}
          </div>
        );
      })}

      {/* If we're still typing lines, show the partially typed line + cursor */}
      {currentLineIndex < consoleLines.length && (
        <div>
          {currentTypedText}
          <span style={{ visibility: blink ? 'visible' : 'hidden' }}>|</span>
        </div>
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
    github: 'https://github.com/KalyankumarKonduru/Orama.git',
    external: 'https://github.com/KalyankumarKonduru/Orama.git',
  },
  {
    title: 'Twarita',
    description:
      'TWARITA is an AI-powered vehicle safety system that combines object detection with real-time collision risk assessment and adaptive decision-making, using sensor data and advanced AI models to predict threats and trigger smart alerts or responses like automatic braking.',
    tech: ['Python', 'Yolov8', 'TensorFlow', 'Ultralytics', 'Matplotlib'],
    github: 'https://github.com/KalyankumarKonduru/twarita.git',
    external: 'https://github.com/KalyankumarKonduru/twarita.git',
  },
  {
    title: 'ApparelAI',
    description:
      'A machine learning model that synthesizes realistic clothing images using Conditional GAN, targeting enhancements in fashion marketing with customizable backgrounds. It leverages Style GAN and cGANs, integrating datasets like Deep Fashion and Fashion-MNIST for high-realism in apparel-to-background synthesis.',
    tech: ['Conditional GAN', 'StyleGAN', 'Python', 'Tensorflow', 'Jupyter'],
    github: 'https://github.com/KalyankumarKonduru/ApparelAI.git',
    external: 'https://github.com/KalyankumarKonduru/ApparelAI.git',
  },
  {
    title: 'Sentoro',
    description:
      'A full stack application that connects users with domain experts through surveys. Features include engaging user interfaces that enhance data accuracy and comprehensive testing protocols documented in Jira to accelerate issue resolution.',
    tech: ['Python', 'NoSQL', 'HTML', 'CSS'],
    github: 'https://github.com/KalyankumarKonduru/Sentoro.git',
    external: 'https://github.com/KalyankumarKonduru/Sentoro.git',
  },
  {
    title: 'Alivio',
    description:
      'A full stack application that streamlines event management by offering scalable event planning and booking solutions. Features include secure user authentication with role-based access control and a responsive, cross-platform design.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/KalyankumarKonduru/Alivio.git',
    external: 'https://alivio.onrender.com/',
  },
];

function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Animate the normal project cards
  const containerVariants = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { duration: 500 },
  });

  return (
    <StyledSection ref={ref} id="work">
      <Container>
        <Box mb={6}>
          <SectionTitle variant="h2">My Repository</SectionTitle>
        </Box>

        <Grid container spacing={7}>
          {/* Existing projects */}
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <ProjectCard style={containerVariants}>
                <ProjectTitle variant="h5">{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechList>
                  {project.tech.map((tech, techIndex) => (
                    <li key={techIndex}>{tech}</li>
                  ))}
                </TechList>
                <IconButton
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  href={project.external}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <OpenInNewIcon />
                </IconButton>
              </ProjectCard>
            </Grid>
          ))}

          {/* The new "Project Three" console typing effect */}
          <Grid item xs={12} md={6} lg={4}>
            <ProjectThree style={containerVariants} />
          </Grid>
        </Grid>
      </Container>
    </StyledSection>
  );
}

export default Projects;
