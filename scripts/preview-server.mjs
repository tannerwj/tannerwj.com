#!/usr/bin/env node
/**
 * Minimal static server for dist/ that mimics Cloudflare Pages closely
 * enough for the e2e API checks: directory index files, 404.html fallback,
 * the global headers from public/_headers on every response, and the
 * exact-match rules from public/_redirects (splats/placeholders ignored).
 *
 * Used by scripts/check-e2e.mjs. PORT env or 4321.
 */
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const port = Number(process.env.PORT || 4321);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

// Parse the /* block of public/_headers into a header map.
function globalHeaders() {
  const headers = {};
  try {
    const lines = readFileSync(join(root, "public", "_headers"), "utf8").split("\n");
    let inBlock = false;
    for (const line of lines) {
      if (line.trim() === "/*") { inBlock = true; continue; }
      if (inBlock) {
        if (!line.startsWith(" ") && line.trim() !== "") break;
        const m = line.trim().match(/^([^:]+):\s*(.*)$/);
        if (m) headers[m[1]] = m[2];
      }
    }
  } catch { /* no _headers file — serve without extras */ }
  return headers;
}
const HEADERS = globalHeaders();

// Parse exact-match rules from public/_redirects: "/from /to 301".
function redirects() {
  const rules = new Map();
  try {
    for (const line of readFileSync(join(root, "public", "_redirects"), "utf8").split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const [from, to, status] = t.split(/\s+/);
      if (from && to && !from.includes("*") && !from.includes(":")) {
        rules.set(from, { to, status: Number(status) || 301 });
      }
    }
  } catch { /* no _redirects file */ }
  return rules;
}
const REDIRECTS = redirects();

function resolveFile(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const direct = join(dist, clean);
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  const index = join(dist, clean, "index.html");
  if (existsSync(index)) return index;
  return null;
}

createServer((req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  for (const [k, v] of Object.entries(HEADERS)) res.setHeader(k, v);
  const rule = REDIRECTS.get(url.pathname);
  if (rule) {
    res.statusCode = rule.status;
    res.setHeader("Location", rule.to);
    res.end();
    return;
  }
  const file = resolveFile(url.pathname);
  if (file) {
    res.setHeader("Content-Type", TYPES[extname(file)] || "application/octet-stream");
    res.end(readFileSync(file));
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const notFound = join(dist, "404.html");
    res.end(existsSync(notFound) ? readFileSync(notFound) : "not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`preview-server: http://127.0.0.1:${port} (dist/)`);
});
