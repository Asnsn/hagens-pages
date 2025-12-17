
'use client';

import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import AnimatedSection from '@/components/landing/animated-section';
import ConnectionParticles from '@/components/landing/connection-particles';

export default function ArtigosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ConnectionParticles />
      <Header />
      <main className="flex-grow">
        <AnimatedSection id="artigos-hero" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mt-12">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Artigos
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Leia nossos insights sobre tecnologia, dados e marketing.
            </p>
          </div>
        </AnimatedSection>
        
        {/* Placeholder for articles list */}
        <AnimatedSection className="py-16 sm:py-24">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="text-center text-muted-foreground">
                    <p>Nenhum artigo publicado ainda. Volte em breve!</p>
                </div>
            </div>
        </AnimatedSection>

      </main>
      <Footer />
    </div>
  );
}
