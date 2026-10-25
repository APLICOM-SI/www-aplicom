// Cloudflare Worker: statično stran streže iz dist/ (assets), sam obdela le prijavo v administracijo.
import { onRequestGet as auth } from './auth.js';
import { onRequestGet as callback } from './callback.js';

const routes = { '/api/auth': auth, '/api/callback': callback };

export default {
  async fetch(request, env) {
    const handler = routes[new URL(request.url).pathname];
    if (handler && request.method === 'GET') return handler({ request, env });
    return env.ASSETS.fetch(request);
  },
};
