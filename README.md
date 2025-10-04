# Wedding Site (Vue 3 + Vite + Tailwind + vue-i18n)

This is a starter repo for a modern wedding landing page. It includes 3 languages (English, Khmer, Chinese) and QR donation UX (share/download/copy payload). It's ready to deploy on Netlify.

## Setup (local)

1. Clone or copy files
2. Install dependencies

```bash
npm install
```

3. Run dev server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

## Deploy to Netlify

1. Create a GitHub repo and push this project.
2. Login to Netlify, click "Add new site" → "Import from Git" → choose your repo.
3. Netlify build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click Deploy — your site will be live. You can configure a custom domain in Netlify settings.

## Replacements you should make

- Replace `src/assets/placeholder.png` with your real QR code PNG.
- Replace `qrPayloadText` in `src/components/WeddingLanding.vue` with the EMV/QR payload (if you have it) so "Copy QR text" contains the actual payload.
- Update the RSVP link in the component (`rsvpLink`).

## Notes on QR UX

- `Share` uses the Web Share API and sends the QR as a file to the native share sheet so guests can directly open banking apps or save the image — avoids screenshots.
- `Download` triggers a file download; on iOS this opens the image and guests can long-press to save.
- `Copy QR text` is for advanced users/Apps that accept pasting raw EMV/PromptPay payloads.

## Optional improvements

- Add captcha or a server endpoint for RSVPs (if you want to avoid Google Forms).
- Add analytics or email collection on RSVP to manage guests.
- Replace hero background with your own engagement photo (import in `WeddingLanding.vue`).
