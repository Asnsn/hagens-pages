'use client';

import { useState, useTransition, useEffect } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { generateArticleAction } from '@/app/actions';
import { getRecentInstagramPosts, type InstagramPost } from '@/lib/services/instagram-service';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import AnimatedSection from '@/components/landing/animated-section';
import ConnectionParticles from '@/components/landing/connection-particles';
import { Button } from '@/components/ui/button';
import { Loader2, Newspaper, Instagram } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function IAInstagramPage() {
  const { toast } = useToast();
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const [isGenerating, startTransition] = useTransition();
  
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [generatedArticle, setGeneratedArticle] = useState<{ title: string, content: string } | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetchingPosts(true);
      try {
        const recentPosts = await getRecentInstagramPosts(3);
        setPosts(recentPosts);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro ao buscar posts',
          description: 'Não foi possível carregar os posts simulados do Instagram.',
        });
      } finally {
        setIsFetchingPosts(false);
      }
    }
    fetchPosts();
  }, [toast]);

  const handleGenerateArticle = (post: InstagramPost) => {
    setGeneratedArticle(null);
    setSelectedPostId(post.id);
    startTransition(async () => {
      const result = await generateArticleAction({ caption: post.caption, imageUrl: post.imageUrl });
      if (result.success) {
        setGeneratedArticle(result.success);
        toast({
          title: 'Artigo Gerado!',
          description: 'Seu novo artigo de blog está pronto.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao Gerar Artigo',
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
        <AnimatedSection id="ia-instagram-tool" className="py-16 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
                Gerador de Artigos via Instagram
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Use a IA para transformar seus posts recentes do Instagram em artigos de blog completos.
              </p>
            </div>

            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Instagram />
                  <span>Posts Recentes (Simulação)</span>
                </CardTitle>
                <CardDescription>
                  Selecione um post para que a IA gere um artigo baseado em sua imagem e legenda.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {isFetchingPosts ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-[150px] w-full rounded-md" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="mt-2 h-4 w-full" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-10 w-full" />
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  posts.map((post) => (
                    <Card key={post.id} className="flex flex-col">
                      <CardHeader className="p-0">
                        <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
                          <Image
                            src={post.imageUrl}
                            alt={`Instagram post ${post.id}`}
                            fill
                            data-ai-hint={post.imageHint}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow p-4">
                        <p className="text-sm text-muted-foreground">{post.caption}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          onClick={() => handleGenerateArticle(post)}
                          disabled={isGenerating}
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                        >
                          {isGenerating && selectedPostId === post.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Newspaper className="mr-2 h-4 w-4" />
                          )}
                          Gerar Artigo
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>

            {(isGenerating && !generatedArticle) && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Gerando seu artigo...</CardTitle>
                  <CardDescription>Aguarde enquanto a IA analisa o post e cria o conteúdo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            )}

            {generatedArticle && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>{generatedArticle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none rounded-md border border-border bg-card p-4">
                    <ReactMarkdown>{generatedArticle.content}</ReactMarkdown>
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

// Ensure you have react-markdown installed: npm install react-markdown
// Since I cannot run npm install, I'll add the dependency to package.json
