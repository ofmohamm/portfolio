# Omar Mohammed Portfolio Website
## Design Specification — Version 3.9

**Version:** 3.9  
**Last Updated:** February 2026  
**Status:** FINAL — New Project Pages Implementation

---

## OVERVIEW

This update adds two new project pages with custom hover effects:

1. **4-Bit CPU Architecture** — Pop hover effect
2. **Bluetooth Messaging System** — Wiggle hover effect

Both use transparent PNG images for seamless integration with the site background.

---

## SECTION 1: FILE STRUCTURE

```
/public/images/projects/
  ├── elevator.png           (existing)
  ├── chip.png               (CPU project - transparent)
  └── bluetooth-bubbles.png  (Bluetooth project - transparent)
```

**Background color for all project cards:** `rgb(243, 241, 237)` / `#F3F1ED`

---

## SECTION 2: PROJECT CONTENT

### 2.1 4-Bit CPU Architecture

**Route:** `/projects/cpu`

| Field | Value |
|-------|-------|
| Title | 4-Bit CPU Architecture |
| Subtitle | Syracuse University · Spring 2025 |
| Tags | VHDL, FPGA, Digital Design |
| Image | `/images/projects/chip.png` |
| Tools | Intel Quartus, VHDL |

**Overview:**

```
Designed a working 4-bit processor on an FPGA. Built every piece in VHDL: the ALU for math and logic, registers to hold data, a program counter to track instructions, and a state machine to control timing.

Spent a lot of time staring at waveforms wondering why nothing worked. Then one afternoon the test program actually ran. Adding two numbers, storing the result, branching on a condition. Basic stuff, but I built the thing that did it. That was the moment chip design stopped being abstract coursework and became something I wanted to do.
```

**Tech Specs:**

| Spec | Value |
|------|-------|
| Platform | Analog Discovery 2 FPGA |
| Language | VHDL |
| Components | ALU, registers, program counter, control FSM |
| Validation | Simulation + hardware testing |

---

### 2.2 Bluetooth Messaging System

**Route:** `/projects/bluetooth`

| Field | Value |
|-------|-------|
| Title | Bluetooth Messaging System |
| Subtitle | Syracuse University · Fall 2025 |
| Tags | Embedded C, Arduino, Bluetooth |
| Image | `/images/projects/bluetooth-bubbles.png` |
| Tools | Arduino IDE, C |

**Overview:**

```
Built a wireless messaging device using an Arduino and HC-05 Bluetooth module. Pairs with a smartphone for two-way texting. Implemented multi-tap text entry on a keypad, old-school phone style, with messages displaying on a 16x2 LCD.

Simple idea, surprisingly tricky execution. Debouncing the keypad, timing the multi-tap windows, and keeping the Bluetooth connection stable all at once. Good intro to real-time constraints.
```

**Tech Specs:**

| Spec | Value |
|------|-------|
| MCU | Arduino (ATmega328P) |
| Wireless | HC-05 Bluetooth |
| Interface | 4x4 keypad, 16x2 LCD |

---

## SECTION 3: TAILWIND CONFIGURATION

Add to `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(-2deg)' },
          '30%': { transform: 'rotate(1.5deg)' },
          '45%': { transform: 'rotate(-1.5deg)' },
          '60%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-0.5deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 0.6s ease-in-out',
      }
    }
  }
}
```

---

## SECTION 4: PROJECT CARDS (Home Page Grid)

### 4.1 Card Container

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- Elevator Card -->
  <!-- CPU Card -->
  <!-- Bluetooth Card -->
</div>
```

### 4.2 CPU Project Card — Pop Effect

```html
<a 
  href="/projects/cpu" 
  class="group block overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
>
  <div class="aspect-video bg-[#F3F1ED] flex items-center justify-center p-8">
    <img 
      src="/images/projects/chip.png" 
      alt="4-Bit CPU Architecture"
      class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
    />
  </div>
  <div class="p-4">
    <h3 class="text-lg font-medium text-gray-900">4-Bit CPU Architecture</h3>
    <p class="text-sm text-gray-500 mt-1">VHDL · FPGA · Digital Design</p>
  </div>
</a>
```

### 4.3 Bluetooth Project Card — Wiggle Effect

```html
<a 
  href="/projects/bluetooth" 
  class="group block overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
>
  <div class="aspect-video bg-[#F3F1ED] flex items-center justify-center p-8">
    <img 
      src="/images/projects/bluetooth-bubbles.png" 
      alt="Bluetooth Messaging System"
      class="max-h-full max-w-full object-contain group-hover:animate-wiggle"
    />
  </div>
  <div class="p-4">
    <h3 class="text-lg font-medium text-gray-900">Bluetooth Messaging System</h3>
    <p class="text-sm text-gray-500 mt-1">Embedded C · Arduino · Bluetooth</p>
  </div>
</a>
```

### 4.4 Elevator Card — Pop Effect (Reference)

```html
<a 
  href="/projects/elevator" 
  class="group block overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
>
  <div class="aspect-video bg-[#F3F1ED] flex items-center justify-center p-8">
    <img 
      src="/images/projects/elevator.png" 
      alt="Elevator Control System"
      class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
    />
  </div>
  <div class="p-4">
    <h3 class="text-lg font-medium text-gray-900">Elevator Control System</h3>
    <p class="text-sm text-gray-500 mt-1">C · ATSAMD21 · Register-Level</p>
  </div>
</a>
```

---

## SECTION 5: PROJECT PAGE TEMPLATE

### 5.1 Page Structure

```html
<main class="max-w-4xl mx-auto px-4 py-16">
  
  <!-- Header -->
  <header class="mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
    <p class="text-lg text-gray-500">{subtitle}</p>
    <div class="flex gap-2 mt-4">
      {tags.map(tag => (
        <span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
          {tag}
        </span>
      ))}
    </div>
  </header>

  <!-- Hero Image -->
  <div class="aspect-video bg-[#F3F1ED] rounded-lg flex items-center justify-center p-12 mb-12">
    <img 
      src="{image}" 
      alt="{title}"
      class="max-h-full max-w-full object-contain"
    />
  </div>

  <!-- Overview -->
  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
    <div class="text-gray-600 leading-relaxed space-y-4">
      {overview paragraphs}
    </div>
  </section>

  <!-- Tools -->
  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-gray-900 mb-4">Tools</h2>
    <p class="text-gray-600">{tools}</p>
  </section>

  <!-- Tech Specs -->
  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-gray-900 mb-4">Tech Specs</h2>
    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {specs.map(spec => (
        <div class="bg-gray-50 p-4 rounded-lg">
          <dt class="text-sm text-gray-500">{spec.label}</dt>
          <dd class="text-gray-900 font-medium">{spec.value}</dd>
        </div>
      ))}
    </dl>
  </section>

  <!-- Back Link -->
  <a href="/#projects" class="text-[#2E5339] hover:underline">
    ← Back to Projects
  </a>

</main>
```

---

## SECTION 6: HOVER EFFECTS SUMMARY

| Project | Effect | Tailwind Classes |
|---------|--------|------------------|
| Elevator | Pop (scale + lift) | `group-hover:scale-105` on image |
| CPU | Pop (scale + lift) | `group-hover:scale-105` on image |
| Bluetooth | Wiggle | `group-hover:animate-wiggle` on image |
| All Cards | Lift + shadow | `hover:-translate-y-2 hover:shadow-xl` on card |

---

## SECTION 7: COLOR REFERENCE

| Element | Color | Tailwind |
|---------|-------|----------|
| Card background | `rgb(243, 241, 237)` | `bg-[#F3F1ED]` |
| Green accent | `#2E5339` | `text-[#2E5339]` |
| Text primary | `#1a1a1a` | `text-gray-900` |
| Text secondary | `#666` | `text-gray-500` |
| Tag background | `#f3f4f6` | `bg-gray-100` |

---

## SECTION 8: IMPLEMENTATION CHECKLIST

### Images
- [x] Upload `chip.png` to `/public/images/projects/`
- [x] Upload `bluetooth-bubbles.png` to `/public/images/projects/`

### Tailwind Config
- [ ] Add `wiggle` keyframes to `tailwind.config.js`
- [ ] Add `wiggle` animation to config

### Home Page
- [ ] Add CPU project card to grid
- [ ] Add Bluetooth project card to grid
- [ ] Apply pop effect to CPU card (scale on hover)
- [ ] Apply wiggle effect to Bluetooth card

### Project Pages
- [ ] Create `/projects/cpu` page
- [ ] Create `/projects/bluetooth` page
- [ ] Add content from Section 2
- [ ] Style with template from Section 5

### Testing
- [ ] Verify transparent images blend with `#F3F1ED` background
- [ ] Test wiggle animation on Bluetooth card hover
- [ ] Test pop effect on CPU and Elevator cards
- [ ] Check all hover states work on mobile (tap)
- [ ] Verify project page links work

---

*End of Version 3.9 Specification*
