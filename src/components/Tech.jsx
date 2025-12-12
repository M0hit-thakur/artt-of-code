import React, { useState, useEffect, useRef } from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const [visibleTechs, setVisibleTechs] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleTechs(prev => 
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const techElements = containerRef.current?.querySelectorAll('[data-tech-item]');
    techElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology, index) => (
        <div 
          key={technology.name}
          data-tech-item
          data-index={index}
          className='w-28 h-28'
        >
          {visibleTechs.includes(index) ? (
            <BallCanvas icon={technology.icon} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
