'use client';
import { useTransitionContext } from '@/context/TransitionContext';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const PageTransition = () => {
  const { isTransitioning } = useTransitionContext();
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const gradientStopAccentRef = useRef<SVGStopElement>(null);
  const gradientStopBgRef = useRef<SVGStopElement>(null);


  useEffect(() => {
    if (isTransitioning) {
      gsap.timeline({
        onComplete: () => {
          // The context will handle the navigation after this
        },
      })
      .set(pathRef.current, {
        attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' },
      })
      // Reset gradient stops
      .set(gradientStopAccentRef.current, { attr: { 'offset': '0%' }})
      .set(gradientStopBgRef.current, { attr: { 'offset': '0%' }})

      // Animate the path shape
      .to(pathRef.current, {
        duration: 0.8,
        ease: 'power4.in',
        attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' },
      }, 0)
      .to(pathRef.current, {
        duration: 0.3,
        ease: 'power2',
        attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
      }, '-=0.2')

      // Animate the gradient position to create the fade effect
      .to(gradientStopBgRef.current, {
        duration: 1, // Animate the background color stop
        ease: 'power2.inOut',
        attr: { 'offset': '100%' }
      }, 0.1); // Start the gradient animation shortly after the path animation

      gsap.set(overlayRef.current, { display: 'block' });

    } else {
        gsap.set(overlayRef.current, { display: 'none' });
    }
  }, [isTransitioning]);
  
  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-screen w-full"
    >
      <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop ref={gradientStopAccentRef} offset="0%" stopColor="hsl(var(--accent))" />
                <stop ref={gradientStopBgRef} offset="0%" stopColor="hsl(var(--background))" />
            </linearGradient>
        </defs>
        <path
          ref={pathRef}
          fill="url(#gradient)"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
        />
      </svg>
    </div>
  );
};

export default PageTransition;
