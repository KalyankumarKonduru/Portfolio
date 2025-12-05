// src/components/TechStack.js
import React, { useRef, useEffect, useState } from "react";

function TechStack() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className={`fade-in-section ${visible ? "visible" : ""}`}
    >
      <h2>Tech Stack</h2>

      {/* Marquee Row 1 (Left-to-Right) - Frontend & Core Languages */}
      <div className="techstack-marquee">
        <div className="techstack-inner">
          <div className="tech-item">Python</div>
          <div className="tech-item">Java</div>
          <div className="tech-item">JavaScript</div>
          <div className="tech-item">TypeScript</div>
          <div className="tech-item">Go</div>
          <div className="tech-item">React</div>
          <div className="tech-item">Node.js</div>
          <div className="tech-item">Spring Boot</div>
          <div className="tech-item">FastAPI</div>
          <div className="tech-item">Express.js</div>
          <div className="tech-item">Redux</div>
          {/* Repeat items for continuous loop */}
          <div className="tech-item">Python</div>
          <div className="tech-item">Java</div>
          <div className="tech-item">JavaScript</div>
          <div className="tech-item">TypeScript</div>
          <div className="tech-item">Go</div>
          <div className="tech-item">React</div>
          <div className="tech-item">Node.js</div>
          <div className="tech-item">Spring Boot</div>
          <div className="tech-item">FastAPI</div>
          <div className="tech-item">Express.js</div>
          <div className="tech-item">Redux</div>
        </div>
      </div>

      {/* Marquee Row 2 (Right-to-Left) - Databases & Messaging */}
      <div className="techstack-marquee reverse">
        <div className="techstack-inner">
          <div className="tech-item">PostgreSQL</div>
          <div className="tech-item">MongoDB</div>
          <div className="tech-item">Redis</div>
          <div className="tech-item">Kafka</div>
          <div className="tech-item">AWS</div>
          <div className="tech-item">Docker</div>
          <div className="tech-item">Kubernetes</div>
          <div className="tech-item">GKE</div>
          <div className="tech-item">Helm</div>
          <div className="tech-item">Jenkins</div>
          {/* Repeat items for continuous loop */}
          <div className="tech-item">PostgreSQL</div>
          <div className="tech-item">MongoDB</div>
          <div className="tech-item">Redis</div>
          <div className="tech-item">Kafka</div>
          <div className="tech-item">AWS</div>
          <div className="tech-item">Docker</div>
          <div className="tech-item">Kubernetes</div>
          <div className="tech-item">GKE</div>
          <div className="tech-item">Helm</div>
          <div className="tech-item">Jenkins</div>
        </div>
      </div>

      {/* Marquee Row 3 (Left-to-Right) - DevOps & Monitoring */}
      <div className="techstack-marquee">
        <div className="techstack-inner">
          <div className="tech-item">Prometheus</div>
          <div className="tech-item">Grafana</div>
          <div className="tech-item">Git</div>
          <div className="tech-item">GitHub Actions</div>
          <div className="tech-item">Jest</div>
          <div className="tech-item">OAuth 2.0</div>
          <div className="tech-item">JWT</div>
          <div className="tech-item">FHIR</div>
          <div className="tech-item">MCP</div>
          {/* Repeat items for continuous loop */}
          <div className="tech-item">Prometheus</div>
          <div className="tech-item">Grafana</div>
          <div className="tech-item">Git</div>
          <div className="tech-item">GitHub Actions</div>
          <div className="tech-item">Jest</div>
          <div className="tech-item">OAuth 2.0</div>
          <div className="tech-item">JWT</div>
          <div className="tech-item">FHIR</div>
          <div className="tech-item">MCP</div>
        </div>
      </div>
    </section>
  );
}

export default TechStack;