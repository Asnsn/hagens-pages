'use client';

import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import ClientShowcase from '@/components/landing/client-showcase';
import Footer from '@/components/landing/footer';
import AnimatedSection from '@/components/landing/animated-section';
import ConnectionParticles from '@/components/landing/connection-particles';
import HorizontalScrollGallery from '@/components/landing/horizontal-scroll-gallery';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ConnectionParticles />
      <Header />
      <main className="flex-grow">
        <Hero />
        <HorizontalScrollGallery id="clientes" className="py-16 sm:py-24">
          <ClientShowcase />
        </HorizontalScrollGallery>
      </main>
      <Footer />
    </div>
  );
}
