'use client';

import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import AnimatedSection from '@/components/landing/animated-section';
import ConnectionParticles from '@/components/landing/connection-particles';

export default function ProdutosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ConnectionParticles />
      <Header />
      <main className="flex-grow">
        <AnimatedSection id="produtos" className="py-16 sm:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
                Nossos Produtos
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Conheça as nossas soluções.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Items will be inserted here in the future */}
            </div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
