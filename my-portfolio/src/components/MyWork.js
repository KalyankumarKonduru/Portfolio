// src/components/MyWork.js
import React, { useRef, useEffect, useState } from "react";

function MyWork() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Fade-in
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

  // Console lines
  const consoleLines = [
    ">> ERROR: Connection interrupted",
    ">> Rebooting system...",
    ">> Accessing server",
    ">> Projects in progress",
    ">> Fetching secrets",
    ">> Building new commits",
    ">> Enjoy the show!"
  ];
  const [typedLines, setTypedLines] = useState([]); // Each element is a string
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < consoleLines.length) {
      const currentLine = consoleLines[lineIndex];
      if (charIndex < currentLine.length) {
        // Add next character
        setTypedLines((prev) => {
          const newLines = [...prev];
          if (!newLines[lineIndex]) {
            newLines[lineIndex] = "";
          }
          newLines[lineIndex] += currentLine.charAt(charIndex);
          return newLines;
        });
        const timer = setTimeout(() => {
          setCharIndex(charIndex + 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        // Move to next line
        const nextLineTimer = setTimeout(() => {
          setLineIndex(lineIndex + 1);
          setCharIndex(0);
        }, 500);
        return () => clearTimeout(nextLineTimer);
      }
    }
  }, [charIndex, lineIndex, consoleLines]);

  return (
    <section id="mywork" ref={sectionRef} className={`fade-in-section ${visible ? "visible" : ""}`}>
      <h2>MY WORK</h2>
      <div className="console-area">
        <div className="console-container">
          {typedLines.map((line, i) => (
            <div key={i} className="console-line">
              {line}
            </div>
          ))}
        </div>
      </div>
      <div className="mywork-footer">
        <div>
          <p><strong>Email</strong></p>
          <p>
            <a href="mailto:konduru.kalyan555@gmail.com">konduru.kalyan555@gmail.com</a>
          </p>
        </div>
        <div>
          <p><strong>Social</strong></p>
          <p><a href="#" target="_blank" rel="noreferrer">LinkedIn</a></p>
        </div>
        <div>
          <p>Designed and Developed<br/>by Kalyankumar Konduru</p>
        </div>
      </div>
    </section>
  );
}

export default MyWork;
