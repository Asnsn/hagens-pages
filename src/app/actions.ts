'use server';

import { z } from 'zod';
import {
  generateMarketingCopy,
  type GenerateMarketingCopyInput,
} from '@/ai/flows/generate-marketing-copy';

const GenerateCopySchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  targetAudience: z.string().min(1, 'Target audience is required.'),
  keyFeatures: z.string().min(1, 'Key features are required.'),
  tone: z.string(),
});

export async function generateCopyAction(
  values: z.infer<typeof GenerateCopySchema>
) {
  const validatedFields = GenerateCopySchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid input.',
    };
  }

  try {
    const input: GenerateMarketingCopyInput = validatedFields.data;
    const result = await generateMarketingCopy(input);
    return { success: result.marketingCopy };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to generate marketing copy. Please try again later.',
    };
  }
}

const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
});

export async function submitContactFormAction(
  values: z.infer<typeof ContactFormSchema>
) {
  const validatedFields = ContactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid input.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Here you would typically send an email, save to a database, etc.
  // For this example, we'll just log the data.
  console.log('Contact form submitted:', validatedFields.data);

  return {
    success: 'Thank you for your message! We will get back to you soon.',
  };
}
