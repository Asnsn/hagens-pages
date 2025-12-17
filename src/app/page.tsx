'use client';

import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Services from '@/components/landing/services';
import ClientShowcase from '@/components/landing/client-showcase';
import Testimonials from '@/components/landing/testimonials';
import AiContentGenerator from '@/components/landing/ai-content-generator';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import AnimatedSection from '@/components/landing/animated-section';
import ConnectionParticles from '@/components/landing/connection-particles';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {isClient && <ConnectionParticles />}
      <Header />
      <main className="flex-grow">
        <Hero />
        <AnimatedSection id="servicos" className="bg-secondary py-16 sm:py-24">
          <Services />
        </AnimatedSection>
        <section id="projetos">
          <ClientShowcase />
        </section>
        <AnimatedSection id="depoimentos" className="bg-secondary py-16 sm:py-24">
          <Testimonials />
        </AnimatedSection>
        <AnimatedSection id="gerador-ia" className="py-16 sm:py-24">
          <AiContentGenerator />
        </AnimatedSection>
        <AnimatedSection id="contato" className="bg-secondary py-16 sm:py-24">
          <Contact />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
