# Omar Mohammed Portfolio Website
## Design Specification — Version 3.1

**Version:** 3.1  
**Last Updated:** February 2026  
**Status:** UPDATE to v3.0 — About Section Revision

---

## OVERVIEW

This update revises the About section based on implementation feedback. All other sections from v3.0 remain unchanged.

**What's Changed:**
1. Heading changed to "Hi, I'm Omar." with subtitle
2. Green underline under heading removed
3. Bio closing line broken out for emphasis
4. Oscilloscope animated dividers added (two instances)
5. "Ask me about" subheading restyled (larger, title case)
6. Tags now have pill/bubble styling with proper capitalization
7. New CTA section added at bottom with invitation text

**What's Unchanged:**
- Navigation (including "Let's talk" button — serves different purpose than about CTA)
- Hero section
- Projects section
- Footer
- All other styling and components

---

## SECTION 1: ABOUT SECTION — COMPLETE REVISION

### 1.1 Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   Hi, I'm Omar.                                                             │
│   Engineering what's next at Syracuse University.                           │
│                                                                             │
│   Indian at heart, engineering student by day, community builder by         │
│   night. I'm breaking into the chip design space. There's something         │
│   about hardware that just makes sense to me. When I'm not buried in        │
│   circuit simulations or debugging embedded systems, I'm working on a       │
│   startup to empower underprivileged artists who create handcrafted         │
│   goods. I lead the Muslim Students Association at Syracuse University      │
│   and will defend pineapple on pizza with my life.                          │
│                                                                             │
│   I like building things: circuits, communities, companies.                 │
│                                                                             │
│                        ───────╱╲───────                                     │
│                                                                             │
│   Ask me about                                                              │
│                                                                             │
│   [ Chip Design ]  [ Quantum Mechanics ]  [ Robotics ]                      │
│   [ Embedded Systems ]  [ PCB Design ]                                      │
│                                                                             │
│   [ Gym ]  [ Community Building ]  [ Startups ]  [ Leadership ]             │
│                                                                             │
│                        ───────╱╲───────                                     │
│                                                                             │
│   Always on the lookout for interesting conversations,                      │
│   collaboration ideas, and opportunities.                                   │
│                                                                             │
│                       [ Let's talk → ]                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Heading Section

**Primary Heading:** `Hi, I'm Omar.`

**Subtitle:** `Engineering what's next at Syracuse University.`

**Styling:**
```css
.about-heading {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  /* NO underline decoration */
}

.about-subtitle {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
}
```

**Note:** Remove the arbitrary green underline that was under the heading. No decorative line here.

### 1.3 Bio Section

**Structure:** Two parts — main paragraph + emphasized closing line

**Main Paragraph:**
```
Indian at heart, engineering student by day, community builder by night. I'm breaking into the chip design space. There's something about hardware that just makes sense to me. When I'm not buried in circuit simulations or debugging embedded systems, I'm working on a startup to empower underprivileged artists who create handcrafted goods. I lead the Muslim Students Association at Syracuse University and will defend pineapple on pizza with my life.
```

**Closing Line (separate, emphasized):**
```
I like building things: circuits, communities, companies.
```

**Styling:**
```css
.about-bio {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: var(--text-primary);
  line-height: 1.7;
  margin-bottom: var(--space-6);
}

.about-bio-emphasis {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: var(--space-10);
}
```

**HTML:**
```html
<p class="about-bio">
  Indian at heart, engineering student by day, community builder by night. 
  I'm breaking into the chip design space. There's something about hardware 
  that just makes sense to me. When I'm not buried in circuit simulations or 
  debugging embedded systems, I'm working on a startup to empower 
  underprivileged artists who create handcrafted goods. I lead the Muslim 
  Students Association at Syracuse University and will defend pineapple on 
  pizza with my life.
</p>

<p class="about-bio-emphasis">
  I like building things: circuits, communities, companies.
</p>
```

### 1.4 Oscilloscope Dividers

**Usage:** Two instances in About section
1. Between bio and "Ask me about"
2. Between tags and CTA

**Specs:** Same as defined in v2.0
- 120px centered line with pulse animation
- Pulse travels across in 3-4 second cycle
- Reduced motion fallback: static line with small blip

**Styling:**
```css
.oscilloscope-divider {
  display: block;
  width: 120px;
  height: 20px;
  margin: var(--space-10) auto;
}
```

**SVG:** Use the same oscilloscope SVG component from v2.0 spec.

### 1.5 Ask Me About Section

**Subheading:** `Ask me about`

**Styling for Subheading:**
```css
.ask-me-heading {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-5);
  /* Title case, NOT all caps */
  /* Larger than previous version */
}
```

### 1.6 Tag Pills

**Row 1 (Technical):**
- Chip Design
- Quantum Mechanics
- Robotics
- Embedded Systems
- PCB Design

**Row 2 (Personal):**
- Gym
- Community Building
- Startups
- Leadership

**Styling:**
```css
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.tag-pill {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--green-primary);
  background: var(--green-bg);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.tag-pill:hover {
  background: var(--green-primary);
  color: white;
  transform: translateY(-2px);
}
```

**HTML:**
```html
<h3 class="ask-me-heading">Ask me about</h3>

<div class="tag-row">
  <span class="tag-pill">Chip Design</span>
  <span class="tag-pill">Quantum Mechanics</span>
  <span class="tag-pill">Robotics</span>
  <span class="tag-pill">Embedded Systems</span>
  <span class="tag-pill">PCB Design</span>
</div>

<div class="tag-row">
  <span class="tag-pill">Gym</span>
  <span class="tag-pill">Community Building</span>
  <span class="tag-pill">Startups</span>
  <span class="tag-pill">Leadership</span>
</div>
```

### 1.7 CTA Section

**Invitation Text:**
```
Always on the lookout for interesting conversations, collaboration ideas, and opportunities.
```

**Button:** `Let's talk →`

**Button Destination:** `mailto:mail.omarmohammed@gmail.com`

**Styling:**
```css
.about-cta-section {
  text-align: center;
  margin-top: var(--space-10);
}

.about-cta-text {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-6);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.about-cta-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
  color: white;
  background: var(--green-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  border: none;
  transition: all 0.2s ease;
  text-decoration: none;
}

.about-cta-button:hover {
  background: var(--green-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(45, 90, 61, 0.3);
}

.about-cta-button .arrow {
  transition: transform 0.2s ease;
}

.about-cta-button:hover .arrow {
  transform: translateX(4px);
}
```

**HTML:**
```html
<div class="about-cta-section">
  <p class="about-cta-text">
    Always on the lookout for interesting conversations, 
    collaboration ideas, and opportunities.
  </p>
  
  <a href="mailto:mail.omarmohammed@gmail.com" class="about-cta-button">
    Let's talk
    <span class="arrow">→</span>
  </a>
</div>
```

---

## SECTION 2: COMPLETE HTML STRUCTURE

```html
<section class="about-section">
  
  <!-- Heading -->
  <h1 class="about-heading">Hi, I'm Omar.</h1>
  <p class="about-subtitle">Engineering what's next at Syracuse University.</p>
  
  <!-- Bio -->
  <p class="about-bio">
    Indian at heart, engineering student by day, community builder by night. 
    I'm breaking into the chip design space. There's something about hardware 
    that just makes sense to me. When I'm not buried in circuit simulations or 
    debugging embedded systems, I'm working on a startup to empower 
    underprivileged artists who create handcrafted goods. I lead the Muslim 
    Students Association at Syracuse University and will defend pineapple on 
    pizza with my life.
  </p>
  
  <p class="about-bio-emphasis">
    I like building things: circuits, communities, companies.
  </p>
  
  <!-- Divider 1 -->
  <svg class="oscilloscope-divider" viewBox="0 0 120 20">
    <!-- oscilloscope SVG content -->
  </svg>
  
  <!-- Ask Me About -->
  <h3 class="ask-me-heading">Ask me about</h3>
  
  <div class="tag-row">
    <span class="tag-pill">Chip Design</span>
    <span class="tag-pill">Quantum Mechanics</span>
    <span class="tag-pill">Robotics</span>
    <span class="tag-pill">Embedded Systems</span>
    <span class="tag-pill">PCB Design</span>
  </div>
  
  <div class="tag-row">
    <span class="tag-pill">Gym</span>
    <span class="tag-pill">Community Building</span>
    <span class="tag-pill">Startups</span>
    <span class="tag-pill">Leadership</span>
  </div>
  
  <!-- Divider 2 -->
  <svg class="oscilloscope-divider" viewBox="0 0 120 20">
    <!-- oscilloscope SVG content -->
  </svg>
  
  <!-- CTA -->
  <div class="about-cta-section">
    <p class="about-cta-text">
      Always on the lookout for interesting conversations, 
      collaboration ideas, and opportunities.
    </p>
    
    <a href="mailto:mail.omarmohammed@gmail.com" class="about-cta-button">
      Let's talk
      <span class="arrow">→</span>
    </a>
  </div>
  
</section>
```

---

## SECTION 3: IMPLEMENTATION CHECKLIST

### About Section Updates
- [ ] Change heading to "Hi, I'm Omar."
- [ ] Add subtitle "Engineering what's next at Syracuse University."
- [ ] Remove green underline decoration from heading
- [ ] Split bio into main paragraph + emphasized closing line
- [ ] Style closing line larger/bolder
- [ ] Add oscilloscope divider component between bio and "Ask me about"
- [ ] Change "ASK ME ABOUT" to "Ask me about" (title case, larger)
- [ ] Convert tags from inline text to pill components
- [ ] Capitalize tags properly (Chip Design, not chip design)
- [ ] Add hover effect to tag pills
- [ ] Add oscilloscope divider between tags and CTA
- [ ] Add CTA invitation text
- [ ] Add "Let's talk →" button with mailto link
- [ ] Verify nav "Let's talk" button still works (keep both)

---

## SECTION 4: NAVIGATION CLARIFICATION

**Keep "Let's talk" in BOTH locations:**

| Location | Purpose |
|----------|---------|
| Navigation bar | Utility — always accessible, for visitors who already know they want to reach out |
| About section | Emotional close — invitation after reading your story, natural next step |

They are not redundant. One is functional, one is relational.

---

## SECTION 5: REMOVED ELEMENTS

| Element | Status |
|---------|--------|
| Green underline under heading | Removed — was arbitrary |
| Small static divider | Replaced with oscilloscope animated divider |
| All-caps "ASK ME ABOUT" | Changed to title case "Ask me about" |
| Inline tags with dots | Replaced with pill bubbles |
| Resume CTA in about section | Replaced with "Let's talk" CTA |

---

## APPENDIX: FINAL COPY — ABOUT SECTION

### Heading
**Main:** Hi, I'm Omar.
**Subtitle:** Engineering what's next at Syracuse University.

### Bio
Indian at heart, engineering student by day, community builder by night. I'm breaking into the chip design space. There's something about hardware that just makes sense to me. When I'm not buried in circuit simulations or debugging embedded systems, I'm working on a startup to empower underprivileged artists who create handcrafted goods. I lead the Muslim Students Association at Syracuse University and will defend pineapple on pizza with my life.

**[Emphasized, separate line]**
I like building things: circuits, communities, companies.

### Ask me about

**Row 1:**
Chip Design · Quantum Mechanics · Robotics · Embedded Systems · PCB Design

**Row 2:**
Gym · Community Building · Startups · Leadership

### CTA
Always on the lookout for interesting conversations, collaboration ideas, and opportunities.

**[Button]** Let's talk →

---

*End of Version 3.1 Specification*
*This updates the About section only — all other v3.0 specs remain in effect*
