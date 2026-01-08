'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const button = buttonRef.current;

    if (!section || !title || !button) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reset',
      },
    });

    tl.fromTo(
      title,
      { opacity: 0, y: 50, skewX: '10deg' },
      {
        opacity: 1,
        y: 0,
        skewX: '0deg',
        duration: 0.8,
        ease: 'power3.out',
      }
    ).fromTo(
      button,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      },
      '-=0.5'
    );
  }, []);

  const openWhatsApp = () => {
    const phoneNumber = '19982836686';
    const message = 'Ol\u00e1! Gostaria de fazer um or\u00e7amento com a Control Alt Dev.';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section ref={sectionRef} className="py-24 bg-card">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2
          ref={titleRef}
          className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="block">Pronto para</span>
          <span className="block text-accent">transformar seu negócio?</span>
        </h2>
        <div ref={buttonRef} className="mt-8">
          <Button size="lg" onClick={openWhatsApp}>
            Comece um Projeto
          </Button>
        </div>
      </div>
    </section>
  );
}
