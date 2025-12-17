'use server';

import { z } from 'zod';
import {
  generateMarketingCopy,
  type GenerateMarketingCopyInput,
} from '@/ai/flows/generate-marketing-copy';
import {
  generateArticleFromPost,
  type GenerateArticleInput,
} from '@/ai/flows/generate-article-from-post';


const GenerateCopySchema = z.object({
  productName: z.string().min(1, 'O nome do produto é obrigatório.'),
  targetAudience: z.string().min(1, 'O público-alvo é obrigatório.'),
  keyFeatures: z.string().min(1, 'As características são obrigatórias.'),
  tone: z.string(),
});

export async function generateCopyAction(
  values: z.infer<typeof GenerateCopySchema>
) {
  const validatedFields = GenerateCopySchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Dados inválidos.',
    };
  }

  try {
    const input: GenerateMarketingCopyInput = validatedFields.data;
    const result = await generateMarketingCopy(input);
    return { success: result.marketingCopy };
  } catch (error) {
    console.error(error);
    return {
      error: 'Falha ao gerar texto. Por favor, tente novamente mais tarde.',
    };
  }
}

const ContactFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().email('Endereço de e-mail inválido.'),
  message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres.'),
});

export async function submitContactFormAction(
  values: z.infer<typeof ContactFormSchema>
) {
  const validatedFields = ContactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Dados inválidos.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Aqui você normalmente enviaria um e-mail, salvaria em um banco de dados, etc.
  // Para este exemplo, vamos apenas registrar os dados.
  console.log('Formulário de contato enviado:', validatedFields.data);

  return {
    success: 'Obrigado pela sua mensagem! Entraremos em contato em breve.',
  };
}


const GenerateArticleSchema = z.object({
  caption: z.string(),
  imageUrl: z.string().url(),
});

export async function generateArticleAction(
  values: z.infer<typeof GenerateArticleSchema>
) {
  const validatedFields = GenerateArticleSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Dados do post inválidos.' };
  }

  try {
    const input: GenerateArticleInput = validatedFields.data;
    const result = await generateArticleFromPost(input);
    return { success: result };
  } catch (error) {
    console.error('Error generating article:', error);
    return {
      error: 'Falha ao gerar o artigo. A IA pode estar sobrecarregada. Tente novamente.',
    };
  }
}
