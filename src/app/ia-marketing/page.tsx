'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateCopyAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import AnimatedSection from '@/components/landing/animated-section';
import ConnectionParticles from '@/components/landing/connection-particles';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const GenerateCopySchema = z.object({
  productName: z.string().min(3, 'O nome do produto deve ter pelo menos 3 caracteres.'),
  targetAudience: z.string().min(3, 'O público-alvo deve ter pelo menos 3 caracteres.'),
  keyFeatures: z.string().min(10, 'As características devem ter pelo menos 10 caracteres.'),
  tone: z.string().min(1, 'O tom de voz é obrigatório.'),
});

export default function IAMarketingPage() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [generatedCopy, setGeneratedCopy] = useState<string>('');

  const form = useForm<z.infer<typeof GenerateCopySchema>>({
    resolver: zodResolver(GenerateCopySchema),
    defaultValues: {
      productName: '',
      targetAudience: '',
      keyFeatures: '',
      tone: 'Profissional',
    },
  });

  const onSubmit = (values: z.infer<typeof GenerateCopySchema>) => {
    setGeneratedCopy('');
    startTransition(async () => {
      const result = await generateCopyAction(values);
      if (result.success) {
        setGeneratedCopy(result.success);
        toast({
          title: 'Texto Gerado!',
          description: 'Sua cópia de marketing foi gerada com sucesso.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao gerar texto',
          description: result.error,
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ConnectionParticles />
      <Header />
      <main className="flex-grow">
        <AnimatedSection id="ia-tool" className="py-16 sm:py-24">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
                Gerador de Copy com IA
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Preencha os campos abaixo para que nossa inteligência artificial crie uma sugestão de texto de marketing para você.
              </p>
            </div>

            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Crie sua Copy</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="productName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Produto/Serviço</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Consultoria de Inovação" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="targetAudience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Público-alvo</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Startups de tecnologia, Diretores de Marketing" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="keyFeatures"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Principais Características/Benefícios</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ex: Análise de dados avançada, construção de MVPs, aceleração de growth"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tom de Voz</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tom desejado" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Profissional">Profissional</SelectItem>
                                    <SelectItem value="Amigável">Amigável</SelectItem>
                                    <SelectItem value="Humorístico">Humorístico</SelectItem>
                                    <SelectItem value="Inspirador">Inspirador</SelectItem>
                                    <SelectItem value="Técnico">Técnico</SelectItem>
                                </SelectContent>
                            </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isPending} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                      {isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                      )}
                      Gerar Texto
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {generatedCopy && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Texto Gerado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none rounded-md border border-border bg-card p-4">
                    <p>{generatedCopy}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
