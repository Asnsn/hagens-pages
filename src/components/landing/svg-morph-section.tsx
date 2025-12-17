'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// H shape path (base shape)
const hPath = "M0 0 H 22 V 25 H 17 V 14 H 5 V 25 H 0 V 0 H 5 V 11 H 17 V 0 H 22 Z";
// Simplified geometric "Think" icon (layered hexagon idea)
const thinkPath = "M11 2 L2 7 V17 L11 22 L20 17 V7 L11 2 Z M11 6 L17 9 V15 L11 18 L5 15 V9 L11 6 Z";
// Simplified geometric "Build" icon (star idea)
const buildPath = "M11 1 L14 8 L22 8 L16 13 L18 21 L11 16 L4 21 L6 13 L0 8 L9 8 L11 1 Z";
// Simplified geometric "Deliver" icon (circle/check idea)
const deliverPath = "M11 0 C 4.92 0 0 4.92 0 11 S 4.92 22 11 22 S 22 17.08 22 11 S 17.08 0 11 0 Z M8 12 L10 14 L15 9";


const SvgMorphSection = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !pathRef.current) return;

    // Define the sequence of shapes for the animation
    const shapes = [hPath, thinkPath, buildPath, deliverPath, hPath];
    let currentIndex = 0;

    // Set the initial shape
    gsap.set(pathRef.current, { attr: { d: hPath } });

    const morphTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 1, // Pause for 1 second before repeating the whole cycle
        scrollTrigger: {
            trigger: svgRef.current,
            start: "top center",
            toggleActions: "play pause resume pause",
        }
    });

    // Create a looping animation through all shapes
    shapes.slice(1).forEach((shape, index) => {
        morphTimeline.to(pathRef.current, {
            duration: 1.2,
            ease: 'power2.inOut',
            attr: { d: shape },
            delay: 1 // Pause for 1 second between morphs
        });
    });


    return () => {
      morphTimeline.kill();
       if (morphTimeline.scrollTrigger) {
         morphTimeline.scrollTrigger.kill();
       }
    };
  }, []);

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          Inovação em Movimento
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Transformamos ideias em soluções, conectando estratégia e tecnologia.
        </p>
        <div className="mt-12" style={{ width: '150px', height: '150px' }}>
          <svg
            ref={svgRef}
            viewBox="0 0 24 25" // Adjusted viewBox to better fit all shapes
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathRef}
              d={hPath}
              fill="hsl(var(--accent))"
              stroke="hsl(var(--accent))"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SvgMorphSection;
