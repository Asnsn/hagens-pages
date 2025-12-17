'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Paths for the icons, all with the same number of points for smooth morphing.
const paths = {
  h: 'M10 0 L10 12 L22 12 L22 17 L10 17 L10 29 L5 29 L5 17 L-7 17 L-7 12 L5 12 L5 0 Z',
  data: 'M0 14.5 L16 29 L32 14.5 L16 0 Z M16 5 L27 14.5 L16 24 L5 14.5 Z',
  star: 'M16 0 L20 10 L31 12 L23 20 L25 30 L16 25 L7 30 L9 20 L-1 12 L12 10 Z',
  check: 'M-2 15 L10 27 L34 3 L28 -3 L10 15 L4 9 Z',
};

const SvgMorphSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const morphPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !morphPathRef.current) return;

    // Center the initial shape
    gsap.set(morphPathRef.current, {
      transformOrigin: 'center center',
      scale: 1.5, // Make the icon a bit larger
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%', // Start animation when the top of the section is 80% down the viewport
        toggleActions: 'play none none none',
      },
      repeat: -1, // Loop indefinitely
      repeatDelay: 1, // Pause for 1 second between loops
    });

    // Morphing sequence
    tl.to(
      morphPathRef.current,
      {
        attr: { d: paths.h },
        duration: 1,
        ease: 'power2.inOut',
      },
      '+=1' // Wait 1 second before starting
    )
      .to(
        morphPathRef.current,
        {
          attr: { d: paths.data },
          duration: 1,
          ease: 'power2.inOut',
        },
        '+=1'
      )
      .to(
        morphPathRef.current,
        {
          attr: { d: paths.star },
          duration: 1,
          ease: 'power2.inOut',
        },
        '+=1'
      )
      .to(
        morphPathRef.current,
        {
          attr: { d: paths.check },
          duration: 1,
          ease: 'power2.inOut',
        },
        '+=1'
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
            viewBox="-15 -5 60 45" // Adjusted viewBox to fit all shapes nicely
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
