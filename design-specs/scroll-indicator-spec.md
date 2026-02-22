# Omar Mohammed Portfolio Website
## Scroll Indicator Component Specification

**Version:** 1.0  
**Last Updated:** February 2026  
**Status:** Ready to implement

---

## OVERVIEW

Animated scroll indicator pill with a ball that moves downward, signaling to users that the page has more content below. Used on landing page and project pages.

---

## SECTION 1: VISUAL DESIGN

### 1.1 Structure

```
    ┌─────┐
    │     │
    │  ●  │  ← ball animates from top to bottom
    │     │
    │     │
    └─────┘
```

### 1.2 Dimensions

| Property | Value |
|----------|-------|
| Pill width | 24px |
| Pill height | 40px |
| Border radius | 12px (fully rounded ends) |
| Border | 2px solid |
| Ball diameter | 6px |

### 1.3 Colors

| Element | Color |
|---------|-------|
| Pill border | `var(--text-muted)` or `var(--border)` |
| Pill background | Transparent |
| Ball | `var(--text-primary)` |

---

## SECTION 2: ANIMATION

### 2.1 Ball Movement

- Ball starts at top of pill
- Moves to bottom over 1.5 seconds
- Fades out at bottom
- Reappears at top
- Loops infinitely

### 2.2 Keyframes

```css
@keyframes scroll-indicator-bounce {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(20px);
    opacity: 0;
  }
}
```

---

## SECTION 3: PLACEMENT

### 3.1 Homepage (Hero Section)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                        Building what's next.                                │
│                   [ ENGINEER → ENTREPRENEUR → BUILDER ]                     │
│                                                                             │
│                                                                             │
│   Omar Mohammed                                                             │
│   Syracuse University                                                       │
│                                                                             │
│                              ┌─────┐                                        │
│                              │  ●  │                                        │
│                              └─────┘                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Position:** Bottom center of hero, ~32px from bottom edge

**Replaces:** The "See my work ↓" text (which we discussed removing)

### 3.2 Project Pages

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   Flood Detection Sensor PCB                                                │
│   CHaRTS Research Lab · Syracuse University · Summer 2025                   │
│                                                                             │
│   [ PCB Design ]  [ IoT ]  [ LoRaWAN ]                                      │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │                      [ 3D PCB Viewer ]                              │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                              ┌─────┐                                        │
│                              │  ●  │                                        │
│                              └─────┘                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Position:** Below hero image/3D viewer, centered, before Overview section

---

## SECTION 4: IMPLEMENTATION

### 4.1 HTML

```html
<div class="scroll-indicator" aria-hidden="true">
  <div class="scroll-indicator-pill">
    <div class="scroll-indicator-ball"></div>
  </div>
</div>
```

### 4.2 CSS

```css
.scroll-indicator {
  display: flex;
  justify-content: center;
  padding: var(--space-8) 0;
}

.scroll-indicator-pill {
  width: 24px;
  height: 40px;
  border: 2px solid var(--text-muted);
  border-radius: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.scroll-indicator-ball {
  width: 6px;
  height: 6px;
  background: var(--text-primary);
  border-radius: 50%;
  animation: scroll-indicator-bounce 1.5s ease-in-out infinite;
}

@keyframes scroll-indicator-bounce {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(20px);
    opacity: 0;
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .scroll-indicator-ball {
    animation: none;
  }
}
```

### 4.3 Optional: Click to Scroll

Make the indicator clickable to scroll to next section:

```html
<button class="scroll-indicator" aria-label="Scroll to content" onclick="scrollToContent()">
  <div class="scroll-indicator-pill">
    <div class="scroll-indicator-ball"></div>
  </div>
</button>
```

```css
.scroll-indicator {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-8);
}

.scroll-indicator:hover .scroll-indicator-pill {
  border-color: var(--green-primary);
}

.scroll-indicator:hover .scroll-indicator-ball {
  background: var(--green-primary);
}
```

```javascript
function scrollToContent() {
  const nextSection = document.querySelector('.about-preview'); // or whatever comes next
  nextSection?.scrollIntoView({ behavior: 'smooth' });
}
```

### 4.4 Optional: Fade Out on Scroll

Hide indicator once user has scrolled:

```javascript
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.pointerEvents = 'none';
  } else {
    scrollIndicator.style.opacity = '1';
    scrollIndicator.style.pointerEvents = 'auto';
  }
});
```

```css
.scroll-indicator {
  transition: opacity 0.3s ease;
}
```

---

## SECTION 5: ASTRO COMPONENT

```astro
---
// ScrollIndicator.astro
interface Props {
  targetSelector?: string;
}

const { targetSelector } = Astro.props;
---

<button 
  class="scroll-indicator" 
  aria-label="Scroll to content"
  data-target={targetSelector}
>
  <div class="scroll-indicator-pill">
    <div class="scroll-indicator-ball"></div>
  </div>
</button>

<script>
  const indicator = document.querySelector('.scroll-indicator');
  const target = indicator?.getAttribute('data-target');
  
  indicator?.addEventListener('click', () => {
    const nextSection = target 
      ? document.querySelector(target) 
      : indicator.nextElementSibling;
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  });
  
  // Fade out on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      indicator.style.opacity = '0';
    } else {
      indicator.style.opacity = '1';
    }
  });
</script>

<style>
  .scroll-indicator {
    display: flex;
    justify-content: center;
    padding: var(--space-8) 0;
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    transition: opacity 0.3s ease;
  }

  .scroll-indicator-pill {
    width: 24px;
    height: 40px;
    border: 2px solid var(--text-muted);
    border-radius: 12px;
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 6px;
    transition: border-color 0.2s ease;
  }

  .scroll-indicator:hover .scroll-indicator-pill {
    border-color: var(--green-primary);
  }

  .scroll-indicator-ball {
    width: 6px;
    height: 6px;
    background: var(--text-primary);
    border-radius: 50%;
    animation: scroll-indicator-bounce 1.5s ease-in-out infinite;
    transition: background 0.2s ease;
  }

  .scroll-indicator:hover .scroll-indicator-ball {
    background: var(--green-primary);
  }

  @keyframes scroll-indicator-bounce {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(20px);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scroll-indicator-ball {
      animation: none;
    }
  }
</style>
```

### Usage

```astro
<!-- Homepage hero -->
<HeroSection />
<ScrollIndicator targetSelector=".about-preview" />
<AboutPreview />

<!-- Project page -->
<ProjectHeader />
<PCBViewer />
<ScrollIndicator targetSelector=".project-overview" />
<ProjectOverview />
```

---

## SECTION 6: WHERE TO USE

| Page | Use | Target Section |
|------|-----|----------------|
| Homepage | ✓ | `.about-preview` |
| About page | ✗ | Not needed (short page) |
| Projects listing | Maybe | `.projects-grid` |
| Project detail pages | ✓ | `.project-overview` |

---

## SECTION 7: IMPLEMENTATION CHECKLIST

- [ ] Create ScrollIndicator component
- [ ] Add to homepage hero (bottom center)
- [ ] Add to each project page (below hero/3D viewer)
- [ ] Test animation smoothness
- [ ] Test click-to-scroll functionality
- [ ] Test fade-out on scroll
- [ ] Verify reduced motion fallback
- [ ] Test hover state (green highlight)

---

*End of Scroll Indicator Specification*
