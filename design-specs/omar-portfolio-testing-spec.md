# Omar Mohammed Portfolio Website
## Testing & Verification Specification

**Version:** 1.0  
**Last Updated:** February 2026  
**Purpose:** Pre-deployment testing checklist for Claude Code

---

## OVERVIEW

This document provides a comprehensive testing specification to verify the portfolio website is ready for deployment. Run all tests before pushing to production.

---

## SECTION 1: ENVIRONMENT SETUP

### 1.1 Prerequisites

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 1.2 Test Browsers

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 1.3 Test Viewports

| Device | Width | Height |
|--------|-------|--------|
| Mobile S | 320px | 568px |
| Mobile M | 375px | 667px |
| Mobile L | 425px | 812px |
| Tablet | 768px | 1024px |
| Laptop | 1024px | 768px |
| Desktop | 1440px | 900px |
| Large Desktop | 1920px | 1080px |

---

## SECTION 2: VISUAL VERIFICATION

### 2.1 Color Palette

Verify these colors are used correctly throughout:

| Element | Expected Color | Hex |
|---------|----------------|-----|
| Background | Warm white | `#FAF9F6` or `rgb(243,241,237)` |
| Text primary | Charcoal | `#1a1a1a` |
| Text secondary | Gray | `#666666` |
| Green accent | Forest green | `#2E5339` |
| Card background | Warm gray | `#F3F1ED` |

**Tests:**
- [ ] Hero background is warm white
- [ ] Body text is charcoal
- [ ] ENGINEER text is green (#2E5339)
- [ ] Links/accents use green
- [ ] Project card backgrounds are #F3F1ED

### 2.2 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Logo | Playfair Display Italic | -- | -- |
| Tagline | Playfair Display | 80px (desktop) | Regular |
| Role text | Geist Mono | 28px | Regular |
| Body | Geist Sans / System | 16px | Regular |
| Nav links | Geist Sans | 14-16px | Medium |

**Tests:**
- [ ] Logo displays in Playfair Display Italic
- [ ] "Building what's next." is serif (Playfair Display)
- [ ] ENGINEER is monospace (Geist Mono)
- [ ] Fonts load without FOUT/FOIT flash

### 2.3 Logo

**Tests:**
- [ ] Logo displays at correct size (h-6 or h-7)
- [ ] Logo text is NOT cut off at bottom
- [ ] Logo is fully readable
- [ ] Hover effect works (green glow + lift)
- [ ] Logo links to home page

---

## SECTION 3: NAVIGATION

### 3.1 Desktop Navigation

**Tests:**
- [ ] Logo links to `/`
- [ ] "About" link works
- [ ] "Projects" link works
- [ ] "Resume" button works (opens PDF or link)
- [ ] GitHub icon links to github.com/ofmohamm
- [ ] LinkedIn icon links to linkedin.com/in/ofmohammed
- [ ] "Let's talk" button works (mailto or contact)
- [ ] Nav is sticky/fixed on scroll
- [ ] Nav has correct background on scroll

### 3.2 Mobile Navigation

**Tests:**
- [ ] Hamburger menu appears on mobile (<768px)
- [ ] Menu opens on tap
- [ ] Menu closes on tap outside
- [ ] All nav links work in mobile menu
- [ ] Menu closes after link click

### 3.3 Smooth Scroll

**Tests:**
- [ ] Clicking "About" smoothly scrolls to About section
- [ ] Clicking "Projects" smoothly scrolls to Projects section
- [ ] Anchor links work correctly
- [ ] Scroll offset accounts for sticky nav height

---

## SECTION 4: HERO SECTION

### 4.1 Content

**Tests:**
- [ ] "Building what's next." displays correctly
- [ ] Tagline is 80px on desktop, scales down on mobile
- [ ] Cursor/bullet appears before ENGINEER
- [ ] ENGINEER text is green (#2E5339)

### 4.2 Word Morphing Animation

**Tests:**
- [ ] Text morphs: ENGINEER → ENTREPRENEUR → BUILDER
- [ ] Morphing animation is smooth
- [ ] Timing feels natural (2-3 seconds per word)
- [ ] Animation loops infinitely

### 4.3 Particle Background

**Tests:**
- [ ] Particles render on canvas
- [ ] Particles have ambient drift motion (always moving)
- [ ] Mouse interaction repels particles
- [ ] Connection lines appear between nearby particles
- [ ] Particles wrap around edges (not spring-return)
- [ ] Performance is smooth (no jank)
- [ ] Particles don't block text interaction

---

## SECTION 5: ABOUT PREVIEW SECTION

### 5.1 Layout

**Tests:**
- [ ] Section does NOT have excessive whitespace below
- [ ] Content flows naturally into Projects section
- [ ] Padding is reasonable (~64px top/bottom)
- [ ] "Hi, I'm Omar" heading displays correctly

### 5.2 Content

**Tests:**
- [ ] About text is readable
- [ ] Any links in About section work
- [ ] Image (if present) loads correctly

---

## SECTION 6: PROJECTS SECTION

### 6.1 Project Grid

**Tests:**
- [ ] Grid displays 3 columns on desktop
- [ ] Grid displays 2 columns on tablet
- [ ] Grid displays 1 column on mobile
- [ ] Gap between cards is consistent

### 6.2 Project Cards

#### Elevator Control System
- [ ] Image loads (`/images/projects/elevator.png`)
- [ ] Title: "Elevator Control System"
- [ ] Tags: "Embedded · ATSAMD21 · Register-Level"
- [ ] Card links to `/projects/elevator`
- [ ] Hover: card lifts (-translate-y-2) + shadow
- [ ] Hover: image scales (scale-105)

#### 4-Bit CPU Architecture
- [ ] Image loads (`/images/projects/chip.png`)
- [ ] Image background blends with card (#F3F1ED)
- [ ] Title: "4-Bit CPU Architecture"
- [ ] Tags: "VHDL · FPGA · Digital Design"
- [ ] Card links to `/projects/cpu`
- [ ] Hover: card lifts + shadow
- [ ] Hover: image scales (pop effect)

#### Bluetooth Messaging System
- [ ] Image loads (`/images/projects/bluetooth-bubbles.png`)
- [ ] Image background blends with card (#F3F1ED)
- [ ] Title: "Bluetooth Messaging System"
- [ ] Tags: "Embedded · Arduino · Bluetooth"
- [ ] Card links to `/projects/bluetooth`
- [ ] Hover: card lifts + shadow
- [ ] Hover: image wiggles (wiggle animation)

### 6.3 Hover Effects

**Tests:**
- [ ] Pop effect works on Elevator card
- [ ] Pop effect works on CPU card
- [ ] Wiggle effect works on Bluetooth card
- [ ] All effects have smooth transitions
- [ ] Effects don't cause layout shift

---

## SECTION 7: PROJECT PAGES

### 7.1 Elevator Control System (`/projects/elevator`)

**Tests:**
- [ ] Page loads without errors
- [ ] Title: "Elevator Control System"
- [ ] Subtitle: "Syracuse University · Oct. 2025"
- [ ] Tags display correctly
- [ ] Hero image loads and displays
- [ ] Hero image max-height is 60vh
- [ ] Overview text is correct
- [ ] Tools section present
- [ ] Tech Specs section present
- [ ] Back link works ("← Back to Projects")

### 7.2 4-Bit CPU Architecture (`/projects/cpu`)

**Tests:**
- [ ] Page loads without errors
- [ ] Title: "4-Bit CPU Architecture"
- [ ] Subtitle: "Syracuse University · Spring 2025"
- [ ] Tags: VHDL, FPGA, Digital Design
- [ ] Hero image loads (chip.png)
- [ ] Overview paragraph 1: "Designed a working 4-bit processor..."
- [ ] Overview paragraph 2: "Adding two numbers... This project helped me realize chip design was something I could see myself pursuing as a career."
- [ ] Tools: Intel Quartus, VHDL
- [ ] Tech Specs display correctly
- [ ] Back link works

### 7.3 Bluetooth Messaging System (`/projects/bluetooth`)

**Tests:**
- [ ] Page loads without errors
- [ ] Title: "Bluetooth Messaging System"
- [ ] Subtitle: "Syracuse University · Fall 2025"
- [ ] Tags: Embedded, Arduino, Bluetooth
- [ ] Hero image loads (bluetooth-bubbles.png)
- [ ] Overview paragraph 1: "Built a wireless messaging device..."
- [ ] Overview paragraph 2: "Simple idea, surprisingly tricky..."
- [ ] Tools: Arduino IDE, C
- [ ] Tech Specs display correctly
- [ ] Back link works

---

## SECTION 8: RESPONSIVE TESTING

### 8.1 Mobile (320px - 767px)

**Tests:**
- [ ] Logo is visible and not cut off
- [ ] Hamburger menu appears
- [ ] Hero tagline scales down appropriately
- [ ] ENGINEER text is readable
- [ ] Project cards stack vertically
- [ ] All text is readable without horizontal scroll
- [ ] Tap targets are at least 44x44px
- [ ] No horizontal overflow

### 8.2 Tablet (768px - 1023px)

**Tests:**
- [ ] Navigation adapts correctly
- [ ] Project grid shows 2 columns
- [ ] Hero scales appropriately
- [ ] Content has proper padding

### 8.3 Desktop (1024px+)

**Tests:**
- [ ] Full navigation displays
- [ ] Project grid shows 3 columns
- [ ] Hero at full size
- [ ] Max-width containers work correctly

---

## SECTION 9: ACCESSIBILITY

### 9.1 Keyboard Navigation

**Tests:**
- [ ] Can tab through all interactive elements
- [ ] Focus states are visible
- [ ] Skip link present (if applicable)
- [ ] No keyboard traps
- [ ] Enter/Space activates buttons and links

### 9.2 Screen Reader

**Tests:**
- [ ] All images have alt text
- [ ] Logo img has alt="Omar Mohammed"
- [ ] Project images have descriptive alt text
- [ ] Headings are in correct hierarchy (h1 → h2 → h3)
- [ ] Links have descriptive text
- [ ] ARIA labels where needed

### 9.3 Color Contrast

**Tests:**
- [ ] Text contrast ratio ≥ 4.5:1 (normal text)
- [ ] Text contrast ratio ≥ 3:1 (large text)
- [ ] Green (#2E5339) on white passes contrast
- [ ] Gray text on white passes contrast

### 9.4 Motion

**Tests:**
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Particle animation disables with reduced motion
- [ ] Morphing text has fallback
- [ ] Hover effects still work (no motion, just state change)

---

## SECTION 10: PERFORMANCE

### 10.1 Lighthouse Scores (Target: 90+)

**Tests:**
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 90

### 10.2 Core Web Vitals

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |

**Tests:**
- [ ] LCP is under 2.5 seconds
- [ ] No layout shifts on load
- [ ] Interactions are responsive

### 10.3 Assets

**Tests:**
- [ ] Images are optimized (WebP or compressed PNG)
- [ ] Images are appropriately sized (not oversized)
- [ ] Fonts are preloaded or font-display: swap
- [ ] No render-blocking resources
- [ ] CSS is minified in production
- [ ] JS is minified in production

---

## SECTION 11: SEO

### 11.1 Meta Tags

**Tests:**
- [ ] `<title>` is set: "Omar Mohammed | Electrical Engineer"
- [ ] `<meta name="description">` is set
- [ ] `<meta name="viewport">` is set
- [ ] Open Graph tags present (og:title, og:description, og:image)
- [ ] Twitter card tags present

### 11.2 Structure

**Tests:**
- [ ] Only one `<h1>` per page
- [ ] Semantic HTML used (header, main, section, footer)
- [ ] Links have descriptive text (not "click here")

### 11.3 Technical

**Tests:**
- [ ] robots.txt exists
- [ ] sitemap.xml exists (if needed)
- [ ] No broken links (404s)
- [ ] Canonical URLs set

---

## SECTION 12: FUNCTIONAL TESTING

### 12.1 Links

**Tests:**
- [ ] All internal links work
- [ ] All external links work
- [ ] External links open in new tab (`target="_blank"`)
- [ ] External links have `rel="noopener noreferrer"`
- [ ] No broken images (404s)

### 12.2 Forms (if applicable)

**Tests:**
- [ ] Contact form submits
- [ ] Form validation works
- [ ] Success/error states display
- [ ] Email delivery works

### 12.3 Resume

**Tests:**
- [ ] Resume button/link works
- [ ] PDF opens or downloads correctly
- [ ] PDF is up to date

---

## SECTION 13: CROSS-BROWSER TESTING

### 13.1 Chrome

- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

### 13.2 Firefox

- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

### 13.3 Safari

- [ ] All features work
- [ ] Animations smooth
- [ ] Backdrop blur works (if used)
- [ ] No console errors

### 13.4 Edge

- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

### 13.5 Mobile Browsers

- [ ] iOS Safari: all features work
- [ ] Chrome Android: all features work
- [ ] Touch interactions work
- [ ] No zoom issues

---

## SECTION 14: ERROR HANDLING

### 14.1 404 Page

**Tests:**
- [ ] 404 page exists
- [ ] 404 page has navigation back to home
- [ ] 404 page matches site design

### 14.2 Console

**Tests:**
- [ ] No JavaScript errors in console
- [ ] No failed network requests
- [ ] No deprecation warnings (critical)

---

## SECTION 15: DEPLOYMENT CHECKLIST

### 15.1 Pre-Deploy

- [ ] All tests pass
- [ ] Build completes without errors (`npm run build`)
- [ ] Preview build works (`npm run preview`)
- [ ] Environment variables set (if any)
- [ ] Analytics configured (if any)

### 15.2 Post-Deploy

- [ ] Site loads on production URL
- [ ] HTTPS works correctly
- [ ] No mixed content warnings
- [ ] All pages accessible
- [ ] Forms work in production
- [ ] Performance acceptable on production

---

## SECTION 16: TEST COMMANDS

### 16.1 Manual Testing Script

```bash
# 1. Start dev server
npm run dev

# 2. Open browser to localhost
# 3. Run through all visual tests manually

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview

# 6. Run Lighthouse audit
# Chrome DevTools > Lighthouse > Generate report

# 7. Check console for errors
# Chrome DevTools > Console
```

### 16.2 Automated Checks (if configured)

```bash
# Run linter
npm run lint

# Run type check (if TypeScript)
npm run type-check

# Run tests (if configured)
npm run test
```

---

## SECTION 17: SIGN-OFF

| Area | Tester | Date | Pass/Fail |
|------|--------|------|-----------|
| Visual | | | |
| Navigation | | | |
| Hero | | | |
| Projects | | | |
| Project Pages | | | |
| Responsive | | | |
| Accessibility | | | |
| Performance | | | |
| SEO | | | |
| Cross-Browser | | | |

**Final Approval:**

- [ ] All critical tests pass
- [ ] No blocking issues
- [ ] Ready for deployment

---

*End of Testing & Verification Specification*
