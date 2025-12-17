'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ConnectionParticles from '@/components/landing/connection-particles';
import RollingText from './rolling-text';

export default function Hero() {
  return (
    <section className="relative bg-background">
      <ConnectionParticles />
      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <h1
          className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <RollingText text="Innovate, Create, Elevate" as="span" className="block" />
          <RollingText text="Your Digital Presence" as="span" className="block text-primary" delay={0.3} />
        </h1>
        <motion.p
          className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground sm:max-w-xl md:text-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        >
          We are a full-service agency that blends marketing expertise with
          cutting-edge technology to deliver outstanding results.
        </motion.p>
        <motion.div
          className="mx-auto mt-10 flex max-w-sm flex-col gap-4 sm:flex-row sm:justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
        >
          <Button size="lg" asChild>
            <Link href="#contact">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#services">Our Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
