# Omar Mohammed Portfolio Website
## Design Specification — Version 3.5

**Version:** 3.5  
**Last Updated:** February 2026  
**Status:** UPDATE — Hero Enhancement, Particle Interactivity, Smooth Scroll

---

## OVERVIEW

This update transforms the landing page experience with three major changes:

1. **Remove scroll indicator** — Trust users to scroll, no explicit cues needed
2. **Larger hero content** — Scale up all hero elements proportionally for more impact
3. **Interactive particles** — Strong mouse interaction with repel + connect behavior
4. **Smooth scroll** — Momentum-based scrolling with soft section snapping (Locomotive-style)

---

## SECTION 1: REMOVE SCROLL INDICATOR

### 1.1 What to Remove

Delete all scroll indicator components:
- Remove `ScrollIndicator` component from homepage
- Remove any scroll-related CSS animations
- Remove associated JavaScript

**Rationale:** Award-winning portfolio sites don't use explicit scroll indicators. They trust visual curiosity and content design to encourage scrolling.

---

## SECTION 2: HERO CONTENT SCALING

### 2.1 Current vs. New Sizing

Scale all hero elements proportionally larger for more visual impact.

| Element | Current | New | Notes |
|---------|---------|-----|-------|
| Morphing text | ~48px | ~72px | "Building what's next." |
| Role words | ~36px | ~56px | ENGINEER / ENTREPRENEUR / BUILDER |
| Name | ~24px | ~32px | Omar Mohammed |
| Subtitle | ~18px | ~24px | Syracuse University |

### 2.2 CSS Implementation

```css
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-tagline {
  font-size: clamp(2.5rem, 6vw, 4.5rem);  /* Was ~3rem max */
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.hero-roles {
  font-size: clamp(1.75rem, 4vw, 3.5rem);  /* Was ~2.25rem max */
  font-weight: 500;
  font-family: var(--font-mono);
  color: var(--green-primary);
  margin-bottom: var(--space-6);
}

.hero-name {
  font-size: clamp(1.25rem, 2.5vw, 2rem);  /* Was ~1.5rem max */
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.5rem);  /* Was ~1.125rem max */
  color: var(--text-muted);
}
```

### 2.3 Responsive Scaling

```css
/* Tablet */
@media (max-width: 1024px) {
  .hero-tagline {
    font-size: clamp(2rem, 5vw, 3.5rem);
  }
  
  .hero-roles {
    font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  }
}

/* Mobile */
@media (max-width: 640px) {
  .hero-tagline {
    font-size: clamp(1.75rem, 8vw, 2.5rem);
  }
  
  .hero-roles {
    font-size: clamp(1.25rem, 6vw, 2rem);
  }
  
  .hero-name {
    font-size: 1.25rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
}
```

---

## SECTION 3: INTERACTIVE PARTICLES

### 3.1 Behavior Spec

**Mouse interaction:** Strong repel + connect

| Property | Value | Description |
|----------|-------|-------------|
| Repel radius | 150px | Distance at which particles start fleeing |
| Repel strength | 0.8 | How aggressively particles scatter (0-1) |
| Connect distance | 120px | Max distance to draw lines between particles |
| Connect opacity | 0.3 | Line opacity (fades with distance) |
| Return speed | 0.05 | How quickly particles drift back to origin |

**Effect:** Particles scatter dramatically from cursor, drawing constellation-like connections as they move. Creates a "disturbed star field" effect.

### 3.2 Particle Properties

| Property | Value |
|----------|-------|
| Count | 80-120 (scale with viewport) |
| Size | 2-4px (randomized) |
| Color | var(--text-muted) with 0.4-0.7 opacity |
| Movement | Slow ambient drift + mouse repel |
| Distribution | Random across full viewport |

### 3.3 Canvas Implementation

```javascript
class ParticleField {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.repelRadius = 150;
    this.repelStrength = 0.8;
    this.connectDistance = 120;
    
    this.init();
    this.animate();
    this.bindEvents();
  }
  
  init() {
    this.resize();
    
    // Create particles based on viewport size
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    const count = Math.min(Math.max(particleCount, 60), 120);
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        originX: 0,  // Set after position
        originY: 0,
        size: Math.random() * 2 + 2,
        opacity: Math.random() * 0.3 + 0.4,
        vx: (Math.random() - 0.5) * 0.3,  // Ambient drift
        vy: (Math.random() - 0.5) * 0.3,
      });
      
      // Store origin for return behavior
      const p = this.particles[this.particles.length - 1];
      p.originX = p.x;
      p.originY = p.y;
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
    });
    
    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach((p, i) => {
      // Mouse repel
      if (this.mouse.x !== null && this.mouse.y !== null) {
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
      
      // Return to origin (soft spring)
      const returnSpeed = 0.02;
      p.vx += (p.originX - p.x) * returnSpeed;
      p.vy += (p.originY - p.y) * returnSpeed;
      
      // Apply velocity with damping
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(107, 107, 107, ${p.opacity})`;
      this.ctx.fill();
      
      // Draw connections to nearby particles
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    new ParticleField(canvas);
  }
});
```

### 3.4 HTML Structure

```html
<section class="hero-section">
  <canvas id="particle-canvas" class="particle-canvas"></canvas>
  
  <div class="hero-content">
    <h1 class="hero-tagline">Building what's next.</h1>
    <div class="hero-roles">
      <!-- Morphing text component -->
    </div>
    <p class="hero-name">Omar Mohammed</p>
    <p class="hero-subtitle">Syracuse University</p>
  </div>
</section>
```

### 3.5 Canvas CSS

```css
.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}
```

### 3.6 Performance Considerations

```javascript
// Reduce particle count on mobile
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 40 : 100;

// Reduce motion for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  // Disable mouse interaction, keep ambient drift only
  this.repelRadius = 0;
}
```

---

## SECTION 4: SMOOTH SCROLL WITH SOFT SNAP

### 4.1 Behavior Spec

**Scroll type:** Momentum + soft section snapping

| Property | Value | Description |
|----------|-------|-------------|
| Lerp (smoothness) | 0.08 | Lower = smoother, higher = snappier |
| Snap threshold | 15% | Snap to section if within 15% of viewport |
| Snap duration | 600ms | Time to complete snap animation |
| Sections | 4 | Hero, About, Projects, Contact |

**Effect:** Scrolling has a "buttery" momentum feel. When user stops scrolling near a section boundary, page gently snaps to align section with viewport.

### 4.2 Library Recommendation: Lenis

Lenis is lightweight, performant, and works well with Astro.

```bash
npm install @studio-freight/lenis
```

### 4.3 Lenis Setup

```javascript
import Lenis from '@studio-freight/lenis';

// Initialize smooth scroll
const lenis = new Lenis({
  duration: 1.2,           // Scroll duration
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out expo
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  smoothTouch: false,      // Disable on touch devices (native feels better)
  touchMultiplier: 2,
});

// Animation loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
```

### 4.4 Soft Section Snapping

```javascript
// Section snap logic
const sections = document.querySelectorAll('.snap-section');
let isSnapping = false;
let snapTimeout;

lenis.on('scroll', ({ scroll, velocity }) => {
  // Only snap when velocity is low (user stopped scrolling)
  if (Math.abs(velocity) < 0.5 && !isSnapping) {
    clearTimeout(snapTimeout);
    
    snapTimeout = setTimeout(() => {
      const viewportHeight = window.innerHeight;
      const scrollPos = scroll;
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const distanceToTop = Math.abs(scrollPos - sectionTop);
        const threshold = viewportHeight * 0.15; // 15% threshold
        
        // Snap if within threshold
        if (distanceToTop < threshold && distanceToTop > 10) {
          isSnapping = true;
          lenis.scrollTo(sectionTop, {
            duration: 0.6,
            onComplete: () => {
              isSnapping = false;
            }
          });
        }
      });
    }, 150); // Debounce
  }
});
```

### 4.5 Section HTML Structure

```html
<main data-lenis-root>
  <section id="hero" class="snap-section hero-section">
    <!-- Hero content -->
  </section>
  
  <section id="about" class="snap-section about-section">
    <!-- About preview -->
  </section>
  
  <section id="projects" class="snap-section projects-section">
    <!-- Projects grid -->
  </section>
  
  <section id="contact" class="snap-section contact-section">
    <!-- Contact/footer -->
  </section>
</main>
```

### 4.6 Section CSS

```css
.snap-section {
  min-height: 100vh;
  position: relative;
}

/* Ensure smooth scroll works with CSS */
html.lenis {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
```

### 4.7 Astro Integration

```astro
---
// SmoothScroll.astro
---

<script>
  import Lenis from '@studio-freight/lenis';

  document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    const sections = document.querySelectorAll('.snap-section');
    let isSnapping = false;
    let snapTimeout;

    lenis.on('scroll', ({ scroll, velocity }) => {
      if (Math.abs(velocity) < 0.5 && !isSnapping) {
        clearTimeout(snapTimeout);
        
        snapTimeout = setTimeout(() => {
          const viewportHeight = window.innerHeight;
          
          sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const distanceToTop = Math.abs(scroll - sectionTop);
            const threshold = viewportHeight * 0.15;
            
            if (distanceToTop < threshold && distanceToTop > 10) {
              isSnapping = true;
              lenis.scrollTo(sectionTop, {
                duration: 0.6,
                onComplete: () => {
                  isSnapping = false;
                }
              });
            }
          });
        }, 150);
      }
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis for nav links
    window.lenis = lenis;
  });
</script>
```

### 4.8 Navigation Integration

```javascript
// Smooth scroll to section on nav click
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target && window.lenis) {
      window.lenis.scrollTo(target, { duration: 1 });
    }
  });
});
```

---

## SECTION 5: COMBINED HERO LAYOUT

### 5.1 Final Hero Structure

```html
<section id="hero" class="snap-section hero-section">
  <!-- Particle background -->
  <canvas id="particle-canvas" class="particle-canvas"></canvas>
  
  <!-- Content -->
  <div class="hero-content">
    <p class="hero-tagline">Building what's next.</p>
    
    <div class="hero-roles">
      <span class="morphing-text">ENGINEER</span>
    </div>
    
    <p class="hero-name">Omar Mohammed</p>
    <p class="hero-subtitle">Syracuse University</p>
  </div>
</section>
```

### 5.2 Visual Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    ·  ·      ·   ·                                          │
│               ·         ·         ·    ·                                    │
│          ·        ·          ·              ·                               │
│                                                                             │
│                                                                             │
│                     Building what's next.          ← 72px, bold             │
│                                                                             │
│                         ENGINEER                   ← 56px, green, mono      │
│                                                                             │
│                       Omar Mohammed                ← 32px                   │
│                      Syracuse University           ← 24px, muted            │
│                                                                             │
│                                                                             │
│              ·               ·          ·                                   │
│         ·          ·    ·         ·           ·                             │
│                ·              ·        ·                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

   Particles scatter dramatically from cursor, drawing lines as they flee
```

---

## SECTION 6: IMPLEMENTATION CHECKLIST

### Remove
- [ ] Delete ScrollIndicator component
- [ ] Remove scroll indicator CSS
- [ ] Remove scroll indicator JavaScript

### Hero Scaling
- [ ] Increase .hero-tagline to 72px max
- [ ] Increase .hero-roles to 56px max
- [ ] Increase .hero-name to 32px max
- [ ] Increase .hero-subtitle to 24px max
- [ ] Test responsive scaling on all breakpoints

### Particles
- [ ] Create canvas element in hero section
- [ ] Implement ParticleField class
- [ ] Add mouse repel behavior (150px radius, 0.8 strength)
- [ ] Add particle connections (120px distance)
- [ ] Add return-to-origin spring behavior
- [ ] Test performance on mobile
- [ ] Add reduced motion fallback

### Smooth Scroll
- [ ] Install Lenis (`npm install @studio-freight/lenis`)
- [ ] Initialize Lenis with custom easing
- [ ] Add .snap-section class to all main sections
- [ ] Implement soft snap logic (15% threshold)
- [ ] Integrate with navigation links
- [ ] Test on desktop and mobile
- [ ] Disable smooth scroll on touch devices (use native)

### Testing
- [ ] Test particle performance (target 60fps)
- [ ] Test scroll snap doesn't feel jarring
- [ ] Test navigation links scroll smoothly
- [ ] Test on Safari, Chrome, Firefox
- [ ] Test on mobile devices
- [ ] Verify reduced motion preferences respected

---

## SECTION 7: PERFORMANCE NOTES

### Particles
- Keep count under 120 for smooth performance
- Use `requestAnimationFrame` for animation loop
- Avoid creating objects in animation loop (reuse)
- Consider using `OffscreenCanvas` for heavy scenes

### Smooth Scroll
- Lenis is ~3KB gzipped, very lightweight
- Disable `smoothTouch` on mobile (native scrolling feels better)
- Don't animate too many elements on scroll (limit to essential)

### Combined
- Particle canvas should have `pointer-events: none`
- Smooth scroll lerp of 0.08-0.1 balances smoothness and responsiveness
- Snap threshold of 15% prevents jarring snaps while still being useful

---

*End of Version 3.5 Specification*
