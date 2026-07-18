# SK Sangam Enterprises — Website

Plain HTML/CSS/JS site (no build step) — 5 pages: Home, About, Services, Gallery, Contact.

## Before going live, replace these placeholders

Search each file for these and update:

1. **WhatsApp number** — currently `91XXXXXXXXXX` in every file (nav CTA link is fine as-is, but the WhatsApp float button, footer icon, and CTA band all use this). Do a find-and-replace across all `.html` files.
2. **Phone number** — `+91 98XXXXXXX` in footer and contact page.
3. **Email** — `info@sksangamenterprises.com` in footer and contact page (`mailto:` link too).
4. **Office address** — placeholder text in footer and contact page.
5. **Google Map** — the iframe on `contact.html` currently points to a generic "India" search. Replace the `src` with your actual Google Maps embed link (Google Maps → Share → Embed a map → copy the `src` URL).
6. **Social links** — Facebook, Instagram, YouTube `href="#"` in the footer — add your real page URLs.
7. **Logo** — no logo file was uploaded, so the header currently shows a text mark ("SK" in a gradient box). Upload your actual logo image and swap the `.brand-mark` div for an `<img>` tag in each file's header.
8. **Photos** — every image slot on the site is a placeholder gradient block (labeled "Add photo") instead of a real photograph, since none were provided and the brief asked to avoid road/highway images. Replace `.shot` divs with real `<img>` tags of your houses, buildings, iron stirrup batches, and kulhar products once you have them.

## How the contact form works

It has no backend — when submitted, it opens WhatsApp with the inquiry pre-filled as a message (so you receive real inquiries without needing a server). Update the `WHATSAPP_NUMBER` constant near the top of `script.js` to your number.

## Deploying

Same flow you already use for Nirman Manager: push this folder to a GitHub repo, then import it in Vercel (or Netlify/Hostinger) as a static site — no build command needed.
