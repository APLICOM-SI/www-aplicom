// Prijava v administracijo (Decap CMS) z GitHubom – 2. korak: GitHub vrne kodo,
// zamenjamo jo za žeton in ga po protokolu Decap CMS predamo oknu administracije.

function page(origin, status, content) {
  // Žeton pošljemo samo oknu z istega izvora (naša administracija).
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!doctype html><html lang="sl"><head><meta charset="utf-8"><title>Prijava</title></head><body>
<p>${status === 'success' ? 'Prijava uspešna, okno se bo zaprlo.' : 'Prijava ni uspela.'}</p>
<script>
(function () {
  var origin = ${JSON.stringify(origin)};
  var message = ${JSON.stringify(message)};
  function receive(e) {
    if (e.origin !== origin) return;
    window.opener.postMessage(message, origin);
    window.removeEventListener('message', receive);
  }
  window.addEventListener('message', receive);
  window.opener.postMessage('authorizing:github', origin);
})();
</script></body></html>`;
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Set-Cookie': '__Host-decap_state=; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=0',
    },
  });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = request.headers.get('Cookie') ?? '';
  const expected = /(?:^|;\s*)__Host-decap_state=([^;]+)/.exec(cookie)?.[1];

  if (!code || !state || state !== expected) {
    return page(url.origin, 'error', { message: 'Neveljaven zahtevek za prijavo. Poskusite znova.' });
  }

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'User-Agent': 'aplicom-admin' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/api/callback`,
    }),
  });
  const data = await res.json().catch(() => ({}));

  if (!data.access_token) {
    return page(url.origin, 'error', { message: data.error_description || 'GitHub ni vrnil žetona.' });
  }
  return page(url.origin, 'success', { token: data.access_token, provider: 'github' });
}
