import React, { useContext } from 'react';
import styled from 'styled-components';
import { Container, Grid } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ThemeContext } from '../context/ThemeContext';

// Styled Components
const StyledSection = styled.section`
  padding: 100px 0;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  transition: background-color 0.5s ease;
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.accent};
  font-size: clamp(40px, 5vw, 50px);
  font-weight: 700;
  margin-bottom: 60px;
  text-align: center;
  position: relative;
  transition: color 0.5s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(to right, transparent, ${props => props.theme.colors.accent}, transparent);
    transition: background 0.5s ease;
  }
`;

const CertificateCard = styled.div`
  background-color: ${props => props.theme.colors.cardBg};
  border-radius: 8px;
  padding: 2rem;
  height: 100%;
  transition: transform 0.3s ease, 
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

const CertificateTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const CertificateDescription = styled.p`
  color: ${props => props.theme.colors.secondaryText};
  font-size: 16px;
  margin-bottom: 1rem;
  line-height: 1.6;
  transition: color 0.3s ease;
`;

// Styled icon button for the external link
const IconButton = styled.a`
  color: ${props => props.theme.colors.text};
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${props => props.theme.isDarkMode ? 'rgba(237, 109, 11, 0.1)' : 'rgba(237, 109, 11, 0.1)'};

  &:hover {
    color: ${props => props.theme.colors.accent};
    background-color: ${props => props.theme.isDarkMode ? 'rgba(237, 109, 11, 0.2)' : 'rgba(237, 109, 11, 0.2)'};
    transform: translateY(-3px);
  }

  svg {
    font-size: 20px;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

// Floating decoration elements
const Decoration = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.round ? '50%' : '4px'};
  background-color: ${props => props.filled 
    ? props.theme.colors.accent + '20' 
    : 'transparent'
  };
  border: ${props => !props.filled ? `2px solid ${props.theme.colors.accent + '40'}` : 'none'};
  transition: background-color 0.5s ease, border 0.5s ease;
  z-index: 0;
  animation: float ${props => 5 + props.index}s ease-in-out infinite;
  
  @keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(${props => props.index % 2 === 0 ? 15 : -15}px, -15px) rotate(${props => props.index % 2 === 0 ? 5 : -5}deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }
`;

function Certificates() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const theme = useContext(ThemeContext);

  // Decorative elements for visual interest
  const decorations = [
    { x: '10%', y: '15%', size: 40, round: true, filled: true },
    { x: '85%', y: '25%', size: 60, round: false, filled: false },
    { x: '15%', y: '85%', size: 50, round: false, filled: true },
    { x: '80%', y: '75%', size: 35, round: true, filled: false },
  ];

  // Certificate items
  const certificates = [
    {
      title: 'Microsoft Certified: Power BI Data Analyst Associate',
      description:
        'Acquired proficiency in connecting and transforming data, implementing data models, and creating visualizations and dashboards to drive business decisions. Developed expertise in using DAX (Data Analysis Expressions) to create formulas and expressions for dynamic data analysis. ',
      link: 'https://learn.microsoft.com/api/credentials/share/en-us/KalyankumarKonduru-6196/11B558E0617BEED4?sharingId=D70107F385967651',
    },
    {
      title: 'Prompt Engineering',
      description:
        'Completed a specialization in prompt engineering for generative AI systems like ChatGPT, gaining expertise in writing effective prompts to enhance AI interaction, solving complex problems, and boosting productivity through hands-on practice and core competencies in AI utilization. ',
      link: 'https://coursera.org/share/0ab813ee16a37df95ca4d2c46fd98e53',
    },
  ];

  return (
    <StyledSection id="certificates" theme={theme}>
      {/* Decorative elements */}
      {decorations.map((dec, index) => (
        <Decoration
          key={index}
          style={{ left: dec.x, top: dec.y }}
          size={dec.size}
          round={dec.round}
          filled={dec.filled}
          theme={theme}
          index={index}
        />
      ))}
      
      <Container>
        <div ref={ref}>
          <SectionTitle theme={theme} className={inView ? 'fade-in' : ''}>
            Certificates
          </SectionTitle>
          
          <Grid container spacing={4} className={inView ? 'stagger-fade-in' : ''}>
            {certificates.map((cert, index) => (
              <Grid item xs={12} md={6} key={index}>
                <CertificateCard theme={theme} className={inView ? 'fade-in' : ''} style={{ animationDelay: `${0.3 + index * 0.2}s` }}>
                  <CertificateTitle theme={theme}>{cert.title}</CertificateTitle>
                  <CertificateDescription theme={theme}>
                    {cert.description}
                  </CertificateDescription>

                  {cert.link && (
                    <IconButton
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      theme={theme}
                    >
                      View Certificate <OpenInNewIcon />
                    </IconButton>
                  )}
                </CertificateCard>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </StyledSection>
  );
}

export default Certificates;