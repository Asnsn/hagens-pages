'use server';

/**
 * @fileOverview Generates marketing copy suggestions based on user input.
 *
 * - generateMarketingCopy - A function that generates marketing copy.
 * - GenerateMarketingCopyInput - The input type for the generateMarketingCopy function.
 * - GenerateMarketingCopyOutput - The return type for the generateMarketingCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingCopyInputSchema = z.object({
  productName: z.string().describe('The name of the product or service.'),
  targetAudience: z.string().describe('The target audience for the marketing copy.'),
  keyFeatures: z.string().describe('The key features or benefits to highlight.'),
  tone: z
    .string()
    .default('professional')
    .describe('The desired tone of the marketing copy (e.g., professional, friendly, humorous).'),
});
export type GenerateMarketingCopyInput = z.infer<typeof GenerateMarketingCopyInputSchema>;

const GenerateMarketingCopyOutputSchema = z.object({
  marketingCopy: z.string().describe('The generated marketing copy suggestion.'),
});
export type GenerateMarketingCopyOutput = z.infer<typeof GenerateMarketingCopyOutputSchema>;

export async function generateMarketingCopy(
  input: GenerateMarketingCopyInput
): Promise<GenerateMarketingCopyOutput> {
  return generateMarketingCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingCopyPrompt',
  input: {schema: GenerateMarketingCopyInputSchema},
  output: {schema: GenerateMarketingCopyOutputSchema},
  prompt: `You are a marketing expert tasked with generating compelling marketing copy.

Based on the following information, generate a marketing copy suggestion. The final output must be in Brazilian Portuguese.

Product/Service Name: {{{productName}}}
Target Audience: {{{targetAudience}}}
Key Features/Benefits: {{{keyFeatures}}}
Tone of Voice: {{{tone}}}

Marketing Copy:`,
});

const generateMarketingCopyFlow = ai.defineFlow(
  {
    name: 'generateMarketingCopyFlow',
    inputSchema: GenerateMarketingCopyInputSchema,
    outputSchema: GenerateMarketingCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
