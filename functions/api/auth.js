// Prijava v administracijo (Decap CMS) z GitHubom – 1. korak: preusmeritev na GitHub.
// Potrebni spremenljivki v Cloudflare Pages: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET.

export async function onRequestGet({ request, env }) {
  if (!env.GITHUB_CLIENT_ID) {
    return new Response('Manjka nastavitev GITHUB_CLIENT_ID.', { status: 500 });
  }
  const url = new URL(request.url);
  const state = crypto.randomUUID();
  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorize.searchParams.set('redirect_uri', `${url.origin}/api/callback`);
  authorize.searchParams.set('scope', 'repo,user');
  authorize.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      'Set-Cookie': `__Host-decap_state=${state}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=600`,
      'Cache-Control': 'no-store',
    },
  });
}
