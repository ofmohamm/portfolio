# Omar Mohammed Portfolio Website
## Design Specification — Version 3.7

**Version:** 3.7  
**Last Updated:** February 2026  
**Status:** UPDATE — New Projects, Hero Refinement, Particle Motion

---

## OVERVIEW

This update covers:

1. **Logo change** — Replace "MO" monogram with "Omar Mohammed" in Playfair Display Italic, green underline hover
2. **Hero update** — Remove name from hero (now in logo), keep tagline + role only
3. **Particle motion** — Add ambient drift by default, mouse triggers interactive scatter
4. **Two new projects** — 4-Bit CPU Architecture, Bluetooth Messaging System
5. **Project hero sizing** — Images capped at 60vh so content peeks above fold
6. **About Preview fix** — Remove whitespace, Projects follows immediately

---

## SECTION 1: LOGO UPDATE

### 1.1 Change

| Element | Old | New |
|---------|-----|-----|
| Logo | MO monogram | "Omar Mohammed" (full name) |

### 1.2 Logo File

| Property | Value |
|----------|-------|
| Format | SVG (preferred) or PNG with transparent background |
| Font | Playfair Display Italic |
| Color | Charcoal (`--text-primary`, ~#1a1a1a) |
| Location | `/public/images/logo.svg` |

### 1.3 HTML

```html
<a href="/" class="nav-logo">
  <img src="/images/logo.svg" alt="Omar Mohammed" />
</a>
```

### 1.4 CSS

```css
.nav-logo {
  position: relative;
  display: inline-block;
  text-decoration: none;
}

.nav-logo img {
  height: 32px;  /* Adjust based on final logo */
  width: auto;
}

/* Subtle green underline on hover */
.nav-logo::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--green-primary);
  transition: width 0.3s ease;
}

.nav-logo:hover::after {
  width: 100%;
}
```

### 1.5 Hover Behavior

Subtle green underline slides in from left. Text stays charcoal. Avoids aggressive color flash on longer text logo.

---

## SECTION 2: HERO UPDATE

### 2.1 Content Changes

**Removed:** Omar Mohammed (now in logo)

**New hierarchy:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   [Omar Mohammed]                              About  Projects  Resume      │
│       (logo)                                                                │
│                                                                             │
│                    ·  ·      ·   ·          ·                               │
│               ·         ·         ·    ·          ·                         │
│                                                                             │
│                                                                             │
│                     Building what's next.      ← Serif, 80px                │
│                                                                             │
│                          ENGINEER              ← Mono, green, morphing      │
│                                                                             │
│                                                                             │
│              ·               ·          ·                                   │
│         ·          ·    ·         ·           ·                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Updated HTML

```html
<section id="hero" class="snap-section hero-section">
  <canvas id="particle-canvas" class="particle-canvas"></canvas>
  
  <div class="hero-content">
    <h1 class="hero-tagline">Building what's next.</h1>
    
    <div class="hero-role">
      <span class="morphing-text">ENGINEER</span>
    </div>
  </div>
</section>
```

### 2.3 Updated CSS

```css
.hero-tagline {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: clamp(2.5rem, 8vw, 5rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0;
}

.hero-role {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--green-primary);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 1.5rem;
}
```

### 2.4 Spacing

| Gap | Value |
|-----|-------|
| Tagline → Role | 24px |

---

## SECTION 3: PARTICLE AMBIENT MOTION

### 3.1 Behavior Update

**Current:** Particles are static until mouse interaction  
**New:** Particles drift slowly by default, mouse triggers dramatic scatter

| State | Behavior |
|-------|----------|
| Idle (no mouse) | Slow ambient drift, random directions, gentle floating |
| Mouse nearby | Strong repel + connections (existing v3.5 behavior) |
| Mouse leaves | Particles slowly return to drifting state |

### 3.2 Updated Particle Class

```javascript
class ParticleField {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, active: false };
    
    // Interaction settings
    this.repelRadius = 150;
    this.repelStrength = 0.8;
    this.connectDistance = 120;
    
    // Ambient motion settings
    this.ambientSpeed = 0.3;        // Base drift speed
    this.ambientChangeRate = 0.02;  // How often direction changes
    
    this.init();
    this.animate();
    this.bindEvents();
  }
  
  init() {
    this.resize();
    
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    const count = Math.min(Math.max(particleCount, 60), 120);
    
    for (let i = 0; i < count; i++) {
      // Random starting angle for ambient drift
      const angle = Math.random() * Math.PI * 2;
      
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 2,
        opacity: Math.random() * 0.3 + 0.4,
        
        // Velocity
        vx: 0,
        vy: 0,
        
        // Ambient drift direction
        driftAngle: angle,
        driftSpeed: this.ambientSpeed * (0.5 + Math.random() * 0.5),
      });
    }
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    });
    
    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((p, i) => {
      // Ambient drift (always active)
      if (Math.random() < this.ambientChangeRate) {
        // Occasionally shift drift direction slightly
        p.driftAngle += (Math.random() - 0.5) * 0.5;
      }
      
      const driftVx = Math.cos(p.driftAngle) * p.driftSpeed;
      const driftVy = Math.sin(p.driftAngle) * p.driftSpeed;
      
      // Apply ambient drift
      p.vx += driftVx * 0.1;
      p.vy += driftVy * 0.1;
      
      // Mouse repel (when mouse is active)
      if (this.mouse.active && this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.repelRadius) {
          const force = (this.repelRadius - dist) / this.repelRadius;
          const angle = Math.atan2(dy, dx);
          
          p.vx += Math.cos(angle) * force * this.repelStrength;
          p.vy += Math.sin(angle) * force * this.repelStrength;
        }
      }
      
      // Apply velocity with damping
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;
      
      // Wrap around edges (seamless looping)
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(107, 107, 107, ${p.opacity})`;
      this.ctx.fill();
      
      // Draw connections
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.connectDistance) {
          const opacity = (1 - dist / this.connectDistance) * 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(107, 107, 107, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
}
```

### 3.3 Key Differences from v3.5

| Feature | v3.5 | v3.7 |
|---------|------|------|
| Idle state | Static | Ambient drift |
| Edge behavior | Spring return to origin | Wrap around (seamless) |
| Direction | Fixed origin point | Random wandering |
| Feel | Reactive only | Living, breathing |

---

## SECTION 4: PROJECT — 4-Bit CPU Architecture

### 4.1 Header

**Title:** `4-Bit CPU Architecture`

**Subtitle:** `Syracuse University · Spring 2025`

**Tags:** VHDL, FPGA, Digital Design

### 4.2 Hero Image

**TO BE ADDED MANUALLY**

Suggested: Waveform simulation, block diagram, or FPGA board photo

**Sizing:** Smaller than full viewport so Overview text peeks above fold. See Section 5.7 for CSS.

### 4.3 Overview

```
Designed a 4-bit CPU from scratch on an FPGA. Custom instruction set supporting arithmetic, logic, and conditional operations. Built the full datapath in VHDL: ALU, registers, program counter, and a finite state machine to orchestrate it all.

Validated the design through simulation first, then ran test programs on actual hardware. Watching your own CPU execute instructions you wrote is a different kind of satisfying.
```

### 4.4 Tools

- Intel Quartus
- VHDL

### 4.5 Tech Specs

| Key | Value |
|-----|-------|
| Platform | Analog Discovery 2 FPGA |
| Language | VHDL |
| Architecture | 4-bit datapath, custom ISA |
| Components | ALU, register file, program counter, control FSM |
| Operations | Arithmetic, logic, conditional branching |
| Validation | Simulation + hardware testing |

### 4.6 HTML

```html
<article class="project-page">
  <header class="project-header">
    <h1 class="project-title">4-Bit CPU Architecture</h1>
    <p class="project-subtitle">Syracuse University · Spring 2025</p>
    <div class="project-tags">
      <span class="project-tag">VHDL</span>
      <span class="project-tag">FPGA</span>
      <span class="project-tag">Digital Design</span>
    </div>
  </header>
  
  <div class="project-hero">
    <!-- TO BE ADDED MANUALLY -->
    <img src="/images/projects/cpu-hero.png" alt="4-Bit CPU" class="project-hero-image" />
  </div>
  
  <section class="project-overview-section">
    <h2 class="project-section-heading">Overview</h2>
    <div class="project-overview">
      <p>Designed a 4-bit CPU from scratch on an FPGA. Custom instruction set supporting arithmetic, logic, and conditional operations. Built the full datapath in VHDL: ALU, registers, program counter, and a finite state machine to orchestrate it all.</p>
      <p>Validated the design through simulation first, then ran test programs on actual hardware. Watching your own CPU execute instructions you wrote is a different kind of satisfying.</p>
    </div>
  </section>
  
  <section class="project-tools">
    <h2 class="project-section-heading">Tools</h2>
    <div class="tools-list">
      <span class="tool-pill">Intel Quartus</span>
      <span class="tool-pill">VHDL</span>
    </div>
  </section>
  
  <section class="project-specs">
    <h2 class="project-section-heading">Tech Specs</h2>
    <table class="specs-table">
      <tr>
        <td class="specs-key">Platform</td>
        <td class="specs-value">Analog Discovery 2 FPGA</td>
      </tr>
      <tr>
        <td class="specs-key">Language</td>
        <td class="specs-value">VHDL</td>
      </tr>
      <tr>
        <td class="specs-key">Architecture</td>
        <td class="specs-value">4-bit datapath, custom ISA</td>
      </tr>
      <tr>
        <td class="specs-key">Components</td>
        <td class="specs-value">ALU, register file, program counter, control FSM</td>
      </tr>
      <tr>
        <td class="specs-key">Operations</td>
        <td class="specs-value">Arithmetic, logic, conditional branching</td>
      </tr>
      <tr>
        <td class="specs-key">Validation</td>
        <td class="specs-value">Simulation + hardware testing</td>
      </tr>
    </table>
  </section>
</article>
```

---

## SECTION 5: PROJECT — Bluetooth Messaging System

### 5.1 Header

**Title:** `Bluetooth Messaging System`

**Subtitle:** `Syracuse University · Fall 2025`

**Tags:** Embedded C, Arduino, Bluetooth

### 5.2 Hero Image

**TO BE ADDED MANUALLY**

Suggested: Photo of Arduino + LCD displaying a message, or phone pairing screenshot

**Sizing:** Smaller than full viewport so Overview text peeks above fold. See Section 5.7 for CSS.

### 5.3 Overview

```
Built a wireless messaging device using an Arduino and HC-05 Bluetooth module. Pairs with a smartphone for two-way texting. Implemented multi-tap text entry on a keypad, old-school phone style, with messages displaying on a 16x2 LCD.

Simple idea, surprisingly tricky execution. Debouncing the keypad, timing the multi-tap windows, and keeping the Bluetooth connection stable all at once. Good intro to real-time constraints.
```

### 5.4 Tools

- Arduino IDE
- C

### 5.5 Tech Specs

| Key | Value |
|-----|-------|
| MCU | Arduino (ATmega328P) |
| Wireless | HC-05 Bluetooth module |
| Interface | 4x4 keypad input, 16x2 LCD output |
| Text Entry | Multi-tap based on key-press duration |
| Communication | Two-way with smartphone |

### 5.6 HTML

```html
<article class="project-page">
  <header class="project-header">
    <h1 class="project-title">Bluetooth Messaging System</h1>
    <p class="project-subtitle">Syracuse University · Fall 2025</p>
    <div class="project-tags">
      <span class="project-tag">Embedded C</span>
      <span class="project-tag">Arduino</span>
      <span class="project-tag">Bluetooth</span>
    </div>
  </header>
  
  <div class="project-hero">
    <!-- TO BE ADDED MANUALLY -->
    <img src="/images/projects/bluetooth-hero.png" alt="Bluetooth Messaging System" class="project-hero-image" />
  </div>
  
  <section class="project-overview-section">
    <h2 class="project-section-heading">Overview</h2>
    <div class="project-overview">
      <p>Built a wireless messaging device using an Arduino and HC-05 Bluetooth module. Pairs with a smartphone for two-way texting. Implemented multi-tap text entry on a keypad, old-school phone style, with messages displaying on a 16x2 LCD.</p>
      <p>Simple idea, surprisingly tricky execution. Debouncing the keypad, timing the multi-tap windows, and keeping the Bluetooth connection stable all at once. Good intro to real-time constraints.</p>
    </div>
  </section>
  
  <section class="project-tools">
    <h2 class="project-section-heading">Tools</h2>
    <div class="tools-list">
      <span class="tool-pill">Arduino IDE</span>
      <span class="tool-pill">C</span>
    </div>
  </section>
  
  <section class="project-specs">
    <h2 class="project-section-heading">Tech Specs</h2>
    <table class="specs-table">
      <tr>
        <td class="specs-key">MCU</td>
        <td class="specs-value">Arduino (ATmega328P)</td>
      </tr>
      <tr>
        <td class="specs-key">Wireless</td>
        <td class="specs-value">HC-05 Bluetooth module</td>
      </tr>
      <tr>
        <td class="specs-key">Interface</td>
        <td class="specs-value">4x4 keypad input, 16x2 LCD output</td>
      </tr>
      <tr>
        <td class="specs-key">Text Entry</td>
        <td class="specs-value">Multi-tap based on key-press duration</td>
      </tr>
      <tr>
        <td class="specs-key">Communication</td>
        <td class="specs-value">Two-way with smartphone</td>
      </tr>
    </table>
  </section>
</article>
```

### 5.7 Project Hero Image Sizing (All Projects)

Hero images should be smaller so content peeks above fold, encouraging scroll.

```css
.project-hero {
  max-height: 60vh;  /* Caps at 60% viewport height */
  overflow: hidden;
  border-radius: 8px;
  margin: var(--space-8) 0;
}

.project-hero-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
}

/* Mobile: slightly taller ratio */
@media (max-width: 640px) {
  .project-hero {
    max-height: 50vh;
  }
}
```

**Result:** On a typical screen, the Overview heading and first line of text will peek above the fold, inviting users to scroll.

---

## SECTION 6: ABOUT PREVIEW WHITESPACE FIX

### 6.1 Problem

About Preview section has massive whitespace below the content. Likely caused by `min-height: 100vh` or excessive padding.

### 6.2 Solution

Remove forced height. Let content dictate section height. Projects section should follow immediately after.

### 6.3 CSS Changes

```css
/* BEFORE (problematic) */
.about-preview {
  min-height: 100vh;  /* Forces full viewport even with little content */
  padding: var(--space-24) 0;
}

/* AFTER (fixed) */
.about-preview {
  min-height: auto;  /* Let content dictate height */
  padding: var(--space-16) 0;  /* ~64px top and bottom */
}
```

### 6.4 Alternative If Using Flexbox

```css
/* If the section uses flex centering */
.about-preview {
  display: flex;
  align-items: flex-start;  /* Changed from center */
  min-height: auto;         /* Remove forced height */
  padding: var(--space-16) 0;
}
```

### 6.5 Spacing Between Sections

| Gap | Value |
|-----|-------|
| About Preview → Projects | 64px (var(--space-16)) |

The Projects section should begin immediately after the About Preview content, with standard section spacing.

---

## SECTION 7: IMPLEMENTATION CHECKLIST

### Logo
- [x] Create logo in Canva ("Omar Mohammed" in Playfair Display Italic)
- [x] Export as SVG or PNG
- [ ] Place in `/public/images/logo.svg`
- [ ] Replace current MO monogram in navigation
- [ ] Add green underline hover effect
- [ ] Adjust sizing as needed

### Hero
- [ ] Remove name from hero section
- [ ] Adjust spacing (tagline → role: 24px)
- [ ] Test that logo + hero tagline don't feel redundant

### Particles
- [ ] Add ambient drift to idle state
- [ ] Keep mouse repel + connect behavior
- [ ] Change edge behavior from spring-return to wrap-around
- [ ] Add drift direction variance over time
- [ ] Test performance

### Projects
- [ ] Create 4-Bit CPU page with content above
- [ ] Create Bluetooth Messaging page with content above
- [ ] Add both to projects grid on homepage
- [ ] Add hero images manually when ready
- [ ] Set hero image max-height to 60vh (content peeks above fold)

### About Preview
- [ ] Remove min-height: 100vh (or similar)
- [ ] Set padding to ~64px top/bottom
- [ ] Verify Projects section follows immediately after

---

## SECTION 8: QUICK REFERENCE

### Hero Content (Updated)

| Element | Text | Font | Size |
|---------|------|------|------|
| Tagline | Building what's next. | Serif | 80px |
| Role | ENGINEER (morphing) | Mono | 28px |

**Name removed** — now in logo

### New Projects

| Project | Tags | Date |
|---------|------|------|
| 4-Bit CPU Architecture | VHDL, FPGA, Digital Design | Spring 2025 |
| Bluetooth Messaging System | Embedded C, Arduino, Bluetooth | Fall 2025 |

### Particle Motion

| State | Behavior |
|-------|----------|
| Idle | Slow ambient drift, random wandering |
| Mouse active | Strong repel + connections |
| Edges | Wrap around (seamless) |

---

*End of Version 3.7 Specification*
