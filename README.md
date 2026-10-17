# Prashant Kumbhar — Personal Portfolio

A React + TypeScript portfolio rebuilt from the supplied master prompt. The active design uses a portrait-led editorial hero, a dedicated education showcase, varied glass project panels, an interactive skills explorer, an internship timeline, separate hackathon records, and an integrated contact form.

## Run locally

```
npm install
npm run dev
npm run check
npm run test:portfolio
npm run build
npm run preview -- --host 127.0.0.1 --port 5173
```

On Windows PowerShell with script execution restricted, use `npm.cmd`. Production build and preview use Vite’s runner config loader to avoid a Windows config-bundling restriction encountered in this environment. If the dev dependency optimizer is restricted, build and use the production preview.

Netlify uses the existing `netlify.toml`: build `npm run build`, publish `client/dist`. The root `dist` directory is legacy output. The prepared `Portfolio-Netlify.zip` is suitable for manual upload to the existing Netlify site.

## Active source

- `client/src/pages/Home.tsx`: new composition, full-resolution portrait, education, internship timeline, hackathons, and modal orchestration.
- `client/src/portfolio/redesign.css`: active design system, background, glass surfaces, responsive layouts, contrast, and reduced-motion fallbacks.
- `ProjectShowcase.tsx`: distinct ThreatCore, NETRA, QR, URL-analysis, and secure-API illustrations with selectable stages.
- `SkillExplorer.tsx`: seven comprehensive capability categories with clean tool labels and contextual descriptions.
- `data.ts`: Resume-based project records, stage descriptions, scope, and outcomes. The forensics project is named NETRA; its current status is Active development. ThreatCore is in Final-stage development, based on the user’s latest progress update.
- `CaseStudy.tsx`, `InvestigationMap.tsx`, `CommandPalette.tsx`, `Modal.tsx`: reusable details, relationships, keyboard search, and native dialog behavior.
- `ProjectModels.tsx`, `project-refinements.css`: three distinct rotatable CSS 3D models, four NETRA stage cards, and uncropped image presentation. The former simulated investigation is no longer imported or available in the site.
- `ContactSection.tsx`, `contact-validation.ts`, `contact-delivery.ts`: form integration, validation, complete email payload, timeout handling, and service-specific diagnostics.

The hero uses the unchanged original `client/public/profile.png` at its native 1728 × 1931 resolution, with full aspect ratio and no crop or color filter. This source is not native 4K. The optimized copy remains for the existing social image. `pillai-logo.png` is the available Pillai College of Engineering logo. `social-preview.jpg` is a custom 1200 × 630 sharing image using the portrait. The source Resume download is retained without alteration.

Earlier visual styles and section components remain as historical source but are not imported by the active page.

## Contact delivery

The form uses the replacement EmailJS service `service_h9q0mxy`, with the existing template and public account identifier through the installed browser SDK. It sends name, email, optional subject, and full message. Every field is also included in `message`, keeping compatibility with an existing template that only renders `{{message}}`.

The form provides inline validation, max lengths, a honeypot, duplicate-submit protection, a one-minute client cooldown after confirmed success, loading feedback, and errors that preserve the message. Success appears only after EmailJS returns HTTP 200. Failed sends do not consume the success cooldown. A 20-second response timeout restores the form, and errors expose the actual service status and text under Email service details. Timeout does not prove nondelivery, so the UI warns before a duplicate send. API acceptance is not an independent inbox-delivery receipt. Client-side controls reduce obvious abuse; they are not a substitute for the provider’s rate limits and account protections.

No private API key is used or exposed. EmailJS’s public account identifier is intentionally a browser configuration value. Optional overrides are documented in `.env.example`:

```
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

If configuring a different account, set the template’s recipient to `kumbharprashant494@gmail.com`, use `{{from_email}}` as Reply-To, and include `{{message}}` in the body. The subject may use `{{subject}}`. Configure the provider’s allowed origins for the actual deployment and localhost as appropriate. Keep any private account credentials out of Vite environment variables.

### Delivery verification status

A single live verification send was explicitly approved by the user and attempted. EmailJS returned HTTP 403: “API access from non-browser environments is currently disabled.” No verification email was delivered by that attempt. The account security setting was left unchanged.

The subsequent browser submission identified HTTP 412 `Gmail_API: Invalid grant` on the old service. The user supplied replacement service `service_h9q0mxy`, now configured in the source and environment example. A real browser submission using the replacement and inbox check remain required. Browser automation was unavailable in this environment. Do not describe delivery as verified until this check succeeds. See the official SDK documentation: https://www.emailjs.com/docs/sdk/send/ and https://www.emailjs.com/docs/sdk/options/.

## Validation

TypeScript and production compilation pass. Render checks cover NETRA naming, education and college identity, all five case studies, all three case-study views, seven skill-category states, exactly two internship records, hackathon ordering, and internal navigation. Contact validation checks cover required fields, malformed email, length boundaries, honeypot handling, optional subject, and inclusion of every sender field in the delivery payload.

The stylesheet includes desktop, tablet, and mobile breakpoints, touch-friendly controls, keyboard focus states, and reduced-motion behavior. Visual browser review and end-to-end interaction testing remain unverified because no browser surface is connected. No claims of production metrics, live visitor monitoring, or completed NETRA capabilities are made.

## Pre-deployment mobile audit

`mobile-polish.css` confines layout refinements to screens up to 680px (with a 370px narrow-screen adjustment), preserving desktop styling. Touch controls have larger targets, stage selectors wrap, long labels fit, form/search inputs use 16px text, and dialogs account for dynamic viewport height. The mobile menu dismisses outside the header and restores toggle focus on Escape. Contact fields are disabled during submission to protect edits from being cleared by an in-flight success.

TypeScript, portfolio render/logic checks, production build, local HTTP asset checks (including Resume), and deployment ZIP integrity pass. Browser/device visual checks and live EmailJS inbox delivery remain unverified because no browser surface is connected.
