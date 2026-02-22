# Omar Mohammed Portfolio Website
## Design Specification — Version 5.1

**Version:** 5.1  
**Last Updated:** February 2026  
**Status:** FIX — Mobile Navigation (Corrected Approach)

---

## OVERVIEW

v5 mobile nav failed:
- Logo disappeared on desktop
- Hamburger showed alongside regular nav on mobile
- Overlay was transparent and positioned wrong

This spec uses a **simpler, battle-tested approach** with explicit visibility controls.

---

## SECTION 1: CORE PRINCIPLES

### 1.1 What Went Wrong

1. **CSS specificity conflicts** - media queries fighting with base styles
2. **Shared elements** - logo was nested incorrectly
3. **Overlay positioning** - fixed positioning without proper top offset

### 1.2 New Approach

- **Two completely separate navs** - desktop and mobile are distinct elements
- **Explicit visibility classes** - `!important` overrides in media queries
- **Slide-in drawer** instead of full overlay (more predictable)
- **CSS variables** for consistent values
- **Separate logo elements** for each nav

---

## SECTION 2: HTML STRUCTURE

### 2.1 Clean Separation

```html
<header class="site-header">
  <!-- DESKTOP NAV - hidden on mobile -->
  <nav class="nav-desktop">
    <a href="/" class="nav-logo">
      <img src="/images/logo.svg" alt="Omar Mohammed" />
    </a>
    
    <div class="nav-links">
      <a href="/about">About</a>
      <a href="/projects">Projects</a>
      <a href="/resume" class="btn-outline">Resume</a>
    </div>
    
    <div class="nav-actions">
      <a href="https://github.com/ofmohamm" aria-label="GitHub">
        <!-- GitHub icon -->
      </a>
      <a href="https://linkedin.com/in/ofmohammed" aria-label="LinkedIn">
        <!-- LinkedIn icon -->
      </a>
      <a href="/contact" class="btn-primary">Let's talk</a>
    </div>
  </nav>

  <!-- MOBILE NAV - hidden on desktop -->
  <nav class="nav-mobile">
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <a href="/" class="nav-logo-mobile">
      <img src="/images/logo.svg" alt="Omar Mohammed" />
    </a>
    
    <!-- Empty spacer for centering -->
    <div class="nav-spacer"></div>
  </nav>

  <!-- MOBILE DRAWER - slides in from left -->
  <div class="mobile-drawer" id="mobileDrawer">
    <div class="drawer-content">
      <a href="/about">About</a>
      <a href="/projects">Projects</a>
      <a href="/resume">Resume</a>
      <hr />
      <a href="https://github.com/ofmohamm">GitHub</a>
      <a href="https://linkedin.com/in/ofmohammed">LinkedIn</a>
      <a href="/contact" class="btn-primary">Let's talk</a>
    </div>
  </div>
  
  <!-- BACKDROP - darkens page when drawer open -->
  <div class="mobile-backdrop" id="mobileBackdrop"></div>
</header>
```

---

## SECTION 3: CSS

### 3.1 CSS Variables

```css
:root {
  --header-height: 64px;
  --header-height-mobile: 56px;
  --header-bg: rgba(250, 249, 246, 0.95);
  --green-primary: #2E5339;
  --text-primary: #1a1a1a;
  --drawer-width: 280px;
  --z-header: 100;
  --z-drawer: 200;
  --z-backdrop: 150;
}
```

### 3.2 Header Base

```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-header);
  background: var(--header-bg);
  backdrop-filter: blur(8px);
}
```

### 3.3 Desktop Nav (Default)

```css
/* Desktop nav - visible by default */
.nav-desktop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-desktop .nav-logo img {
  height: 36px;
  width: auto;
}

.nav-desktop .nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-desktop .nav-links a {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
}

.nav-desktop .nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Mobile nav - hidden by default */
.nav-mobile {
  display: none;
}

/* Drawer - hidden by default */
.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--drawer-width);
  background: #FAF9F6;
  z-index: var(--z-drawer);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
}

.mobile-drawer.is-open {
  transform: translateX(0);
}

/* Backdrop - hidden by default */
.mobile-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--z-backdrop);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-backdrop.is-open {
  opacity: 1;
  visibility: visible;
}
```

### 3.4 Mobile Styles (Media Query)

```css
@media (max-width: 768px) {
  /* Hide desktop nav completely */
  .nav-desktop {
    display: none !important;
  }

  /* Show mobile nav */
  .nav-mobile {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height-mobile);
    padding: 0 16px;
  }

  /* Hamburger button */
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: calc(var(--z-drawer) + 1);
    position: relative;
  }

  .hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--text-primary);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  /* Hamburger X animation */
  .hamburger.is-open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .hamburger.is-open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.is-open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  /* Mobile logo - centered */
  .nav-logo-mobile {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .nav-logo-mobile img {
    height: 28px;
    width: auto;
  }

  /* Spacer for flex alignment */
  .nav-spacer {
    width: 40px;
  }

  /* Drawer content */
  .drawer-content {
    display: flex;
    flex-direction: column;
    padding: 80px 24px 24px;
    gap: 0;
  }

  .drawer-content a {
    display: block;
    padding: 16px 0;
    color: var(--text-primary);
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #eee;
  }

  .drawer-content a:last-child {
    border-bottom: none;
  }

  .drawer-content hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 16px 0;
  }

  .drawer-content .btn-primary {
    background: var(--green-primary);
    color: #fff;
    text-align: center;
    padding: 14px 24px;
    border-radius: 8px;
    margin-top: 16px;
    border-bottom: none;
  }
}
```

---

## SECTION 4: JAVASCRIPT

### 4.1 Simple Toggle Script

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  
  if (!hamburger || !drawer || !backdrop) return;

  function openMenu() {
    hamburger.classList.add('is-open');
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (drawer.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Toggle on hamburger click
  hamburger.addEventListener('click', toggleMenu);

  // Close on backdrop click
  backdrop.addEventListener('click', closeMenu);

  // Close on link click inside drawer
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close on window resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
});
```

---

## SECTION 5: KEY FIXES

| Issue | v5 (Failed) | v5.1 (Fixed) |
|-------|-------------|--------------|
| Structure | Single nav with show/hide | Two separate navs |
| Logo | Shared between modes | Separate logo elements |
| Mobile menu | Full-screen overlay | Slide-in drawer from left |
| Visibility | Media query only | `!important` overrides |
| Backdrop | Part of overlay | Separate element |
| Z-index | Implicit | Explicit CSS variables |
| Selector targeting | Classes | IDs for JS |

---

## SECTION 6: IMPLEMENTATION CHECKLIST

### HTML
- [ ] Create separate `.nav-desktop` and `.nav-mobile` elements
- [ ] Add separate logo img in each nav (not shared)
- [ ] Add `.mobile-drawer` outside both navs
- [ ] Add `.mobile-backdrop` as separate element
- [ ] Use IDs: `hamburger`, `mobileDrawer`, `mobileBackdrop`

### CSS
- [ ] Define CSS variables for heights and z-index
- [ ] Desktop nav: `display: flex` by default
- [ ] Mobile nav: `display: none` by default
- [ ] Media query uses `!important` for display overrides
- [ ] Drawer uses `transform: translateX(-100%)` not opacity
- [ ] Backdrop is separate element with own z-index

### JavaScript
- [ ] Use `getElementById` (not querySelector for classes)
- [ ] Check elements exist before adding listeners
- [ ] Toggle `.is-open` on all three elements
- [ ] Lock body scroll when open
- [ ] Close on resize to desktop width

### Testing
- [ ] Desktop: Logo visible, full nav visible, no hamburger
- [ ] Mobile: Only hamburger + centered logo visible
- [ ] Drawer slides in from left (not overlay)
- [ ] Backdrop darkens rest of page
- [ ] All close triggers work

---

*End of Version 5.1 Specification*
