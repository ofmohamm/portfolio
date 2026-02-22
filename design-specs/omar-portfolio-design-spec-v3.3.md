# Omar Mohammed Portfolio Website
## Design Specification — Version 3.3

**Version:** 3.3  
**Last Updated:** February 2026  
**Status:** UPDATE — Cursor, Scroll Indicator, Hero Layout

---

## OVERVIEW

This update addresses three items:
1. Hero identity centered (was bottom-left)
2. Custom cursor refined (subtle smooth, bug fixes)
3. Scroll indicator repositioned and recolored

---

## SECTION 1: HERO LAYOUT — CENTERED IDENTITY

### 1.1 Updated Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Navigation]                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ════════════════════════════════════════════════════════════════════════   │
│              ░░░░░ INTERACTIVE PARTICLE BACKGROUND ░░░░░                    │
│  ════════════════════════════════════════════════════════════════════════   │
│                                                                             │
│                                                                             │
│                        Building what's next.                                │
│                        ─────────────────────                                │
│                                                                             │
│                   [ ENGINEER → ENTREPRENEUR → BUILDER ]                     │
│                                                                             │
│                                                                             │
│                            Omar Mohammed                                    │
│                          Syracuse University                                │
│                                                                             │
│                                                                       ┌───┐ │
│                                                                       │ ● │ │
│                                                                       └───┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Styling

```css
.hero-identity {
  text-align: center;
  margin-top: var(--space-8);
}

.hero-name {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.hero-school {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}
```

### 1.3 HTML

```html
<div class="hero-identity">
  <p class="hero-name">Omar Mohammed</p>
  <p class="hero-school">Syracuse University</p>
</div>
```

---

## SECTION 2: CUSTOM CURSOR — REFINED

### 2.1 Changes from Previous Spec

| Aspect | Before | After |
|--------|--------|-------|
| Smoothing | 50-80ms (floaty) | 20-30ms (subtle) |
| Ease value | 0.15 | 0.25 |
| Default cursor | Sometimes visible | Always hidden |
| Disappearing | Sometimes | Fixed with GPU acceleration |

### 2.2 CSS — Fixed

```css
/* Hide default cursor everywhere */
* {
  cursor: none !important;
}

/* Or more targeted */
body,
a,
button,
input,
textarea,
select,
[role="button"],
[onclick] {
  cursor: none;
}

/* Custom cursor element */
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
  will-change: transform; /* GPU acceleration - prevents disappearing */
  transition: width 0.15s ease, height 0.15s ease, background 0.15s ease, opacity 0.15s ease;
}

/* Hover states */
.custom-cursor.hovering {
  width: 40px;
  height: 40px;
  background: transparent;
  border: 2px solid var(--text-primary);
  margin-left: -10px;
  margin-top: -10px;
}

.custom-cursor.hovering-card {
  width: 56px;
  height: 56px;
  background: var(--green-primary);
  opacity: 0.9;
  margin-left: -18px;
  margin-top: -18px;
}

/* Hide on touch devices */
@media (hover: none) and (pointer: coarse) {
  * {
    cursor: auto !important;
  }
  
  .custom-cursor {
    display: none !important;
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .custom-cursor {
    display: none !important;
  }
  
  * {
    cursor: auto !important;
  }
}
```

### 2.3 JavaScript — Subtle Smooth

```javascript
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

// Subtle smooth animation (20-30ms effective delay)
function animateCursor() {
  const ease = 0.25; // Higher = more responsive (was 0.15)
  
  cursorX += (targetX - cursorX) * ease;
  cursorY += (targetY - cursorY) * ease;
  
  cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover state management
const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering');
  });
});

// Project card hover
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    cursor.classList.remove('hovering');
    cursor.classList.add('hovering-card');
  });
  card.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering-card');
  });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '0.9';
});
```

### 2.4 HTML

```html
<!-- Add at end of body -->
<div class="custom-cursor" aria-hidden="true"></div>
```

---

## SECTION 3: SCROLL INDICATOR — REPOSITIONED & RECOLORED

### 3.1 Changes from Previous Spec

| Aspect | Before | After |
|--------|--------|-------|
| Position from right | 32px | 64px |
| Position from bottom | 32px | 48px |
| Pill border color | `--text-muted` (gray) | `--border` (warm beige) |
| Ball color | `--text-primary` (charcoal) | `--green-primary` (green) |
| Trail color | `--text-primary` | `--green-primary` |

### 3.2 Updated Position

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                   ┌───┐     │
│                                                                   │ ● │     │
│                                                                   └───┘     │
│                                                               ←─ 64px ─→    │
│                                                                     ↑       │
│                                                                    48px     │
│─────────────────────────────────────────────────────────────────────↓───────│
```

More breathing room from the corner.

### 3.3 Updated CSS

```css
.scroll-indicator {
  position: fixed;
  bottom: 48px;  /* was 32px */
  right: 64px;   /* was 32px */
  z-index: 50;
  background: none;
  border: none;
  padding: 0;
  cursor: none; /* match custom cursor */
  transition: opacity 0.3s ease;
}

.scroll-indicator-pill {
  width: 24px;
  height: 44px;
  border: 2px solid var(--border); /* was --text-muted */
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.scroll-indicator:hover .scroll-indicator-pill {
  border-color: var(--green-primary);
}

.scroll-ball {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: var(--green-primary); /* was --text-primary */
  transition: background 0.2s ease;
}

.scroll-ball-main {
  width: 6px;
  height: 6px;
  animation: scroll-up 1.5s ease-in-out infinite;
}

.scroll-ball-trail-1 {
  width: 4px;
  height: 4px;
  opacity: 0.5;
  animation: scroll-up-trail 1.5s ease-in-out infinite;
  animation-delay: 0.1s;
}

.scroll-ball-trail-2 {
  width: 3px;
  height: 3px;
  opacity: 0.25;
  animation: scroll-up-faint 1.5s ease-in-out infinite;
  animation-delay: 0.2s;
}

@keyframes scroll-up {
  0% { bottom: 6px; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { bottom: 30px; opacity: 0; }
}

@keyframes scroll-up-trail {
  0% { bottom: 6px; opacity: 0; }
  15% { opacity: 0.5; }
  85% { opacity: 0.5; }
  100% { bottom: 30px; opacity: 0; }
}

@keyframes scroll-up-faint {
  0% { bottom: 6px; opacity: 0; }
  15% { opacity: 0.25; }
  85% { opacity: 0.25; }
  100% { bottom: 30px; opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-ball {
    animation: none;
    bottom: 50%;
  }
  
  .scroll-ball-trail-1,
  .scroll-ball-trail-2 {
    display: none;
  }
}
```

### 3.4 Color Summary

| Element | Color Variable | Hex | Visual |
|---------|----------------|-----|--------|
| Pill border (rest) | `--border` | #D9D4C7 | Warm beige |
| Pill border (hover) | `--green-primary` | #2D5A3D | Forest green |
| Ball (rest) | `--green-primary` | #2D5A3D | Forest green |
| Ball (hover) | `--green-primary` | #2D5A3D | Same |
| Trail balls | `--green-primary` | #2D5A3D | Forest green at lower opacity |

The green ball inside a warm beige pill ties directly to your color scheme.

### 3.5 Full HTML

```html
<button class="scroll-indicator" aria-label="Scroll down">
  <div class="scroll-indicator-pill">
    <div class="scroll-ball scroll-ball-main"></div>
    <div class="scroll-ball scroll-ball-trail-1"></div>
    <div class="scroll-ball scroll-ball-trail-2"></div>
  </div>
</button>
```

---

## SECTION 4: ASTRO COMPONENTS

### 4.1 Updated ScrollIndicator.astro

```astro
---
// ScrollIndicator.astro
---

<button class="scroll-indicator" aria-label="Scroll down">
  <div class="scroll-indicator-pill">
    <div class="scroll-ball scroll-ball-main"></div>
    <div class="scroll-ball scroll-ball-trail-1"></div>
    <div class="scroll-ball scroll-ball-trail-2"></div>
  </div>
</button>

<script>
  const indicator = document.querySelector('.scroll-indicator');
  
  indicator?.addEventListener('click', () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', () => {
    const threshold = window.innerHeight * 0.4;
    if (window.scrollY > threshold) {
      indicator.style.opacity = '0';
      indicator.style.pointerEvents = 'none';
    } else {
      indicator.style.opacity = '1';
      indicator.style.pointerEvents = 'auto';
    }
  });
</script>

<style>
  .scroll-indicator {
    position: fixed;
    bottom: 48px;
    right: 64px;
    z-index: 50;
    background: none;
    border: none;
    padding: 0;
    cursor: none;
    transition: opacity 0.3s ease;
  }

  .scroll-indicator-pill {
    width: 24px;
    height: 44px;
    border: 2px solid var(--border);
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s ease;
  }

  .scroll-indicator:hover .scroll-indicator-pill {
    border-color: var(--green-primary);
  }

  .scroll-ball {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background: var(--green-primary);
  }

  .scroll-ball-main {
    width: 6px;
    height: 6px;
    animation: scroll-up 1.5s ease-in-out infinite;
  }

  .scroll-ball-trail-1 {
    width: 4px;
    height: 4px;
    opacity: 0.5;
    animation: scroll-up-trail 1.5s ease-in-out infinite;
    animation-delay: 0.1s;
  }

  .scroll-ball-trail-2 {
    width: 3px;
    height: 3px;
    opacity: 0.25;
    animation: scroll-up-faint 1.5s ease-in-out infinite;
    animation-delay: 0.2s;
  }

  @keyframes scroll-up {
    0% { bottom: 6px; opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { bottom: 30px; opacity: 0; }
  }

  @keyframes scroll-up-trail {
    0% { bottom: 6px; opacity: 0; }
    15% { opacity: 0.5; }
    85% { opacity: 0.5; }
    100% { bottom: 30px; opacity: 0; }
  }

  @keyframes scroll-up-faint {
    0% { bottom: 6px; opacity: 0; }
    15% { opacity: 0.25; }
    85% { opacity: 0.25; }
    100% { bottom: 30px; opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .scroll-ball {
      animation: none;
      bottom: 50%;
    }
    
    .scroll-ball-trail-1,
    .scroll-ball-trail-2 {
      display: none;
    }
  }
</style>
```

### 4.2 Updated CustomCursor.astro

```astro
---
// CustomCursor.astro
---

<div class="custom-cursor" aria-hidden="true"></div>

<script>
  const cursor = document.querySelector('.custom-cursor');
  
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    function animateCursor() {
      const ease = 0.25;
      
      cursorX += (targetX - cursorX) * ease;
      cursorY += (targetY - cursorY) * ease;
      
      cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
      
      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover states
    document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        cursor.classList.remove('hovering');
        cursor.classList.add('hovering-card');
      });
      card.addEventListener('mouseleave', () => cursor.classList.remove('hovering-card'));
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '0.9');
  }
</script>

<style is:global>
  /* Hide default cursor */
  @media (hover: hover) and (pointer: fine) {
    *,
    a,
    button,
    [role="button"],
    input,
    textarea,
    select {
      cursor: none !important;
    }
  }
</style>

<style>
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
    will-change: transform;
    transition: width 0.15s ease, height 0.15s ease, background 0.15s ease, opacity 0.15s ease, border 0.15s ease;
  }

  .custom-cursor.hovering {
    width: 40px;
    height: 40px;
    background: transparent;
    border: 2px solid var(--text-primary);
    margin-left: -10px;
    margin-top: -10px;
  }

  .custom-cursor.hovering-card {
    width: 56px;
    height: 56px;
    background: var(--green-primary);
    opacity: 0.9;
    margin-left: -18px;
    margin-top: -18px;
  }

  @media (hover: none) and (pointer: coarse) {
    .custom-cursor {
      display: none !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .custom-cursor {
      display: none !important;
    }
  }
</style>
```

---

## SECTION 5: IMPLEMENTATION CHECKLIST

### Hero
- [ ] Center identity (Omar Mohammed / Syracuse University)
- [ ] Remove bottom-left positioning
- [ ] Test vertical spacing

### Cursor
- [ ] Update ease value from 0.15 to 0.25
- [ ] Add `will-change: transform` for GPU acceleration
- [ ] Add `cursor: none !important` globally (with media query for touch)
- [ ] Add window mouseleave/mouseenter handlers
- [ ] Test on hover elements
- [ ] Test disappearing issue is fixed
- [ ] Test default cursor no longer shows

### Scroll Indicator
- [ ] Update position: bottom 48px, right 64px
- [ ] Update pill border to `--border`
- [ ] Update ball color to `--green-primary`
- [ ] Test visual integration with site colors
- [ ] Test animation still works

---

## SECTION 6: QUICK REFERENCE

### Changes Summary

| Component | Change |
|-----------|--------|
| Hero identity | Now centered (was bottom-left) |
| Cursor ease | 0.25 (was 0.15) — more responsive |
| Cursor bugs | Fixed with `will-change`, global `cursor: none`, window handlers |
| Scroll indicator position | 64px right, 48px bottom (was 32px each) |
| Scroll indicator border | `--border` warm beige (was `--text-muted` gray) |
| Scroll indicator ball | `--green-primary` green (was `--text-primary` charcoal) |

---

*End of Version 3.3 Specification*
