import { getCollection } from 'astro:content';

// Project cover images live in src/assets so Astro can convert and resize them.
import watercamPcb from '../assets/projects/watercam-pcb.png';
import privacyTracker from '../assets/projects/privacy-tracker.jpg';
import floxEdgeCamera from '../assets/projects/flox-edge-camera.webp';
import acousticDrone from '../assets/projects/acoustic-drone-detection.jpg';

const covers: Record<string, ImageMetadata> = {
  'flood-detection-sensor-pcb': watercamPcb,
  'privacy-based-tracker': privacyTracker,
  'flox-edge-modeling': floxEdgeCamera,
  'acoustic-drone-detection': acousticDrone,
};

// Every page that lists or shows projects reads them through here, so the
// homepage cards and the project pages can't disagree on order or covers.
export async function loadProjects() {
  const entries = await getCollection('projects');
  return entries
    .map((entry) => ({
      id: entry.id,
      href: `/projects/${entry.id}/`,
      name: entry.data.name,
      subtitle: entry.data.subtitle,
      oneLiner: entry.data.oneLiner,
      order: entry.data.order,
      status: entry.data.status,
      org: entry.data.org,
      cover: covers[entry.id],
      tech: entry.data.tech,
      github: entry.data.github,
      cta: entry.data.cta,
      coverVideo: entry.data.coverVideo,
      body: entry.data.body,
    }))
    .sort((a, b) => a.order - b.order);
}

export type Project = Awaited<ReturnType<typeof loadProjects>>[number];
