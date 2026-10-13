#!/usr/bin/env node
/**
 * Pre-commit gate runner: serve the fresh build locally and run the e2e
 * suite's `api` target (HTTP-level checks: meta, content rules, crawl,
 * perf budgets) against it. The `chromium` target needs the shared
 * browser on 127.0.0.1:9222 and runs separately via `npm run test:e2e`.
 */
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "http://127.0.0.1:4321";

const server = spawn("node", [join(root, "scripts", "preview-server.mjs")], {
  env: { ...process.env, PORT: "4321" },
  stdio: "ignore",
});

async function waitReady() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(BASE + "/");
      if (res.ok) return;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("preview server did not come up on " + BASE);
}

let code = 1;
try {
  await waitReady();
  code = await new Promise((resolve) => {
    const child = spawn("npx", ["e2e", "run", "--target", "api"], {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, E2E_BASE_URL: BASE, E2E_TELEMETRY_DISABLED: "1" },
    });
    child.on("exit", (c) => resolve(c ?? 1));
    child.on("error", () => resolve(1));
  });
} finally {
  server.kill();
}
process.exit(code);
