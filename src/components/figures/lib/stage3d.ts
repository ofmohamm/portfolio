// A small WebGL stage for the 3D figures, in the spirit of ciechanow.ski:
// matte parts in the figure palette, soft light from above, no background, so
// the model sits straight on the page like the SVG drawings do. It renders
// only when asked (invalidate), so a figure that isn't moving costs nothing.
//
// World is z-up and in metres, matching lib/array.ts. The camera orbits a
// target: yaw spins around z, pitch tilts up from the ground plane, with the
// same sign convention as the SVG projector in lib/array.ts.
//
// Three.js is only pulled in by this module, and the figures load it with a
// dynamic import once they near the viewport, so it never weighs on first load.
import {
  BufferGeometry, CylinderGeometry, Color, DirectionalLight, Float32BufferAttribute,
  HemisphereLight, Line, LineBasicMaterial, LineDashedMaterial, Mesh, MeshStandardMaterial,
  Object3D, PerspectiveCamera, Plane, Raycaster, Scene, Vector2, Vector3, WebGLRenderer,
} from 'three';

// Re-exported so figures get the pieces they build with from here, never from
// 'three' directly: a static import would pull it into first load, and a
// dynamic `import('three')` takes the whole namespace, which can't be
// tree-shaken (705 KB versus 480 KB).
export {
  BoxGeometry, CylinderGeometry, DoubleSide, ExtrudeGeometry, Group, LatheGeometry, Mesh, RingGeometry, Shape,
  TorusGeometry, Vector2,
} from 'three';

export type V3 = [number, number, number];
export type Part = 'teal' | 'clay' | 'ochre' | 'sage' | 'slate' | 'plum' | 'ink';

const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// Part colours come from figure.css, so 3D and prose always match.
export function color(part: Part | string) {
  if (part === 'ink') return new Color('#2C2C2C');
  if (part.startsWith('#')) return new Color(part);
  return new Color(css(part.startsWith('--') ? part : `--c-${part}`) || '#2C2C2C');
}

// Matte, like painted plastic. Pass opacity < 1 for ghosts and lenses.
export function mat(part: Part | string, o: { opacity?: number; tint?: number } = {}) {
  const c = color(part);
  // tint mixes the colour toward the page background, for large pale surfaces
  if (o.tint) c.lerp(new Color(css('--color-bg-primary') || '#FAF9F6'), o.tint);
  const opacity = o.opacity ?? 1;
  return new MeshStandardMaterial({
    color: c, roughness: 0.62, metalness: 0,
    transparent: opacity < 1, opacity, depthWrite: opacity >= 1,
  });
}

// A rod between two points: posts, arms, rays.
export function rod(a: V3, b: V3, r: number, material: MeshStandardMaterial) {
  const m = new Mesh(new CylinderGeometry(r, r, 1, 16), material);
  placeRod(m, a, b);
  return m;
}
const UP = new Vector3(0, 1, 0);
export function placeRod(m: Object3D, a: V3, b: V3) {
  const va = new Vector3(...a), vb = new Vector3(...b);
  const d = vb.clone().sub(va), len = d.length() || 1e-6;
  m.position.copy(va).addScaledVector(d, 0.5);
  m.quaternion.setFromUnitVectors(UP, d.divideScalar(len));
  m.scale.set(1, len, 1);
}

// A disc lying flat on the ground (z-up), for boards, pads and dots.
export function disc(r: number, h: number, material: MeshStandardMaterial, segments = 48) {
  const m = new Mesh(new CylinderGeometry(r, r, h, segments), material);
  m.rotation.x = Math.PI / 2;
  return m;
}

// 1 px guides: thin solid or dashed polylines in a flat colour.
export function polyline(pts: V3[], part: Part | string, o: { dashed?: boolean; opacity?: number } = {}) {
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pts.flat(), 3));
  const common = { color: color(part), transparent: true, opacity: o.opacity ?? 1 };
  const line = new Line(g, o.dashed ? new LineDashedMaterial({ ...common, dashSize: 0.012, gapSize: 0.016 }) : new LineBasicMaterial(common));
  if (o.dashed) line.computeLineDistances();
  return line;
}
export function setPolyline(line: Line, pts: V3[]) {
  const pos = line.geometry.getAttribute('position') as Float32BufferAttribute;
  pts.forEach((p, i) => pos.setXYZ(i, p[0], p[1], p[2]));
  pos.needsUpdate = true;
  line.geometry.computeBoundingSphere();
  if (line.material instanceof LineDashedMaterial) line.computeLineDistances();
}

export type StageOpts = {
  aspect: number;            // width / height, match the SVG fallback so nothing jumps
  yaw: number; pitch: number; // degrees
  distance: number;          // camera distance from target, metres
  target?: V3;
  fov?: number;              // narrow by default, so it reads close to the SVG's orthographic view
  pitchRange?: [number, number];
  orbit?: boolean;           // drag to rotate; default true
  onOrbit?: (yaw: number, pitch: number) => void;
};

export type Stage = ReturnType<typeof stage>;

// Builds the canvas inside host. Returns null where WebGL isn't available, so
// the caller keeps its SVG.
export function stage(host: HTMLElement, o: StageOpts) {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    return null;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(2, devicePixelRatio));
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(o.fov ?? 26, o.aspect, 0.01, 50);
  camera.up.set(0, 0, 1);
  const target = new Vector3(...(o.target ?? [0, 0, 0]));

  // Soft sky from above, a warm bounce from the ground, one key light over
  // the viewer's left shoulder. That's the whole lighting rig.
  scene.add(new HemisphereLight(0xffffff, 0xd9d2c3, 2.1));
  const key = new DirectionalLight(0xffffff, 1.5);
  key.position.set(-1.2, -1.6, 2.4);
  scene.add(key);

  const view = { yaw: o.yaw, pitch: o.pitch };
  const [pMin, pMax] = o.pitchRange ?? [4, 80];
  const before: (() => void)[] = [];
  let raf = 0;

  const place = () => {
    const a = (view.yaw * Math.PI) / 180, p = (view.pitch * Math.PI) / 180;
    const r = o.distance * Math.cos(p);
    camera.position.set(target.x - r * Math.sin(a), target.y - r * Math.cos(a), target.z + o.distance * Math.sin(p));
    camera.lookAt(target);
    // keep the key light fixed relative to the viewer, so the model never turns its dark side to you
    key.position.copy(camera.position).add(new Vector3(-0.8, 1.4, 0.4).multiplyScalar(o.distance).applyQuaternion(camera.quaternion));
    key.target.position.copy(target);
    key.target.updateMatrixWorld();
  };
  const draw = () => {
    raf = 0;
    place();
    before.forEach((f) => f());
    renderer.render(scene, camera);
  };
  const invalidate = () => { if (!raf) raf = requestAnimationFrame(draw); };

  const size = () => {
    const w = host.clientWidth;
    if (!w) return;
    renderer.setSize(w, Math.round(w / o.aspect), true);
    camera.aspect = o.aspect;
    camera.updateProjectionMatrix();
    invalidate();
  };
  new ResizeObserver(size).observe(host);

  // Orbit: horizontal drag spins the view. Vertical drag tilts it with a
  // mouse; on touch the vertical axis is left to the page so it still scrolls.
  if (o.orbit !== false) {
    canvas.classList.add('fig-orbit');
    let drag: { x: number; y: number; yaw: number; pitch: number; type: string } | null = null;
    canvas.addEventListener('pointerdown', (e) => {
      drag = { x: e.clientX, y: e.clientY, yaw: view.yaw, pitch: view.pitch, type: e.pointerType };
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const k = 300 / canvas.getBoundingClientRect().width;
      view.yaw = drag.yaw - (e.clientX - drag.x) * 0.6 * k;
      if (drag.type === 'mouse') view.pitch = Math.max(pMin, Math.min(pMax, drag.pitch + (e.clientY - drag.y) * 0.4 * k));
      o.onOrbit?.(view.yaw, view.pitch);
      invalidate();
    });
    const end = () => { drag = null; };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
  }

  // Lost context (a GPU reset, too many tabs): hand back to the SVG.
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    host.closest<HTMLElement>('.fig')?.removeAttribute('data-3d');
  });

  const v = new Vector3(), ndc = new Vector2(), ray = new Raycaster(), ground = new Plane(new Vector3(0, 0, 1), 0);
  return {
    // The point on the horizontal plane at height z under a pointer, for
    // dragging things across the floor. Null when the ray misses (aimed at sky).
    pick(clientX: number, clientY: number, z = 0): V3 | null {
      const r = canvas.getBoundingClientRect();
      ndc.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      ground.constant = -z;
      return ray.ray.intersectPlane(ground, v) ? [v.x, v.y, v.z] : null;
    },
    scene, camera, canvas, view, invalidate,
    // Called just before each render, after the camera moves: position HTML labels here.
    beforeRender(f: () => void) { before.push(f); },
    // A world point as percentages of the canvas box, for absolutely placed labels.
    toScreen(p: V3) {
      v.set(...p).project(camera);
      return { x: ((v.x + 1) / 2) * 100, y: ((1 - v.y) / 2) * 100 };
    },
    show() {
      host.closest<HTMLElement>('.fig')?.setAttribute('data-3d', '');
      size();
    },
  };
}
