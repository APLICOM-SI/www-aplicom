# www.aplicom.si

Statična spletna stran (Astro) z administracijo (Decap CMS). Na strežniku ne teče nobena koda in ni baze podatkov.

## Lokalno

```powershell
npm install
npm run dev      # stran na http://localhost:4321
npm run cms      # v drugem oknu: lokalna administracija na http://localhost:4321/admin/
```

Lokalno administracija zapisuje neposredno v datoteke v `src/content/` (brez prijave).

## Kje je vsebina

| Vsebina | Datoteke | V administraciji |
|---|---|---|
| Programi (Prenosi, Arhiv) | `src/content/programi/*.md` | Programi |
| Novice | `src/content/novice/*.md` | Aktualno |
| Obvestila, O nas | `src/content/strani/*.md` | Strani |
| Cenik | `src/content/nastavitve/cenik.json` | Cenik in podatki → Cenik |
| Naslov, telefoni, kontakti | `src/content/nastavitve/podjetje.json` | Cenik in podatki → Podatki podjetja |
| PDF/TXT spremembe, slike | `public/media/...` | nalagajo se ob urejanju |

Program v arhiv prestavite tako, da označite **V arhivu**.

## Objava (Cloudflare Workers)

1. Cloudflare → *Workers & Pages → Create application → Import a repository* → GitHub `APLICOM-SI/www-aplicom`.
   *Build command* `npm run build`, *Deploy command* `npx wrangler deploy`. Ostalo je v `wrangler.jsonc`:
   statične datoteke iz `dist/`, prijavo v administracijo izvaja `worker/` (`/api/auth`, `/api/callback`).
2. Administracija: GitHub OAuth App (organizacija APLICOM-SI → Settings → Developer settings → OAuth Apps)
   s *callback URL* `https://<domena>/api/callback`. V Cloudflare → Worker *aplicom* → *Settings → Variables and Secrets*
   dodajte `GITHUB_CLIENT_ID` in `GITHUB_CLIENT_SECRET` (oba kot *Secret*).
3. Urednike dodate v ekipo *Uredniki* organizacije APLICOM-SI (vloga *Write* na repozitoriju), z vklopljenim 2FA.
4. Kontaktni obrazec pošilja prek storitve Web3Forms (javni ključ v `src/pages/kontakt/index.astro`) na aplicom@aplicom.si.
5. Domena: v Cloudflare projektu *Custom domains* dodajte `www.aplicom.si` in pri upravljavcu DNS dodajte zapis CNAME.
   Zapisov za e-pošto (MX, SPF …) ne spreminjajte. Ob menjavi domene popravite tudi *callback URL* v GitHub OAuth App.

Stari naslovi `/si/...` se samodejno preusmerijo (`public/_redirects`), stare datoteke `/media/files/...` ostanejo na istih poteh.
