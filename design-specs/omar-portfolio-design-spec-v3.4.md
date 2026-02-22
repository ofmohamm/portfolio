# Omar Mohammed Portfolio Website
## Design Specification — Version 3.4

**Version:** 3.4  
**Last Updated:** February 2026  
**Status:** UPDATE — Landing Page Scroll Affordance

---

## OVERVIEW

This update improves scroll discoverability on the landing page using research-backed techniques:

1. **Dynamic hero height** — calculated so "Hi, I'm Omar" heading peeks into view on load
2. **Ambient bottom gradient** — subtle shadow that signals "more below," fades at page bottom
3. **Remove scroll indicator pill** — replaced by more intuitive implicit cues

---

## SECTION 1: REMOVE SCROLL INDICATOR PILL

### 1.1 What to Remove

Delete the `ScrollIndicator` component entirely:
- Remove from homepage
- Remove from project pages
- Delete component file if no longer needed elsewhere

The pill is being replaced by more intuitive, implicit scroll cues.

---

## SECTION 2: DYNAMIC HERO HEIGHT — CONTENT PEEK

### 2.1 Concept

Instead of hero filling `100vh`, calculate height so the About Preview heading ("Hi, I'm Omar") is partially visible on load — approximately 15-20% peeking above the fold.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Navigation]                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                                                                             │
│                        Building what's next.                                │
│                   [ ENGINEER → ENTREPRENEUR → BUILDER ]                     │
│                                                                             │
│                            Omar Mohammed                                    │
│                          Syracuse University                                │
│                                                                             │
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ FOLD LINE ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤
│                                                                             │
│                           Hi, I'm Omar.           ← VISIBLE ON LOAD         │
│           Indian at heart, engineer by pro...     ← partially cut off       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

Users immediately understand there's more content below.

### 2.2 CSS Implementation — Simple Approach

```css
.hero-section {
  min-height: calc(100vh - 120px); /* Leave room for peek */
  min-height: calc(100dvh - 120px); /* Dynamic viewport height for mobile */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-8);
}
```

The `120px` offset ensures ~100-140px of the next section is visible, enough to show the "Hi, I'm Omar" heading.

### 2.3 CSS Implementation — Responsive Approach

```css
.hero-section {
  /* Desktop: leave 120px for peek */
  min-height: calc(100vh - 120px);
  min-height: calc(100dvh - 120px);
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--space-8);
}

/* Tablet */
@media (max-width: 1024px) {
  .hero-section {
    min-height: calc(100vh - 100px);
    min-height: calc(100dvh - 100px);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .hero-section {
    min-height: calc(100vh - 80px);
    min-height: calc(100dvh - 80px);
  }
}
```

### 2.4 JavaScript Implementation — Precise Calculation (Optional)

For pixel-perfect control, calculate based on actual heading height:

```javascript
function setHeroHeight() {
  const hero = document.querySelector('.hero-section');
  const aboutPreview = document.querySelector('.about-preview');
  const aboutHeading = document.querySelector('.about-preview-heading');
  
  if (!hero || !aboutPreview || !aboutHeading) return;
  
  const viewportHeight = window.innerHeight;
  const navHeight = document.querySelector('.nav-header')?.offsetHeight || 0;
  const headingHeight = aboutHeading.offsetHeight;
  const peekAmount = headingHeight + 40; // heading + some padding
  
  const heroHeight = viewportHeight - peekAmount;
  
  hero.style.minHeight = `${heroHeight}px`;
}

// Run on load and resize
window.addEventListener('load', setHeroHeight);
window.addEventListener('resize', debounce(setHeroHeight, 100));

// Debounce helper
function debounce(fn, ms) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
}
```

### 2.5 Recommendation

Start with the **CSS approach** (Section 2.2 or 2.3). It's simpler and works for 90% of cases. Only use JavaScript if you need pixel-perfect control across all devices.

---

## SECTION 3: AMBIENT BOTTOM GRADIENT

### 3.1 Concept

A subtle gradient at the bottom edge of the viewport that subconsciously signals "more content below." Fades out when user reaches the bottom of the page.

- Users won't consciously notice it
- Works as an ambient cue alongside the content peek
- Respects the site's color scheme

### 3.2 Visual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                              PAGE CONTENT                                   │
│                                                                             │
│                                                                             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ← 16px gradient
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    fades to transparent
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 CSS Implementation

```css
/* Bottom gradient overlay */
body::after {
  content: '';
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(
    to top,
    var(--bg-primary) 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 100;
  opacity: 1;
  transition: opacity 300ms ease-out;
}

/* Class to hide gradient (applied via JS) */
body.at-bottom::after {
  opacity: 0;
}
```

### 3.4 JavaScript — Fade at Bottom

```javascript
function updateScrollGradient() {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // Calculate how close to bottom (0 = top, 1 = bottom)
  const scrollPercent = scrollPosition / (documentHeight - windowHeight);
  
  // Start fading at 90%, fully hidden at 98%
  if (scrollPercent > 0.90) {
    document.body.classList.add('at-bottom');
  } else {
    document.body.classList.remove('at-bottom');
  }
}

window.addEventListener('scroll', updateScrollGradient, { passive: true });

// Initial check
updateScrollGradient();
```

### 3.5 Alternative — CSS-Only with Scroll-Driven Animations (Modern Browsers)

If targeting modern browsers only:

```css
@supports (animation-timeline: scroll()) {
  body::after {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to top, var(--bg-primary), transparent);
    pointer-events: none;
    z-index: 100;
    
    animation: fade-gradient linear;
    animation-timeline: scroll();
  }
  
  @keyframes fade-gradient {
    0% { opacity: 1; }
    85% { opacity: 1; }
    100% { opacity: 0; }
  }
}
```

### 3.6 Color Integration

The gradient uses `--bg-primary` (#FAF9F6) — your warm white background. This makes it invisible as a "color" but perceptible as a subtle shadow/fade effect.

### 3.7 Accessibility

```css
/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  body::after {
    transition: none;
  }
}
```

---

## SECTION 4: COMBINED IMPLEMENTATION

### 4.1 Full CSS

```css
/* ============================================
   SCROLL AFFORDANCE SYSTEM
   ============================================ */

/* Hero height - leaves room for content peek */
.hero-section {
  min-height: calc(100vh - 120px);
  min-height: calc(100dvh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--space-8);
}

@media (max-width: 1024px) {
  .hero-section {
    min-height: calc(100vh - 100px);
    min-height: calc(100dvh - 100px);
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: calc(100vh - 80px);
    min-height: calc(100dvh - 80px);
  }
}

/* Bottom gradient */
body::after {
  content: '';
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(
    to top,
    var(--bg-primary) 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 100;
  opacity: 1;
  transition: opacity 300ms ease-out;
}

body.at-bottom::after {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  body::after {
    transition: none;
  }
}
```

### 4.2 Full JavaScript

```javascript
// ============================================
// SCROLL AFFORDANCE SYSTEM
// ============================================

// Fade gradient when near bottom
function updateScrollGradient() {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  const scrollPercent = scrollPosition / (documentHeight - windowHeight);
  
  if (scrollPercent > 0.90) {
    document.body.classList.add('at-bottom');
  } else {
    document.body.classList.remove('at-bottom');
  }
}

window.addEventListener('scroll', updateScrollGradient, { passive: true });
updateScrollGradient();
```

### 4.3 Astro Component (Optional)

If you want to encapsulate this:

```astro
---
// ScrollAffordance.astro
// Add to your main layout, not individual pages
---

<script>
  function updateScrollGradient() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    const scrollPercent = scrollPosition / (documentHeight - windowHeight);
    
    if (scrollPercent > 0.90) {
      document.body.classList.add('at-bottom');
    } else {
      document.body.classList.remove('at-bottom');
    }
  }

  window.addEventListener('scroll', updateScrollGradient, { passive: true });
  updateScrollGradient();
</script>

<style is:global>
  body::after {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(
      to top,
      var(--bg-primary) 0%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 100;
    opacity: 1;
    transition: opacity 300ms ease-out;
  }

  body.at-bottom::after {
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    body::after {
      transition: none;
    }
  }
</style>
```

---

## SECTION 5: IMPLEMENTATION CHECKLIST

### Remove
- [ ] Delete ScrollIndicator component from homepage
- [ ] Delete ScrollIndicator component from project pages
- [ ] Remove ScrollIndicator component file (or keep if used elsewhere)

### Hero Height
- [ ] Update `.hero-section` to use `calc(100vh - 120px)`
- [ ] Add `100dvh` fallback for mobile
- [ ] Add responsive breakpoints (100px for tablet, 80px for mobile)
- [ ] Test that "Hi, I'm Omar" peeks into view on various screen sizes

### Bottom Gradient
- [ ] Add `body::after` gradient styles to global CSS
- [ ] Add JavaScript for `.at-bottom` class toggle
- [ ] Test gradient is visible but subtle
- [ ] Test gradient fades at bottom of page
- [ ] Test reduced motion preference

### Testing
- [ ] Test on desktop (various heights)
- [ ] Test on tablet
- [ ] Test on mobile (various heights)
- [ ] Test that content peek feels natural, not forced
- [ ] Verify gradient doesn't interfere with footer visibility

---

## SECTION 6: BEFORE & AFTER

### Before (v3.3)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                        Building what's next.                                │
│                   [ ENGINEER → ENTREPRENEUR → BUILDER ]                     │
│                                                                             │
│                            Omar Mohammed                                    │
│                          Syracuse University                                │
│                                                                       ┌───┐ │
│                                                                       │ ● │ │
│                                                                       └───┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                          (below the fold)                                   │
│                           Hi, I'm Omar.                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

- Explicit scroll indicator pill
- Hero fills viewport
- Content hidden below fold

### After (v3.4)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                        Building what's next.                                │
│                   [ ENGINEER → ENTREPRENEUR → BUILDER ]                     │
│                                                                             │
│                            Omar Mohammed                                    │
│                          Syracuse University                                │
│                                                                             │
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ fold ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤
│                           Hi, I'm Omar.           ← VISIBLE                 │
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ← subtle gradient
└─────────────────────────────────────────────────────────────────────────────┘
```

- No explicit indicator
- Content naturally peeks above fold
- Ambient gradient signals "more below"
- Cleaner, more intuitive

---

## SECTION 7: WHY THIS IS BETTER

| Aspect | Pill Indicator | Content Peek + Gradient |
|--------|----------------|-------------------------|
| Discoverability | Explicit — "scroll down" | Implicit — content implies continuation |
| Feel | Heavy-handed | Natural, intuitive |
| Visual clutter | Adds element | Uses negative space |
| User trust | Tells user what to do | Shows user what exists |
| Modern feel | Dated pattern | Current best practice |

The research is clear: **showing partial content is the strongest scroll affordance**. Users understand cut-off content means continuation without needing to be told.

---

*End of Version 3.4 Specification*
