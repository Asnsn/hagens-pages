'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Paths with the same number of points for smooth morphing
const paths = {
  h: "M5 25 V0 H10 V11 H22 V0 H27 V25 H22 V14 H10 V25 H5Z",
  data: "M16 0 L27 12.5 L16 25 L5 12.5 L5 12.5 L5 12.5 L5 12.5 L5 12.5Z",
  star: "M16 0 L19 8 L27 9 L21 15 L22.5 24 L16 20 L9.5 24 L11 15 L5 9 L14 8Z",
  check: "M5 13 L13 21 L27 7 L24 4 L13 15 L8 10 L8 10 L8 10 L8 10Z",
};

const SvgMorphSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const morphPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !morphPathRef.current) return;

    gsap.set(morphPathRef.current, {
      transformOrigin: 'center center',
      scale: 2.5,
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
        <div className="mt-12 flex h-[150px] w-[200px] items-center justify-center">
          <svg
            viewBox="0 -10 32 45"
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
