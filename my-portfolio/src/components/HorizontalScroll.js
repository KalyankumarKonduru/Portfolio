import React, { useRef, useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';

gsap.registerPlugin(ScrollTrigger);

// Main container
const ShowcaseSection = styled.section`
  position: relative;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  transition: background-color 0.5s ease;
  overflow: hidden;
`;

// Content wrapper for deck view
const DeckViewWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Section title
const SectionTitle = styled(motion.h2)`
  color: ${props => props.theme.colors.accent};
  font-size: clamp(40px, 5vw, 50px);
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 2px;
    background: linear-gradient(to right, transparent, ${props => props.theme.colors.accent}, transparent);
  }
`;

// Deck container for stacked cards
const DeckContainer = styled(motion.div)`
  position: relative;
  width: 250px;
  height: 350px;
  cursor: pointer;
  perspective: 1000px;
  
  @media (max-width: 768px) {
    width: 200px;
    height: 280px;
  }
`;

// Individual card in deck (stacked)
const StackedCard = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: ${props => props.theme.colors.accent};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
  }
`;

// Card back design
const CardBackDesign = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::after {
    content: 'K';
    position: absolute;
    font-size: 80px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.1);
    font-family: serif;
  }
`;

// Spread view wrapper - this will be pinned
const SpreadViewWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

// Container for horizontal scrolling
const HorizontalScrollContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

// The actual horizontal container
const HorizontalTrack = styled.div`
  display: flex;
  height: 100vh;
  width: ${props => props.totalWidth}px;
  will-change: transform;
`;

// Individual card container in spread view
const CardSlide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

// Individual spread card
const SpreadCard = styled(motion.div)`
  position: relative;
  width: 250px;
  height: 350px;
  cursor: pointer;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  @media (max-width: 768px) {
    width: 200px;
    height: 280px;
  }
`;

// Card inner container for flip animation
const CardInner = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

// Card face (front and back)
const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
`;

// Card back (facedown)
const CardBack = styled(CardFace)`
  background: ${props => props.theme.colors.accent};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
  }
`;

// Card front (face-up)
const CardFront = styled(CardFace)`
  background: ${props => props.theme.isDarkMode ? '#112240' : '#ffffff'};
  transform: rotateY(180deg);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// Full screen overlay
const FullScreenOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

// Expanded card container
const ExpandedCard = styled(motion.div)`
  background: ${props => props.theme.isDarkMode ? '#0a192f' : '#ffffff'};
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.accent};
    border-radius: 4px;
  }
`;

// Close button
const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  background: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    color: white;
    transform: rotate(90deg);
  }
`;

// Fixed UI elements container
const FixedUIContainer = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 100;
`;

// Back button
const BackButton = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

// Progress dots
const ProgressDots = styled.div`
  display: flex;
  gap: 10px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.secondaryText};
  opacity: ${props => props.active ? 1 : 0.3};
  transition: all 0.3s ease;
`;

// Expanded content
const ExpandedContent = styled.div`
  padding: 60px 40px 40px;
  
  @media (max-width: 768px) {
    padding: 60px 20px 20px;
  }
`;

const ProjectHeader = styled.div`
  margin-bottom: 40px;
`;

const ProjectNumber = styled.span`
  font-size: 80px;
  font-weight: 700;
  color: ${props => props.theme.isDarkMode ? 'rgba(100, 255, 218, 0.1)' : 'rgba(237, 109, 11, 0.1)'};
  position: absolute;
  top: 20px;
  right: 60px;
`;

const ProjectTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  margin: 0 0 20px 0;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.secondaryText};
  font-size: 18px;
  line-height: 1.8;
  margin: 0 0 30px 0;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
`;

const TechTag = styled.span`
  color: ${props => props.theme.colors.accent};
  background-color: ${props => props.theme.isDarkMode ? 'rgba(237, 109, 11, 0.1)' : 'rgba(237, 109, 11, 0.1)'};
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'SF Mono', 'Fira Code', monospace;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &.primary {
    background-color: ${props => props.theme.colors.accent};
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(237, 109, 11, 0.3);
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.colors.text};
    
    &:hover {
      background-color: ${props => props.theme.colors.text};
      color: ${props => props.theme.colors.background};
    }
  }
`;

// Mini card preview info
const MiniCardInfo = styled.div`
  color: ${props => props.theme.colors.text};
  text-align: center;
  
  h4 {
    font-size: 16px;
    margin: 0 0 10px 0;
  }
  
  p {
    font-size: 12px;
    opacity: 0.8;
    margin: 0;
  }
`;

// Click instruction
const ClickInstruction = styled(motion.p)`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  color: ${props => props.theme.colors.secondaryText};
  font-size: 14px;
  opacity: 0.7;
  white-space: nowrap;
`;

// Project data
const featuredProjects = [
  {
    number: '01',
    title: 'Orama - AI Vision System',
    description: 'Advanced AI-powered object detection system for low-visibility driving conditions. Uses YOLOv8 for real-time risk assessment and collision prevention.',
    fullDescription: 'ORAMA is an innovative AI-powered object detection and risk assessment system designed specifically for challenging low-visibility driving conditions such as fog, rain, and night driving. Leveraging the power of YOLOv8 and adaptive preprocessing algorithms, it enhances driver safety by providing real-time visual alerts and collision risk analysis.',
    tech: ['Python', 'TensorFlow', 'YOLOv8', 'OpenCV', 'NumPy'],
    github: 'https://github.com/KalyankumarKonduru/Orama',
    external: 'https://github.com/KalyankumarKonduru/Orama'
  },
  {
    number: '02',
    title: 'Medical Chatbot Platform',
    description: 'Full-stack healthcare chatbot with MCP server integration.',
    fullDescription: 'A comprehensive full-stack medical chatbot application that seamlessly connects users with multiple MCP servers to provide accurate, real-time health-related responses. The platform utilizes advanced API integrations for intelligent conversations and personalized care recommendations.',
    tech: ['MeteorJS', 'React', 'Node.js', 'MongoDB', 'MCP SDK'],
    github: 'https://github.com/KalyankumarKonduru/MCP',
    external: 'https://github.com/KalyankumarKonduru/MCP'
  },
  {
    number: '03',
    title: 'Epic FHIR Integration',
    description: 'Backend MCP server for Epic FHIR API integration.',
    fullDescription: 'A robust backend MCP server that integrates seamlessly with the Epic FHIR API to create and retrieve patient data for medical chatbot applications. It leverages MCP tool calling functions to enable secure and efficient communication with Epic systems.',
    tech: ['Node.js', 'JWT', 'FHIR API', 'MCP SDK', 'Express'],
    github: 'https://github.com/KalyankumarKonduru/Epic-MCP',
    external: 'https://github.com/KalyankumarKonduru/Epic-MCP'
  },
  {
    number: '04',
    title: 'Vector Search Engine',
    description: 'MongoDB Atlas MCP server with vector search capabilities.',
    fullDescription: 'An advanced backend MCP server that parses medical documents, generates high-quality embeddings using Xenova Transformers, and stores them in MongoDB Atlas with vector search enabled.',
    tech: ['Xenova', 'MongoDB Atlas', 'Node.js', 'Vector DB', 'MCP'],
    github: 'https://github.com/KalyankumarKonduru/MCP-Server',
    external: 'https://github.com/KalyankumarKonduru/MCP-Server'
  },
  {
    number: '05',
    title: 'Alivio Event Platform',
    description: 'Comprehensive event management platform.',
    fullDescription: 'A full-stack application that streamlines event management by offering scalable event planning and booking solutions. Features secure user authentication with role-based access control and responsive cross-platform design.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/KalyankumarKonduru/Alivio',
    external: 'https://alivio.onrender.com/'
  }
];

const HorizontalScroll = () => {
  const theme = useContext(ThemeContext);
  const [deckSpread, setDeckSpread] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const sectionRef = useRef(null);
  const spreadRef = useRef(null);
  const horizontalRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  // Handle deck click
  const handleDeckClick = () => {
    setDeckSpread(true);
    // Small delay to ensure DOM update
    setTimeout(() => {
      if (spreadRef.current) {
        spreadRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Handle card click in spread view
  const handleCardClick = (index) => {
    const newFlipped = new Set(flippedCards);
    newFlipped.add(index);
    setFlippedCards(newFlipped);
    
    // After flip animation, expand the card
    setTimeout(() => {
      setSelectedCard(index);
    }, 800);
  };

  // Handle close
  const handleClose = () => {
    setSelectedCard(null);
  };

  // Handle back to deck
  const handleBackToDeck = () => {
    setDeckSpread(false);
    setFlippedCards(new Set());
    setSelectedCard(null);
    setCurrentCard(0);
    
    // Kill ScrollTrigger if exists
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }
  };

  // Setup horizontal scroll when cards are spread
  useEffect(() => {
    if (!deckSpread || !spreadRef.current || !horizontalRef.current) return;

    // Ensure ScrollTrigger is refreshed
    ScrollTrigger.refresh();

    // Small delay to ensure DOM is ready
    const setupScrollTrigger = setTimeout(() => {
      const totalCards = featuredProjects.length;
      const cardWidth = window.innerWidth;
      
      // Create the horizontal scroll animation
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: spreadRef.current,
        start: 'top top',
        end: () => `+=${cardWidth * (totalCards - 1)}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const cardIndex = Math.round(progress * (totalCards - 1));
          setCurrentCard(cardIndex);
          
          // Animate the horizontal movement
          gsap.set(horizontalRef.current, {
            x: -progress * cardWidth * (totalCards - 1),
            ease: 'none'
          });
        }
      });
    }, 300);

    return () => {
      clearTimeout(setupScrollTrigger);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [deckSpread]);

  // Calculate total width for horizontal track
  const totalWidth = typeof window !== 'undefined' ? window.innerWidth * featuredProjects.length : 0;

  return (
    <ShowcaseSection ref={sectionRef} theme={theme}>
      {/* Deck View */}
      {!deckSpread && (
        <DeckViewWrapper>
          <SectionTitle 
            theme={theme}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured Projects
          </SectionTitle>

          <DeckContainer
            onClick={handleDeckClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {featuredProjects.map((_, index) => (
              <StackedCard
                key={index}
                theme={theme}
                initial={{ 
                  x: 0,
                  y: 0,
                  rotate: 0
                }}
                animate={{ 
                  x: index * 2,
                  y: index * 2,
                  rotate: index * 0.5
                }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.3
                }}
                style={{ zIndex: featuredProjects.length - index }}
              >
                <CardBackDesign />
              </StackedCard>
            ))}
            <ClickInstruction
              theme={theme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Click to explore projects
            </ClickInstruction>
          </DeckContainer>
        </DeckViewWrapper>
      )}

      {/* Spread Cards View with Horizontal Scroll */}
      {deckSpread && !selectedCard && (
        <SpreadViewWrapper ref={spreadRef}>
          <HorizontalScrollContainer>
            <HorizontalTrack ref={horizontalRef} totalWidth={totalWidth}>
              {featuredProjects.map((project, index) => (
                <CardSlide key={index}>
                  <SpreadCard
                    initial={{ 
                      opacity: 0,
                      y: 300,
                      rotate: -90
                    }}
                    animate={{ 
                      opacity: 1,
                      y: 0,
                      rotate: 0
                    }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    }}
                    onClick={() => handleCardClick(index)}
                    whileHover={{ y: -20 }}
                  >
                    <CardInner
                      style={{
                        transform: flippedCards.has(index) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}
                    >
                      <CardBack theme={theme}>
                        <CardBackDesign />
                      </CardBack>
                      <CardFront theme={theme}>
                        <MiniCardInfo theme={theme}>
                          <h4>{project.title}</h4>
                          <p>{project.description}</p>
                        </MiniCardInfo>
                      </CardFront>
                    </CardInner>
                  </SpreadCard>
                </CardSlide>
              ))}
            </HorizontalTrack>
          </HorizontalScrollContainer>
          
          <FixedUIContainer>
            <ProgressDots>
              {featuredProjects.map((_, index) => (
                <Dot
                  key={index}
                  active={currentCard === index}
                  theme={theme}
                />
              ))}
            </ProgressDots>
            
            <BackButton
              theme={theme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToDeck}
            >
              Back to Deck
            </BackButton>
          </FixedUIContainer>
        </SpreadViewWrapper>
      )}

      {/* Full Screen Expanded View */}
      <AnimatePresence>
        {selectedCard !== null && (
          <FullScreenOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          >
            <ExpandedCard
              theme={theme}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <ProjectNumber theme={theme}>
                {featuredProjects[selectedCard].number}
              </ProjectNumber>
              
              <CloseButton
                theme={theme}
                onClick={handleClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CloseIcon />
              </CloseButton>

              <ExpandedContent>
                <ProjectHeader>
                  <ProjectTitle theme={theme}>
                    {featuredProjects[selectedCard].title}
                  </ProjectTitle>
                  <ProjectDescription theme={theme}>
                    {featuredProjects[selectedCard].fullDescription}
                  </ProjectDescription>
                </ProjectHeader>

                <TechStack>
                  {featuredProjects[selectedCard].tech.map((tech, index) => (
                    <TechTag key={index} theme={theme}>
                      {tech}
                    </TechTag>
                  ))}
                </TechStack>

                <ProjectLinks>
                  <LinkButton
                    className="primary"
                    href={featuredProjects[selectedCard].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    theme={theme}
                  >
                    <GitHubIcon />
                    View Code
                  </LinkButton>
                  <LinkButton
                    className="secondary"
                    href={featuredProjects[selectedCard].external}
                    target="_blank"
                    rel="noopener noreferrer"
                    theme={theme}
                  >
                    <OpenInNewIcon />
                    Live Demo
                  </LinkButton>
                </ProjectLinks>
              </ExpandedContent>
            </ExpandedCard>
          </FullScreenOverlay>
        )}
      </AnimatePresence>
    </ShowcaseSection>
  );
};

export default HorizontalScroll;