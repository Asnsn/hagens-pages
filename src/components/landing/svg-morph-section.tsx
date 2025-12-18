'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Paths with the same number of points for smooth morphing
const paths = {
  h: "M5 25V0h5v11h12V0h5v25h-5V14H10v11H5z",
  data: "M16 0L27 12.5L16 25L5 12.5L16 0z M16 0L16 0L16 0L16 0L16 0z",
  star: "M16 0l4.9 10.1 11.1 1.6-8 7.8 1.9 11-10-5.2-10 5.2 1.9-11-8-7.8 11.1-1.6L16 0z",
  check: "M5 13l-3-3 5.1-5.1L13 10.8l12-12 5.1 5.1-17.1 17.1L5 13z",
};


const SvgMorphSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const morphPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !morphPathRef.current) return;

    gsap.set(morphPathRef.current, {
      transformOrigin: 'center center',
      scale: 1.5,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reset',
      },
      repeat: -1,
      repeatDelay: 1.5,
    });

    // Morphing sequence
    tl.to(morphPathRef.current, { attr: { d: paths.h }, duration: 1, ease: 'power2.inOut' }, '+=1.5')
      .to(morphPathRef.current, { attr: { d: paths.data }, duration: 1, ease: 'power2.inOut' }, '+=1.5')
      .to(morphPathRef.current, { attr: { d: paths.star }, duration: 1, ease: 'power2.inOut' }, '+=1.5')
      .to(morphPathRef.current, { attr: { d: paths.check }, duration: 1, ease: 'power2.inOut' }, '+=1.5');

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
        <div className="mt-12 flex h-[150px] w-[150px] items-center justify-center">
          <svg
            viewBox="-2 -2 36 36"
            preserveAspectRatio="xMidYMid meet"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={morphPathRef}
              d={paths.check}
              fill="hsl(var(--accent))"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SvgMorphSection;
