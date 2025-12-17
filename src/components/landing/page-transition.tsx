'use client';
import { useTransitionContext } from '@/context/TransitionContext';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const PageTransition = () => {
  const { isTransitioning } = useTransitionContext();
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (isTransitioning) {
      // Swipe In
      gsap.timeline({
        onComplete: () => {
          // The context will handle the navigation after this
        },
      }).set(pathRef.current, {
        attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' },
      }).to(pathRef.current, {
        duration: 0.8,
        ease: 'power4.in',
        attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' },
      }).to(pathRef.current, {
        duration: 0.3,
        ease: 'power2',
        attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
      });
      gsap.set(overlayRef.current, { display: 'block' });
    } else {
        // This is for swipe out after new page loads, but since we're doing smooth scroll
        // it's better to just hide it
        gsap.set(overlayRef.current, { display: 'none' });
    }
  }, [isTransitioning]);
  
  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-screen w-full"
    >
      <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path
          ref={pathRef}
          className="fill-current text-background"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
        />
      </svg>
    </div>
  );
};

export default PageTransition;
