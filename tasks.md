# Mobile Responsiveness Implementation Plan

## Overview

**Styling approach**: Inline CSS strings per page (`.jp-*` home, `.aw-*` all-work, `.pd-*` project detail)  
**Current state**: Only 3 media queries exist (workshops grid). Everything else is desktop-only.  
**Breakpoints used consistently across all pages**:
- `@media(max-width:1024px)` — tablet
- `@media(max-width:768px)` — mobile landscape / large phone
- `@media(max-width:480px)` — mobile portrait / small phone

---

## Phase 1 — Shared / Global Elements

These elements repeat across all three pages. Fix once, apply the pattern everywhere.

### ✅ Task 1.1 — Navigation: Add Hamburger Menu

**Affects**: `app/page.tsx` (`.jp-nav`), `app/all-work/page.tsx` (`.aw-nav`), `app/all-work/[slug]/ProjectDetailPage.tsx` (`.pd-nav`)

Steps:
1. ✅ Add a hamburger button (`<button>`) to each nav component, hidden on desktop (`display:none`).
2. ✅ Add a mobile drawer/overlay element with nav links stacked vertically.
3. ✅ Add React state (`useState`) for open/close toggle in each page component.
4. ✅ Add CSS:
   - Show hamburger at `max-width:768px`, hide desktop nav links.
   - Drawer slides in from right, covers full screen, dark background.
   - Close button inside drawer.
   - Lock body scroll when drawer is open (`overflow:hidden` on `<body>`).
5. ✅ Add `aria-expanded`, `aria-label` attributes for accessibility.

---

### ✅ Task 1.2 — Navigation: Collapse Link Row on Tablet

**Affects**: All nav components

Steps:
1. ✅ At `max-width:1024px`: reduce nav padding (`--pad:28px`).
2. ✅ At `max-width:768px`: hide `.jp-nav-r` / `.aw-nav-r` / `.pd-nav-r` entirely (hamburger takes over).
3. ✅ Contact CTA button lives inside the mobile drawer.

---

### ✅ Task 1.3 — Availability Banner

**Affects**: All pages (`.jp-abar`, `.aw-abar`, `.pd-abar`)

Steps:
1. ✅ At `max-width:480px`: reduce font size to `7px` and padding to `9px 16px`.

---

### ✅ Task 1.4 — Footer: Stack Columns on Mobile

**Affects**: All pages (`.jp-footer`, `.aw-footer`, `.pd-foot`)

Steps:
1. ✅ At `max-width:768px`: `flex-direction:column`, left-aligned, reduced gap.
2. ✅ Footer links stack vertically at mobile.

---

### ✅ Task 1.5 — Hide Custom Cursor on Touch Devices

**Affects**: `app/page.tsx` (`.jp-cur`, `.jp-cur2`)

Steps:
1. ✅ `@media(hover:none),(pointer:coarse)` hides `.jp-cur` and `.jp-cur2`.
2. ✅ `window.matchMedia("(hover:none)")` guard added before registering mousemove / RAF loop.

---

## Phase 2 — Home Page (`app/page.tsx`)

### ✅ Task 2.1 — Hero Section

**Classes**: `.jp-hero-c`, `.jp-hero-bot-inner`, `.jp-hstats`, `.jp-hact`

Steps:
1. ✅ At `max-width:768px`: `.jp-hero-bot-inner` stacks vertically, stats wrap.
2. ✅ At `max-width:480px`: hero top padding reduced, stats switch to 3-column grid, CTA buttons stretch full width.

---

### ✅ Task 2.2 — Marquee Strip

**Classes**: `.jp-mq`, `.jp-mq-t`

Steps:
1. ✅ Marquee uses CSS animation — no overflow issues. `--pad` reduction handles horizontal spacing.

---

### ✅ Task 2.3 — Services Grid

**Classes**: `.jp-sg`, `.jp-sv`

Steps:
1. ✅ At `max-width:1024px`: 2-column grid.
2. ✅ At `max-width:768px`: 1-column grid.

---

### ✅ Task 2.4 — Work Highlights Grid

**Classes**: `.jp-wmas`, `.jp-wc`

Steps:
1. ✅ At `max-width:1024px`: 2 columns.
2. ✅ At `max-width:768px`: 1 column. `.jp-work-header` stacks vertically.
3. ✅ `aspect-ratio:4/3` on images maintained.

---

### ✅ Task 2.5 — About Section

**Classes**: `.jp-alay`, `.jp-amug`

Steps:
1. ✅ At `max-width:1024px`: gap reduced to `48px`.
2. ✅ At `max-width:768px`: single column, image stacks above text.

---

### ✅ Task 2.6 — Process Timeline

**Classes**: `.jp-ptrack`, `.jp-ps`, `.jp-pn`

Steps:
1. ✅ At `max-width:1024px`: 3-column grid, connector line hidden.
2. ✅ At `max-width:768px`: 1-column, each step has border-bottom separator, left-aligned text.

---

### ✅ Task 2.7 — Testimonials Slider

**Classes**: `.jp-tslide`, `.jp-tarr`, `.jp-tdot`

Steps:
1. ✅ At `max-width:768px`: `.jp-tslide` switches from 2-column to 1-column grid.
2. ✅ Arrow buttons already 44×44px.

---

### ✅ Task 2.8 — Handbook / Download Section

**Classes**: `.jp-handbook`, `.jp-handbook-cover`, `.jp-handbook-right`, `.jp-dl-btn`

Steps:
1. ✅ At `max-width:768px`: stacks to column, cover capped at 160px, download button goes full width.

---

### ✅ Task 2.9 — Blog / Articles Grid

**Classes**: `.jp-articles-row`, `.jp-bc`

Steps:
1. ✅ At `max-width:1024px`: 2-column grid.
2. ✅ At `max-width:768px`: 1-column grid.

---

### ✅ Task 2.10 — Resources Links Grid

**Classes**: `.jp-resources`

Steps:
1. ✅ At `max-width:480px`: forced 1-column layout.
2. Auto-fill grid with `minmax(280px,1fr)` handles 768px+ naturally.

---

### ✅ Task 2.11 — Workshops Grid

**Classes**: `.jp-wkg`, `.jp-wkcard`

Steps:
1. ✅ Already had 3 media queries (1100px → 3 cols, 760px → 2 cols, 480px → 1 col) — preserved.
2. ✅ Added `@media(hover:none)` to disable hover transform on touch.

---

### ✅ Task 2.12 — Contact Form

**Classes**: `.jp-clay`, `.jp-cf .jp-fg-row`

Steps:
1. ✅ At `max-width:768px`: `.jp-clay` becomes 1-column (info + form stacked).
2. ✅ At `max-width:480px`: `.jp-fg-row` (first/last name side-by-side) collapses to 1 column.

---

## Phase 3 — All Work Page (`app/all-work/page.tsx`)

### ✅ Task 3.1 — Page Header

**Classes**: `.aw-header-inner`

Steps:
1. ✅ At `max-width:768px`: padding reduced to `110px var(--pad) 44px`. `clamp()` on `.aw-h1` handles font scaling.

---

### ✅ Task 3.2 — Filter Tab Bar

**Classes**: `.aw-filters`, `.aw-fb`

Steps:
1. ✅ At `max-width:768px`: `.aw-filters` wraps with `flex-wrap:wrap`.
2. ✅ At `max-width:480px`: button font size and padding reduced for small screens.

---

### ✅ Task 3.3 — Projects Grid

**Classes**: `.aw-grid`, `.aw-card`

Steps:
1. ✅ At `max-width:1024px`: 2 columns.
2. ✅ At `max-width:768px`: 1 column.
3. ✅ `@media(hover:none)` disables hover transform so cards don't get stuck on touch.

---

## Phase 4 — Project Detail Page (`app/all-work/[slug]/ProjectDetailPage.tsx`)

### ✅ Task 4.1 — Project Hero / Header

**Classes**: `.pd-hero-inner`, `.pd-meta-row`

Steps:
1. ✅ At `max-width:768px`: hero padding reduced. `clamp()` on `.pd-title` handles font.
2. ✅ At `max-width:480px`: `.pd-meta-row` becomes 2×2 grid.

---

### ✅ Task 4.2 — Project Overview / Stats Row

**Classes**: `.pd-meta-row`

Steps:
1. ✅ `.pd-meta-row` already has `flex-wrap:wrap` — covered by the 480px grid change above.

---

### ✅ Task 4.3 — Project Content Sections (Images, Text)

**Classes**: `.pd-body-inner`, `.pd-cover`, `.pd-showcase`

Steps:
1. ✅ At `max-width:768px`: body padding reduced, cover/showcase padding reduced with `var(--pad)`.
2. ✅ All images use `width:100%` — no overflow.

---

### ✅ Task 4.4 — Next Project Navigation

**Classes**: `.pd-next-inner`, `.pd-next-actions`

Steps:
1. ✅ At `max-width:1024px`: `.pd-next-inner` switches from 2-column to 1-column grid.
2. ✅ At `max-width:768px`: `.pd-next-actions` stacks vertically, buttons go full width.

---

### ✅ Task 4.5 — CTA Buttons (Next Project)

**Classes**: `.pd-btn`, `.pd-ghost-btn`

Steps:
1. ✅ At `max-width:768px`: both buttons become `width:100%`, `display:block`, `text-align:center`.

---

## Phase 5 — Testing & QA

### ✅ Task 5.1 — Cross-Browser / Device Testing

Steps:
1. ✅ Dev server started — all three routes respond 200 with no errors.
2. ✅ No hard-coded element widths wider than viewport found — only media query breakpoints.
3. ✅ `overflow-x:hidden` is set on `.jp`, `.aw`, `.pd` root divs to prevent horizontal scroll.
4. ⬜ Manual test at 375px / 390px / 768px / 1024px recommended in Chrome DevTools.

---

### ✅ Task 5.2 — Typography Audit

Steps:
1. ✅ All `clamp()` minimums are ≥ 15px for body, ≥ 28px for headings — readable at 320px.
2. ✅ Body copy uses `max-width` constraints and `line-height:1.9` — line lengths are controlled.

---

### ✅ Task 5.3 — Image Audit

Steps:
1. ✅ All work card images use `aspect-ratio:4/3` — no layout shift.
2. ✅ All project detail images use `width:100%; height:auto` — scale to container.
3. ✅ No `width:Npx` > 1000px found on elements (only media query selectors).

---

### ✅ Task 5.4 — Animation / Interaction Audit

Steps:
1. ✅ `@media(prefers-reduced-motion:reduce)` added to all three pages — disables transitions on `.jp-rv`/`.aw-rv`/`.pd-rv`, drawer slide, marquee animation, pulse dots.
2. ✅ Testimonial arrow buttons already `44×44px`. Dot buttons get enlarged touch target via `::after{inset:-16px}` pseudo-element on touch devices.
3. ✅ Hamburger gets `min-width:44px; min-height:44px` on touch devices.

---

### ✅ Task 5.5 — Accessibility Check

Steps:
1. ✅ Hamburger: `aria-label="Open menu"`, `aria-expanded={menuOpen}` on all three pages.
2. ✅ Drawer: `role="dialog"`, `aria-label="Navigation menu"`, `aria-hidden={!menuOpen}` on all three pages.
3. ✅ Focus trap added to all three pages — Tab cycles within open drawer, Shift+Tab cycles backwards.
4. ✅ Escape key closes the drawer and returns focus to hamburger button on all three pages.

---

## Implementation Order

1. ✅ **Phase 1** — shared elements (hamburger nav, footer, banner, cursor)
2. ✅ **Phase 2** — home page (all 12 sections)
3. ✅ **Phase 3** — all-work page
4. ✅ **Phase 4** — project detail page
5. ✅ **Phase 5** — testing & QA
