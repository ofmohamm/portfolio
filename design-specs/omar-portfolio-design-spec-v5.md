# Omar Mohammed Portfolio Website
## Design Specification — Version 5

**Version:** 5  
**Last Updated:** February 2026  
**Status:** UPDATE — Mobile Navigation

---

## OVERVIEW

The desktop header breaks on mobile. This spec implements a responsive mobile navigation with:

1. **Hamburger icon** (3 lines) on the left
2. **Centered logo**
3. **Slide-out or overlay menu** for nav links

---

## SECTION 1: MOBILE NAV STRUCTURE

### 1.1 Breakpoint

```css
@media (max-width: 768px) {
  /* Mobile nav styles */
}
```

### 1.2 Layout

```
┌─────────────────────────────────────┐
│  ☰        Omar Mohammed             │  ← Mobile header
└─────────────────────────────────────┘
     │              │
     │              └── Centered logo
     └── Hamburger menu (3 lines)
```

When menu is open:

```
┌─────────────────────────────────────┐
│  ✕        Omar Mohammed             │  ← X to close
├─────────────────────────────────────┤
│                                     │
│            About                    │
│            Projects                 │
│            Resume                   │
│                                     │
│            ─────────                │
│                                     │
│            GitHub                   │
│            LinkedIn                 │
│            Let's talk               │
│                                     │
└─────────────────────────────────────┘
```

---

## SECTION 2: HTML STRUCTURE

### 2.1 Mobile Nav HTML

```html
<header class="nav-header">
  <!-- Hamburger button (mobile only) -->
  <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false">
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  </button>

  <!-- Logo (always visible, centered on mobile) -->
  <a href="/" class="nav-logo">
    <img src="/images/logo.svg" alt="Omar Mohammed" />
  </a>

  <!-- Desktop nav (hidden on mobile) -->
  <nav class="nav-desktop">
    <a href="/about">About</a>
    <a href="/projects">Projects</a>
    <a href="/resume" class="nav-btn-outline">Resume</a>
    <a href="https://github.com/ofmohamm" class="nav-icon">GitHub</a>
    <a href="https://linkedin.com/in/ofmohammed" class="nav-icon">LinkedIn</a>
    <a href="/contact" class="nav-btn-primary">Let's talk</a>
  </nav>

  <!-- Mobile menu overlay -->
  <div class="nav-mobile-overlay" aria-hidden="true">
    <nav class="nav-mobile">
      <a href="/about">About</a>
      <a href="/projects">Projects</a>
      <a href="/resume">Resume</a>
      <div class="nav-mobile-divider"></div>
      <a href="https://github.com/ofmohamm">GitHub</a>
      <a href="https://linkedin.com/in/ofmohammed">LinkedIn</a>
      <a href="/contact" class="nav-mobile-cta">Let's talk</a>
    </nav>
  </div>
</header>
```

---

## SECTION 3: CSS

### 3.1 Desktop Header (Default)

```css
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(250, 249, 246, 0.95);
  backdrop-filter: blur(8px);
  z-index: 1000;
}

.nav-hamburger {
  display: none;  /* Hidden on desktop */
}

.nav-logo img {
  height: 36px;
  width: auto;
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-mobile-overlay {
  display: none;  /* Hidden on desktop */
}
```

### 3.2 Mobile Header

```css
@media (max-width: 768px) {
  .nav-header {
    justify-content: center;  /* Center logo */
    padding: 12px 16px;
  }

  /* Hamburger - positioned left */
  .nav-hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    position: absolute;
    left: 16px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 1001;
  }

  .hamburger-line {
    width: 24px;
    height: 2px;
    background: var(--text-primary, #1a1a1a);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  /* Hamburger animation when open */
  .nav-hamburger.is-open .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .nav-hamburger.is-open .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .nav-hamburger.is-open .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  /* Logo - centered */
  .nav-logo {
    position: relative;
    z-index: 1001;
  }

  .nav-logo img {
    height: 32px;  /* Slightly smaller on mobile */
  }

  /* Hide desktop nav */
  .nav-desktop {
    display: none;
  }

  /* Mobile overlay */
  .nav-mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(250, 249, 246, 0.98);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 999;
  }

  .nav-mobile-overlay.is-open {
    opacity: 1;
    visibility: visible;
  }

  /* Mobile nav links */
  .nav-mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 24px;
    padding: 80px 24px 24px;
  }

  .nav-mobile a {
    font-size: 24px;
    font-weight: 500;
    color: var(--text-primary, #1a1a1a);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .nav-mobile a:hover {
    color: var(--green-primary, #2E5339);
  }

  .nav-mobile-divider {
    width: 40px;
    height: 1px;
    background: #E5E5EA;
    margin: 8px 0;
  }

  .nav-mobile-cta {
    background: var(--green-primary, #2E5339);
    color: #ffffff !important;
    padding: 12px 32px;
    border-radius: 8px;
    margin-top: 16px;
  }
}
```

---

## SECTION 4: JAVASCRIPT

### 4.1 Toggle Menu

```javascript
const hamburger = document.querySelector('.nav-hamburger');
const overlay = document.querySelector('.nav-mobile-overlay');
const body = document.body;

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('is-open');
  overlay.classList.toggle('is-open');
  hamburger.setAttribute('aria-expanded', isOpen);
  overlay.setAttribute('aria-hidden', !isOpen);
  
  // Prevent body scroll when menu is open
  body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when clicking a link
overlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('is-open');
    overlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
    hamburger.classList.remove('is-open');
    overlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  }
});
```

---

## SECTION 5: ACCESSIBILITY

### 5.1 Requirements

- `aria-label` on hamburger button
- `aria-expanded` toggles with menu state
- `aria-hidden` on overlay toggles with menu state
- Escape key closes menu
- Focus trap inside menu when open (optional enhancement)

### 5.2 Focus Management (Optional)

```javascript
// Optional: trap focus in mobile menu
const focusableElements = overlay.querySelectorAll('a, button');
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

overlay.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  }
});
```

---

## SECTION 6: IMPLEMENTATION CHECKLIST

### HTML
- [ ] Add hamburger button with 3 span lines
- [ ] Ensure logo is separate from nav-desktop
- [ ] Add mobile overlay div with nav-mobile inside
- [ ] Add aria attributes

### CSS
- [ ] Hide hamburger on desktop
- [ ] Show hamburger on mobile (left positioned)
- [ ] Center logo on mobile
- [ ] Hide desktop nav on mobile
- [ ] Style mobile overlay (full screen, centered links)
- [ ] Add hamburger animation (3 lines to X)
- [ ] Add overlay fade transition

### JavaScript
- [ ] Toggle menu open/close on hamburger click
- [ ] Toggle body overflow (prevent scroll)
- [ ] Close menu on link click
- [ ] Close menu on Escape key
- [ ] Update aria attributes on toggle

### Testing
- [ ] Test on actual mobile device
- [ ] Test hamburger animation
- [ ] Test overlay appears/disappears smoothly
- [ ] Test all links work and close menu
- [ ] Test Escape key closes menu
- [ ] Test body doesn't scroll when menu open

---

## SECTION 7: VISUAL REFERENCE

### Closed State
```
┌────────────────────────────────────────┐
│ ☰              Omar Mohammed           │
└────────────────────────────────────────┘
```

### Open State
```
┌────────────────────────────────────────┐
│ ✕              Omar Mohammed           │
│                                        │
│               About                    │
│               Projects                 │
│               Resume                   │
│               ────                     │
│               GitHub                   │
│               LinkedIn                 │
│            ┌──────────┐                │
│            │Let's talk│                │
│            └──────────┘                │
└────────────────────────────────────────┘
```

---

*End of Version 5 Specification*
