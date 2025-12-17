'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { PlaceHolderImages } from '@/lib/placeholder-images';

gsap.registerPlugin(ScrollTrigger);

const slides = PlaceHolderImages.filter(img => img.id.startsWith('client-'));

export default function HorizontalScrollGallery({ id }: { id?: string }) {
  const componentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!componentRef.current || !wrapperRef.current) return;

    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".slide");
      let to = gsap.to(sections, {
        xPercent: -100 * (sections.length - 3), // Adjust this to control how many are visible at the end
        ease: "none",
        scrollTrigger: {
          trigger: componentRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          // base vertical scrolling on how wide the container is so it feels more natural.
          end: () => "+=" + wrapperRef.current!.offsetWidth,
        },
      });

      return () => to.kill();
    }, componentRef);
    return () => ctx.revert();

  }, []);

  return (
     <section id={id} ref={componentRef} className="py-16 sm:py-24 bg-background overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-12">
             <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">Nosso Trabalho</h2>
             <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Confira alguns dos projetos que tivemos o prazer de realizar.
             </p>
        </div>
        <div ref={wrapperRef} className="flex w-[400vw] md:w-[300vw] lg:w-[200vw]">
            {slides.map((slide, index) => (
                <div key={`${slide.id}-${index}`} className="slide flex-shrink-0 w-screen md:w-[50vw] lg:w-[33.33vw] p-4">
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden group">
                         <Image
                            src={slide.imageUrl}
                            alt={slide.description}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            data-ai-hint={slide.imageHint}
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6">
                            <h3 className="text-white font-bold text-lg">Projeto {slide.id.split('-')[1]}</h3>
                            <p className="text-white/80 text-sm mt-1">{slide.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
}
