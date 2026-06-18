# RipTweet — Visual Redesign Specification
## Vercel + Linear Aesthetic (Structure Unchanged)

**Version:** 1.0  
**Scope:** Visual polish only — typography, colors, spacing, component styling  
**Constraint:** Zero functional, structural, or content changes

---

## DESIGN FOUNDATION

### Color Palette
```
Background:        #0A0A0A  (main canvas)
Card/Surface:      #111111  (container, inputs)
Border:            #262626  (dividers, outlines)
Text Primary:      #FAFAFA  (headings, body)
Text Secondary:    #A1A1AA  (muted, captions)
Accent:            #8B5CF6  (buttons, links, focus)
Success:           #10B981  (confirmation)
Error:             #EF4444  (warnings)
```

### Font Stack
```
Headings:   Geist Sans, system-ui, sans-serif (600, 700)
Body:       Geist Sans, system-ui, sans-serif (400, 500)
Monospace:  Geist Mono, monospace (400)
```

### Spacing Scale (4px base unit)
```
xs:   4px
sm:   8px
md:   12px
lg:   16px
xl:   24px
2xl:  32px
3xl:  40px
4xl:  48px
5xl:  64px
```

---

## GLOBAL CHANGES

### Body & Background
- **Current:** `bg-canvas` with radial gradients
- **New:** Solid `#0A0A0A`, no gradients
- **Rationale:** Minimal, premium baseline

### Text Colors
- **Replace** `text-ink` → `#FAFAFA` (text-primary)
- **Replace** `text-ink-muted` → `#A1A1AA` (text-secondary)
- **Replace** `text-ink-faint` → `#8B5CF6` with 60% opacity (accent + dim)

### Accent Color Replacement
- **Remove** `#0099ff` blue
- **New accent:** `#8B5CF6` (purple, Vercel-premium)
- Apply to: buttons, links, focus states, checkmarks, verified badges

### Border System
- **Replace** custom border colors
- **Standard border:** `1px solid #262626`
- **Hover border:** `1px solid #8B5CF6` (accent, optional for interactive elements)

### Shadows
- **Remove** heavy shadows
- **New shadow system:**
  - Default: `none`
  - Hover: `0 1px 2px rgba(0,0,0,0.3)`
  - Focus: `0 0 0 3px rgba(139,92,246,0.1)` (accent glow)

---

## TYPOGRAPHY SCALE

### Headings
| Level | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| H1 (Hero) | 56px | 700 | 1.1 | -0.02em |
| H2 (Section) | 36px | 700 | 1.2 | -0.015em |
| H3 (Card) | 20px | 600 | 1.3 | -0.01em |
| H4 (Subheading) | 16px | 600 | 1.4 | 0em |

### Body Text
| Level | Size | Weight | Line Height |
|-------|------|--------|-------------|
| Large | 16px | 400 | 1.6 |
| Default | 14px | 400 | 1.6 |
| Small | 13px | 400 | 1.5 |
| Xs | 12px | 500 | 1.4 |

### Labels & Captions
| Level | Size | Weight | Letter Spacing |
|-------|------|--------|----------------|
| Eyebrow | 12px | 600 | 0.1em |
| Badge | 11px | 600 | 0.05em |

---

## COMPONENT STYLING

### Buttons

**Primary Button (CTA)**
```
Background:        #8B5CF6 (accent)
Text:              #FAFAFA (white)
Padding:           12px 20px
Border Radius:     6px
Font:              14px / 600 (Geist)
Border:            1px solid #8B5CF6
Transition:        all 150ms ease

States:
  Hover:           bg #A78BFA (lighter purple)
  Active:          bg #6D28D9 (darker purple)
  Focus:           outline 2px #8B5CF6, outline-offset 2px
  Disabled:        opacity 50%, cursor not-allowed
```

**Secondary Button**
```
Background:        transparent
Text:              #FAFAFA
Padding:           12px 20px
Border Radius:     6px
Font:              14px / 400
Border:            1px solid #262626
Transition:        all 150ms ease

States:
  Hover:           bg #1a1a1a, border #8B5CF6
  Active:          bg #262626
  Focus:           outline 2px #8B5CF6
```

### Input Fields
```
Background:        #111111
Text:              #FAFAFA
Placeholder:       #A1A1AA (60% opacity)
Padding:           12px 16px
Border:            1px solid #262626
Border Radius:     6px
Font:              14px / 400
Transition:        all 150ms ease

States:
  Hover:           border #262626 (no change)
  Focus:           border #8B5CF6, shadow 0 0 0 3px rgba(139,92,246,0.1)
  Disabled:        opacity 50%, bg #1a1a1a
```

### Cards
```
Background:        #111111
Border:            1px solid #262626
Border Radius:     8px
Padding:           24px
Transition:        all 150ms ease

States:
  Hover:           border #8B5CF6 (optional for interactive cards)
  Focus:           shadow 0 0 0 3px rgba(139,92,246,0.1)
```

### Links
```
Color:             #8B5CF6 (accent)
Text Decoration:   none
Border Bottom:     1px solid transparent
Transition:        all 150ms ease

States:
  Hover:           text-decoration underline, opacity 80%
  Focus:           outline 2px #8B5CF6
```

---

## SECTION-BY-SECTION VISUAL CHANGES

### HEADER
**Current:** Sticky header with border-bottom  
**New:**
- Background: `#0A0A0A` (solid, no opacity change)
- Border-bottom: `1px solid #262626`
- Padding: `16px 40px`
- Logo: Keep existing
- Nav links: `#A1A1AA` on default, `#FAFAFA` on hover (transition 150ms)
- CTA button: Use primary button styling above
- Remove any gradient or backdrop blur

### HERO SECTION
**Current:** Centered with eyebrow, headline, subheading, downloader  
**New:**
- Remove radial gradient background (solid `#0A0A0A`)
- Eyebrow: `12px 600` Geist, `#8B5CF6` (accent color), uppercase, letter-spacing `0.1em`
- Headline: `56px 700` Geist, `#FAFAFA`, line-height 1.1
- Subheading: `16px 400` Geist, `#A1A1AA`
- Spacing: 32px between headline and subheading, 40px before downloader
- Trust signal: `12px 400` Geist, `#A1A1AA`, 20px margin-top

### DOWNLOADER COMPONENT
**Current:** Input + buttons + results card  
**New styling:**

**Form Container:**
- Background: `#111111`
- Border: `1px solid #262626`
- Border-radius: `8px`
- Padding: `24px`
- Shadow: `0 1px 2px rgba(0,0,0,0.3)` on hover

**Input Field:**
- Styling per component spec above
- Icon color: `#A1A1AA` (secondary text)

**Buttons:**
- Submit button: Use primary button styling
- Paste button: Use secondary button styling

**Results Card:**
- Same card styling above
- Header: `#FAFAFA` headline with accent color checkmark for verified badge
- Border-bottom divider: `1px solid #262626`
- Media block: `1px solid #262626` border, `8px` radius
- Download buttons: Use button styling (primary for best, secondary for alternatives)

**Error State:**
- Background: transparent
- Border: `1px solid #EF4444`
- Text: `#FAFAFA` (error message), `#EF4444` (icon)
- Padding: `16px`
- Border-radius: `8px`

### HOW IT WORKS SECTION
**Current:** Eyebrow + title + 3-card grid  
**New:**
- Section padding: `64px 40px`
- Border-top: `1px solid #262626`
- Eyebrow: `12px 600` Geist, `#8B5CF6`, uppercase
- Title: `36px 700` Geist, `#FAFAFA`, margin-bottom `48px`

**Cards (3-up grid):**
- Background: `#111111`
- Border: `1px solid #262626`
- Padding: `24px`
- Border-radius: `8px`
- Transition: all 150ms ease
- On hover: border `#8B5CF6`
- Shadow: default none, hover `0 1px 2px rgba(0,0,0,0.3)`

**Card content:**
- Step number: `28px 700` Geist, `#A1A1AA` (60% opacity), top-right
- Icon: `40px`, `#8B5CF6` (accent)
- Title: `20px 600` Geist, `#FAFAFA`, margin-bottom `8px`
- Body: `14px 400` Geist, `#A1A1AA`

### MEDIA TYPES SECTION (Showcase)
**Current:** Eyebrow + title + 3 gradient cards  
**New:**
- Section padding: `64px 40px`
- Border-top: `1px solid #262626`
- Eyebrow: `12px 600` Geist, `#8B5CF6`, uppercase
- Title: `36px 700` Geist, `#FAFAFA`, margin-bottom `48px`

**Showcase Cards (replace gradients with minimal style):**
- Background: `#111111` (remove gradients)
- Border: `1px solid #262626`
- Padding: `28px`
- Border-radius: `8px`
- Shadow: `0 1px 2px rgba(0,0,0,0.3)` on default, `0 2px 4px rgba(0,0,0,0.4)` on hover
- Transition: all 150ms ease

**Card content:**
- Icon: `28px`, `#8B5CF6` (accent, all cards consistent)
- Type name: `28px 700` Geist, `#FAFAFA`
- Description: `14px 400` Geist, `#A1A1AA`

### FEATURES SECTION
**Current:** Eyebrow + title + 6-card grid (2-column)  
**New:**
- Section padding: `64px 40px`
- Border-top: `1px solid #262626`
- Eyebrow: `12px 600` Geist, `#8B5CF6`, uppercase
- Title: `36px 700` Geist, `#FAFAFA`, margin-bottom `48px`

**Feature Cards:**
- Background: `#111111`
- Border: `1px solid #262626`
- Padding: `24px`
- Border-radius: `8px`
- Min-height: `140px`
- Transition: all 150ms ease
- On hover: border `#8B5CF6`, shadow `0 1px 2px rgba(0,0,0,0.3)`

**Card content:**
- Checkmark icon: `32px` circle, background `#1a1a1a`, border `1px solid #262626`, `#8B5CF6` checkmark
- Margin-bottom from icon: `16px`
- Title: `20px 600` Geist, `#FAFAFA`, margin-bottom `8px`
- Body: `14px 400` Geist, `#A1A1AA`

### FAQ SECTION
**Current:** Eyebrow + title + native `<details>` elements  
**New (shadcn/ui Accordion):**
- Section padding: `64px 40px`
- Border-top: `1px solid #262626`
- Eyebrow: `12px 600` Geist, `#8B5CF6`, uppercase
- Title: `36px 700` Geist, `#FAFAFA`, margin-bottom `48px`
- Max-width: `900px`, centered

**Accordion Styling:**
- Background: transparent
- Border-bottom on each item: `1px solid #262626`

**Accordion Item (trigger):**
- Padding: `16px 0`
- Typography: `20px 600` Geist, `#FAFAFA`
- Icon: ChevronDown `16px`, `#8B5CF6`, rotate 180° when open
- Flex: space-between (question left, icon right)
- Transition: all 150ms ease
- Hover background: `rgba(139,92,246,0.05)` (faint accent tint)

**Accordion Content (answer):**
- Padding: `16px 0`
- Typography: `14px 400` Geist, `#A1A1AA`
- Animation: fade-in 150ms on expand

### FINAL CTA SECTION
**Current:** Centered headline + subheading + button  
**New:**
- Section padding: `64px 40px`
- Border-top: `1px solid #262626`
- Text-align: center

**Content:**
- Headline: `36px 700` Geist, `#FAFAFA`, margin-bottom `12px`
- Subheading: `16px 400` Geist, `#A1A1AA`, margin-bottom `24px`
- Button: Use primary button styling, size large

### FOOTER
**Current:** Logo + tagline + links + disclaimer + copyright  
**New:**
- Section padding: `56px 40px`
- Border-top: `1px solid #262626`
- Background: `#0A0A0A`

**Logo row:**
- Logo: `30px`, margin-right `12px`
- Name: `20px 600` Geist, `#FAFAFA`
- Margin-bottom: `16px`

**Tagline:**
- `14px 400` Geist, `#A1A1AA`
- Max-width: `300px`

**Links section:**
- Column labels: `12px 600` Geist, `#8B5CF6`, uppercase, margin-bottom `12px`
- Links: `14px 400` Geist, `#A1A1AA`, line-height `1.8`
- Link hover: `#FAFAFA` (text-primary), transition 150ms

**Disclaimer + Copyright:**
- `12px 400` Geist, `#A1A1AA`
- Divider: `1px solid #262626`, margin `24px 0`

---

## SPACING REFINEMENTS

### Reduce Visual Noise
- Remove heavy decorative gradients
- Remove drop shadows except on hover/focus
- Increase whitespace between sections (64px minimum)
- Increase gap between cards (16px minimum)

### Padding Updates
- Buttons: `12px (vertical) × 20px (horizontal)` (slightly more generous)
- Inputs: `12px (vertical) × 16px (horizontal)`
- Cards: `24px` (consistent)
- Sections: `64px (vertical) × 40px (horizontal)` (desktop)

### Line Heights
- Headings: `1.1–1.3` (tight, premium feel)
- Body: `1.6` (readable, generous)
- Small: `1.4–1.5` (compact labels)

---

## INTERACTION POLISH

### Transitions (all 150ms ease)
- Button hover/focus
- Input focus
- Border color changes
- Text color changes
- Icon rotations (chevron in accordion)

### Focus States (keyboard navigation)
- All interactive elements: `outline 2px #8B5CF6`
- Outline-offset: `2px`
- No hidden focus indicators

### Hover States
- Buttons: slightly lighter or darker shade (see button spec)
- Links: underline + opacity change
- Cards: border accent color, subtle shadow
- Form inputs: focus styling applied

---

## BEFORE/AFTER VISUAL COMPARISON

| Element | Before | After |
|---------|--------|-------|
| Background | `#090909` + gradients | `#0A0A0A` solid |
| Text Primary | `#ffffff` | `#FAFAFA` |
| Text Secondary | `#999999` | `#A1A1AA` |
| Accent Color | `#0099ff` (bright blue) | `#8B5CF6` (purple) |
| Borders | Custom colors | `#262626` standard |
| Cards | Heavy shadows, gradients | Minimal borders, flat |
| Buttons | Blue (#0099ff) | Purple (`#8B5CF6`) |
| Section Spacing | Moderate | Generous (64px) |
| Typography | Geist/Inter mix | Geist only (Sans + Mono) |
| Overall Feel | Framer-inspired, artistic | Vercel/Linear premium SaaS |

---

## RESPONSIVE BREAKPOINTS

No structural changes — only visual refinements per breakpoint.

**Mobile (<640px):**
- Section padding: `40px 20px`
- Card gap: `12px`
- Font sizes: no change (keep same scale)
- Button width: full-width on small screens (max 300px)

**Tablet (640px–1024px):**
- Section padding: `48px 32px`
- Card gap: `16px`

**Desktop (>1024px):**
- Section padding: `64px 40px`
- Card gap: `16px`

---

## COMPONENT LIBRARY (shadcn/ui)

### Buttons
- Use `shadcn/ui Button` with custom purple accent
- Variants: `default` (primary), `outline` (secondary), `ghost` (tertiary)
- All with rounded corners `6px`

### Inputs
- Use `shadcn/ui Input` with dark theme
- Focus ring: `#8B5CF6` with `3px` offset
- Border: `#262626`

### Accordion (FAQ)
- Use `shadcn/ui Accordion` (replaces native `<details>`)
- Custom styling for triggers and content
- ChevronDown icon, `#8B5CF6` color

### Cards
- Use `shadcn/ui Card` (if available) or custom div styling
- Border, no shadow by default

### Badges (optional future use)
- Use `shadcn/ui Badge` with outline variant
- Border: `#262626`, text `#A1A1AA`

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Global Foundation
- [ ] Update color variables in CSS (globals.css)
- [ ] Replace Geist font (remove Inter, keep Geist Sans + Geist Mono)
- [ ] Update Tailwind theme tokens
- [ ] Remove all gradient backgrounds
- [ ] Apply new border color standard (`#262626`)

### Phase 2: Components
- [ ] Update button styling (primary + secondary)
- [ ] Update input styling (focus ring, borders)
- [ ] Update card styling (borders, shadows)
- [ ] Replace FAQ `<details>` with shadcn Accordion
- [ ] Update link styling (underline, hover)

### Phase 3: Sections
- [ ] Header: remove effects, apply new colors
- [ ] Hero: solid background, new typography colors
- [ ] Downloader: card styling, button colors, input focus
- [ ] How it Works: card styling, eyebrow color
- [ ] Media Types: remove gradients, apply flat styling
- [ ] Features: card styling, checkmark color
- [ ] FAQ: Accordion component, new styling
- [ ] Final CTA: button color, typography
- [ ] Footer: text colors, link styling

### Phase 4: Polish & QA
- [ ] Verify all hover/focus states
- [ ] Test transitions (150ms smooth)
- [ ] Check responsive design on mobile/tablet
- [ ] Validate keyboard navigation (focus indicators)
- [ ] Cross-browser testing
- [ ] Visual regression testing

---

## CSS VARIABLE TEMPLATE

```css
:root {
  /* Colors */
  --color-bg: #0A0A0A;
  --color-surface: #111111;
  --color-surface-hover: #1a1a1a;
  --color-border: #262626;
  --color-text: #FAFAFA;
  --color-text-secondary: #A1A1AA;
  --color-accent: #8B5CF6;
  --color-accent-hover: #A78BFA;
  --color-accent-dark: #6D28D9;
  --color-success: #10B981;
  --color-error: #EF4444;

  /* Typography */
  --font-family: 'Geist Sans', system-ui, sans-serif;
  --font-family-mono: 'Geist Mono', monospace;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  --spacing-2xl: 32px;
  --spacing-3xl: 40px;
  --spacing-4xl: 48px;
  --spacing-5xl: 64px;

  /* Transitions */
  --transition: all 150ms ease;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.5);
  --shadow-focus: 0 0 0 3px rgba(139, 92, 246, 0.1);

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

---

## DESIGN PHILOSOPHY

✅ **Do:**
- Favor whitespace and breathing room
- Use typography as primary visual hierarchy
- Apply subtle transitions (150ms)
- Keep colors consistent and limited
- Use thin borders for definition
- Maintain premium, professional aesthetic

❌ **Don't:**
- Add heavy gradients or effects
- Over-animate elements
- Use glassy/frosted glass effects
- Apply neon or vibrant colors
- Clutter with decorative elements
- Change layout or structure

---

## RESULT

The application will maintain **100% identical functionality and structure** while feeling like a **high-end SaaS product** with:
- Premium dark theme (Vercel-quality)
- Clean, minimal aesthetic (Linear-inspired)
- Strong typography hierarchy (professional)
- Refined interactions (polished feel)
- Consistent color system (purple accent)

**No functional changes. Pure visual elevation.**

---

*Specification Version: 1.0*  
*Status: Ready for implementation*  
*All sections, content, APIs, and user flows unchanged*
