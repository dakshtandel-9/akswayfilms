# Aksway Photography — Design System

**Brand**: Aksway Photography  
**Domain**: aksway.in  
**Location**: Honnavar, Karnataka, India  
**Category**: Luxury Wedding Photography Portfolio + CMS

---

## Brand Identity

Aksway Photography positions itself as a premium, cinematic wedding photography studio. The visual identity communicates elegance, timelessness, and romance — qualities a couple seeks when entrusting someone to document one of the most important days of their life.

**Personality**: Sophisticated, Warm, Artistic, Trustworthy  
**Tone**: Refined luxury without being cold. Intimate without being casual.  
**Visual Mood**: Dark cinema, golden hour, editorial fashion photography

---

## Typography

### Primary Font — Bebas Neue (Display / Hero)

**Source**: Google Fonts  
**Usage**: H1 headings, hero text, section titles, large numerals, section labels  
**Character**: Bold, condensed, all-caps — commands attention while staying elegant  
**Import URL**:

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
```

Or via `<link>` in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
```

### Secondary Font — Cormorant Garamond (Subheadings / Editorial)

**Source**: Google Fonts  
**Usage**: Subheadings, pull quotes, package names, testimonial client names, elegant captions  
**Character**: Serif, high-contrast strokes, classic editorial — adds softness to Bebas Neue  

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
```

### Body Font — Inter (UI / Body Copy)

**Source**: Google Fonts  
**Usage**: Paragraph text, navigation links, form labels, button text, dashboard UI  
**Character**: Clean, highly legible sans-serif — neutral and functional  

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
```

---

### Type Scale

| Token            | Font             | Size       | Weight  | Letter Spacing | Line Height | Usage                          |
|-----------------|------------------|------------|---------|----------------|-------------|-------------------------------|
| `display-hero`   | Bebas Neue       | 96–128px   | 400     | 0.02em         | 0.9         | Hero headline (full-screen)    |
| `display-xl`     | Bebas Neue       | 72–80px    | 400     | 0.02em         | 0.95        | Section major headings         |
| `display-lg`     | Bebas Neue       | 56–64px    | 400     | 0.02em         | 1.0         | Secondary section titles       |
| `display-md`     | Bebas Neue       | 40–48px    | 400     | 0.02em         | 1.05        | Card headings, package names   |
| `editorial-xl`   | Cormorant Garamond | 36–42px  | 300–400 | 0.01em         | 1.2         | Pull quotes, taglines          |
| `editorial-lg`   | Cormorant Garamond | 24–28px  | 400–500 | 0.01em         | 1.35        | Subheadings, client names      |
| `editorial-md`   | Cormorant Garamond | 18–20px  | 400     | 0.01em         | 1.5         | Captions, category labels      |
| `body-lg`        | Inter            | 18px       | 400     | 0              | 1.7         | Feature descriptions, about bio |
| `body-md`        | Inter            | 16px       | 400     | 0              | 1.6         | Standard paragraph text        |
| `body-sm`        | Inter            | 14px       | 400–500 | 0              | 1.5         | Secondary info, dates          |
| `label`          | Inter            | 12px       | 500–600 | 0.08em         | 1.4         | Tags, badges, form labels (caps)|
| `nav`            | Inter            | 14–15px    | 500     | 0.04em         | 1           | Navigation links               |
| `button`         | Inter            | 14–16px    | 600     | 0.06em         | 1           | CTA buttons (uppercase)        |
| `stat-number`    | Bebas Neue       | 64–80px    | 400     | 0.02em         | 1           | Stats: years exp, weddings shot|

---

## Color System

### Primary Palette

| Token                    | Hex       | RGB                  | Usage                                      |
|--------------------------|-----------|----------------------|--------------------------------------------|
| `gold`                   | `#D4AF37` | rgb(212, 175, 55)    | Primary brand accent, CTAs, highlights     |
| `gold-dark`              | `#B8912F` | rgb(184, 145, 47)    | Hover states for gold elements             |
| `gold-light`             | `#E8C96A` | rgb(232, 201, 106)   | Subtle gold tint, shimmer effects          |
| `gold-muted`             | `#8A6F1E` | rgb(138, 111, 30)    | Disabled gold, subtle borders              |

### Background Scale (Dark Luxury)

| Token                    | Hex       | Usage                                      |
|--------------------------|-----------|---------------------------------------------|
| `bg-deepest`             | `#050505` | True black — used sparingly (hero overlays) |
| `bg-base`                | `#0A0A0A` | Page background                            |
| `bg-surface`             | `#111111` | Subtle elevated surface                    |
| `bg-card`                | `#1A1A1A` | Card backgrounds                           |
| `bg-elevated`            | `#242424` | Elevated cards, dropdowns                  |
| `bg-overlay`             | `#2E2E2E` | Modals, dialogs                            |
| `bg-hover`               | `#333333` | Interactive hover surfaces                 |

### Text Scale

| Token                    | Hex       | Usage                                      |
|--------------------------|-----------|---------------------------------------------|
| `text-primary`           | `#FFFFFF` | Main headings, high-emphasis body text     |
| `text-secondary`         | `#C8C8C8` | Body text, descriptions                    |
| `text-muted`             | `#A0A0A0` | Secondary info, placeholders               |
| `text-faint`             | `#646464` | Disabled text, metadata                    |
| `text-gold`              | `#D4AF37` | Brand-color text, active nav, links        |

### Border & Divider

| Token                    | Value                 | Usage                                      |
|--------------------------|------------------------|---------------------------------------------|
| `border-subtle`          | `rgba(255,255,255,0.06)`| Default card borders                       |
| `border-default`         | `rgba(255,255,255,0.10)`| Input fields, section dividers             |
| `border-emphasis`        | `rgba(255,255,255,0.18)`| Focused inputs, highlighted cards          |
| `border-gold`            | `rgba(212,175,55,0.35)` | Gold-accented borders                      |
| `border-gold-strong`     | `rgba(212,175,55,0.65)` | Active states, selected items              |

### Semantic / Feedback Colors

| Token        | Hex       | Usage                              |
|-------------|-----------|-------------------------------------|
| `success`    | `#22C55E` | Successful form submit, published   |
| `warning`    | `#ECAB08` | Draft state, pending actions        |
| `error`      | `#EF4444` | Validation errors, delete actions   |
| `info`       | `#60A5FA` | Informational toasts                |

---

## Spacing System

Based on a **4px base unit**. All spacing values are multiples of 4.

| Token     | Value | Rem     | Usage                                 |
|-----------|-------|---------|---------------------------------------|
| `space-1` | 4px   | 0.25rem | Micro gap, icon-text pairing          |
| `space-2` | 8px   | 0.5rem  | Tight element spacing                 |
| `space-3` | 12px  | 0.75rem | Small padding, badge padding          |
| `space-4` | 16px  | 1rem    | Standard padding (buttons, inputs)    |
| `space-5` | 20px  | 1.25rem | Form field gap                        |
| `space-6` | 24px  | 1.5rem  | Component internal padding            |
| `space-8` | 32px  | 2rem    | Card padding, section internal gap    |
| `space-10`| 40px  | 2.5rem  | Section sub-block spacing             |
| `space-12`| 48px  | 3rem    | Section top/bottom padding (mobile)   |
| `space-16`| 64px  | 4rem    | Section padding (tablet)              |
| `space-20`| 80px  | 5rem    | Section padding (desktop)             |
| `space-24`| 96px  | 6rem    | Large section padding                 |
| `space-32`| 128px | 8rem    | Hero section vertical padding         |

---

## Border Radius

| Token        | Value   | Usage                                    |
|--------------|---------|------------------------------------------|
| `radius-sm`  | 4px     | Tags, badges, small UI chips             |
| `radius-md`  | 8px     | Buttons, input fields, small cards       |
| `radius-lg`  | 12px    | Standard cards                           |
| `radius-xl`  | 16px    | Large cards, feature blocks              |
| `radius-2xl` | 24px    | Modal containers, floating panels        |
| `radius-full`| 9999px  | Pills, avatar circles, toggle switches   |

---

## Shadows & Depth

| Token             | Value                                              | Usage                               |
|-------------------|----------------------------------------------------|-------------------------------------|
| `shadow-subtle`   | `0 1px 3px rgba(0,0,0,0.4)`                       | Minimal elevation                   |
| `shadow-card`     | `0 4px 16px rgba(0,0,0,0.5)`                      | Card resting state                  |
| `shadow-elevated` | `0 8px 32px rgba(0,0,0,0.6)`                      | Modals, dropdowns                   |
| `shadow-gold`     | `0 0 24px rgba(212,175,55,0.15)`                  | Gold-accented elements glow         |
| `shadow-gold-lg`  | `0 0 48px rgba(212,175,55,0.25)`                  | Hero CTA, highlighted package       |
| `shadow-inset`    | `inset 0 1px 0 rgba(255,255,255,0.06)`            | Top-light effect on cards           |

---

## Effects

### Glassmorphism

Used on the header, modals, overlay cards, and the dashboard sidebar.

```css
.glass {
  background: rgba(10, 10, 10, 0.72);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Gold Shimmer (Animated)

Used on section labels and CTA button accents.

```css
.shimmer-gold {
  background: linear-gradient(
    105deg,
    #B8912F 0%,
    #D4AF37 35%,
    #E8C96A 50%,
    #D4AF37 65%,
    #B8912F 100%
  );
  background-size: 200% auto;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  to { background-position: 200% center; }
}
```

### Vignette Overlay (Hero)

Applied over full-screen hero images to ensure text legibility.

```css
.hero-vignette {
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.15) 0%,
    rgba(0,0,0,0.05) 30%,
    rgba(0,0,0,0.05) 60%,
    rgba(0,0,0,0.65) 100%
  );
}
```

### Text Gradient (Gold)

Used for hero display text to give depth.

```css
.text-gradient-gold {
  background: linear-gradient(135deg, #E8C96A 0%, #D4AF37 40%, #B8912F 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Motion & Animation

### Principles
- **Purposeful**: Every animation communicates state change or directs attention
- **Luxurious**: Slightly slower than typical UI — gives weight and elegance
- **Consistent**: All transitions use the same easing curve family

### Easing Curves

| Name              | Value                        | Usage                                    |
|-------------------|------------------------------|------------------------------------------|
| `ease-luxury`     | `cubic-bezier(0.25, 0, 0, 1)`| Standard UI transitions (most common)    |
| `ease-spring`     | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interactions, hover scale   |
| `ease-in-luxury`  | `cubic-bezier(0.55, 0, 1, 0.45)` | Elements exiting viewport            |
| `ease-out-luxury` | `cubic-bezier(0, 0.55, 0.45, 1)` | Elements entering viewport           |

### Duration Scale

| Token           | Duration | Usage                                     |
|-----------------|----------|-------------------------------------------|
| `duration-fast` | 100ms    | Hover color changes, opacity flickers     |
| `duration-base` | 200ms    | Button press, toggle, small state changes |
| `duration-md`   | 350ms    | Card hover, nav transitions               |
| `duration-lg`   | 500ms    | Panel slides, modal open/close            |
| `duration-xl`   | 700ms    | Page section entrance animations          |
| `duration-hero` | 1000ms   | Hero slide transitions                    |

### Standard Transitions

```css
/* Default interactive element */
transition: all 200ms cubic-bezier(0.25, 0, 0, 1);

/* Card hover with shadow upgrade */
transition: transform 350ms cubic-bezier(0.25, 0, 0, 1),
            box-shadow 350ms cubic-bezier(0.25, 0, 0, 1),
            border-color 200ms cubic-bezier(0.25, 0, 0, 1);

/* Gold accent reveal */
transition: opacity 200ms ease, width 350ms cubic-bezier(0.25, 0, 0, 1);
```

---

## Layout System

### Breakpoints

| Breakpoint | Min-width | Layout Columns | Gutter | Max Container |
|------------|-----------|----------------|--------|---------------|
| `xs`       | 0px       | 4              | 16px   | 100%          |
| `sm`       | 640px     | 4              | 20px   | 100%          |
| `md`       | 768px     | 8              | 24px   | 100%          |
| `lg`       | 1024px    | 12             | 32px   | 1280px        |
| `xl`       | 1280px    | 12             | 40px   | 1440px        |
| `2xl`      | 1536px    | 12             | 40px   | 1600px        |

### Section Anatomy

Each public-facing section follows this layout pattern:

```
┌──────────────────────────────────────────────────────┐
│  Section Label (Bebas Neue, uppercase, gold, small)  │
│  Section Title (Bebas Neue, large, white)            │
│  Section Subtitle (Cormorant Garamond, muted)        │
│  ─────────────────────────────                       │
│  [Content Area]                                      │
│  ─────────────────────────────                       │
│  [Optional CTA]                                      │
└──────────────────────────────────────────────────────┘
```

---

## Component Design Patterns

### 1. Hero Section

**Layout**: Full-viewport (100vw × 100vh), edge-to-edge photography  
**Background**: Full-bleed wedding photography, with vignette gradient overlay  
**Text position**: Bottom-left or center-left, z-indexed above image  
**Animation**: Clip-path expand from thumbnail, slide transition at 5.5s interval  

```
Structure:
- Full-screen image/video background
- Gradient vignette overlay (bottom-heavy)
- Headline: Bebas Neue, 72–128px, white (gradient-gold on key words)
- Subheadline: Cormorant Garamond italic, 20–24px, text-secondary
- CTA Button: "Book Your Story" — gold fill, uppercase Inter, 14px
- Progress bar: Thin gold line, bottom of screen
- Thumbnail strip: 5 slides, active highlighted with gold border
- Scroll cue: Animated down-arrow in gold
```

---

### 2. Navigation Header

**Position**: Fixed top, full-width  
**Background**: Transparent on load → glassmorphism on scroll  
**Height**: 72px desktop, 64px mobile  

```
Structure:
- Logo: "AKSWAY" in Bebas Neue, 28px, white
- Nav links: Inter 14px, 500 weight, uppercase, letter-spacing 0.06em
  - Default: text-muted
  - Hover: text-white
  - Active: text-gold with 2px bottom border in gold
- CTA: "Book Now" — outlined gold button, 12px padding h, 6px padding v
- Mobile: Hamburger → full-screen overlay menu with large Bebas Neue links
```

---

### 3. Section Labels

Decorative labels that precede section titles. Consistent across all sections.

```
Structure:
- Small horizontal line (24px, gold) — left
- Label text: "OUR STORY" / "THE WORK" / "PACKAGES" etc.
- Font: Inter, 11px, 700, letter-spacing 0.12em, uppercase, text-gold
- Small horizontal line (24px, gold) — right
- Arrangement: flex row, items-center, gap-3
```

---

### 4. Cards

**Default Card**:
- Background: `bg-card` (`#1A1A1A`)
- Border: `border-subtle` (1px `rgba(255,255,255,0.06)`)
- Border-radius: `12px`
- Padding: `24–32px`
- Shadow: `shadow-card`
- Hover: Border upgrades to `border-emphasis`, `translateY(-4px)`, shadow deepens

**Highlighted Card** (e.g. featured package):
- Border: `border-gold`
- Box-shadow: `shadow-gold`
- Background: subtle radial gradient from `rgba(212,175,55,0.04)` center to transparent

---

### 5. Buttons

**Primary (Gold Fill)**:
```
Background: #D4AF37
Text: #0A0A0A (dark)
Font: Inter 14px 600 uppercase letter-spacing 0.06em
Padding: 14px 28px
Border-radius: 6px
Hover: background #B8912F, translateY(-1px), shadow-gold
Active: scale(0.98)
```

**Secondary (Outlined)**:
```
Background: transparent
Border: 1px solid #D4AF37
Text: #D4AF37
Font: Inter 14px 600 uppercase letter-spacing 0.06em
Padding: 13px 28px
Border-radius: 6px
Hover: background rgba(212,175,55,0.08)
```

**Ghost**:
```
Background: transparent
Text: text-secondary
Border: 1px solid border-subtle
Hover: background bg-elevated, text-primary
```

---

### 6. Form Inputs

```
Background: bg-surface (#111111)
Border: 1px solid border-default (rgba(255,255,255,0.10))
Border-radius: 8px
Padding: 12px 16px
Font: Inter 15px, text-primary
Placeholder: text-muted

Focus:
  border-color: rgba(212,175,55,0.65)
  box-shadow: 0 0 0 3px rgba(212,175,55,0.12)
  outline: none

Error:
  border-color: #EF4444
  box-shadow: 0 0 0 3px rgba(239,68,68,0.12)

Label:
  Font: Inter 12px 600 uppercase letter-spacing 0.08em
  Color: text-secondary
  Margin-bottom: 6px
```

---

### 7. Package/Pricing Cards

```
Structure:
- Badge top-right: Bebas Neue, bg-gold, text-dark (e.g. "MOST POPULAR")
- Package Name: Bebas Neue 40px, white
- Price: Bebas Neue 64px, gold (₹XX,XXX)
- Divider: 1px gold, 30% opacity
- Features list:
  - Checkmark icon in gold
  - Inter 15px, text-secondary per feature
- CTA Button: Full-width primary gold button "Book This Package"
- Highlighted: gold border + gold glow shadow
```

---

### 8. Testimonials

```
Layout: Horizontal scroll on mobile, 3-column grid on desktop
Card Structure:
  - Opening quote icon: Cormorant Garamond, 96px, gold (low opacity)
  - Review text: Cormorant Garamond italic, 17px, text-secondary, line-height 1.8
  - Divider: thin, subtle
  - Client Photo: 48px circle avatar
  - Client Name: Inter 600, 15px, white
  - Wedding detail: Inter 400, 13px, text-muted (e.g. "Beach Wedding · Goa, 2024")
  - Star rating: 5 gold stars, 14px
```

---

### 9. Portfolio Gallery

```
Layout: Masonry or CSS Grid (variable heights)
Columns: 2 mobile, 3 tablet, 4 desktop
Category Filters: Pill tabs (Inter 13px 600, gold active, ghost inactive)
Item hover:
  - Overlay fades in: rgba(0,0,0,0.55) gradient
  - Category label slides up
  - Expand icon appears center
Transition: 350ms ease-luxury
```

---

### 10. Footer

```
Layout: 4-column grid desktop, 2-column tablet, single-column mobile
Sections:
  - Brand column: Logo, tagline in Cormorant Garamond italic, social icons
  - Quick links: Bebas Neue column title, Inter links in text-muted
  - Contact: Phone, WhatsApp, Email — each with Lucide icon in gold
  - Instagram grid: 6 small preview images in 3×2 grid

Bottom bar:
  - Copyright: Inter 13px text-muted
  - Divider: border-subtle
  - "Made with love in Honnavar"
```

---

## Section-by-Section Design Summary

| Section        | Heading Font | Layout                    | Key Accent      |
|----------------|-------------|---------------------------|-----------------|
| Hero           | Bebas Neue  | Full-screen slideshow     | Gold gradient text + progress bar |
| About          | Bebas Neue  | Two-column (text + photo) | Gold stat counters |
| Portfolio      | Bebas Neue  | Masonry grid              | Gold hover overlays |
| Packages       | Bebas Neue  | 3-column cards            | Gold highlighted card |
| Testimonials   | Cormorant   | Horizontal scroll cards   | Gold quote marks |
| Reels/Videos   | Bebas Neue  | Grid with play button     | Gold play icon  |
| Contact        | Bebas Neue  | Two-column (form + info)  | Gold focus rings |
| Footer         | Bebas Neue  | 4-column                  | Gold social icons |

---

## CSS Variables (Design Tokens)

Implement all tokens as CSS custom properties in `app/globals.css`:

```css
@layer base {
  :root {
    /* Fonts */
    --font-display: "Bebas Neue", sans-serif;
    --font-editorial: "Cormorant Garamond", Georgia, serif;
    --font-body: "Inter", system-ui, sans-serif;

    /* Brand Gold */
    --color-gold:        212 175 55;   /* #D4AF37 */
    --color-gold-dark:   184 145 47;   /* #B8912F */
    --color-gold-light:  232 201 106;  /* #E8C96A */
    --color-gold-muted:  138 111 30;   /* #8A6F1E */

    /* Backgrounds */
    --color-bg:            10 10 10;   /* #0A0A0A */
    --color-bg-surface:    17 17 17;   /* #111111 */
    --color-bg-card:       26 26 26;   /* #1A1A1A */
    --color-bg-elevated:   36 36 36;   /* #242424 */
    --color-bg-overlay:    46 46 46;   /* #2E2E2E */
    --color-bg-hover:      51 51 51;   /* #333333 */

    /* Text */
    --color-text-primary:   255 255 255;
    --color-text-secondary: 200 200 200;
    --color-text-muted:     160 160 160;
    --color-text-faint:     100 100 100;

    /* Semantic */
    --color-success:  34 197 94;
    --color-warning:  236 171 8;
    --color-error:    239 68 68;
    --color-info:     96 165 250;

    /* Motion */
    --ease-luxury:        cubic-bezier(0.25, 0, 0, 1);
    --ease-spring:        cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-out-luxury:    cubic-bezier(0, 0.55, 0.45, 1);

    --duration-fast:  100ms;
    --duration-base:  200ms;
    --duration-md:    350ms;
    --duration-lg:    500ms;
    --duration-xl:    700ms;
    --duration-hero:  1000ms;

    /* Radius */
    --radius-sm:   4px;
    --radius-md:   8px;
    --radius-lg:   12px;
    --radius-xl:   16px;
    --radius-2xl:  24px;
    --radius-full: 9999px;
  }
}
```

---

## Implementation Checklist

- [ ] Add Bebas Neue, Cormorant Garamond, and Inter to `app/layout.tsx` via `next/font/google`
- [ ] Update `--font-display` CSS variable to Bebas Neue
- [ ] Add `--font-editorial` CSS variable for Cormorant Garamond
- [ ] Apply `font-family: var(--font-display)` to all `h1`, `h2`, `h3` tags globally
- [ ] Apply `font-editorial` class to subheadings, testimonial text, pull quotes
- [ ] Add CSS variables for all new design tokens to `globals.css`
- [ ] Add `.text-gradient-gold`, `.shimmer-gold`, `.hero-vignette` utility classes
- [ ] Add `shadow-gold` and `shadow-gold-lg` to Tailwind config
- [ ] Verify hero section type scale renders correctly at all breakpoints
- [ ] Confirm gold color contrast passes WCAG AA on dark backgrounds

---

*Design document maintained alongside codebase. Last updated: 2026-04-04.*
