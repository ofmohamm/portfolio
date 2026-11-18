// Top-down dial for the tracker: the servo's 0 to 180 degree sweep as a half
// circle, 0 on the right, 90 straight ahead, 180 on the left.
export const DIAL = { W: 360, H: 214, cx: 180, cy: 180, R: 148 };
export const dialPoint = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: DIAL.cx + r * Math.cos(a), y: DIAL.cy - r * Math.sin(a) };
};
