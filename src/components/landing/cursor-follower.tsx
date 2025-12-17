'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

const HagensHLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 22 25"
      className={cn('w-full h-auto text-white', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0 H 22 V 25 H 17 V 14 H 5 V 25 H 0 V 0 H 5 V 11 H 17 V 0 H 22 Z"
        fill="currentColor"
      />
      <path d="M5 11 H 17 V 14 H 5 Z" fill="hsl(var(--accent))" />
    </svg>
  );
};

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let xTo = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3.out' });
    let yTo = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-auto z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
    >
      <HagensHLogo />
    </div>
  );
}
