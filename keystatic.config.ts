import { config, collection, singleton, fields } from '@keystatic/core';

// In local dev the editor writes straight to disk; in production it commits to
// GitHub (which Netlify then auto-deploys). See KEYSTATIC_SETUP.md.
const isDev = import.meta.env?.DEV ?? process.env.NODE_ENV !== 'production';
const storage = isDev
  ? ({ kind: 'local' } as const)
  : ({ kind: 'github', repo: 'ofmohamm/portfolio' } as const);

export default config({
  storage,
  ui: {
    brand: { name: 'Portfolio CMS' },
    navigation: {
      Content: ['projects'],
      Site: ['hero', 'featured', 'skills', 'seo'],
    },
  },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'name',
      path: 'src/content/projects/*',
      format: { data: 'yaml' },
      columns: ['name', 'order'],
      schema: {
        name: fields.slug({
          name: { label: 'Project name', validation: { isRequired: true } },
        }),
        subtitle: fields.text({
          label: 'Subtitle',
          description: 'e.g. "Research Lab · Syracuse University · Summer 2025"',
        }),
        oneLiner: fields.text({
          label: 'One-liner',
          description: 'Short summary shown on the card.',
          multiline: true,
        }),
        order: fields.integer({
          label: 'Display order',
          description: 'Lower numbers appear first.',
          defaultValue: 0,
        }),
        mediaType: fields.select({
          label: 'Media type',
          options: [
            { label: '3D model', value: '3d' },
            { label: 'Video', value: 'video' },
          ],
          defaultValue: 'video',
        }),
        model3d: fields.file({
          label: '3D model (.glb)',
          description: 'Used when media type is "3D model".',
          directory: 'public/models',
          publicPath: '/models/',
        }),
        video: fields.file({
          label: 'Video (.mp4)',
          description: 'Used when media type is "Video".',
          directory: 'public/videos',
          publicPath: '/videos/',
        }),
        poster: fields.image({
          label: 'Poster image',
          description: 'Fallback shown before media loads.',
          directory: 'public/images/posters',
          publicPath: '/images/posters/',
        }),
        tech: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tech tags',
          itemLabel: (props) => props.value,
        }),
        github: fields.url({ label: 'GitHub URL' }),
        body: fields.array(
          fields.text({ label: 'Paragraph', multiline: true }),
          {
            label: 'Body paragraphs',
            description: 'Shown in the project detail modal.',
            itemLabel: (props) => props.value.slice(0, 50) || 'Paragraph',
          }
        ),
        specs: fields.array(
          fields.object({
            key: fields.text({ label: 'Label' }),
            value: fields.text({ label: 'Value' }),
          }),
          {
            label: 'Spec table',
            itemLabel: (props) =>
              `${props.fields.key.value}: ${props.fields.value.value}`,
          }
        ),
      },
    }),
  },
  singletons: {
    hero: singleton({
      label: 'Hero',
      path: 'src/content/site/hero',
      format: { data: 'yaml' },
      schema: {
        firstName: fields.text({ label: 'First name' }),
        lastName: fields.text({ label: 'Last name' }),
        positioning: fields.array(fields.text({ label: 'Line' }), {
          label: 'Positioning lines',
          itemLabel: (props) => props.value,
        }),
        avatar: fields.image({
          label: 'Headshot',
          directory: 'public/images',
          publicPath: '/images/',
        }),
      },
    }),
    featured: singleton({
      label: 'Featured project',
      path: 'src/content/site/featured',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({ label: 'Name' }),
        status: fields.text({ label: 'Status badge', defaultValue: 'In progress' }),
        oneLiner: fields.text({ label: 'One-liner', multiline: true }),
        tech: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tech tags',
          itemLabel: (props) => props.value,
        }),
      },
    }),
    skills: singleton({
      label: 'Skills',
      path: 'src/content/site/skills',
      format: { data: 'yaml' },
      schema: {
        groups: fields.array(
          fields.object({
            label: fields.text({ label: 'Category' }),
            items: fields.array(fields.text({ label: 'Skill' }), {
              label: 'Skills',
              itemLabel: (props) => props.value,
            }),
          }),
          {
            label: 'Skill groups',
            itemLabel: (props) => props.fields.label.value,
          }
        ),
      },
    }),
    seo: singleton({
      label: 'SEO / Page meta',
      path: 'src/content/site/seo',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Page title' }),
        description: fields.text({ label: 'Meta description', multiline: true }),
      },
    }),
  },
});
