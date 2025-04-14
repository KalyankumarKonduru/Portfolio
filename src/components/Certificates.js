// src/components/Certificates.js
import React from 'react';
import styled from 'styled-components';
import { Typography, Container, Grid } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

// 1) Import the external link icon
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Styled Components
const StyledSection = styled.section`
  padding: 100px 0;
  min-height: 100vh;
  background-color: #0a192f;
  display: flex;
  align-items: center;
`;

const CertificateCard = styled(animated.div)`
  background-color: #112240;
  border-radius: 4px;
  padding: 2rem;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CertificateTitle = styled(Typography)`
  && {
    color: #ccd6f6;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 1rem;

    &:hover {
      color: #64ffda;
    }
  }
`;

const CertificateDescription = styled(Typography)`
  && {
    color: #8892b0;
    font-size: 16px;
    margin-bottom: 1rem;
  }
`;

// 2) Styled icon button for the external link
const IconButton = styled.a`
  color: #ccd6f6;
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #64ffda;
  }

  svg {
    font-size: 20px;
  }
`;

function Certificates() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { duration: 500 },
  });

  // 3) Example array with optional 'link' field for the external icon
  const certificates = [
    {
      title: 'Microsoft Certified: Power BI Data Analyst Associate',
      description:
        'Acquired proficiency in connecting and transforming data, implementing data models, and creating visualizations and dashboards to drive business decisions. Developed expertise in using DAX (Data Analysis Expressions) to create formulas and expressions for dynamic data analysis. ',
      link: 'https://learn.microsoft.com/api/credentials/share/en-us/KalyankumarKonduru-6196/11B558E0617BEED4?sharingId=D70107F385967651', // Example link
    },
    {
      title: 'Prompt Engineering',
      description:
        'Completed a specialization in prompt engineering for generative AI systems like ChatGPT, gaining expertise in writing effective prompts to enhance AI interaction, solving complex problems, and boosting productivity through hands-on practice and core competencies in AI utilization. ',
      link: 'https://coursera.org/share/0ab813ee16a37df95ca4d2c46fd98e53', // Example link
    },
  ];

  return (
    <StyledSection id="certificates">
      <Container>
        <animated.div style={fadeIn} ref={ref}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{ color: '#ed6d0b', textAlign: 'center' }}
          >
            Certificates
          </Typography>
          <Grid container spacing={4}>
            {certificates.map((cert, index) => (
              <Grid item xs={12} md={6} key={index}>
                <CertificateCard>
                  <CertificateTitle variant="h5">{cert.title}</CertificateTitle>
                  <CertificateDescription>
                    {cert.description}
                  </CertificateDescription>

                  {/* 4) Use the IconButton if a link exists */}
                  {cert.link && (
                    <IconButton
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate <OpenInNewIcon />
                    </IconButton>
                  )}
                </CertificateCard>
              </Grid>
            ))}
          </Grid>
        </animated.div>
      </Container>
    </StyledSection>
  );
}

export default Certificates;
