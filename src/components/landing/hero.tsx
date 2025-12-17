'use client';
import { motion } from 'framer-motion';
import TextScramble from './text-scramble';
import { useEffect } from 'react';
import { gsap } from 'gsap';

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
        <path d="M4.5 10.5L12 3L19.5 10.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 9V21H6V9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 21V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        <path d="M10 13L12 15L15 11" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 8L11 6L14 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const VideoPlaceholder = () => (
    <motion.div 
        className="relative aspect-video w-full max-w-xl cursor-pointer overflow-hidden rounded-lg bg-black"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.5 }}
    >
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute h-full w-full bg-black"></div>
            <span className="z-10 text-xl font-bold tracking-widest text-white" style={{color: '#F923C7'}}>#WEAREHAGENS</span>
            <div className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1"
                >
                    <path
                        d="M5 4L19 12L5 20V4Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    </motion.div>
);

export default function Hero() {
  useEffect(() => {
    gsap.fromTo('.tbd-item', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.3,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tbd-container',
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  }, []);

  return (
    <section className="relative">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
             <TextScramble
              phrases={['Think.', 'Build.', 'Deliver.']}
              className="font-headline text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
            />
            <p className="mt-6 text-lg text-muted-foreground sm:max-w-xl md:text-xl">
              Inteligência de dados, criatividade e tecnologia para construir
              soluções inovadoras em cada etapa da jornada do cliente.
            </p>
            <div className="mt-10 space-y-8 tbd-container">
              <ThinkBuildDeliverItem
                icon={<ThinkIcon />}
                title="THINK"
                description="Mapeamos a jornada de consumo, apoiados em inovação, design e análise de tendências de mercado."
                color="#F923C7" // Magenta
                className="tbd-item"
              />
              <ThinkBuildDeliverItem
                icon={<BuildIcon />}
                title="BUILD"
                description="Construímos soluções personalizadas e adaptadas a cada desafio e às necessidades do cliente."
                color="#0CF22C" // Green
                className="tbd-item"
              />
              <ThinkBuildDeliverItem
                icon={<DeliverIcon />}
                title="DELIVER"
                description="Colocamos em prática as soluções desenvolvidas, monitorando indicadores-chaves e ajustando continuamente para assegurar impacto e valor sustentáveis."
                color="#02A6F8" // Blue
                className="tbd-item"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <VideoPlaceholder />
          </div>
        </div>
      </div>
    </section>
  );
}
