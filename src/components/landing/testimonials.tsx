import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Joana Silva',
    title: 'CEO, TechCorp',
    quote:
      'A Hagens transformou nossa presença online. A equipe é profissional, criativa e entregou além de nossas expectativas. Vimos um aumento significativo no engajamento e nos leads.',
  },
  {
    id: 'testimonial-2',
    name: 'João Santos',
    title: 'Fundador, StartupX',
    quote:
      'Trabalhar com a Hagens mudou o jogo. Sua abordagem orientada por dados para o marketing nos ajudou a entender melhor nosso público e alcançar um crescimento notável em um curto período.',
  },
  {
    id: 'testimonial-3',
    name: 'Sara Lima',
    title: 'Diretora de Marketing, Creative Minds',
    quote:
      'O novo site não é apenas bonito, mas também incrivelmente rápido e fácil de usar. Todo o processo foi tranquilo, e foi um prazer trabalhar com a equipe.',
  },
];

export default function Testimonials() {
  const testimonialImages = PlaceHolderImages.filter(img =>
    testimonials.some(t => t.id === img.id)
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          O Que Nossos Clientes Dizem
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Temos orgulho de ter conquistado a confiança de nossos incríveis clientes.
        </p>
      </div>
      <Carousel
        opts={{ align: 'start', loop: true }}
        className="mx-auto mt-12 w-full max-w-4xl"
      >
        <CarouselContent>
          {testimonials.map(testimonial => {
            const image = testimonialImages.find(
              img => img.id === testimonial.id
            );
            return (
              <CarouselItem key={testimonial.id} className="md:basis-1/1">
                <div className="p-4">
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col justify-between p-6">
                      <blockquote className="text-lg italic text-foreground">
                        “{testimonial.quote}”
                      </blockquote>
                      <div className="mt-6 flex items-center gap-4">
                        <Avatar>
                          {image && (
                            <AvatarImage
                              src={image.imageUrl}
                              alt={image.description}
                              data-ai-hint={image.imageHint}
                            />
                          )}
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-[-50px] hidden sm:flex" />
        <CarouselNext className="right-[-50px] hidden sm:flex" />
      </Carousel>
    </div>
  );
}
