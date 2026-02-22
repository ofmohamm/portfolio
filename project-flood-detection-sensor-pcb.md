# Omar Mohammed Portfolio Website
## Project Page Specification — Flood Detection Sensor PCB

**Version:** 1.0  
**Last Updated:** February 2026  
**Status:** Ready to implement

---

## OVERVIEW

This document specifies the content and structure for the Flood Detection Sensor PCB project page. This format can serve as a template for other project pages.

---

## SECTION 1: PROJECT PAGE STRUCTURE

### 1.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   Title                                                                     │
│   Subtitle (context · location · date)                                      │
│                                                                             │
│   [ Tag ]  [ Tag ]  [ Tag ]                                                 │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                         [ Hero Image ]                                      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Overview                                                                  │
│   (what it is + personal experience + credits)                              │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Tools                                                                     │
│   [ Tool pill ]  [ Tool pill ]                                              │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Tech Specs                                                                │
│   (key-value pairs)                                                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   [ View on GitHub → ]                                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## SECTION 2: FLOOD DETECTION SENSOR PCB — CONTENT

### 2.1 Header

**Title:** `Flood Detection Sensor PCB`

**Subtitle:** `CHaRTS Research Lab · Syracuse University · Summer 2025`

**Tags:** 
- PCB Design
- IoT
- LoRaWAN

### 2.2 Hero Image

**Source:** 3D PCB render from GitHub repo

**Image URL:** Use the PCB render image from the repository

**Alt text:** `3D render of Flood Detection Sensor PCB`

**Aspect ratio:** 16:9 or 16:10

### 2.3 Overview

```
Custom PCB for a battery-powered flood monitoring system. Integrates thermal imaging, environmental sensors, and LoRa communication for remote deployment in urban watersheds.

This was my first time designing a PCB — I taught myself KiCad and went from schematic to fabrication-ready Gerbers in a few weeks. Shoutout to Dr. Elizabeth Carter and Manu Shergill for the mentorship.
```

### 2.4 Tools

**Pills:**
- KiCad

### 2.5 Tech Specs

| Key | Value |
|-----|-------|
| Board | 2-layer, 0.25mm signal / 0.5mm power traces |
| Power | 3.3V + 5V rails, Witty Pi 4 power management |
| Communication | LoRaWAN (mDot module), I²C, UART |
| Sensors | FLIR Lepton thermal camera, BNO055 IMU |

### 2.6 External Link

**Text:** `View on GitHub`

**URL:** `https://github.com/ofmohamm/SU-WaterCam-PCB`

**Behavior:** Opens in new tab

---

## SECTION 3: STYLING

### 3.1 Header Section

```css
.project-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.project-subtitle {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
}

.project-tag {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--green-primary);
  background: var(--green-bg);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
}
```

### 3.2 Hero Image

```css
.project-hero {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-10);
}
```

### 3.3 Overview Section

```css
.project-section-heading {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.project-overview {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--text-primary);
  line-height: 1.7;
  margin-bottom: var(--space-10);
}

.project-overview p {
  margin-bottom: var(--space-4);
}

.project-overview p:last-child {
  margin-bottom: 0;
}
```

### 3.4 Tools Section

```css
.project-tools {
  margin-bottom: var(--space-10);
}

.tool-pill {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--green-primary);
  background: var(--green-bg);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  display: inline-block;
}
```

### 3.5 Tech Specs Section

```css
.project-specs {
  margin-bottom: var(--space-10);
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
}

.specs-table tr {
  border-bottom: 1px solid var(--border);
}

.specs-table tr:last-child {
  border-bottom: none;
}

.specs-key {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-secondary);
  padding: var(--space-3) 0;
  width: 140px;
  vertical-align: top;
}

.specs-value {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--text-primary);
  padding: var(--space-3) 0;
}
```

### 3.6 External Link

```css
.project-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--green-primary);
  text-decoration: none;
  transition: gap 0.2s ease;
}

.project-link:hover {
  gap: var(--space-3);
}

.project-link .arrow {
  transition: transform 0.2s ease;
}

.project-link:hover .arrow {
  transform: translateX(4px);
}
```

---

## SECTION 4: HTML STRUCTURE

```html
<article class="project-page">
  
  <!-- Header -->
  <header class="project-header">
    <h1 class="project-title">Flood Detection Sensor PCB</h1>
    <p class="project-subtitle">CHaRTS Research Lab · Syracuse University · Summer 2025</p>
    <div class="project-tags">
      <span class="project-tag">PCB Design</span>
      <span class="project-tag">IoT</span>
      <span class="project-tag">LoRaWAN</span>
    </div>
  </header>
  
  <!-- Hero Image -->
  <img 
    src="/images/projects/flood-sensor-pcb-render.png" 
    alt="3D render of Flood Detection Sensor PCB"
    class="project-hero"
  />
  
  <!-- Overview -->
  <section class="project-overview-section">
    <h2 class="project-section-heading">Overview</h2>
    <div class="project-overview">
      <p>
        Custom PCB for a battery-powered flood monitoring system. Integrates 
        thermal imaging, environmental sensors, and LoRa communication for 
        remote deployment in urban watersheds.
      </p>
      <p>
        This was my first time designing a PCB — I taught myself KiCad and 
        went from schematic to fabrication-ready Gerbers in a few weeks. 
        Shoutout to Dr. Elizabeth Carter and Manu Shergill for the mentorship.
      </p>
    </div>
  </section>
  
  <!-- Tools -->
  <section class="project-tools">
    <h2 class="project-section-heading">Tools</h2>
    <div class="tools-list">
      <span class="tool-pill">KiCad</span>
    </div>
  </section>
  
  <!-- Tech Specs -->
  <section class="project-specs">
    <h2 class="project-section-heading">Tech Specs</h2>
    <table class="specs-table">
      <tr>
        <td class="specs-key">Board</td>
        <td class="specs-value">2-layer, 0.25mm signal / 0.5mm power traces</td>
      </tr>
      <tr>
        <td class="specs-key">Power</td>
        <td class="specs-value">3.3V + 5V rails, Witty Pi 4 power management</td>
      </tr>
      <tr>
        <td class="specs-key">Communication</td>
        <td class="specs-value">LoRaWAN (mDot module), I²C, UART</td>
      </tr>
      <tr>
        <td class="specs-key">Sensors</td>
        <td class="specs-value">FLIR Lepton thermal camera, BNO055 IMU</td>
      </tr>
    </table>
  </section>
  
  <!-- External Link -->
  <a href="https://github.com/ofmohamm/SU-WaterCam-PCB" target="_blank" rel="noopener" class="project-link">
    View on GitHub
    <span class="arrow">→</span>
  </a>
  
</article>
```

---

## SECTION 5: RESPONSIVE CONSIDERATIONS

### Mobile (< 768px)

- Title font size reduces via clamp
- Tags wrap naturally
- Specs table: keys and values stack vertically if needed
- Full-width hero image

```css
@media (max-width: 768px) {
  .specs-table tr {
    display: flex;
    flex-direction: column;
  }
  
  .specs-key {
    width: 100%;
    padding-bottom: var(--space-1);
  }
  
  .specs-value {
    padding-top: 0;
    padding-bottom: var(--space-4);
  }
}
```

---

## SECTION 6: IMPLEMENTATION CHECKLIST

- [ ] Create project page route `/projects/flood-detection-sensor-pcb`
- [ ] Add hero image to `/public/images/projects/`
- [ ] Implement header with title, subtitle, tags
- [ ] Implement overview section with two paragraphs
- [ ] Implement tools section with pill styling
- [ ] Implement tech specs as table
- [ ] Add GitHub link with arrow animation
- [ ] Test mobile responsive layout
- [ ] Add to projects grid on homepage and `/projects` page

---

## APPENDIX: QUICK REFERENCE

### Content Summary

| Field | Value |
|-------|-------|
| Title | Flood Detection Sensor PCB |
| Subtitle | CHaRTS Research Lab · Syracuse University · Summer 2025 |
| Tags | PCB Design, IoT, LoRaWAN |
| Tools | KiCad |
| GitHub | https://github.com/ofmohamm/SU-WaterCam-PCB |

### Overview Copy

**Paragraph 1:**
Custom PCB for a battery-powered flood monitoring system. Integrates thermal imaging, environmental sensors, and LoRa communication for remote deployment in urban watersheds.

**Paragraph 2:**
This was my first time designing a PCB — I taught myself KiCad and went from schematic to fabrication-ready Gerbers in a few weeks. Shoutout to Dr. Elizabeth Carter and Manu Shergill for the mentorship.

### Tech Specs

| Key | Value |
|-----|-------|
| Board | 2-layer, 0.25mm signal / 0.5mm power traces |
| Power | 3.3V + 5V rails, Witty Pi 4 power management |
| Communication | LoRaWAN (mDot module), I²C, UART |
| Sensors | FLIR Lepton thermal camera, BNO055 IMU |

---

*End of Project Page Specification*
