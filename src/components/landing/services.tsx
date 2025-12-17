'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Building,
  Type,
  PenTool,
  Lightbulb,
  Printer,
  Projector,
} from 'lucide-react';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Building className="h-8 w-8 text-primary" />,
    title: 'Fachadas em ACM',
    description:
      "Modernize a frente do seu negócio com painéis de ACM de alta durabilidade e design sofisticado.",
  },
  {
    icon: <Type className="h-8 w-8 text-primary" />,
    title: 'Letras Caixa',
    description:
      'Destaque sua marca com letras em relevo, com ou sem iluminação LED, para um visual impactante.',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Painéis Luminosos',
    description:
      'Garanta que sua marca seja vista a qualquer hora do dia com painéis e backlights de alta qualidade.',
  },
  {
    icon: <Projector className="h-8 w-8 text-primary" />,
    title: 'Totens',
    description:
      'Sinalize e reforce a presença da sua empresa com totens personalizados, com ou sem iluminação.',
  },
  {
    icon: <Printer className="h-8 w-8 text-primary" />,
    title: 'Impressão Digital',
    description:
      'Materialize suas ideias com impressão de alta resolução para adesivos, banners, lonas e muito mais.',
  },
  {
    icon: <PenTool className="h-8 w-8 text-primary" />,
    title: 'Criação e Projetos 3D',
    description:
      'Desenvolvemos a identidade visual da sua marca e criamos projetos 3D para visualizar o resultado final.',
  },
];

export default function Services() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.set(card, { opacity: 0, y: 100 }); // Set initial state
        const icon = card.querySelector('svg');

        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%', // Start animation when card is 90% from the top
            toggleActions: 'play none none none',
          },
        });

        if (icon) {
          const morphTl = gsap.timeline({ paused: true });
          morphTl.to(icon, { rotate: 360, scale: 1.2, duration: 0.4, ease: 'power2.inOut' });

          const enterListener = () => morphTl.play();
          const leaveListener = () => morphTl.reverse();
          
          card.addEventListener('mouseenter', enterListener);
          card.addEventListener('mouseleave', leaveListener);

          // Cleanup function for this card
          return () => {
            card.removeEventListener('mouseenter', enterListener);
            card.removeEventListener('mouseleave', leaveListener);
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          Nossos Serviços
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Oferecemos um conjunto completo de soluções em comunicação visual para atender às necessidades do seu negócio.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div key={index} ref={(el) => (cardsRef.current[index] = el)}>
            <Card className="h-full transform transition-shadow duration-300 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4">
                {service.icon}
                <CardTitle className="font-headline text-xl">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
