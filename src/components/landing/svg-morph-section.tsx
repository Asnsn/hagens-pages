'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// H shape path
const hPath = "M0 0 H 22 V 25 H 17 V 14 H 5 V 25 H 0 V 0 H 5 V 11 H 17 V 0 H 22 Z";
// ThinkIcon shape path
const thinkPath = "M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.5L19.5 9L12 13.5L4.5 9L12 4.5ZM19.5 10.5L12 15L4.5 10.5M19.5 13.5L12 18L4.5 13.5";

const SvgMorphSection = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !pathRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
      repeat: -1,
      yoyo: true,
    });

    // We can't use MorphSVGPlugin, but we can animate the 'd' attribute directly.
    // GSAP is smart enough to interpolate between two paths if they have the same number of points.
    // For simple shapes, this works well. For complex ones, it can be tricky.
    // Let's try to make it work by tweening attributes.
    // A simple fade in/out + scale is a safer bet if direct 'd' animation is jarring.

    const hShape = { d: hPath, scale: 1, autoAlpha: 1, transformOrigin: 'center center' };
    const thinkShape = { d: thinkPath, scale: 1.2, autoAlpha: 1, transformOrigin: 'center center' };

    gsap.set(pathRef.current, { attr: { d: hPath } });

    const morphTimeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5,
        scrollTrigger: {
            trigger: svgRef.current,
            start: "top center",
            toggleActions: "play pause resume pause",
        }
    });

    morphTimeline
      .to(pathRef.current, {
        duration: 1,
        ease: 'power2.inOut',
        attr: { d: thinkPath },
      })
      .to(pathRef.current, {
        duration: 1,
        ease: 'power2.inOut',
        attr: { d: hPath },
        delay: 0.5
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
            viewBox="0 0 24 24"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathRef}
              d={hPath}
              fill="hsl(var(--accent))"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SvgMorphSection;
