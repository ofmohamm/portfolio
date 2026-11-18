// Client helpers shared by the figures.

export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Range inputs paint their filled part from --p on the wrapper.
export function fillSlider(input: HTMLInputElement) {
  const min = +input.min, max = +input.max;
  (input.parentElement as HTMLElement).style.setProperty('--p', String((+input.value - min) / (max - min)));
}

// The figure's own motion, like the inspo's ticking watch. It runs only while
// the figure is on screen and the tab is visible, stops for good the moment
// the reader takes over (interrupt), and never starts under reduced motion.
// tick gets the seconds since the last frame, capped so a dropped frame or a
// resumed tab never jumps the animation.
export function player(root: HTMLElement, tick: (dt: number) => void) {
  const btn = root.querySelector<HTMLButtonElement>('.fig-play');
  let wanted = !reduceMotion(), onScreen = false, raf = 0, last = 0;

  const frame = (now: number) => {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    tick(dt);
    raf = requestAnimationFrame(frame);
  };
  const sync = () => {
    const run = wanted && onScreen && !document.hidden;
    if (run && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
    btn?.setAttribute('aria-pressed', String(wanted));
    btn?.setAttribute('aria-label', wanted ? 'Pause animation' : 'Play animation');
  };

  if (btn) {
    if (reduceMotion()) btn.hidden = true;
    btn.addEventListener('click', () => { wanted = !wanted; sync(); });
  }
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); }).observe(root);
  document.addEventListener('visibilitychange', sync);

  return {
    get playing() { return wanted; },
    interrupt() { if (wanted) { wanted = false; sync(); } },
  };
}
