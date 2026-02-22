# Omar Mohammed Portfolio Website
## 3D PCB Viewer Component Specification

**Version:** 1.0  
**Last Updated:** February 2026  
**Status:** Ready to implement

---

## OVERVIEW

Interactive 3D viewer for the Flood Detection Sensor PCB project page. Replaces static hero image with a draggable, auto-rotating 3D model of the PCB.

---

## SECTION 1: COMPONENT CHOICE

### Recommendation: `<model-viewer>`

Google's `<model-viewer>` web component. Zero dependencies, works out of the box, mobile-friendly.

**Why this over Three.js:**
- No JavaScript to write
- Built-in drag, zoom, auto-rotate
- Handles lighting and shadows
- Works on mobile with touch gestures
- Lightweight (~100kb)

---

## SECTION 2: FILE SETUP

### 2.1 GLB File Location

```
/public/models/flood-sensor-pcb.glb
```

### 2.2 File Size Optimization

If GLB is large (>5MB), consider:
- Compress with [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline): `gltf-pipeline -i input.glb -o output.glb --draco.compressionLevel 10`
- Or use [glb-packer.glitch.me](https://glb-packer.glitch.me/)

Target: Under 3MB for fast loading.

---

## SECTION 3: IMPLEMENTATION

### 3.1 Add Script (Once, in `<head>` or layout)

```html
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
```

Or install via npm:
```bash
npm install @google/model-viewer
```

```javascript
import '@google/model-viewer';
```

### 3.2 Component Usage

```html
<model-viewer 
  src="/models/flood-sensor-pcb.glb"
  alt="3D render of Flood Detection Sensor PCB"
  camera-controls
  auto-rotate
  auto-rotate-delay="2000"
  rotation-per-second="20deg"
  shadow-intensity="1"
  shadow-softness="0.5"
  exposure="1"
  camera-orbit="45deg 55deg 2.5m"
  min-camera-orbit="auto auto 1.5m"
  max-camera-orbit="auto auto 5m"
  class="pcb-viewer"
>
  <!-- Loading state -->
  <div class="pcb-viewer-loading" slot="poster">
    Loading 3D model...
  </div>
</model-viewer>
```

### 3.3 Attributes Explained

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `src` | Path to GLB | The 3D model file |
| `alt` | Description | Accessibility |
| `camera-controls` | — | Enable drag to rotate, scroll to zoom |
| `auto-rotate` | — | Slowly spin when not interacting |
| `auto-rotate-delay` | 2000 | Wait 2s after interaction before resuming spin |
| `rotation-per-second` | 20deg | Spin speed |
| `shadow-intensity` | 1 | Shadow darkness (0-1) |
| `shadow-softness` | 0.5 | Shadow blur |
| `exposure` | 1 | Overall brightness |
| `camera-orbit` | 45deg 55deg 2.5m | Initial camera angle (theta, phi, distance) |
| `min-camera-orbit` | auto auto 1.5m | Minimum zoom distance |
| `max-camera-orbit` | auto auto 5m | Maximum zoom distance |

---

## SECTION 4: STYLING

### 4.1 Container Styling

```css
.pcb-viewer {
  width: 100%;
  height: 450px;
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  margin-bottom: var(--space-10);
  --poster-color: transparent;
}

/* Remove default model-viewer border on focus */
.pcb-viewer:focus {
  outline: none;
}

/* Optional: add subtle border */
.pcb-viewer {
  border: 1px solid var(--border);
}
```

### 4.2 Loading State

```css
.pcb-viewer-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}
```

### 4.3 Responsive

```css
@media (max-width: 768px) {
  .pcb-viewer {
    height: 300px;
  }
}
```

---

## SECTION 5: INTERACTION HINT (Optional)

Add a subtle hint so users know they can interact:

```html
<div class="viewer-container">
  <model-viewer ...></model-viewer>
  <p class="viewer-hint">Drag to rotate · Scroll to zoom</p>
</div>
```

```css
.viewer-container {
  position: relative;
}

.viewer-hint {
  text-align: center;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--text-muted);
  margin-top: var(--space-2);
}
```

---

## SECTION 6: FALLBACK FOR NO WEBGL

For browsers without WebGL support (rare):

```html
<model-viewer ...>
  <img 
    slot="poster" 
    src="/images/projects/flood-sensor-pcb-fallback.png" 
    alt="Flood Detection Sensor PCB"
  />
</model-viewer>
```

Use your existing static 3D render as the fallback image.

---

## SECTION 7: FULL HTML IMPLEMENTATION

```html
<!-- In <head> or layout -->
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>

<!-- In project page, replacing hero image -->
<div class="viewer-container">
  <model-viewer 
    src="/models/flood-sensor-pcb.glb"
    alt="3D render of Flood Detection Sensor PCB"
    camera-controls
    auto-rotate
    auto-rotate-delay="2000"
    rotation-per-second="20deg"
    shadow-intensity="1"
    shadow-softness="0.5"
    exposure="1"
    camera-orbit="45deg 55deg 2.5m"
    min-camera-orbit="auto auto 1.5m"
    max-camera-orbit="auto auto 5m"
    class="pcb-viewer"
  >
    <img 
      slot="poster" 
      src="/images/projects/flood-sensor-pcb-fallback.png" 
      alt="Flood Detection Sensor PCB"
    />
  </model-viewer>
  <p class="viewer-hint">Drag to rotate · Scroll to zoom</p>
</div>
```

---

## SECTION 8: ASTRO/REACT COMPONENT (If Applicable)

### Astro Component

```astro
---
// PCBViewer.astro
interface Props {
  src: string;
  alt: string;
  fallback?: string;
}

const { src, alt, fallback } = Astro.props;
---

<div class="viewer-container">
  <model-viewer 
    src={src}
    alt={alt}
    camera-controls
    auto-rotate
    auto-rotate-delay="2000"
    rotation-per-second="20deg"
    shadow-intensity="1"
    shadow-softness="0.5"
    exposure="1"
    camera-orbit="45deg 55deg 2.5m"
    min-camera-orbit="auto auto 1.5m"
    max-camera-orbit="auto auto 5m"
    class="pcb-viewer"
  >
    {fallback && (
      <img slot="poster" src={fallback} alt={alt} />
    )}
  </model-viewer>
  <p class="viewer-hint">Drag to rotate · Scroll to zoom</p>
</div>

<script>
  import '@google/model-viewer';
</script>

<style>
  .viewer-container {
    position: relative;
  }
  
  .pcb-viewer {
    width: 100%;
    height: 450px;
    border-radius: var(--radius-lg);
    background: var(--bg-secondary);
    border: 1px solid var(--border);
  }
  
  .viewer-hint {
    text-align: center;
    font-size: var(--text-xs);
    color: var(--text-muted);
    margin-top: var(--space-2);
  }
  
  @media (max-width: 768px) {
    .pcb-viewer {
      height: 300px;
    }
  }
</style>
```

### Usage

```astro
<PCBViewer 
  src="/models/flood-sensor-pcb.glb"
  alt="3D render of Flood Detection Sensor PCB"
  fallback="/images/projects/flood-sensor-pcb-fallback.png"
/>
```

---

## SECTION 9: IMPLEMENTATION CHECKLIST

- [ ] Add `flood-sensor-pcb.glb` to `/public/models/`
- [ ] Compress GLB if over 3MB
- [ ] Add model-viewer script to site (npm or CDN)
- [ ] Replace static hero image with `<model-viewer>` component
- [ ] Add fallback image for poster/no-WebGL
- [ ] Add interaction hint below viewer
- [ ] Test drag, zoom, auto-rotate
- [ ] Test on mobile (touch gestures)
- [ ] Verify loading state looks good

---

## SECTION 10: CAMERA TUNING

If the default camera angle doesn't look good, adjust `camera-orbit`:

```
camera-orbit="[theta] [phi] [distance]"
```

- **theta:** Horizontal angle (0deg = front, 90deg = side)
- **phi:** Vertical angle (0deg = top-down, 90deg = eye-level)
- **distance:** How far camera is from model

**Examples:**
- Top-down: `camera-orbit="0deg 0deg 3m"`
- Isometric: `camera-orbit="45deg 55deg 2.5m"`
- Side view: `camera-orbit="90deg 75deg 2m"`

Play with values until the PCB looks good on load.

---

*End of 3D PCB Viewer Specification*
