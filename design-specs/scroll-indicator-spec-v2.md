# Omar Mohammed Portfolio Website
## Scroll Indicator Component Specification

**Version:** 1.1  
**Last Updated:** February 2026  
**Status:** Ready to implement

---

## OVERVIEW

Animated scroll indicator pill with a ball that moves upward with a trailing effect, signaling to users that the page has more content below. Positioned in the bottom-right corner.

---

## SECTION 1: VISUAL DESIGN

### 1.1 Structure

```
    ┌─────┐
    │  ●  │  ← ball ends here (top)
    │  ○  │  ← trail fades
    │  ○  │  ← trail fades more
    │     │  ← ball starts here (bottom)
    └─────┘
```

Ball moves **bottom to top** (mimicking content movement when scrolling down).

### 1.2 Dimensions

| Property | Value |
|----------|-------|
| Pill width | 24px |
| Pill height | 44px |
| Border radius | 12px (fully rounded ends) |
| Border | 2px solid |
| Ball diameter | 6px |
| Trail balls | 4px, 3px (progressively smaller) |

### 1.3 Colors

| Element | Color |
|---------|-------|
| Pill border | `var(--text-muted)` or `var(--border)` |
| Pill background | Transparent |
| Ball (main) | `var(--text-primary)` |
| Trail | `var(--text-primary)` at decreasing opacity |

---

## SECTION 2: ANIMATION

### 2.1 Ball Movement with Trail

- Ball starts at bottom of pill
- Moves to top over 1.5 seconds
- Trail follows behind (2-3 fading dots)
- Fades out at top
- Reappears at bottom
- Loops infinitely

### 2.2 CSS Implementation

```css
.scroll-indicator {
  position: fixed;
  bottom: var(--space-8);
  right: var(--space-8);
  z-index: 50;
  transition: opacity 0.3s ease;
}

.scroll-indicator-pill {
  width: 24px;
  height: 44px;
  border: 2px solid var(--text-muted);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.scroll-indicator-pill:hover {
  border-color: var(--green-primary);
}

/* Main ball */
.scroll-indicator-ball {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: var(--text-primary);
  border-radius: 50%;
  animation: scroll-up 1.5s ease-in-out infinite;
}

/* Trail ball 1 */
.scroll-indicator-ball::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: var(--text-primary);
  border-radius: 50%;
  opacity: 0.5;
  animation: scroll-up-trail-1 1.5s ease-in-out infinite;
}

/* Trail ball 2 */
.scroll-indicator-ball::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 3px;
  background: var(--text-primary);
  border-radius: 50%;
  opacity: 0.25;
  animation: scroll-up-trail-2 1.5s ease-in-out infinite;
}

/* Main ball animation - bottom to top */
@keyframes scroll-up {
  0% {
    bottom: 6px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    bottom: 28px;
    opacity: 0;
  }
}

/* Trail 1 - follows main ball */
@keyframes scroll-up-trail-1 {
  0% {
    bottom: 2px;
    opacity: 0;
  }
  15% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    bottom: 24px;
    opacity: 0;
  }
}

/* Trail 2 - follows trail 1 */
@keyframes scroll-up-trail-2 {
  0% {
    bottom: -2px;
    opacity: 0;
  }
  20% {
    opacity: 0.25;
  }
  70% {
    opacity: 0.25;
  }
  100% {
    bottom: 20px;
    opacity: 0;
  }
}

/* Hover state */
.scroll-indicator-pill:hover .scroll-indicator-ball,
.scroll-indicator-pill:hover .scroll-indicator-ball::before,
.scroll-indicator-pill:hover .scroll-indicator-ball::after {
  background: var(--green-primary);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .scroll-indicator-ball,
  .scroll-indicator-ball::before,
  .scroll-indicator-ball::after {
    animation: none;
    bottom: 50%;
    opacity: 1;
  }
  
  .scroll-indicator-ball::before,
  .scroll-indicator-ball::after {
    display: none;
  }
}
```

---

## SECTION 3: PLACEMENT

### 3.1 Position

**Fixed, bottom-right corner** on all pages where used.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                        Building what's next.                                │
│                   [ ENGINEER → ENTREPRENEUR → BUILDER ]                     │
│                                                                             │
│                                                                             │
│   Omar Mohammed                                                             │
│   Syracuse University                                                       │
│                                                                       ┌───┐ │
│                                                                       │ ● │ │
│                                                                       └───┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS Position:**
```css
.scroll-indicator {
  position: fixed;
  bottom: 32px;  /* var(--space-8) */
  right: 32px;   /* var(--space-8) */
  z-index: 50;
}
```

### 3.2 Visibility

Because it's `position: fixed`, it's always visible in viewport — solves the project page visibility issue.

---

## SECTION 4: BEHAVIOR

### 4.1 Fade Out on Scroll

Hide once user has scrolled past the hero:

```javascript
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
  const heroHeight = document.querySelector('.hero')?.offsetHeight || 500;
  
  if (window.scrollY > heroHeight * 0.5) {
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.pointerEvents = 'none';
  } else {
    scrollIndicator.style.opacity = '1';
    scrollIndicator.style.pointerEvents = 'auto';
  }
});
```

### 4.2 Click to Scroll

```javascript
const scrollIndicator = document.querySelector('.scroll-indicator');

scrollIndicator?.addEventListener('click', () => {
  window.scrollBy({
    top: window.innerHeight * 0.8,
    behavior: 'smooth'
  });
});
```

---

## SECTION 5: FULL HTML

```html
<button class="scroll-indicator" aria-label="Scroll down">
  <div class="scroll-indicator-pill">
    <div class="scroll-indicator-ball"></div>
  </div>
</button>
```

---

## SECTION 6: ALTERNATIVE — CLEANER TRAIL WITH MULTIPLE ELEMENTS

If pseudo-elements get tricky, use explicit elements:

```html
<button class="scroll-indicator" aria-label="Scroll down">
  <div class="scroll-indicator-pill">
    <div class="scroll-ball scroll-ball-main"></div>
    <div class="scroll-ball scroll-ball-trail-1"></div>
    <div class="scroll-ball scroll-ball-trail-2"></div>
  </div>
</button>
```

```css
.scroll-indicator-pill {
  width: 24px;
  height: 44px;
  border: 2px solid var(--text-muted);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.scroll-ball {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: var(--text-primary);
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
  animation: scroll-up 1.5s ease-in-out infinite;
  animation-delay: 0.1s;
}

.scroll-ball-trail-2 {
  width: 3px;
  height: 3px;
  opacity: 0.25;
  animation: scroll-up 1.5s ease-in-out infinite;
  animation-delay: 0.2s;
}

@keyframes scroll-up {
  0% {
    bottom: 6px;
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    bottom: 30px;
    opacity: 0;
  }
}

/* Adjust opacity for trail balls */
.scroll-ball-trail-1 {
  animation-name: scroll-up-trail;
}

.scroll-ball-trail-2 {
  animation-name: scroll-up-trail-faint;
}

@keyframes scroll-up-trail {
  0% { bottom: 6px; opacity: 0; }
  15% { opacity: 0.5; }
  85% { opacity: 0.5; }
  100% { bottom: 30px; opacity: 0; }
}

@keyframes scroll-up-trail-faint {
  0% { bottom: 6px; opacity: 0; }
  15% { opacity: 0.25; }
  85% { opacity: 0.25; }
  100% { bottom: 30px; opacity: 0; }
}
```

---

## SECTION 7: ASTRO COMPONENT

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
  
  // Click to scroll
  indicator?.addEventListener('click', () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  });
  
  // Fade out after scrolling
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
    bottom: var(--space-8);
    right: var(--space-8);
    z-index: 50;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  .scroll-indicator-pill {
    width: 24px;
    height: 44px;
    border: 2px solid var(--text-muted);
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
    background: var(--text-primary);
    transition: background 0.2s ease;
  }

  .scroll-indicator:hover .scroll-ball {
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
    animation: scroll-up-trail 1.5s ease-in-out infinite;
    animation-delay: 0.1s;
  }

  .scroll-ball-trail-2 {
    width: 3px;
    height: 3px;
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

---

## SECTION 8: IMPLEMENTATION CHECKLIST

- [ ] Create ScrollIndicator component
- [ ] Position fixed, bottom-right (32px from edges)
- [ ] Ball moves bottom to top with trailing effect
- [ ] 3 balls: main (6px), trail 1 (4px, 50% opacity), trail 2 (3px, 25% opacity)
- [ ] Animation delays create trail effect
- [ ] Click scrolls page down 80% of viewport
- [ ] Fades out after scrolling past 40% of viewport height
- [ ] Hover state turns green
- [ ] Reduced motion: static ball, no trail
- [ ] Add to homepage
- [ ] Add to project pages

---

## SECTION 9: WHERE TO USE

| Page | Use |
|------|-----|
| Homepage | ✓ |
| Project detail pages | ✓ |
| About page | ✗ (short page) |
| Projects listing | Maybe |

---

*End of Scroll Indicator Specification v1.1*
