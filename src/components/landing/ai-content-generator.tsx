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
  productName: z.string().min(1, 'Product name is required.'),
  targetAudience: z.string().min(1, 'Target audience is required.'),
  keyFeatures: z.string().min(1, 'Key features are required.'),
  tone: z.string().default('professional'),
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
          title: 'Error',
          description: result.error,
        });
      }
      if (result.success) {
        setGeneratedCopy(result.success);
      }
    });
  };

  return (
    <section id="ai-generator" className="py-16 sm:py-24">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
            AI-Powered Content Generation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Struggling with writer's block? Use our AI tool to generate
            compelling marketing copy in seconds. Just provide a few details and
            let our AI do the heavy lifting.
          </p>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                Generate Your Copy
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
                        <FormLabel>Product/Service Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Innovatech Web Design"
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
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Small business owners"
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
                        <FormLabel>Key Features/Benefits</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Fast, responsive, SEO-optimized"
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
                        <FormLabel>Tone of Voice</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a tone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="professional">
                              Professional
                            </SelectItem>
                            <SelectItem value="friendly">Friendly</SelectItem>
                            <SelectItem value="humorous">Humorous</SelectItem>
                            <SelectItem value="persuasive">Persuasive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isPending} className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isPending ? 'Generating...' : 'Generate Copy'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <h3 className="font-headline text-2xl font-bold">
            Your Generated Copy
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
                    Your generated marketing copy will appear here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
