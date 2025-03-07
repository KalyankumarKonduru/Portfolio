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

      {/* Marquee Row 1 (Left-to-Right) */}
      <div className="techstack-marquee">
        <div className="techstack-inner">
          <div className="tech-item">React</div>
          <div className="tech-item">Node.js</div>
          <div className="tech-item">MongoDB</div>
          <div className="tech-item">AWS</div>
          <div className="tech-item">Docker</div>
          <div className="tech-item">Git</div>
          <div className="tech-item">Next.js</div>
          <div className="tech-item">TensorFlow</div>
          <div className="tech-item">Python</div>
          {/* Repeat items for continuous loop */}
          <div className="tech-item">React</div>
          <div className="tech-item">Node.js</div>
          <div className="tech-item">MongoDB</div>
          <div className="tech-item">AWS</div>
          <div className="tech-item">Docker</div>
          <div className="tech-item">Git</div>
          <div className="tech-item">Next.js</div>
          <div className="tech-item">TensorFlow</div>
          <div className="tech-item">Python</div>
        </div>
      </div>

      {/* Marquee Row 2 (Right-to-Left) */}
      <div className="techstack-marquee reverse">
        <div className="techstack-inner">
          <div className="tech-item">HTML</div>
          <div className="tech-item">CSS</div>
          <div className="tech-item">JavaScript</div>
          <div className="tech-item">Express</div>
          <div className="tech-item">SQL</div>
          <div className="tech-item">TypeScript</div>
          <div className="tech-item">Jest</div>
          <div className="tech-item">C++</div>
          {/* Repeat items for continuous loop */}
          <div className="tech-item">HTML</div>
          <div className="tech-item">CSS</div>
          <div className="tech-item">JavaScript</div>
          <div className="tech-item">Express</div>
          <div className="tech-item">SQL</div>
          <div className="tech-item">TypeScript</div>
          <div className="tech-item">Jest</div>
          <div className="tech-item">C++</div>
        </div>
      </div>
    </section>
  );
}

export default TechStack;
