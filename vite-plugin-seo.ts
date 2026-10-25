import type { Plugin } from 'vite';
import { seoHead } from './script/seo-config.mjs';

export function seoPlugin(): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml: {
      order: 'pre',
      handler: html => html.replace('<!--seo-head-->', seoHead({ preview: !!process.env.CONTEXT && process.env.CONTEXT !== 'production' })),
    },
  };
}
