'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type HorizontalScrollGalleryProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export default function HorizontalScrollGallery({
  children,
  className,
  id,
}: HorizontalScrollGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current || !contentRef.current) return;

    const contentWidth = contentRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    // Apenas ativa a animação se o conteúdo for maior que a tela
    if (contentWidth <= viewportWidth) return;


    const scrollTween = gsap.to(contentRef.current, {
      x: `-${contentWidth - viewportWidth}px`,
      ease: 'none',
    });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: () => `+=${contentWidth - viewportWidth}`,
      scrub: 1,
      pin: true,
      animation: scrollTween,
      invalidateOnRefresh: true,
    });

    return () => {
      scrollTriggerInstance.kill();
      scrollTween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id={id} className={`relative overflow-hidden ${className}`}>
      <div ref={triggerRef}>
        <div ref={contentRef} className="flex w-max flex-nowrap">
          {children}
        </div>
      </div>
    </section>
  );
}
