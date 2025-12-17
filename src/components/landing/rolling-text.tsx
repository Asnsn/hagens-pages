'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

type RollingTextProps = {
  text: string;
  className?: string;
};

export default function RollingText({ text, className }: RollingTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = text.split(' ');
    containerRef.current.innerHTML = ''; // Limpa o conteúdo inicial

    words.forEach(word => {
      const wordDiv = document.createElement('div');
      wordDiv.className = 'word-wrapper inline-block overflow-hidden mr-4'; // Adicionado mr-4 para espaço
      
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word-span inline-block';
      wordSpan.textContent = word;
      
      wordDiv.appendChild(wordSpan);
      containerRef.current?.appendChild(wordDiv);
    });

    const spans = containerRef.current.querySelectorAll('.word-span');
    
    gsap.set(spans, { yPercent: 100, autoAlpha: 1 });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(spans, {
      yPercent: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, [text]);

  return <h1 ref={containerRef} className={className}></h1>;
}
