# Omar Mohammed Portfolio Website
## Design Specification — Version 3.2

**Version:** 3.2  
**Last Updated:** February 2026  
**Status:** UPDATE to v3.1 — Homepage About Preview + Nav Reorder

---

## OVERVIEW

This update adds an About Preview section to the homepage (between hero and projects) and reorders navigation to match scroll flow.

**What's Changed:**
1. Navigation order: About → Projects → Resume (was Projects → About → Resume)
2. New "About Preview" section added to homepage after hero
3. Oscilloscope divider between about preview and projects section

**What's Unchanged:**
- Everything else from v3.0 and v3.1

---

## SECTION 1: NAVIGATION — REORDERED

### 1.1 New Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   [MO]            About    Projects    Resume       [gh] [in] [Let's talk]  │
│    ↑              ←───── centered ─────→                      ↑             │
│   logo                                                   socials + CTA      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Rationale

Navigation order now matches scroll order on homepage:

```
Hero → About Preview → Projects
         ↓                ↓
      About link      Projects link
```

Visitors experience content in the order it appears in nav.

### 1.3 Navigation Items (Updated Order)

| Position | Element | Destination |
|----------|---------|-------------|
| Left | MO Logo | `/` (homepage) |
| Center 1 | About | `/about` |
| Center 2 | Projects | `/projects` |
| Center 3 | Resume | Downloads PDF |
| Right 1 | GitHub icon | GitHub profile (new tab) |
| Right 2 | LinkedIn icon | LinkedIn profile (new tab) |
| Right 3 | Let's talk | `mailto:mail.omarmohammed@gmail.com` |

### 1.4 Mobile Menu (Updated Order)

```
┌─────────────────────────────────────┐
│                              [✕]    │
│                                     │
│             About                   │
│             Projects                │
│             Resume                  │
│                                     │
│          [gh]    [in]               │
│                                     │
│          [ Let's talk ]             │
│                                     │
└─────────────────────────────────────┘
```

---

## SECTION 2: HOMEPAGE STRUCTURE — UPDATED

### 2.1 New Page Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Navigation]                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                              HERO SECTION                                   │
│                                                                             │
│                        Building what's next.                                │
│                   [ ENGINEER → ENTREPRENEUR → BUILDER ]                     │
│                                                                             │
│   Omar Mohammed                                        [ See my work ↓ ]    │
│   Syracuse University                                                       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                          ABOUT PREVIEW SECTION                              │
│                               (NEW)                                         │
│                                                                             │
│                           Hi, I'm Omar.                                     │
│       Indian at heart, engineer by profession, community builder            │
│                             by calling.                                     │
│                                                                             │
│                        [ More about me → ]                                  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                        ───────╱╲───────                                     │
│                        (oscilloscope divider)                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                          PROJECTS SECTION                                   │
│                                                                             │
│                          Featured Work                                      │
│                                                                             │
│                      [ Project cards grid ]                                 │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                              FOOTER                                         │
│                        © 2026 Omar Mohammed                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## SECTION 3: ABOUT PREVIEW SECTION — NEW

### 3.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                           Hi, I'm Omar.                                     │
│       Indian at heart, engineer by profession, community builder            │
│                             by calling.                                     │
│                                                                             │
│                        [ More about me → ]                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Content

**Heading:** `Hi, I'm Omar.`

**Tagline:** `Indian at heart, engineer by profession, community builder by calling.`

**Link:** `More about me →` (links to `/about`)

### 3.3 Styling

```css
.about-preview {
  text-align: center;
  padding: var(--space-16) var(--space-8);
  max-width: var(--max-width-narrow);
  margin: 0 auto;
}

.about-preview-heading {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 2.5rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.about-preview-tagline {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-6);
}

.about-preview-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--green-primary);
  text-decoration: none;
  transition: all 0.2s ease;
}

.about-preview-link:hover {
  gap: var(--space-3);
}

.about-preview-link .arrow {
  transition: transform 0.2s ease;
}

.about-preview-link:hover .arrow {
  transform: translateX(4px);
}
```

### 3.4 HTML Structure

```html
<section class="about-preview">
  <h2 class="about-preview-heading">Hi, I'm Omar.</h2>
  <p class="about-preview-tagline">
    Indian at heart, engineer by profession, community builder by calling.
  </p>
  <a href="/about" class="about-preview-link">
    More about me
    <span class="arrow">→</span>
  </a>
</section>
```

### 3.5 Divider After Section

Place oscilloscope divider between about preview and projects section:

```html
<section class="about-preview">
  <!-- content -->
</section>

<svg class="oscilloscope-divider" viewBox="0 0 120 20">
  <!-- oscilloscope SVG content -->
</svg>

<section class="projects-section">
  <!-- content -->
</section>
```

---

## SECTION 4: IMPLEMENTATION CHECKLIST

### Navigation
- [ ] Reorder nav items: About → Projects → Resume
- [ ] Update mobile menu order to match
- [ ] Verify all links still work

### Homepage
- [ ] Add About Preview section after hero
- [ ] Center all content in About Preview
- [ ] Add "More about me →" link to `/about`
- [ ] Add oscilloscope divider between About Preview and Projects
- [ ] Verify scroll flow feels natural

---

## SECTION 5: QUICK REFERENCE

### Homepage Section Order
1. Navigation (sticky)
2. Hero (Building what's next + morphing text)
3. About Preview (Hi, I'm Omar + tagline + link) — **NEW**
4. Oscilloscope Divider
5. Projects (Featured Work grid)
6. Footer

### Navigation Order
```
[MO]    About    Projects    Resume    [gh] [in] [Let's talk]
```

---

## APPENDIX: FINAL COPY — ABOUT PREVIEW

**Heading:** Hi, I'm Omar.

**Tagline:** Indian at heart, engineer by profession, community builder by calling.

**Link:** More about me →

---

*End of Version 3.2 Specification*
*This adds About Preview section and nav reorder — all other v3.0/v3.1 specs remain in effect*
