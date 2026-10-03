import { test } from 'e2e';
import { expect } from 'e2e';

// Live-site checks that need no browser: HTTP status, key documents,
// and markers in the served HTML. These run in this sandbox.

const MAIN_PAGES = ['/', '/projects/', '/now/', '/about/', '/links/'];

test('every main page returns 200', async ({ app }) => {
  for (const path of MAIN_PAGES) {
    const res = await fetch(new URL(path, app.baseUrl));
    expect(res.status, `GET ${path}`).toBe(200);
  }
});

test('unknown pages return the 404 page', async ({ app }) => {
  const res = await fetch(new URL('/no-such-page-xyz/', app.baseUrl));
  expect(res.status).toBe(404);
  const html = await res.text();
  expect(html).toContain('404');
});

test('llms.txt is served as plain text', async ({ app }) => {
  const res = await fetch(new URL('/llms.txt', app.baseUrl));
  expect(res.status).toBe(200);
  expect(res.headers.get('content-type')).toContain('text/plain');
  const body = await res.text();
  expect(body).toContain('# tannerwj.com');
  expect(body).toContain('https://tannerwj.com/projects');
});

test('robots.txt is served', async ({ app }) => {
  const res = await fetch(new URL('/robots.txt', app.baseUrl));
  expect(res.status).toBe(200);
});

test('sitemap index lists the sitemap with all pages', async ({ app }) => {
  const index = await fetch(new URL('/sitemap-index.xml', app.baseUrl));
  expect(index.status).toBe(200);
  const indexXml = await index.text();
  expect(indexXml).toContain('https://tannerwj.com/sitemap-0.xml');

  const sitemap = await fetch(new URL('/sitemap-0.xml', app.baseUrl));
  expect(sitemap.status).toBe(200);
  const xml = await sitemap.text();
  for (const path of MAIN_PAGES) {
    const url = `https://tannerwj.com${path === '/' ? '' : path}`;
    expect(xml, `sitemap contains ${url}`).toContain(url);
  }
});

test('home page carries the expected markers', async ({ app }) => {
  const html = await (await fetch(new URL('/', app.baseUrl))).text();
  expect(html).toContain('<title>Tanner Johnson — Principal Engineer</title>');
  expect(html).toContain('aria-label="Toggle light and dark theme"');
  expect(html).toContain('data-theme="dark"');
  for (const [href, label] of [['/projects', 'Projects'], ['/now', 'Now'], ['/about', 'About'], ['/links', 'Links']]) {
    expect(html, `nav links to ${href}`).toContain(`href="${href}"`);
    expect(html, `nav shows ${label}`).toContain(label);
  }
  expect(html).toContain('rel="canonical" href="https://tannerwj.com/"');
});

test('links page marks affiliate links as sponsored', async ({ app }) => {
  const html = await (await fetch(new URL('/links/', app.baseUrl))).text();
  expect(html).toContain('rel="noopener sponsored"');
  expect(html).toContain('target="_blank"');
  for (const name of ['Coinbase', 'Robinhood', 'Starlink', 'Tesla', 'Monarch Money']) {
    expect(html, `links page lists ${name}`).toContain(name);
  }
});

test('project cards link out with noopener', async ({ app }) => {
  const html = await (await fetch(new URL('/projects/', app.baseUrl))).text();
  expect(html).toContain('data-category="app"');
  expect(html).toContain('aria-label="Filter projects"');
  expect(html).toContain('rel="noopener"');
});
