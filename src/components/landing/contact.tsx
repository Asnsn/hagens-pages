'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';

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
import { submitContactFormAction } from '@/app/actions';
import { Send } from 'lucide-react';

const ContactFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().email('Endereço de e-mail inválido.'),
  message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres.'),
});

type ContactFormValues = z.infer<typeof ContactFormSchema>;

export default function Contact() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    startTransition(async () => {
      const result = await submitContactFormAction(values);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: result.error,
        });
      }
      if (result.success) {
        toast({
          title: 'Sucesso!',
          description: result.success,
        });
        form.reset();
      }
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          Entre em Contato
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Tem um projeto em mente? Adoraríamos ouvir de você. Preencha o formulário abaixo e entraremos em contato o mais breve possível.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço de E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Conte-nos sobre seu projeto..."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              <Send className="mr-2 h-4 w-4" />
              {isPending ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
