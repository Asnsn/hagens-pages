'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const clients = [
  { id: 'client-1', name: 'iPlace', logo: '/logos/iplace.svg' },
  { id: 'client-2', name: 'Cobasi', logo: '/logos/cobasi.svg' },
  { id: 'client-3', name: 'Chilli Beans', logo: '/logos/chilli-beans.svg' },
  { id: 'client-4', name: 'Arezzo', logo: '/logos/arezzo.svg' },
  { id: 'client-5', name: 'CS Club', logo: '/logos/cs-club.svg' },
  { id: 'client-6', name: 'Schutz', logo: '/logos/schutz.svg' },
  { id: 'client-7', name: 'Track & Field', logo: '/logos/track-field.svg' },
  { id: 'client-8', name: 'Vivara', logo: '/logos/vivara.svg' },
  { id: 'client-9', name: 'L\'Occitane en Provence', logo: '/logos/loccitane.svg' },
  { id: 'client-10', name: 'Valisere', logo: '/logos/valisere.svg' },
  { id: 'client-11', name: 'O Boticário', logo: '/logos/boticario.svg' },
  { id: 'client-12', name: 'Quem Disse, Berenice?', logo: '/logos/quem-disse-berenice.svg' },
];

const MarqueeItem = ({ children }) => (
  <div className="mx-4 flex-shrink-0 flex items-center justify-center w-48 h-24 p-4 bg-white/5 border border-white/10 rounded-lg grayscale hover:grayscale-0 transition-all duration-300">
    {children}
  </div>
);

export default function ClientShowcase() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    
    const marquee = marqueeRef.current;
    const items = marquee.children;
    const totalWidth = Array.from(items).reduce((acc, item) => acc + item.clientWidth + 32, 0);

    gsap.set(marquee, { width: totalWidth });

    const animateMarquee = () => {
      animationRef.current = gsap.to(marquee, {
        x: `-=${totalWidth / 2}`,
        duration: 30,
        ease: 'linear',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % (totalWidth / 2))
        }
      });
    };

    animateMarquee();
    
    const handleMouseMove = (e: MouseEvent) => {
        const speed = gsap.utils.mapRange(0, window.innerWidth, -1.5, 1.5, e.clientX);
        gsap.to(animationRef.current, { timeScale: speed, duration: 0.5, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
        gsap.to(animationRef.current, { timeScale: 1, duration: 1, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      animationRef.current?.kill();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="bg-background py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
            Nossos Clientes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Temos orgulho de ter a confiança de grandes marcas.
          </p>
        </div>
      </div>
      <div className="mt-12 w-full">
        <div ref={marqueeRef} className="flex">
          {[...clients, ...clients].map((client, index) => (
            <MarqueeItem key={`${client.id}-${index}`}>
              <div className="relative h-16 w-32">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
            </MarqueeItem>
          ))}
        </div>
      </div>
    </div>
  );
}
