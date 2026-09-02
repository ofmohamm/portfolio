import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

// Generated from the same YAML the page renders, so it cannot drift.
// Format follows the /llms.txt v2 spec: H1, blockquote summary, non-heading
// detail, then H2 "file lists" of `[name](url): notes`, with a trailing
// "Optional" section for links an agent can skip.
const SITE = 'https://omarmohammed.co';

export const GET: APIRoute = async () => {
  const [hero, featured, skills, projects] = await Promise.all([
    getEntry('site', 'hero'),
    getEntry('site', 'featured'),
    getEntry('site', 'skills'),
    getCollection('projects'),
  ]);

  const name = `${hero?.data.firstName ?? 'Omar'} ${hero?.data.lastName ?? 'Mohammed'}`;
  const positioning = (hero?.data.positioning ?? []).join('. ');
  const ordered = [...projects].sort((a, b) => a.data.order - b.data.order);

  const oneLine = (s?: string) => (s ?? '').replace(/\s+/g, ' ').trim();

  const lines: string[] = [];

  lines.push(`# ${name}`, '');
  lines.push(
    `> ${positioning}. Single-page portfolio. Each project has its own URL ` +
      `fragment, and a plain-markdown copy of the whole page is available at ` +
      `${SITE}/index.md.`,
    ''
  );
  lines.push(
    'Project detail lives in dialogs that are addressable by fragment, so a link',
    'like #modal-privacy-based-tracker opens that project directly. Source for',
    'each shipped project is on GitHub. Contact is by email or LinkedIn.',
    ''
  );

  // Skills go in the pre-heading detail area on purpose: the spec requires every
  // item under an H2 to be a markdown hyperlink, and these are not links.
  if (skills?.data.groups?.length) {
    lines.push('Skills by area:', '');
    for (const g of skills.data.groups) lines.push(`- ${g.label}: ${g.items.join(', ')}`);
    lines.push('');
  }

  lines.push('## Page content', '');
  lines.push(
    `- [Full page as markdown](${SITE}/index.md): Everything on the site as plain text, including all project descriptions and specs. Start here.`,
    ''
  );

  lines.push('## Projects', '');
  if (featured) {
    lines.push(
      `- [${featured.data.name}](${SITE}/#modal-featured): ${oneLine(featured.data.oneLiner)}${
        featured.data.status ? ` Status: ${featured.data.status}.` : ''
      }`
    );
  }
  for (const p of ordered) {
    lines.push(
      `- [${p.data.name}](${SITE}/#modal-${p.id}): ${oneLine(p.data.oneLiner)}${
        p.data.subtitle ? ` (${oneLine(p.data.subtitle)})` : ''
      }`
    );
  }
  lines.push('');

  lines.push('## Source code', '');
  for (const p of ordered) {
    if (p.data.github) {
      lines.push(`- [${p.data.name} repository](${p.data.github}): Source for ${p.data.name}.`);
    }
  }
  lines.push('');

  lines.push('## Optional', '');
  lines.push(`- [GitHub profile](https://github.com/ofmohamm): All public repositories.`);
  lines.push(
    `- [LinkedIn](https://www.linkedin.com/in/ofmohammed): Employment and education history.`
  );
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
