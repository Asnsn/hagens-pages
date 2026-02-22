'use client';

import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import AnimatedSection from '@/components/landing/animated-section';
import ConnectionParticles from '@/components/landing/connection-particles';

const products = [
  {
    title: 'Chatbots',
    plans: [
      {
        name: 'Plano 1',
        description: 'Chatbots humanizados pouco complexos.',
        price: 'R$ 1.800 de implementação + R$ 400/mês de manutenção',
      },
      {
        name: 'Plano 2',
        description: 'Chatbots com I.A. de média complexidade.',
        price: 'R$ 3.500 de implementação + R$ 700/mês de manutenção',
      },
      {
        name: 'Plano 3',
        description: 'Chatbots com I.A. avançada e integrações.',
        price: 'R$ 7.000 de implementação + R$ 1.200/mês de manutenção',
      },
    ],
  },
  {
    title: 'Desenvolvimento de Sistemas',
    plans: [
      {
        name: 'Plano 1',
        description: 'Sistemas web de pequeno porte.',
        price: 'A partir de R$ 5.000',
      },
      {
        name: 'Plano 2',
        description: 'Sistemas de médio porte com integrações.',
        price: 'A partir de R$ 15.000',
      },
      {
        name: 'Plano 3',
        description: 'Sistemas complexos e escaláveis.',
        price: 'A partir de R$ 30.000',
      },
    ],
  },
  {
    title: 'Otimização de Processos',
    plans: [
      {
        name: 'Plano 1',
        description: 'Análise e mapeamento de processos.',
        price: 'A partir de R$ 2.500',
      },
      {
        name: 'Plano 2',
        description: 'Automação de tarefas repetitivas.',
        price: 'A partir de R$ 6.000',
      },
      {
        name: 'Plano 3',
        description: 'Otimização completa do fluxo de trabalho.',
        price: 'A partir de R$ 12.000',
      },
    ],
  },
];

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
              {products.map((product) => (
                <div
                  key={product.title}
                  className="flex flex-col rounded-lg bg-card shadow-lg"
                >
                  <div className="p-6">
                    <h2 className="font-headline text-2xl font-bold">
                      {product.title}
                    </h2>
                  </div>
                  <div className="flex-grow space-y-4 p-6">
                    {product.plans.map((plan) => (
                      <div key={plan.name} className="rounded-lg bg-background p-4">
                        <h3 className="font-bold">{plan.name}</h3>
                        <p className="text-muted-foreground">
                          {plan.description}
                        </p>
                        <p className="mt-2 font-semibold text-primary">{plan.price}</p>
                      </div>
                    ))}
                  </div>
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
