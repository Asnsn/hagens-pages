'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import { PlaceHolderImages } from '@/lib/placeholder-images';

gsap.registerPlugin(Draggable);

const slides = PlaceHolderImages.filter(img => img.id.startsWith('client-'));

export default function HorizontalScrollGallery({ id }: { id?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    const proxy = document.createElement('div');
    const numSlides = slides.length;
    const slideWidth = wrapper.querySelector('.slide')?.clientWidth || 0;
    const wrapWidth = numSlides * slideWidth;

    gsap.set(wrapper, { width: wrapWidth });
    gsap.set(container, { height: 'auto', overflow: 'visible' });

    const animation = gsap.to(wrapper, {
      x: -wrapWidth / 2,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (wrapWidth / 2))
      }
    });

    Draggable.create(proxy, {
      type: 'x',
      trigger: wrapper,
      inertia: true,
      onDrag: function() {
        const x = this.x;
        const newX = (parseFloat(gsap.getProperty(wrapper, 'x') as string) + x);
        gsap.set(wrapper, { x: newX });
      },
      onThrowUpdate: function() {
        gsap.set(wrapper, { x: this.x });
      }
    });

    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.resume();

    wrapper.addEventListener('mouseenter', handleMouseEnter);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      Draggable.get(proxy)?.kill();
      animation.kill();
      wrapper.removeEventListener('mouseenter', handleMouseEnter);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
     <section id={id} className="py-16 sm:py-24 bg-background overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-12">
             <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">Nosso Trabalho</h2>
             <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Confira alguns dos projetos que tivemos o prazer de realizar.
             </p>
        </div>
        <div ref={containerRef} className="relative w-full cursor-grab">
            <div ref={wrapperRef} className="flex">
                {[...slides, ...slides].map((slide, index) => (
                    <div key={`${slide.id}-${index}`} className="slide flex-shrink-0 w-[40vw] md:w-[30vw] lg:w-[25vw] p-4">
                        <div className="relative aspect-[4/5] rounded-lg overflow-hidden group">
                             <Image
                                src={slide.imageUrl}
                                alt={slide.description}
                                fill
                                sizes="(max-width: 768px) 40vw, 30vw"
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
        </div>
    </section>
  );
}