'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

type RollingTextProps = {
  text: string;
  className?: string;
  stagger?: number;
};

const RollingText: React.FC<RollingTextProps> = ({ text, className, stagger = 0.1 }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = text.split(' ');
    containerRef.current.innerHTML = ''; // Clear initial content

    words.forEach(word => {
      const wordDiv = document.createElement('div');
      wordDiv.className = 'word-wrapper inline-block overflow-hidden mr-[0.25em]'; // Use em for spacing
      
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word-span inline-block';
      wordSpan.textContent = word;
      
      wordDiv.appendChild(wordSpan);
      containerRef.current?.appendChild(wordDiv);
    });

    const spans = containerRef.current.querySelectorAll('.word-span');
    
    gsap.set(spans, { yPercent: 110, autoAlpha: 1 });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(spans, {
      yPercent: 0,
      stagger,
      duration: 0.8,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
      if(tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [text, stagger]);

  return <h1 ref={containerRef} className={className}></h1>;
}

export default RollingText;
