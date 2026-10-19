# Provera zavisnosti — 17. oktobar 2026.

Ovo je pregled i predlog, ne izvršena nadogradnja. `package.json` i lockfile
nisu menjani. Nijedan skup verzija nije moguće garantovati kao 100% stabilan:
objavljena stabilna verzija, deklarisana kompatibilnost i odsustvo poznatih
ranjivosti nisu zamena za testiranje konkretne aplikacije.

## Šta je provereno

- Sve direktne zavisnosti u manifestu i zaključane verzije u lockfile-u.
- Upotreba biblioteka u `src/` i konfiguraciji.
- npm registry verzije, dist-tags i peer dependencies.
- Zvanična Next.js politika podrške i bezbednosna objava od 14. oktobra.
- Zvanični Tailwind vodič za migraciju i izdanje 3.4.19.
- `npm audit --json`: 38 nalaza ukupno (4 critical, 15 high, 17 moderate,
  2 low), uključujući direktne i tranzitivne zavisnosti. To nije dokaz da je
  svaki nalaz eksploatabilan u ovoj aplikaciji.

## Tailwind: kompatibilnost i bezbednost

Za očuvanje postojećeg izgleda konzervativan kandidat je **3.4.19**, koji npm
označava kao `v3-lts`. Postojeći projekat koristi v3 PostCSS konfiguraciju,
`@tailwind` direktive i klase kao `bg-opacity-*`, `ring-opacity-*`,
`flex-shrink-*`, `shadow-sm` i `outline-none` koje zahtevaju pažnju pri prelasku
na v4. V4 menja i podrazumevane stilove i minimalne verzije browsera.

Međutim, 3.4.19 zavisi od `postcss-selector-parser: ^6.1.2`. Aktuelni advisory
GHSA-rj75-hqrm-r3gf obuhvata verzije ispod 7.1.6, dakle i ovu 6.x granu.
Direktni audit samog `tailwindcss` paketa to ne otkriva. Problem se odnosi na
iscrpljivanje CPU-a pri parsiranju selektora; procena uticaja mora uzeti u obzir
da li build obrađuje nepouzdan CSS.

**3.4.19 je kandidat sa manjim rizikom promene izgleda, ali nije potvrđen kao
skup zavisnosti bez poznatih ranjivosti.** Za uklanjanje ovog nalaza treba
proveriti kompatibilnost ciljane zamene tranzitivne zavisnosti ili planski
migrirati na v4 i ponovo proveriti sve stilove. Ne dodavati major-version
`overrides` naslepo i ne pokretati `npm audit fix --force`.

## Kandidati za pakete koji se koriste

Verzije su kandidati za validaciju, ne potvrda međusobno testiranog skupa.
Novije bezbednosne ispravke imaju prednost nad proizvoljnim zadržavanjem starog
patch izdanja. `latest` oznaka sama po sebi nije kriterijum izbora.

| Paket | Zaključano sada | Konzervativan smer / kandidat |
| --- | --- | --- |
| `tailwindcss` | 3.3.3 | 3.4.19, uz navedeni tranzitivni bezbednosni uslov |
| `@tailwindcss/forms` | 0.5.7 | 0.5.11, deklarisana podrška za Tailwind 3 i 4 |
| `postcss` | 8.4.29 | 8.5.30; stari 8.4.29 ima poznate nalaze |
| `autoprefixer` | 10.4.15 | 10.4.22, ostanak na 10.4 grani i PostCSS 8 |
| `next` | 13.4.19 | 15.5.28 samo kao prelaz; za dugoročan cilj podržana 16.x grana |
| `react`, `react-dom` | 18.2.0 | 19.1.10 zajedno, npm `backport` kandidat za migraciju na Next 15 |
| `@headlessui/react` | 1.7.17 | 2.2.10 uz React 19; potrebna provera migracije komponenti |
| `@heroicons/react` | 2.0.18 | 2.2.0, deklarisana podrška za React 19 |
| `axios` | 1.6.2 | 1.20.0 kao kandidat koji ne zadržava poznate stare bezbednosne nalaze |
| `formik` | 2.4.5 | 2.4.9, patch u istoj grani |
| `yup` | 1.3.3 | 1.7.1, ista major grana; proveriti checkout validaciju |
| `react-country-flag` | 3.1.0 | Zadržati 3.1.0 |
| `react-toastify` | 9.1.3 | Privremeno zadržati 9.1.3 i proveriti uz React 19; širok peer range nije dokaz kompatibilnosti |
| `typescript` | 5.2.2 | 5.9.3, bez skoka na novi major |
| `@types/node` | 20.5.9 | 22.x, uskladiti sa Docker Node 22 runtime-om |
| `@types/react` | 18.2.21 | 19.1.17 uz kandidata React 19.1 |
| `@types/react-dom` | 18.2.7 | 19.1.11 uz kandidata React 19.1 |
| `@typescript-eslint/eslint-plugin` | 6.13.2 | 8.46.1 uz isti `@typescript-eslint/parser` 8.46.1 i kompatibilan ESLint |

Next.js 13 i 14 su van podrške. Verzija 15.5.28 je zvanično objavljena
bezbednosna ispravka na Maintenance LTS grani. Ipak, po objavljenom pravilu
podrške od dve godine od izlaska major verzije, Next 15 se približava kraju
tog perioda 21. oktobra 2026. Zato nije dobar dugoročan izbor za novu migraciju.
Za Next 16 registrovan je 16.4.2, dok bezbednosna objava potvrđuje ispravke u
16.4.1. Biranje 16.x opravdava duža podrška, ali zahteva zasebnu migraciju i
validaciju, i ne treba ga predstavljati kao malu patch nadogradnju.

Next 15 App Router migracija obuhvata React 19 i asinhrone `params` u stranicama
i `generateMetadata`. Headless UI 1.7.19 deklarisano podržava React 16–18,
dok 2.2.10 podržava 18/19. Ne koristiti `--legacy-peer-deps` da se ovaj konflikt
sakrije. Proveriti Dialog, Popover, Menu, Tab, Listbox, Combobox i Transition.

ESLint konfiguracija koristi parser i React plugin koji nisu svi eksplicitno
navedeni kao direktne dev zavisnosti. Paket `lint` nije zamena za ESLint.
Pri nadogradnji urediti kompletan lint alat i skriptu, posebno za Next 16.

## Paketi bez pronađene upotrebe

Pretraga izvornog koda i konfiguracije nije pronašla upotrebu sledećih paketa.
Predlog je uklanjanje posle potvrde build-om, umesto nepotrebne nadogradnje:

| Paket | Zaključano sada |
| --- | --- |
| `@reduxjs/toolkit` | 1.9.7 |
| `redux` | 4.2.1 |
| `react-redux` | 8.1.3 |
| `datejs` | 1.0.0-rc3 |
| `flag-icons` | 6.15.0 |
| `i18n` | 0.15.1 |
| `lint` | 0.8.19 |
| `react-datepicker` | 4.24.0 |
| `react-ts-typewriter` | 0.1.8-b |

Korpa koristi React Context; prevodi su u `LangContent.tsx`; prikaz zastava
koristi `react-country-flag`. `datejs` i `react-ts-typewriter` imaju prerelease
oznake, što dodatno ne odgovara zahtevu za izbegavanje takvih izdanja.

## Granice provere i sledeća validacija

npm bulk advisory provera konkretnih kandidata za Next 15.5.28/16.4.2,
React/React DOM 19.1.10, Tailwind 3.4.19, Forms 0.5.11, PostCSS 8.5.30,
Autoprefixer 10.4.22, Axios 1.20.0, Formik 2.4.9, Yup 1.7.1,
Headless UI 2.2.10, Heroicons 2.2.0, Toastify 9.1.3, Country Flag 3.1.0 i
TypeScript 5.9.3 vratila je prazan rezultat za direktne pakete.
Isto važi za proverene TypeScript ESLint 8.46.1 pakete. To **ne obuhvata ceo
budući lockfile**, niti garantuje odsustvo nepoznatih ranjivosti.

Pre prihvatanja nadogradnje: zaključati tačne izabrane verzije, regenerisati
lockfile, proveriti kompletan dependency tree i audit, pokrenuti lint,
TypeScript i produkcioni build u Dockeru. Zatim proveriti oba jezika, mobilni
prikaz, menije/modale, korpu i validaciju checkout-a uz mock porudžbine.
U ovoj proveri nisu instalirani kandidati niti testirano njihovo izvršavanje.

## Izvori

- [Next.js podrška](https://nextjs.org/support-policy)
- [Next.js bezbednosna ispravka, 14. oktobar 2026.](https://nextjs.org/blog/nextjs-security-update-october-14-2026)
- [Migracija na Next.js 15](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [Tailwind migracija sa v3 na v4](https://tailwindcss.com/docs/upgrade-guide)
- [Tailwind 3.4.19 izdanje](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.19)
- [Tailwind npm oznake](https://registry.npmjs.org/-/package/tailwindcss/dist-tags)
- [React npm oznake](https://registry.npmjs.org/-/package/react/dist-tags)
- [Parser advisory](https://github.com/advisories/GHSA-rj75-hqrm-r3gf)
- [npm registry](https://registry.npmjs.org/): konkretni version endpoint-i za sve navedene kandidate.
