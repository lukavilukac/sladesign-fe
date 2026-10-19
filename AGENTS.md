# Webshop development guidelines

## Project and stack

This repository is the Sla Design Shop frontend, not a Laravel application.
The application lives in `src/app/`; do not move it into a new `app/` directory
or add PHP, Composer, database migrations, or backend services here.

- Next.js 15.5.28 App Router and React 19.1.10.
- TypeScript 5.9 with strict mode, alongside existing JavaScript/JSX files.
- Tailwind CSS 3.4.19, Headless UI 2, and Heroicons for the interface.
- Axios for the external API, Formik and Yup for checkout forms.
- React Context and localStorage for the cart.

Keep Tailwind on major version 3: broad browser compatibility is an explicit
user requirement. Next 15 is retained for its broader browser baseline than
Next 16; reassess its support status before a production deployment. Dynamic
route `params` are promises and must be awaited.

Check `package.json` and `package-lock.json` before relying on framework APIs.
Do not introduce newer Next.js or Tailwind conventions without an intentional
upgrade. Use npm and preserve the lockfile.

## Local development with Docker

Run Node/npm development commands in the `node` service. From `docker/`:

```sh
docker compose up -d
docker compose logs -f node
docker compose exec node npm run lint
docker compose exec node ./node_modules/.bin/tsc --noEmit
docker compose stop
docker compose start
```

The Node 22 container runs in `/var/www/html`, installs dependencies with
`npm ci` on startup, and serves development traffic at `http://localhost:3000`.
Use `WEBSHOP_PORT=3001 docker compose up -d` if the host port is occupied.
Source files are bind-mounted; `node_modules` and `.next` have separate Docker
volumes. Do not use host dependencies to validate container behavior.

For dependency changes, use `docker compose exec node npm install <package>`.
Only add dependencies needed for the requested change.

A production build writes `.next`; stop the development service first to avoid
sharing its output directory with a running build:

```sh
docker compose stop node
docker compose run --rm --no-deps node npm run build
docker compose up -d node
```

The Compose project has its own network and volumes. Keep it independent of
other projects and do not remove volumes or stop unrelated containers.

## Structure and routing

- `src/app/layout.tsx`: root metadata, toast container, and cart provider.
- `src/app/layoutsrb.tsx` and `layouteng.tsx`: manually composed language
  wrappers providing navigation and footer; these are not special Next.js
  layout filenames.
- `src/app/components/`: shared storefront and checkout components.
- `src/app/api/AxiosInstance.tsx`: shared Axios client.
- `src/app/api/DataProvider.tsx`: server-side catalog/navigation data helpers.
  This `api` directory is not currently a set of Next.js route handlers.
- `src/app/Lang/LangContent.tsx` and `LangHelper.tsx`: translations and helpers.
- `src/app/interfaces/locale.ts`: the supported `sr` and `en` locale union.
- `src/app/context/CartContext.jsx`: cart state, persistence, totals, shipping.
- `src/app/static/countries.jsx`: country and shipping data.

Preserve the paired routes and update both language variants when relevant:

| Serbian | English |
| --- | --- |
| `/` | `/home` |
| `/kategorije/[slug]` | `/categories/[slug]` |
| `/proizvod/[slug]` | `/product/[slug]` |
| `/porudzbina` | `/checkout` |
| `/o-meni` | `/about` |

Keep shared behavior in shared components/helpers rather than duplicating it
between language pages. Add translated UI text for both locales and preserve
localized links, API `Locale` headers, and product metadata.

## Component and styling conventions

Keep async data-loading pages as server components. Use `'use client'` only
where hooks, browser APIs, or interactive behavior require it. Access
`localStorage` only on the client and account for initial cart hydration.

Use the `@/*` alias for `src/*` where consistent with surrounding code. Follow
the existing file's JS/JSX or TS/TSX style; avoid unrelated conversions.
Prefer explicit types for new TypeScript contracts over adding `any`.

Reuse Tailwind utilities and existing Headless UI components. Preserve keyboard
interaction, labels, focus behavior, and mobile layouts. Check
`next.config.js` before adding externally hosted images.

Formatting varies in older files. Keep edits focused; when formatting, follow
`.prettierrc` (four spaces, single quotes, semicolons, no trailing commas).
Do not reformat the repository or add debugging console output.

## API and commerce behavior

The shared API client currently targets `https://app.sladesignshop.com/api`.
Catalog helpers run on the server, while search and checkout also use the
client from the browser. Preserve response shapes and locale handling.
Do not silently repoint the API or assume a local backend exists.

Preserve the checkout contract in `Checkout.jsx`, including `orders/create`,
order line quantities, product IDs, and modifier IDs. Do not submit real orders
as a smoke test; use mocked requests or a deliberately configured test backend.
Do not log customer contact/address information or commit credentials.

Cart lines distinguish products by both ID and selected modifiers. Preserve
modifier prices, quantities, subtotal calculations, the `cart` localStorage
schema, and shipping behavior unless the task explicitly changes them.
Current shipping logic includes free shipping to Serbia at a subtotal of 5000.

`DataProvider.tsx` currently disables TLS verification in two helpers. This is
an existing issue, not a pattern to copy or extend. Keep unrelated user changes
intact and do not use global TLS bypasses to resolve new connection problems.

## Validation and completion

Playwright tests live in `tests/e2e/`, with synthetic API fixtures in
`tests/fixtures/`. From `docker/`, run:

```sh
docker compose -f docker-compose.yml -f compose.e2e.yml run --rm --no-deps node npm run test:e2e
```

This uses the matching Playwright browser image, a separate `.next-e2e` build
directory, and local API fixtures. Browser requests to the production API are
intercepted; tests must never forward order submissions to it. `API_BASE_URL`
overrides server-side API reads only. The default production API is unchanged.
Do not claim historical browser versions were tested by current browser engines.

For code changes, run `npm run lint` and `npm run typecheck` in Docker; run a
production build when changing routing, configuration, dependencies, or server
rendering. Existing lint/type issues or external API and Google font access
can affect validation: report actual failures and distinguish them from new
regressions instead of weakening checks to make them pass.

For storefront behavior, check the affected Serbian and English routes and
relevant mobile layouts. For cart/checkout changes, check modifier combinations,
quantity updates, removal, persistence after reload, totals, shipping, and form
validation without sending a live order. A home-page HTTP 200 alone does not
verify API connectivity: navigation and home catalog helpers have fallbacks.

For documentation-only changes, check accuracy against the repository and run
`git diff --check`; application builds are unnecessary.

Before finishing, inspect the diff, preserve unrelated local changes, and
report what changed and what was actually verified. Do not edit generated
`node_modules/`, `.next/`, `out/`, or `next-env.d.ts` files.
