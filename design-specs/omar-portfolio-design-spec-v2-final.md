# Omar Mohammed Portfolio Website
## Design Specification — Version 2.0 Final

**Version:** 2.0 Final  
**Last Updated:** February 2026  
**Status:** ITERATIVE UPDATE — Append to Original Spec v1.0

---

## OVERVIEW: What's Changing from v1.0

The original spec produced a functional but bland portfolio. This document transforms it into something with personality, edge, and memorability while maintaining professionalism.

**Core Philosophy Shift:**
- FROM: "Clean professional portfolio that doesn't offend"
- TO: "Confident, playful site that shows technical skill AND personality"

**Key Changes:**
1. Custom MO monogram logo (links to home)
2. Refined navigation layout (logo left, links center, socials right)
3. Custom circle cursor (charcoal, smooth physics, morphs on hover)
4. Interactive particle background (hero section)
5. New hero content ("Building what's next." + morphing text)
6. FAQ-style about section
7. Animated oscilloscope-style section dividers
8. 3D element placeholder in projects (future)

---

## SECTION 1: LOGO — MO CONNECTED MONOGRAM

### 1.1 Concept

The M and O are connected by a horizontal line, like a signal trace on a circuit board flowing from one node to the next. This ties your identity to your engineering discipline without being literal or cheesy.

### 1.2 Visual Description

```
    ╷   ╷
    │\ /│───────○
    │ V │       
    ╵   ╵       
      M ─────── O
```

**Refined description:**
- **M:** Clean, geometric sans-serif M. The right vertical stroke extends slightly rightward as a horizontal connector line.
- **Connector:** Thin horizontal line (same weight as the letter strokes) extending from M toward O.
- **O:** Circle (not oval) positioned at the end of the connector. The line terminates at the O's left edge, or slightly enters it, suggesting a signal entering a node.
- **Optional detail:** Small filled dot at the connection point where line meets O, reinforcing circuit node aesthetic.

### 1.3 Specifications

| Property | Value |
|----------|-------|
| Height | 32-40px in nav, scalable |
| Aspect ratio | Approximately 2.5:1 (wider than tall) |
| Stroke weight | Consistent with a medium-weight sans-serif |
| Color (default) | `--text-primary` (#2C2C2C) — charcoal |
| Color (hover) | `--green-primary` (#2D5A3D) — optional hover shift |
| File format | SVG (inline for color control) |

### 1.4 Logo Usage

- **Primary location:** Top-left of navigation header
- **Function:** Links to homepage from all pages
- **Cursor interaction:** Circle cursor grows slightly on hover
- **Favicon:** Simplified version — just the connected M-O mark, or just the O with a notch suggesting the connection

### 1.5 Sample SVG Structure

```svg
<svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- M letter -->
  <path d="M0 40V0L15 25L30 0V40" stroke="currentColor" stroke-width="4" fill="none"/>
  
  <!-- Connector line -->
  <line x1="30" y1="20" x2="60" y2="20" stroke="currentColor" stroke-width="4"/>
  
  <!-- O circle -->
  <circle cx="80" cy="20" r="18" stroke="currentColor" stroke-width="4" fill="none"/>
  
  <!-- Optional: Connection node dot -->
  <circle cx="62" cy="20" r="3" fill="currentColor"/>
</svg>
```

*(This is a rough guide — refine in Figma/Illustrator for proper proportions)*

---

## SECTION 2: NAVIGATION

### 2.1 Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   [MO]              Projects    About    [Resume]           [in] [gh]   │
│   ↑                 ←────── centered ──────→                    ↑       │
│   logo/home                                                   socials   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Three zones:**
1. **Left:** MO logo (links to homepage)
2. **Center:** Projects, About, Resume button
3. **Right:** LinkedIn icon, GitHub icon

### 2.2 Implementation

```css
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-8);
  max-width: var(--max-width);
  margin: 0 auto;
}

.nav-left {
  flex: 1;
}

.nav-center {
  display: flex;
  gap: var(--space-6);
  align-items: center;
}

.nav-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: var(--space-4);
}
```

### 2.3 Navigation Items

**Logo (Left):**
- MO monogram SVG
- Links to `/` (homepage)
- Height: 32px

**Center Links:**
- Projects → `/projects`
- About → `/about`
- Resume → Downloads PDF (styled as subtle button)

**Social Icons (Right):**
- LinkedIn → `linkedin.com/in/ofmohammed` (opens new tab)
- GitHub → `github.com/ofmohamm` (opens new tab)
- Icon size: 20-24px
- Color: `--text-secondary`, hover: `--green-primary`

### 2.4 Link Styling

```css
.nav-link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--green-primary);
}
```

### 2.5 Resume Button Styling

```css
.nav-resume {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--green-primary);
  background: transparent;
  border: 2px solid var(--green-primary);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  transition: all 0.2s ease;
}

.nav-resume:hover {
  background: var(--green-primary);
  color: white;
}
```

### 2.6 Mobile Navigation

**Breakpoint:** Below 768px

**Behavior:**
- Logo remains top-left
- Center links + Resume collapse into hamburger menu
- Social icons remain visible OR move into hamburger
- Hamburger opens full-screen or slide-out overlay

**Mobile Menu:**
```
┌─────────────────────────┐
│   [MO]           [≡]    │
└─────────────────────────┘

        ↓ opens ↓

┌─────────────────────────┐
│                    [✕]  │
│                         │
│       Projects          │
│       About             │
│       Resume            │
│                         │
│      [in]  [gh]         │
│                         │
└─────────────────────────┘
```

---

## SECTION 3: CUSTOM CURSOR

### 3.1 Concept

Clean geometric circle that follows the mouse with smooth physics. Not a blob — refined and intentional. Morphs in size when interacting with UI elements.

### 3.2 Visual Specifications

**Default State:**
- Shape: Perfect circle
- Size: 20px diameter
- Color: `--text-primary` (#2C2C2C) — charcoal
- Opacity: 0.9
- Border: None (filled circle)

**Hover States:**

| Element | Cursor Change |
|---------|---------------|
| Links / Buttons | Grows to 40px, becomes ring (hollow) |
| Project cards | Grows to 56px, shows "View" text inside |
| Images | Grows to 48px |
| External links | Grows to 40px ring, arrow icon inside |
| Logo | Grows slightly to 28px |

### 3.3 Physics / Motion

- **Follow behavior:** Smooth ease with slight delay (not 1:1 with mouse)
- **Easing:** `cubic-bezier(0.25, 0.1, 0.25, 1)` or spring physics
- **Latency:** ~50-80ms behind actual cursor position
- **No squishing or morphing shape** — just size and fill changes

### 3.4 Implementation

```javascript
// Cursor element
const cursor = document.querySelector('.custom-cursor');
let cursorX = 0;
let cursorY = 0;
let targetX = 0;
let targetY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

// Smooth follow animation
function animateCursor() {
  const ease = 0.15;
  
  cursorX += (targetX - cursorX) * ease;
  cursorY += (targetY - cursorY) * ease;
  
  cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover state changes
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});
```

### 3.5 CSS

```css
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background: var(--text-primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.9;
  transition: width 0.2s ease, height 0.2s ease, background 0.2s ease, opacity 0.2s ease;
}

.custom-cursor.hovering {
  width: 40px;
  height: 40px;
  background: transparent;
  border: 2px solid var(--text-primary);
  margin-left: -10px; /* Adjust for size change */
  margin-top: -10px;
}

.custom-cursor.hovering-card {
  width: 56px;
  height: 56px;
  background: var(--green-primary);
  opacity: 0.9;
}

/* Hide on touch devices */
@media (hover: none) and (pointer: coarse) {
  .custom-cursor {
    display: none;
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .custom-cursor {
    display: none;
  }
}
```

### 3.6 Cursor Text (Optional Enhancement)

For project card hover, cursor can display "View" text:

```css
.custom-cursor.hovering-card::after {
  content: 'View';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## SECTION 4: HERO SECTION

### 4.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Navigation - see Section 2]                                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════    │
│          ░░░░░ INTERACTIVE PARTICLE BACKGROUND ░░░░░                    │
│              (circuit traces / flowing particles)                       │
│  ═══════════════════════════════════════════════════════════════════    │
│                                                                         │
│                                                                         │
│                                                                         │
│                    Building what's next.                                │
│                    ─────────────────────                                │
│                                                                         │
│               [ ENGINEER → ENTREPRENEUR → BUILDER ]                     │
│                          (morphing text)                                │
│                                                                         │
│                                                                         │
│                                                                         │
│                                                                         │
│   Omar Mohammed                                      [ See my work ↓ ]  │
│   Syracuse University                                                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Interactive Particle Background

**KEEP FROM PREVIOUS SPEC — DO NOT CHANGE**

**Summary:**
- Canvas-based particle system
- Particles: small dots in green shades
- Connections: thin lines between nearby particles (circuit trace aesthetic)
- Mouse interaction: particles gently repel/attract to cursor
- Movement: slow, calming drift
- Color palette: `--green-primary`, `--green-light`, faded variations

**Performance:**
- 50-80 particles desktop, 30-40 mobile
- `requestAnimationFrame` for 60fps
- Fallback: subtle static grain texture

### 4.3 Hero Typography

**Main Statement:**
```css
.hero-statement {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-align: center;
}
```

**Content:** `Building what's next.`

### 4.4 Morphing Text

**Words:** `ENGINEER` → `ENTREPRENEUR` → `BUILDER`

**Behavior:**
- 3-second display per word
- Fade out (300ms) → swap text → fade in (300ms)
- Infinite loop
- Centered below main statement

**Styling:**
```css
.morphing-text {
  font-family: var(--font-mono);
  font-size: var(--text-base);
  color: var(--green-primary);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-align: center;
  transition: opacity 0.3s ease;
}
```

**Implementation:**
```javascript
const words = ['ENGINEER', 'ENTREPRENEUR', 'BUILDER'];
let index = 0;
const element = document.querySelector('.morphing-text');

setInterval(() => {
  element.style.opacity = 0;
  
  setTimeout(() => {
    index = (index + 1) % words.length;
    element.textContent = words[index];
    element.style.opacity = 1;
  }, 300);
}, 3000);
```

### 4.5 Identity (De-emphasized)

**Position:** Bottom-left of hero

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

### 4.6 Scroll CTA

**Position:** Bottom-right of hero

**Content:** `See my work` with animated down arrow

**Styling:**
```css
.hero-cta {
  position: absolute;
  bottom: var(--space-8);
  right: var(--space-8);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}

.hero-cta:hover {
  color: var(--green-primary);
}

.hero-cta .arrow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}
```

---

## SECTION 5: SECTION DIVIDERS — OSCILLOSCOPE LINE

### 5.1 Concept

A thin centered horizontal line with a subtle animated pulse traveling through it — like a heartbeat monitor or oscilloscope signal. Subtle enough to not distract, but alive if you notice it.

### 5.2 Visual Description

```
                    ╱╲
───────────────────╱  ╲───────────────────
        ←── pulse travels across ──→
```

**Static fallback:**
```
───────────────────╱╲───────────────────
```

### 5.3 Specifications

| Property | Value |
|----------|-------|
| Width | 120px (centered) |
| Height | 20px (to accommodate pulse) |
| Line thickness | 1.5px |
| Line color | `--border` (#D9D4C7) or `--green-light` at 40% opacity |
| Pulse color | `--green-primary` at 60% opacity |
| Animation duration | 3-4 seconds per cycle |
| Vertical margin | `var(--space-12)` above and below |

### 5.4 SVG Implementation

```svg
<svg class="divider-oscilloscope" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Base line -->
  <path 
    d="M0 10 L45 10 L52 2 L60 18 L68 2 L75 10 L120 10" 
    stroke="var(--border)" 
    stroke-width="1.5" 
    fill="none"
  />
  
  <!-- Animated pulse overlay -->
  <path 
    class="pulse-line"
    d="M0 10 L45 10 L52 2 L60 18 L68 2 L75 10 L120 10" 
    stroke="var(--green-primary)" 
    stroke-width="1.5" 
    fill="none"
    stroke-dasharray="120"
    stroke-dashoffset="120"
  />
</svg>
```

### 5.5 Animation CSS

```css
.divider-oscilloscope {
  display: block;
  width: 120px;
  height: 20px;
  margin: var(--space-12) auto;
}

.pulse-line {
  animation: pulse-travel 3s ease-in-out infinite;
}

@keyframes pulse-travel {
  0% {
    stroke-dashoffset: 240;
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.6;
  }
  90% {
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}

/* Reduced motion: show static version */
@media (prefers-reduced-motion: reduce) {
  .pulse-line {
    animation: none;
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    opacity: 0.4;
  }
}
```

### 5.6 Alternative: Simpler Blip Animation

If the traveling pulse feels like too much, simpler option — the blip just fades/pulses in place:

```css
@keyframes blip-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

.pulse-line {
  animation: blip-pulse 2s ease-in-out infinite;
  stroke-dasharray: none;
}
```

### 5.7 Usage

Place `<Divider />` component between major sections:
- After hero, before projects
- After projects, before about
- After about, before contact/footer

---

## SECTION 6: ABOUT SECTION — FAQ FORMAT

### 6.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   About                                                                 │
│   ═════                                                                 │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  Where are you?                                                 │   │
│   │  Syracuse, NY. Usually in the lab.                              │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  What's your thing?                                             │   │
│   │  I design hardware and build products — from PCB layouts to     │   │
│   │  full IoT systems. Currently researching flood monitoring       │   │
│   │  sensors that survive real-world deployment.                    │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  What are you looking for?                                      │   │
│   │  Summer 2026 internship. Chip design, VLSI, or hardware         │   │
│   │  engineering. Open to anywhere in the US.                       │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  School?                                                        │   │
│   │  Syracuse University, Electrical Engineering, graduating May    │   │
│   │  2027. 3.90 GPA, Honors, full-tuition merit scholarship.        │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  Hot take?                                                      │   │
│   │  Protein black coffee.                                          │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Final Copy

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

### 6.3 Styling

```css
.faq-section {
  max-width: var(--max-width-narrow);
  margin: 0 auto;
  padding: var(--space-16) var(--space-8);
}

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
  transform: translateX(4px);
}

.faq-question {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
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

---

## SECTION 7: PROJECTS SECTION

### 7.1 Keep from v1.0

- Project cards with image, title, tech tags, description
- Grid layout (3 columns → 2 → 1)
- Individual project pages with case study format

### 7.2 Updates

**Card Styling — More Pop:**

```css
.project-card {
  background: var(--bg-card);
  border: 3px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.project-card:hover {
  border-color: var(--green-primary);
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
```

### 7.3 3D Model Placeholder

**Location:** Featured project card (e.g., FPGA CPU)

**For now:** High-quality static image or animated GIF

**Future:** Three.js `GLTFLoader` for interactive 3D PCB/chip model

**Container:**
```css
.project-3d-container {
  aspect-ratio: 16/10;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## SECTION 8: CONTACT / FOOTER

### 8.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   Let's talk.                                                           │
│                                                                         │
│   ofmohamm@syr.edu                                                      │
│                                                                         │
│   [LinkedIn]  [GitHub]                                                  │
│                                                                         │
│   ─────────────────────────────────────────────────────────────────     │
│                                                                         │
│   © 2026 Omar Mohammed                                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Styling

```css
.contact-section {
  text-align: center;
  padding: var(--space-16) var(--space-8);
}

.contact-heading {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.contact-email {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  color: var(--green-primary);
  text-decoration: none;
}

.contact-email:hover {
  text-decoration: underline;
}

.contact-socials {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.contact-socials a {
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.contact-socials a:hover {
  color: var(--green-primary);
}
```

---

## SECTION 9: COLOR PALETTE (Final)

```css
:root {
  /* Backgrounds */
  --bg-primary: #FAF9F6;
  --bg-secondary: #F0EAD6;
  --bg-card: #FFFFFF;
  
  /* Text */
  --text-primary: #2C2C2C;
  --text-secondary: #5C5C5C;
  --text-muted: #8B8B8B;
  
  /* Greens — slightly saturated */
  --green-primary: #2D5A3D;
  --green-hover: #234830;
  --green-light: #4A8C5A;
  --green-bg: #E3EFE6;
  
  /* Borders */
  --border: #D9D4C7;
  --border-hover: var(--green-primary);
  
  /* Shadows */
  --shadow: rgba(44, 44, 44, 0.08);
  --shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.1);
}
```

---

## SECTION 10: IMPLEMENTATION PRIORITY

### Phase 1: Structure & Navigation
1. Create MO logo SVG
2. Implement new nav layout (logo left, links center, socials right)
3. Restructure hero with new content and layout
4. Implement FAQ-style about section

### Phase 2: Cursor & Micro-interactions
5. Implement custom circle cursor
6. Add hover state changes for cursor
7. Add morphing text to hero

### Phase 3: Visual Polish
8. Create oscilloscope divider component
9. Add divider animation
10. Update project card styling (chunkier borders)

### Phase 4: Hero Background & Future
11. Implement/refine interactive particle background
12. Add 3D model when ready

---

## SECTION 11: QUICK REFERENCE — ALL DECISIONS

| Element | Decision |
|---------|----------|
| Logo | MO connected monogram (circuit trace style) |
| Navigation layout | Logo left, Projects/About/Resume center, LinkedIn/GitHub right |
| Nav mobile | Hamburger menu for center items |
| Cursor | Clean charcoal circle, smooth follow, grows on hover |
| Hero statement | "Building what's next." |
| Morphing text | ENGINEER → ENTREPRENEUR → BUILDER |
| Hero background | Interactive particles (keep as-is) |
| Name placement | Small, bottom-left of hero |
| Dividers | Oscilloscope line with traveling pulse animation |
| About format | FAQ Q&A style (5 questions) |
| Project cards | 3px borders, lift + shadow on hover |
| Contact | Footer section only, not in nav |
| Terminology | "Projects" consistently |

---

## APPENDIX: COPY DOCUMENT

### Hero
**Main:** Building what's next.

**Morphing:** ENGINEER → ENTREPRENEUR → BUILDER

**Identity:**
Omar Mohammed
Syracuse University

**CTA:** See my work ↓

### Navigation
- [MO logo] (home)
- Projects
- About
- Resume (button)
- LinkedIn (icon)
- GitHub (icon)

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

*End of Version 2.0 Final Specification*
*Apply on top of original Design Specification v1.0*
