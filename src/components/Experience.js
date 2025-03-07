// src/components/Experience.js
import React, { useRef, useEffect, useState } from "react";

function Experience() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null); // Reference for timeline container
  const lineRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Fade-in effect for the entire section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate the vertical progress line based on the timeline container
  useEffect(() => {
    function animateLine() {
      if (!timelineRef.current || !lineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top > windowHeight) {
        // Timeline is below the viewport: no progress
        lineRef.current.style.height = "0%";
      } else if (rect.bottom < 0) {
        // Timeline is above the viewport: full progress
        lineRef.current.style.height = "100%";
      } else {
        // Calculate progress: how much of the timeline container is visible
        const progress = (windowHeight - rect.top) / (rect.height + windowHeight);
        lineRef.current.style.height = `${Math.min(Math.max(progress, 0), 1) * 100}%`;
      }
    }

    window.addEventListener("scroll", animateLine);
    animateLine(); // Initial check
    return () => window.removeEventListener("scroll", animateLine);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`fade-in-section ${visible ? "visible" : ""}`}
    >
      <h2>MY CAREER & EXPERIENCE</h2>

      {/* Common container for both timeline items and the vertical line */}
      <div className="exp-timeline-container" style={{ position: "relative" }}>
        {/* Timeline content */}
        <div className="exp-timeline" ref={timelineRef}>
          <div className="exp-item">
            <div className="role-company">
              <div className="role">Bachelor's</div>
              <div className="company">Anna University</div>
            </div>
            <div className="year">2019</div>
            <div className="description">
              Graduated with a Bachelor's in Computer Science, focusing on advanced software
              development and problem-solving.
            </div>
          </div>
          <div className="exp-item">
            <div className="role-company">
              <div className="role">Associate Software Engineer</div>
              <div className="company">Accenture</div>
            </div>
            <div className="year">2021</div>
            <div className="description">
            Designed and developed SaaS applications using React, AngularJS, Node.js, MongoDB, and RESTful APIs. 
            Applied Agile methodologies and test-driven development to enhance stability and reliability. 
            Optimized APIs, restructured database models, and collaborated with DevOps to streamline CI/CD pipelines, ensuring seamless deployment while maintaining version control and efficient code management in Git.
            </div>
          </div>
          <div className="exp-item">
            <div className="role-company">
              <div className="role">Software Engineer</div>
              <div className="company">Accenture</div>
            </div>
            <div className="year">2021</div>
            <div className="description">
            Developed Java backend features based on Jira requirements, integrating Windchill and Polarion tools with regular sprint updates. 
            Optimized cloud infrastructure by testing AWS servers and monitoring Lambda functions. 
            Enhanced deployment efficiency through automation while ensuring accurate user permissions and seamless documentation updates.
            </div>
          </div>
          <div className="exp-item">
            <div className="role-company">
              <div className="role">Master's Student</div>
              <div className="company">Purdue University</div>
            </div>
            <div className="year">2024</div>
            <div className="description">
            Currently pursuing a Master's in Computer Science, specializing in advanced software development and problem-solving. 
            Working on Python projects, applying algorithms, data structures, and AI techniques. 
            Gaining hands-on experience with cloud computing, system design, and scalable application development.
            </div>
          </div>
        </div>

        {/* Vertical progress line, now inside the timeline container */}
        <div
          className="exp-line-container"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "2px", // adjust as needed
          }}
        >
          <div className="exp-line-progress" ref={lineRef} style={{ background: "#ed6d0b", width: "100%", height: "0%" }}></div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
