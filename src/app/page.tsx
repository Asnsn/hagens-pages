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
        
        <AnimatedSection id="servicos" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
              Serviços / Produtos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Aqui detalhamos os serviços e produtos que oferecemos para transformar o seu negócio.
            </p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection id="sobre" className="py-16 sm:py-24 bg-card">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
              Sobre Nós
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Conheça a história e a equipe por trás da Hagens.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection id="artigos" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
              Artigos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Leia nossos insights sobre tecnologia, dados e marketing.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contato" className="py-16 sm:py-24 bg-card">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
              Contato
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Vamos conversar? Entre em contato conosco.
            </p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection id="clientes">
           <ClientShowcase />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
