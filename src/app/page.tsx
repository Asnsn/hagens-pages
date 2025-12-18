'use client';

import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import ClientShowcase from '@/components/landing/client-showcase';
import Footer from '@/components/landing/footer';
import AnimatedSection from '@/components/landing/animated-section';
import HorizontalScrollGallery from '@/components/landing/horizontal-scroll-gallery';
import ConnectionParticles from '@/components/landing/connection-particles';
import SvgMorphSection from '@/components/landing/svg-morph-section';
import {
  BrainCircuit,
  Paintbrush,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import ContactForm from '@/components/landing/contact-form';

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
              Soluções completas que unem dados, criatividade e tecnologia para
              impulsionar seu negócio.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <ServiceCard
                icon={<BrainCircuit size={40} />}
                title="Data Intelligence"
                description="Transformamos dados brutos em insights estratégicos para otimizar suas decisões e encontrar novas oportunidades de mercado."
                delay={0}
              />
              <ServiceCard
                icon={<Paintbrush size={40} />}
                title="Creative Tech"
                description="Unimos design e tecnologia para criar experiências de marca memoráveis, desde sites interativos a aplicativos inovadores."
                delay={0.2}
              />
              <ServiceCard
                icon={<TrendingUp size={40} />}
                title="Performance & Growth"
                description="Utilizamos automação e marketing de precisão para escalar suas operações, aumentar a conversão e acelerar o crescimento."
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
                  Somos uma consultoria de inovação e tecnologia que une
                  inteligência de dados, criatividade e performance para
                  construir o futuro das marcas. Nascemos da crença de que a
                  tecnologia, quando alinhada a uma estratégia humana, tem o
                  poder de criar conexões genuínas e resultados
                  extraordinários.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Nossa equipe é formada por especialistas multidisciplinares —
                  estrategistas, designers, engenheiros e analistas —
                  apaixonados por resolver desafios complexos e entregar valor
                  sustentável para nossos clientes.
                </p>
              </div>
              <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg lg:h-96">
                <Image
                  src="/logos/sobre-nos.webp"
                  alt="Imagem do escritório da Hagens, mostrando um ambiente moderno com divisórias de vidro."
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  data-ai-hint="office workspace"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

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
                    <MapPin className="text-accent" /> Endereço
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Av. José de Sousa Campos, 575 <br />
                    Sl. 504/505 – Cambuí <br />
                    Campinas – SP, CEP 13025-320
                  </p>
                </div>
                <div>
                  <h3 className="flex items-center justify-center lg:justify-start gap-3 font-headline text-xl font-bold">
                    <Phone className="text-accent" /> Telefone
                  </h3>
                  <p className="mt-2 text-muted-foreground">(19) 99832-0494</p>
                </div>
                <div>
                  <h3 className="flex items-center justify-center lg:justify-start gap-3 font-headline text-xl font-bold">
                    <Mail className="text-accent" /> Email
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    contato@hagens.com.br
                  </p>
                </div>
              </div>
            </div>
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
