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
    name: 'Jane Doe',
    title: 'CEO, TechCorp',
    quote:
      'Innovatech transformed our online presence. Their team is professional, creative, and delivered beyond our expectations. We\'ve seen a significant increase in engagement and leads.',
  },
  {
    id: 'testimonial-2',
    name: 'John Smith',
    title: 'Founder, StartupX',
    quote:
      'Working with Innovatech was a game-changer. Their data-driven approach to marketing helped us understand our audience better and achieve remarkable growth in a short period.',
  },
  {
    id: 'testimonial-3',
    name: 'Sarah Lee',
    title: 'Marketing Director, Creative Minds',
    quote:
      'The new website is not only beautiful but also incredibly fast and user-friendly. The whole process was seamless, and the team was a pleasure to work with.',
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
          What Our Clients Say
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          We're proud to have earned the trust of our amazing clients.
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
