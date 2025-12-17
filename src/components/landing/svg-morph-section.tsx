'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Redesigned paths with the SAME number of points for smooth morphing.
// Each shape has 10 points.
const paths = {
  h: "M0,25 L0,0 5,0 5,11 17,11 17,0 22,0 22,25 17,25 17,14 5,14 5,25 Z",
  data: "M11,0 L22,12.5 11,25 0,12.5 0,12.5 0,12.5 0,12.5 0,12.5 0,12.5 0,12.5 Z",
  star: "M11,0 L14,8 22,9 16,15 17.5,24 11,20 4.5,24 6,15 0,9 9,8 Z",
  check: "M0,13 L8,21 22,7 19,4 8,15 3,10 3,10 3,10 3,10 3,10 Z",
};

const SvgMorphSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const morphPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !morphPathhRef.current) return;

    gsap.set(morphPathRef.current, {
      transformOrigin: 'center center',
      scale: 2.5, // Increase size for better visibility
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      repeat: -1,
      repeatDelay: 1.5, // Pause between loops
    });

    // Morphing sequence
    tl.to(
      morphPathRef.current,
      {
        attr: { d: paths.h },
        duration: 1,
        ease: 'power2.inOut',
      },
      'start' // Start immediately
    )
    .to(
      morphPathRef.current,
      {
        attr: { d: paths.data },
        duration: 1,
        ease: 'power2.inOut',
      },
      '+=1.5' // Wait 1.5s
    )
    .to(
      morphPathRef.current,
      {
        attr: { d: paths.star },
        duration: 1,
        ease: 'power2.inOut',
      },
      '+=1.5' // Wait 1.5s
    )
    .to(
      morphPathRef.current,
      {
        attr: { d: paths.check },
        duration: 1,
        ease: 'power2.inOut',
      },
      '+=1.5' // Wait 1.5s
    );

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
        <div className="mt-12 flex h-[150px] w-[200px] items-center justify-center">
          <svg
            viewBox="-5 -5 32 35" // Adjusted viewBox for new shapes
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={morphPathRef}
              d={paths.h} // Start with the H shape
              fill="hsl(var(--accent))"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SvgMorphSection;
