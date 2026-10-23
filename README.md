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

## Objava (Netlify)

1. Repozitorij potisnite na GitHub (zaseben).
2. Netlify → *Add new site → Import from Git* → izberite repozitorij. Nastavitve gradnje so v `netlify.toml`.
3. Administracija: na GitHubu ustvarite OAuth App (callback `https://api.netlify.com/auth/done`), nato v Netlify *Site configuration → Access & security → OAuth* dodajte GitHub ponudnika. V `public/admin/config.yml` vpišite pravilno ime repozitorija (`backend.repo`).
4. Urednike dodate kot sodelavce GitHub repozitorija (z vklopljenim 2FA).
5. Kontaktni obrazec: Netlify *Forms* ga zazna samodejno; v *Forms → Notifications* nastavite e-poštno obvestilo na aplicom@aplicom.si.
6. Domena: v Netlify dodajte `www.aplicom.si` in pri registrarju preusmerite DNS.

Stari naslovi `/si/...` se samodejno preusmerijo (`public/_redirects`), stare datoteke `/media/files/...` ostanejo na istih poteh.
