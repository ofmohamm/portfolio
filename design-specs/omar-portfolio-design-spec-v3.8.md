# Omar Mohammed Portfolio Website
## Design Specification — Version 3.8

**Version:** 3.8  
**Last Updated:** February 2026  
**Status:** UPDATE — Logo Sizing & Hover Effect

---

## OVERVIEW

This update addresses:

1. **Logo size increase** — From 32px to 40px height for better visibility
2. **Hover effect** — Green glow + subtle lift, taking advantage of SVG transparency

---

## SECTION 1: LOGO SIZING

### 1.1 Problem

Logo displaying way too small. "Omar Mohammed" text is barely visible/readable in navigation.

### 1.2 Solution

Significantly increase logo height to make name readable.

```css
.nav-logo img {
  height: 56px;  /* Much larger - was tiny */
  width: auto;
}
```

### 1.3 Sizing Reference

| Size | Height | Use Case |
|------|--------|----------|
| ~~Small~~ | ~~32px~~ | Too small |
| ~~Medium~~ | ~~40px~~ | Still too small |
| **Large** | **56px** | **Recommended** |
| Extra Large | 64px | If still too small |

**Note:** The SVG is 2000x2000 with a lot of whitespace. You may need to go even larger (64-72px) or crop the SVG to remove excess whitespace around the text.

---

## SECTION 2: HOVER EFFECT

### 2.1 Recommended: Green Glow + Lift

Takes advantage of SVG transparency. Glow hugs the text shape.

```css
.nav-logo {
  display: inline-block;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.nav-logo img {
  height: 40px;
  width: auto;
  transition: filter 0.3s ease, transform 0.3s ease;
}

/* Hover: subtle lift + green glow */
.nav-logo:hover {
  transform: translateY(-2px);
}

.nav-logo:hover img {
  filter: drop-shadow(0 0 8px rgba(46, 83, 57, 0.4));
}
```

### 2.2 Alternative Options

**Option A: Scale + Glow**
```css
.nav-logo:hover img {
  transform: scale(1.05);
  filter: drop-shadow(0 0 6px rgba(46, 83, 57, 0.3));
}
```

**Option B: Color Shift to Green**
```css
.nav-logo:hover img {
  filter: brightness(0) saturate(100%) invert(27%) sepia(18%) saturate(897%) hue-rotate(93deg) brightness(92%) contrast(89%);
}
```

**Option C: Underline Slide**
```css
.nav-logo {
  position: relative;
}

.nav-logo::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--green-primary);
  transition: width 0.3s ease;
}

.nav-logo:hover::after {
  width: 100%;
}
```

---

## SECTION 3: FULL CSS

### 3.1 If ViewBox is Cropped (Recommended)

```css
/* Logo - v3.8 (with cropped SVG) */
.nav-logo {
  display: inline-block;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.nav-logo img {
  height: 36px;  /* Works well with cropped viewBox */
  width: auto;
  transition: filter 0.3s ease, transform 0.3s ease;
}

.nav-logo:hover {
  transform: translateY(-2px);
}

.nav-logo:hover img {
  filter: drop-shadow(0 0 8px rgba(46, 83, 57, 0.4));
}
```

### 3.2 If ViewBox is NOT Cropped (Workaround)

```css
/* Logo - v3.8 (without cropping SVG) */
.nav-logo img {
  height: 180px;  /* Very large to compensate for whitespace */
  margin: -70px 0; /* Negative margin to pull nav items closer */
  width: auto;
}
```

This is hacky. Crop the SVG instead.

---

## SECTION 4: SVG OPTIMIZATION (RECOMMENDED FIX)

The logo SVG has a viewBox of `0 0 1500 1500` but the text only occupies a small horizontal band (~y: 700-820). This is why the logo appears tiny.

### 4.1 Best Solution: Crop the ViewBox

Edit the logo.svg file and change the viewBox to tightly wrap the text:

**Before:**
```svg
<svg ... viewBox="0 0 1500 1499.999933" ...>
```

**After:**
```svg
<svg ... viewBox="140 700 1210 130" ...>
```

This crops the SVG to just the text area:
- x: 140 (left edge of text)
- y: 700 (top edge of text)
- width: 1210 (text width)
- height: 130 (text height)

**Result:** Now `height: 40px` will display the text at a readable size because the text fills the entire SVG bounds.

### 4.2 Alternative: Keep Large Height

If you don't want to edit the SVG, use a much larger height:

```css
.nav-logo img {
  height: 200px;  /* Compensates for SVG whitespace */
  width: auto;
}
```

But this is wasteful and harder to align. Cropping the viewBox is the better solution.

### 4.3 How to Crop in Canva

1. Re-open the logo in Canva
2. Resize the canvas to tightly fit the text
3. Re-export as SVG

Or manually edit the viewBox as shown in 4.1.

---

## SECTION 5: IMPLEMENTATION CHECKLIST

### SVG Fix (Do First)
- [ ] Open logo.svg in text editor
- [ ] Change viewBox from `0 0 1500 1499.999933` to `140 700 1210 130`
- [ ] Save and verify logo still displays correctly
- [ ] Upload updated logo.svg to /public/images/

### CSS Updates
- [ ] Set logo img height to 36px (after viewBox crop)
- [ ] Add transition to .nav-logo
- [ ] Add transition to .nav-logo img
- [ ] Add hover translateY(-2px)
- [ ] Add hover drop-shadow with green (#2E5339)

### Testing
- [ ] Verify logo is readable at new size
- [ ] Test hover effect renders correctly
- [ ] Verify glow follows text shape (SVG transparency)
- [ ] Check alignment with nav items

---

*End of Version 3.8 Specification*
