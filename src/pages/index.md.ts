import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

// The markdown twin of the homepage, per the /llms.txt v2 proposal: a clean
// markdown copy of a page served at the same URL with the extension replaced
// (a URL without a filename gets /index.md). Generated from the same content
// the HTML page renders.
export const GET: APIRoute = async () => {
  const [hero, featured, skills, seo, projects] = await Promise.all([
    getEntry('site', 'hero'),
    getEntry('site', 'featured'),
    getEntry('site', 'skills'),
    getEntry('site', 'seo'),
    getCollection('projects'),
  ]);

  const name = `${hero?.data.firstName ?? 'Omar'} ${hero?.data.lastName ?? 'Mohammed'}`;
  const ordered = [...projects].sort((a, b) => a.data.order - b.data.order);
  const tidy = (s?: string) => (s ?? '').replace(/\s+/g, ' ').trim();

  const out: string[] = [];
  out.push(`# ${name}`, '');
  for (const line of hero?.data.positioning ?? []) out.push(tidy(line), '');
  if (seo?.data.description) out.push(tidy(seo.data.description), '');

  out.push('## Projects', '');

  if (featured) {
    out.push(`### ${featured.data.name}`, '');
    if (featured.data.status) out.push(`Status: ${featured.data.status}`, '');
    out.push(tidy(featured.data.oneLiner), '');
    if (featured.data.tech?.length) out.push(`Stack: ${featured.data.tech.join(', ')}`, '');
    if (featured.data.note) out.push(tidy(featured.data.note), '');
  }

  for (const p of ordered) {
    out.push(`### ${p.data.name}`, '');
    if (p.data.subtitle) out.push(tidy(p.data.subtitle), '');
    for (const para of p.data.body) out.push(tidy(para), '');
    if (p.data.specs.length) {
      for (const s of p.data.specs) out.push(`- ${s.key}: ${tidy(s.value)}`);
      out.push('');
    }
    if (p.data.tech.length) out.push(`Tags: ${p.data.tech.join(', ')}`, '');
    if (p.data.github) out.push(`Source: ${p.data.github}`, '');
  }

  out.push('## Skills', '');
  for (const g of skills?.data.groups ?? []) {
    out.push(`### ${g.label}`, '', g.items.map((i) => `- ${i}`).join('\n'), '');
  }

  out.push('## Contact', '');
  out.push('- Email: mail.omarmohammed@gmail.com');
  out.push('- GitHub: https://github.com/ofmohamm');
  out.push('- LinkedIn: https://www.linkedin.com/in/ofmohammed', '');

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
