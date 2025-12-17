'use server';

/**
 * @fileOverview Generates a blog article from an Instagram post using multimodal analysis.
 * 
 * - generateArticleFromPost - A function that handles the article generation process.
 * - GenerateArticleInput - The input type for the function.
 * - GenerateArticleOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateArticleInputSchema = z.object({
  caption: z.string().describe('The text content or caption of the Instagram post.'),
  imageUrl: z.string().describe("The URL of the image from the Instagram post. This should be a publicly accessible URL."),
});
export type GenerateArticleInput = z.infer<typeof GenerateArticleInputSchema>;

const GenerateArticleOutputSchema = z.object({
  title: z.string().describe('A compelling and SEO-friendly title for the blog article.'),
  content: z.string().describe('The full content of the blog article, formatted in Markdown. It should be well-structured with headings, paragraphs, and lists where appropriate.'),
});
export type GenerateArticleOutput = z.infer<typeof GenerateArticleOutputSchema>;

export async function generateArticleFromPost(input: GenerateArticleInput): Promise<GenerateArticleOutput> {
  return generateArticleFromPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticleFromPostPrompt',
  input: { schema: GenerateArticleInputSchema },
  output: { schema: GenerateArticleOutputSchema },
  prompt: `
    You are an expert content creator and SEO specialist for a tech and innovation consultancy.
    Your task is to expand a short Instagram post into a full, insightful blog article.

    Analyze the provided image and caption from the Instagram post to understand the core topic and context.
    
    Based on this analysis, generate a complete blog article with the following characteristics:
    - It must be written in Brazilian Portuguese.
    - The tone should be professional, insightful, and engaging.
    - The content should elaborate on the concepts mentioned in the post, providing more depth, examples, or strategic insights.
    - The article must be well-structured, using Markdown for formatting (e.g., # for titles, ## for headings, * for list items).
    - Create a compelling title for the article.

    Instagram Post Caption:
    "{{caption}}"

    Instagram Post Image:
    {{media url=imageUrl}}
  `,
});

const generateArticleFromPostFlow = ai.defineFlow(
  {
    name: 'generateArticleFromPostFlow',
    inputSchema: GenerateArticleInputSchema,
    outputSchema: GenerateArticleOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
