#!/usr/bin/env node
/**
 * Generate Open Graph images (1200x630) for tannerwj.com.
 *
 * Renders an HTML template in headless Chromium and screenshots it:
 *   public/og.png          — site-wide default
 *   public/og/links.png    — the /links page
 *   public/og/<slug>.png   — one per referral link (for /s/<slug> share pages)
 *
 * Re-run after editing src/data/links.ts:  node scripts/generate-og.mjs
 * Needs the repo's devDeps installed plus a Chromium binary
 * (CHROME_PATH env or /opt/meta-chromium/chrome).
 */
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontDir = join(root, "node_modules", "@fontsource-variable");
const grotesk = pathToFileURL(join(fontDir, "space-grotesk", "files", "space-grotesk-latin-wght-normal.woff2")).href;
const mono = pathToFileURL(join(fontDir, "jetbrains-mono", "files", "jetbrains-mono-latin-wght-normal.woff2")).href;

// Mirror of linkSlug() in src/data/links.ts — keep in sync.
const linkSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Read the link catalog straight from the TS source (simple, data is literal).
// Decode JS string escapes (e.g. \u2192) the way the TS compiler would.
const decode = (s) =>
  s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
   .replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
const src = await import("node:fs").then((fs) => fs.readFileSync(join(root, "src/data/links.ts"), "utf8"));
const items = [];
for (const m of src.matchAll(/name:\s*"([^"]+)",\s*\n\s*url:\s*"[^"]+",\s*\n\s*blurb:\s*\n?\s*"([^"]+)"(?:,\s*\n\s*perk:\s*"([^"]+)")?/g)) {
  items.push({ name: decode(m[1]), blurb: decode(m[2]), perk: m[3] ? decode(m[3]) : "" });
}
if (items.length === 0) throw new Error("No link items parsed from links.ts");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function page({ kicker, title, titleSize = 118, perk = "", blurb = "", footer }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: "Space Grotesk"; src: url("${grotesk}") format("woff2"); font-weight: 300 700; }
    @font-face { font-family: "JetBrains Mono"; src: url("${mono}") format("woff2"); font-weight: 100 800; }
    * { margin: 0; box-sizing: border-box; }
    body {
      width: 1200px; height: 630px; overflow: hidden;
      background: #0c0c0e; color: #f2f0ea;
      font-family: "Space Grotesk", sans-serif;
      background-image: radial-gradient(720px 420px at 12% -10%, rgba(77,99,246,.20), transparent 65%);
      padding: 64px 72px; display: flex; flex-direction: column;
    }
    .kicker { font-family: "JetBrains Mono", monospace; font-size: 27px; color: #6d6d78; display: flex; align-items: center; gap: 14px; }
    .dot { width: 15px; height: 15px; border-radius: 50%; background: #4d63f6; box-shadow: 0 0 18px 3px rgba(77,99,246,.75); flex: none; }
    .kicker b { color: #a2a2ac; font-weight: 500; }
    .mid { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 30px; }
    h1 { font-size: ${titleSize}px; font-weight: 650; letter-spacing: -0.03em; line-height: 1.02; }
    h1 .dim { color: #6d6d78; }
    .perk {
      align-self: flex-start; font-family: "JetBrains Mono", monospace; font-size: 31px;
      color: #9aa7ff; background: rgba(77,99,246,.12);
      border: 1.5px solid rgba(77,99,246,.45); border-radius: 999px; padding: 13px 30px;
    }
    .blurb { font-size: 37px; line-height: 1.38; color: #a2a2ac; max-width: 1020px;
      display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .foot { font-family: "JetBrains Mono", monospace; font-size: 25px; color: #6d6d78; display: flex; justify-content: space-between; }
    .foot .name { color: #a2a2ac; }
  </style></head><body>
    <div class="kicker"><span class="dot"></span><span>${kicker}</span></div>
    <div class="mid">
      <h1>${title}</h1>
      ${perk ? `<div class="perk">${esc(perk)}</div>` : ""}
      ${blurb ? `<div class="blurb">${esc(blurb)}</div>` : ""}
    </div>
    <div class="foot"><span class="name">${footer}</span><span>tannerwj.com</span></div>
  </body></html>`;
}

const jobs = [
  {
    out: join(root, "public", "og.png"),
    html: page({
      kicker: "<b>tannerwj</b>.com",
      title: `Building things<br>for the <span style="color:#9aa7ff">web</span>`,
      titleSize: 104,
      blurb: "AI-native apps, side projects, and the occasional star chart — shipped from Utah.",
      footer: "Tanner Johnson",
    }),
  },
  {
    out: join(root, "public", "og", "links.png"),
    html: page({
      kicker: "<b>tannerwj.com</b>/links",
      title: "Stuff I actually<br>recommend",
      titleSize: 100,
      blurb: "Referral links for the services I use — in most cases they come with a perk for you too.",
      footer: "Tanner Johnson · Links",
    }),
  },
  ...items.map((item) => ({
    out: join(root, "public", "og", `${linkSlug(item.name)}.png`),
    html: page({
      kicker: "<b>tannerwj.com</b>/links",
      title: esc(item.name),
      titleSize: item.name.length > 14 ? 92 : 118,
      perk: item.perk,
      blurb: item.blurb,
      footer: "Tanner Johnson recommends",
    }),
  })),
];

mkdirSync(join(root, "public", "og"), { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/opt/meta-chromium/chrome",
  args: ["--no-sandbox", "--disable-gpu", "--force-color-profile=srgb"],
});
const pg = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
for (const job of jobs) {
  writeFileSync("/tmp/og-template.html", job.html);
  await pg.goto("file:///tmp/og-template.html", { waitUntil: "networkidle" });
  await pg.evaluate(() => document.fonts.ready);
  await pg.screenshot({ path: job.out });
  console.log("wrote", job.out.replace(root, "."));
}
await browser.close();
console.log(`Done: ${jobs.length} images (${items.length} links).`);
