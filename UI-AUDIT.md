# UI Audit: Current State vs Vercel/Linear Standards

## SECTION 1: HEADER

### Current State Analysis

**What's Outdated:**
- Semi-transparent backdrop blur (`bg-canvas/80 backdrop-blur-xl`) — feels dated vs. modern SaaS
- Border color too light (`border-hairline-soft: #1a1a1a`) — barely visible
- No clear visual separation between header and content
- Nav links: `gap-7` too large, spacing feels old-school spacious

**What's Amateur:**
- Typography: `text-[14px]` nav but mix of `font-medium` — inconsistent weight strategy
- Hover effect: simple `transition-colors` with no visual feedback polish
- Logo + name: no clear visual hierarchy or alignment consistency
- Focus states: not visible/polished

**What's Premium:**
- Sticky positioning is correct
- Clean logo alignment
- Navigation hierarchy exists

### Comparison to Standards

**Vercel Header:**
- Solid background (no transparency/blur)
- Thin clean border (1px)
- Consistent font sizing and weights
- Clear, minimal spacing
- Polished focus states

**Linear Header:**
- Minimal, refined
- Thin borders only
- Generous horizontal padding
- Sharp visual hierarchy

### Required Visual Changes

| Element | Current | Target | Change |
|---------|---------|--------|--------|
| **Background** | `#090909/80 + backdrop-blur-xl` | `#0A0A0A` solid | Remove transparency & blur |
| **Border** | `1px solid #1a1a1a` | `1px solid #262626` | Darker, more visible |
| **Height** | `56px` (h-14) | `56px` | Keep same |
| **Padding** | varies | `0 40px` | Standardize |
| **Nav Gap** | `gap-7` (28px) | `gap-8` (32px) | Increase for premium feel |
| **Nav Font Size** | `14px medium` | `14px 400` | Regular weight only |
| **Logo Name Gap** | `gap-2.5` | `gap-12px` | Keep |
| **Logo Name Font** | `text-[1.05rem] semibold` | `16px 600` Geist Sans | Standardize |
| **Hover Text Color** | `text-ink-muted → text-ink` | `#A1A1AA → #FAFAFA` | Use new palette |
| **Nav Link Transition** | `transition-colors` (200ms) | `transition all 150ms ease` | Standardize timing |
| **Focus Ring** | `focus-visible:ring-2` | `outline 2px #8B5CF6` | Accent color focus |

### Component Mapping
- **Navigation:** Flex container (no shadcn needed)
- **Logo:** Image component
- **Nav Links:** Anchor tags with Tailwind
- **CTA Button:** `shadcn/ui Button` (variant="default", size="sm")

### Exact Specification

```
Header Container:
- Background: #0A0A0A
- Border-bottom: 1px solid #262626
- Height: 56px
- Padding: 0 40px
- Flex: items-center justify-between
- Gap: 24px (between logo and nav)

Logo Group:
- Flex: items-center gap-12px
- Logo: 30px × 30px
- Name: 16px 600 Geist Sans #FAFAFA

Nav (desktop only):
- Flex: items-center gap-8
- Font: 14px 400 Geist Sans #A1A1AA
- Link hover: #FAFAFA, transition all 150ms ease

CTA Button:
- shadcn Button, variant="default", size="sm"
- Text: 13px 600 Geist Sans
- Bg: #8B5CF6
- Hover: #A78BFA
- Focus: outline 2px #8B5CF6
```

---

## SECTION 2: HERO

### Current State Analysis

**What's Outdated:**
- Ambient radial gradients (`radial-gradient` at top) — Framer-era design, feels artsy not professional
- Extra-large eyebrow text: `text-xs` (12px) but with `tracking-[0.16em]` — looks antiquated
- Large clamp-based heading: `text-[clamp(2.25rem,6vw,5rem)]` — responsive but inconsistent
- Spacing: `pt-16 pb-20 sm:pt-24 sm:pb-28` — too variable, feels uncontrolled
- Button styling uses pill shape (rounded-full) — dated trend

**What's Amateur:**
- Subheading color: `text-ink-muted (#999999)` — low contrast
- Max-width: `max-w-4xl` on inner, `max-w-2xl` on downloader — inconsistent containment
- Trust signal: `text-[0.9375rem]` (15px) but uses caption styling — mixed approaches

**What's Premium:**
- Center alignment is correct
- Clear visual hierarchy of eyebrow → headline → subheading
- Good spacing between elements
- Trust signal at bottom shows attention to detail

### Comparison to Standards

**Vercel Hero:**
- Solid backgrounds (no gradients)
- Fixed typography sizes (no clamp)
- Generous, even spacing
- Clear section separation
- Minimal visual complexity

**Linear Hero:**
- Premium color palette
- Strong typography hierarchy
- Refined spacing ratios
- No decorative effects

### Required Visual Changes

| Element | Current | Target | Change |
|---------|---------|--------|--------|
| **Background Gradients** | `radial-gradient` × 2 | Remove entirely | Solid #0A0A0A |
| **Section Padding** | `pt-16 pb-20 sm:pt-24 sm:pb-28` | `py-64 sm:py-80` (consistent) | Standardize |
| **Max Width (container)** | `max-w-4xl` | `max-w-2xl` | Narrower focus |
| **Eyebrow Font** | `text-xs 600 tracking-[0.16em]` | `text-12px 600 tracking-[0.1em]` | Reduce tracking |
| **Eyebrow Color** | `text-ink-faint (#6b6b6b)` | `#8B5CF6` (accent) | Use accent color |
| **Eyebrow Spacing** | `mb-6` | `mb-16` | More breathing |
| **Headline Font** | `text-[clamp(...)]` (fluid) | `text-56px` (fixed) | Fixed size, easier to control |
| **Headline Weight** | `semibold` (600) | `700` | Bolder |
| **Headline Color** | `inherit` (white) | `#FAFAFA` | Slightly off-white |
| **Headline Gap** | `mt-6` | `mt-16` | More space |
| **Subheading Font** | `text-[clamp(...)] text-ink-muted` | `text-16px 400 #A1A1AA` | Bigger, more readable |
| **Subheading Gap** | `mt-6` | `mt-20` | More breathing |
| **Downloader Gap** | `mt-10` | `mt-48` | Much more space |
| **Trust Signal** | `text-caption` (14px) | `text-12px 400` | Smaller |
| **Trust Signal Color** | `text-ink-faint` | `#A1A1AA` | Brighter |
| **Trust Signal Gap** | `mt-8` | `mt-24` | More space |

### Component Mapping
- **Section:** Simple div wrapper
- **Eyebrow:** Heading tag (semantic)
- **Headline:** `<h1>` tag
- **Subheading:** Paragraph tag
- **Downloader:** Custom component (no shadcn needed)

### Exact Specification

```
Hero Section:
- Container: mx-auto w-full max-w-[1280px]
- Padding: 64px 40px (vertical/horizontal)
- Text-align: center

Eyebrow:
- Font: 12px 600 Geist Sans
- Color: #8B5CF6
- Letter-spacing: 0.1em
- Uppercase
- Margin-bottom: 16px
- Flex: items-center justify-center gap-8

Headline (H1):
- Font: 56px 700 Geist Sans
- Color: #FAFAFA
- Line-height: 1.1
- Letter-spacing: -0.02em
- Margin-bottom: 16px

Subheading (P):
- Font: 16px 400 Geist Sans
- Color: #A1A1AA
- Line-height: 1.6
- Max-width: 600px
- Margin: 20px auto 0
- Center via mx-auto

Downloader Container:
- Margin-top: 48px
- Max-width: 600px
- Center via mx-auto

Trust Signal (P):
- Font: 12px 400 Geist Sans
- Color: #A1A1AA
- Margin-top: 24px
- Center via mx-auto
```

---

## SECTION 3: DOWNLOADER CARD

### Current State Analysis

**What's Outdated:**
- Input styling: `rounded-[12px]` — feels old, needs 6px
- Border color: `border-hairline (#262626)` on focus — becomes accent but sizing wrong
- Focus ring: `focus-within:ring-4 focus-within:ring-accent/15` — too large (16px), low opacity
- Button shape: `rounded-full` (pill) — dated trend from 2020-21
- Form gap: `flex flex-col gap-3 sm:flex-row` — inconsistent responsive behavior

**What's Amateur:**
- Field styling: `flex items-center gap-2` inside container — complex layout
- Paste button hidden on mobile — feels like afterthought, not thoughtful design
- Button padding: `px-4 py-2` (secondary) vs `px-7 py-3.5` (primary) — arbitrary values
- Error card: custom styled div with colors from old palette
- Results card: `rounded-[20px]` — too rounded
- Loading spinner: manual SVG animation

**What's Premium:**
- Input placeholder styling
- Clear button (X icon) on input value
- Paste functionality (clipboard access)
- Results card shows full tweet context
- Media block layout is well-structured

### Comparison to Standards

**Vercel Inputs:**
- Square corners or 6px radius
- Thin borders (1px)
- Clear focus states (blue ring)
- Simple, predictable
- Generous internal padding

**Linear Inputs:**
- Minimal styling
- Thin borders only
- Accent focus ring
- No decorative effects

### Required Visual Changes

| Element | Current | Target | Change |
|---------|---------|--------|--------|
| **Container** | `rounded-[12px]` | `rounded-[8px]` | Less rounded |
| **Container Border** | `border-hairline` | `1px solid #262626` | Standard |
| **Container Background** | `bg-surface-1` | `bg-[#111111]` | New palette |
| **Container Padding** | Custom flex gap | `24px` | Standardize |
| **Input Background** | `bg-transparent` (inherits surface) | `bg-[#1a1a1a]` | Darker |
| **Input Border** | Part of container | Separate: `1px solid #262626` | Clear definition |
| **Input Border Radius** | Inherits | `6px` | Smaller |
| **Input Padding** | `py-2.5` (10px) | `12px 16px` | Standard |
| **Input Font** | `text-base` (16px) | `text-14px` | Smaller |
| **Input Placeholder** | `text-ink-faint` (#6b6b6b) | `#A1A1AA` | Brighter |
| **Input Focus Ring** | `ring-4 ring-accent/15` (16px, 15% opacity) | `ring-3 ring-[#8B5CF6]/30` (12px, 30% opacity) | Smaller, more visible |
| **Focus Border** | `border-accent/60` | `border-[#8B5CF6]` | Solid accent |
| **Icon Color** | `text-ink-faint` (#6b6b6b) | `#A1A1AA` | Brighter |
| **Paste Button Radius** | Inherits `rounded-full` | `6px` (via shadcn) | Less pill-like |
| **Paste Button Variant** | `ui.btnSecondary` | `shadcn Button variant="outline"` | shadcn component |
| **Paste Button Size** | `px-4 py-2 text-[13px]` | `shadcn size="sm"` (32px height) | Standardized |
| **Submit Button Radius** | `rounded-full` | `6px` | Less pill-like |
| **Submit Button Variant** | `ui.btnPrimary` | `shadcn Button variant="default"` | shadcn component |
| **Submit Button Size** | `px-7 py-3.5 text-base` | `shadcn size="default"` (40px height) | Standardized |
| **Submit Button Color** | `bg-ink (white) text-black` | `bg-[#8B5CF6] text-white` | Purple accent |
| **Submit Button Hover** | `hover:bg-white/90` | `hover:bg-[#A78BFA]` | Lighter purple |
| **Submit Button Focus** | `ring-accent/70` | `ring-[#8B5CF6]/30` | 30% opacity |
| **Caption Below Form** | `text-caption text-ink-faint` | `text-12px 400 #A1A1AA` | Updated palette |

**Result Card Changes:**

| Element | Current | Target | Change |
|---------|---------|--------|--------|
| **Card Border Radius** | `rounded-[20px]` | `rounded-[12px]` | Less rounded |
| **Card Background** | `bg-surface-1` | `bg-[#111111]` | New palette |
| **Card Border** | `border-hairline` | `1px solid #262626` | Standard |
| **Header Divider** | `border-hairline` | `1px solid #262626` | Consistent |
| **Avatar Border Radius** | `rounded-full` | `rounded-full` | Keep |
| **Avatar Size** | `h-11 w-11` (44px) | `40px` | Slightly smaller |
| **Author Name Font** | `font-semibold text-ink` | `16px 600 #FAFAFA` | Standardize |
| **Verified Badge** | `text-accent` | `#8B5CF6` | Purple accent |
| **Item Count Badge** | `bg-surface-2 text-ink-muted` | `bg-[#1a1a1a] text-[#A1A1AA] border 1px #262626` | New styling |
| **Tweet Text Padding** | `px-4 pt-4` | `px-24 py-16` | Standard padding |
| **Tweet Text Font** | `text-body` | `14px 400 #A1A1AA` | Secondary color |
| **Media Block Radius** | `rounded-[15px]` | `rounded-[12px]` | Less rounded |
| **Media Block Border** | `border-hairline` | `1px solid #262626` | Standard |
| **Media Block Padding** | Custom | `16px` | Standardize |
| **Play Button Size** | `h-14 w-14` (56px) | `48px` | Slightly smaller |
| **Type Badge** | `text-[11px] font-semibold` | `11px 600` | Consistent |
| **Duration Badge** | `text-[12px] font-medium` | `12px 500` | Consistent |
| **Download Buttons** | Mixed sizing | All `shadcn Button` | Consistent |
| **Primary Download Button** | `ui.btnPrimary` | `shadcn variant="default"` | shadcn |
| **Secondary Download Buttons** | `ui.btnSecondary` | `shadcn variant="outline"` | shadcn |

**Error Card Changes:**

| Element | Current | Target | Change |
|---------|---------|--------|--------|
| **Container** | `flex items-start gap-3 rounded-[20px] border-coral/30 bg-coral/[0.06]` | `flex gap-16px p-16 rounded-8px border-1px #EF4444 bg-transparent` | Minimal style |
| **Icon** | `text-coral` | `#EF4444` | Red error color |
| **Message Font** | `font-medium text-ink` | `14px 600 #FAFAFA` | Bold text |
| **Retry Link** | `text-accent` underline | `#8B5CF6 underline on hover` | Accent color |

### Component Mapping
- **Form Container:** Div (no shadcn needed)
- **Input:** `shadcn/ui Input` (custom dark styling)
- **Paste Button:** `shadcn/ui Button` (variant="outline", size="sm")
- **Submit Button:** `shadcn/ui Button` (variant="default", size="default")
- **Result Card:** Custom component (divs, no shadcn for layout)
- **Download Buttons:** `shadcn/ui Button` (both variants)
- **Error Card:** Custom styled div

### Exact Specification

```
Form Container:
- Background: #111111
- Border: 1px solid #262626
- Border-radius: 8px
- Padding: 24px
- Box-shadow: none (default), 0 1px 2px rgba(0,0,0,0.3) on hover

Form Layout:
- Flex: flex-col gap-16 sm:flex-row
- Input: flex-1
- Buttons: flex shrink-0

Input Field:
- Background: #1a1a1a
- Border: 1px solid #262626
- Border-radius: 6px
- Padding: 12px 16px
- Font: 14px 400 Geist Sans
- Color: #FAFAFA
- Placeholder: #A1A1AA
- Transition: all 150ms ease
- Focus: border-[#8B5CF6], ring-3 ring-[#8B5CF6]/30

Paste Button (secondary):
- shadcn Button
- variant="outline"
- size="sm" (32px height)
- Hidden on mobile (sm:inline-flex)
- Border: 1px solid #262626
- Text: 13px 600 #FAFAFA

Submit Button (primary):
- shadcn Button
- variant="default"
- size="default" (40px height)
- Background: #8B5CF6
- Text: 14px 600 white
- Hover: #A78BFA
- Focus: ring-3 ring-[#8B5CF6]/30
- Disabled: opacity 50%

Caption:
- Font: 12px 400 Geist Sans
- Color: #A1A1AA
- Margin-top: 12px
- Text-align: center

Result Card:
- Background: #111111
- Border: 1px solid #262626
- Border-radius: 12px
- Padding: 0 (sections handle padding)
- Overflow: hidden

Header Row:
- Flex: items-center justify-between
- Padding: 16px
- Border-bottom: 1px solid #262626
- Gap: 12px

Avatar:
- Size: 40px
- Border-radius: 50%
- Aspect: square

Media Block:
- Background: #111111
- Border: 1px solid #262626
- Border-radius: 12px
- Padding: 16px
- Margin-top: 16px

Download Button Group:
- Flex: flex-wrap gap-8
- Margin-top: 12px
- Primary: shadcn default
- Secondary: shadcn outline
```

---

## SECTION 4: HOW IT WORKS

### Current State Analysis

**What's Outdated:**
- Cards: `rounded-[20px]` — too rounded
- Card styling: `border-hairline bg-surface-1` — correct but feels basic
- Gap between cards: `gap-4` (16px) — too tight
- Card padding: `p-6` (24px) — reasonable but standard
- Step number: `text-ink-faint` (#6b6b6b) — faint, hard to see
- No hover states defined

**What's Amateur:**
- Eyebrow: `text-ink-faint` (#6b6b6b) — low contrast
- Title: no clear hierarchy, `t.displayLg` used but mixed with max-width
- Card title: `text-[1.1rem]` — arbitrary size
- Icon art: custom inline SVG — good attention to detail, keep it
- No visual feedback on interaction

**What's Premium:**
- Section structure is clean
- Clear eyebrow → title hierarchy
- Consistent card layout
- Good use of space within cards

### Comparison to Standards

**Vercel Feature Cards:**
- Consistent border styling
- Thin borders (1px)
- Minimal shadows
- Clear hover states (border accent)
- Fixed border radius (6-8px)

**Linear Feature Cards:**
- Minimal styling
- Focused on content over decoration
- Subtle borders

### Required Visual Changes

| Element | Current | Target | Change |
|---------|---------|--------|--------|
| **Section Border-top** | `border-hairline` (implied) | `1px solid #262626` | Explicit |
| **Section Padding** | Implicit | `py-64 px-40` | Standardize |
| **Eyebrow Font** | `text-xs font-semibold uppercase tracking-[0.16em]` | `12px 600 uppercase tracking-[0.1em]` | Reduce tracking |
| **Eyebrow Color** | `text-ink-faint` (#6b6b6b) | `#8B5CF6` | Accent color |
| **Eyebrow Margin** | `mb-4` | `mb-12` | More breathing |
| **Title Font** | `t.displayLg` (clamp) | `36px 700` (fixed) | Easier control |
| **Title Color** | Inherit | `#FAFAFA` | Explicit |
| **Title Margin** | None | `mb-48` | Before cards |
| **Card Gap** | `gap-4` (16px) | `gap-16` (16px, more horizontal) | Same value, explicit |
| **Card Border Radius** | `rounded-[20px]` | `rounded-[8px]` | Much less rounded |
| **Card Background** | `bg-surface-1` | `bg-[#111111]` | New palette |
| **Card Border** | `border-hairline` | `1px solid #262626` | Explicit |
| **Card Padding** | `p-6` (24px) | `p-24` (24px, via Tailwind) | Explicit |
| **Card Hover** | None | `border-[#8B5CF6] shadow-sm` | Visual feedback |
| **Card Transition** | None | `all 150ms ease` | Smooth transition |
| **Icon Size** | `40px` | `40px` | Keep |
| **Icon Color** | `var(--color-accent)` (#0099ff) | `#8B5CF6` | New accent |
| **Step Number Font** | `t.displayMd` (clamp) | `28px 700` (fixed) | Fixed size |
| **Step Number Color** | `text-ink-faint` (#6b6b6b) | `#A1A1AA` | Brighter |
| **Step Number Opacity** | 100% | 60% | More subtle |
| **Card Title Font** | `t.headline mb-1.5` | `16px 600 #FAFAFA mb-8` | Consistent |
| **Card Title Color** | `text-ink` | `#FAFAFA` | Explicit |
| **Card Body Font** | `t.body` | `14px 400 #A1A1AA` | Consistent |
| **Card Body Color** | `text-ink-muted` (#999999) | `#A1A1AA` | New palette |

### Component Mapping
- **Section:** Div with standard structure
- **Eyebrow:** Paragraph tag
- **Title:** `<h2>` tag
- **Grid:** Flex container (3-column)
- **Cards:** Div containers
- **Icons:** Inline SVG (keep as-is)

### Exact Specification

```
How It Works Section:
- Container: mx-auto w-full max-w-[1280px]
- Padding: 64px 40px
- Border-top: 1px solid #262626

Header:
- Eyebrow: 12px 600 Geist Sans, #8B5CF6, uppercase, tracking-[0.1em], mb-12
- Title: 36px 700 Geist Sans, #FAFAFA, mb-48

Grid:
- Flex: gap-16 md:grid-cols-3
- Responsive: 1-col mobile, 2-col tablet, 3-col desktop

Cards:
- Background: #111111
- Border: 1px solid #262626
- Border-radius: 8px
- Padding: 24px
- Flex: flex-col gap-16
- Transition: all 150ms ease
- Hover: border-[#8B5CF6], shadow 0 1px 2px rgba(0,0,0,0.3)

Card Header:
- Flex: items-center justify-between
- Gap: 12px

Card Icon:
- Size: 40px × 40px
- Stroke: #8B5CF6

Step Number:
- Font: 28px 700 Geist Sans
- Color: #A1A1AA
- Opacity: 60%

Card Title:
- Font: 16px 600 Geist Sans
- Color: #FAFAFA
- Margin-bottom: 8px

Card Body:
- Font: 14px 400 Geist Sans
- Color: #A1A1AA
- Line-height: 1.6
```

---

## SECTION 5: MEDIA SHOWCASE

### Current State Analysis

**What's Outdated:**
- Gradient backgrounds on cards — Framer-era design
- Border: `border-white/10` — transparent borders feel dated
- Shadow: `shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_60px_-28px_rgba(0,0,0,0.85)]` — over-engineered
- Border radius: `rounded-[30px]` — very rounded, feels playful not professional
- Card min-height: `min-h-[260px]` — arbitrary value

**What's Amateur:**
- Gradients used as primary visual element (not subtle)
- Heavy inset shadow (over-decorated)
- No hover states
- Color palette: violets, magentas, oranges — too colorful

**What's Premium:**
- Three-column grid is clean
- Icon usage is good
- Typography hierarchy is clear
- Content layout is well-structured

### Comparison to Standards

**Vercel Showcase Cards:**
- Minimal styling
- Subtle colors
- Consistent borders
- No gradients
- Clear hover states

**Linear Showcase Cards:**
- Flat design
- Accent color usage
- Minimal decoration

### Required Visual Changes

| Element | Current | Target | Change |
|---------|---------|--------|--------|
| **Card Background** | Gradients (violet/magenta/orange) | `#111111` solid | Remove gradients |
| **Card Border** | `border-white/10` (transparent) | `1px solid #262626` | Solid standard |
| **Card Border Radius** | `rounded-[30px]` | `rounded-[8px]` | Much less rounded |
| **Card Padding** | `p-7` (28px) | `p-28` (28px, explicit) | Keep same value |
| **Card Shadow** | Complex inset shadow | `none` (default) | Remove |
| **Card Shadow (hover)** | None | `0 1px 2px rgba(0,0,0,0.3)` | Add hover effect |
| **Card Transition** | None | `all 150ms ease` | Add smooth transition |
| **Min Height** | `min-h-[260px]` | `min-h-[180px]` | Smaller minimum |
| **Card Flex** | `flex flex-col justify-between` | Same | Keep layout |
| **Icon Size** | `30px` | `28px` | Slightly smaller |
| **Icon Stroke** | `white` | `#FAFAFA` | Explicit |
| **Icon Color** | Varies per gradient | `#8B5CF6` (all same) | Consistent accent |
| **Card Type Name** | `t.displayMd text-white` | `24px 700 Geist Sans #FAFAFA` | Standardize |
| **Card Description** | `text-[15px] leading-relaxed text-white/85` | `14px 400 Geist Sans #A1A1AA` | Use new palette |

### Component Mapping
- **Section:** Div
- **Grid:** Flex 3-column
- **Cards:** Div containers (no gradients, standard borders)
- **Icons:** Inline SVG (recolor to accent)

### Exact Specification

```
Media Types Section:
- Container: mx-auto w-full max-w-[1280px]
- Padding: 64px 40px
- Border-top: 1px solid #262626

Header:
- Eyebrow: 12px 600 Geist Sans, #8B5CF6, uppercase, tracking-[0.1em], mb-12
- Title: 36px 700 Geist Sans, #FAFAFA, mb-48

Grid:
- Flex: gap-16 md:grid-cols-3
- Responsive: 1-col mobile, 2-col tablet, 3-col desktop

Cards:
- Background: #111111
- Border: 1px solid #262626
- Border-radius: 8px
- Padding: 28px
- Min-height: 180px
- Flex: flex-col justify-between
- Transition: all 150ms ease
- Hover: shadow 0 1px 2px rgba(0,0,0,0.3)

Card Icon:
- Size: 28px × 28px
- Stroke: #8B5CF6
- Margin-bottom: 16px (auto layout)

Card Type Name:
- Font: 24px 700 Geist Sans
- Color: #FAFAFA
- Margin-bottom: 12px

Card Description:
- Font: 14px 400 Geist Sans
- Color: #A1A1AA
- Line-height: 1.6
```

---

## SECTION 6: FEATURES

### Current State Analysis

**What's Outdated:**
- Feature grid: `grid gap-px overflow-hidden rounded-[20px] border border-hairline bg-hairline` — complex grouped styling
- Gap-px approach: creates visual separator lines (obsolete technique)
- Card background: individual `bg-surface-1` — repetitive
- No clear card boundaries
- Border radius: `rounded-[20px]` — too rounded

**What's Amateur:**
- Checkmark icon container: `h-9 w-9` (36px) — arbitrary
- Icon background: `bg-surface-2` — not distinct
- Icon color: `text-accent` but no clear styling
- No hover states on cards
- Title sizing: `text-[1.1rem]` — arbitrary

**What's Premium:**
- Checkmark icon shows attention to detail
- Six-card layout is well-organized
- Typography hierarchy is clear
- Good use of space

### Comparison to Standards

**Vercel Feature Grid:**
- Clear card boundaries (borders)
- Consistent spacing
- Fixed border radius (6-8px)
- Hover states with accent border
- Minimal icon styling

**Linear Feature Grid:**
- Simple borders
- Minimal decoration
- Consistent gaps

### Required Visual Changes

| Element | Current | Target | Change |
|---------|---------|--------|--------|
| **Grid Container** | `grid gap-px overflow-hidden rounded-[20px] border bg-hairline` | Remove wrapper styling | Simplify |
| **Grid Gap** | `gap-px` (1px visual separator) | `gap-16` (16px) | Standard gap |
| **Grid Layout** | Grouped border | Individual card borders | Clear boundaries |
| **Grid Columns** | `grid-cols-2 lg:grid-cols-3` | Same | Keep layout |
| **Card Background** | `bg-surface-1` | `bg-[#111111]` | New palette |
| **Card Border** | None (part of grid) | `1px solid #262626` | Individual border |
| **Card Border Radius** | Inherited from wrapper | `rounded-[8px]` | Fixed, less rounded |
| **Card Padding** | `p-6` (24px) | `p-24` (24px, explicit) | Explicit |
| **Card Hover** | None | `border-[#8B5CF6]` | Visual feedback |
| **Card Transition** | None | `all 150ms ease` | Smooth |
| **Icon Container** | `h-9 w-9 (36px) rounded-full bg-surface-2` | `h-32 w-32 (32px) rounded-full bg-[#1a1a1a] border-1px #262626` | Smaller, with border |
| **Icon Container Color** | Inherit | `#1a1a1a` | Darker |
| **Icon Container Border** | None | `1px solid #262626` | Defined |
| **Icon Color** | `text-accent` (#0099ff) | `#8B5CF6` | Purple accent |
| **Icon Spacing** | `mb-4` (16px) | `mb-16` (16px, explicit) | Explicit |
| **Card Title Font** | `t.headline mb-1.5 text-[1.1rem]` | `16px 600 Geist Sans #FAFAFA mb-8` | Standardize |
| **Card Title Color** | `text-ink` | `#FAFAFA` | Explicit |
| **Card Body Font** | `t.body` | `14px 400 Geist Sans #A1A1AA` | Consistent |
| **Card Body Color** | `text-ink-muted` (#999999) | `#A1A1AA` | New palette |

### Component Mapping
- **Section:** Div
- **Grid:** Grid container (not shadcn needed)
- **Cards:** Individual div elements (no shadcn, semantic grid)
- **Icon Container:** Div with styling
- **Checkmark Icon:** SVG (recolor to accent)

### Exact Specification

```
Features Section:
- Container: mx-auto w-full max-w-[1280px]
- Padding: 64px 40px
- Border-top: 1px solid #262626

Header:
- Eyebrow: 12px 600 Geist Sans, #8B5CF6, uppercase, tracking-[0.1em], mb-12
- Title: 36px 700 Geist Sans, #FAFAFA, mb-48

Grid:
- Display: grid
- Grid-cols: 2 (sm:2, lg:3)
- Gap: 16px
- Responsive: 1-col mobile, 2-col tablet, 3-col desktop

Cards:
- Background: #111111
- Border: 1px solid #262626
- Border-radius: 8px
- Padding: 24px
- Flex: flex-col
- Transition: all 150ms ease
- Hover: border-[#8B5CF6], shadow 0 1px 2px rgba(0,0,0,0.3)

Icon Container:
- Size: 32px × 32px (h-8 w-8 in Tailwind)
- Background: #1a1a1a
- Border: 1px solid #262626
- Border-radius: 50%
- Flex: items-center justify-center
- Margin-bottom: 16px

Icon (Checkmark):
- Size: 16px × 16px
- Stroke: #8B5CF6
- Stroke-width: 2.2

Card Title:
- Font: 16px 600 Geist Sans
- Color: #FAFAFA
- Margin-bottom: 8px

Card Body:
- Font: 14px 400 Geist Sans
- Color: #A1A1AA
- Line-height: 1.6
```

---

## SECTION 7: FAQ

### Current State Analysis

**What's Outdated:**
- Native `<details>` elements — works but not polished
- Custom icon styling: `grid h-7 w-7 place-items-center rounded-full bg-surface-1` — bulky
- Rotate animation: `group-open:rotate-45` — plus becomes X, not standard
- No clear spacing between items
- Border-bottom styling: `border-hairline-soft (#1a1a1a)` — too subtle

**What's Amateur:**
- Icon container: `h-7 w-7` (28px) — arbitrary, should be smaller
- Icon background: `bg-surface-1` — not visually distinct
- Icon color: `text-ink-muted` (#999999) — low contrast
- Summary padding: `py-5` (20px) — inconsistent
- No focus states

**What's Premium:**
- Accordion concept is good
- Clear expand/collapse behavior
- Good typography hierarchy

### Comparison to Standards

**Vercel FAQ:**
- shadcn Accordion component
- ChevronDown icon (rotates smoothly)
- Clear borders between items
- Consistent spacing
- Focus states visible

**Linear FAQ:**
- Minimal accordion styling
- Accent border on focus
- Clean spacing

### Required Visual Changes

| Element | Current | Target | Change |
|---------|---------|--------|--------|
| **Component** | Native `<details>` | `shadcn/ui Accordion` | Replace with shadcn |
| **Section Border-top** | Implicit | `1px solid #262626` | Explicit |
| **Section Padding** | Implicit | `py-64 px-40` | Standardize |
| **Eyebrow Font** | `text-ink-faint uppercase` | `12px 600 #8B5CF6 uppercase tracking-[0.1em]` | New style |
| **Eyebrow Margin** | Implicit | `mb-12` | Explicit |
| **Title Font** | `t.displayLg` | `36px 700 Geist Sans #FAFAFA` | Standardize |
| **Title Margin** | Implicit | `mb-48` | Explicit |
| **Max-width** | `max-w-3xl` | Keep | Same |
| **Container Background** | Transparent | `transparent` | Keep |
| **Item Border** | `border-b border-hairline-soft` (#1a1a1a) | `1px solid #262626` | Darker, more visible |
| **Item Padding** | `py-5` (20px) | `py-16` (16px) | Explicit |
| **Trigger Font** | `t.headline text-[1.05rem]` | `16px 600 Geist Sans #FAFAFA` | Standardize |
| **Trigger Padding** | Inherits item | `16px 0` (vertical only) | Explicit |
| **Trigger Hover** | None | `bg-[rgba(139,92,246,0.05)]` | Subtle accent tint |
| **Icon Container** | `h-7 w-7 (28px) rounded-full bg-surface-1` | `h-6 w-6 (24px) no background, no container` | Remove container |
| **Icon Color** | `text-ink-muted` (#999999) | `#8B5CF6` | Accent color |
| **Icon Type** | Plus (rotates to X) | ChevronDown (rotates) | Standard icon |
| **Icon Rotation** | 45° open | 180° open | Standard chevron |
| **Icon Transition** | `transition-transform duration-200` | `transition-transform all 150ms ease` | Standardize |
| **Content Padding** | `mt-3` (12px) | `mt-16 pb-16` (16px) | Explicit |
| **Content Font** | `t.bodyLg` | `14px 400 Geist Sans #A1A1AA` | Standardize |
| **Content Color** | `text-ink-muted` (#999999) | `#A1A1AA` | New palette |
| **Content Line Height** | `leading-relaxed` (1.6) | Inherit (1.6) | Same |

### Component Mapping
- **Component:** `shadcn/ui Accordion`
- **Accordion Container:** Use shadcn root component
- **Accordion Item:** Use shadcn item component
- **Accordion Trigger:** Use shadcn trigger (custom icon + styling)
- **Accordion Content:** Use shadcn content component
- **Icon:** ChevronDown (from shadcn icons or Lucide)

### Exact Specification

```
FAQ Section:
- Container: mx-auto w-full max-w-[1280px]
- Padding: 64px 40px
- Border-top: 1px solid #262626

Header:
- Eyebrow: 12px 600 Geist Sans, #8B5CF6, uppercase, tracking-[0.1em], mb-12
- Title: 36px 700 Geist Sans, #FAFAFA, mb-48

FAQ Container:
- Max-width: 900px
- Center: mx-auto

Accordion (shadcn/ui):
- Type: single (one open at a time)
- Collapsible: true
- Default open: first item
- No background
- No border on container

Accordion Item:
- Background: transparent
- Border-bottom: 1px solid #262626
- Last item: border-bottom none

Accordion Trigger:
- Padding: 16px 0
- Font: 16px 600 Geist Sans
- Color: #FAFAFA
- Flex: space-between items-center
- Transition: all 150ms ease
- Hover: bg-[rgba(139,92,246,0.05)]
- Focus: outline 2px #8B5CF6, outline-offset 2px

Icon (ChevronDown):
- Size: 20px × 20px
- Color: #8B5CF6
- Rotation: 180° when open
- Transition: rotate 150ms ease

Accordion Content:
- Padding: 16px 0
- Font: 14px 400 Geist Sans
- Color: #A1A1AA
- Line-height: 1.6
- Animation: fade-in 150ms
```

---

## SECTION 8: FOOTER

### Current State Analysis

**What's Outdated:**
- Logo + brand section with custom spacing
- Border separator: `my-10 h-px bg-hairline-soft` — thick visual separator
- Link styling: plain text, muted color
- No clear visual hierarchy
- Footer padding: default (implicit)

**What's Amateur:**
- Link colors don't change on hover initially clear but not polished
- Divider styling (my-10 h-px) — feels dated
- No focus states on links
- Disclaimer text sizing: generic

**What's Premium:**
- Clean two-column layout
- Good content organization
- Proper heading hierarchy

### Comparison to Standards

**Vercel Footer:**
- Minimal styling
- Clear link hover states
- Proper spacing
- Thin borders
- Simple typography

**Linear Footer:**
- Minimal footer
- Focused on navigation
- Clean spacing

### Required Visual Changes

| Element | Current | Target | Change |
|---------|---------|--------|--------|
| **Footer Padding** | Implicit | `py-56 px-40` | Standardize |
| **Footer Border-top** | None | `1px solid #262626` | Add top border |
| **Logo Size** | `h-[30px] w-[30px]` | `30px` | Consistent |
| **Logo Gap** | `gap-2.5` | `gap-12` | More breathing |
| **Brand Name Font** | `text-[1.05rem] semibold tracking-tight` | `16px 600 Geist Sans #FAFAFA` | Standardize |
| **Tagline Font** | `text-body mt-4` | `14px 400 Geist Sans #A1A1AA mt-16` | New palette |
| **Tagline Max-width** | `max-w-sm` | `max-w-[280px]` | Explicit |
| **Link Column Label** | `text-caption text-ink-faint` | `12px 600 Geist Sans #8B5CF6 uppercase tracking-[0.05em] mb-12` | Accent color, uppercase |
| **Link Font** | `text-ink-muted` (#999999) | `14px 400 Geist Sans #A1A1AA` | New palette |
| **Link Hover** | Implicit (color change) | `#FAFAFA` text-primary on hover, transition 150ms | Explicit |
| **Link Gap** | Implicit | `gap-8` between items | Explicit |
| **Divider** | `my-10 h-px bg-hairline-soft` | `my-24 h-1px bg-[#262626]` | More subtle, positioned |
| **Divider Color** | `#1a1a1a` (hairline-soft) | `#262626` (border standard) | Consistent |
| **Divider Spacing** | `my-10` (40px) | `my-24` (96px) | More breathing |
| **Disclaimer Font** | `text-caption text-ink-faint` | `12px 400 Geist Sans #A1A1AA` | Standardize |
| **Disclaimer Max-width** | `max-w-2xl` | `max-w-[600px]` | Explicit |
| **Copyright Font** | `text-caption text-ink-faint` | `12px 400 Geist Sans #A1A1AA` | Standardize |
| **Footer Layout** | Flex col gap-8 md:flex-row | Same | Keep |
| **Bottom Section** | Flex col gap-4 md:flex-row md:items-center | flex flex-col md:flex-row md:justify-between md:items-center | Align properly |

### Component Mapping
- **Footer:** Semantic `<footer>` tag
- **Navigation:** Div containers (no shadcn needed)
- **Links:** Anchor tags with Tailwind
- **Divider:** Div (h-1px bg-color)

### Exact Specification

```
Footer:
- Container: mx-auto w-full max-w-[1280px]
- Padding: 56px 40px
- Border-top: 1px solid #262626

Left Section (Brand):
- Logo: 30px × 30px image
- Brand name: 16px 600 Geist Sans #FAFAFA
- Tagline: 14px 400 Geist Sans #A1A1AA, max-width 280px, mt-16

Right Section (Links):
- Flex: flex-col gap-32 (two columns)
- Each column: flex flex-col gap-8

Link Column Header:
- Font: 12px 600 Geist Sans
- Color: #8B5CF6
- Uppercase
- Letter-spacing: 0.05em
- Margin-bottom: 12px

Links:
- Font: 14px 400 Geist Sans
- Color: #A1A1AA
- Hover: #FAFAFA, transition all 150ms ease
- Line-height: 1.8 (gap equivalent)

Divider:
- Height: 1px
- Color: #262626
- Margin: 24px 0

Bottom Row:
- Flex: flex-col md:flex-row md:justify-between md:items-center
- Gap: 16px (vertical)

Disclaimer:
- Font: 12px 400 Geist Sans
- Color: #A1A1AA
- Max-width: 600px

Copyright:
- Font: 12px 400 Geist Sans
- Color: #A1A1AA
- Right-aligned on desktop
```

---

## SUMMARY TABLE: ALL SECTIONS

| Section | Outdated Elements | Amateur Elements | Premium Elements | Key Changes |
|---------|---|---|---|---|
| **Header** | Backdrop blur, light border | Mixed weights, no hover polish | Sticky positioning | Solid bg, darker border, accent focus |
| **Hero** | Radial gradients | Inconsistent spacing | Clear hierarchy | Remove gradients, fixed typography, generous spacing |
| **Downloader** | Pill buttons, large radius | Arbitrary padding values | Paste feature, results design | Use shadcn buttons (6px radius), refine colors |
| **How it Works** | Rounded corners (20px) | No hover states | Card structure | 8px radius, accent hover, purple icons |
| **Showcase** | Heavy gradients, inset shadows | Too colorful | Grid layout | Solid bg, consistent accent color, minimal shadows |
| **Features** | Gap-px separator technique | Arbitrary icon sizes | Checkmark icon | Individual cards, 8px radius, accent icons |
| **FAQ** | Native details element | Plus icon (rotates to X) | Accordion concept | Replace with shadcn Accordion, ChevronDown icon |
| **Footer** | Divider styling | Generic spacing | Link organization | Accent column headers, consistent typography |

---

## CRITICAL IMPLEMENTATION PRIORITY

**High Impact (Do First):**
1. Replace all colors globally (old palette → new palette)
2. Remove all gradients from page.tsx
3. Update border-radius values (20px → 8px, 30px → 8px, 12px → keep)
4. Replace button components with shadcn/ui
5. Update FAQ to shadcn Accordion
6. Adjust spacing/padding values

**Medium Impact:**
7. Update typography sizes (fixed vs clamp)
8. Add hover states to cards
9. Refine input/focus styling
10. Update icon colors

**Low Impact (Polish):**
11. Fine-tune spacing ratios
12. Verify transitions are 150ms
13. Test responsive breakpoints
14. Accessibility review

---

*Audit Complete — Ready for Implementation*
