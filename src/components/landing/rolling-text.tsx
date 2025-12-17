'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface RollingTextProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
}

export default function RollingText({ text, as: Component = 'div', className, delay = 0 }: RollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'char inline-block';
      if (char === ' ') {
        span.style.width = '0.25em';
      }
      const inner = document.createElement('span');
      inner.className = 'char-inner inline-block';
      inner.style.transform = 'translateY(100%)';
      inner.appendChild(span);
      return inner;
    });

    el.innerHTML = '';
    chars.forEach((charEl) => el.appendChild(charEl));

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        y: '0%',
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.03,
        delay: delay,
      });
    }, el);

    return () => ctx.revert();
  }, [text, delay]);

  return <Component ref={containerRef} className={className}></Component>;
}
