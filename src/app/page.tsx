'use client';

import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Footer from '@/components/landing/footer';
import AnimatedSection from '@/components/landing/animated-section';
import ConnectionParticles from '@/components/landing/connection-particles';
import SvgMorphSection from '@/components/landing/svg-morph-section';
import {
  BrainCircuit,
  Paintbrush,
  TrendingUp,
  Mail,
  Phone,
} from 'lucide-react';
import Image from 'next/image';
import ContactForm from '@/components/landing/contact-form';
import CustomCursor from '@/components/landing/custom-cursor';
import CTASection from '@/components/landing/cta-section';

const ServiceCard = ({ icon, title, description, delay }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border/20 shadow-lg">
      <div className="mb-4 text-accent">{icon}</div>
      <h3 className="font-headline text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col">
      <CustomCursor />
      <ConnectionParticles />
      <Header />
      <main className="flex-grow">
        <Hero />
        <SvgMorphSection />

        <AnimatedSection id="servicos" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
              Serviços / Produtos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Soluções de automação com I.A. e programação de sistemas para otimizar seu negócio.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <ServiceCard
                icon={<BrainCircuit size={40} />}
                title="Automação com I.A."
                description="Implementamos soluções de inteligência artificial para automatizar processos e otimizar a tomada de decisões."
                delay={0}
              />
              <ServiceCard
                icon={<Paintbrush size={40} />}
                title="Desenvolvimento de Sistemas"
                description="Criamos sistemas personalizados e escaláveis para atender às necessidades específicas do seu negócio."
                delay={0.2}
              />
              <ServiceCard
                icon={<TrendingUp size={40} />}
                title="Otimização de Processos"
                description="Analisamos e otimizamos seus fluxos de trabalho para aumentar a eficiência e reduzir custos."
                delay={0.4}
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="sobre" className="py-16 sm:py-24 bg-card">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Sobre Nós
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Somos a Control Alt Dev, uma agência de automação com I.A. e programação de sistemas. Acreditamos que a tecnologia é a chave para transformar negócios e impulsionar o crescimento.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Nossa equipe de especialistas é apaixonada por resolver desafios complexos e entregar soluções inovadoras e de alto impacto para nossos clientes.
                </p>
              </div>
              <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg lg:h-96">
                <Image
                  src="/logos/logocntrldev.png"
                  alt="Logo da Control Alt Dev"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        <CTASection />

        <AnimatedSection id="contato" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
                Contato
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Vamos conversar? Envie-nos uma mensagem e vamos criar algo
                incrível juntos.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              <div className="flex flex-col gap-8 text-center lg:text-left">
                <div>
                  <h3 className="flex items-center justify-center lg:justify-start gap-3 font-headline text-xl font-bold">
                    <Phone className="text-accent" /> Telefone
                  </h3>
                  <p className="mt-2 text-muted-foreground">(19) 98283-6686</p>
                </div>
                <div>
                  <h3 className="flex items-center justify-center lg:justify-start gap-3 font-headline text-xl font-bold">
                    <Mail className="text-accent" /> Email
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    controldev@controlaltdev.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

      </main>
      <Footer />
    </div>
  );
}
