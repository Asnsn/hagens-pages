'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import RollingText from './rolling-text';

export default function Hero() {
  return (
    <section className="relative bg-background/0">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <h1
          className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <RollingText text="Dê vida à sua marca" as="span" className="block" />
          <RollingText text="com Comunicação Visual" as="span" className="block text-primary" delay={0.3} />
        </h1>
        <motion.p
          className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground sm:max-w-xl md:text-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        >
          Somos especialistas em transformar ideias em realidade com soluções de comunicação visual de alto impacto que fortalecem sua marca.
        </motion.p>
        <motion.div
          className="mx-auto mt-10 flex max-w-sm flex-col gap-4 sm:flex-row sm:justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
        >
          <Button size="lg" asChild>
            <Link href="#contato">Solicite um Orçamento</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#servicos">Nossos Serviços</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
