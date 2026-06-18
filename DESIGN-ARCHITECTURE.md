# RipTweet UI/UX Redesign — Design Architecture Document

**Version:** 1.0  
**Date:** 2026-06-16  
**Design Direction:** Vercel + Linear + Raycast aesthetic  
**Scope:** Visual redesign only (no functional changes)

---

## EXECUTIVE SUMMARY

RipTweet's current design is Framer-inspired with a dark canvas. This redesign elevates it to a **premium SaaS product** by:

- **Reducing visual noise** → cleaner, more spacious layouts
- **Strengthening hierarchy** → clearer priority flow
- **Modernizing components** → shadcn/ui system components
- **Elevating typography** → geometric sans-serif (Geist) with precision spacing
- **Refining color palette** → minimal, sophisticated dark theme with strategic accent usage
- **Implementing bento grids** → Linear-style section organization
- **Adding polish** → micro-interactions, smooth transitions, intentional whitespace

**Outcome:** RipTweet feels like a **premium, trustworthy, modern tool** rather than a landing page.

---

## DESIGN SYSTEM FOUNDATION

### 1. COLOR PALETTE

#### Primary Surface Colors
```
Canvas (Background):        #0a0a0a (slightly warmer than pure black)
Surface Primary:            #121212 (cards, containers)
Surface Secondary:          #1a1a1a (hover states, elevated)
Surface Tertiary:           #242424 (pressed, focus rings)
Subtle Border:              #2e2e2e (hairlines, dividers)
```

#### Text/Ink Colors
```
Text Primary (Foreground):  #ffffff (high contrast)
Text Secondary:             #a1a1a1 (muted, 65% opacity alternative)
Text Tertiary:              #737373 (faint, supporting text)
Text Disabled:              #545454 (disabled states)
```

#### Accent & Status Colors
```
Accent Primary:             #3b82f6 (blue, energy, CTAs)
Accent Hover:               #60a5fa (lighter on hover)
Accent Focus:               #1e40af (darker for depth)

Success:                    #10b981 (green, confirmation)
Warning:                    #f59e0b (amber, attention)
Destructive:                #ef4444 (red, errors)
Neutral:                    #64748b (slate, secondary actions)
```

#### Semantic Colors
```
Background Overlay:         rgba(10, 10, 10, 0.8) (modals, overlays)
Skeleton Loading:           #1a1a1a (animated shimmer effect)
Focus Ring:                 rgba(59, 130, 246, 0.3) (blue glow, 30% opacity)
```

#### Gradient Usage
```
Hero Gradient (Optional):   #0a0a0a → transparent (subtle radial)
Accent Gradient:            #3b82f6 → #1e40af (UI accents)
```

---

### 2. TYPOGRAPHY SCALE

**Font Family:** Geist (geometric, modern, technical precision)  
**Fallback:** `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif`

#### Type Styles

| Level | Size | Weight | Line Height | Letter Spacing | Use Case |
|-------|------|--------|-------------|----------------|----------|
| **Display XL** | 48px | 600 | 1.2 | -0.02em | Main hero headline |
| **Display Lg** | 36px | 600 | 1.25 | -0.015em | Section titles |
| **Display Md** | 28px | 600 | 1.3 | -0.01em | Subsection headers |
| **Headline** | 20px | 600 | 1.4 | -0.005em | Card titles, features |
| **Subheading** | 16px | 500 | 1.5 | 0em | Supporting headers |
| **Body Large** | 15px | 400 | 1.6 | -0.005em | Body text, descriptions |
| **Body** | 14px | 400 | 1.6 | -0.005em | Default body text |
| **Small** | 13px | 400 | 1.5 | 0em | Metadata, captions |
| **Xs** | 12px | 500 | 1.4 | 0.02em | Labels, badges |
| **Eyebrow** | 11px | 600 | 1.3 | 0.05em | Section labels, tabs |

#### Font Weights
- **400** — Regular (body text)
- **500** — Medium (small headlines, inputs)
- **600** — Semibold (headlines, emphasis)
- **700** — Bold (rarely used, only for key emphasis)

---

### 3. SPACING SYSTEM

**Base Unit:** 4px (ensures 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px alignment)

#### Spacing Scale
```
xs:     4px    (tight spacing, component internals)
sm:     8px    (compact spacing)
md:    12px    (default spacing, component padding)
lg:    16px    (medium spacing, card gutters)
xl:    24px    (section spacing)
2xl:   32px    (large section spacing)
3xl:   40px    (extra large spacing)
4xl:   48px    (hero spacing)
5xl:   64px    (section separation)
```

#### Applied Spacing
```
Button Padding:            12px (vertical) × 16px (horizontal)
Card Padding:              24px (all sides)
Card Gap (flex):           16px
Section Padding:           64px (vertical) × 40px (horizontal)
Page Margin:               40px (horizontal)
Component Gap:             12px (internal elements)
```

---

### 4. COMPONENT SIZING

#### Button Heights
```
Small:                     32px (compact actions)
Default:                   40px (standard CTAs)
Large:                     44px (hero CTAs)
```

#### Input Heights
```
Standard:                  40px (form inputs, search)
```

#### Card Sizing
```
Min Height (feature card): 140px
Max Width (content):       1280px
Gap between cards:         16px (bento grid)
```

#### Border Radius
```
Button/Small Components:   6px (subtle roundness)
Card/Medium:               12px (modern look)
Large Surface:             16px (spacious areas)
Pill Buttons:              24px (full radius)
```

---

## VISUAL HIERARCHY & LAYOUT STRATEGY

### Layout Principles
1. **Asymmetrical Balance** — Vercel-like: not perfectly centered, intentional spacing
2. **Breathing Room** — 64px section gaps, generous margins
3. **Bento Grid Structure** — Linear-like: variable-sized cards in logical grid
4. **Progressive Disclosure** — FAQ accordion collapses detail, reduces cognitive load
5. **Visual Edges** — Subtle borders only where needed; rely on color/shadow for depth

### Grid System
```
Max Content Width:         1280px
Horizontal Padding:        40px (desktop), 20px (mobile)
Column Gap:                16px (bento cards)
Row Gap:                   16px (vertical spacing between rows)
```

### Depth Model (via shadows)
```
Elevation 0 (default):     no shadow (default state)
Elevation 1 (hover):       0 1px 3px rgba(0,0,0,0.3) (subtle lift)
Elevation 2 (interactive): 0 4px 12px rgba(0,0,0,0.4) (medium lift)
Elevation 3 (dialogs):     0 10px 40px rgba(0,0,0,0.5) (strong depth)
```

---

## PAGE WIREFRAME & SECTION HIERARCHY

### Homepage Information Architecture

```
┌─────────────────────────────────────────────┐
│              HEADER (Sticky)                │
│  RipTweet Logo | Nav Links | CTA Button    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│          SECTION 1: HERO                    │
│  ┌───────────────────────────────────────┐  │
│  │  Headline (Display XL)                │  │
│  │  Subheading (Body Large)              │  │
│  │  [Downloader Component]               │  │
│  │  Trust Signal (caption)               │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│      SECTION 2: HOW IT WORKS                │
│  Eye. Label + Title                         │
│  ┌─────────────┬─────────────┬─────────────┐│
│  │   Step 1    │   Step 2    │   Step 3    ││
│  │  (3-up)     │  (3-up)     │  (3-up)     ││
│  └─────────────┴─────────────┴─────────────┘│
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│   SECTION 3: MEDIA TYPES (Showcase)         │
│  Eye. Label + Title                         │
│  ┌─────────────┬─────────────┬─────────────┐│
│  │  Videos     │   Photos    │    GIFs     ││
│  │  (3-up)     │  (3-up)     │  (3-up)     ││
│  │  Spotlight  │  Spotlight  │  Spotlight  ││
│  └─────────────┴─────────────┴─────────────┘│
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│      SECTION 4: FEATURES                    │
│  Eye. Label + Title                         │
│  ┌──────────────────┬──────────────────┐    │
│  │  Feature Card 1  │  Feature Card 2  │    │
│  ├──────────────────┼──────────────────┤    │
│  │  Feature Card 3  │  Feature Card 4  │    │
│  ├──────────────────┼──────────────────┤    │
│  │  Feature Card 5  │  Feature Card 6  │    │
│  └──────────────────┴──────────────────┘    │
│  (2-up bento, scalable to 3-up mobile)      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│      SECTION 5: FAQ                         │
│  Eye. Label + Title                         │
│  ┌───────────────────────────────────────┐  │
│  │ [Q1 ▼] – Accordion Item              │  │
│  │ [Q2 ▶] – Collapsed state             │  │
│  │ [Q3 ▶] – Collapsed state             │  │
│  │ ...                                   │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│      SECTION 6: FINAL CTA                   │
│  Headline + Subheading + Button             │
│          (Center aligned)                   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│      FOOTER                                 │
│  Links | Disclaimer | Copyright            │
└─────────────────────────────────────────────┘
```

---

## SECTION-BY-SECTION REDESIGN SPECIFICATIONS

### SECTION 1: HEADER (Navigation)

#### Current State
- Sticky, dark background
- Logo + name + nav links + CTA button
- Minimal styling

#### New Design
- **Background:** `#0a0a0a` with optional bottom border (`1px solid #2e2e2e`)
- **Height:** 56px (compact, modern)
- **Structure (Flexbox):**
  - Left: Logo (30px) + brand name
  - Center: Nav links (hidden on mobile, shown on desktop)
  - Right: CTA Button (primary style)
- **Spacing:** 24px horizontal padding
- **Interactions:**
  - Nav links: text-secondary on default, text-primary on hover (transition: 200ms)
  - Button: elevation 1 on hover, elevation 2 on press
- **Typography:**
  - Brand name: Headline (20px, 600)
  - Nav links: Body (14px, 400)
  - Button text: Small (13px, 600)

#### Component Mapping
- Logo: Image component
- Nav: Horizontal flex layout
- Button: `shadcn/ui Button` (variant="default", size="sm")

---

### SECTION 2: HERO

#### Current State
- Centered hero with eyebrow label
- Large headline (Display XL)
- Subheading
- Downloader component inline
- Trust signal text

#### New Design

**Layout:**
- **Max width:** 900px (narrower for focus)
- **Text alignment:** Center
- **Vertical spacing:** 64px top/bottom padding

**Typography:**
- **Eyebrow:** 11px, 600, text-tertiary, uppercase, 50px letter-spacing, 24px margin-bottom
- **Headline:** Display XL (48px, 600, text-primary)
- **Spacing after headline:** 16px
- **Subheading:** Body Large (15px, 400, text-secondary) — single paragraph max 2 lines
- **Spacing after subheading:** 40px
- **Trust signal:** Small (13px, 400, text-tertiary), centered below downloader, 20px margin-top

**Visual Elements:**
- Optional subtle radial gradient glow (very faint, near-invisible)
- No heavy shadows or effects
- Clean, breathable spacing

**Background:**
- Solid `#0a0a0a`, no animated gradient

**Component Hierarchy:**
```
Hero Section (vertical flex, center-align)
├── Eyebrow Label
├── Headline
├── Subheading
├── [Downloader Component] ← see SECTION 3 redesign
└── Trust Signal
```

---

### SECTION 3: DOWNLOADER COMPONENT

#### Current State
- Input field with icon
- Paste button (hidden on mobile)
- Submit button ("Rip it")
- Results card with media preview
- Error/loading states

#### New Design

**Overall Container:**
- **Background:** `#121212` (surface primary)
- **Padding:** 24px
- **Border:** `1px solid #2e2e2e`
- **Border-radius:** 12px
- **Box-shadow:** elevation 1 on default, elevation 2 on focus
- **Max-width:** 600px (narrower, focused)

**Form (Default State):**

```
┌─────────────────────────────────────────┐
│  [Link Icon] [Input] [Paste] [Submit]   │
│  "Paste an X / Twitter post link…"      │
└─────────────────────────────────────────┘
Caption: "We never store your links or files."
```

**Input Field:**
- **Height:** 40px
- **Padding:** 12px (vertical) × 16px (horizontal)
- **Background:** `#1a1a1a` (on focus: `#242424`)
- **Border:** `1px solid #2e2e2e` (on focus: `1px solid #3b82f6`)
- **Border-radius:** 8px
- **Font:** Body (14px, 400)
- **Placeholder:** text-tertiary
- **Transition:** 150ms (all properties)
- **Focus ring:** `rgba(59, 130, 246, 0.3)` via box-shadow

**Button Group:**
- **Paste Button:** `shadcn/ui Button` (variant="outline", size="sm")
  - Hidden on mobile (<768px)
  - Visible on desktop
  - Border: `#2e2e2e`
  - Spacing from input: 8px
- **Submit Button:** `shadcn/ui Button` (variant="default", size="default")
  - Background: `#3b82f6`
  - Hover: `#60a5fa` (lighter blue)
  - Pressed: `#1e40af` (darker blue)
  - Text: white, 14px, 600
  - Icon: right-aligned
  - Loading state: spinner replaces icon, text → "Ripping…"
  - Width: auto (flex-grow on mobile for full-width feel)

**Icons:**
- Link icon (left of input): text-tertiary, 16px, absolute positioned
- Paste icon: before text
- Submit icon: after text (arrow right)
- Close icon (on input value): text-tertiary, 16px, appears when input has text

**States:**

1. **Idle:**
   - Input empty, focus outline invisible
   - Paste button visible (desktop only)
   - Submit button enabled

2. **Loading:**
   - Input disabled, opacity 60%
   - Submit button: loading state (spinner, "Ripping…")
   - All buttons disabled

3. **Error:**
   - Input re-enabled
   - Error card appears below with icon + message + retry link
   - Background color: `rgba(239, 68, 68, 0.1)` (red tint, 10%)
   - Border: `1px solid #ef4444`
   - Text: body (14px), error color
   - Retry link: text-accent, underline on hover

4. **Success (Results Card):**
   - Result card replaces form in same container space
   - Smooth fade-in (200ms)

**Result Card Layout:**

```
┌──────────────────────────────────────┐
│ [Avatar] Author Name ✓  │ 3 items    │
│ @handle                               │
├──────────────────────────────────────┤
│ Tweet text preview (line-clamp-3)    │
├──────────────────────────────────────┤
│ ┌────────────────────────────────┐   │
│ │ [Thumbnail]    [Play Button]   │   │
│ │                                │   │
│ │ MP4           0:42             │   │
│ │ [Download Orig] [720p] [480p]  │   │
│ └────────────────────────────────┘   │
│ (repeats for each media item)        │
└──────────────────────────────────────┘
[Reset Button] ← allows starting over
```

**Result Card Details:**

- **Header Row:**
  - Avatar: 40px circle, rounded-full
  - Author Name: Headline (20px, 600, text-primary)
  - Verified badge: small checkmark, accent color
  - Item count badge: right-aligned, Small (13px), background `#1a1a1a`, border `#2e2e2e`
  - Spacing: 12px between avatar and text
  - Divider: `1px solid #2e2e2e` below header

- **Tweet Text:**
  - Body (14px, 400, text-secondary)
  - line-clamp-3 (max 3 lines)
  - Padding: 16px horizontal, 12px vertical

- **Media Block (per item):**
  - **Container:** border `1px solid #2e2e2e`, border-radius 12px, padding 16px, margin 16px 0 first item
  - **Thumbnail:** aspect-ratio based on media, max-height 300px, border-radius 8px
  - **Play button:** overlay, centered, 48px circle, background `rgba(0,0,0,0.5)`, white icon
  - **Type badge:** top-left corner, Small (12px), background `rgba(0,0,0,0.7)`, text white, uppercase
  - **Duration:** bottom-right corner, Small (12px), background `rgba(0,0,0,0.7)`, text white
  - **Download buttons:** flex row, gap 8px, margin-top 12px
    - Primary button: Download [Quality]
    - Secondary buttons: alternative qualities
    - All use `shadcn/ui Button` variants

- **Footer:**
  - "Reset" link at bottom, text-accent, underline on hover
  - Allows user to start over with new link

**Component Mapping:**
```
Downloader Container
├── Form (when idle/loading)
│   ├── Input: `shadcn/ui Input` + custom styling
│   ├── Button (Paste): `shadcn/ui Button` (variant="outline")
│   └── Button (Submit): `shadcn/ui Button` (variant="default")
├── Error Card: custom component with alert styling
└── Result Card: custom component
    ├── Header: custom flex layout
    ├── Tweet Text: custom
    ├── Media Blocks: repeating custom components
    │   ├── Thumbnail: Image
    │   ├── Play Icon Overlay: custom
    │   ├── Badges: custom
    │   └── Download Buttons: `shadcn/ui Button` array
    └── Reset Link: custom link styled
```

---

### SECTION 4: HOW IT WORKS

#### Current State
- "How it works" eyebrow label
- Large headline
- 3-card grid (step 1, 2, 3)
- Each card has step number, title, body text

#### New Design

**Container:**
- **Max width:** 1280px
- **Padding:** 64px vertical, 40px horizontal
- **Border-top:** `1px solid #2e2e2e`

**Header:**
- **Eyebrow:** 11px, 600, text-tertiary, uppercase, +50px letter-spacing
- **Title:** Display Lg (36px, 600, text-primary)
- **Layout:** flex column, gap 16px
- **Margin-bottom:** 48px (before cards)

**Card Grid:**
- **Layout:** 3-column (flex, gap 16px)
- **Responsive:** 2-up at tablet, 1-up at mobile
- **Per Card:**
  - **Background:** `#121212` (surface primary)
  - **Border:** `1px solid #2e2e2e`
  - **Padding:** 24px
  - **Border-radius:** 12px
  - **Transition:** all 200ms
  - **Hover:** border `#3b82f6` (40% opacity)
  - **Shadow:** elevation 1 on default, elevation 2 on hover
  
  **Card Content:**
  - **Step Number:** Display Md (28px, 600, text-secondary), positioned top-right, opacity 50%
  - **Icon/Art:** 40px × 40px SVG, accent color, margin-bottom 16px
  - **Title:** Headline (20px, 600, text-primary), margin-bottom 8px
  - **Body:** Body (14px, 400, text-secondary)

**Component Mapping:**
```
HowItWorks Section
├── Header (Eyebrow + Title)
└── Grid (3 cards)
    └── Card[] (icon, title, body, step number)
```

---

### SECTION 5: MEDIA TYPES (SHOWCASE)

#### Current State
- "What you can rip" eyebrow label
- Large headline
- 3-card grid (videos, photos, GIFs)
- Each card has gradient background, icon, heading, body

#### New Design

**Container:**
- **Max width:** 1280px
- **Padding:** 64px vertical, 40px horizontal
- **Border-top:** `1px solid #2e2e2e`

**Header:**
- **Eyebrow:** 11px, 600, text-tertiary, uppercase, +50px letter-spacing
- **Title:** Display Lg (36px, 600, text-primary)
- **Layout:** flex column, gap 16px
- **Margin-bottom:** 48px

**Showcase Cards (Spotlight Style):**
- **Layout:** 3-column grid (flex, gap 16px)
- **Responsive:** 2-up at tablet, 1-up at mobile
- **Per Card:**
  - **Background:** Gradient (unique per card) + border
  - **Border:** `1px solid rgba(255,255,255,0.1)`
  - **Padding:** 28px
  - **Border-radius:** 16px
  - **Min-height:** 180px
  - **Display:** flex flex-col justify-between
  - **Shadow:** 0 4px 20px rgba(0,0,0,0.4)
  - **Transition:** all 200ms
  - **Hover:** shadow elevation 3, slight scale 1.02

  **Card Gradients:**
  - Videos: `linear-gradient(135deg, #6a4cf5, #2f1d80)` (purple/violet)
  - Photos: `linear-gradient(135deg, #d44df0, #7a1f8f)` (magenta/fuchsia)
  - GIFs: `linear-gradient(135deg, #ff7a3d, #b23d12)` (orange/rust)

  **Card Content:**
  - **Icon:** 28px × 28px, stroke white, top section
  - **Spacing:** flex-grow pushes content down
  - **Type Name:** Display Md (28px, 600, text white), margin-bottom 8px
  - **Description:** Body (14px, 400, text white/90%)

**Component Mapping:**
```
MediaTypes Section
├── Header (Eyebrow + Title)
└── Grid (3 spotlight cards)
    └── SpotlightCard[] (gradient, icon, heading, description)
```

---

### SECTION 6: FEATURES

#### Current State
- "Why RipTweet" eyebrow label
- Large headline
- 6-card grid (2 columns, 3 rows, all uniform)
- Each card has checkmark icon, title, body

#### New Design

**Container:**
- **Max width:** 1280px
- **Padding:** 64px vertical, 40px horizontal
- **Border-top:** `1px solid #2e2e2e`

**Header:**
- **Eyebrow:** 11px, 600, text-tertiary, uppercase, +50px letter-spacing
- **Title:** Display Lg (36px, 600, text-primary)
- **Layout:** flex column, gap 16px
- **Margin-bottom:** 48px

**Feature Cards (Bento Grid):**
- **Layout:** 2-up grid on desktop (max 3-up optional for smaller cards)
- **Responsive:** 1-up on mobile, 2-up on tablet
- **Gap:** 16px (both horizontal and vertical)
- **Per Card:**
  - **Background:** `#121212` (surface primary)
  - **Border:** `1px solid #2e2e2e`
  - **Padding:** 24px
  - **Border-radius:** 12px
  - **Transition:** all 200ms
  - **Hover:** border `#3b82f6` (40% opacity), shadow elevation 2
  - **Min-height:** 160px

  **Card Content:**
  - **Icon Container:** 32px circle, background `#1a1a1a`, border `1px solid #2e2e2e`, centered checkmark, accent color
  - **Spacing:** 16px margin-bottom from icon
  - **Title:** Headline (20px, 600, text-primary), margin-bottom 8px
  - **Body:** Body (14px, 400, text-secondary)

**Component Mapping:**
```
Features Section
├── Header (Eyebrow + Title)
└── Grid (6 feature cards, 2-up)
    └── FeatureCard[] (checkmark icon, title, body)
```

---

### SECTION 7: FAQ

#### Current State
- "FAQ" eyebrow label
- Large headline
- Details/summary elements (native <details> tags)
- First item open by default
- Custom styling for expand/collapse icon

#### New Design

**Container:**
- **Max width:** 900px (narrower for FAQ readability)
- **Padding:** 64px vertical, 40px horizontal
- **Border-top:** `1px solid #2e2e2e`
- **Centered:** margin auto (center in viewport)

**Header:**
- **Eyebrow:** 11px, 600, text-tertiary, uppercase, +50px letter-spacing
- **Title:** Display Lg (36px, 600, text-primary)
- **Layout:** flex column, center align, gap 16px
- **Margin-bottom:** 48px

**FAQ Accordion (shadcn/ui Accordion):**
- **Type:** Use `shadcn/ui Accordion` component (uncontrolled or controlled)
- **Default open:** first item only (set via `defaultValue` prop)
- **Per Item:**

  **Accordion Trigger (Question):**
  - **Background:** transparent
  - **Padding:** 16px vertical, 0 horizontal (no padding, relies on content)
  - **Border-bottom:** `1px solid #2e2e2e`
  - **Hover:** background `rgba(59, 130, 246, 0.05)`
  - **Active:** background `rgba(59, 130, 246, 0.1)`
  - **Typography:** Headline (20px, 600, text-primary)
  - **Icon:** ChevronDown SVG, 20px, accent color, rotate 180° when open
  - **Flex layout:** space-between (question left, icon right)
  - **Transition:** icon rotation 200ms ease

  **Accordion Content (Answer):**
  - **Padding:** 16px vertical, 0 horizontal
  - **Typography:** Body (14px, 400, text-secondary)
  - **Max-width:** 800px
  - **Animation:** fade-in 150ms on expand, fade-out 150ms on collapse

**Component Mapping:**
```
FAQ Section
├── Header (Eyebrow + Title)
└── Accordion (shadcn/ui Accordion)
    └── AccordionItem[] (trigger, content)
```

---

### SECTION 8: FINAL CTA

#### Current State
- Centered headline
- Centered subheading
- Centered button with up arrow
- Link to scroll back to top

#### New Design

**Container:**
- **Max width:** 900px
- **Padding:** 64px vertical, 40px horizontal
- **Border-top:** `1px solid #2e2e2e`
- **Text-align:** center
- **Flex:** flex-col, items-center, gap 20px

**Content:**
- **Headline:** Display Lg (36px, 600, text-primary), margin-bottom 12px
- **Subheading:** Body Large (15px, 400, text-secondary), margin-bottom 24px
- **Button:** `shadcn/ui Button` (variant="default", size="lg")
  - Text: "Paste a link" + arrow icon
  - Action: scroll to `#top` (hero section)
  - Hover: elevation 2, background lighter blue

**Component Mapping:**
```
FinalCTA Section
├── Headline
├── Subheading
└── Button (links to #top)
```

---

### SECTION 9: FOOTER

#### Current State
- Logo + brand name + tagline
- Links section (product, saves)
- Disclaimer
- Copyright

#### New Design

**Container:**
- **Max width:** 1280px
- **Padding:** 56px vertical, 40px horizontal
- **Border-top:** `1px solid #2e2e2e`

**Layout:**
- **Grid:** 2 columns on desktop, 1 column on mobile
- **Gap:** 48px (horizontal), 32px (vertical on mobile)

**Left Column (Brand Info):**
- **Logo + Name:** flex row, gap 12px, margin-bottom 16px
  - Logo: 30px × 30px
  - Name: Headline (20px, 600, text-primary)
- **Tagline:** Body (14px, 400, text-secondary), max-width 300px

**Right Column (Links & Disclaimer):**
- **Navigation:** 2-column flex layout (Product | Saves)
  - **Product Column:**
    - Label: Eyebrow (11px, 600, text-tertiary), margin-bottom 12px
    - Links: Body (14px, 400, text-secondary), gap 8px, one per line
    - Link hover: text-primary
  - **Saves Column:** similar structure
- **Divider:** `1px solid #2e2e2e`, margin 24px 0

**Bottom Row (Disclaimer + Copyright):**
- **Layout:** flex row space-between on desktop, flex column on mobile
- **Disclaimer:** Small (13px, 400, text-tertiary), max-width 600px
- **Copyright:** Small (13px, 400, text-tertiary), right-aligned on desktop

**Component Mapping:**
```
Footer
├── Left Section (Brand info)
│   ├── Logo + Name
│   └── Tagline
├── Right Section (Links)
│   ├── Product Links Column
│   ├── Saves Links Column
│   └── Divider
└── Bottom Row (Disclaimer + Copyright)
```

---

## RESPONSIVE DESIGN BREAKPOINTS

```
Mobile:    < 640px    (1-column layouts, stacked sections)
Tablet:    640px–1024px (2-column layouts, medium spacing)
Desktop:   > 1024px   (3-column / full layouts, generous spacing)
```

### Specific Adjustments Per Breakpoint

**Mobile (<640px):**
- Section padding: 40px vertical, 20px horizontal
- Card gap: 12px
- Hero section: max-width 100%, headline Display Md (36px)
- Downloader: full-width input, stacked buttons
- FAQ: full-width, no max-width constraint
- Grid sections: 1-up (How it works, Media, Features)
- Footer: 1-column layout

**Tablet (640px–1024px):**
- Section padding: 48px vertical, 32px horizontal
- Card gap: 16px
- How it works: 2-up grid
- Media types: 2-up grid
- Features: 2-up grid (maintains 2-up)
- Downloader: horizontal layout maintained
- FAQ: full-width

**Desktop (>1024px):**
- Section padding: 64px vertical, 40px horizontal
- Card gap: 16px
- All grids: full specified layout (3-up where applicable)
- Max content width: 1280px
- Generous whitespace maintained

---

## COLOR PALETTE REFERENCE TABLE

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Canvas (bg) | Primary Black | `#0a0a0a` | Main background |
| Surface Primary | Dark Gray | `#121212` | Cards, containers |
| Surface Secondary | Medium Gray | `#1a1a1a` | Hover states |
| Surface Tertiary | Light Gray | `#242424` | Pressed, focus |
| Borders | Border Gray | `#2e2e2e` | Hairlines, dividers |
| Text Primary | White | `#ffffff` | Main text |
| Text Secondary | Muted | `#a1a1a1` | Supporting text |
| Text Tertiary | Faint | `#737373` | Secondary labels |
| Text Disabled | Disabled Gray | `#545454` | Disabled states |
| Accent Primary | Blue | `#3b82f6` | CTAs, focus |
| Accent Hover | Light Blue | `#60a5fa` | Hover states |
| Accent Focus | Dark Blue | `#1e40af` | Depth, pressed |
| Success | Green | `#10b981` | Success states |
| Warning | Amber | `#f59e0b` | Warnings |
| Destructive | Red | `#ef4444` | Errors, delete |

---

## INTERACTION & MICRO-INTERACTIONS

### Button States
```
Default:   bg-accent, text-white
Hover:     bg-[#60a5fa] (lighter blue), shadow elevation 2
Pressed:   bg-[#1e40af] (darker blue), scale 0.98
Focus:     outline ring rgba(59,130,246,0.3)
Disabled:  opacity 45%, pointer-events none
Loading:   spinner icon, text "Ripping…"
```

### Input States
```
Default:    bg-surface-secondary, border-borders
Focus:      bg-surface-tertiary, border-accent, ring-accent/30
Hover:      shadow elevation 1
Disabled:   opacity 60%, pointer-events none
Error:      border-destructive
```

### Transition Defaults
```
All Properties:   200ms cubic-bezier(0.4, 0, 0.2, 1)
Fast Transitions: 100ms (icons, small elements)
Slow Transitions: 300ms (modals, major layout shifts)
```

### Focus States (Keyboard Navigation)
```
Interactive Elements:  ring 2px offset 2px rgba(59,130,246,0.3)
Visible on Focus:     ring-offset-canvas
Tab Order:            Logical top-to-bottom flow
```

---

## TYPOGRAPHY HIERARCHY VISUAL EXAMPLE

```
Display XL (48px, 600)
    Rip any video, photo or GIF off X.

Display Lg (36px, 600)
    How it works

Headline (20px, 600)
    Original quality

Body Large (15px, 400)
    Paste an X (Twitter) post link...

Body (14px, 400)
    Every resolution X serves, up to the source file

Small (13px, 400)
    We never store your links or files.

Eyebrow (11px, 600)
    HOW IT WORKS
```

---

## SPACING HIERARCHY VISUAL EXAMPLE

```
┌─────────────────────────────────────┐  64px (section padding top)
│                                     │
│  ┌─────────────────────────────┐    │  16px (headline gap)
│  │ Eyebrow                     │    │
│  ├─────────────────────────────┤    │  16px (gap)
│  │ Headline                    │    │
│  └─────────────────────────────┘    │
│                                     │  48px (content gap)
│  ┌───────┬───────┬───────┐          │  16px (card gap)
│  │ Card  │ Card  │ Card  │          │
│  └───────┴───────┴───────┘          │
│                                     │
│                                     │  64px (section padding bottom)
└─────────────────────────────────────┘
```

---

## COMPONENT MAPPING: CURRENT → SHADCN/UI

| Current Element | Current Approach | New shadcn/ui Component | Customization |
|---|---|---|---|
| Buttons (primary) | Tailwind utility | `Button` (variant="default") | Blue accent, white text |
| Buttons (secondary) | Tailwind utility | `Button` (variant="outline") | Dark borders |
| Input field | Tailwind utility | `Input` | Dark bg, blue focus |
| Form validation | Custom | `Form` (optional) | Error styling |
| Accordion (FAQ) | Native `<details>` | `Accordion` | Dark bg, custom icons |
| Dialog/Modal | None currently | `Dialog` (future: for full-page views) | Dark bg |
| Select dropdown | None | `Select` (future) | Dark bg |
| Badge | Custom div | `Badge` | Outline variant |
| Spinner/Loader | Custom SVG | `Spinner` or `LoadingSpinner` | Accent color animation |
| Tabs | None | `Tabs` (future: if multi-page) | Dark bg, accent underline |
| Tooltip | None | `Tooltip` (future: for help text) | Dark bg, accent border |

---

## DESIGN TOKENS CONFIGURATION

### Tailwind Theme Extension
```typescript
theme: {
  colors: {
    canvas: '#0a0a0a',
    surface: {
      1: '#121212',
      2: '#1a1a1a',
      3: '#242424',
    },
    border: {
      default: '#2e2e2e',
      soft: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a1a1a1',
      tertiary: '#737373',
      disabled: '#545454',
    },
    accent: {
      primary: '#3b82f6',
      hover: '#60a5fa',
      focus: '#1e40af',
    },
  },
  fontSize: {
    'display-xl': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
    'display-lg': ['36px', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
    // ... etc
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    // ... etc
  },
}
```

---

## ACCESSIBILITY CONSIDERATIONS

### Keyboard Navigation
- All interactive elements keyboard-accessible via Tab
- Focus indicators visible (blue ring, 2px)
- Logical tab order (top-to-bottom, left-to-right)
- Enter/Space to activate buttons

### Color Contrast
- Text primary (#fff) on canvas (#0a0a0a): 21:1 (AAA)
- Text secondary (#a1a1a1) on surface (#121212): 10.5:1 (AAA)
- Accent (#3b82f6) on canvas: 6:1 (AA with text overlay)
- All meets WCAG 2.1 AA standard minimum

### Screen Readers
- Semantic HTML (`<button>`, `<a>`, `<h1>`, etc.)
- ARIA labels for icon-only buttons
- Alt text for images
- Proper heading hierarchy maintained

### Motion & Animation
- All transitions: `prefers-reduced-motion: reduce` respected
- No auto-play animations
- Animations enhance, not distract

---

## MIGRATION STRATEGY

### Phase 1: Setup
- Install shadcn/ui components (Button, Input, Accordion, Badge, Spinner)
- Create new Tailwind theme tokens file
- Add new CSS variables to globals.css

### Phase 2: Foundation
- Update header styling (no functionality change)
- Refactor color system (globals.css)
- Create Typography scale utility classes

### Phase 3: Component Redesign
- Hero section
- Downloader component
- How it Works cards
- Media Showcase cards
- Features grid
- FAQ accordion

### Phase 4: Polish
- Add hover/focus states
- Implement transitions/animations
- Test responsive design
- Fine-tune spacing

### Phase 5: Testing & QA
- Visual regression testing
- Cross-browser testing
- Mobile/tablet responsive testing
- Accessibility audit

---

## BEFORE & AFTER COMPARISON

| Aspect | Before (Current) | After (Redesigned) |
|--------|---|---|
| **Overall Feel** | Framer-inspired, artistic | Modern SaaS, premium, technical |
| **Color Palette** | Vibrant gradients, 6-color system | Minimal, dark, 2-color focus (blue accent) |
| **Typography** | Large, expressive | Precise, hierarchy-focused, Geist |
| **Spacing** | Moderate, design-driven | Generous, breathing room |
| **Cards** | Colorful gradients, heavy shadows | Flat, subtle borders, minimalist |
| **Interactivity** | Smooth animations, gradient effects | Purposeful, subtle, performance-focused |
| **Component System** | Custom tailwind utilities | shadcn/ui + Tailwind |
| **Visual Hierarchy** | Equal emphasis across sections | Strong priority signaling |
| **Layout** | Centered, symmetrical | Asymmetrical, bento-grid inspired |
| **Target Feel** | Creative, expressive | Trustworthy, professional, modern |

---

## CONCLUSION

This redesign transforms RipTweet from a creative landing page into a **modern SaaS product** that feels:

- **Premium:** Dark theme, generous spacing, refined typography
- **Technical:** Precision-engineered color system, component library
- **Trustworthy:** Clear hierarchy, reduced noise, focused CTAs
- **Modern:** Vercel/Linear/Raycast aesthetic, shadcn/ui standards
- **Accessible:** WCAG 2.1 AA, keyboard navigation, semantic HTML

The redesign maintains **100% functional parity** while elevating the visual experience to match user expectations of a production-grade SaaS tool.

---

**Design Review Checklist:**
- [ ] Color palette approved
- [ ] Typography scale verified
- [ ] Spacing system tested
- [ ] Component mapping confirmed
- [ ] Responsive breakpoints validated
- [ ] Accessibility requirements met
- [ ] Interaction patterns documented
- [ ] Migration strategy finalized

---

*Document prepared by: Senior Product Designer*  
*Last updated: 2026-06-16*  
*Status: Ready for implementation*
