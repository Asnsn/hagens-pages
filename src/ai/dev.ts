'use server';

import { config } from 'dotenv';
config();

import '@/ai/flows/generate-marketing-copy.ts';
import '@/ai/flows/generate-article-from-post.ts';
