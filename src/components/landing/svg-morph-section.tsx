'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const SvgMorphSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hexagonRef = useRef<SVGPathElement>(null);
  const letterHRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !hexagonRef.current || !letterHRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
    });

    // Set initial state
    gsap.set([hexagonRef.current, letterHRef.current], { transformOrigin: 'center center' });

    // Animate hexagon rotation
    tl.to(hexagonRef.current, {
      rotationY: 360,
      ease: 'none',
    }, 0);
    
    // Animate H letter with a parallax effect
    tl.to(letterHRef.current, {
        x: (i, target) => (target.getBoundingClientRect().width * 1.5), // Move H to the right
        ease: 'power1.inOut'
    }, 0);

     tl.to(letterHRef.current, {
        x: 0, // Move H back to original position
        ease: 'power1.inOut'
    }, '>-0.5');


    return () => {
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-24 sm:py-32">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          Inovação em Movimento
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Transformamos ideias em soluções, conectando estratégia e tecnologia.
        </p>
        <div className="mt-12" style={{ width: '200px', height: '150px' }}>
          <svg
            viewBox="0 0 70 40"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hexagon with cutout */}
            <path
              ref={hexagonRef}
              d="M30 2 L15 10 L15 28 L30 36 L45 28 L45 10 Z M30 7 L42 12 L42 26 L30 31 L18 26 L18 12 Z"
              fill="hsl(var(--accent))"
            />
            {/* H letter */}
            <text
                ref={letterHRef}
                x="50"
                y="26"
                fontFamily="Space Grotesk, sans-serif"
                fontSize="20"
                fontWeight="bold"
                fill="hsl(var(--primary))"
            >
                H
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SvgMorphSection;
