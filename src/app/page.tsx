'use client';

import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import ClientShowcase from '@/components/landing/client-showcase';
import Footer from '@/components/landing/footer';
import AnimatedSection from '@/components/landing/animated-section';
import HorizontalScrollGallery from '@/components/landing/horizontal-scroll-gallery';
import ConnectionParticles from '@/components/landing/connection-particles';
import SvgMorphSection from '@/components/landing/svg-morph-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <ConnectionParticles />
      <Header />
      <main className="flex-grow">
        <Hero />
        <HorizontalScrollGallery id="work" />
        <SvgMorphSection />
        <AnimatedSection id="clientes">
           <ClientShowcase />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
