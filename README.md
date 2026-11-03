# نظام نمو المطاعم والمقاهي

Arabic RTL landing page built with Next.js App Router, TypeScript, Tailwind CSS, Lucide, Motion, React Hook Form and Zod. Static export is produced in `out/`.

## Run

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
node --experimental-strip-types scripts/verify-assessment.mjs
```

## Content

`content-source.md` is the full supplied source, preserved verbatim. `src/lib/content.json` contains its 15 Markdown sections. `CONTENT-MAP.md` maps each source section to its presentation. The advertising story is presented separately, giving 16 main page sections. All **12** FAQs in the actual source are retained, including “كيف أبدأ؟”. Pillar and timeline tabs expose complete details. The audit explanation accordion retains the full funnel explanation.

The consultant identity, biography and portrait were supplied by the user on 2026-10-28 and are now populated. Verifiable case-study proof, company, legal and contact details remain labeled placeholders as supplied. Brand name “نظام النمو” is a descriptive working identity, not a claim about an existing registered company.

## Assessment and consultation integration

The assessment runs entirely in browser memory; refresh clears the answers. It does not use analytics, cookies or local storage, and does not automatically send or save answers. It produces a downloadable Arabic text report. Transparent rules are in `src/lib/assessment.ts`, also explained in the report. Sales and average order values are context only, never used to invent financial forecasts.

After assessment, a consultation dialog can prepare a local JSON request; this is explicitly **not sent** and no booking is made. To enable actual submission, configure `NEXT_PUBLIC_CONSULTATION_ENDPOINT` during build and rebuild. The endpoint accepts a versioned `ConsultationPayload`: name, phone, consent, timestamp, answers and report. `submitConsultation` is the adapter boundary for GoHighLevel, a webhook or a Supabase server function. Keep authentication secrets on the server. Validate inputs, consent and origin, limit abuse, define retention and a real privacy policy before collecting production leads. No service keys belong in browser environment variables.

The UI reports success only after an HTTP success response; this is a received request, not a confirmed appointment. The production endpoint should return 2xx only when the lead is accepted. The default is fully functional local assessment, with submission unconfigured.

## Design and access

Brand colors: #FCF7F2, #B89EAB, #551C43, #CFA76B. Local IBM Plex Sans Arabic fonts. Original HTML/CSS/SVG restaurant, receipt and loyalty illustrations. Keyboard operable tabs, disclosure FAQs, labeled form groups, dialog focus trapping and Escape, reduced motion support. Responsive layouts at mobile/tablet/desktop widths. New Sites deployment remains owner private.

## Supplied photography and VSL

Five supplied photographs are compressed locally to WebP in `public/images/`. They provide the video poster, photographic backgrounds beneath burgundy overlays, and the Riyadh terrace transition card. These are illustrative sector images, not client endorsements or documented case studies.

The VSL area sits directly below the main headline. No actual video was supplied, so it deliberately displays an unavailable poster without a fake play control. Set `NEXT_PUBLIC_VSL_URL` to an HTTPS YouTube watch URL, Vimeo URL or direct `.mp4`/`.webm` URL, then rebuild to enable playback. Optional `NEXT_PUBLIC_VSL_CAPTIONS_URL` supplies Arabic WebVTT captions for direct media. There is no autoplay.
