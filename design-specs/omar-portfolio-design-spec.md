# Omar Mohammed Portfolio Website
## Design Specification Document

**Version:** 1.0  
**Last Updated:** February 2026  
**Target Launch:** Before Syracuse ECS Career Fair

---

## 1. Project Overview

### 1.1 Purpose
Create a distinctive personal portfolio website that positions Omar Mohammed as a compelling candidate for semiconductor, VLSI, and hardware engineering internships at companies like NVIDIA, AMD, Intel, Qualcomm, Micron, and GlobalFoundries.

### 1.2 Primary Goals
1. Convert recruiter visits into interview opportunities (6-second first impression, 55-second decision window)
2. Showcase hardware engineering capabilities through well-documented project case studies
3. Demonstrate technical competence through the site itself (clean code, fast performance, thoughtful UX)
4. Differentiate from typical student portfolios with warm minimalist design and subtle polish

### 1.3 Success Metrics
- Lighthouse Performance Score: 95+
- First Contentful Paint: < 1.0s
- Largest Contentful Paint: < 1.5s
- Time to first recruiter contact after sharing link
- Career fair conversations that reference portfolio content

---

## 2. Target Audience

### 2.1 Primary: Technical Recruiters
- **Behavior:** 6-8 second initial scan, 55 seconds to interview decision
- **Goals:** Verify technical claims, assess communication ability, find job-fit signals
- **Pain points:** Broken links, missing context, walls of text, slow-loading sites
- **What they click:** Featured projects → Resume PDF → GitHub → About

### 2.2 Secondary: Hiring Managers / Engineers
- **Behavior:** Deeper technical evaluation if recruiter passes candidate along
- **Goals:** Assess problem-solving approach, code quality, technical depth
- **What they examine:** GitHub commits, project architecture decisions, quantified results

### 2.3 Tertiary: Networking Contacts
- Faculty (Dr. Carter, Dr. Caicedo, Dr. Doug Yung), industry contacts, peers
- Need quick understanding of Omar's focus and capabilities

---

## 3. Site Architecture

### 3.1 Page Structure

```
/                     → Home (hero + featured projects + about preview)
/projects             → All projects grid
/projects/[slug]      → Individual project case studies
/about                → Extended bio + skills + resume
/contact              → Contact form + links (or section on home)
```

### 3.2 Navigation Model
**Primary Navigation (persistent header):**
- Logo/Name (links to home)
- Projects
- About
- Resume (direct PDF download or link to about#resume)
- Contact (or CTA button)

**Mobile:** Hamburger menu with full-screen overlay

**Scroll Behavior:** Header shrinks on scroll down, expands on scroll up

---

## 4. Page Specifications

### 4.1 Home Page

#### Hero Section
```
┌─────────────────────────────────────────────────────────────┐
│  [Nav: Omar Mohammed    Projects  About  Resume  Contact]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│     Omar Mohammed                                           │
│     ─────────────────                                       │
│     Electrical Engineering Student                          │
│     Embedded Systems • FPGA Design • PCB Development        │
│                                                             │
│     Building hardware systems that bridge the gap           │
│     between sensors and intelligent infrastructure.         │
│                                                             │
│     [View My Work ↓]              [Get in Touch →]          │
│                                                             │
│                                              [Scroll hint]  │
└─────────────────────────────────────────────────────────────┘
```

**Content Requirements:**
- Name (large, prominent)
- Title: "Electrical Engineering Student" or "Hardware Engineer"
- Specialty tags: Embedded Systems • FPGA Design • PCB Development
- One-sentence value proposition (what you do + impact)
- Two CTAs: Primary (view work), Secondary (contact)
- Subtle scroll indicator animation

**Interactions:**
- Text fade-in on load (staggered, 200ms delays)
- Specialty tags appear with slight slide-up
- CTAs have magnetic hover effect
- Background: subtle grain texture on cream

#### Featured Projects Section
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     Featured Work                                           │
│     ──────────────                                          │
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────┐        │
│  │  [Project Image]    │    │  [Project Image]    │        │
│  │                     │    │                     │        │
│  │  UFONet IoT System  │    │  4-Bit FPGA CPU     │        │
│  │  PCB • LoRaWAN •    │    │  VHDL • RTL Design  │        │
│  │  Python             │    │  • FSM              │        │
│  │                     │    │                     │        │
│  │  [View Project →]   │    │  [View Project →]   │        │
│  └─────────────────────┘    └─────────────────────┘        │
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────┐        │
│  │  [Project Image]    │    │  [Project Image]    │        │
│  │                     │    │                     │        │
│  │  Elevator Control   │    │  FPGA Change        │        │
│  │  System             │    │  Detection          │        │
│  │  C • ATSAMD21 •     │    │  (Honors Thesis)    │        │
│  │  Register-Level     │    │                     │        │
│  └─────────────────────┘    └─────────────────────┘        │
│                                                             │
│                    [See All Projects →]                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Content Requirements:**
- Section title
- 3-4 featured project cards (curated for semiconductor relevance)
- Each card: Image/visual, title, 3-4 tech tags, brief description, link
- "See All Projects" link

**Interactions:**
- Cards fade in on scroll (staggered by 100ms)
- Card hover: subtle lift (translateY -4px), shadow increase
- Image zoom within card bounds on hover
- Tech tags have pill styling with green accent

#### About Preview Section
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌────────────┐                                             │
│  │            │   Hi, I'm Omar                              │
│  │  [Photo]   │   ─────────────                             │
│  │            │                                             │
│  └────────────┘   I'm a junior EE student at Syracuse       │
│                   University researching IoT sensor         │
│                   networks for flood monitoring. I love     │
│                   the challenge of designing hardware       │
│                   that operates reliably in harsh           │
│                   real-world conditions.                    │
│                                                             │
│                   Currently exploring: low-power FPGA       │
│                   image processing, RTL design, and         │
│                   battery-powered embedded systems.         │
│                                                             │
│                   [More About Me →]  [Download Resume ↓]    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Content Requirements:**
- Professional photo (friendly, approachable)
- 2-3 paragraph condensed bio (100-150 words)
- "Currently exploring" line showing active interests
- Links to full about page and resume download

#### Contact Section (Footer CTA)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     Let's Connect                                           │
│     ─────────────                                           │
│                                                             │
│     Looking for Summer 2026 internship opportunities        │
│     in chip design, VLSI, or hardware engineering.          │
│                                                             │
│     [ofmohamm@syr.edu]                                      │
│                                                             │
│     [LinkedIn]  [GitHub]                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.2 Projects Page

#### Layout
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     Projects                                                │
│     ────────                                                │
│                                                             │
│     [All]  [Hardware]  [FPGA]  [Embedded]  [Software]       │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │              │  │              │  │              │      │
│  │  Project 1   │  │  Project 2   │  │  Project 3   │      │
│  │              │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │              │  │              │  │              │      │
│  │  Project 4   │  │  Project 5   │  │  Project 6   │      │
│  │              │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Filter tabs for project categories
- Responsive grid (3 columns → 2 → 1)
- Same card component as homepage
- Filter transitions with fade/slide

---

### 4.3 Individual Project Page (Case Study Template)

```
┌─────────────────────────────────────────────────────────────┐
│  [← Back to Projects]                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│     UFONet IoT Flood Monitoring System                      │
│     ══════════════════════════════════                      │
│                                                             │
│     Climate Hazards Research Team (CHaRTS)                  │
│     Syracuse University | May 2025 – Present                │
│                                                             │
│     [PCB Design]  [Embedded Systems]  [IoT]  [Python]       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│     ┌───────────────────────────────────────────────────┐   │
│     │                                                   │   │
│     │              [Hero Image / Video]                 │   │
│     │           PCB render or deployed system           │   │
│     │                                                   │   │
│     └───────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Overview                                                   │
│  ────────                                                   │
│  Brief project summary (2-3 sentences)                      │
│                                                             │
│  The Problem                                                │
│  ───────────                                                │
│  What challenge needed solving? Why did it matter?          │
│                                                             │
│  My Role                                                    │
│  ───────                                                    │
│  Specific contributions (critical for team projects)        │
│                                                             │
│  Technical Approach                                         │
│  ──────────────────                                         │
│  • System architecture decisions                            │
│  • Key component selections with rationale                  │
│  • Implementation details                                   │
│                                                             │
│  [Image: System block diagram or schematic]                 │
│                                                             │
│  Challenges & Solutions                                     │
│  ─────────────────────                                      │
│  Problem → How you solved it → Result                       │
│                                                             │
│  [Image: PCB layout / waveform capture / test setup]        │
│                                                             │
│  Results                                                    │
│  ───────                                                    │
│  Quantified outcomes with metrics                           │
│  • "Designed 2-layer PCB integrating 6 subsystems"          │
│  • "Achieved reliable LoRaWAN communication at 500m range"  │
│                                                             │
│  What I Learned                                             │
│  ──────────────                                             │
│  Technical and process insights                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tools & Technologies                                       │
│  ────────────────────                                       │
│  [KiCad]  [Raspberry Pi]  [LoRaWAN]  [Python]  [FastAPI]    │
│  [Docker]  [Git]                                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Links                                                      │
│  ─────                                                      │
│  [GitHub Repository →]  [Research Team Page →]              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ← Previous Project          Next Project →                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Image Requirements per Project:**
1. Hero image (render, photo, or diagram)
2. Technical diagram (schematic, block diagram, architecture)
3. Implementation detail (PCB layout, code snippet, waveform)
4. Result/working system (photo or demo)

---

### 4.4 About Page

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌────────────┐                                             │
│  │            │                                             │
│  │  [Photo]   │   About Me                                  │
│  │            │   ════════                                  │
│  └────────────┘                                             │
│                                                             │
│  Full bio (200-300 words)                                   │
│  - Engineering passion and what drives you                  │
│  - Current research and focus areas                         │
│  - Career goals (semiconductor industry)                    │
│  - Brief personal element                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Education                                                  │
│  ─────────                                                  │
│  Syracuse University                                        │
│  B.S. Electrical Engineering, Minor in Business             │
│  Expected May 2027 | GPA: 3.90                              │
│  • 1870 Scholar (Full Tuition Merit Award)                  │
│  • Honors Student, 4x Dean's List                           │
│                                                             │
│  Relevant Coursework:                                       │
│  Digital Logic, Microcontroller Lab, Signals & Systems,     │
│  Analog Electronics, Power Engineering                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Technical Skills                                           │
│  ────────────────                                           │
│                                                             │
│  Hardware Design                                            │
│  [PCB Design (KiCad)] [FPGA] [RTL Design] [FSM Design]      │
│                                                             │
│  Digital Design                                             │
│  [VHDL] [Intel Quartus] [Timing Analysis]                   │
│                                                             │
│  Embedded Systems                                           │
│  [ATSAMD21] [STM32] [ESP32] [Arduino] [Raspberry Pi]        │
│  [Register-Level Programming]                               │
│                                                             │
│  Programming                                                │
│  [C/C++] [Python] [VHDL]                                    │
│                                                             │
│  Tools                                                      │
│  [MPLAB X] [STM32CubeIDE] [Git] [Docker] [Oscilloscope]     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Experience                                                 │
│  ──────────                                                 │
│                                                             │
│  Hardware Systems Researcher                                │
│  CHaRTS, Syracuse University | May 2025 – Present           │
│  • Bullet points from resume                                │
│                                                             │
│  Teaching Assistant - EdQuantum Project                     │
│  NSF-Funded, Syracuse University | Jul – Oct 2025           │
│  • Bullet points from resume                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Resume                                                     │
│  ──────                                                     │
│                                                             │
│  [Embedded PDF viewer or preview image]                     │
│                                                             │
│  [Download PDF ↓]                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Design System

### 5.1 Color Palette

#### Light Mode (Primary)
```css
:root {
  /* Backgrounds */
  --bg-primary: #FAF9F6;      /* Warm White - main background */
  --bg-secondary: #F0EAD6;    /* Eggshell - section alternates */
  --bg-card: #FFFFFF;         /* Pure White - cards */
  --bg-code: #F5F2EB;         /* Cream - code blocks */
  
  /* Text */
  --text-primary: #2C2C2C;    /* Charcoal - headings, body */
  --text-secondary: #5C5C5C;  /* Dark Gray - secondary text */
  --text-muted: #8B8B8B;      /* Medium Gray - captions, dates */
  
  /* Accent - Forest Green */
  --green-primary: #355E3B;   /* Hunter Green - links, buttons */
  --green-hover: #2A4B30;     /* Darker - hover states */
  --green-light: #4A7C52;     /* Lighter - subtle accents */
  --green-bg: #E8F0E9;        /* Very light - tag backgrounds */
  
  /* Utility */
  --border: #E5E0D5;          /* Warm gray border */
  --shadow: rgba(44, 44, 44, 0.08);
}
```

#### Dark Mode (Optional Enhancement)
```css
[data-theme="dark"] {
  --bg-primary: #1A1A1A;
  --bg-secondary: #242424;
  --bg-card: #2A2A2A;
  --bg-code: #1E1E1E;
  
  --text-primary: #F0EAD6;
  --text-secondary: #B8B8B8;
  --text-muted: #808080;
  
  --green-primary: #5BA865;
  --green-hover: #6ECF78;
  --green-light: #4A9B54;
  --green-bg: #2A3A2C;
  
  --border: #3A3A3A;
  --shadow: rgba(0, 0, 0, 0.3);
}
```

### 5.2 Typography

#### Font Stack
```css
:root {
  /* Primary - Headers */
  --font-heading: 'Playfair Display', Georgia, serif;
  
  /* Secondary - Body */
  --font-body: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Monospace - Code */
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
}
```

**Alternative Pairing (All Sans-Serif):**
- Headings: Inter (700 weight)
- Body: Inter (400, 500 weights)
- More technical/modern feel

#### Type Scale (1.25 ratio)
```css
:root {
  --text-xs: 0.75rem;     /* 12px - captions */
  --text-sm: 0.875rem;    /* 14px - small text */
  --text-base: 1rem;      /* 16px - body */
  --text-lg: 1.125rem;    /* 18px - large body */
  --text-xl: 1.25rem;     /* 20px - H4 */
  --text-2xl: 1.5rem;     /* 24px - H3 */
  --text-3xl: 1.875rem;   /* 30px - H2 */
  --text-4xl: 2.25rem;    /* 36px - H1 */
  --text-5xl: 3rem;       /* 48px - Hero */
  --text-6xl: 3.75rem;    /* 60px - Display */
}
```

#### Line Heights
```css
:root {
  --leading-tight: 1.2;   /* Headlines */
  --leading-normal: 1.5;  /* Body text */
  --leading-relaxed: 1.7; /* Long-form reading */
}
```

### 5.3 Spacing Scale

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.5rem;    /* 24px */
  --space-6: 2rem;      /* 32px */
  --space-8: 3rem;      /* 48px */
  --space-10: 4rem;     /* 64px */
  --space-12: 6rem;     /* 96px */
  --space-16: 8rem;     /* 128px */
}
```

### 5.4 Layout

```css
:root {
  --max-width: 1200px;        /* Content max width */
  --max-width-narrow: 800px;  /* Article/about max width */
  --gutter: 1.5rem;           /* Side padding mobile */
  --gutter-lg: 3rem;          /* Side padding desktop */
  
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

### 5.5 Shadows

```css
:root {
  --shadow-sm: 0 1px 2px var(--shadow);
  --shadow-md: 0 4px 6px var(--shadow);
  --shadow-lg: 0 10px 15px var(--shadow);
  --shadow-xl: 0 20px 25px var(--shadow);
  
  /* Card hover lift */
  --shadow-hover: 0 12px 20px rgba(44, 44, 44, 0.12);
}
```

---

## 6. Component Specifications

### 6.1 Navigation Header

**Default State:**
- Height: 72px
- Background: transparent (hero) → var(--bg-primary) with blur on scroll
- Logo: Name in var(--font-heading), text-xl
- Links: var(--font-body), text-sm, uppercase, letter-spacing 0.05em
- CTA button: Outlined, green border

**Scrolled State:**
- Height: 56px
- Background: var(--bg-primary) with backdrop-blur
- Subtle bottom border
- Transition: 300ms ease

**Mobile:**
- Hamburger icon (3 lines → X animation)
- Full-screen overlay on open
- Links centered, larger text
- Background: var(--bg-secondary)

### 6.2 Project Card

```
┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │                       │  │
│  │    Project Image      │  │  aspect-ratio: 16/9
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  Project Title              │  text-xl, font-heading
│  ─────────────              │
│                             │
│  [Tag] [Tag] [Tag]          │  text-xs, green-bg
│                             │
│  Brief description of the   │  text-sm, text-secondary
│  project in 1-2 lines...    │  line-clamp: 2
│                             │
└─────────────────────────────┘

Width: 100% (responsive grid)
Padding: var(--space-5)
Background: var(--bg-card)
Border: 1px solid var(--border)
Border-radius: var(--radius-lg)
```

**Hover State:**
- transform: translateY(-4px)
- box-shadow: var(--shadow-hover)
- Image: scale(1.05) within overflow:hidden
- Transition: 300ms ease

### 6.3 Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--green-primary);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: all 200ms ease;
}

.btn-primary:hover {
  background: var(--green-hover);
  transform: translateY(-2px);
}
```

#### Secondary Button (Outlined)
```css
.btn-secondary {
  background: transparent;
  color: var(--green-primary);
  border: 2px solid var(--green-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
}

.btn-secondary:hover {
  background: var(--green-primary);
  color: white;
}
```

### 6.4 Tech Tags

```css
.tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background: var(--green-bg);
  color: var(--green-primary);
  font-size: var(--text-xs);
  font-weight: 500;
  border-radius: var(--radius-full);
  letter-spacing: 0.02em;
}
```

### 6.5 Section Divider

Subtle horizontal line with optional label:
```
──────────  Featured Work  ──────────
```

Implementation: Flexbox with lines as ::before/::after pseudo-elements

---

## 7. Interactions & Animations

### 7.1 Page Load Sequence

```
Timeline:
0ms     - Page renders with content hidden
100ms   - Navigation fades in
300ms   - Hero title slides up + fades in
500ms   - Hero subtitle appears
700ms   - Specialty tags stagger in (100ms each)
900ms   - CTAs fade in
1100ms  - Scroll indicator begins pulsing
```

Implementation: Framer Motion or CSS @keyframes with animation-delay

### 7.2 Scroll Animations

**Fade Up on Enter:**
```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 500ms ease, transform 500ms ease;
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Trigger: IntersectionObserver at 20% visibility threshold

**Staggered Grid Items:**
Each card receives additional delay: `transition-delay: calc(var(--index) * 100ms)`

### 7.3 Micro-Interactions

**Link Hover - Underline Grow:**
```css
.link {
  position: relative;
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--green-primary);
  transition: width 300ms ease;
}

.link:hover::after {
  width: 100%;
}
```

**Magnetic Button Effect:**
On hover, button slightly follows cursor position within bounds.
Use: GSAP or simple mousemove listener with transform.

**Card Image Zoom:**
```css
.card-image-wrapper {
  overflow: hidden;
  border-radius: var(--radius-md);
}

.card-image {
  transition: transform 400ms ease;
}

.card:hover .card-image {
  transform: scale(1.05);
}
```

### 7.4 Page Transitions

Implement CSS View Transitions API:
```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root) {
  animation: fade-out 200ms ease-out;
}

::view-transition-new(root) {
  animation: fade-in 200ms ease-in;
}
```

### 7.5 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Technical Stack

### 8.1 Recommended Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | **Astro** | Zero JS by default, 40% faster than Next.js, islands architecture |
| UI Components | **React** (islands only) | Familiarity, component reuse, Framer Motion support |
| Styling | **Tailwind CSS** | Rapid development, tiny production bundles, great DX |
| Animations | **Framer Motion** | Declarative, React-native, scroll-triggered animations |
| Smooth Scroll | **Lenis** | Lightweight (2-3KB), native feel |
| Icons | **Lucide React** | Clean, consistent, tree-shakeable |
| Hosting | **Vercel** or **Cloudflare Pages** | Edge deployment, fast, free tier |
| CMS (optional) | **MDX files** | Keep content in repo, version controlled |

### 8.2 Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProjectCard.tsx      (interactive version)
│   │   ├── Button.astro
│   │   ├── Tag.astro
│   │   ├── ScrollAnimation.tsx  (client component)
│   │   └── ...
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ProjectLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── projects/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── content/
│   │   └── projects/
│   │       ├── ufonet.mdx
│   │       ├── fpga-cpu.mdx
│   │       └── ...
│   ├── styles/
│   │   └── global.css
│   └── lib/
│       └── utils.ts
├── public/
│   ├── images/
│   │   └── projects/
│   ├── resume.pdf
│   └── favicon.ico
├── astro.config.mjs
├── tailwind.config.js
└── package.json
```

### 8.3 Key Dependencies

```json
{
  "dependencies": {
    "astro": "^4.x",
    "@astrojs/react": "^3.x",
    "@astrojs/tailwind": "^5.x",
    "@astrojs/mdx": "^3.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "framer-motion": "^11.x",
    "@studio-freight/lenis": "^1.x",
    "lucide-react": "^0.x"
  }
}
```

### 8.4 Performance Budget

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 95 |
| First Contentful Paint | < 1.0s |
| Largest Contentful Paint | < 1.5s |
| Total Blocking Time | < 100ms |
| Cumulative Layout Shift | < 0.1 |
| Total JS Bundle | < 50KB gzipped |
| Total Page Weight | < 500KB (excluding images) |

---

## 9. Content Requirements

### 9.1 Content to Create

| Content | Status | Priority |
|---------|--------|----------|
| Professional headshot | Needed | High |
| Bio (short - 100 words) | Needed | High |
| Bio (long - 250 words) | Needed | Medium |
| Resume PDF | Exists | Update |

### 9.2 Project Content Matrix

| Project | Hero Image | Diagrams | Code/Detail | Results | Priority |
|---------|------------|----------|-------------|---------|----------|
| UFONet IoT System | PCB render | System architecture, schematic | PCB layout | Deploy photo | **High** |
| 4-Bit FPGA CPU | Block diagram | Datapath diagram | VHDL snippets | Waveform capture | **High** |
| Elevator Controller | Demo video | State machine diagram | Code snippet | Working demo | High |
| FPGA Change Detection | Concept diagram | Architecture | RTL code | TBD | Medium |
| Bluetooth Messaging | Photo | Circuit diagram | Code | Demo | Medium |

### 9.3 Image Specifications

| Usage | Dimensions | Format | Max Size |
|-------|------------|--------|----------|
| Project card thumbnail | 800 x 450 | WebP | 80KB |
| Project hero | 1600 x 900 | WebP | 200KB |
| Technical diagrams | 1200 x auto | PNG/SVG | 150KB |
| Profile photo | 400 x 400 | WebP | 50KB |

Use `<picture>` with srcset for responsive images.

---

## 10. Responsive Breakpoints

```css
/* Mobile first */
/* Default: 0 - 639px (mobile) */

@media (min-width: 640px) {
  /* sm: Tablet portrait */
}

@media (min-width: 768px) {
  /* md: Tablet landscape */
}

@media (min-width: 1024px) {
  /* lg: Desktop */
}

@media (min-width: 1280px) {
  /* xl: Large desktop */
}
```

### Layout Changes by Breakpoint

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Project grid | 1 column | 2 columns | 3 columns |
| Hero text | text-4xl | text-5xl | text-6xl |
| Navigation | Hamburger | Hamburger | Full links |
| Section padding | space-8 | space-10 | space-16 |
| Sidebar (about) | Stacked | Stacked | Side-by-side |

---

## 11. Accessibility Requirements

### 11.1 WCAG 2.1 AA Compliance

- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Color contrast ratio ≥ 3:1 for large text and UI elements
- [ ] Focus states visible on all interactive elements
- [ ] Skip-to-content link
- [ ] Semantic HTML structure
- [ ] Alt text on all images
- [ ] Reduced motion support
- [ ] Keyboard navigation for all interactions
- [ ] ARIA labels where semantic HTML insufficient

### 11.2 Focus Styles

```css
:focus-visible {
  outline: 2px solid var(--green-primary);
  outline-offset: 2px;
}

/* Remove default outline when using mouse */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

## 12. SEO & Meta

### 12.1 Meta Tags Template

```html
<head>
  <title>Omar Mohammed | Electrical Engineering Student</title>
  <meta name="description" content="Electrical engineering student at Syracuse University specializing in embedded systems, FPGA design, and PCB development. Seeking Summer 2026 hardware engineering internships.">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Omar Mohammed | Electrical Engineering Student">
  <meta property="og:description" content="Hardware engineer building IoT systems and custom digital architectures.">
  <meta property="og:image" content="/og-image.png">
  <meta property="og:type" content="website">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  
  <!-- Canonical -->
  <link rel="canonical" href="https://omarmohammed.com">
</head>
```

### 12.2 Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Omar Mohammed",
  "jobTitle": "Electrical Engineering Student",
  "affiliation": {
    "@type": "CollegeOrUniversity",
    "name": "Syracuse University"
  },
  "url": "https://omarmohammed.com",
  "sameAs": [
    "https://linkedin.com/in/ofmohammed",
    "https://github.com/ofmohamm"
  ]
}
```

---

## 13. Unique Differentiators

### 13.1 Signature Interactions (Pick 1-2)

**Option A: Circuit Path Cursor Trail**
Cursor leaves a fading "circuit trace" path on the hero section. Subtle nod to EE background.

**Option B: Interactive PCB Easter Egg**
Hidden on About page: hovering specific coordinates reveals a simplified interactive PCB where components light up with tooltips.

**Option C: Terminal Command Bar**
Press `/` or `Cmd+K` to open command palette:
- `projects` → Navigate to projects
- `resume` → Download resume
- `github` → Open GitHub
- `contact` → Jump to contact

Shows technical sophistication without being primary navigation.

**Option D: Waveform Section Dividers**
Instead of plain `<hr>`, use animated SVG sine waves or square waves as section dividers. Subtle, thematic, unique.

### 13.2 Warmth Elements

- Hand-drawn style icons or accents (optional)
- Workspace photo in footer or about page
- "Currently reading/learning" live status
- Casual microcopy: "Let's build something together" vs "Contact me"

---

## 14. Launch Checklist

### Pre-Launch
- [ ] All project content written and proofread
- [ ] Images optimized and properly sized
- [ ] Resume PDF updated and uploaded
- [ ] Contact form tested (or mailto link verified)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Lighthouse audit passed (95+ performance)
- [ ] All links verified working
- [ ] Accessibility audit passed
- [ ] 404 page created
- [ ] Favicon and OG images added
- [ ] Analytics configured (Plausible or Vercel Analytics)

### Post-Launch
- [ ] Submit to Google Search Console
- [ ] Update LinkedIn with website link
- [ ] Update GitHub profile with website link
- [ ] Update resume header with website URL
- [ ] Share with advisors for feedback
- [ ] Test recruiter flow (time yourself scanning)

---

## 15. Future Enhancements (Post-MVP)

1. **Blog section** - Technical write-ups on projects (good for SEO)
2. **Dark mode toggle** - User preference respected
3. **Project filtering** - By technology or type
4. **Interactive demos** - Embedded simulations where possible
5. **Visitor analytics dashboard** - Track which projects get attention
6. **Automated resume sync** - Generate web version from PDF

---

## Appendix A: Inspiration Reference Links

**Minimalist Portfolios:**
- brittanychiang.com
- lauren-waller.com
- michaelmannucci.com

**Creative Technical:**
- bruno-simon.com (3D - study, don't copy)
- tim-gesemann.dev

**Project Presentation:**
- guillaumecolombel.fr
- gregorylalle.com

**Resource Sites:**
- awwwards.com/websites/portfolio
- siteinspire.com
- wallofportfolios.in/minimal

---

## Appendix B: Writing Guidelines

### Project Descriptions
- Lead with impact, not technology
- Use active voice: "Designed" not "Was responsible for designing"
- Quantify everything possible
- Explain why decisions were made, not just what
- Keep paragraphs to 3-4 sentences max

### Bio Tone
- First person, conversational but professional
- Confident without arrogance
- Show enthusiasm for the field
- Include one human/personal element

### CTA Copy
- Action-oriented: "View Project" not "Click here"
- Friendly: "Let's connect" not "Contact form"
- Clear: "Download Resume" not "Get PDF"

---

*End of Design Specification Document*
