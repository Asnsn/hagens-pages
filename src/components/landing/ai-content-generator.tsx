'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { generateCopyAction } from '@/app/actions';

import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const GenerateCopySchema = z.object({
  productName: z.string().min(1, 'O nome do produto é obrigatório.'),
  targetAudience: z.string().min(1, 'O público-alvo é obrigatório.'),
  keyFeatures: z.string().min(1, 'As características são obrigatórias.'),
  tone: z.string().default('profissional'),
});

type GenerateCopyFormValues = z.infer<typeof GenerateCopySchema>;

export default function AiContentGenerator() {
  const [isPending, startTransition] = useTransition();
  const [generatedCopy, setGeneratedCopy] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<GenerateCopyFormValues>({
    resolver: zodResolver(GenerateCopySchema),
    defaultValues: {
      productName: '',
      targetAudience: '',
      keyFeatures: '',
      tone: 'professional',
    },
  });

  const onSubmit = (values: GenerateCopyFormValues) => {
    setGeneratedCopy(null);
    startTransition(async () => {
      const result = await generateCopyAction(values);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: result.error,
        });
      }
      if (result.success) {
        setGeneratedCopy(result.success);
      }
    });
  };

  return (
    <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          Gere Textos com Inteligência Artificial
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Sem criatividade para textos? Use nossa ferramenta de IA para gerar textos de marketing impactantes em segundos. Forneça alguns detalhes e deixe a IA fazer o trabalho pesado.
        </p>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-headline text-xl">
              Gerar seu Texto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Produto/Serviço</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Fachada em ACM"
                          {...field}
                        />
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
                        <Input
                          placeholder="Ex: Lojas e comércios locais"
                          {...field}
                        />
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
                          placeholder="Ex: Design moderno, alta durabilidade, iluminação LED"
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um tom" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="professional">
                            Profissional
                          </SelectItem>
                          <SelectItem value="friendly">Amigável</SelectItem>
                          <SelectItem value="humorous">Divertido</SelectItem>
                          <SelectItem value="persuasive">Persuasivo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isPending ? 'Gerando...' : 'Gerar Texto'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col">
        <h3 className="font-headline text-2xl font-bold">
          Seu Texto Gerado
        </h3>
        <Card className="mt-4 flex-grow">
          <CardContent className="p-6">
            {isPending && (
              <div className="space-y-4">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[75%]" />
              </div>
            )}
            {generatedCopy && (
              <p className="whitespace-pre-wrap">{generatedCopy}</p>
            )}
            {!isPending && !generatedCopy && (
              <div className="flex h-full items-center justify-center text-center">
                <p className="text-muted-foreground">
                  Seu texto de marketing gerado aparecerá aqui.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
