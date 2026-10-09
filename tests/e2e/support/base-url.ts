// Base URL for the read-only HTTP (node-platform) tests. The `api` target
// has no engine, so it cannot declare `app` — tests read the URL from the
// environment instead of `app.baseUrl` (which is undefined there).
export const BASE_URL = process.env.E2E_BASE_URL ?? 'https://tannerwj.com';
