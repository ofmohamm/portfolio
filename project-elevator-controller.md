# Omar Mohammed Portfolio Website
## Project Page Specification — Elevator Control System

**Version:** 1.0  
**Last Updated:** February 2026  
**Status:** Ready to implement

---

## OVERVIEW

This document specifies the content and structure for the Elevator Control System project page, including the custom LCD mockup hero image.

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
│                    ┌────────────────────┐                                   │
│                    │ Floor: 4           │                                   │
│                    │ Going Up ^         │                                   │
│                    └────────────────────┘                                   │
│                      [ LCD Mockup Image ]                                   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Overview                                                                  │
│   (what it is + personal experience)                                        │
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
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## SECTION 2: ELEVATOR CONTROL SYSTEM — CONTENT

### 2.1 Header

**Title:** `10-Floor Elevator Controller`

**Subtitle:** `Microcontroller Systems Lab · Syracuse University · Fall 2025`

**Tags:** 
- Embedded C
- ATSAMD21
- Register-Level Programming

### 2.2 Hero Image — LCD Mockup

Custom LCD display mockup showing elevator in action.

**Display content:**
- Line 1: `Floor: 4`
- Line 2: `Going Up ^`

**Implementation:** Use the HTML/CSS mockup, either as:
- A. Rendered as a static PNG/WebP image (simpler)
- B. Embedded as inline HTML component (more flexible)

**Recommendation:** Export as PNG for simplicity and faster load times.

### 2.3 Overview

```
Programmed a 10-floor elevator controller from scratch on an ATSAMD21 microcontroller. Users request floors via keypad, and the LCD shows real-time position as the elevator moves — 2-second transitions between floors, LEDs for status, buzzer for arrival.

No Arduino libraries — everything built at the register level. Timers, interrupts, GPIO, all configured by hand. Painful but satisfying.
```

### 2.4 Tools

**Pills:**
- MPLAB X
- C

### 2.5 Tech Specs

| Key | Value |
|-----|-------|
| MCU | ATSAMD21 (ARM Cortex-M0+) |
| Programming | Register-level C, no HAL/libraries |
| Interface | 4x4 keypad input, 16x2 LCD output |
| Peripherals | LEDs (floor indicators), buzzer (arrival alert) |
| Timing | Interrupt-driven, 2-second floor transitions |

### 2.6 External Link

No GitHub repo for this project — omit the link section.

---

## SECTION 3: LCD MOCKUP IMAGE

### 3.1 HTML/CSS Source

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LCD Mockup - Elevator Controller</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FAF9F6;
      font-family: system-ui, sans-serif;
    }

    .lcd-container {
      position: relative;
      width: 400px;
    }

    .lcd-image {
      width: 100%;
      display: block;
      border-radius: 4px;
    }

    .lcd-text-overlay {
      position: absolute;
      top: 27%;
      left: 13%;
      width: 74%;
      height: 46%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 8px 16px;
      font-family: 'Courier New', monospace;
      font-weight: bold;
      font-size: 20px;
      letter-spacing: 3px;
      color: #d4e4f7;
      text-shadow: 
        0 0 10px rgba(180, 210, 255, 0.9),
        0 0 20px rgba(150, 190, 255, 0.6);
    }

    .lcd-line {
      line-height: 1.8;
      display: flex;
      align-items: center;
    }

    .arrow {
      display: inline-block;
      transform: translateY(5px);
    }

    .floor-num {
      display: inline-block;
      transform: translate(-2px, 2px);
    }

    /* Subtle scanline effect */
    .lcd-text-overlay::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.03) 0px,
        rgba(0, 0, 0, 0.03) 1px,
        transparent 1px,
        transparent 3px
      );
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div class="lcd-container">
    <img 
      src="/images/projects/lcd-hardware.png" 
      alt="16x2 LCD Display" 
      class="lcd-image"
    />
    
    <div class="lcd-text-overlay">
      <div class="lcd-line lcd-line-1">
        <span>Floor: <span class="floor-num">4</span></span>
      </div>
      <div class="lcd-line lcd-line-2">
        <span>Going Up <span class="arrow">^</span></span>
      </div>
    </div>
  </div>
</body>
</html>
```

### 3.2 Exporting as Static Image

To export the mockup as a PNG:

1. Open the HTML file in a browser
2. Use browser DevTools or a screenshot tool
3. Capture at 2x resolution for retina displays
4. Save as `elevator-lcd-mockup.png`

Or use a headless browser:
```bash
npx puppeteer screenshot lcd-mockup.html elevator-lcd-mockup.png --width=400 --height=200
```

### 3.3 Using as Inline Component (Astro)

```astro
---
// LCDMockup.astro
interface Props {
  line1: string;
  line2: string;
}

const { line1, line2 } = Astro.props;
---

<div class="lcd-container">
  <img 
    src="/images/projects/lcd-hardware.png" 
    alt="16x2 LCD Display" 
    class="lcd-image"
  />
  
  <div class="lcd-text-overlay">
    <div class="lcd-line">
      <span set:html={line1} />
    </div>
    <div class="lcd-line">
      <span set:html={line2} />
    </div>
  </div>
</div>

<style>
  .lcd-container {
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .lcd-image {
    width: 100%;
    display: block;
    border-radius: 4px;
  }

  .lcd-text-overlay {
    position: absolute;
    top: 27%;
    left: 13%;
    width: 74%;
    height: 46%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px 16px;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    font-size: clamp(14px, 4vw, 20px);
    letter-spacing: 3px;
    color: #d4e4f7;
    text-shadow: 
      0 0 10px rgba(180, 210, 255, 0.9),
      0 0 20px rgba(150, 190, 255, 0.6);
  }

  .lcd-line {
    line-height: 1.8;
    display: flex;
    align-items: center;
  }

  .lcd-text-overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.03) 0px,
      rgba(0, 0, 0, 0.03) 1px,
      transparent 1px,
      transparent 3px
    );
    pointer-events: none;
  }
</style>
```

**Usage:**
```astro
<LCDMockup 
  line1="Floor: <span class='floor-num'>4</span>" 
  line2="Going Up <span class='arrow'>^</span>" 
/>
```

---

## SECTION 4: FULL PAGE HTML STRUCTURE

```html
<article class="project-page">
  
  <!-- Header -->
  <header class="project-header">
    <h1 class="project-title">10-Floor Elevator Controller</h1>
    <p class="project-subtitle">Microcontroller Systems Lab · Syracuse University · Fall 2025</p>
    <div class="project-tags">
      <span class="project-tag">Embedded C</span>
      <span class="project-tag">ATSAMD21</span>
      <span class="project-tag">Register-Level Programming</span>
    </div>
  </header>
  
  <!-- Hero Image - LCD Mockup -->
  <div class="project-hero lcd-mockup-container">
    <div class="lcd-container">
      <img 
        src="/images/projects/lcd-hardware.png" 
        alt="16x2 LCD Display showing Floor: 4, Going Up"
        class="lcd-image"
      />
      <div class="lcd-text-overlay">
        <div class="lcd-line">
          <span>Floor: <span class="floor-num">4</span></span>
        </div>
        <div class="lcd-line">
          <span>Going Up <span class="arrow">^</span></span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Overview -->
  <section class="project-overview-section">
    <h2 class="project-section-heading">Overview</h2>
    <div class="project-overview">
      <p>
        Programmed a 10-floor elevator controller from scratch on an ATSAMD21 
        microcontroller. Users request floors via keypad, and the LCD shows 
        real-time position as the elevator moves — 2-second transitions between 
        floors, LEDs for status, buzzer for arrival.
      </p>
      <p>
        No Arduino libraries — everything built at the register level. Timers, 
        interrupts, GPIO, all configured by hand. Painful but satisfying.
      </p>
    </div>
  </section>
  
  <!-- Tools -->
  <section class="project-tools">
    <h2 class="project-section-heading">Tools</h2>
    <div class="tools-list">
      <span class="tool-pill">MPLAB X</span>
      <span class="tool-pill">C</span>
    </div>
  </section>
  
  <!-- Tech Specs -->
  <section class="project-specs">
    <h2 class="project-section-heading">Tech Specs</h2>
    <table class="specs-table">
      <tr>
        <td class="specs-key">MCU</td>
        <td class="specs-value">ATSAMD21 (ARM Cortex-M0+)</td>
      </tr>
      <tr>
        <td class="specs-key">Programming</td>
        <td class="specs-value">Register-level C, no HAL/libraries</td>
      </tr>
      <tr>
        <td class="specs-key">Interface</td>
        <td class="specs-value">4x4 keypad input, 16x2 LCD output</td>
      </tr>
      <tr>
        <td class="specs-key">Peripherals</td>
        <td class="specs-value">LEDs (floor indicators), buzzer (arrival alert)</td>
      </tr>
      <tr>
        <td class="specs-key">Timing</td>
        <td class="specs-value">Interrupt-driven, 2-second floor transitions</td>
      </tr>
    </table>
  </section>
  
</article>
```

---

## SECTION 5: LCD MOCKUP STYLING

```css
/* LCD Mockup Container */
.lcd-mockup-container {
  display: flex;
  justify-content: center;
  padding: var(--space-8) 0;
}

.lcd-container {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.lcd-image {
  width: 100%;
  display: block;
  border-radius: 4px;
}

.lcd-text-overlay {
  position: absolute;
  top: 27%;
  left: 13%;
  width: 74%;
  height: 46%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px 16px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: clamp(14px, 4vw, 20px);
  letter-spacing: 3px;
  color: #d4e4f7;
  text-shadow: 
    0 0 10px rgba(180, 210, 255, 0.9),
    0 0 20px rgba(150, 190, 255, 0.6);
}

.lcd-line {
  line-height: 1.8;
  display: flex;
  align-items: center;
}

.lcd-text-overlay .arrow {
  display: inline-block;
  transform: translateY(5px);
}

.lcd-text-overlay .floor-num {
  display: inline-block;
  transform: translate(-2px, 2px);
}

/* Scanline effect */
.lcd-text-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.03) 0px,
    rgba(0, 0, 0, 0.03) 1px,
    transparent 1px,
    transparent 3px
  );
  pointer-events: none;
}

/* Responsive */
@media (max-width: 480px) {
  .lcd-container {
    max-width: 300px;
  }
  
  .lcd-text-overlay {
    letter-spacing: 2px;
  }
}
```

---

## SECTION 6: FILE REQUIREMENTS

### Images
- [ ] `/public/images/projects/lcd-hardware.png` — The base LCD hardware image (the green PCB with blue screen)

### Assets Location
```
/public/images/projects/
  └── lcd-hardware.png
```

---

## SECTION 7: IMPLEMENTATION CHECKLIST

### Setup
- [ ] Add LCD hardware image to `/public/images/projects/`
- [ ] Create project page route `/projects/elevator-controller`

### Content
- [ ] Implement header with title, subtitle, tags
- [ ] Implement LCD mockup with text overlay
- [ ] Implement overview section (two paragraphs)
- [ ] Implement tools section with pills
- [ ] Implement tech specs as table

### Styling
- [ ] Add LCD mockup CSS (overlay positioning, glow effect, scanlines)
- [ ] Ensure responsive behavior on mobile
- [ ] Test text readability on various screen sizes

### Testing
- [ ] Verify LCD text is properly positioned over the blue screen
- [ ] Test on mobile devices
- [ ] Add to projects grid on homepage and `/projects` page

---

## APPENDIX: QUICK REFERENCE

### Content Summary

| Field | Value |
|-------|-------|
| Title | 10-Floor Elevator Controller |
| Subtitle | Microcontroller Systems Lab · Syracuse University · Fall 2025 |
| Tags | Embedded C, ATSAMD21, Register-Level Programming |
| Tools | MPLAB X, C |
| GitHub | None |

### Overview Copy

**Paragraph 1:**
Programmed a 10-floor elevator controller from scratch on an ATSAMD21 microcontroller. Users request floors via keypad, and the LCD shows real-time position as the elevator moves — 2-second transitions between floors, LEDs for status, buzzer for arrival.

**Paragraph 2:**
No Arduino libraries — everything built at the register level. Timers, interrupts, GPIO, all configured by hand. Painful but satisfying.

### Tech Specs

| Key | Value |
|-----|-------|
| MCU | ATSAMD21 (ARM Cortex-M0+) |
| Programming | Register-level C, no HAL/libraries |
| Interface | 4x4 keypad input, 16x2 LCD output |
| Peripherals | LEDs (floor indicators), buzzer (arrival alert) |
| Timing | Interrupt-driven, 2-second floor transitions |

### LCD Display Content

| Line | Text |
|------|------|
| 1 | Floor: 4 |
| 2 | Going Up ^ |

---

*End of Project Page Specification*
