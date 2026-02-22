# Omar Mohammed Portfolio Website
## Design Specification — Version 5.2

**Version:** 5.2  
**Last Updated:** February 2026  
**Status:** UPDATE — Solid Navbar, Icons, Full-Screen Mobile Menu

---

## OVERVIEW

Updates from v5.1:

1. **Solid navbar** - No more transparency/blur
2. **GitHub & LinkedIn icons** - Logos next to text in mobile menu
3. **Full-screen mobile menu** - Takes up entire page (not drawer)
4. **"Let's talk" in green box** - Styled CTA button in mobile menu
5. **Links redirect on click** - Navigate to page and close menu

---

## SECTION 1: CHANGES FROM v5.1

| Element | v5.1 | v5.2 |
|---------|------|------|
| Header background | `rgba(250, 249, 246, 0.95)` + blur | Solid `#FAF9F6` |
| Mobile menu | Slide-in drawer (280px) | Full-screen overlay |
| GitHub/LinkedIn | Text only | Icon + text |
| Let's talk (mobile) | Text link | Green button |

---

## SECTION 2: HTML STRUCTURE

### 2.1 Updated Header

```html
<header class="site-header">
  <!-- DESKTOP NAV -->
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
      <a href="https://github.com/ofmohamm" aria-label="GitHub" class="nav-icon-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>
      <a href="https://linkedin.com/in/ofmohammed" aria-label="LinkedIn" class="nav-icon-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </a>
      <a href="/contact" class="btn-primary">Let's talk</a>
    </div>
  </nav>

  <!-- MOBILE NAV BAR -->
  <nav class="nav-mobile">
    <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <a href="/" class="nav-logo-mobile">
      <img src="/images/logo.svg" alt="Omar Mohammed" />
    </a>
    
    <div class="nav-spacer"></div>
  </nav>

  <!-- MOBILE FULL-SCREEN MENU -->
  <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
    <nav class="mobile-menu-content">
      <a href="/about">About</a>
      <a href="/projects">Projects</a>
      <a href="/resume">Resume</a>
      
      <div class="mobile-menu-divider"></div>
      
      <a href="https://github.com/ofmohamm" class="mobile-menu-icon-link">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub
      </a>
      
      <a href="https://linkedin.com/in/ofmohammed" class="mobile-menu-icon-link">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
        LinkedIn
      </a>
      
      <a href="/contact" class="mobile-menu-cta">Let's talk</a>
    </nav>
  </div>
</header>
```

---

## SECTION 3: CSS

### 3.1 CSS Variables

```css
:root {
  --header-height: 64px;
  --header-height-mobile: 56px;
  --header-bg: #FAF9F6;  /* Solid - no transparency */
  --green-primary: #2E5339;
  --text-primary: #1a1a1a;
  --text-secondary: #666;
  --z-header: 100;
  --z-menu: 200;
}
```

### 3.2 Header Base (Solid Background)

```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-header);
  background: var(--header-bg);  /* Solid color */
  /* No backdrop-filter */
}
```

### 3.3 Desktop Nav

```css
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
  transition: color 0.2s ease;
}

.nav-desktop .nav-links a:hover {
  color: var(--green-primary);
}

.nav-desktop .nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Icon links (GitHub, LinkedIn) */
.nav-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--text-primary);
  transition: color 0.2s ease;
}

.nav-icon-link:hover {
  color: var(--green-primary);
}

.nav-icon-link svg {
  width: 20px;
  height: 20px;
}

/* Primary button */
.btn-primary {
  background: var(--green-primary);
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: #243f2c;
}

/* Outline button */
.btn-outline {
  border: 1px solid var(--text-primary);
  padding: 8px 16px;
  border-radius: 8px;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.btn-outline:hover {
  border-color: var(--green-primary);
  color: var(--green-primary);
}

/* Mobile nav - hidden by default */
.nav-mobile {
  display: none;
}

/* Mobile menu - hidden by default */
.mobile-menu {
  display: none;
}
```

### 3.4 Mobile Styles

```css
@media (max-width: 768px) {
  /* Hide desktop nav */
  .nav-desktop {
    display: none !important;
  }

  /* Show mobile nav bar */
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
    z-index: calc(var(--z-menu) + 1);
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

  /* Hamburger to X animation */
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

  /* ================================
     FULL-SCREEN MOBILE MENU
     ================================ */
  .mobile-menu {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--header-bg);
    z-index: var(--z-menu);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  .mobile-menu.is-open {
    opacity: 1;
    visibility: visible;
  }

  /* Menu content - centered vertically and horizontally */
  .mobile-menu-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 24px;
    padding: 24px;
  }

  /* Menu links */
  .mobile-menu-content > a {
    color: var(--text-primary);
    text-decoration: none;
    font-size: 28px;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  .mobile-menu-content > a:hover {
    color: var(--green-primary);
  }

  /* Divider */
  .mobile-menu-divider {
    width: 60px;
    height: 1px;
    background: #ddd;
    margin: 8px 0;
  }

  /* Icon links (GitHub, LinkedIn) */
  .mobile-menu-icon-link {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text-primary);
    text-decoration: none;
    font-size: 20px;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .mobile-menu-icon-link:hover {
    color: var(--green-primary);
  }

  .mobile-menu-icon-link svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  /* CTA Button - Green box */
  .mobile-menu-cta {
    display: inline-block;
    background: var(--green-primary);
    color: #fff !important;
    padding: 16px 48px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    margin-top: 16px;
    transition: background 0.2s ease;
  }

  .mobile-menu-cta:hover {
    background: #243f2c;
  }
}
```

---

## SECTION 4: JAVASCRIPT

### 4.1 Toggle Script

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  
  if (!hamburger || !menu) return;

  function openMenu() {
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Toggle on hamburger click
  hamburger.addEventListener('click', toggleMenu);

  // Close menu and navigate when link clicked
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
      // Navigation happens automatically via href
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});
```

---

## SECTION 5: VISUAL REFERENCE

### Desktop Nav
```
┌──────────────────────────────────────────────────────────────┐
│ [Logo]         About   Projects   Resume    [GH][LI] [Let's talk] │
└──────────────────────────────────────────────────────────────┘
     │              │                          │        │
     │              │                          │        └── Green button
     │              │                          └── Icon buttons
     │              └── Text links
     └── Logo (36px)
```

### Mobile Nav Bar (Closed)
```
┌────────────────────────────────────────┐
│ ☰              [Logo]                  │
└────────────────────────────────────────┘
```

### Mobile Menu (Open - Full Screen)
```
┌────────────────────────────────────────┐
│ ✕              [Logo]                  │  ← Header still visible
├────────────────────────────────────────┤
│                                        │
│              About                     │
│                                        │
│              Projects                  │
│                                        │
│              Resume                    │
│                                        │
│              ─────                     │
│                                        │
│         [GH] GitHub                    │
│                                        │
│         [LI] LinkedIn                  │
│                                        │
│        ┌────────────────┐              │
│        │   Let's talk   │              │  ← Green box
│        └────────────────┘              │
│                                        │
└────────────────────────────────────────┘
```

---

## SECTION 6: IMPLEMENTATION CHECKLIST

### HTML
- [ ] Add SVG icons for GitHub and LinkedIn in desktop nav
- [ ] Add SVG icons + text for GitHub and LinkedIn in mobile menu
- [ ] "Let's talk" has class `mobile-menu-cta` in mobile menu
- [ ] Mobile menu uses `id="mobileMenu"`
- [ ] All links have proper `href` attributes

### CSS
- [ ] Remove `backdrop-filter` from header
- [ ] Set header background to solid `#FAF9F6`
- [ ] `.mobile-menu` is full-screen (`position: fixed; inset: 0`)
- [ ] `.mobile-menu-icon-link` has flex with gap for icon + text
- [ ] `.mobile-menu-cta` has green background, white text, padding

### JavaScript
- [ ] Close menu when any link is clicked
- [ ] Navigation happens via `href` (no manual redirect needed)
- [ ] Body scroll locked when menu open

### Testing
- [ ] Desktop: Solid header, no transparency
- [ ] Desktop: GitHub/LinkedIn show as icon-only buttons
- [ ] Mobile: Menu covers entire screen when open
- [ ] Mobile: GitHub/LinkedIn show icon + text
- [ ] Mobile: "Let's talk" is green button
- [ ] Mobile: Clicking any link closes menu and navigates

---

*End of Version 5.2 Specification*
