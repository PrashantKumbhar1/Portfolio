// One production metadata source. Never infer identity from preview hostnames.
export const site = {
  url: 'https://prashantkumbhar.netlify.app/',
  title: 'Prashant Kumbhar | Cybersecurity & Digital Forensics',
  description: "Prashant Kumbhar's cybersecurity and digital forensics portfolio: AI threat detection, DFIR development, phishing analysis, and secure software projects.",
  image: 'https://prashantkumbhar.netlify.app/social-preview.jpg',
};
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
export function seoHead({ preview = false } = {}) {
  const meta = (key, value, property = false) => `<meta ${property ? 'property' : 'name'}="${key}" content="${escape(value)}" />`;
  return [
    `<title>${escape(site.title)}</title>`,
    meta('description', site.description),
    `<link rel="canonical" href="${site.url}" />`,
    meta('robots', preview ? 'noindex, follow' : 'index, follow, max-image-preview:large'),
    meta('theme-color', '#302a34'),
    ...Object.entries({ 'og:type': 'profile', 'og:site_name': 'Prashant Kumbhar', 'og:locale': 'en_IN', 'og:url': site.url, 'og:title': site.title, 'og:description': site.description, 'og:image': site.image, 'og:image:type': 'image/jpeg', 'og:image:width': '1200', 'og:image:height': '630', 'og:image:alt': 'Prashant Kumbhar — Cybersecurity, Digital Forensics and AI Engineering' }).map(([key, value]) => meta(key, value, true)),
    ...Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': site.title, 'twitter:description': site.description, 'twitter:image': site.image, 'twitter:image:alt': 'Prashant Kumbhar — Cybersecurity, Digital Forensics and AI Engineering' }).map(([key, value]) => meta(key, value)),
    '<link rel="preload" as="image" type="image/webp" imagesrcset="/profile-480.webp 480w, /profile-960.webp 960w, /profile-1440.webp 1440w, /profile-full.webp 1728w" imagesizes="(max-width: 680px) 88vw, (max-width: 900px) 42vw, 455px" fetchpriority="high" />',
  ].join('\n    ');
}

export function structuredData(person) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${site.url}#website`, url: site.url, name: 'Prashant Kumbhar Portfolio', inLanguage: 'en', publisher: { '@id': `${site.url}#person` } },
      { '@type': 'ProfilePage', '@id': `${site.url}#profile`, url: site.url, name: site.title, description: site.description, inLanguage: 'en', isPartOf: { '@id': `${site.url}#website` }, mainEntity: { '@id': `${site.url}#person` } },
      { '@type': 'Person', '@id': `${site.url}#person`, name: person.name, url: site.url, description: 'Final-year B.Tech Computer Engineering student specializing in Cybersecurity, with interests in digital forensics, incident response and AI security.', image: `${site.url}profile-full.webp`, sameAs: [person.github, person.linkedin], knowsAbout: ['Cybersecurity', 'Digital forensics', 'Incident response', 'AI-powered threat detection', 'Vulnerability assessment and penetration testing', 'Secure software development'], affiliation: { '@type': 'CollegeOrUniversity', name: 'Pillai College of Engineering' } },
    ],
  };
}
