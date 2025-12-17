'use client';
import { motion } from 'framer-motion';
import TextScramble from './text-scramble';
import RollingText from './rolling-text'; // We might still use this for other things

const ThinkBuildDeliverItem = ({ icon, title, description, color, delay }) => (
  <motion.div
    className="flex items-start gap-4"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7, delay }}
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
  </motion.div>
);

const ThinkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 14L12 6L20 14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 20L12 12L20 20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BuildIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DeliverIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="black" strokeWidth="2" />
    <rect x="7" y="7" width="4" height="4" rx="1" stroke="black" strokeWidth="2" />
    <rect x="13" y="7" width="4" height="4" rx="1" stroke="black" strokeWidth="2" />
    <rect x="7" y="13" width="4" height="4" rx="11" stroke="black" strokeWidth="2" />
    <rect x="13" y="13" width="4" height="4" rx="1" stroke="black" strokeWidth="2" />
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
            <div className="mt-10 space-y-8">
              <ThinkBuildDeliverItem
                icon={<ThinkIcon />}
                title="THINK"
                description="Mapeamos a jornada de consumo, apoiados em inovação, design e análise de tendências de mercado."
                color="#F923C7" // Magenta
                delay={0.3}
              />
              <ThinkBuildDeliverItem
                icon={<BuildIcon />}
                title="BUILD"
                description="Construímos soluções personalizadas e adaptadas a cada desafio e às necessidades do cliente."
                color="#0CF22C" // Green
                delay={0.5}
              />
              <ThinkBuildDeliverItem
                icon={<DeliverIcon />}
                title="DELIVER"
                description="Colocamos em prática as soluções desenvolvidas, monitorando indicadores-chaves e ajustando continuamente para assegurar impacto e valor sustentáveis."
                color="#02A6F8" // Blue
                delay={0.7}
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
