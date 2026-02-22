# Omar Mohammed Portfolio Website
## Design Specification — Version 2.0 Addendum

**Version:** 2.0  
**Last Updated:** February 2026  
**Status:** ITERATIVE UPDATE — Append to Original Spec v1.0

---

## OVERVIEW: What's Changing

The original spec produced a functional but **too safe, too bland** portfolio. This addendum transforms it into something with personality, edge, and memorability while maintaining professionalism.

**Core Philosophy Shift:**
- FROM: "Clean professional portfolio that doesn't offend"
- TO: "Confident, playful site that shows technical skill AND personality"

**Key Additions:**
1. Interactive generative background (hero section)
2. Custom blob cursor (site-wide)
3. Floating pill navigation (replaces traditional header)
4. New hero content strategy (statement-first, name secondary)
5. Morphing text element
6. FAQ-style about section
7. 3D element placeholder in projects
8. Bolder color usage and visual pop

---

## SECTION 1: NAVIGATION OVERHAUL

### 1.1 Remove Traditional Header

**DELETE:** The standard horizontal navigation header from v1.0

**REPLACE WITH:** Floating pill navigation cluster

### 1.2 Floating Pills Navigation

**Position:** Fixed, top-right corner, 24px from edges

**Behavior:**
- Pills float with subtle, slow drift animation (oscillating position)
- Drift is gentle — 2-4px movement over 3-4 second cycles
- Each pill has slightly offset timing (not synchronized)
- On hover: pill stops drifting, expands to reveal full text
- On scroll: pills remain fixed but may slightly reduce opacity (0.9) to not compete with content

**Visual Design:**
```
Default State:
┌───┐  ┌───┐  ┌───┐  ┌───┐
│ W │  │ A │  │ C │  │ R │
└───┘  └───┘  └───┘  └───┘

Hover State (example: Work):
┌──────────┐  ┌───┐  ┌───┐  ┌───┐
│  Work →  │  │ A │  │ C │  │ R │
└──────────┘  └───┘  └───┘  └───┘
```

**Pills:**
- W → Work (links to /projects)
- A → About (links to /about)
- C → Contact (scrolls to contact or mailto)
- R → Resume (downloads PDF)

**Styling:**
```css
.nav-pill {
  background: var(--bg-card);
  border: 2px solid var(--green-primary);
  border-radius: var(--radius-full);
  padding: 12px 16px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  color: var(--green-primary);
  cursor: pointer;
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-pill:hover {
  background: var(--green-primary);
  color: var(--bg-primary);
  padding: 12px 24px;
}
```

**Animation (drift):**
```css
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(2px, -3px); }
  50% { transform: translate(-1px, 2px); }
  75% { transform: translate(3px, 1px); }
}

.nav-pill:nth-child(1) { animation: float 4s ease-in-out infinite; }
.nav-pill:nth-child(2) { animation: float 4.5s ease-in-out infinite 0.5s; }
.nav-pill:nth-child(3) { animation: float 3.8s ease-in-out infinite 1s; }
.nav-pill:nth-child(4) { animation: float 4.2s ease-in-out infinite 1.5s; }
```

**Mobile Behavior:**
- Pills stack vertically along right edge
- Or: collapse into single hamburger pill that expands to show all options
- Maintain the playful drift animation

---

## SECTION 2: CUSTOM BLOB CURSOR

### 2.1 Cursor Concept

Replace default cursor with a soft, organic blob that:
- Has squishy, fluid movement (follows mouse with elastic easing)
- Morphs shape slightly as it moves (squishes in direction of movement)
- Grows when hovering interactive elements
- Changes color/opacity based on background for visibility

### 2.2 Implementation Specs

**Default State:**
- Shape: Soft circle/blob, slightly irregular edges
- Size: 24px diameter
- Color: var(--green-primary) at 80% opacity
- Follows cursor with spring physics (slight delay, overshoot)

**Hover States:**
- Links/Buttons: Grows to 48px, becomes hollow ring
- Project cards: Grows to 64px, shows "View" text inside
- Images: Grows to 56px, shows expand icon or "Zoom"
- External links: Shows arrow-out icon

**Movement Physics:**
```javascript
// Pseudo-code for blob behavior
const blob = {
  x: 0,
  y: 0,
  targetX: mouseX,
  targetY: mouseY,
  scale: 1,
  
  update() {
    // Spring physics for position
    this.x += (this.targetX - this.x) * 0.15;
    this.y += (this.targetY - this.y) * 0.15;
    
    // Squish based on velocity
    const velocityX = this.targetX - this.x;
    const velocityY = this.targetY - this.y;
    const skewX = velocityX * 0.3;
    const skewY = velocityY * 0.3;
    
    // Apply transform
    blob.element.style.transform = `
      translate(${this.x}px, ${this.y}px)
      scale(${this.scale})
      skew(${skewX}deg, ${skewY}deg)
    `;
  }
}
```

**Styling:**
```css
.blob-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  background: var(--green-primary);
  opacity: 0.8;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference; /* Optional: creates inversion effect */
  transition: width 0.3s, height 0.3s, opacity 0.3s;
}

.blob-cursor.hovering-link {
  width: 48px;
  height: 48px;
  background: transparent;
  border: 2px solid var(--green-primary);
}

.blob-cursor.hovering-card {
  width: 64px;
  height: 64px;
}
```

**Accessibility:**
- Hide blob cursor and show default cursor when `prefers-reduced-motion: reduce`
- Ensure blob doesn't obstruct clickable areas (pointer-events: none)
- Test with screen readers (cursor should be purely decorative)

**Library Recommendation:** 
- Build custom with GSAP for smooth spring physics
- Or use: `kinet.js` for simple kinetic cursor effects

**Mobile:**
- Blob cursor is HIDDEN on touch devices
- Touch interactions use native behavior

---

## SECTION 3: HERO SECTION OVERHAUL

### 3.1 Remove Old Hero

**DELETE:** The v1.0 hero with large name + title + description

### 3.2 New Hero Structure

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Floating nav pills →→→→→→→→→→→→→→→→→]    W  A  C  R      │
│                                                             │
│                                                             │
│         ════════════════════════════════════                │
│              ░░░ INTERACTIVE BACKGROUND ░░░                 │
│           (circuit traces / flowing particles)              │
│         ════════════════════════════════════                │
│                                                             │
│                                                             │
│                                                             │
│              Building what's next.                          │
│              ─────────────────────                          │
│                                                             │
│              [ ENGINEER → ENTREPRENEUR → BUILDER ]          │
│                        (morphing text)                      │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│   Omar Mohammed                            [ See my work ↓] │
│   Syracuse University                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Interactive Background

**Concept:** Generative particle system with circuit-trace aesthetic

**Visual Description:**
- Cream/off-white base (var(--bg-primary))
- Particles: small dots in var(--green-primary) and var(--green-light)
- Connections: thin lines form between nearby particles (like circuit traces)
- Mouse interaction: particles gently repel or attract to cursor position
- Movement: slow, drifting motion — calming, not chaotic

**Technical Approach:**
```javascript
// Use Canvas or WebGL (via Three.js or p5.js)
// Particle system parameters:
const config = {
  particleCount: 50-80,        // Keep low for performance
  particleSize: 2-4px,
  connectionDistance: 150px,   // Draw line if particles within this range
  connectionOpacity: 0.15,     // Very subtle lines
  mouseInfluenceRadius: 200px, // How far mouse affects particles
  mouseForce: 0.02,            // Gentle push/pull
  baseSpeed: 0.3,              // Slow drift
  colors: ['#355E3B', '#4A7C52', '#6B9B74'] // Green palette
};
```

**Performance Considerations:**
- Use `requestAnimationFrame` for smooth 60fps
- Limit particle count on mobile (30-40 max)
- Add FPS detection — reduce complexity if dropping below 30fps
- Offer subtle fallback: static subtle gradient or grain texture

**Fallback (prefers-reduced-motion):**
- Static background with subtle grain texture
- Or: very slow, minimal particle drift without mouse interaction

### 3.4 Hero Typography

**Main Statement:**
```css
.hero-statement {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 8vw, 5rem); /* Responsive sizing */
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```

**Content:** "Building what's next."

**Morphing Text Below:**
```
ENGINEER ←→ ENTREPRENEUR ←→ BUILDER
```

**Morphing Behavior:**
- Text fades out, new text fades in (or scramble/decode effect)
- 3-second display per word
- Infinite loop
- Subtle — not distracting from main statement

**Implementation (simple fade):**
```javascript
const words = ['ENGINEER', 'ENTREPRENEUR', 'BUILDER'];
let currentIndex = 0;

setInterval(() => {
  // Fade out
  element.style.opacity = 0;
  
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % words.length;
    element.textContent = words[currentIndex];
    element.style.opacity = 1;
  }, 500);
}, 3000);
```

**Styling:**
```css
.morphing-text {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  color: var(--green-primary);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: opacity 0.5s ease;
}
```

### 3.5 De-Emphasized Identity

**Position:** Bottom-left of hero section

**Content:**
```
Omar Mohammed
Syracuse University
```

**Styling:**
```css
.hero-identity {
  position: absolute;
  bottom: var(--space-8);
  left: var(--space-8);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}
```

### 3.6 Scroll CTA

**Position:** Bottom-right of hero section

**Content:** "See my work" with down arrow

**Behavior:** 
- Subtle bounce animation on the arrow
- Smooth scrolls to projects section on click

---

## SECTION 4: ABOUT SECTION OVERHAUL

### 4.1 Remove Old About Format

**DELETE:** The paragraph-based bio from v1.0

### 4.2 FAQ-Style About

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   About                                                     │
│   ═════                                                     │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  Where are you?                                     │   │
│   │  ───────────────                                    │   │
│   │  Syracuse, NY. Usually in the lab.                  │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  What's your thing?                                 │   │
│   │  ──────────────────                                 │   │
│   │  I design hardware and build products — from PCB    │   │
│   │  layouts to full IoT systems. Currently researching │   │
│   │  flood monitoring sensors that survive real-world   │   │
│   │  deployment.                                        │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  What are you looking for?                          │   │
│   │  ──────────────────────────                         │   │
│   │  Summer 2026 internship. Chip design, VLSI, or      │   │
│   │  hardware engineering. Open to anywhere in the US.  │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  School?                                            │   │
│   │  ───────                                            │   │
│   │  Syracuse University, Electrical Engineering,       │   │
│   │  graduating May 2027. 3.90 GPA, Honors, full-       │   │
│   │  tuition merit scholarship.                         │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  Hot take?                                          │   │
│   │  ─────────                                          │   │
│   │  Protein black coffee.                              │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│                                                             │
│   [Download Resume ↓]                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 FAQ Content (Final Copy)

**Q: Where are you?**
A: Syracuse, NY. Usually in the lab.

**Q: What's your thing?**
A: I design hardware and build products — from PCB layouts to full IoT systems. Currently researching flood monitoring sensors that survive real-world deployment.

**Q: What are you looking for?**
A: Summer 2026 internship. Chip design, VLSI, or hardware engineering. Open to anywhere in the US.

**Q: School?**
A: Syracuse University, Electrical Engineering, graduating May 2027. 3.90 GPA, Honors, full-tuition merit scholarship.

**Q: Hot take?**
A: Protein black coffee.

### 4.4 FAQ Styling

```css
.faq-item {
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  margin-bottom: var(--space-4);
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.faq-item:hover {
  border-color: var(--green-primary);
  transform: translateX(4px); /* Subtle shift on hover */
}

.faq-question {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.faq-answer {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
}
```

### 4.5 Optional: Expand/Collapse Interaction

For extra interactivity, questions could start collapsed (answer hidden) and expand on click:
- Question visible with "+" icon
- Click to expand answer with smooth height animation
- "Hot take?" is a fun discovery moment when expanded

This is OPTIONAL — flat display (all visible) also works well.

---

## SECTION 5: PROJECTS SECTION UPDATES

### 5.1 3D Element Placeholder

**Location:** Featured project card (first/largest in grid)

**Concept:** Reserve space for an interactive 3D model of a PCB, chip, or the FPGA CPU design

**Placeholder Implementation:**
```
┌─────────────────────────────────────────┐
│                                         │
│   ┌─────────────────────────────────┐   │
│   │                                 │   │
│   │      [ 3D MODEL PLACEHOLDER ]   │   │
│   │                                 │   │
│   │    "Interactive model coming    │   │
│   │           soon"                 │   │
│   │                                 │   │
│   │      [ Static image for now ]   │   │
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
│   4-Bit FPGA CPU                        │
│   VHDL • RTL Design • Custom ISA        │
│                                         │
└─────────────────────────────────────────┘
```

**For Now:** Use a high-quality static image or animated GIF of the PCB/design

**Future Implementation Notes:**
- Use Three.js with `GLTFLoader` for 3D model
- Model format: `.glb` or `.gltf` (export from KiCad, Fusion 360, or Blender)
- Interaction: drag to rotate, scroll to zoom
- Fallback: static image on mobile or low-performance devices

**Container Styling:**
```css
.project-3d-container {
  aspect-ratio: 16/10;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
```

### 5.2 Project Card Enhancements

**Add more visual pop to cards:**

- Thicker borders (3px instead of 1px)
- On hover: border color shifts to green, slight rotation (1-2deg), stronger shadow
- Blob cursor interaction: cursor grows and shows "View" text

```css
.project-card {
  border: 3px solid var(--border);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.project-card:hover {
  border-color: var(--green-primary);
  transform: translateY(-8px) rotate(1deg);
  box-shadow: var(--shadow-xl);
}
```

---

## SECTION 6: COLOR & VISUAL POP ADJUSTMENTS

### 6.1 Updated Color Palette

Keep the base palette but add more saturation and a warm accent:

```css
:root {
  /* Backgrounds — unchanged */
  --bg-primary: #FAF9F6;
  --bg-secondary: #F0EAD6;
  --bg-card: #FFFFFF;
  
  /* Text — unchanged */
  --text-primary: #2C2C2C;
  --text-secondary: #5C5C5C;
  
  /* Greens — SLIGHTLY MORE SATURATED */
  --green-primary: #2D5A3D;    /* Richer, deeper */
  --green-hover: #234830;      /* Darker hover */
  --green-light: #4A8C5A;      /* Brighter accent */
  --green-bg: #E3EFE6;         /* Subtle backgrounds */
  
  /* NEW: Warm Accent (use sparingly) */
  --accent-warm: #E07A5F;      /* Terracotta/coral */
  --accent-warm-light: #F4D6CC; /* Light version for backgrounds */
  
  /* Borders — slightly more visible */
  --border: #D9D4C7;
  --border-hover: var(--green-primary);
}
```

### 6.2 Where to Use Warm Accent

Use `--accent-warm` sparingly for maximum impact:

- Morphing text in hero (ENGINEER / ENTREPRENEUR / BUILDER)
- Hover state on the "Hot take?" FAQ item
- One project tag per card (the primary technology)
- Error states
- Optional: dot in the blob cursor

**DO NOT** use for: primary buttons, links, or large areas. Green remains dominant.

### 6.3 Visual Pop Techniques

**Chunky Borders:**
- Cards: 3px borders
- FAQ items: 2px borders
- Input fields: 2px borders
- Creates tactile, substantial feel

**Layered Shadows:**
```css
--shadow-pop: 
  0 4px 6px rgba(0,0,0,0.05),
  0 10px 20px rgba(0,0,0,0.08),
  8px 8px 0 var(--green-bg); /* Offset colored shadow */
```

**Subtle Rotation on Hover:**
Elements rotate 1-2 degrees on hover. Creates energy without being chaotic.

**Background Grain Texture:**
Add subtle noise/grain overlay to the cream background:
```css
.bg-grain {
  background-image: url('/noise.png');
  background-size: 200px;
  opacity: 0.03;
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 1000;
}
```

---

## SECTION 7: CONTACT SECTION UPDATE

### 7.1 Simplified Contact

Remove duplicate email display. Single, clear contact section:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Let's talk.                                               │
│   ───────────                                               │
│                                                             │
│   [ofmohamm@syr.edu]  ←── Large, clickable mailto link      │
│                                                             │
│   [LinkedIn]  [GitHub]  ←── Icon links                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Styling:**
- Email as large text (text-2xl or text-3xl)
- On hover: blob cursor grows, email underlines
- Social icons: simple, minimal, with hover color change

---

## SECTION 8: IMPLEMENTATION PRIORITY

### Phase 1: Core Structure (Do First)
1. Remove old header, implement floating pill navigation
2. Restructure hero with new layout and content
3. Implement FAQ-style about section
4. Update color variables

### Phase 2: Cursor & Interactions
5. Implement blob cursor (start simple, refine physics)
6. Add hover states for cursor on different elements
7. Add morphing text to hero

### Phase 3: Background & Polish
8. Implement interactive particle background (start with simple version)
9. Add visual pop (thicker borders, shadows, rotations)
10. Add grain texture overlay

### Phase 4: Future Enhancement
11. 3D model integration (when ready)
12. Refine particle system complexity
13. Add any easter eggs

---

## SECTION 9: TECHNICAL ADDITIONS

### 9.1 New Dependencies

Add to package.json:
```json
{
  "dependencies": {
    "gsap": "^3.x",           // For blob cursor physics
    "@studio-freight/lenis": "^1.x"  // Keep for smooth scroll
  }
}
```

**Optional for particle background:**
```json
{
  "dependencies": {
    "three": "^0.160.x"       // If using Three.js for particles
  }
}
```

Or use vanilla Canvas API for simpler implementation.

### 9.2 New Components to Create

```
src/components/
├── BlobCursor.tsx          // Client component (React)
├── FloatingNav.astro       // Navigation pills
├── FloatingNav.tsx         // Client version for animations
├── InteractiveBackground.tsx  // Particle system
├── MorphingText.tsx        // Word rotation animation
├── FAQItem.astro           // Single FAQ question/answer
└── FAQSection.astro        // Full FAQ about section
```

### 9.3 Mobile Considerations

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Blob cursor | Full implementation | Hidden |
| Floating nav | Drifting pills | Static or hamburger |
| Particle background | Full particles | Reduced count or static |
| Morphing text | Animated | Animated (keep) |
| Card hover rotations | Enabled | Disabled (no hover on touch) |

---

## SECTION 10: QUICK REFERENCE — WHAT CHANGED

| Element | v1.0 | v2.0 |
|---------|------|------|
| Navigation | Standard header bar | Floating drifting pills |
| Cursor | Default browser cursor | Custom blob with physics |
| Hero content | "Omar Mohammed" large | "Building what's next." statement |
| Hero background | Static cream | Interactive particles |
| Name placement | Hero headline | Small, bottom-left |
| About format | Paragraphs | FAQ Q&A style |
| Project cards | Subtle hover | Chunky borders, rotation |
| Color saturation | Muted | Richer greens + warm accent |
| Overall vibe | Safe, professional | Confident, playful, memorable |

---

## APPENDIX: COPY DOCUMENT

### Hero
**Main:** Building what's next.

**Morphing:** ENGINEER → ENTREPRENEUR → BUILDER

**Identity:**
Omar Mohammed
Syracuse University

**CTA:** See my work ↓

### About FAQ

**Q: Where are you?**
Syracuse, NY. Usually in the lab.

**Q: What's your thing?**
I design hardware and build products — from PCB layouts to full IoT systems. Currently researching flood monitoring sensors that survive real-world deployment.

**Q: What are you looking for?**
Summer 2026 internship. Chip design, VLSI, or hardware engineering. Open to anywhere in the US.

**Q: School?**
Syracuse University, Electrical Engineering, graduating May 2027. 3.90 GPA, Honors, full-tuition merit scholarship.

**Q: Hot take?**
Protein black coffee.

### Contact
Let's talk.
ofmohamm@syr.edu

---

*End of Version 2.0 Addendum*
*Apply on top of original Design Specification v1.0*
