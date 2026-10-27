// Illustrative four-sensor PIR layout over a 6 x 4 tile frame. Each sensor
// watches one quadrant plus an overlap margin, so near a seam two sensors fire
// and at dead centre all four do, which is where gating stops helping.
export const W = 560, H = 380;
export const FRAME = { x: 40, y: 30, w: 480, h: 320 };
export const COLS = 6, ROWS = 4;
export const TILE_W = FRAME.w / COLS, TILE_H = FRAME.h / ROWS;
export const MARGIN = 0.12;   // overlap, as a fraction of frame width/height

export const SENSORS = [
  { id: 'tl', cx: FRAME.x, cy: FRAME.y, qx: 0, qy: 0 },
  { id: 'tr', cx: FRAME.x + FRAME.w, cy: FRAME.y, qx: 1, qy: 0 },
  { id: 'bl', cx: FRAME.x, cy: FRAME.y + FRAME.h, qx: 0, qy: 1 },
  { id: 'br', cx: FRAME.x + FRAME.w, cy: FRAME.y + FRAME.h, qx: 1, qy: 1 },
];

export function evaluate(px: number, py: number, gating: boolean) {
  const u = (px - FRAME.x) / FRAME.w, v = (py - FRAME.y) / FRAME.h;
  const lit = SENSORS.map((s) => {
    const okX = s.qx === 0 ? u <= 0.5 + MARGIN : u >= 0.5 - MARGIN;
    const okY = s.qy === 0 ? v <= 0.5 + MARGIN : v >= 0.5 - MARGIN;
    return okX && okY;
  });
  const tiles: boolean[] = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const qx = c < COLS / 2 ? 0 : 1, qy = r < ROWS / 2 ? 0 : 1;
      tiles.push(!gating || SENSORS.some((s, i) => lit[i] && s.qx === qx && s.qy === qy));
    }
  return { lit, tiles, count: tiles.filter(Boolean).length };
}

export const clampPos = (x: number, y: number) => ({
  x: Math.max(FRAME.x + 30, Math.min(FRAME.x + FRAME.w - 30, x)),
  y: Math.max(FRAME.y + 24, Math.min(FRAME.y + FRAME.h - 24, y)),
});

// A small fox, roughly 70 x 44, origin at its centre.
export const FOX =
  'M-33,10 C-30,-2 -18,-9 -4,-9 L14,-9 C18,-13 20,-20 23,-24 L26,-16 L31,-23 L32,-13 ' +
  'C36,-11 39,-7 40,-3 L33,-1 C30,1 26,2 22,3 L20,13 L16,13 L15,5 L-14,5 L-16,14 L-20,14 ' +
  'L-20,5 C-24,6 -27,9 -29,14 C-35,22 -44,20 -46,12 C-41,15 -36,15 -33,10 Z';
