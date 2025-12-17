'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 'client-1', name: 'Project Alpha', category: 'Web Development' },
  { id: 'client-2', name: 'Project Beta', category: 'Brand Strategy' },
  { id: 'client-3', name: 'Project Gamma', category: 'Digital Marketing' },
  { id: 'client-4', name: 'Project Delta', category: 'Data Analytics' },
  { id: 'client-5', name: 'Project Epsilon', category: 'Content Creation' },
  { id: 'client-6', name: 'Project Zeta', category: 'SEO & SEM' },
];

export default function ClientShowcase() {
  const component = useRef(null);
  const slider = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray('.panel', slider.current);
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => '+=' + (slider.current! as HTMLElement).offsetWidth,
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  const projectImages = PlaceHolderImages.filter(img =>
    projects.some(p => p.id === img.id)
  );

  return (
    <div className="overflow-hidden" ref={component}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
         <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          Our Work
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Take a look at some of the successful projects we've delivered for
          our clients.
        </p>
      </div>
      <div
        ref={slider}
        className="flex w-[600vw] h-[70vh]"
      >
        {projects.map(project => {
          const image = projectImages.find(img => img.id === project.id);
          if (!image) return null;
          return (
            <div
              key={project.id}
              className="panel flex w-screen h-full items-center justify-center px-8"
            >
              <Card
                className="group overflow-hidden w-full max-w-4xl"
              >
                <CardContent className="p-0">
                  <div className="relative h-96 w-full">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={image.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="font-headline text-xl font-bold text-white">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-300">{project.category}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
