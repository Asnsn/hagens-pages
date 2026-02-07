'use client';

import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import AnimatedSection from '@/components/landing/animated-section';
import ConnectionParticles from '@/components/landing/connection-particles';
import portfolioItems from '@/lib/portfolio-items.json';

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ConnectionParticles />
      <Header />
      <main className="flex-grow">
        <AnimatedSection id="portfolio" className="py-16 sm:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
                Nosso Portfólio
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Confira alguns dos projetos e parcerias que nos orgulham.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioItems.map((item, index) => (
                <div key={index} className="overflow-hidden rounded-lg border bg-card shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <img src={item.imageUrl} alt={item.title} className="h-48 w-full object-contain p-4"/>
                    <div className="p-6">
                      <h3 className="font-headline text-xl font-bold">{item.title}</h3>
                      <p className="mt-2 text-muted-foreground">{item.description}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}