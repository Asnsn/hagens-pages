'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const clients = [
  { id: 'client-1', name: 'iPlace', logo: '/logos/iplace.svg' },
  { id: 'client-2', name: 'Cobasi', logo: '/logos/cobasi.svg' },
  { id: 'client-3', name: 'Chilli Beans', logo: '/logos/chilli-beans.svg' },
  { id: 'client-4', name: 'Arezzo', logo: '/logos/arezzo.svg' },
  { id: 'client-5', name: 'CS Club', logo: '/logos/cs-club.svg' },
  { id: 'client-6', name: 'Schutz', logo: '/logos/schutz.svg' },
  { id: 'client-7', name: 'Track & Field', logo: '/logos/track-field.svg' },
  { id: 'client-8', name: 'Vivara', logo: '/logos/vivara.svg' },
  { id: 'client-9', name: 'L\'Occitane en Provence', logo: '/logos/loccitane.svg' },
  { id: 'client-10', name: 'Valisere', logo: '/logos/valisere.svg' },
  { id: 'client-11', name: 'O Boticário', logo: '/logos/boticario.svg' },
  { id: 'client-12', name: 'Quem Disse, Berenice?', logo: '/logos/quem-disse-berenice.svg' },
];

export default function ClientShowcase() {
  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
            Nossos Clientes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Temos orgulho de ter a confiança de grandes marcas.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {clients.map((client) => (
            <Card key={client.id} className="group flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white/5 border-white/10">
              <CardContent className="p-0">
                <div className="relative h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
