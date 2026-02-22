# Omar Mohammed Portfolio Website
## Design Specification — Version 3.0

**Version:** 3.0  
**Last Updated:** February 2026  
**Status:** REPLACES v2.0 — Use this as the canonical spec

---

## OVERVIEW

Personal portfolio site for Omar Mohammed. Clean, minimal, human.

**What's Changed from v2.0:**
1. Navigation restructured (social icons + "Let's talk" button on right)
2. About section completely rewritten (bio + "Ask me about" tags, no FAQ)
3. Footer simplified (just copyright, no socials)
4. Email updated to personal Gmail (no school email anywhere)
5. Removed "Currently" section concept (maintenance concern)

**What's Unchanged:**
- MO connected monogram logo (links home)
- Custom charcoal circle cursor with hover states
- Interactive particle hero background
- "Building what's next." + morphing text
- Oscilloscope dividers
- Project cards and case study format
- Color palette and typography

---

## SECTION 1: NAVIGATION

### 1.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   [MO]            Projects    About    Resume       [gh] [in] [Let's talk]  │
│    ↑              ←───── centered ─────→                      ↑             │
│   logo                                                   socials + CTA      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Three zones:**
1. **Left:** MO logo (links to homepage)
2. **Center:** Projects, About, Resume
3. **Right:** GitHub icon, LinkedIn icon, "Let's talk" button

### 1.2 Navigation Items

| Element | Type | Destination |
|---------|------|-------------|
| MO Logo | Link | `/` (homepage) |
| Projects | Link | `/projects` |
| About | Link | `/about` |
| Resume | Button (outlined) | Downloads PDF |
| GitHub | Icon | `https://github.com/ofmohamm` (new tab) |
| LinkedIn | Icon | `https://linkedin.com/in/ofmohammed` (new tab) |
| Let's talk | Button (filled) | `mailto:mail.omarmohammed@gmail.com` |

### 1.3 Right Side Styling

```css
.nav-right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.nav-social-icon {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.nav-social-icon:hover {
  color: var(--green-primary);
}

.nav-cta {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: white;
  background: var(--green-primary);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  transition: background 0.2s ease, transform 0.2s ease;
}

.nav-cta:hover {
  background: var(--green-hover);
  transform: translateY(-2px);
}
```

### 1.4 Resume Button (Outlined Style)

```css
.nav-resume {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--green-primary);
  background: transparent;
  border: 2px solid var(--green-primary);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  transition: all 0.2s ease;
}

.nav-resume:hover {
  background: var(--green-primary);
  color: white;
}
```

### 1.5 Mobile Navigation

**Breakpoint:** Below 768px

```
┌─────────────────────────────────────┐
│   [MO]                        [≡]   │
└─────────────────────────────────────┘

           ↓ opens ↓

┌─────────────────────────────────────┐
│                              [✕]    │
│                                     │
│           Projects                  │
│           About                     │
│           Resume                    │
│                                     │
│        [gh]    [in]                 │
│                                     │
│        [ Let's talk ]               │
│                                     │
└─────────────────────────────────────┘
```

---

## SECTION 2: LOGO

### 2.1 MO Connected Monogram

**No change from v2.0**

The M and O are connected by a horizontal line, like a signal trace on a circuit board.

```
    M ─────── O
```

- **Color:** `--text-primary` (#2C2C2C)
- **Height:** 32-40px in nav
- **Format:** Inline SVG
- **Behavior:** Links to homepage, cursor grows slightly on hover

---

## SECTION 3: CUSTOM CURSOR

### 3.1 Specifications

**No change from v2.0**

- Clean charcoal circle (#2C2C2C)
- 20px diameter default
- Smooth physics follow (~50-80ms delay)
- Grows to 40px ring on links/buttons
- Grows to 56px with "View" text on project cards
- Hidden on touch devices and reduced motion

---

## SECTION 4: HERO SECTION

### 4.1 Layout

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
│                      Building what's next.                                  │
│                      ─────────────────────                                  │
│                                                                             │
│                 [ ENGINEER → ENTREPRENEUR → BUILDER ]                       │
│                                                                             │
│                                                                             │
│                                                                             │
│   Omar Mohammed                                        [ See my work ↓ ]    │
│   Syracuse University                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Content

**Main Statement:** `Building what's next.`

**Morphing Text:** `ENGINEER` → `ENTREPRENEUR` → `BUILDER` (3-second cycle)

**Identity (bottom-left):**
```
Omar Mohammed
Syracuse University
```

**CTA (bottom-right):** `See my work ↓`

### 4.3 Interactive Background

**No change from v2.0** — Keep the particle system with circuit trace aesthetic.

---

## SECTION 5: ABOUT SECTION

### 5.1 Structure

**REPLACES the FAQ format from v2.0**

New structure:
1. Section heading
2. Bio paragraph
3. "Ask me about" tags (two rows)

### 5.2 Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   About                                                                     │
│   ═════                                                                     │
│                                                                             │
│   Indian at heart, engineering student by day, community builder by         │
│   night. I'm breaking into the chip design space. There's something         │
│   about hardware that just makes sense to me. When I'm not buried in        │
│   circuit simulations or debugging embedded systems, I'm working on a       │
│   startup to empower underprivileged artists who create handcrafted         │
│   goods. I lead the Muslim Students Association at Syracuse University      │
│   and will defend pineapple on pizza with my life. I like building          │
│   things: circuits, communities, companies.                                 │
│                                                                             │
│   ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│   Ask me about                                                              │
│                                                                             │
│   chip design · quantum mechanics · robotics · embedded systems ·           │
│   PCB design                                                                │
│                                                                             │
│   gym · community building · startups · leadership                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Bio Copy (Final)

```
Indian at heart, engineering student by day, community builder by night. I'm breaking into the chip design space. There's something about hardware that just makes sense to me. When I'm not buried in circuit simulations or debugging embedded systems, I'm working on a startup to empower underprivileged artists who create handcrafted goods. I lead the Muslim Students Association at Syracuse University and will defend pineapple on pizza with my life. I like building things: circuits, communities, companies.
```

### 5.4 Ask Me About Tags

**Row 1 (Technical):**
`chip design` · `quantum mechanics` · `robotics` · `embedded systems` · `PCB design`

**Row 2 (Personal):**
`gym` · `community building` · `startups` · `leadership`

### 5.5 Styling

```css
.about-section {
  max-width: var(--max-width-narrow);
  margin: 0 auto;
  padding: var(--space-16) var(--space-8);
}

.about-heading {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  color: var(--text-primary);
  margin-bottom: var(--space-6);
}

.about-bio {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: var(--text-primary);
  line-height: 1.7;
  margin-bottom: var(--space-8);
}

.about-divider {
  width: 60px;
  height: 1px;
  background: var(--border);
  margin: var(--space-8) 0;
}

.ask-me-heading {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-4);
}

.tag-row {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--space-2);
}

.tag {
  color: var(--green-primary);
}

.tag-separator {
  color: var(--text-muted);
  margin: 0 var(--space-2);
}
```

### 5.6 HTML Structure

```html
<section class="about-section">
  <h2 class="about-heading">About</h2>
  
  <p class="about-bio">
    Indian at heart, engineering student by day, community builder by night...
  </p>
  
  <div class="about-divider"></div>
  
  <h3 class="ask-me-heading">Ask me about</h3>
  
  <p class="tag-row">
    <span class="tag">chip design</span>
    <span class="tag-separator">·</span>
    <span class="tag">quantum mechanics</span>
    <span class="tag-separator">·</span>
    <span class="tag">robotics</span>
    <span class="tag-separator">·</span>
    <span class="tag">embedded systems</span>
    <span class="tag-separator">·</span>
    <span class="tag">PCB design</span>
  </p>
  
  <p class="tag-row">
    <span class="tag">gym</span>
    <span class="tag-separator">·</span>
    <span class="tag">community building</span>
    <span class="tag-separator">·</span>
    <span class="tag">startups</span>
    <span class="tag-separator">·</span>
    <span class="tag">leadership</span>
  </p>
</section>
```

---

## SECTION 6: DIVIDERS

### 6.1 Oscilloscope Line

**No change from v2.0**

- 120px centered line with pulse animation
- Pulse travels across in 3-4 second cycle
- Static fallback for reduced motion

### 6.2 About Section Internal Divider

Small 60px horizontal line between bio and "Ask me about" — static, no animation.

```css
.about-divider {
  width: 60px;
  height: 1px;
  background: var(--border);
  margin: var(--space-8) 0;
}
```

---

## SECTION 7: PROJECTS SECTION

**No change from v2.0**

- Project cards with 3px borders
- Hover: lift + border color change + shadow
- 3D model placeholder for featured project
- Case study pages for individual projects

---

## SECTION 8: FOOTER

### 8.1 Simplified Footer

**REPLACES the contact section from v2.0**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                          © 2026 Omar Mohammed                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**No social links. No extra text. Just the sign-off.**

### 8.2 Styling

```css
.footer {
  text-align: center;
  padding: var(--space-8) var(--space-4);
  border-top: 1px solid var(--border);
}

.footer-text {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--text-muted);
}
```

---

## SECTION 9: REMOVED ELEMENTS

The following have been **intentionally removed**:

| Element | Reason |
|---------|--------|
| School email (ofmohamm@syr.edu) | Using personal email only |
| Footer social links | Redundant (already in nav) |
| "Currently" section | Maintenance concern |
| FAQ-style about | Replaced with bio + tags |
| Contact section with email display | CTA in nav handles this |

---

## SECTION 10: COLOR PALETTE

**No change from v2.0**

```css
:root {
  /* Backgrounds */
  --bg-primary: #FAF9F6;
  --bg-secondary: #F0EAD6;
  --bg-card: #FFFFFF;
  
  /* Text */
  --text-primary: #2C2C2C;
  --text-secondary: #5C5C5C;
  --text-muted: #8B8B8B;
  
  /* Greens */
  --green-primary: #2D5A3D;
  --green-hover: #234830;
  --green-light: #4A8C5A;
  --green-bg: #E3EFE6;
  
  /* Borders */
  --border: #D9D4C7;
}
```

---

## SECTION 11: IMPLEMENTATION CHECKLIST

### Phase 1: Navigation Update
- [ ] Update nav right side: add GitHub icon, LinkedIn icon, "Let's talk" button
- [ ] Update "Let's talk" href to `mailto:mail.omarmohammed@gmail.com`
- [ ] Style "Let's talk" as filled green button
- [ ] Style Resume as outlined button
- [ ] Update mobile menu with new structure

### Phase 2: About Section Rewrite
- [ ] Remove FAQ components
- [ ] Add bio paragraph (use exact copy from spec)
- [ ] Add "Ask me about" heading
- [ ] Add two rows of tags with dot separators
- [ ] Add small divider between bio and tags

### Phase 3: Footer Simplification
- [ ] Remove social links from footer
- [ ] Remove contact heading/email from footer
- [ ] Keep only: `© 2026 Omar Mohammed`

### Phase 4: Email Cleanup
- [ ] Search and remove all instances of `ofmohamm@syr.edu`
- [ ] Ensure `mail.omarmohammed@gmail.com` only appears in nav "Let's talk" mailto

---

## SECTION 12: QUICK REFERENCE

| Element | v2.0 | v3.0 |
|---------|------|------|
| Nav right side | LinkedIn icon, GitHub icon | GitHub icon, LinkedIn icon, "Let's talk" button |
| Contact CTA | In footer section | "Let's talk" button in nav |
| Email used | ofmohamm@syr.edu | mail.omarmohammed@gmail.com |
| About format | FAQ (5 questions) | Bio paragraph + "Ask me about" tags |
| Footer | "Let's talk" + email + socials | Just "© 2026 Omar Mohammed" |

---

## APPENDIX: FINAL COPY

### Navigation
- [MO logo] → home
- Projects
- About
- Resume (button, outlined)
- [GitHub icon] → https://github.com/ofmohamm
- [LinkedIn icon] → https://linkedin.com/in/ofmohammed
- Let's talk (button, filled) → mailto:mail.omarmohammed@gmail.com

### Hero
**Main:** Building what's next.

**Morphing:** ENGINEER → ENTREPRENEUR → BUILDER

**Identity:**
Omar Mohammed
Syracuse University

**CTA:** See my work ↓

### About

**Bio:**
Indian at heart, engineering student by day, community builder by night. I'm breaking into the chip design space. There's something about hardware that just makes sense to me. When I'm not buried in circuit simulations or debugging embedded systems, I'm working on a startup to empower underprivileged artists who create handcrafted goods. I lead the Muslim Students Association at Syracuse University and will defend pineapple on pizza with my life. I like building things: circuits, communities, companies.

**Ask me about (Row 1 — Technical):**
chip design · quantum mechanics · robotics · embedded systems · PCB design

**Ask me about (Row 2 — Personal):**
gym · community building · startups · leadership

### Footer
© 2026 Omar Mohammed

---

*End of Version 3.0 Specification*
