# RipTweet UI Redesign — Implementation Roadmap

**Status:** Approved  
**Constraint:** Zero functional, content, or API changes  
**Foundation:** Approved visual spec + UI audit

---

## PHASE 1: SETUP & CONFIGURATION (Dependencies)

### 1.1 Install shadcn/ui Components

**Files affected:** `package.json`, new: `components/ui/*`

**Components to install:**
```
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add form (optional, for validation)
npx shadcn-ui@latest add badge (optional, future use)
```

**New files created by shadcn:**
- `components/ui/button.tsx`
- `components/ui/input.tsx`
- `components/ui/accordion.tsx`
- `lib/utils.ts` (utility functions, may update)

**Why:** shadcn provides unstyled, accessible components that we'll theme to match the design spec.

**Verification:**
- Check that components exist in `components/ui/`
- Verify imports work from `@/components/ui/button`, etc.
- Run `npm run build` (or `bun run build`) — no errors

---

### 1.2 Add Geist Fonts

**Files to modify:**
- `app/layout.tsx` (already imports Google fonts)

**Changes:**
- Verify Geist Sans import: `const geist = Geist({ ... })`
- Verify Geist Mono import: `const geistMono = Geist_Mono({ ... })`
- Remove Inter import (currently used as fallback)
- Ensure `--font-geist` and `--font-geist-mono` CSS variables are set

**Current state:**
```typescript
import { Geist, Geist_Mono, Inter } from "next/font/google";
```

**Target state:**
```typescript
import { Geist, Geist_Mono } from "next/font/google";
// Keep only Geist fonts
```

**Verification:**
- Fonts render correctly
- No font loading warnings in browser console
- Test on multiple browsers

---

### 1.3 Configure Tailwind Theme

**Files to modify:**
- `tailwind.config.ts` (create if doesn't exist, or update `next.config.ts`)
- `app/globals.css` (update theme tokens)

**Current approach:**
- Uses `@theme` directive in globals.css with CSS variables

**Changes needed:**
```
1. Update existing color tokens in @theme block
2. Add new spacing tokens (explicit 4px base unit)
3. Add font-family tokens (Geist Sans, Geist Mono)
4. Add border-radius tokens
5. Add box-shadow tokens
```

**Token updates:**

**Old colors → New colors:**
```
--color-canvas: #090909 → #0A0A0A
--color-surface-1: #141414 → #111111
--color-surface-2: #1c1c1c → #1a1a1a
--color-hairline: #262626 → #262626 (no change, reuse as border)
--color-ink: #ffffff → #FAFAFA
--color-ink-muted: #999999 → #A1A1AA
--color-ink-faint: #6b6b6b → #8B5CF6 (accent color)
--color-accent: #0099ff → #8B5CF6 (purple)
--color-success: #22c55e → #10B981
--color-coral: #ff5577 → #EF4444

Remove gradients:
--color-grad-violet: (remove)
--color-grad-violet-deep: (remove)
--color-grad-magenta: (remove)
--color-grad-magenta-deep: (remove)
--color-grad-orange: (remove)
--color-grad-orange-deep: (remove)

Add new tokens:
--color-surface-3: #1a1a1a
--color-focus-ring: rgba(139, 92, 246, 0.3)
--color-surface-hover: #1a1a1a
```

**New spacing tokens** (add to @theme):
```
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 12px
--spacing-lg: 16px
--spacing-xl: 24px
--spacing-2xl: 32px
--spacing-3xl: 40px
--spacing-4xl: 48px
--spacing-5xl: 64px
```

**New border-radius tokens:**
```
--radius-xs: 4px
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
--radius-full: 9999px
```

**New shadow tokens** (add to Tailwind theme or use Tailwind shadows):
```
Shadow system:
- none (default)
- 0 1px 2px rgba(0, 0, 0, 0.3) (hover)
- 0 2px 4px rgba(0, 0, 0, 0.4) (active)
- 0 4px 12px rgba(0, 0, 0, 0.5) (focus)
- focus ring: 0 0 0 3px rgba(139, 92, 246, 0.1)
```

**Font tokens** (update existing):
```
--font-sans: Geist, system-ui, sans-serif
--font-display: Geist, system-ui, sans-serif (same as sans)
--font-mono: Geist Mono, monospace
```

**Verification:**
- Run `npm run build`
- Check that Tailwind recognizes new tokens
- Test color values in browser DevTools

---

## PHASE 2: DESIGN TOKENS & TYPOGRAPHY (Foundation)

### 2.1 Update globals.css

**File to modify:**
- `app/globals.css`

**Current state:**
- Uses @import "tailwindcss"
- Defines @theme block with color tokens
- No explicit spacing/radius/shadow tokens

**Changes:**
```
1. Update all color tokens (as listed above)
2. Remove gradient definitions
3. Add explicit spacing variables (4px base)
4. Add border-radius variables
5. Update font-family variables (Geist only)
6. Add CSS custom properties for shadows
```

**New CSS structure:**
```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-bg: #0A0A0A;
  --color-surface: #111111;
  --color-surface-secondary: #1a1a1a;
  --color-border: #262626;
  --color-text: #FAFAFA;
  --color-text-secondary: #A1A1AA;
  --color-accent: #8B5CF6;
  /* ... all colors as per spec ... */

  /* Typography */
  --font-sans: Geist, system-ui, sans-serif;
  --font-mono: Geist Mono, monospace;

  /* Spacing */
  --spacing-xs: 4px;
  /* ... all spacing tokens ... */

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  /* ... all radius tokens ... */
}

/* Shadow utilities (CSS variables) */
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.4);
  --shadow-focus-ring: 0 0 0 3px rgba(139, 92, 246, 0.1);
}
```

**Verification:**
- Build succeeds
- Colors render correctly
- No console errors

---

### 2.2 Update lib/ui.ts (Typography Scale)

**File to modify:**
- `lib/ui.ts`

**Current approach:**
- Exports `t` object with Tailwind class strings
- Uses `font-display` (Geist/Inter), `clamp()` for responsive sizing

**Changes:**
```
1. Remove gradient definitions (grad object)
2. Update all typography to use fixed sizes (no clamp)
3. Update all color references to new palette
4. Remove custom border-radius values (use standard 6px/8px)
5. Keep structure (object exports) for backward compatibility
```

**Old typography scale → New:**
```
// Old (example)
displayXl: "font-display font-semibold text-[clamp(2.25rem,6vw,5rem)] ..."

// New (example)
displayXl: "font-sans font-bold text-56px leading-[1.1] tracking-[-0.02em] text-[#FAFAFA]"
```

**Replacement strategy for each type:**
- `displayXxl`: Remove (not used much)
- `displayXl`: 56px 700 Geist Sans, #FAFAFA
- `displayLg`: 36px 700 Geist Sans, #FAFAFA
- `displayMd`: 28px 700 Geist Sans, #FAFAFA
- `headline`: 20px 600 Geist Sans, #FAFAFA
- `subhead`: 16px 400 Geist Sans, #A1A1AA
- `bodyLg`: 15px 400 Geist Sans, #A1A1AA
- `body`: 14px 400 Geist Sans, #A1A1AA
- `caption`: 13px 400 Geist Sans, #A1A1AA
- `eyebrow`: 12px 600 uppercase tracking-[0.1em] #8B5CF6

**UI object changes:**
```
Old ui.btn:     rounded-full, ring-accent/70
New ui.btn:     rounded-[6px], ring-[#8B5CF6]/30

Old ui.card:    rounded-[20px]
New ui.card:    rounded-[8px]

Old ui.field:   rounded-[12px]
New ui.field:   rounded-[6px]

Old ui.btnPrimary:   bg-ink text-black
New ui.btnPrimary:   remove (use shadcn Button)

Old ui.btnSecondary: border-hairline bg-surface-1
New ui.btnSecondary: remove (use shadcn Button)

Old grad object: remove entirely
```

**Structure to keep:**
- Keep `t` object for backward compatibility
- Keep `ui.shell`, `ui.card` for general usage
- Remove `grad` (gradient) object entirely

**Verification:**
- Classes render correctly
- Typography looks consistent
- No visual regressions

---

## PHASE 3: COMPONENT REPLACEMENTS

### 3.1 Replace All Buttons with shadcn/ui Button

**Files to modify:**
- `app/page.tsx` (buttons in Header, Hero, Final CTA)
- `utils/downloader.tsx` (form buttons, download buttons)
- Any other button instances

**Current button implementation:**
```
className={`${ui.btn} ${ui.btnPrimary} px-7 py-3.5 text-base`}
className={`${ui.btn} ${ui.btnSecondary} px-4 py-2 text-[13px]`}
```

**Target implementation:**
```
<Button variant="default" size="default">...</Button>
<Button variant="outline" size="sm">...</Button>
```

**Button instances to replace:**

| Location | Current | Type | New shadcn Variant |
|----------|---------|------|-------------------|
| Header CTA | `ui.btn + ui.btnPrimary` | Primary | `variant="default" size="sm"` |
| Hero CTA (downloader submit) | `ui.btn + ui.btnPrimary` | Primary | `variant="default" size="default"` |
| Downloader paste | `ui.btn + ui.btnSecondary` | Secondary | `variant="outline" size="sm"` |
| Download buttons (primary) | `ui.btn + ui.btnPrimary` | Primary | `variant="default" size="sm"` |
| Download buttons (secondary) | `ui.btn + ui.btnSecondary` | Secondary | `variant="outline" size="sm"` |
| Final CTA | `ui.btn + ui.btnPrimary` | Primary | `variant="default" size="default"` |

**Implementation steps:**
```
1. Import Button from components/ui/button
2. Replace all button elements one section at a time
3. Remove className combinations (no more ui.btn + ui.btnPrimary)
4. Use variant and size props instead
5. Keep icon arrangement (icon before/after text)
```

**Files in order:**
1. `app/page.tsx` - Header (1 button)
2. `app/page.tsx` - Final CTA (1 button)
3. `utils/downloader.tsx` - Form buttons (2 buttons)
4. `utils/downloader.tsx` - Download buttons (in loop)

**Verification:**
- All buttons render correctly
- Hover/focus states work
- Colors are purple (#8B5CF6)
- Sizes match spec (32px small, 40px default)
- Icons are positioned correctly

---

### 3.2 Replace Inputs with shadcn/ui Input

**Files to modify:**
- `utils/downloader.tsx` (main input field in form)

**Current implementation:**
```
<input 
  className="w-full bg-transparent py-2.5 text-base ..."
/>
```

**Target implementation:**
```
<Input 
  type="url"
  placeholder="..."
  className="custom-dark-theme-styling"
/>
```

**Implementation notes:**
- shadcn Input is a styled native input element
- Theme it with dark background (#1a1a1a), border (#262626), accent focus
- Keep existing props: `ref`, `value`, `onChange`, `aria-label`, etc.
- Add custom CSS class for dark theme styling if shadcn default doesn't match

**Changes:**
```
1. Import Input from components/ui/input
2. Wrap existing input with Input component
3. Pass className for dark theme override (if needed)
4. Keep all functional props (onChange, value, ref, etc.)
5. Update placeholder text to new palette color
```

**Focus ring styling:**
- Standard shadcn has focus ring
- Override if needed to match spec (blue ring, 3px, 30% opacity)

**Verification:**
- Input renders
- Typing works
- Focus state shows accent color ring
- Placeholder color is correct (#A1A1AA)
- Background is dark (#1a1a1a)
- Border is thin (#262626)

---

### 3.3 Replace FAQ with shadcn/ui Accordion

**File to modify:**
- `app/page.tsx` (FAQ section, lines ~94-113)

**Current implementation:**
```jsx
{FAQ.map((item, i) => (
  <details key={i} className="group border-b border-hairline-soft py-5">
    <summary className="flex cursor-pointer list-none ...">
      <span>{item.q}</span>
      <span className="... group-open:rotate-45"><PlusIcon /></span>
    </summary>
    <p className="...">{item.a}</p>
  </details>
))}
```

**Target implementation:**
```jsx
<Accordion type="single" collapsible defaultValue={`item-0`}>
  {FAQ.map((item, i) => (
    <AccordionItem key={i} value={`item-${i}`}>
      <AccordionTrigger>{item.q}</AccordionTrigger>
      <AccordionContent>{item.a}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

**Implementation steps:**
```
1. Import Accordion, AccordionItem, AccordionTrigger, AccordionContent from @/components/ui/accordion
2. Replace details element with Accordion
3. Replace summary with AccordionTrigger
4. Replace p with AccordionContent
5. Remove custom Plus icon (Accordion has ChevronDown)
6. Update styling (remove border-b, update padding)
7. Test default open state (first item)
```

**Styling changes:**
```
Remove:
- plus icon rotation logic
- custom icon container styling
- details/summary specific classes

Add:
- accordion border/padding styling
- accordion item separator lines
- accordion trigger hover state
- accordion content animation
```

**Icon replacement:**
- Old: Plus icon that rotates 45° (becomes X when open)
- New: ChevronDown icon that rotates 180° (standard accordion)
- Icon color: #8B5CF6 (accent)
- Icon transition: 150ms ease

**Verification:**
- Accordion renders
- First item opens by default
- Click to expand/collapse works
- Chevron rotates smoothly
- Borders and spacing are correct
- Text is readable
- Focus states work

---

## PHASE 4: SECTION UPDATES

### 4.1 Header Section

**File to modify:**
- `app/page.tsx` (Nav function, lines ~135-159)

**Changes:**
1. Remove `backdrop-blur-xl` from header background
2. Update border color: `border-hairline-soft` → `border-[#262626]`
3. Update background: `bg-canvas/80` → `bg-[#0A0A0A]`
4. Adjust nav link colors: `text-ink-muted` → `text-[#A1A1AA]`, hover `text-[#FAFAFA]`
5. Update logo/name styling (use new typography scale)
6. Replace button with shadcn Button (already done in 3.1)

**Line-by-line:**
```
Line 137: Remove backdrop-blur-xl, update border color
Line 141: Update logo styling (if any class changes)
Line 145: Update nav link colors and transition
Line 153: Button already replaced in 3.1
```

**No structure changes:**
- Keep header sticky
- Keep flex layout
- Keep nav links hidden on mobile

**Verification:**
- Header looks clean (no blur)
- Border is visible (#262626)
- Nav links are readable (#A1A1AA)
- Hover effect works
- Button styling is correct

---

### 4.2 Hero Section

**File to modify:**
- `app/page.tsx` (first section, lines ~20-41)

**Changes:**
1. Remove ambient gradient background (lines 12-15)
2. Update section padding: `pt-16 pb-20 sm:pt-24 sm:pb-28` → `py-64 sm:py-80`
3. Update eyebrow styling: color to `#8B5CF6`, reduce tracking
4. Update headline: font-size/weight (use `t.displayXl`), color to `#FAFAFA`
5. Update subheading: font-size/color (use `t.subhead`), color to `#A1A1AA`
6. Update spacing between elements: `mb-6` → `mb-16`, `mt-6` → `mt-20`, etc.
7. Update trust signal below downloader: smaller font, new color

**Gradient removal:**
```jsx
// Remove this:
<div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(...)]" />
```

**Spacing updates:**
- Eyebrow margin: `mb-6` → `mb-16`
- Headline margin: `mt-6` → `mt-16` (from eyebrow)
- Subheading margin: `mt-6` → `mt-20`
- Downloader margin: `mt-10` → `mt-48`
- Trust signal margin: `mt-8` → `mt-24`

**Typography updates:**
- Eyebrow: color `#8B5CF6`, tracking reduce
- Headline: `#FAFAFA`, bold weight
- Subheading: `#A1A1AA`, regular weight

**No content changes:**
- Keep hero text
- Keep call-to-action message
- Keep downloader component

**Verification:**
- No gradients visible
- Spacing feels generous
- Text colors match palette
- Typography is consistent
- Downloader is well-spaced below headline

---

### 4.3 Downloader Component

**File to modify:**
- `utils/downloader.tsx`

**Changes:**
1. Form container: update border-radius (12px → 8px), background (#111111), border (#262626)
2. Input field: replace with shadcn Input (already done in 3.2)
3. Buttons: replace with shadcn (already done in 3.1)
4. Results card: update border-radius (20px → 12px), background, border, padding
5. Error card: update styling to match new palette
6. Loading state: keep existing spinner (no change needed)
7. Media block: update border-radius, border color, styling

**Detailed changes:**

**Form container (line 75):**
- `rounded-[12px]` → `rounded-[8px]`
- `bg-surface-1` → `bg-[#111111]`
- `border-hairline` → `border-[#262626]`
- `p-6` → keep (24px is equivalent)

**Input styling (line 88):**
- Already handled by shadcn Input replacement
- Placeholder color: new palette

**Results card (line 141):**
- `rounded-[20px]` → `rounded-[12px]`
- `border-hairline` → `border-[#262626]`
- `bg-surface-1` → `bg-[#111111]`

**Header row (line 142):**
- `border-hairline` → `border-[#262626]`
- `p-4` → keep

**Avatar (line 148):**
- Size: `h-11 w-11` → `h-10 w-10` (40px)

**Media block container (line 190):**
- `rounded-[15px]` → `rounded-[12px]`
- `border-hairline` → `border-[#262626]`
- `bg-canvas` → `bg-[#111111]`

**Error card (line 256):**
- Remove coral styling
- Add new error styling: `border-[#EF4444]`, transparent background
- Update text colors

**Verification:**
- Downloader looks polished
- Input/buttons work correctly
- Results card displays well
- Error states show correctly
- All colors match new palette

---

### 4.4 How It Works Section

**File to modify:**
- `app/page.tsx` (Section component call + card styling, lines ~44-59)

**Changes:**
1. Section border-top: add `1px solid #262626`
2. Section padding: standardize to `py-64 px-40`
3. Card border-radius: `rounded-[20px]` → `rounded-[8px]`
4. Card background: `bg-surface-1` → `bg-[#111111]`
5. Card border: `border-hairline` → `border-[#262626]`
6. Card padding: `p-6` → `p-24` (24px)
7. Card gap: `gap-5` → `gap-16` (16px)
8. Add card hover state: border color change, shadow
9. Icon color: `#0099ff` → `#8B5CF6`
10. Step number color: `text-ink-faint` (#6b6b6b) → `#A1A1AA` with 60% opacity
11. Card title: update to new typography
12. Card body: update to new typography

**Card styling updates (line 47):**
```jsx
// Old:
className={`${ui.card} flex flex-col gap-5 p-6`}

// New:
className={`rounded-[8px] border border-[#262626] bg-[#111111] flex flex-col gap-16 p-24 transition-all duration-150 hover:border-[#8B5CF6] hover:shadow-sm`}
```

**Step number styling (line 50):**
```jsx
// Old:
className={`${t.displayMd} tabular-nums text-ink-faint`}

// New:
className={`text-28 font-bold tabular-nums text-[#A1A1AA] opacity-60`}
```

**Icon color:**
Update StepArt component call to use new accent color (#8B5CF6)

**Verification:**
- Cards have visible borders
- Hover effect works
- Icons are purple
- Spacing is generous
- Typography is consistent

---

### 4.5 Media Showcase Section

**File to modify:**
- `app/page.tsx` (Section component call + card styling, lines ~62-77)

**Changes:**
1. Remove gradient backgrounds from cards
2. Update card border: `border-white/10` → `1px solid #262626`
3. Update border-radius: `rounded-[30px]` → `rounded-[8px]`
4. Update background: `#111111` (solid, no gradient)
5. Update shadow: remove complex inset shadow
6. Update min-height: `min-h-[260px]` → `min-h-[180px]`
7. Update card padding: `p-7` → `p-28` (28px)
8. Add hover shadow: `0 1px 2px rgba(0,0,0,0.3)`
9. Icon color: all `#8B5CF6` (consistent)
10. Text color: `text-white` → `#FAFAFA`, secondary → `#A1A1AA`

**Card styling (line 67):**
```jsx
// Old:
className={`${ui.spotlight} ${grad[c.tone]} flex min-h-[260px] flex-col justify-between p-7`}

// New:
className={`rounded-[8px] border border-[#262626] bg-[#111111] flex min-h-[180px] flex-col justify-between p-28 transition-all duration-150 hover:shadow-sm`}
```

**Icon styling:**
- All icons: `#8B5CF6` (not per-card colors)
- Size: 28px

**Text styling:**
- Type name: `24px 700 #FAFAFA`
- Description: `14px 400 #A1A1AA`

**Verification:**
- Gradients are removed
- Cards are solid with thin borders
- All icons are purple
- Text colors are consistent
- Hover effect works smoothly

---

### 4.6 Features Section

**File to modify:**
- `app/page.tsx` (Section component call + grid styling, lines ~80-92)

**Changes:**
1. Remove grid wrapper styling: `overflow-hidden rounded-[20px] border bg-hairline`
2. Update grid gap: `gap-px` (was creating separator lines) → `gap-16` (16px)
3. Update individual card background: `bg-surface-1` → `bg-[#111111]`
4. Add individual card borders: `border-[#262626]`
5. Add individual card border-radius: `rounded-[8px]`
6. Update card padding: `p-6` → `p-24` (24px)
7. Add card hover state: border accent, shadow
8. Icon container: size reduction (9px → 8px), update colors
9. Icon: color `#0099ff` → `#8B5CF6`
10. Typography updates for title/body

**Grid styling (line 81):**
```jsx
// Old:
className="grid gap-px overflow-hidden rounded-[20px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3"

// New:
className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3"
```

**Card styling (line 83):**
```jsx
// Old:
className="bg-surface-1 p-6"

// New:
className="rounded-[8px] border border-[#262626] bg-[#111111] p-24 transition-all duration-150 hover:border-[#8B5CF6] hover:shadow-sm"
```

**Icon container (line 84):**
```jsx
// Old:
className="mb-4 grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-accent"

// New:
className="mb-16 grid h-8 w-8 place-items-center rounded-full bg-[#1a1a1a] border border-[#262626] text-[#8B5CF6]"
```

**Title/Body styling:**
- Title: `16px 600 #FAFAFA`
- Body: `14px 400 #A1A1AA`

**Verification:**
- Cards have visible borders
- Icon containers are smaller and refined
- All icons are purple
- Hover effect works
- Grid gaps are consistent

---

### 4.7 FAQ Section

**File to modify:**
- `app/page.tsx` (already replaced with Accordion in 3.3)

**Additional styling updates:**
1. Section border-top: add `1px solid #262626`
2. Section padding: `py-64 px-40` (standardized)
3. Accordion styling: no background, border-bottom on items
4. Item borders: `1px solid #262626`
5. Item padding: `py-16 px-0` (16px vertical, no horizontal)
6. Trigger text: `16px 600 #FAFAFA`
7. Trigger hover: `bg-[rgba(139,92,246,0.05)]`
8. Icon color: `#8B5CF6`
9. Content padding: `py-16 px-0`
10. Content text: `14px 400 #A1A1AA`

**After Accordion replacement:**
- Apply dark theme styling to accordion
- Update colors and spacing per spec
- Ensure focus states work
- Verify hover effects

**Verification:**
- Accordion renders cleanly
- Items separate with thin borders
- Chevron icon rotates smoothly
- Focus states are visible
- Text colors match palette
- Spacing is consistent

---

### 4.8 Final CTA Section

**File to modify:**
- `app/page.tsx` (lines ~115-125)

**Changes:**
1. Section border-top: add `1px solid #262626`
2. Section padding: `py-24 sm:py-32` → `py-64 px-40` (standardized)
3. Headline: update to `36px 700 #FAFAFA`
4. Subheading: update to `16px 400 #A1A1AA`
5. Spacing: `mt-8` → `mt-32`
6. Button: already replaced with shadcn in 3.1

**Verification:**
- Section looks polished
- Text colors match palette
- Spacing is generous
- Button styling is correct

---

### 4.9 Footer Section

**File to modify:**
- `app/page.tsx` (Footer function, lines ~161-205)

**Changes:**
1. Container padding: `py-14` → `py-56`
2. Add border-top: `1px solid #262626`
3. Logo + name: update typography and spacing
4. Tagline: update color to `#A1A1AA`
5. Column headers (Product, Saves): update to `12px 600 #8B5CF6` uppercase
6. Links: update color to `#A1A1AA`, hover `#FAFAFA`
7. Link gap: standardize spacing
8. Divider: `my-10 h-px bg-hairline-soft` → `my-24 h-1px bg-[#262626]`
9. Disclaimer: update color to `#A1A1AA`
10. Copyright: update color to `#A1A1AA`

**Border-top addition (in Footer component):**
```jsx
<footer className="border-t border-[#262626]">
```

**Spacing updates:**
- Add `py-56` to footer container
- Update divider spacing: `my-24` (instead of `my-10`)

**Typography updates:**
- All text colors use new palette
- Column headers: accent color, uppercase

**Verification:**
- Footer looks refined
- Border is visible
- Colors are consistent
- Links work and show hover effects

---

## PHASE 5: GLOBAL CLEANUP

### 5.1 Remove Old Styling from lib/ui.ts

**File to modify:**
- `lib/ui.ts`

**Remove:**
```
grad object (all gradient definitions)
ui.btnPrimary (use shadcn instead)
ui.btnSecondary (use shadcn instead)
ui.spotlight (no longer used for showcase)
displayXxl (remove if not used)
```

**Keep:**
```
t object (typography scale, updated)
ui.shell (max-width container)
ui.card (updated with new styling)
ui.field (updated with new styling)
ui.btn (base button styles, though shadcn replaces usage)
ui.linkAccent (link styling)
```

**Verification:**
- No unused exports
- All references updated
- No console warnings about missing classes

---

### 5.2 Verify No Gradient Usage

**Search codebase:**
- Search for `bg-[linear-gradient`
- Search for `grad[`
- Search for `radial-gradient`

**Expected results:**
- No matches (all removed)

---

### 5.3 Update globals.css (Final Pass)

**File to modify:**
- `app/globals.css`

**Final check:**
1. All color tokens updated
2. No gradient definitions
3. Font tokens correct
4. Spacing tokens present
5. Border-radius tokens present

---

## PHASE 6: VERIFICATION & TESTING

### 6.1 Visual Regression Testing

**Checklist:**
```
[ ] Header: clean, no blur, proper spacing
[ ] Hero: no gradients, generous spacing, readable text
[ ] Downloader: polished form, clear states
[ ] How It Works: card styling, hover effects
[ ] Media Showcase: solid backgrounds, consistent colors
[ ] Features: clean grid, refined icons
[ ] FAQ: accordion smooth, proper spacing
[ ] Final CTA: centered, button works
[ ] Footer: refined, links work

[ ] All colors match palette (#0A0A0A, #111111, #A1A1AA, #8B5CF6)
[ ] All borders are 1px #262626 (or accent on hover)
[ ] All border-radius is 6px or 8px (not 12px, 20px, 30px)
[ ] All shadows are none or 0 1px 2px
[ ] All transitions are 150ms ease
[ ] All typography uses Geist Sans/Mono
```

---

### 6.2 Functionality Testing

**Checklist:**
```
[ ] All buttons work (submit, paste, download)
[ ] Form input accepts text
[ ] Paste button reads clipboard
[ ] Results card displays correctly
[ ] Error states show properly
[ ] Loading state shows spinner
[ ] All download buttons work
[ ] Links navigate correctly (nav, FAQ, footer)
[ ] Accordion expand/collapse works
[ ] Keyboard navigation works (Tab, Enter)
[ ] Focus states visible
```

---

### 6.3 Cross-Browser Testing

**Test on:**
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Android)

**Verify:**
- Fonts load correctly
- Colors render correctly
- Spacing is consistent
- Responsive design works

---

### 6.4 Accessibility Testing

**Checklist:**
```
[ ] Focus indicators visible on all interactive elements
[ ] Keyboard navigation works (Tab through all elements)
[ ] Color contrast meets WCAG AA (4.5:1 minimum)
[ ] Focus ring color is #8B5CF6
[ ] Accordion works with keyboard
[ ] Form inputs have labels
[ ] Error messages are clear
```

---

## FILE MODIFICATION SUMMARY

### Files to Modify

**1. Package & Config:**
- `package.json` (shadcn dependencies added automatically)

**2. Styling:**
- `app/globals.css` (color tokens, spacing, shadows)
- `lib/ui.ts` (typography scale, remove gradients)

**3. Layout & Components:**
- `app/layout.tsx` (verify fonts)
- `app/page.tsx` (all sections: header, hero, sections, footer)
- `utils/downloader.tsx` (form, input, buttons, results)

### Files to Create

**shadcn/ui components** (auto-generated):
- `components/ui/button.tsx`
- `components/ui/input.tsx`
- `components/ui/accordion.tsx`

### No Files to Delete

- Keep all existing functionality
- Keep all existing content
- Keep all existing APIs

---

## IMPLEMENTATION ORDER (Recommended)

**Day 1: Foundation (2-3 hours)**
1. ✅ Install shadcn/ui components
2. ✅ Verify Geist fonts
3. ✅ Update globals.css color tokens
4. ✅ Update lib/ui.ts typography and remove gradients
5. ✅ Test build, no errors

**Day 2: Component Replacement (2-3 hours)**
1. ✅ Replace buttons with shadcn Button (all instances)
2. ✅ Replace input with shadcn Input (downloader)
3. ✅ Replace FAQ with shadcn Accordion
4. ✅ Test functionality, all buttons/inputs work
5. ✅ Test build, no errors

**Day 3: Section Updates (3-4 hours)**
1. ✅ Header section styling
2. ✅ Hero section (remove gradients, update spacing)
3. ✅ Downloader component styling
4. ✅ How It Works cards
5. ✅ Media Showcase cards
6. ✅ Features grid
7. ✅ FAQ accordion styling
8. ✅ Final CTA section
9. ✅ Footer section
10. ✅ Test build, visual regression

**Day 4: Verification (1-2 hours)**
1. ✅ Visual regression testing (all sections)
2. ✅ Functionality testing (all interactions)
3. ✅ Cross-browser testing
4. ✅ Accessibility testing
5. ✅ Mobile responsive testing
6. ✅ Performance check (no slowdowns)

---

## ROLLBACK STRATEGY

If issues arise:

**Commit strategy:**
- Commit after each phase
- Easy to revert to last known good state

**Branches:**
```
git checkout -b feature/ui-redesign-visual
# Make changes, test
git commit -m "Phase 1: Setup and configuration"
git commit -m "Phase 2: Design tokens"
git commit -m "Phase 3: Component replacements"
# ... etc
```

**If major issues:**
- Revert last commit
- Debug specific issue
- Re-commit

---

## SUCCESS CRITERIA

✅ **All existing functionality preserved**
- All buttons work
- All forms work
- All APIs unchanged
- All business logic unchanged

✅ **Visual spec applied**
- Colors match new palette
- Borders consistent (1px #262626)
- Border-radius consistent (6px/8px)
- Shadows applied correctly
- Spacing standardized
- Typography updated

✅ **No regressions**
- No console errors
- No broken layouts
- No missing content
- No API errors

✅ **Responsive design works**
- Mobile: 1-column layouts
- Tablet: 2-column layouts
- Desktop: 3-column layouts (where applicable)

✅ **Accessibility maintained**
- Focus states visible
- Keyboard navigation works
- Color contrast meets standards
- Screen readers work

---

## ESTIMATED TIMELINE

| Phase | Tasks | Duration | Status |
|-------|-------|----------|--------|
| Phase 1 | Setup & Config | 2-3 hrs | Pending |
| Phase 2 | Design Tokens | 1-2 hrs | Pending |
| Phase 3 | Components | 2-3 hrs | Pending |
| Phase 4 | Sections | 3-4 hrs | Pending |
| Phase 5 | Cleanup | 1 hr | Pending |
| Phase 6 | Testing | 2-3 hrs | Pending |
| **TOTAL** | **All Phases** | **11-16 hours** | **Pending** |

**Recommendation:** Spread over 3-4 days with breaks, one phase per day.

---

*Implementation Roadmap Complete — Ready to Execute*
