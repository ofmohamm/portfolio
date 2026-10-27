// Tiny inline formatter for project copy: **bold**, `code`, [text](url).
// Content is ours, but HTML is still escaped first so a stray "<" in copy can
// never become markup.
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function inlineMd(src: string): string {
  const codes: string[] = [];
  let s = esc(src.replace(/\s+/g, ' ').trim());
  s = s.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[+i]}</code>`);
}

// Plain-text version for llms.txt and /index.md, which are markdown already.
export const stripMd = (src: string) => src.replace(/\s+/g, ' ').trim();
