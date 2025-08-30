/**
 * Cloudflare Worker for serving static site
 * Serves files from the ASSETS binding
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle root path
    if (url.pathname === '/' || url.pathname === '') {
      return env.ASSETS.fetch(new URL('/index.html', request.url));
    }

    // Handle static assets
    if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
      return env.ASSETS.fetch(request);
    }

    // Try to serve the requested path
    try {
      const response = await env.ASSETS.fetch(request);

      // If the file exists, return it
      if (response.status !== 404) {
        return response;
      }

      // If file doesn't exist, serve 404 or fallback to index.html for SPA routing
      return env.ASSETS.fetch(new URL('/index.html', request.url));
    } catch (error) {
      // Fallback to index.html for any errors
      return env.ASSETS.fetch(new URL('/index.html', request.url));
    }
  },
};
