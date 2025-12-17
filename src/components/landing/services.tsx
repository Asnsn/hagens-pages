'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Megaphone,
  Code,
  PenTool,
  Target,
  LineChart,
  Component,
} from 'lucide-react';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const services = [
  {
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    title: 'Digital Marketing',
    description:
      "Amplify your brand's voice across all digital channels with data-driven strategies.",
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'Web Development',
    description:
      'Crafting beautiful, high-performance websites that captivate and convert.',
  },
  {
    icon: <PenTool className="h-8 w-8 text-primary" />,
    title: 'Content Creation',
    description:
      'Engaging content that tells your story and connects with your audience.',
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'SEO & SEM',
    description:
      'Drive organic traffic and dominate search rankings to grow your business.',
  },
  {
    icon: <LineChart className="h-8 w-8 text-primary" />,
    title: 'Data Analytics',
    description:
      'Uncover actionable insights from your data to make smarter business decisions.',
  },
  {
    icon: <Component className="h-8 w-8 text-primary" />,
    title: 'Brand Strategy',
    description:
      'Building memorable brands that stand out in a crowded marketplace.',
  },
];

export default function Services() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const icon = card.querySelector('svg');
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
        })
        .from(card, { y: 100, opacity: 0, duration: 0.5, ease: 'power3.out' });

        if (icon) {
          const morphTl = gsap.timeline({ paused: true });
          morphTl.to(icon, { rotate: 360, scale: 1.2, duration: 0.4, ease: 'power2.inOut' });

          card.addEventListener('mouseenter', () => morphTl.play());
          card.addEventListener('mouseleave', () => morphTl.reverse());
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          Our Services
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          We provide a comprehensive suite of services to meet your business
          needs.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div key={index} ref={(el) => (cardsRef.current[index] = el)} className="opacity-0">
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
