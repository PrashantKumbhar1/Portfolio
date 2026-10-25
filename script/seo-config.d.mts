export const site: { url: string; title: string; description: string; image: string };
export function seoHead(options?: { preview?: boolean }): string;
export function structuredData(person: { name: string; github: string; linkedin: string }): Record<string, unknown>;
