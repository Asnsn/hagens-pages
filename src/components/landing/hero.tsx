'use client';
import { motion } from 'framer-motion';
import TextScramble from './text-scramble';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ThinkBuildDeliverItem = ({ icon, title, description, color, className }) => (
  <div
    className={`flex items-start gap-4 ${className}`}
  >
    <div
      className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: color }}
    >
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold" style={{ color }}>
        {title}
      </h3>
      <p className="mt-1 text-muted-foreground">{description}</p>
    </div>
  </div>
);

const ThinkIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.5L19.5 9L12 13.5L4.5 9L12 4.5ZM19.5 10.5L12 15L4.5 10.5M19.5 13.5L12 18L4.5 13.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


const BuildIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DeliverIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12L11 14L15 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function Hero() {
  
  return (
    <section className="relative">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
             <TextScramble
              phrases={['Automate.', 'Integrate.', 'Accelerate.']}
              className="font-headline text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
            />
            <p className="mt-6 text-lg text-muted-foreground sm:max-w-xl md:text-xl mx-auto lg:mx-0">
              Automação com Inteligência Artificial e desenvolvimento de sistemas para transformar suas operações e impulsionar o futuro do seu negócio.
            </p>
            <div className="mt-10 space-y-8 tbd-container">
              <ThinkBuildDeliverItem
                icon={<ThinkIcon />}
                title="AUTOMATE"
                description="Analisamos seus processos e identificamos oportunidades para automação inteligente, otimizando o fluxo de trabalho."
                color="#F923C7" // Magenta
                className="tbd-item"
              />
              <ThinkBuildDeliverItem
                icon={<BuildIcon />}
                title="INTEGRATE"
                description="Desenvolvemos e integramos sistemas e I.A.s para criar uma infraestrutura tecnológica coesa e eficiente."
                color="#0CF22C" // Green
                className="tbd-item"
              />
              <ThinkBuildDeliverItem
                icon={<DeliverIcon />}
                title="ACCELERATE"
                description="Implementamos as soluções para acelerar seu crescimento, garantindo performance, escalabilidade e resultados mensuráveis."
                color="#02A6F8" // Blue
                className="tbd-item"
              />
            </div>
          </div>
          
          <div className="relative h-[500px] w-full">
          </div>
        </div>
      </div>
    </section>
  );
}