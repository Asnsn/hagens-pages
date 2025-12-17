'use server';

import { PlaceHolderImages } from '@/lib/placeholder-images';

export interface InstagramPost {
  id: string;
  caption: string;
  imageUrl: string;
  imageHint: string;
}

// Mock service to simulate fetching Instagram posts
const mockPosts: InstagramPost[] = [
  {
    id: 'insta-1',
    caption: 'Explorando novas fronteiras da visualização de dados. Nossas ferramentas transformam números complexos em insights claros e acionáveis. #DataViz #Inovação #BigData',
    imageUrl: PlaceHolderImages.find(p => p.id === 'client-4')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'client-4')?.imageHint || ''
  },
  {
    id: 'insta-2',
    caption: 'Nosso time de especialistas em um workshop sobre design thinking. Colaboração é a chave para a criatividade. #DesignThinking #Equipe #Workshop',
    imageUrl: PlaceHolderImages.find(p => p.id === 'client-5')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'client-5')?.imageHint || ''
  },
  {
    id: 'insta-3',
    caption: 'Das linhas de código à experiência do usuário, cada detalhe importa. Criando interfaces que encantam e funcionam. #CreativeTech #UIUX #Desenvolvimento',
    imageUrl: PlaceHolderImages.find(p => p.id === 'client-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'client-1')?.imageHint || ''
  },
];

export async function getRecentInstagramPosts(limit: number = 3): Promise<InstagramPost[]> {
  // In a real application, you would use the Instagram API here.
  // For now, we return mock data.
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return mockPosts.slice(0, limit);
}
