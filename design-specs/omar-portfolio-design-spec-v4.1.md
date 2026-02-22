# Omar Mohammed Portfolio Website
## Design Specification — Version 4.1

**Version:** 4.1  
**Last Updated:** February 2026  
**Status:** FINAL — Content Updates + Logo Fix

---

## OVERVIEW

Updates in this version:

1. **4-Bit CPU Architecture** — Final overview copy
2. **Logo fix** — Bottom of text was getting cut off

---

## SECTION 1: LOGO FIX

### 1.1 Problem

Logo text ("Omar Mohammed") is cut off at the bottom.

### 1.2 Solution

Add padding or adjust height to prevent clipping:

**Option A: Add padding to container**
```html
<a href="/" class="nav-logo py-1">
  <img src="/images/logo.svg" alt="Omar Mohammed" class="h-6" />
</a>
```

**Option B: Increase height slightly**
```html
<img src="/images/logo.svg" alt="Omar Mohammed" class="h-7" />
```

**Option C: Adjust SVG viewBox (if still cropped)**

Edit `logo.svg` and add padding to the viewBox:

```svg
<!-- Before -->
viewBox="140 700 1210 130"

<!-- After - add 10px padding at bottom -->
viewBox="140 700 1210 140"
```

**Option D: Use object-contain with explicit height**
```html
<img 
  src="/images/logo.svg" 
  alt="Omar Mohammed" 
  class="h-8 object-contain"
/>
```

---

## SECTION 2: UPDATED PROJECT CONTENT

### 2.1 4-Bit CPU Architecture

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

Adding two numbers, storing the result, and branching on a condition is pretty basic, but I built the thing that did it. This project helped me realize chip design was something I could see myself pursuing as a career.
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

| Field | Value |
|-------|-------|
| Title | Bluetooth Messaging System |
| Subtitle | Syracuse University · Fall 2025 |
| Tags | Embedded, Arduino, Bluetooth |
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

### 2.3 Elevator Control System

| Field | Value |
|-------|-------|
| Tags | Embedded, ATSAMD21, Register-Level |

---

## SECTION 3: PROJECT CARD TAGS

```html
<!-- CPU -->
<p class="text-sm text-gray-500 mt-1">VHDL · FPGA · Digital Design</p>

<!-- Bluetooth -->
<p class="text-sm text-gray-500 mt-1">Embedded · Arduino · Bluetooth</p>

<!-- Elevator -->
<p class="text-sm text-gray-500 mt-1">Embedded · ATSAMD21 · Register-Level</p>
```

---

## SECTION 4: IMPLEMENTATION CHECKLIST

### Logo
- [ ] Fix logo cutoff (try Option A first: add `py-1` to container)
- [ ] If still cut off, try Option C: adjust viewBox to `140 700 1210 140`

### Content
- [ ] Update CPU project page with final overview text
- [ ] Verify Bluetooth tags show "Embedded" not "Embedded C"
- [ ] Verify Elevator tags show "Embedded" not "C"

---

*End of Version 4.1 Specification*
