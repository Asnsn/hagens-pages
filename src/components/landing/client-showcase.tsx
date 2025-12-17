import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const projects = [
  { id: 'client-1', name: 'Project Alpha', category: 'Web Development' },
  { id: 'client-2', name: 'Project Beta', category: 'Brand Strategy' },
  { id: 'client-3', name: 'Project Gamma', category: 'Digital Marketing' },
  { id: 'client-4', name: 'Project Delta', category: 'Data Analytics' },
  { id: 'client-5', name: 'Project Epsilon', category: 'Content Creation' },
  { id: 'client-6', name: 'Project Zeta', category: 'SEO & SEM' },
];

export default function ClientShowcase() {
  const projectImages = PlaceHolderImages.filter(img =>
    projects.some(p => p.id === img.id)
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          Our Work
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Take a look at some of the successful projects we've delivered for
          our clients.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => {
          const image = projectImages.find(img => img.id === project.id);
          if (!image) return null;
          return (
            <Card key={project.id} className="group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={image.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="font-headline text-xl font-bold text-white">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {project.category}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
