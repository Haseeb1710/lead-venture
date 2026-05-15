---
project: Lead Venture
stack: Next.js 16.2.6 + React 19.2.4 + Tailwind v4
reviewed: 2026-05-14
depth: standard
files_reviewed: 22
files_reviewed_list:
  - app/layout.tsx
  - app/page.tsx
  - app/globals.css
  - components/layout/Navbar.tsx
  - components/layout/Footer.tsx
  - components/sections/Hero.tsx
  - components/sections/LaunchTracker.tsx
  - components/sections/IndustryHub.tsx
  - components/sections/AIDemoCard.tsx
  - components/sections/Services.tsx
  - components/sections/Calculator.tsx
  - components/sections/Pricing.tsx
  - components/sections/FAQ.tsx
  - components/sections/ContactForm.tsx
  - components/ui/accordion.tsx
  - components/ui/tabs.tsx
  - lib/actions.ts
  - lib/utils.ts
  - next.config.ts
  - tsconfig.json
  - package.json
  - jest.config.ts
findings:
  critical: 4
  high: 9
  medium: 11
  low: 7
  total: 31
status: issues_found
---

# Lead Venture — Code Review

> Scope note: several paths called out in the review request do not exist in this tree — `app/services/`, `app/pricing/`, `app/about/`, `app/faq/`, and `lib/use-theme.tsx`. The site is currently single-page (`app/page.tsx` renders every section as anchors). Findings below reflect the code that actually exists.
>
> Verification note: `lucide-react@^1.14.0` is **not** suspiciously old — `1.16.0` is the current npm `latest` (lucide-react went past the 0.x era). The named exports `ChevronDownIcon` / `ChevronUpIcon` used in `components/ui/accordion.tsx` exist as aliases in 1.14.0. The pin is fine, contrary to the brief.

---

## CRITICAL

### CR-01 — Server action is a no-op: leads are written to stdout only
**File:** `lib/actions.ts:16-18`
**BLOCKER.** `submitContact` validates the form then `console.log`s the lead and returns `{ success: true }`. In production (Vercel/Node server), this is invisible after the request ends and there is no email, CRM, database, queue, or notification. Every "Claim My 48-Hour Build Slot" submission is silently dropped. The success UI ("You're on the list! We'll reach out within 1 hour…") is a lie.
**Fix:** Pipe to a real destination — Resend/SendGrid email, a DB row (Vercel Postgres / Supabase), or at minimum a webhook (Slack, Zapier). Example:
```ts
await resend.emails.send({ from, to, subject, html })
// or
await db.insert(leads).values({ name, email, phone, businessType, message, createdAt: new Date() })
```
Until this is wired up, the lead form should not ship.

### CR-02 — No email-format validation, no length cap, no anti-spam, no rate limit
**File:** `lib/actions.ts:6-14`
**BLOCKER.** `email` is accepted as any non-empty string. `message` has no length cap. There is no honeypot, no Turnstile/reCAPTCHA, no IP rate limit. Once this endpoint is wired to real delivery (CR-01), it will be abused within hours: spam blasts, ReDoS via huge `message`, log poisoning, header injection downstream. Browser `type="email"` validation is bypassed by `noValidate` on the `<form>` (`components/sections/ContactForm.tsx:65`) and by direct server-action invocation.
**Fix:**
- Validate with a schema lib (zod):
  ```ts
  const Schema = z.object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    businessType: z.enum(["Lawyer","Insurance Agent","Chiropractor","Dentist","Other"]),
    message: z.string().max(2000).optional().or(z.literal("")),
  })
  ```
- Add a hidden honeypot field (e.g. `<input name="website" tabIndex={-1} className="hidden">`); reject if filled.
- Add per-IP rate limiting (Upstash Ratelimit, Vercel KV, or `@vercel/firewall`).
- Validate `businessType` against the allow-list (currently any string is accepted).

### CR-03 — Validation success leaks PII to server logs in production
**File:** `lib/actions.ts:16`
**BLOCKER (privacy / GDPR / CCPA).** `console.log("New Lead Venture contact:", { name, email, phone, businessType, message })` writes name, email, phone and free-text message into the platform log stream every submission. On Vercel/Cloud logs these are retained, searchable, and often shipped to third-party log sinks (Datadog, Logtail). For a marketing site collecting medical-vertical leads (chiropractors, dentists) this is a data-protection problem and likely a HIPAA-adjacent concern depending on `message` content.
**Fix:** Remove the `console.log`. Persist via a controlled, retention-aware sink (DB/email), and if you must keep a debug trace, log only a non-PII correlation id (`crypto.randomUUID()`).

### CR-04 — `app/page.tsx` is a Server Component but blocks SSR streaming on a wall of client components, with zero per-page metadata
**File:** `app/page.tsx:1-29`, `app/layout.tsx:11-23`
**BLOCKER for SEO.** All ten section components are imported into the root `Home` page. Every animated/stateful section is `"use client"` (Hero, LaunchTracker, IndustryHub, AIDemoCard, Services, Calculator, Pricing, ContactForm, Navbar). Result: nearly the entire homepage hydrates as a single client tree, with framer-motion shipped on first load. Combined with no `generateMetadata`, no `viewport`, no `<link rel="canonical">`, no robots/sitemap files, no OG image, no `metadataBase`, the marketing claims in this product (we'll get you ranked on Google/ChatGPT) are contradicted by the site's own SEO posture.
**Fix:**
1. Add `export const metadata` with `metadataBase: new URL("https://leadventure.example")` and a real `openGraph.images` array; add `twitter`, `alternates.canonical`, `robots`.
2. Add `app/robots.ts` and `app/sitemap.ts` (Next 16 supports these as TS files that export functions).
3. Move framer-motion-only flourishes (IndustryHub cards, Pricing cards, Hero text) behind dynamic-import boundaries or convert decorative animations to pure CSS so the section bodies render as Server Components.
4. The CTA "See How It Works" links to `#services` but there is no `/services` route — either build the actual pages mentioned in the brief or remove that promise from nav/copy.

---

## HIGH

### HI-01 — `next.config.ts` is empty; no `metadataBase`, image domains, security headers, or env validation
**File:** `next.config.ts:3-5`
The file is a placeholder. Missing at minimum:
- `images.remotePatterns` (you'll need this the moment you stop using emoji and add real client photos / OG images).
- A `headers()` block for security: `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and ideally a CSP. Framer-motion + inline JSON-LD requires planning the CSP (`script-src 'self' 'unsafe-inline'` or nonces).
- No `reactStrictMode` toggle (default is on in 16, fine — but be explicit).
- No `experimental.serverActions.allowedOrigins` — production deploys behind a different host name than `Origin` will reject server actions silently. See Next 16 server actions security docs.
**Fix:** Configure all of the above before deploying.

### HI-02 — No `next/image` usage anywhere; emoji used as iconography
**Files:** `components/sections/IndustryHub.tsx:7,13,19,25`, `components/sections/Services.tsx:11,22,36`, `components/sections/AIDemoCard.tsx:25`, `components/sections/ContactForm.tsx:54`
Profession "icons" are Unicode emoji (`⚖️🛡️🦴🦷🔍💡🤖`). These render inconsistently across OS/browsers (different colors, sizes, occasional missing glyphs), are not localized, and break the brand. The `public/` folder still contains only the default Vercel template SVGs (`next.svg`, `vercel.svg`, `globe.svg`, `window.svg`, `file.svg`) — none of them are used.
**Fix:** Replace emoji icons with `lucide-react` icons (already a dependency) or SVG assets in `public/`, rendered via `next/image` where appropriate. Delete unused public SVGs.

### HI-03 — `Navbar` "logo" is an `<a href="#">` — accessibility + behavior bug
**File:** `components/layout/Navbar.tsx:11-16`
Hash-only `href` jumps to top and is announced by screen readers as a generic link. There's also no `<nav aria-label>`, no skip-link, and the mobile menu doesn't trap focus or close on `Escape`.
**Fix:**
- Change to `<Link href="/">` (use `next/link`).
- Add `<a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>` at the top of `app/layout.tsx`.
- Add `aria-expanded={open}` and `aria-controls="mobile-menu"` to the hamburger button.
- Close the mobile menu on Escape and on route change.

### HI-04 — Mobile menu has no `id`, no `aria-expanded`, no focus management, and is not announced
**File:** `components/layout/Navbar.tsx:38-50, 54-73`
The hamburger toggles `open` state but the button doesn't say which menu it controls. Tab focus stays where the user left it; opening the menu doesn't move focus into it; closing doesn't return focus.
**Fix:** Use Radix's `DropdownMenu` / `NavigationMenu` (already pulled in via the `radix-ui` meta-package) or wire `aria-expanded`, `aria-controls`, `id`, focus trap, and Escape-to-close manually.

### HI-05 — Inline `<script type="application/ld+json">` injected via `dangerouslySetInnerHTML` inside FAQ section
**File:** `components/sections/FAQ.tsx:52-55`
The content is static at build time and safe today, but (a) inline `<script>` inside `<section>` is invalid in strict HTML5 parsers (script in body works, but conventionally JSON-LD belongs in `<head>`); (b) `dangerouslySetInnerHTML` will fight any CSP you add later (HI-01). Next 16 supports JSON-LD via the `metadata` export and `app/*/head.tsx` is gone — use a Server Component that renders into `<head>`.
**Fix:** Move JSON-LD to a server-rendered `<script>` inside the page's component tree but outside `dangerouslySetInnerHTML`:
```tsx
<script
  type="application/ld+json"
  // Next will inject this safely; same JSON.stringify call.
  dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
/>
```
This is what you have — but consider also adding `Organization`, `LocalBusiness`, and `BreadcrumbList` schemas, and host them under `app/layout.tsx` so they appear on every page when you add more routes.

### HI-06 — `<select>` in `ContactForm` is missing an `id` and the `<label>` is not associated
**File:** `components/sections/ContactForm.tsx:69-92, 95-124, 127-135`
Every `<label>` in the form is a bare `<label className="block …">` with no `htmlFor`, and the inputs have no `id`. Clicking the visible label text does **not** focus the input — that's a long-standing a11y regression. Screen readers fall back to placeholder text, which is also problematic (placeholders are not labels).
**Fix:** Add `id` to each input/select/textarea, set `htmlFor` on each `<label>`, and add `aria-describedby` for error text.

### HI-07 — Form error region is not announced to AT users
**File:** `components/sections/ContactForm.tsx:137-139`
Errors are rendered into a `<p className="text-red-500">`. Screen-reader users get no notification when the message appears.
**Fix:** Add `role="alert"` and `aria-live="polite"` to the error paragraph (and to the success container at line 42 for symmetry). Also: the success element should receive focus on appearance so keyboard users know the form was accepted.

### HI-08 — `<form noValidate>` plus `required` HTML attributes results in inconsistent UX
**File:** `components/sections/ContactForm.tsx:65`, lines 75, 87, 111
`noValidate` disables built-in browser validation, yet `required` is still set on `name`, `email`, and `businessType`. The required asterisks are decorative-only. If `submitContact` is called with empty fields the user sees the generic "Please fill in all required fields." error, but the browser never highlights *which* field is missing.
**Fix:** Either remove `noValidate` (then the browser handles per-field errors and your server action becomes defense-in-depth), or remove the `required` attributes and implement per-field client validation that mirrors the server schema (CR-02).

### HI-09 — `LaunchTracker` countdown causes SSR/hydration mismatch and re-renders every second
**File:** `components/sections/LaunchTracker.tsx:24-31`
`useState(() => getNextSlot() - Date.now())` runs on the server *and* on the client, but `Date.now()` differs between them (and between users). React 19 hydration is stricter; expect a hydration warning on first paint. Separately, the component re-renders the entire section (and triggers framer-motion in parent siblings on the page) every 1s.
**Fix:**
- Initialise to a stable value (e.g. `0` or the full slot duration), then `useEffect` to set the real value once mounted. Or wrap in `suppressHydrationWarning` on the timer element specifically.
- Update the time via `useRef` + DOM mutation if 1Hz React renders become a perf issue.

---

## MEDIUM

### MD-01 — `@import "shadcn/tailwind.css"` in `app/globals.css` is fragile and likely wrong
**File:** `app/globals.css:3`
The `shadcn` package (`^4.7.0`) is the CLI, not a runtime CSS source. `node_modules/shadcn/tailwind.css` may not exist; if it does, importing the CLI's CSS at runtime is not a documented pattern. Tailwind v4 expects you to compose with `@import "tailwindcss"` and `@theme` blocks — which you already do.
**Fix:** Remove the `@import "shadcn/tailwind.css"` line and verify the build still styles correctly. If you actually need shadcn primitives' styles, copy them into `globals.css` or vendor them.

### MD-02 — `@theme inline` declares `--font-sans` from `var(--font-sans)` (self-referential)
**File:** `app/globals.css:10`
`--font-sans: var(--font-sans);` references itself. The intent is presumably to pick up the Inter variable defined on `<body>` (`--font-inter`). As written it resolves to whatever inherited value `--font-sans` had, or `initial`.
**Fix:** `--font-sans: var(--font-inter), system-ui, sans-serif;` (this matches the working `--font-family-sans` declaration on line 51, which is itself orphaned because nothing reads `--font-family-sans`).

### MD-03 — `--font-mono: var(--font-geist-mono)` references a variable that is never defined
**File:** `app/globals.css:11`
`--font-geist-mono` is the leftover from the `create-next-app` template; nothing in the codebase defines it. Any `font-mono` class will fall back to the default monospace stack with a one-frame flash.
**Fix:** Either define `--font-geist-mono` (load the font in `app/layout.tsx`) or hard-code a stack: `--font-mono: ui-monospace, SFMono-Regular, monospace;`.

### MD-04 — Tailwind `@apply border-border outline-ring/50` on `*` is heavy-handed
**File:** `app/globals.css:129-132`
Applying `border-border` to every element costs a CSS variable lookup per element and produces a transparent 0-width border that surprises authors of new components. Acceptable shadcn default, but flag for review.
**Fix:** Restrict to interactive primitives, or scope under a class.

### MD-05 — `bg-[#f8f7ff]`, `text-[#0f0a1e]`, `bg-violet-700` hardcoded across components — design tokens not used
**Files:** every section file (e.g. `Hero.tsx:7,22`, `Footer.tsx:3`, `Pricing.tsx:71,82,85`, `ContactForm.tsx:34,144`)
You defined `--color-lv-bg`, `--color-lv-primary`, `--color-lv-secondary`, `--color-lv-text`, `--color-lv-footer` in `globals.css:53-56`. None of them are referenced anywhere. Every component re-types the literal hex.
**Fix:** Either delete the unused tokens, or replace literals with the Tailwind v4 token classes (`bg-lv-bg`, `text-lv-text`, `bg-lv-primary`, etc).

### MD-06 — `Calculator.calculateProjected(current) => current * 3` is the user-facing growth claim
**File:** `components/sections/Calculator.tsx:5-7`
"Drag the slider to see what the O-Trifecta can do for your practice" — the answer is always exactly 3×. There is no input that changes the multiplier, no industry vertical, no plan tier. This is a marketing claim presented as a calculator. The disclaimer ("Based on average client results…") is small grey text below the result. If you ever get sued or hit by an FTC complaint, this is exhibit A.
**Fix:** Either make the multiplier vary (by industry + plan), or rename the section to "Projected Growth Illustration" and put the disclaimer adjacent to the result with equal weight. Have legal review the copy.

### MD-07 — `LaunchTracker` progress steps and "Only 3 spots available this week" are hard-coded fictions
**File:** `components/sections/LaunchTracker.tsx:21, 51, 60, 89`
Step 2 ("Asset Upload") is always shown as completed regardless of state. "Only 3 spots available this week" is a static literal. The countdown ticks to a real time, but the path/steps/scarcity copy is theatre. The user can read the page source and see this.
**Fix:** Either back these with real state (likely overkill for a marketing site) or remove the false-progress UI and reword scarcity claims to be defensible.

### MD-08 — Same anchor target for multiple footer "Services" items
**File:** `components/layout/Footer.tsx:21-25`
SEO, AEO, GEO, Social Management all link to `#services`. AI Receptionist links to `#ai-demo`. Once you build dedicated pages (per the brief), update these.
**Fix:** Build `/services/seo`, `/services/aeo`, `/services/geo` routes and link to those, or scroll-to-tab inside `Services.tsx` using `?tab=aeo` query params.

### MD-09 — `motion` and full `framer-motion` is imported into 7 separate sections — unnecessary bundle weight
**Files:** `Hero.tsx`, `IndustryHub.tsx`, `AIDemoCard.tsx`, `Services.tsx`, `Pricing.tsx`, `ContactForm.tsx`, `LaunchTracker.tsx` (via state, no motion)
Framer-motion 12 is ~50KB gzipped. Most usages here are simple `initial`/`whileInView` fades that CSS `@keyframes` or Tailwind v4 `animate-*` plugins (you already have `tw-animate-css`) can do.
**Fix:** Replace decorative entrance animations with CSS where possible. Keep framer only for the AI demo waveform and any genuinely interactive motion.

### MD-10 — Multiple components are unnecessarily `"use client"`
**Files:** `Hero.tsx:1`, `IndustryHub.tsx:1`, `Services.tsx:1`, `Pricing.tsx:1`
These components only use framer-motion for static-once entrance fades — no event handlers, no state. They're forced into the client bundle. Once MD-09 is resolved, drop `"use client"` from sections that no longer need it.

### MD-11 — Hard-coded copyright year `© 2026 Lead Venture` will go stale
**File:** `components/layout/Footer.tsx:55`
**Fix:** `© {new Date().getFullYear()} Lead Venture …` in a server component (the footer is already a server component — good).

---

## LOW

### LO-01 — README is still the create-next-app default
**File:** `README.md`
Tells the next maintainer to read about Geist (the project uses Inter) and gives no project-specific info.
**Fix:** Replace with brief description, dev/test/build commands, env vars required for production lead handling.

### LO-02 — `<a href="#" …>Lead Venture</a>` in `Navbar` should be `<Link href="/">`
**File:** `components/layout/Navbar.tsx:11`
See HI-03. Also use `next/link` for all internal navigation (Footer too) to get prefetch and client navigation when you add real routes.

### LO-03 — Inconsistent text colors across sections (`text-gray-500`, `text-gray-600`, `text-gray-700`, `text-[#0f0a1e]`, `text-violet-700`)
Across all section files. No single source of truth for body / muted / heading text. See MD-05.

### LO-04 — `<input type="range">` has no `aria-valuemin/valuemax/valuenow/aria-label`
**File:** `components/sections/Calculator.tsx:30-38`
Native `<input type="range">` does expose valuemin/max/now automatically, but the slider has no `<label htmlFor>` association — the label uses no `htmlFor` and the input has no `id`. The associated `<label>` text changes as the user drags ("Current monthly leads: 20"), which is fine — but add an `aria-label="Current monthly leads"` or proper `htmlFor`/`id`.

### LO-05 — `defaultValue=""` on a `required` select forces user interaction with no a11y hint
**File:** `components/sections/ContactForm.tsx:109-117`
Combined with `noValidate`, the user can submit without selecting, and only the server message ("Please fill in all required fields") tells them. See HI-08.

### LO-06 — `key={i}` used for FAQ list
**File:** `components/sections/FAQ.tsx:64-77`
Static array so index-as-key is fine, but `key={faq.q}` is safer and matches the convention used in `Pricing` and `IndustryHub`.

### LO-07 — Tests cover happy paths only; no coverage for the dead/wired paths
**Files:** `__tests__/*`
- `ContactForm.test.tsx`: no test for the server-action throwing (network failure / 500). The `handleSubmit` doesn't wrap the `await submitContact(formData)` in try/catch — a thrown error sets `submitting=false`? No, it doesn't, because nothing catches: the button stays disabled, no error appears. **Add a regression test and a try/catch in `ContactForm.handleSubmit`.**
- `Calculator.test.tsx`: no test that decimal slider input behaves correctly (it can't enter a decimal, but `Number(e.target.value)` returns NaN on empty string — not currently reachable, but worth a unit test).
- `actions.test.ts`: no test for email-shaped validation, no test for trim of whitespace-only input ("  " currently passes since the trim is applied before checking — wait, line 12 *does* `.trim()` — verify that test exists; it doesn't).
- No tests for: Navbar mobile menu, FAQ accordion, Pricing rendering, Hero rendering, IndustryHub.
- No e2e/integration test that the server action is actually reached from the form.

---

## Update Priority (recommended order)

1. **CR-01, CR-02, CR-03** — fix the form pipeline or take the form down. Until then, every "submission" is theatre and a privacy issue.
2. **CR-04 + HI-01 + HI-05** — wire up real metadata, robots, sitemap, security headers. The site sells SEO services; its own SEO must be defensible.
3. **HI-03, HI-04, HI-06, HI-07, HI-08** — accessibility cluster. Cheap to fix, legally meaningful (ADA), and the site targets professional verticals that are themselves regulated.
4. **HI-09** — hydration warning will surface in production and waste engineering time.
5. **MD-01, MD-02, MD-03** — CSS plumbing issues that will bite you when you add a second page.
6. **MD-06, MD-07, MD-11** — marketing-copy honesty and freshness.
7. **MD-09, MD-10** — bundle size.
8. **LO-\*** — polish.

---

_Reviewed: 2026-05-14 by Claude (gsd-code-reviewer), depth=standard._
_Reviewer ran without `node_modules/` available, so Next.js 16 deprecation behaviors were cross-checked against published metadata for `next@16.2.6` and `react@19.2.4` and against the lucide-react 1.14.0 tarball. Some recommendations citing Next 16 specifics (server actions `allowedOrigins`, `app/sitemap.ts`, `app/robots.ts`) should be re-verified against `node_modules/next/dist/docs/` once dependencies are installed._
