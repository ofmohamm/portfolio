# Omar Mohammed Portfolio Website
## Design Specification — Version 3.6

**Version:** 3.6  
**Last Updated:** February 2026  
**Status:** UPDATE — Hero Refinement (Layout, Typography, Hierarchy)

---

## OVERVIEW

This update refines the hero section based on comparison with award-winning portfolio sites (Brittany Chiang, Locomotive, etc.):

1. **Remove Syracuse University** — Cleaner, less cluttered
2. **Tighter grouping** — Name and role pulled together, less vertical scatter
3. **Font contrast** — Serif tagline, sans-serif name/role
4. **Name prominence** — Moved up, directly under tagline
5. **Larger tagline** — More impact, commands attention

---

## SECTION 1: HERO CONTENT CHANGES

### 1.1 Content Removed

| Element | Action |
|---------|--------|
| Syracuse University | **REMOVE** from hero entirely |

University info can live on About page. Hero should be punchy, not a resume header.

### 1.2 New Hierarchy (Top to Bottom)

```
1. "Building what's next."     ← LARGEST, serif, bold
2. Omar Mohammed               ← Medium, sans-serif  
3. ENGINEER (morphing)         ← Smaller, mono, green
```

**Visual:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                                                                             │
│                     Building what's next.                                   │
│                                                                             │
│                        Omar Mohammed                                        │
│                          ENGINEER                                           │
│                                                                             │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

         Tagline: Serif, 80px, bold, --text-primary
         Name: Geist Sans, 28px, medium weight, --text-primary  
         Role: Geist Sans Mono, 24px, --green-primary, morphing
```

### 1.3 Vertical Spacing

| Gap | Old | New |
|-----|-----|-----|
| Tagline → Name | ~48px | 24px |
| Name → Role | ~32px | 12px |

Tighter grouping creates visual cohesion. The three elements read as one unit, not scattered pieces.

---

## SECTION 2: TYPOGRAPHY

### 2.1 Font Stack

| Element | Font | Weight | Size | Color |
|---------|------|--------|------|-------|
| Tagline | Serif (Playfair Display or similar) | 700 | 80px | --text-primary |
| Name | Geist Sans | 500 | 28px | --text-primary |
| Role | Geist Sans Mono | 500 | 24px | --green-primary |

### 2.2 Font Loading

```html
<!-- Geist Sans from Vercel -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-sans/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-mono/style.css">

<!-- Or self-host -->
<!-- Download from: https://vercel.com/font -->
```

### 2.3 CSS Font Definitions

```css
:root {
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Geist Sans', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'SF Mono', monospace;
}
```

### 2.4 Why This Pairing Works

**Serif tagline:** Commands attention, feels crafted, establishes personality. "Building what's next." deserves weight and presence.

**Sans-serif name:** Clean, modern, professional. Doesn't compete with tagline but stands confidently below it.

**Mono role:** Technical feel for ENGINEER/ENTREPRENEUR/BUILDER. The morphing text benefits from monospace stability (letters don't shift width).

---

## SECTION 3: RESPONSIVE SIZING

### 3.1 Breakpoint Scaling

```css
.hero-tagline {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: clamp(2.5rem, 8vw, 5rem);  /* 40px → 80px */
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.hero-name {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(1.25rem, 3vw, 1.75rem);  /* 20px → 28px */
  color: var(--text-primary);
  margin-top: 1.5rem;  /* 24px gap from tagline */
}

.hero-role {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: clamp(1rem, 2.5vw, 1.5rem);  /* 16px → 24px */
  color: var(--green-primary);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 0.75rem;  /* 12px gap from name */
}
```

### 3.2 Mobile Adjustments

```css
@media (max-width: 640px) {
  .hero-tagline {
    font-size: 2.5rem;  /* 40px */
  }
  
  .hero-name {
    font-size: 1.25rem;  /* 20px */
    margin-top: 1.25rem;
  }
  
  .hero-role {
    font-size: 1rem;  /* 16px */
    letter-spacing: 0.1em;
  }
}
```

---

## SECTION 4: HTML STRUCTURE

### 4.1 Updated Hero Markup

```html
<section id="hero" class="snap-section hero-section">
  <!-- Particle canvas (from v3.5) -->
  <canvas id="particle-canvas" class="particle-canvas"></canvas>
  
  <!-- Content -->
  <div class="hero-content">
    <h1 class="hero-tagline">Building what's next.</h1>
    
    <p class="hero-name">Omar Mohammed</p>
    
    <div class="hero-role">
      <span class="morphing-text">ENGINEER</span>
    </div>
  </div>
</section>
```

### 4.2 Removed Elements

```html
<!-- REMOVED: No longer in hero -->
<!-- <p class="hero-subtitle">Syracuse University</p> -->
```

---

## SECTION 5: FULL CSS

```css
/* ============================================
   HERO SECTION - v3.6
   ============================================ */

.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

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
  padding: 0 var(--space-4);
}

/* Tagline - Serif, largest */
.hero-tagline {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: clamp(2.5rem, 8vw, 5rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0;
}

/* Name - Sans-serif, medium */
.hero-name {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--text-primary);
  margin: 1.5rem 0 0 0;  /* 24px top gap */
}

/* Role - Mono, green, morphing */
.hero-role {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: var(--green-primary);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0.75rem 0 0 0;  /* 12px top gap */
}

/* Mobile */
@media (max-width: 640px) {
  .hero-tagline {
    font-size: 2.5rem;
  }
  
  .hero-name {
    font-size: 1.25rem;
    margin-top: 1.25rem;
  }
  
  .hero-role {
    font-size: 1rem;
    letter-spacing: 0.1em;
  }
}
```

---

## SECTION 6: BEFORE & AFTER

### Before (Current)

```
                     Building what's next.
                     
                     
                     
                          ENGINEER
                          
                          
                          
                          
                       Omar Mohammed
                      Syracuse University
```

- Scattered vertically
- Name at bottom (afterthought)
- University adds clutter
- Same font family throughout

### After (v3.6)

```
                     Building what's next.
                     
                        Omar Mohammed
                          ENGINEER
```

- Tight grouping
- Name prominent, right under tagline
- No university clutter
- Font contrast (serif vs sans)
- Clear hierarchy: Tagline > Name > Role

---

## SECTION 7: MORPHING TEXT

### 7.1 Words (unchanged)

```javascript
const words = ['ENGINEER', 'ENTREPRENEUR', 'BUILDER'];
```

### 7.2 Timing

| Property | Value |
|----------|-------|
| Display duration | 2000ms |
| Transition duration | 500ms |
| Total cycle | 7.5s (3 words × 2.5s) |

### 7.3 Animation Style

Crossfade or character morph (existing implementation). Monospace font ensures stable width during transitions.

---

## SECTION 8: IMPLEMENTATION CHECKLIST

### Typography
- [ ] Add Geist Sans font (CDN or self-host)
- [ ] Add Geist Mono font
- [ ] Update CSS variables for font stack
- [ ] Verify Playfair Display (or current serif) loads correctly

### Layout
- [ ] Remove Syracuse University from hero
- [ ] Move name directly below tagline
- [ ] Move role below name
- [ ] Reduce gaps (tagline→name: 24px, name→role: 12px)

### Sizing
- [ ] Increase tagline to 80px max
- [ ] Set name to 28px max
- [ ] Set role to 24px max
- [ ] Add clamp() for responsive scaling

### Testing
- [ ] Test on desktop (various widths)
- [ ] Test on mobile
- [ ] Verify font contrast looks good
- [ ] Verify morphing text still works with new sizing
- [ ] Check that particles don't overpower text

---

## SECTION 9: QUICK REFERENCE

### Final Hero Content

| Element | Text | Font | Size | Color |
|---------|------|------|------|-------|
| Tagline | Building what's next. | Playfair Display | 80px | charcoal |
| Name | Omar Mohammed | Geist Sans | 28px | charcoal |
| Role | ENGINEER (morphing) | Geist Mono | 24px | green |

### Spacing

| Gap | Value |
|-----|-------|
| Tagline → Name | 24px |
| Name → Role | 12px |

### Fonts

| Variable | Value |
|----------|-------|
| --font-serif | 'Playfair Display', Georgia, serif |
| --font-sans | 'Geist Sans', system-ui, sans-serif |
| --font-mono | 'Geist Mono', 'SF Mono', monospace |

---

*End of Version 3.6 Specification*
