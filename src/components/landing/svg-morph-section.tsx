'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Paths with the same number of points for smooth morphing
const paths = {
  h: "M0 25 V0 H5 V11 H17 V0 H22 V25 H17 V14 H5 V25 H0Z",
  data: "M11 0 L22 12.5 L11 25 L0 12.5 L0 12.5 L0 12.5 L0 12.5 L0 12.5Z",
  star: "M11 0 L14 8 L22 9 L16 15 L17.5 24 L11 20 L4.5 24 L6 15 L0 9 L9 8Z",
  check: "M0 13 L8 21 L22 7 L19 4 L8 15 L3 10 L3 10 L3 10 L3 10Z",
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
            viewBox="-5 -5 32 35"
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
